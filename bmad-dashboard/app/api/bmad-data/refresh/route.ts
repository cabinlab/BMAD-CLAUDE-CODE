import { NextResponse } from 'next/server';
import { processDiscoveryWorkflow } from '@/lib/bmad-workflow';
import fs from 'fs';
import path from 'path';

function findBmadRoot(): string | null {
  let currentDir = process.cwd();
  
  if (currentDir.includes('bmad-dashboard')) {
    currentDir = path.dirname(currentDir);
  }
  
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

// Force refresh assessments endpoint
export async function POST() {
  try {
    const bmadRoot = findBmadRoot();
    
    if (!bmadRoot) {
      return NextResponse.json({ error: 'BMAD project not found' }, { status: 404 });
    }
    
    // Re-run assessment workflow to update frontmatter assessments
    const docsPath = path.join(bmadRoot, 'docs');
    const testContentPath = path.join(bmadRoot, 'test-content');
    
    let processedCount = 0;
    
    // Process docs directory
    if (fs.existsSync(docsPath)) {
      const result = await processDiscoveryWorkflow(docsPath);
      processedCount += result.processedFiles.length;
    }
    
    // Process test-content directories
    if (fs.existsSync(testContentPath)) {
      for (const category of ['discovery', 'development', 'opportunity']) {
        const categoryPath = path.join(testContentPath, category);
        if (fs.existsSync(categoryPath)) {
          const result = await processDiscoveryWorkflow(categoryPath);
          processedCount += result.processedFiles.length;
        }
      }
    }
    
    return NextResponse.json({ 
      message: 'Assessments refreshed successfully',
      processedFiles: processedCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error refreshing assessments:', error);
    return NextResponse.json({ error: 'Failed to refresh assessments' }, { status: 500 });
  }
}