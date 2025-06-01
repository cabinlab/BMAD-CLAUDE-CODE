// Discovery assessment management for BMAD
import { promises as fs } from 'fs';
import * as matter from 'gray-matter';
import * as path from 'path';
import { 
  parseDiscoverySections, 
  getDiscoverySections, 
  getChangedSections, 
  createSectionHashMap,
  createEvaluationPrompt,
  DiscoveryAssessment,
  DiscoverySection
} from './bmad-section-parser';

export interface AssessmentUpdate {
  dimensions: Record<string, number>;
  claude_perspective: {
    stance: 'advocate' | 'neutral' | 'cautious';
    key_insight: string;
    recommendation: string;
    confidence: number;
  };
}

/**
 * Read and parse discovery document
 */
export async function readDiscoveryDocument(filePath: string) {
  const content = await fs.readFile(filePath, 'utf-8');
  const parsed = matter(content);
  
  return {
    frontmatter: parsed.data,
    content: parsed.content,
    sections: parseDiscoverySections(parsed.content)
  };
}

/**
 * Check if discovery document needs assessment update
 */
export async function needsAssessmentUpdate(filePath: string): Promise<{
  needsUpdate: boolean;
  changedSections: DiscoverySection[];
  allSections: DiscoverySection[];
}> {
  try {
    const doc = await readDiscoveryDocument(filePath);
    const discoverySections = getDiscoverySections(doc.sections);
    
    // Get previous assessment
    const assessment = doc.frontmatter.discovery_assessment as DiscoveryAssessment || {};
    const previousHashes = assessment.section_hashes || {};
    
    // Check for changes
    const changedSections = getChangedSections(discoverySections, previousHashes);
    
    return {
      needsUpdate: changedSections.length > 0,
      changedSections,
      allSections: discoverySections
    };
  } catch (error) {
    console.warn(`Error checking assessment for ${filePath}:`, error);
    return { needsUpdate: false, changedSections: [], allSections: [] };
  }
}

/**
 * Calculate signal strength from dimension scores
 */
function calculateSignalStrength(dimensions: Record<string, number>): number {
  const weights = {
    problem_validation: 0.3,
    user_clarity: 0.25,
    value_definition: 0.25,
    technical_viability: 0.2
  };
  
  let weightedSum = 0;
  let totalWeight = 0;
  
  Object.entries(weights).forEach(([dim, weight]) => {
    if (dimensions[dim] !== undefined) {
      weightedSum += dimensions[dim] * weight;
      totalWeight += weight;
    }
  });
  
  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
}

/**
 * Update discovery assessment in document
 */
export async function updateDiscoveryAssessment(
  filePath: string, 
  assessmentUpdate: AssessmentUpdate
): Promise<void> {
  const doc = await readDiscoveryDocument(filePath);
  const discoverySections = getDiscoverySections(doc.sections);
  
  // Get or create assessment
  const currentAssessment = doc.frontmatter.discovery_assessment as DiscoveryAssessment || {};
  
  // Update assessment
  const updatedAssessment: DiscoveryAssessment = {
    ...currentAssessment,
    last_evaluated: new Date().toISOString(),
    section_hashes: createSectionHashMap(discoverySections),
    dimensions: {
      ...currentAssessment.dimensions,
      ...assessmentUpdate.dimensions
    },
    claude_perspective: assessmentUpdate.claude_perspective,
    signal_strength: calculateSignalStrength({
      ...currentAssessment.dimensions,
      ...assessmentUpdate.dimensions
    }),
    category: currentAssessment.category || 'discovery',
    momentum: currentAssessment.momentum || 'stable'
  };
  
  // Update frontmatter
  const newFrontmatter = {
    ...doc.frontmatter,
    discovery_assessment: updatedAssessment
  };
  
  // Rebuild document
  const newContent = matter.stringify(doc.content, newFrontmatter);
  
  // Write back to file
  await fs.writeFile(filePath, newContent, 'utf-8');
}

/**
 * Get evaluation prompt for a document
 */
export async function getEvaluationPrompt(filePath: string): Promise<string | null> {
  const { needsUpdate, changedSections } = await needsAssessmentUpdate(filePath);
  
  if (!needsUpdate || changedSections.length === 0) {
    return null;
  }
  
  return createEvaluationPrompt(changedSections);
}

/**
 * Simulate assessment update for testing
 */
export async function simulateAssessment(filePath: string): Promise<AssessmentUpdate | null> {
  const { needsUpdate, changedSections } = await needsAssessmentUpdate(filePath);
  
  if (!needsUpdate) return null;
  
  // Mock assessment based on content analysis
  const dimensions: Record<string, number> = {};
  
  changedSections.forEach(section => {
    if (!section.marker) return;
    
    const dimension = section.marker.dimension.replace('-', '_');
    const contentLength = section.content.trim().length;
    
    // Simple heuristic: longer, more detailed content = higher score
    let score = 30; // Base score
    if (contentLength > 100) score += 20;
    if (contentLength > 300) score += 20;
    if (section.content.includes('user') || section.content.includes('customer')) score += 15;
    if (section.content.includes('problem') || section.content.includes('pain')) score += 15;
    
    dimensions[dimension] = Math.min(score, 100);
  });
  
  const avgScore = Object.values(dimensions).reduce((a, b) => a + b, 0) / Object.values(dimensions).length;
  
  return {
    dimensions,
    claude_perspective: {
      stance: avgScore > 70 ? 'advocate' : avgScore > 50 ? 'neutral' : 'cautious',
      key_insight: `${Object.keys(dimensions).length} sections evaluated with average quality of ${Math.round(avgScore)}%`,
      recommendation: avgScore > 70 ? 'Strong foundation for development' : 'Needs more detail in key areas',
      confidence: Math.min(avgScore / 100, 0.9)
    }
  };
}

/**
 * Get all discovery documents in a directory
 */
export async function findDiscoveryDocuments(docsDir: string): Promise<string[]> {
  try {
    const files = await fs.readdir(docsDir, { recursive: true });
    const discoveryFiles = files
      .filter(file => 
        file.toString().endsWith('.md') && 
        (file.toString().includes('brief') || file.toString().includes('discovery'))
      )
      .map(file => path.join(docsDir, file.toString()));
    
    return discoveryFiles;
  } catch (error) {
    console.warn(`Error finding discovery documents in ${docsDir}:`, error);
    return [];
  }
}