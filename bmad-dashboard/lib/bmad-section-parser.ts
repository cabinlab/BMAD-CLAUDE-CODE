// Markdown section parser for BMAD discovery assessment using remark
import * as crypto from 'crypto';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import { Heading, Root } from 'mdast';

export interface DiscoverySection {
  heading: string;
  marker?: DiscoveryMarker;
  content: string;
  hash: string;
  startLine: number;
  endLine: number;
}

export interface DiscoveryMarker {
  importance: 'discovery-critical' | 'discovery-helpful' | 'development-required';
  dimension: string;
}

export interface DiscoveryAssessment {
  last_evaluated?: string;
  section_hashes?: Record<string, string>;
  dimensions?: {
    problem_validation?: number;
    user_clarity?: number;
    value_definition?: number;
    technical_viability?: number;
    validation_approach?: number;
    risk_awareness?: number;
    scope_definition?: number;
    success_measurement?: number;
  };
  signal_strength?: number;
  claude_perspective?: {
    stance: 'advocate' | 'neutral' | 'cautious';
    key_insight: string;
    recommendation: string;
    confidence: number;
  };
  category?: 'discovery' | 'development' | 'opportunity';
  momentum?: 'gaining' | 'stable' | 'stalling';
}

/**
 * Parse markdown content and extract sections with discovery markers using remark
 */
export function parseDiscoverySections(content: string): DiscoverySection[] {
  const lines = content.split('\n');
  const tree = unified().use(remarkParse).parse(content);
  const sections: DiscoverySection[] = [];
  
  // Find all headings in the AST
  const headings: Array<{ node: Heading; line: number }> = [];
  
  let currentLine = 0;
  function visit(node: any) {
    if (node.type === 'heading') {
      headings.push({ node, line: currentLine });
    }
    if (node.position) {
      currentLine = node.position.end.line;
    }
    if (node.children) {
      node.children.forEach(visit);
    }
  }
  
  visit(tree);
  
  // Process headings to extract sections
  for (let i = 0; i < headings.length; i++) {
    const { node: heading, line: startLine } = headings[i];
    const nextLine = i < headings.length - 1 ? headings[i + 1].line : lines.length;
    
    // Extract heading text and potential marker
    const headingText = extractHeadingText(heading);
    const marker = extractMarkerFromHeading(headingText);
    const cleanHeading = headingText.replace(/\s*\[[^\]]+\]$/, '').trim();
    
    // Extract section content
    const sectionContent = lines
      .slice(startLine, nextLine)
      .join('\n')
      .trim();
    
    sections.push({
      heading: cleanHeading,
      marker,
      content: sectionContent,
      hash: generateContentHash(sectionContent),
      startLine,
      endLine: nextLine - 1
    });
  }
  
  return sections;
}

/**
 * Extract text from heading node
 */
function extractHeadingText(heading: Heading): string {
  return heading.children
    .map(child => (child as any).value || '')
    .join('')
    .trim();
}

/**
 * Extract discovery marker from heading text
 */
function extractMarkerFromHeading(headingText: string): DiscoveryMarker | undefined {
  const markerMatch = headingText.match(/\[([^\]]+)\]$/);
  if (!markerMatch) return undefined;
  
  return parseDiscoveryMarker(markerMatch[1]);
}

/**
 * Parse discovery marker from bracket notation
 * Example: "discovery-critical: problem-validation"
 */
function parseDiscoveryMarker(markerText: string): DiscoveryMarker | undefined {
  const match = markerText.match(/^(discovery-critical|discovery-helpful|development-required):\s*(.+)$/);
  if (!match) return undefined;
  
  const [, importance, dimension] = match;
  return {
    importance: importance as DiscoveryMarker['importance'],
    dimension: dimension.trim()
  };
}

/**
 * Generate content hash for change detection
 */
export function generateContentHash(content: string): string {
  // Normalize content for consistent hashing
  const normalized = content
    .replace(/\s+/g, ' ')  // Normalize whitespace
    .replace(/^\s+|\s+$/g, '') // Trim
    .toLowerCase();
  
  return crypto.createHash('md5').update(normalized).digest('hex').substring(0, 8);
}

/**
 * Get sections that need assessment (have discovery markers)
 */
export function getDiscoverySections(sections: DiscoverySection[]): DiscoverySection[] {
  return sections.filter(section => 
    section.marker && 
    (section.marker.importance === 'discovery-critical' || 
     section.marker.importance === 'discovery-helpful')
  );
}

/**
 * Check which sections have changed since last assessment
 */
export function getChangedSections(
  sections: DiscoverySection[], 
  previousHashes: Record<string, string> = {}
): DiscoverySection[] {
  return sections.filter(section => {
    if (!section.marker) return false;
    
    const sectionKey = section.marker.dimension;
    const previousHash = previousHashes[sectionKey];
    
    return !previousHash || previousHash !== section.hash;
  });
}

/**
 * Create section hash map for storage
 */
export function createSectionHashMap(sections: DiscoverySection[]): Record<string, string> {
  const hashMap: Record<string, string> = {};
  
  sections.forEach(section => {
    if (section.marker) {
      hashMap[section.marker.dimension] = section.hash;
    }
  });
  
  return hashMap;
}

/**
 * Dimension to persona mapping for evaluation
 */
export const DIMENSION_PERSONAS = {
  'problem-validation': 'Analyst',
  'user-clarity': 'PM',
  'value-definition': 'PM', 
  'technical-viability': 'Architect',
  'validation-approach': 'PM',
  'risk-awareness': 'Analyst',
  'scope-definition': 'PM',
  'success-measurement': 'PM',
  'integration-planning': 'Architect'
} as const;

/**
 * Get evaluation prompt for changed sections
 */
export function createEvaluationPrompt(changedSections: DiscoverySection[]): string {
  const sectionTexts = changedSections.map(section => 
    `## ${section.heading}\n${section.content.substring(0, 500)}${section.content.length > 500 ? '...' : ''}`
  ).join('\n\n');
  
  const evaluations = changedSections.map(section => {
    if (!section.marker) return '';
    const persona = DIMENSION_PERSONAS[section.marker.dimension as keyof typeof DIMENSION_PERSONAS];
    return `- [${persona}]: Score ${section.marker.dimension.replace('-', '_')} (0-100) for "${section.heading}"`;
  }).filter(Boolean).join('\n');
  
  return `Acting as multiple BMAD personas, evaluate these changed sections:

CHANGED SECTIONS:
${sectionTexts}

EVALUATE AS:
${evaluations}

PROVIDE:
- Overall stance (advocate/neutral/cautious)
- Key insight about this discovery
- Brief recommendation
- Confidence level (0-1)

Respond in JSON format:
{
  "dimensions": { 
    "problem_validation": 0-100,
    "user_clarity": 0-100,
    "value_definition": 0-100,
    "technical_viability": 0-100
  },
  "claude_perspective": {
    "stance": "advocate",
    "key_insight": "Brief insight",
    "recommendation": "Brief recommendation", 
    "confidence": 0.8
  }
}`;
}