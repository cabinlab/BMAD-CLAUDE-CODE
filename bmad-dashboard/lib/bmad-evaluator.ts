// BMAD Persona-based Discovery Evaluation Engine
import { 
  DiscoverySection, 
  DiscoveryAssessment,
  DIMENSION_PERSONAS 
} from './bmad-section-parser';

export interface EvaluationRequest {
  sections: DiscoverySection[];
  projectContext?: string;
}

export interface EvaluationResult {
  dimensions: Record<string, number>;
  claude_perspective: {
    stance: 'advocate' | 'neutral' | 'cautious';
    key_insight: string;
    recommendation: string;
    confidence: number;
  };
}

export interface PersonaEvaluation {
  persona: string;
  dimension: string;
  score: number;
  reasoning: string;
}

/**
 * Create evaluation prompt for multiple personas and sections
 */
export function createBatchedEvaluationPrompt(
  sections: DiscoverySection[],
  projectContext: string = ''
): string {
  // Group sections by persona
  const personaGroups: Record<string, DiscoverySection[]> = {};
  
  sections.forEach(section => {
    if (!section.marker) return;
    
    const persona = DIMENSION_PERSONAS[section.marker.dimension as keyof typeof DIMENSION_PERSONAS];
    if (!persona) return;
    
    if (!personaGroups[persona]) {
      personaGroups[persona] = [];
    }
    personaGroups[persona].push(section);
  });

  const sectionContent = sections.map(section => 
    `## ${section.heading}\n${section.content.substring(0, 600)}${section.content.length > 600 ? '...' : ''}`
  ).join('\n\n');

  const evaluationTasks = Object.entries(personaGroups).map(([persona, personaSections]) => {
    const tasks = personaSections.map(section => 
      `- Evaluate "${section.heading}" for ${section.marker!.dimension.replace('-', '_')} (0-100)`
    ).join('\n');
    
    return `**Acting as BMAD ${persona}**:\n${tasks}`;
  }).join('\n\n');

  return `You are evaluating a discovery document using multiple BMAD personas. Each persona focuses on their expertise area.

${projectContext ? `PROJECT CONTEXT:\n${projectContext}\n\n` : ''}CONTENT TO EVALUATE:
${sectionContent}

EVALUATION TASKS:
${evaluationTasks}

SCORING CRITERIA:
- 0-30: Missing, placeholder, or critically incomplete
- 31-60: Present but needs significant work or detail
- 61-80: Good quality, minor gaps or improvements needed  
- 81-100: Excellent, comprehensive, well-defined

PROVIDE OVERALL ASSESSMENT:
- Stance: advocate/neutral/cautious based on overall discovery quality
- Key insight: Most important observation about this discovery
- Recommendation: What should happen next
- Confidence: How certain are you about this assessment (0-1)

Respond in JSON format:
{
  "evaluations": [
    {
      "persona": "Analyst",
      "dimension": "problem_validation", 
      "score": 85,
      "reasoning": "Brief explanation of score"
    }
  ],
  "claude_perspective": {
    "stance": "advocate",
    "key_insight": "Strong problem-solution fit despite technical gaps",
    "recommendation": "Proceed to MVP development with user validation research",
    "confidence": 0.8
  }
}`;
}

/**
 * Create focused evaluation prompt for specific dimension
 */
export function createFocusedEvaluationPrompt(
  section: DiscoverySection,
  projectContext: string = ''
): string {
  if (!section.marker) {
    throw new Error('Section must have discovery marker for evaluation');
  }

  const persona = DIMENSION_PERSONAS[section.marker.dimension as keyof typeof DIMENSION_PERSONAS];
  const dimension = section.marker.dimension.replace('-', '_');

  return `Acting as a BMAD ${persona}, evaluate this discovery section for ${dimension}.

${projectContext ? `PROJECT CONTEXT: ${projectContext}\n\n` : ''}SECTION TO EVALUATE:
## ${section.heading}
${section.content}

EVALUATION CRITERIA for ${dimension}:
${getEvaluationCriteria(section.marker.dimension)}

SCORING:
- 0-30: Missing, placeholder, or critically incomplete
- 31-60: Present but needs significant work
- 61-80: Good quality, minor improvements needed
- 81-100: Excellent, comprehensive, well-defined

Provide your assessment as JSON:
{
  "score": 75,
  "reasoning": "Brief explanation of score and what could be improved",
  "suggestions": ["Specific improvement suggestion 1", "Suggestion 2"]
}`;
}

/**
 * Get specific evaluation criteria for each dimension
 */
function getEvaluationCriteria(dimension: string): string {
  const criteria = {
    'problem-validation': `
- Is the problem clearly defined with specific pain points?
- Is there evidence of who experiences this problem?
- Does it explain why this problem matters/urgency?
- Is the problem scope appropriately bounded?`,
    
    'user-clarity': `
- Are target users specifically identified (not generic)?
- Are user needs, contexts, and constraints described?
- Is there evidence of user research or validation?
- Are user goals and success criteria clear?`,
    
    'value-definition': `
- Is the unique value proposition clearly articulated?
- Does it directly address the stated problem?
- Is it differentiated from existing solutions?
- Is the value measurable or observable?`,
    
    'technical-viability': `
- Is there a realistic technical approach outlined?
- Are key technical constraints identified?
- Are required technologies/integrations specified?
- Are resources (budget/timeline/skills) realistic?`,
    
    'validation-approach': `
- Are success metrics defined and measurable?
- Is there a plan for validating assumptions?
- Are key performance indicators specified?
- Is progress trackable and actionable?`,
    
    'risk-awareness': `
- Are key risks to success identified?
- Are both technical and business risks covered?
- Is likelihood and impact considered?
- Are mitigation strategies suggested?`,
    
    'scope-definition': `
- Is MVP scope clearly bounded and achievable?
- Are included/excluded features specified?
- Is the scope aligned with user value?
- Is delivery timeline realistic?`,
    
    'success-measurement': `
- Are user adoption metrics defined?
- Are business impact measures specified?
- Are technical quality metrics included?
- Are targets specific and time-bound?`
  };

  return criteria[dimension as keyof typeof criteria] || 'Evaluate completeness and quality of information provided.';
}

