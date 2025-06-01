import * as fs from 'fs';
import * as path from 'path';
import { NextResponse } from 'next/server';
import { getAssessmentSummary, scanDiscoveryDirectory } from '../../../lib/bmad-workflow';

export interface DiscoveryIdea {
  name: string;
  signal_strength: number;
  dimensions: {
    problem_validation?: number;
    user_clarity?: number;
    value_definition?: number;
    technical_viability?: number;
    validation_approach?: number;
    risk_awareness?: number;
    scope_definition?: number;
    success_measurement?: number;
  };
  claude_perspective?: {
    stance: 'advocate' | 'neutral' | 'cautious';
    key_insight: string;
    recommendation: string;
    confidence: number;
  };
  category: 'discovery' | 'development' | 'opportunity';
  last_updated?: string;
  missing: string[];
}

export interface DashboardData {
  discovery: DiscoveryIdea[];
  development: DiscoveryIdea[];
  opportunity: DiscoveryIdea[];
}

// Try to find BMAD project root by looking for key files
function findBmadRoot(): string | null {
  let currentDir = process.cwd();
  
  // Look for bmad-dashboard directory and go up one level
  if (currentDir.includes('bmad-dashboard')) {
    currentDir = path.dirname(currentDir);
  }
  
  // Check if this looks like a BMAD project
  const bmadIndicators = [
    'CLAUDE.md',
    'bmad-agent',
    'docs/bmad-journal.md'
  ];
  
  const hasIndicators = bmadIndicators.some(indicator => {
    const fullPath = path.join(currentDir, indicator);
    return fs.existsSync(fullPath);
  });
  
  return hasIndicators ? currentDir : null;
}

// Parse discovery documents using frontmatter assessments
async function parseDiscoveryProjects(bmadRoot: string): Promise<DashboardData> {
  const data: DashboardData = {
    discovery: [],
    development: [],
    opportunity: []
  };
  
  try {
    // Scan for discovery documents in both docs and test-content directories
    const docsPath = path.join(bmadRoot, 'docs');
    const testContentPath = path.join(bmadRoot, 'test-content');
    
    let allAssessmentSummaries: any[] = [];
    
    // Scan docs directory
    if (fs.existsSync(docsPath)) {
      const { assessmentSummaries: docsAssessments } = await scanDiscoveryDirectory(docsPath);
      allAssessmentSummaries.push(...docsAssessments);
    }
    
    // Scan test-content directory structure
    if (fs.existsSync(testContentPath)) {
      for (const category of ['discovery', 'development', 'opportunity']) {
        const categoryPath = path.join(testContentPath, category);
        if (fs.existsSync(categoryPath)) {
          const { assessmentSummaries: categoryAssessments } = await scanDiscoveryDirectory(categoryPath);
          allAssessmentSummaries.push(...categoryAssessments);
        }
      }
    }
    
    // Convert assessment summaries to dashboard format
    for (const { file, summary } of allAssessmentSummaries) {
      if (!summary) continue;
      
      const discoveryIdea: DiscoveryIdea = {
        name: summary.name,
        signal_strength: summary.signalStrength,
        dimensions: summary.dimensions || {},
        claude_perspective: summary.claudePerspective,
        category: summary.category,
        last_updated: summary.lastUpdated,
        missing: generateMissingList(summary.dimensions || {})
      };
      
      // Categorize based on assessment
      switch (summary.category) {
        case 'development':
          data.development.push(discoveryIdea);
          break;
        case 'opportunity':
          data.opportunity.push(discoveryIdea);
          break;
        case 'discovery':
        default:
          data.discovery.push(discoveryIdea);
          break;
      }
    }
    
    console.log(`Found ${allAssessmentSummaries.length} assessed discovery documents`);
    
  } catch (error) {
    console.warn('Error parsing discovery project data:', error);
  }
  
  return data;
}

// Generate missing items list based on dimension scores
function generateMissingList(dimensions: Record<string, number>): string[] {
  const missing: string[] = [];
  
  const thresholds = {
    problem_validation: { threshold: 70, label: 'Problem validation' },
    user_clarity: { threshold: 70, label: 'User definition' },
    value_definition: { threshold: 70, label: 'Value proposition' },
    technical_viability: { threshold: 60, label: 'Technical approach' },
    validation_approach: { threshold: 60, label: 'Success metrics' },
    scope_definition: { threshold: 60, label: 'MVP scope' }
  };
  
  Object.entries(thresholds).forEach(([dimension, { threshold, label }]) => {
    const score = dimensions[dimension] || 0;
    if (score < threshold) {
      missing.push(label);
    }
  });
  
  return missing.slice(0, 3); // Top 3 missing items
}

// Helper function to extract project name from file
function extractProjectName(filePath: string): string {
  const basename = path.basename(filePath, '.md');
  return basename.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Dummy data for new/empty projects
function getDummyData(): DashboardData {
  return {
    discovery: [
      {
        name: "AI Task Manager",
        signal_strength: 78,
        dimensions: {
          problem_validation: 85,
          user_clarity: 75,
          value_definition: 80,
          technical_viability: 60
        },
        claude_perspective: {
          stance: 'advocate',
          key_insight: 'Strong problem-solution fit, needs technical validation',
          recommendation: 'Validate AI integration approach and costs',
          confidence: 0.8
        },
        category: 'discovery',
        missing: ['Technical approach', 'AI cost model'],
        last_updated: new Date().toISOString()
      },
      {
        name: "Team Workspace", 
        signal_strength: 25,
        dimensions: {
          problem_validation: 40,
          user_clarity: 20,
          value_definition: 30,
          technical_viability: 10
        },
        claude_perspective: {
          stance: 'cautious',
          key_insight: 'Early stage exploration with significant gaps',
          recommendation: 'Define problem and users before proceeding',
          confidence: 0.3
        },
        category: 'discovery',
        missing: ['Problem validation', 'User definition', 'Value proposition'],
        last_updated: new Date().toISOString()
      }
    ],
    development: [
      {
        name: "Smart Calendar",
        signal_strength: 85,
        dimensions: {
          problem_validation: 90,
          user_clarity: 85,
          value_definition: 88,
          technical_viability: 80,
          scope_definition: 85
        },
        claude_perspective: {
          stance: 'advocate',
          key_insight: 'Well-validated concept ready for implementation',
          recommendation: 'Begin MVP development',
          confidence: 0.9
        },
        category: 'development',
        missing: [],
        last_updated: new Date().toISOString()
      }
    ],
    opportunity: [
      {
        name: "Customer Analytics",
        signal_strength: 90,
        dimensions: {
          problem_validation: 95,
          user_clarity: 90,
          value_definition: 85,
          technical_viability: 88
        },
        claude_perspective: {
          stance: 'advocate',
          key_insight: 'Excellent validation, awaiting resource allocation',
          recommendation: 'High priority for next development cycle',
          confidence: 0.95
        },
        category: 'opportunity',
        missing: [],
        last_updated: new Date().toISOString()
      }
    ]
  };
}

// API Route handler
export async function GET() {
  try {
    const bmadRoot = findBmadRoot();
    
    if (bmadRoot) {
      const realData = await parseDiscoveryProjects(bmadRoot);
      
      // If we found real project data, use it
      if (realData.discovery.length > 0 || realData.development.length > 0 || realData.opportunity.length > 0) {
        return NextResponse.json(realData);
      }
    }
    
    // Fall back to dummy data for new/empty projects
    return NextResponse.json(getDummyData());
  } catch (error) {
    console.error('Error fetching BMAD discovery data:', error);
    // Return dummy data if anything goes wrong
    return NextResponse.json(getDummyData());
  }
}