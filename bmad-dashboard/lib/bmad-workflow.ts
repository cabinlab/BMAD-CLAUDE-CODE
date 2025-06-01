// BMAD Discovery Assessment Workflow
import { promises as fs } from 'fs';
import * as matter from 'gray-matter';
import * as path from 'path';
import {
  readDiscoveryDocument,
  needsAssessmentUpdate,
  updateDiscoveryAssessment
} from './bmad-assessment';
import {
  createBatchedEvaluationPrompt,
  parseEvaluationResponse,
  calculateSignalStrength,
  determineCategory,
  generateRecommendations,
  EvaluationResult
} from './bmad-evaluator';
import {
  getDiscoverySections,
  DiscoveryAssessment,
  DiscoverySection
} from './bmad-section-parser';

export interface WorkflowOptions {
  forceUpdate?: boolean;
  mockEvaluation?: boolean; // For testing without API calls
}

export interface WorkflowResult {
  updated: boolean;
  assessment?: DiscoveryAssessment;
  error?: string;
}

/**
 * Main workflow: Check if document needs update and perform evaluation
 */
export async function processDiscoveryDocument(
  filePath: string,
  options: WorkflowOptions = {}
): Promise<WorkflowResult> {
  try {
    console.log(`Processing discovery document: ${path.basename(filePath)}`);
    
    // Check if update is needed
    const { needsUpdate, changedSections, allSections } = await needsAssessmentUpdate(filePath);
    
    if (!needsUpdate && !options.forceUpdate) {
      console.log('No changes detected, skipping evaluation');
      return { updated: false };
    }
    
    console.log(`Found ${changedSections.length} changed sections to evaluate`);
    
    // Get evaluation for changed sections
    const evaluationResult = options.mockEvaluation 
      ? await mockEvaluation(changedSections)
      : await evaluateWithClaude(changedSections);
    
    // Calculate complete assessment
    const doc = await readDiscoveryDocument(filePath);
    const currentAssessment = doc.frontmatter.discovery_assessment as DiscoveryAssessment || {};
    
    // Merge new scores with existing ones
    const updatedDimensions = {
      ...currentAssessment.dimensions,
      ...evaluationResult.dimensions
    };
    
    const signalStrength = calculateSignalStrength(updatedDimensions);
    const category = determineCategory(updatedDimensions, signalStrength);
    const recommendations = generateRecommendations(updatedDimensions);
    
    // Create complete assessment update
    const assessmentUpdate = {
      dimensions: evaluationResult.dimensions,
      claude_perspective: {
        ...evaluationResult.claude_perspective,
        recommendations
      }
    };
    
    // Update the document
    await updateDiscoveryAssessment(filePath, assessmentUpdate);
    
    // Read back the updated assessment
    const updatedDoc = await readDiscoveryDocument(filePath);
    const finalAssessment = updatedDoc.frontmatter.discovery_assessment as DiscoveryAssessment;
    
    console.log(`✓ Updated assessment: ${signalStrength}% signal strength, category: ${category}`);
    
    return {
      updated: true,
      assessment: finalAssessment
    };
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return {
      updated: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Process multiple discovery documents
 */
export async function processDiscoveryDocuments(
  filePaths: string[],
  options: WorkflowOptions = {}
): Promise<Record<string, WorkflowResult>> {
  const results: Record<string, WorkflowResult> = {};
  
  console.log(`Processing ${filePaths.length} discovery documents...`);
  
  for (const filePath of filePaths) {
    const filename = path.basename(filePath);
    results[filename] = await processDiscoveryDocument(filePath, options);
  }
  
  const updatedCount = Object.values(results).filter(r => r.updated).length;
  console.log(`✓ Processing complete: ${updatedCount}/${filePaths.length} documents updated`);
  
  return results;
}

/**
 * Evaluate sections using Claude (placeholder for actual API integration)
 */
async function evaluateWithClaude(sections: DiscoverySection[]): Promise<EvaluationResult> {
  // In a real implementation, this would make an API call to Claude
  // For now, we'll return a mock evaluation
  
  const prompt = createBatchedEvaluationPrompt(sections);
  console.log('Generated evaluation prompt:');
  console.log(prompt.substring(0, 500) + '...\n');
  
  // This is where you'd integrate with Claude API
  // const response = await claudeAPI.complete(prompt);
  // return parseEvaluationResponse(response);
  
  // Mock response for testing
  return mockEvaluation(sections);
}

/**
 * Mock evaluation for testing without API calls
 */
async function mockEvaluation(sections: DiscoverySection[]): Promise<EvaluationResult> {
  const dimensions: Record<string, number> = {};
  
  // Generate realistic scores based on content analysis
  sections.forEach(section => {
    if (!section.marker) return;
    
    const dimension = section.marker.dimension.replace('-', '_');
    const contentLength = section.content.trim().length;
    const hasExamples = section.content.includes('example') || section.content.includes('such as');
    const hasMetrics = section.content.includes('measure') || section.content.includes('metric');
    const hasUsers = section.content.includes('user') || section.content.includes('customer');
    
    // Base score algorithm
    let score = 40; // Starting point
    
    // Content length scoring
    if (contentLength > 200) score += 15;
    if (contentLength > 500) score += 15;
    if (contentLength > 1000) score += 10;
    
    // Content quality indicators
    if (hasExamples) score += 10;
    if (hasMetrics) score += 10;
    if (hasUsers) score += 10;
    
    // Dimension-specific bonuses
    switch (section.marker.dimension) {
      case 'problem-validation':
        if (section.content.includes('pain') || section.content.includes('frustrat')) score += 15;
        break;
      case 'user-clarity':
        if (section.content.includes('business owner') || section.content.includes('freelancer')) score += 15;
        break;
      case 'value-definition':
        if (section.content.includes('unique') || section.content.includes('unlike')) score += 15;
        break;
      case 'technical-viability':
        if (section.content.includes('API') || section.content.includes('technology')) score += 15;
        break;
    }
    
    dimensions[dimension] = Math.min(score, 100);
  });
  
  const avgScore = Object.values(dimensions).reduce((a, b) => a + b, 0) / Object.values(dimensions).length;
  
  return {
    dimensions,
    claude_perspective: {
      stance: avgScore > 75 ? 'advocate' : avgScore > 55 ? 'neutral' : 'cautious',
      key_insight: `Assessment of ${Object.keys(dimensions).length} dimensions shows ${Math.round(avgScore)}% average quality`,
      recommendation: avgScore > 75 
        ? 'Strong foundation for development' 
        : avgScore > 55
        ? 'Refine key areas before proceeding'
        : 'Needs significant work in multiple areas',
      confidence: Math.min(avgScore / 100 * 0.9, 0.9)
    }
  };
}

/**
 * Get assessment summary for dashboard
 */
export async function getAssessmentSummary(filePath: string): Promise<{
  name: string;
  category: string;
  signalStrength: number;
  lastUpdated?: string;
  claudePerspective?: any;
  dimensions?: any;
} | null> {
  try {
    const doc = await readDiscoveryDocument(filePath);
    const assessment = doc.frontmatter.discovery_assessment as DiscoveryAssessment;
    
    if (!assessment) return null;
    
    // Extract project name from document title or filename
    let projectName = doc.frontmatter.project_name;
    if (!projectName) {
      // Try to extract from the first heading in the document
      const titleMatch = doc.content.match(/^#\s+(.+?)$/m);
      if (titleMatch) {
        // Remove "Project Brief:" prefix if present
        projectName = titleMatch[1].replace(/^Project Brief:\s*/, '');
      } else {
        // Fall back to filename, convert dashes to spaces and title case
        projectName = path.basename(filePath, '.md')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, l => l.toUpperCase());
      }
    }
    
    return {
      name: projectName,
      category: assessment.category || 'discovery',
      signalStrength: assessment.signal_strength || 0,
      lastUpdated: assessment.last_evaluated,
      claudePerspective: assessment.claude_perspective,
      dimensions: assessment.dimensions
    };
  } catch (error) {
    console.warn(`Error reading assessment for ${filePath}:`, error);
    return null;
  }
}

/**
 * Force refresh assessment for a document
 */
export async function refreshAssessment(filePath: string): Promise<WorkflowResult> {
  return processDiscoveryDocument(filePath, { forceUpdate: true, mockEvaluation: true });
}

/**
 * Process all discovery documents in a directory
 */
export async function processDiscoveryWorkflow(docsDir: string): Promise<{
  processedFiles: string[];
  results: Record<string, WorkflowResult>;
}> {
  try {
    const { discoveryDocs } = await scanDiscoveryDirectory(docsDir);
    const results = await processDiscoveryDocuments(discoveryDocs, { mockEvaluation: true });
    
    return {
      processedFiles: discoveryDocs,
      results
    };
  } catch (error) {
    console.error(`Error processing workflow for ${docsDir}:`, error);
    return {
      processedFiles: [],
      results: {}
    };
  }
}

/**
 * Check all discovery documents in a directory
 */
export async function scanDiscoveryDirectory(docsDir: string): Promise<{
  discoveryDocs: string[];
  assessmentSummaries: Array<{
    file: string;
    summary: any;
  }>;
}> {
  try {
    // Find potential discovery documents
    const files = await fs.readdir(docsDir, { recursive: true });
    
    // Check if this is a test-content directory (less restrictive filtering)
    const isTestContent = docsDir.includes('test-content');
    
    const discoveryDocs = files
      .filter(file => {
        const fileName = file.toString();
        if (!fileName.endsWith('.md')) return false;
        if (fileName === 'README.md') return false; // Skip README files
        
        // For test-content directories, include all markdown files
        if (isTestContent) return true;
        
        // For regular docs, use original filtering
        return fileName.includes('brief') || 
               fileName.includes('discovery') ||
               fileName.includes('project');
      })
      .map(file => path.join(docsDir, file.toString()));
    
    console.log(`Found ${discoveryDocs.length} potential discovery documents`);
    
    // Get assessment summaries
    const assessmentSummaries = [];
    for (const docPath of discoveryDocs) {
      const summary = await getAssessmentSummary(docPath);
      if (summary) {
        assessmentSummaries.push({
          file: path.basename(docPath),
          summary
        });
      }
    }
    
    return {
      discoveryDocs,
      assessmentSummaries
    };
    
  } catch (error) {
    console.error(`Error scanning directory ${docsDir}:`, error);
    return {
      discoveryDocs: [],
      assessmentSummaries: []
    };
  }
}