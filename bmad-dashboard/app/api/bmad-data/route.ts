import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export interface Idea {
  name: string;
  viability: number;
  completeness: number;
  business: number;
  technical: number;
  missing: string;
  notes?: string;
  estimatedStories?: number;
}

export interface DashboardData {
  explorations: Idea[];
  mvp: Idea[];
  opportunities: Idea[];
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

// Parse markdown files to extract project information
function parseProjectInfo(bmadRoot: string): DashboardData {
  const data: DashboardData = {
    explorations: [],
    mvp: [],
    opportunities: []
  };
  
  try {
    // Check for project brief
    const projectBriefPath = path.join(bmadRoot, 'docs/project-brief.md');
    if (fs.existsSync(projectBriefPath)) {
      const brief = fs.readFileSync(projectBriefPath, 'utf-8');
      const projectName = extractProjectName(brief);
      if (projectName) {
        // Create an entry based on what documents exist
        const completeness = calculateCompleteness(bmadRoot);
        const viability = calculateViability(bmadRoot, completeness);
        
        const idea: Idea = {
          name: projectName,
          viability: viability,
          completeness: completeness,
          business: calculateBusinessScore(bmadRoot),
          technical: calculateTechnicalScore(bmadRoot),
          missing: identifyMissingComponents(bmadRoot),
          notes: extractProjectNotes(brief),
          estimatedStories: countStories(bmadRoot)
        };
        
        // Categorize based on completeness and viability
        if (viability >= 80 && completeness >= 60) {
          data.mvp.push(idea);
        } else if (viability >= 70 && completeness >= 80) {
          data.opportunities.push(idea);
        } else {
          data.explorations.push(idea);
        }
      }
    }
  } catch (error) {
    console.warn('Error parsing BMAD project data:', error);
  }
  
  return data;
}

// Helper functions for extracting information
function extractProjectName(brief: string): string | null {
  const match = brief.match(/^#\s+(.+)/m);
  return match ? match[1].trim() : null;
}

function calculateCompleteness(bmadRoot: string): number {
  const requiredFiles = [
    'docs/project-brief.md',
    'docs/prd.md', 
    'docs/architecture.md',
    'docs/stories'
  ];
  
  const existingFiles = requiredFiles.filter(file => 
    fs.existsSync(path.join(bmadRoot, file))
  );
  
  return Math.round((existingFiles.length / requiredFiles.length) * 100);
}

function calculateViability(bmadRoot: string, completeness: number): number {
  // Base viability on completeness and presence of key validation
  let viability = completeness;
  
  // Bonus for having PRD (shows thinking through business case)
  if (fs.existsSync(path.join(bmadRoot, 'docs/prd.md'))) {
    viability += 10;
  }
  
  // Bonus for having architecture (shows technical feasibility)
  if (fs.existsSync(path.join(bmadRoot, 'docs/architecture.md'))) {
    viability += 15;
  }
  
  return Math.min(viability, 100);
}

function calculateBusinessScore(bmadRoot: string): number {
  const prdPath = path.join(bmadRoot, 'docs/prd.md');
  if (!fs.existsSync(prdPath)) return 10;
  
  const prd = fs.readFileSync(prdPath, 'utf-8');
  let score = 20;
  
  // Look for business validation indicators
  if (prd.includes('market') || prd.includes('competition')) score += 15;
  if (prd.includes('revenue') || prd.includes('monetization')) score += 15;
  if (prd.includes('user') || prd.includes('customer')) score += 10;
  
  return Math.min(score, 50);
}

function calculateTechnicalScore(bmadRoot: string): number {
  const archPath = path.join(bmadRoot, 'docs/architecture.md');
  if (!fs.existsSync(archPath)) return 5;
  
  const arch = fs.readFileSync(archPath, 'utf-8');
  let score = 15;
  
  // Look for technical detail indicators
  if (arch.includes('database') || arch.includes('schema')) score += 10;
  if (arch.includes('api') || arch.includes('endpoint')) score += 10;
  if (arch.includes('security') || arch.includes('auth')) score += 10;
  if (arch.includes('deployment') || arch.includes('infrastructure')) score += 5;
  
  return Math.min(score, 50);
}

function identifyMissingComponents(bmadRoot: string): string {
  const missing = [];
  
  if (!fs.existsSync(path.join(bmadRoot, 'docs/prd.md'))) {
    missing.push('PRD');
  }
  if (!fs.existsSync(path.join(bmadRoot, 'docs/architecture.md'))) {
    missing.push('architecture');
  }
  if (!fs.existsSync(path.join(bmadRoot, 'docs/stories'))) {
    missing.push('user stories');
  }
  
  return missing.length > 0 ? missing.join(', ') : 'Planning refinement';
}

function extractProjectNotes(brief: string): string {
  // Extract summary or first paragraph as notes
  const lines = brief.split('\n').filter(line => line.trim());
  const contentLines = lines.slice(1).filter(line => !line.startsWith('#'));
  return contentLines.slice(0, 2).join(' ').substring(0, 100) + '...';
}

function countStories(bmadRoot: string): number | undefined {
  const storiesDir = path.join(bmadRoot, 'docs/stories');
  if (!fs.existsSync(storiesDir)) return undefined;
  
  try {
    const files = fs.readdirSync(storiesDir);
    return files.filter(file => file.endsWith('.md')).length;
  } catch {
    return undefined;
  }
}

// Dummy data for new/empty projects
function getDummyData(): DashboardData {
  return {
    explorations: [
      {
        name: "AI Task Manager",
        viability: 78,
        completeness: 40,
        business: 45,
        technical: 33,
        missing: "AI cost model, integration approach",
        notes: "Strong user feedback, unclear on AI infrastructure costs"
      },
      {
        name: "Team Workspace", 
        viability: 25,
        completeness: 15,
        business: 15,
        technical: 10,
        missing: "Most details - early exploration",
        notes: "Just started exploring this concept"
      },
      {
        name: "Voice Note Transcription",
        viability: 65,
        completeness: 30,
        business: 35,
        technical: 30,
        missing: "Transcription accuracy validation, pricing model",
        notes: "Good market demand, technical feasibility proven"
      }
    ],
    mvp: [
      {
        name: "Smart Calendar",
        viability: 85,
        completeness: 70,
        business: 48,
        technical: 37,
        missing: "Final pricing validation",
        notes: "Ready for development",
        estimatedStories: 12
      },
      {
        name: "Note Taking App",
        viability: 80,
        completeness: 65,
        business: 35,
        technical: 45,
        missing: "Market positioning clarity", 
        notes: "Strong tech foundation, unclear differentiation",
        estimatedStories: 8
      }
    ],
    opportunities: [
      {
        name: "Customer Analytics",
        viability: 90,
        completeness: 85,
        business: 50,
        technical: 40,
        missing: "Resource allocation decision",
        notes: "Strong business case, clear tech path - waiting for capacity"
      },
      {
        name: "Mobile App",
        viability: 75,
        completeness: 60,
        business: 40,
        technical: 35,
        missing: "Platform prioritization (iOS vs Android)",
        notes: "User demand validated, platform decision pending"
      }
    ]
  };
}

// API Route handler
export async function GET() {
  try {
    const bmadRoot = findBmadRoot();
    
    if (bmadRoot) {
      const realData = parseProjectInfo(bmadRoot);
      
      // If we found real project data, use it
      if (realData.explorations.length > 0 || realData.mvp.length > 0 || realData.opportunities.length > 0) {
        return NextResponse.json(realData);
      }
    }
    
    // Fall back to dummy data for new/empty projects
    return NextResponse.json(getDummyData());
  } catch (error) {
    console.error('Error fetching BMAD data:', error);
    // Return dummy data if anything goes wrong
    return NextResponse.json(getDummyData());
  }
}