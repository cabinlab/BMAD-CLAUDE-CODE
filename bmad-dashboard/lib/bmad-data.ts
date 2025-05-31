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

// Dummy data for testing
export function getBmadData(): DashboardData {
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
      },
      {
        name: "Simple Todo List",
        viability: 65,
        completeness: 75,
        business: 20,
        technical: 45,
        missing: "Monetization strategy",
        notes: "Easy to build, hard to monetize",
        estimatedStories: 15
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
      },
      {
        name: "API Marketplace",
        viability: 70,
        completeness: 55,
        business: 30,
        technical: 40,
        missing: "Market timing assessment",
        notes: "Technical feasibility proven, market timing uncertain"
      }
    ]
  };
}