/**
 * Parse evaluation response and extract scores
 */
export function parseEvaluationResponse(response: string): EvaluationResult {
  try {
    const parsed = JSON.parse(response);
    
    // Handle batched evaluation format
    if (parsed.evaluations) {
      const dimensions: Record<string, number> = {};
      
      parsed.evaluations.forEach((evaluation: PersonaEvaluation) => {
        dimensions[evaluation.dimension] = evaluation.score;
      });
      
      return {
        dimensions,
        claude_perspective: parsed.claude_perspective
      };
    }
    
    // Handle single evaluation format
    if (parsed.score) {
      return {
        dimensions: { [parsed.dimension || 'unknown']: parsed.score },
        claude_perspective: {
          stance: 'neutral',
          key_insight: parsed.reasoning || 'Single dimension evaluation',
          recommendation: parsed.suggestions?.join('; ') || 'Continue development',
          confidence: 0.7
        }
      };
    }
    
    throw new Error('Unrecognized evaluation response format');
    
  } catch (error) {
    console.error('Failed to parse evaluation response:', error);
    
    // Fallback: basic score extraction
    const scoreMatch = response.match(/score[":]\s*(\d+)/i);
    const score = scoreMatch ? parseInt(scoreMatch[1]) : 50;
    
    return {
      dimensions: { unknown: score },
      claude_perspective: {
        stance: 'neutral',
        key_insight: 'Evaluation parsing failed',
        recommendation: 'Manual review needed',
        confidence: 0.3
      }
    };
  }
}

/**
 * Calculate weighted signal strength from dimension scores
 */
export function calculateSignalStrength(dimensions: Record<string, number>): number {
  const weights = {
    problem_validation: 0.30,   // Most critical for discovery
    user_clarity: 0.25,         // Essential for direction
    value_definition: 0.25,     // Core differentiation
    technical_viability: 0.20,  // Implementation feasibility
    validation_approach: 0.10,  // Nice to have early
    risk_awareness: 0.10,       // Important but not blocking
    scope_definition: 0.15,     // Helpful for planning
    success_measurement: 0.10   // Valuable for tracking
  };
  
  let weightedSum = 0;
  let totalWeight = 0;
  
  Object.entries(weights).forEach(([dimension, weight]) => {
    if (dimensions[dimension] !== undefined) {
      weightedSum += dimensions[dimension] * weight;
      totalWeight += weight;
    }
  });
  
  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
}

/**
 * Determine project category based on assessment
 */
export function determineCategory(
  dimensions: Record<string, number>,
  signalStrength: number
): 'discovery' | 'development' | 'opportunity' {
  // Get critical dimension scores
  const criticalDimensions = [
    dimensions.problem_validation || 0,
    dimensions.user_clarity || 0,
    dimensions.value_definition || 0,
    dimensions.technical_viability || 0
  ];
  
  const minCritical = Math.min(...criticalDimensions);
  const avgCritical = criticalDimensions.reduce((a, b) => a + b, 0) / criticalDimensions.length;
  
  // Development ready: strong across all critical dimensions
  if (signalStrength >= 80 && minCritical >= 70 && avgCritical >= 80) {
    return 'development';
  }
  
  // Opportunity: good overall but timing/resource issues
  if (signalStrength >= 70 && avgCritical >= 70) {
    return 'opportunity';
  }
  
  // Discovery: needs more work
  return 'discovery';
}

/**
 * Generate recommendations based on dimension gaps
 */
export function generateRecommendations(
  dimensions: Record<string, number>
): string[] {
  const recommendations: string[] = [];
  
  // Check each dimension for gaps
  if ((dimensions.problem_validation || 0) < 70) {
    recommendations.push('Strengthen problem definition with user research and evidence');
  }
  
  if ((dimensions.user_clarity || 0) < 70) {
    recommendations.push('Define target users more specifically with context and needs');
  }
  
  if ((dimensions.value_definition || 0) < 70) {
    recommendations.push('Clarify unique value proposition and differentiation');
  }
  
  if ((dimensions.technical_viability || 0) < 60) {
    recommendations.push('Validate technical approach and identify key constraints');
  }
  
  if ((dimensions.validation_approach || 0) < 60) {
    recommendations.push('Define success metrics and validation strategy');
  }
  
  if ((dimensions.scope_definition || 0) < 60) {
    recommendations.push('Bound MVP scope with clear included/excluded features');
  }
  
  // Prioritize the most important gaps first
  const priorityOrder = [
    'problem definition',
    'target users', 
    'value proposition',
    'technical approach',
    'success metrics',
    'MVP scope'
  ];
  
  return recommendations
    .sort((a, b) => {
      const aIndex = priorityOrder.findIndex(p => a.includes(p));
      const bIndex = priorityOrder.findIndex(p => b.includes(p));
      return aIndex - bIndex;
    })
    .slice(0, 3); // Top 3 recommendations
}