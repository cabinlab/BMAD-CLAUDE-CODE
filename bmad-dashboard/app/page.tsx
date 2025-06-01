"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { getBmadData, type DiscoveryIdea, type DashboardData } from "@/lib/bmad-data"

// Assessment Overview Components with Category Filters
function AssessmentOverview({ 
  data, 
  activeFilter, 
  onFilterChange 
}: { 
  data: DashboardData;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}) {
  const totalIdeas = data.discovery.length + data.development.length + data.opportunity.length
  const avgSignalStrength = totalIdeas > 0 ? 
    Math.round([...data.discovery, ...data.development, ...data.opportunity]
      .reduce((sum, idea) => sum + idea.signal_strength, 0) / totalIdeas) : 0

  const filterButtons = [
    {
      key: 'discovery',
      icon: '🔬',
      count: data.discovery.length,
      label: 'Discovery Ideas',
      color: 'bg-[#4FC3C1]'  // Cyan-teal complementary to Claude orange
    },
    {
      key: 'development', 
      icon: '🎯',
      count: data.development.length,
      label: 'Ready for Dev',
      color: 'bg-[#F4845F]'  // Main Claude orange
    },
    {
      key: 'opportunity',
      icon: '💡', 
      count: data.opportunity.length,
      label: 'Opportunities',
      color: 'bg-[#E8723A]'  // Deeper Claude orange
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-4 mb-8">
      {filterButtons.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(activeFilter === filter.key ? 'all' : filter.key)}
          className={`group transition-all duration-200 ${
            activeFilter === filter.key 
              ? 'scale-105 shadow-lg' 
              : 'hover:scale-102 hover:shadow-md'
          }`}
        >
          <Card className={`cursor-pointer transition-all duration-200 ${
            activeFilter === filter.key 
              ? 'ring-2 ring-accent border-accent' 
              : 'hover:border-accent/50'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-2 ${filter.color}/10 rounded-lg transition-colors duration-200 ${
                  activeFilter === filter.key ? `${filter.color}/20` : ''
                }`}>
                  <span className="text-xl">{filter.icon}</span>
                </div>
                <div className="ml-4">
                  <p className="text-2xl font-bold">{filter.count}</p>
                  <p className="text-xs text-muted-foreground">{filter.label}</p>
                </div>
                {activeFilter === filter.key && (
                  <div className="ml-auto">
                    <Badge variant="secondary" className="text-xs">
                      Active
                    </Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </button>
      ))}
      
      {/* Average Signal - Non-clickable */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              📊
            </div>
            <div className="ml-4">
              <p className="text-2xl font-bold">{avgSignalStrength}%</p>
              <p className="text-xs text-muted-foreground">Avg Signal</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Compact overview card for high-level view
function CompactIdeaCard({ idea }: { idea: DiscoveryIdea }) {
  const getStanceColor = (stance: string) => {
    switch (stance) {
      case 'advocate': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
      case 'cautious': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20'
      case 'neutral': return 'text-[#4FC3C1] bg-[#4FC3C1]/10 dark:text-[#4FC3C1] dark:bg-[#4FC3C1]/20'
      default: return 'text-[#4FC3C1] bg-[#4FC3C1]/10 dark:text-[#4FC3C1] dark:bg-[#4FC3C1]/20'
    }
  }

  const getBadgeVariant = (signalStrength: number) => {
    if (signalStrength >= 80) return 'default'
    if (signalStrength >= 60) return 'secondary'
    return 'outline'
  }

  const topDimensions = Object.entries(idea.dimensions)
    .filter(([_, score]) => score !== undefined)
    .sort(([_, a], [__, b]) => (b || 0) - (a || 0))
    .slice(0, 3)

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-lg leading-tight">{idea.name}</h3>
          <Badge variant={getBadgeVariant(idea.signal_strength)} className="ml-2 shrink-0">
            {idea.signal_strength}%
          </Badge>
        </div>
        
        <div className="space-y-3">
          {/* Signal strength bar */}
          <div>
            <Progress value={idea.signal_strength} className="h-2" style={{
              background: 'rgba(95, 132, 244, 0.1)'
            }} />
          </div>

          {/* Top 3 dimensions */}
          <div className="space-y-1">
            {topDimensions.map(([dimension, score]) => (
              <div key={dimension} className="flex justify-between text-sm">
                <span className="text-muted-foreground capitalize">
                  {dimension.replace(/_/g, ' ')}
                </span>
                <span className="font-medium">{score}%</span>
              </div>
            ))}
          </div>

          {/* Claude's stance */}
          {idea.claude_perspective && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Claude's take:</span>
              <Badge variant="outline" className={`text-xs ${getStanceColor(idea.claude_perspective.stance)}`}>
                {idea.claude_perspective.stance}
              </Badge>
            </div>
          )}

          {/* Missing count */}
          {idea.missing.length > 0 && (
            <div className="text-xs text-muted-foreground">
              {idea.missing.length} areas need work
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function PersonaSegmentedBars({ idea }: { idea: DiscoveryIdea }) {
  const dimensions = [
    { 
      key: 'problem_validation', 
      label: 'Problem', 
      fullLabel: 'Problem Validation',
      icon: '🎯', 
      persona: 'Analyst',
      description: 'How clearly defined and validated is the problem? Includes specific pain points, affected users, urgency, and appropriate scope boundaries.',
      higherIsBetter: true
    },
    { 
      key: 'user_clarity', 
      label: 'Users', 
      fullLabel: 'User Clarity',
      icon: '👥', 
      persona: 'PM',
      description: 'How specifically are target users identified? Includes user research evidence, needs/contexts, constraints, and success criteria.',
      higherIsBetter: true
    },
    { 
      key: 'value_definition', 
      label: 'Value', 
      fullLabel: 'Value Definition',
      icon: '💰', 
      persona: 'PM',
      description: 'How clearly articulated is the unique value proposition? Includes problem alignment, differentiation, and measurable value.',
      higherIsBetter: true
    },
    { 
      key: 'technical_viability', 
      label: 'Technical', 
      fullLabel: 'Technical Viability',
      icon: '⚙️', 
      persona: 'Architect',
      description: 'How realistic is the technical approach? Includes constraints identification, technology requirements, and resource realism.',
      higherIsBetter: true
    },
    { 
      key: 'validation_approach', 
      label: 'Validation', 
      fullLabel: 'Validation Approach',
      icon: '🧪', 
      persona: 'Analyst',
      description: 'How well-defined is the validation strategy? Includes success metrics, assumption testing plans, and progress tracking.',
      higherIsBetter: true
    },
    { 
      key: 'risk_awareness', 
      label: 'Risk Awareness', 
      fullLabel: 'Risk Awareness',
      icon: '🛡️', 
      persona: 'Orchestrator',
      description: 'How thoroughly are risks identified and planned for? Includes technical/business risks, likelihood/impact assessment, and mitigation strategies.',
      higherIsBetter: true
    },
    { 
      key: 'scope_definition', 
      label: 'Scope', 
      fullLabel: 'Scope Definition',
      icon: '📏', 
      persona: 'Architect',
      description: 'How clearly bounded and achievable is the MVP scope? Includes feature inclusion/exclusion, user value alignment, and realistic timelines.',
      higherIsBetter: true
    },
    { 
      key: 'success_measurement', 
      label: 'Success', 
      fullLabel: 'Success Measurement',
      icon: '📈', 
      persona: 'PM',
      description: 'How well-defined are success metrics? Includes user adoption, business impact, technical quality metrics, and specific targets.',
      higherIsBetter: true
    }
  ]

  // Group dimensions by persona
  const personaGroups = dimensions.reduce((groups, dimension) => {
    const persona = dimension.persona
    if (!groups[persona]) groups[persona] = []
    groups[persona].push(dimension)
    return groups
  }, {} as Record<string, typeof dimensions>)

  const getPersonaColor = (persona: string) => {
    // All personas use Claude orange family - maintaining distinction through different shades
    switch (persona) {
      case 'Analyst': return { bg: 'bg-[#F4845F]', text: 'text-[#F4845F]', light: 'bg-[#F4845F]/10' }
      case 'PM': return { bg: 'bg-[#F4845F]', text: 'text-[#F4845F]', light: 'bg-[#F4845F]/10' }
      case 'Architect': return { bg: 'bg-[#D97045]', text: 'text-[#D97045]', light: 'bg-[#D97045]/10' }
      case 'Orchestrator': return { bg: 'bg-[#E8723A]', text: 'text-[#E8723A]', light: 'bg-[#E8723A]/10' }
      default: return { bg: 'bg-[#F4845F]', text: 'text-[#F4845F]', light: 'bg-[#F4845F]/10' }
    }
  }

  const getSegmentColors = (persona: string, index: number) => {
    // Use persona-specific orange color families for better distinction
    const colorsByPersona = {
      'Analyst': ['bg-[#F4845F]', 'bg-[#F69876]'],
      'PM': ['bg-[#F4845F]', 'bg-[#F69876]', 'bg-[#E8723A]'],
      'Architect': ['bg-[#D97045]', 'bg-[#C96A3F]'],
      'Orchestrator': ['bg-[#E8723A]']
    }
    const colors = colorsByPersona[persona as keyof typeof colorsByPersona] || ['bg-[#F4845F]']
    return colors[index % colors.length] || 'bg-[#F4845F]'
  }

  return (
    <div className="space-y-4">
      {Object.entries(personaGroups).map(([persona, personaDimensions]) => {
        const personaScores = personaDimensions
          .map(dim => ({ 
            ...dim, 
            score: idea.dimensions[dim.key as keyof typeof idea.dimensions] || 0 
          }))
          .filter(dim => dim.score > 0)

        if (personaScores.length === 0) return null

        const totalScore = personaScores.reduce((sum, dim) => sum + dim.score, 0)
        const avgScore = totalScore / personaScores.length
        const colors = getPersonaColor(persona)

        return (
          <div key={persona} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className={`text-xs ${colors.text} ${colors.light}`}>
                  {persona}
                </Badge>
                <span className="text-sm font-medium">{Math.round(avgScore)}% avg</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {personaScores.length} dimension{personaScores.length > 1 ? 's' : ''}
              </div>
            </div>
            
            {/* Segmented progress bar */}
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full flex gap-0.5">
                {personaScores.map((dim, index) => {
                  const segmentWidth = (dim.score / personaScores.length) / 100 * 100
                  const dimensionInfo = dimensions.find(d => d.key === dim.key)
                  return (
                    <div
                      key={dim.key}
                      className={`h-full transition-all duration-300 ${getSegmentColors(persona, index)} cursor-help rounded-sm`}
                      style={{ width: `${segmentWidth}%` }}
                      title={`${dimensionInfo?.fullLabel}: ${dim.score}%\n\n${dimensionInfo?.description}`}
                    />
                  )
                })}
              </div>
            </div>
            
            {/* Dimension labels aligned with segments */}
            <div className="relative text-xs h-5 mt-1">
              {personaScores.map((dim, index) => {
                const dimensionInfo = dimensions.find(d => d.key === dim.key)
                // Calculate the position based on previous segments
                let leftPosition = 0
                for (let i = 0; i < index; i++) {
                  leftPosition += (personaScores[i].score / personaScores.length) / 100 * 100
                }
                
                return (
                  <div 
                    key={dim.key} 
                    className="absolute flex items-center space-x-1 cursor-help"
                    style={{ left: `${leftPosition}%` }}
                    title={`${dimensionInfo?.fullLabel}: ${dim.score}%\n\n${dimensionInfo?.description}`}
                  >
                    <div 
                      className={`w-2 h-2 rounded-full ${getSegmentColors(persona, index)}`}
                    />
                    <span className="text-muted-foreground whitespace-nowrap">
                      {dim.icon} {dim.label}: {dim.score}%
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DimensionBreakdown({ idea }: { idea: DiscoveryIdea }) {
  const dimensions = [
    { key: 'problem_validation', label: 'Problem', icon: '🎯', persona: 'Analyst' },
    { key: 'user_clarity', label: 'Users', icon: '👥', persona: 'PM' },
    { key: 'value_definition', label: 'Value', icon: '💰', persona: 'PM' },
    { key: 'technical_viability', label: 'Technical', icon: '⚙️', persona: 'Architect' },
    { key: 'validation_approach', label: 'Validation', icon: '🧪', persona: 'Analyst' },
    { key: 'risk_awareness', label: 'Risks', icon: '🛡️', persona: 'Orchestrator' },
    { key: 'scope_definition', label: 'Scope', icon: '📏', persona: 'Architect' },
    { key: 'success_measurement', label: 'Success', icon: '📈', persona: 'PM' }
  ]

  const getScoreColor = (score: number | undefined) => {
    if (!score) return 'bg-gray-200'
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    if (score >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getPersonaColor = (persona: string) => {
    switch (persona) {
      case 'Analyst': return 'text-[#F4845F] bg-[#F4845F]/10 dark:text-[#F4845F] dark:bg-[#F4845F]/20'
      case 'PM': return 'text-[#F4845F] bg-[#F4845F]/10 dark:text-[#F4845F] dark:bg-[#F4845F]/20'
      case 'Architect': return 'text-[#D97045] bg-[#D97045]/10 dark:text-[#D97045] dark:bg-[#D97045]/20'
      case 'Orchestrator': return 'text-[#E8723A] bg-[#E8723A]/10 dark:text-[#E8723A] dark:bg-[#E8723A]/20'
      default: return 'text-[#4FC3C1] bg-[#4FC3C1]/10 dark:text-[#4FC3C1] dark:bg-[#4FC3C1]/20'
    }
  }

  return (
    <div className="space-y-3">
      {dimensions.map(({ key, label, icon, persona }) => {
        const score = idea.dimensions[key as keyof typeof idea.dimensions]
        return (
          <div key={key} className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 w-24">
              <span className="text-lg">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </div>
            <div className="flex-1">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${getScoreColor(score)}`}
                  style={{ width: `${score || 0}%` }}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium w-8">{score || 0}%</span>
              <Badge variant="outline" className={`text-xs ${getPersonaColor(persona)}`}>
                {persona}
              </Badge>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function DetailedIdeaCard({ idea }: { idea: DiscoveryIdea }) {
  const getStanceColor = (stance: string) => {
    switch (stance) {
      case 'advocate': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20'
      case 'cautious': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20'
      case 'neutral': return 'text-[#4FC3C1] bg-[#4FC3C1]/10 dark:text-[#4FC3C1] dark:bg-[#4FC3C1]/20'
      default: return 'text-[#4FC3C1] bg-[#4FC3C1]/10 dark:text-[#4FC3C1] dark:bg-[#4FC3C1]/20'
    }
  }

  const getBadgeVariant = (signalStrength: number) => {
    if (signalStrength >= 80) return 'default'
    if (signalStrength >= 60) return 'secondary'
    return 'outline'
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{idea.name}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant={getBadgeVariant(idea.signal_strength)} className="px-3 py-1">
              {idea.signal_strength}% signal
            </Badge>
            <Badge variant="outline" className={`capitalize ${idea.claude_perspective ? getStanceColor(idea.claude_perspective.stance) : ''}`}>
              {idea.claude_perspective?.stance || 'pending'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Signal Strength Visualization */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium">Overall Signal Strength</span>
            <span className="text-sm text-foreground/70">{idea.signal_strength}%</span>
          </div>
          <Progress value={idea.signal_strength} className="h-3" style={{
            background: 'rgba(95, 132, 244, 0.1)'
          }} />
        </div>

        {/* Persona Assessment Breakdown */}
        <div>
          <h4 className="text-sm font-medium mb-4">Persona Assessment Breakdown</h4>
          <PersonaSegmentedBars idea={idea} />
        </div>

        {/* Claude's Perspective */}
        {idea.claude_perspective && (
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Claude's Assessment</span>
              <div className="flex items-center space-x-2">
                <Badge className={`capitalize ${getStanceColor(idea.claude_perspective.stance)}`}>
                  {idea.claude_perspective.stance}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {Math.round(idea.claude_perspective.confidence * 100)}% confident
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-foreground/80">
                <strong>Key Insight:</strong> {idea.claude_perspective.key_insight}
              </p>
              <p className="text-sm text-foreground/70">
                <strong>Recommendation:</strong> {idea.claude_perspective.recommendation}
              </p>
            </div>
          </div>
        )}

        {/* Missing Items */}
        {idea.missing.length > 0 && (
          <div>
            <span className="text-sm font-medium text-foreground/90 block mb-2">Areas Needing Work:</span>
            <div className="flex flex-wrap gap-2">
              {idea.missing.map((item, index) => (
                <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="text-xs text-muted-foreground pt-2 border-t">
          Category: {idea.category} • Last updated: {idea.last_updated ? new Date(idea.last_updated).toLocaleDateString() : 'Never'}
        </div>
      </CardContent>
    </Card>
  )
}

function LoadingCard() {
  return (
    <Card className="mb-4 animate-pulse">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="h-5 bg-muted rounded w-32"></div>
          <div className="h-6 bg-muted rounded w-20"></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-2 bg-muted rounded w-full"></div>
        <div className="h-2 bg-muted rounded w-full"></div>
        <div className="h-8 bg-muted rounded w-full"></div>
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const fetchData = async () => {
    try {
      const bmadData = await getBmadData()
      setData(bmadData)
    } catch (error) {
      console.error('Failed to fetch BMAD data:', error)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    try {
      // Clear cache first
      await fetch('/api/bmad-data/refresh', { method: 'POST' })
      // Then fetch fresh data
      await fetchData()
    } catch (error) {
      console.error('Failed to refresh data:', error)
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    async function initialLoad() {
      await fetchData()
      setLoading(false)
    }
    initialLoad()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="fixed top-6 right-6 flex gap-2 z-10">
          <button
            onClick={refreshData}
            disabled={refreshing}
            className="px-3 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/20 rounded-md text-sm font-medium text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {refreshing ? '↻ Refreshing...' : '↻ Refresh'}
          </button>
          <ThemeToggle />
        </div>
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
              BMAD Assessment Dashboard
            </h1>
            <p className="text-muted-foreground text-base">
              Persona-driven discovery assessment • Powered by Claude Code
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <LoadingCard />
            <LoadingCard />
            <LoadingCard />
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="fixed top-6 right-6 flex gap-2 z-10">
          <button
            onClick={refreshData}
            disabled={refreshing}
            className="px-3 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/20 rounded-md text-sm font-medium text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {refreshing ? '↻ Refreshing...' : '↻ Refresh'}
          </button>
          <ThemeToggle />
        </div>
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
              BMAD Assessment Dashboard
            </h1>
            <p className="text-muted-foreground text-base">
              Unable to load project data • Try refreshing
            </p>
          </header>
        </div>
      </div>
    )
  }

  const { discovery, development, opportunity } = data
  const allIdeas = [...discovery, ...development, ...opportunity]

  // Filter ideas based on active category filter
  const getFilteredIdeas = () => {
    switch (categoryFilter) {
      case 'discovery':
        return { discovery, development: [], opportunity: [], all: discovery }
      case 'development':
        return { discovery: [], development, opportunity: [], all: development }
      case 'opportunity':
        return { discovery: [], development: [], opportunity, all: opportunity }
      default:
        return { discovery, development, opportunity, all: allIdeas }
    }
  }

  const filteredData = getFilteredIdeas()
  const showingSingleCategory = categoryFilter !== 'all'
  
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="fixed top-6 right-6 flex gap-2 z-10">
        <div className="flex bg-muted rounded-lg p-1">
          <button
            onClick={() => setViewMode('overview')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              viewMode === 'overview' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-foreground/60 hover:text-foreground/80 hover:bg-background/50'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setViewMode('detailed')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              viewMode === 'detailed' 
                ? 'bg-background text-foreground shadow-sm' 
                : 'text-foreground/60 hover:text-foreground/80 hover:bg-background/50'
            }`}
          >
            🔍 Detailed
          </button>
        </div>
        <button
          onClick={refreshData}
          disabled={refreshing}
          className="px-3 py-2 bg-accent/10 hover:bg-accent/20 border border-accent/20 rounded-md text-sm font-medium text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {refreshing ? '↻ Refreshing...' : '↻ Refresh'}
        </button>
        <ThemeToggle />
      </div>
      
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
            BMAD Assessment Dashboard
          </h1>
          <p className="text-muted-foreground text-base">
            Persona-driven discovery assessment with signal strength analysis
          </p>
        </header>

        {/* Assessment Overview */}
        <AssessmentOverview 
          data={data} 
          activeFilter={categoryFilter}
          onFilterChange={setCategoryFilter}
        />

        {/* Filter indicator */}
        {showingSingleCategory && (
          <div className="mb-6 flex items-center gap-3">
            <Badge variant="outline" className="capitalize">
              Showing: {categoryFilter.replace('_', ' ')}
            </Badge>
            <button
              onClick={() => setCategoryFilter('all')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Show all categories →
            </button>
          </div>
        )}

        {viewMode === 'overview' ? (
          <div className="space-y-12">
            {showingSingleCategory ? (
              /* Single Category View */
              <section>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredData.all.map((idea, index) => (
                    <div key={idea.name} className="relative">
                      {categoryFilter === 'development' && (
                        <div className="absolute -top-2 -left-2 w-7 h-7 bg-[#F4845F] text-white rounded-full flex items-center justify-center font-semibold text-xs z-10 shadow-lg">
                          {index + 1}
                        </div>
                      )}
                      <CompactIdeaCard idea={idea} />
                    </div>
                  ))}
                </div>
                {filteredData.all.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No {categoryFilter} ideas found
                  </div>
                )}
              </section>
            ) : (
              /* All Categories View */
              <>
                {/* Discovery Section */}
                {filteredData.discovery.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                      🔬 Discovery Phase
                      <Badge variant="secondary" className="ml-3">
                        {filteredData.discovery.length} ideas
                      </Badge>
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Ideas being validated through persona-based assessment
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredData.discovery.map((idea) => (
                        <CompactIdeaCard key={idea.name} idea={idea} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Development Section */}
                {filteredData.development.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                      🎯 Development Ready
                      <Badge variant="secondary" className="ml-3">
                        {filteredData.development.length} validated
                      </Badge>
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Ideas with strong signal strength ready for implementation
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredData.development.map((idea, index) => (
                        <div key={idea.name} className="relative">
                          <div className="absolute -top-2 -left-2 w-7 h-7 bg-[#F4845F] text-white rounded-full flex items-center justify-center font-semibold text-xs z-10 shadow-lg">
                            {index + 1}
                          </div>
                          <CompactIdeaCard idea={idea} />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Opportunities Section */}
                {filteredData.opportunity.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-semibold mb-6 flex items-center">
                      💡 Future Opportunities
                      <Badge variant="secondary" className="ml-3">
                        {filteredData.opportunity.length} validated
                      </Badge>
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Well-assessed ideas awaiting resource allocation
                    </p>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {filteredData.opportunity.map((idea) => (
                        <CompactIdeaCard key={idea.name} idea={idea} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Summary insights - only show when viewing all categories */}
                <section className="mt-12 pt-8 border-t border-border">
                  <h2 className="text-xl font-semibold mb-4">Portfolio Insights</h2>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Strongest Signal</div>
                        <div className="font-semibold">
                          {[...allIdeas].sort((a, b) => b.signal_strength - a.signal_strength)[0]?.name || 'None'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {[...allIdeas].sort((a, b) => b.signal_strength - a.signal_strength)[0]?.signal_strength || 0}% signal strength
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Ready for Development</div>
                        <div className="font-semibold">{development.length} ideas</div>
                        <div className="text-xs text-muted-foreground">
                          Avg {development.length > 0 ? Math.round(development.reduce((sum, idea) => sum + idea.signal_strength, 0) / development.length) : 0}% signal
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-1">Need Attention</div>
                        <div className="font-semibold">
                          {allIdeas.filter(idea => idea.signal_strength < 60).length} ideas
                        </div>
                        <div className="text-xs text-muted-foreground">Below 60% signal threshold</div>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Detailed Assessment Analysis</h2>
              <div className="text-sm text-muted-foreground">
                Showing full breakdowns for {filteredData.all.length} ideas
              </div>
            </div>
            <div className="space-y-6">
              {filteredData.all
                .sort((a, b) => b.signal_strength - a.signal_strength)
                .map((idea, index) => (
                <div key={idea.name} className="relative">
                  {index < 3 && (
                    <div className="absolute -top-2 -left-2 w-8 h-8 bg-[#F4845F] text-white rounded-full flex items-center justify-center font-semibold text-sm z-10 shadow-lg">
                      {index + 1}
                    </div>
                  )}
                  <DetailedIdeaCard idea={idea} />
                </div>
              ))}
            </div>
          </div>
        )}

        <footer className="text-center text-muted-foreground text-sm pt-8 mt-12 border-t border-border">
          <p className="flex items-center justify-center gap-1.5">
            Built with
            <span className="text-accent font-medium">Claude Code</span>
            by Anthropic
          </p>
          <p className="text-xs mt-1">Assessment powered by BMAD personas • Last updated: {new Date().toLocaleString()}</p>
        </footer>
      </div>
    </div>
  )
}