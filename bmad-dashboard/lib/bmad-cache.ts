import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface CachedProjectData {
  name: string;
  viability: number;
  completeness: number;
  business: number;
  technical: number;
  missing: string;
  notes?: string;
  estimatedStories?: number;
  lastUpdated: string;
  fileHashes: Record<string, string>;
}

export interface ProjectCache {
  projects: Record<string, CachedProjectData>;
  lastUpdated: string;
}

// Get file hash for change detection
function getFileHash(filePath: string): string | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf-8');
    return crypto.createHash('md5').update(content).digest('hex');
  } catch {
    return null;
  }
}

// Get directory hash for stories folder
function getDirectoryHash(dirPath: string): string | null {
  try {
    if (!fs.existsSync(dirPath)) return null;
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md')).sort();
    const combined = files.map(f => {
      const filePath = path.join(dirPath, f);
      return `${f}:${getFileHash(filePath)}`;
    }).join('|');
    return crypto.createHash('md5').update(combined).digest('hex');
  } catch {
    return null;
  }
}

// Check if project data needs updating
export function needsUpdate(bmadRoot: string, cached: CachedProjectData): boolean {
  const relevantFiles = [
    'docs/project-brief.md',
    'docs/prd.md',
    'docs/architecture.md',
    'docs/bmad-journal.md'
  ];

  // Check individual files
  for (const file of relevantFiles) {
    const filePath = path.join(bmadRoot, file);
    const currentHash = getFileHash(filePath);
    const cachedHash = cached.fileHashes[file];
    
    if (currentHash !== cachedHash) {
      return true;
    }
  }

  // Check stories directory
  const storiesPath = path.join(bmadRoot, 'docs/stories');
  const currentStoriesHash = getDirectoryHash(storiesPath);
  const cachedStoriesHash = cached.fileHashes['docs/stories'];
  
  return currentStoriesHash !== cachedStoriesHash;
}

// Load cache from file
export function loadCache(bmadRoot: string): ProjectCache | null {
  try {
    const cacheFile = path.join(bmadRoot, 'docs/.bmad-session/dashboard-cache.json');
    if (!fs.existsSync(cacheFile)) return null;
    
    const content = fs.readFileSync(cacheFile, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

// Save cache to file
export function saveCache(bmadRoot: string, cache: ProjectCache): void {
  try {
    const sessionDir = path.join(bmadRoot, 'docs/.bmad-session');
    if (!fs.existsSync(sessionDir)) {
      fs.mkdirSync(sessionDir, { recursive: true });
    }
    
    const cacheFile = path.join(sessionDir, 'dashboard-cache.json');
    fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));
  } catch (error) {
    console.warn('Failed to save dashboard cache:', error);
  }
}

// Create file hashes for current state
export function createFileHashes(bmadRoot: string): Record<string, string> {
  const relevantFiles = [
    'docs/project-brief.md',
    'docs/prd.md',
    'docs/architecture.md',
    'docs/bmad-journal.md'
  ];

  const hashes: Record<string, string> = {};
  
  // Hash individual files
  for (const file of relevantFiles) {
    const hash = getFileHash(path.join(bmadRoot, file));
    if (hash) hashes[file] = hash;
  }
  
  // Hash stories directory
  const storiesHash = getDirectoryHash(path.join(bmadRoot, 'docs/stories'));
  if (storiesHash) hashes['docs/stories'] = storiesHash;
  
  return hashes;
}

// Get cached project or return null if needs update
export function getCachedProject(bmadRoot: string, projectName: string): CachedProjectData | null {
  const cache = loadCache(bmadRoot);
  if (!cache) return null;
  
  const cached = cache.projects[projectName];
  if (!cached) return null;
  
  if (needsUpdate(bmadRoot, cached)) {
    return null;
  }
  
  return cached;
}

// Save updated project data to cache
export function saveProjectToCache(
  bmadRoot: string, 
  projectName: string, 
  projectData: Omit<CachedProjectData, 'lastUpdated' | 'fileHashes'>
): void {
  let cache = loadCache(bmadRoot) || {
    projects: {},
    lastUpdated: new Date().toISOString()
  };
  
  cache.projects[projectName] = {
    ...projectData,
    lastUpdated: new Date().toISOString(),
    fileHashes: createFileHashes(bmadRoot)
  };
  
  cache.lastUpdated = new Date().toISOString();
  
  saveCache(bmadRoot, cache);
}

// Clear cache (useful for development/debugging)
export function clearCache(bmadRoot: string): void {
  try {
    const cacheFile = path.join(bmadRoot, 'docs/.bmad-session/dashboard-cache.json');
    if (fs.existsSync(cacheFile)) {
      fs.unlinkSync(cacheFile);
    }
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
}