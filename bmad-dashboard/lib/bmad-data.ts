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
        }
      ]
    };
  }
}