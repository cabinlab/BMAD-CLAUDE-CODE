import { NextResponse } from 'next/server';
import { clearCache } from '@/lib/bmad-cache';
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

// Force refresh cache endpoint
export async function POST() {
  try {
    const bmadRoot = findBmadRoot();
    
    if (!bmadRoot) {
      return NextResponse.json({ error: 'BMAD project not found' }, { status: 404 });
    }
    
    clearCache(bmadRoot);
    
    return NextResponse.json({ 
      message: 'Cache cleared successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error clearing cache:', error);
    return NextResponse.json({ error: 'Failed to clear cache' }, { status: 500 });
  }
}