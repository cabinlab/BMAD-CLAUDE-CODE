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

// Legacy interface for backward compatibility during transition
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

// Fetch BMAD data from API route
export async function getBmadData(): Promise<DashboardData> {
  try {
    const response = await fetch('/api/bmad-data', {
      cache: 'no-store' // Ensure fresh data
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch BMAD data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching BMAD data:', error);
    
    // Fallback dummy data if API fails
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
}