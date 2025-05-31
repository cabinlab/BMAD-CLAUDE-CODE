"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DualProgress } from "@/components/ui/dual-progress"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { getBmadData, type Idea } from "@/lib/bmad-data"

function IdeaCard({ idea, showEstimate = false }: { idea: Idea; showEstimate?: boolean }) {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{idea.name}</CardTitle>
          <Badge variant="outline">{idea.viability}% viable</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Viability</span>
            <span className="text-sm text-foreground/70">{idea.viability}%</span>
          </div>
          <DualProgress 
            business={idea.business} 
            technical={idea.technical} 
            showLabels={false}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-business rounded-sm"></div>
              Business: {idea.business}%
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-technical rounded-sm"></div>
              Technical: {idea.technical}%
            </span>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Completeness</span>
            <span className="text-sm text-foreground/70">{idea.completeness}%</span>
          </div>
          <div className="h-2 bg-secondary/50 rounded-md">
            <div 
              className="h-2 bg-completeness rounded-md transition-all duration-300"
              style={{ width: `${idea.completeness}%` }}
            />
          </div>
        </div>

        {showEstimate && idea.estimatedStories && (
          <div className="bg-accent/20 dark:bg-accent/10 p-3 rounded-md">
            <div className="text-sm font-medium text-foreground">
              📊 {idea.estimatedStories} core stories
            </div>
          </div>
        )}

        <div className="text-sm text-foreground/70 bg-muted/30 dark:bg-muted/20 p-2 rounded-md">
          <span className="font-medium text-foreground/80">Missing:</span> {idea.missing}
        </div>

        {idea.notes && (
          <div className="text-sm text-foreground/60 italic">
            {idea.notes}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function Dashboard() {
  const { explorations, mvp, opportunities } = getBmadData()
  
  return (
    <div className="min-h-screen bg-background p-6">
      <ThemeToggle />
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">
            BMAD Dashboard
          </h1>
          <p className="text-muted-foreground text-base">
            Track ideas from exploration to production • Powered by Claude Code
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            🔬 Explorations
            <Badge variant="secondary" className="ml-3">
              {explorations.length} active
            </Badge>
          </h2>
          <p className="text-muted-foreground mb-6">
            Ideas being validated - low commitment, high learning
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {explorations.map((idea) => (
              <IdeaCard key={idea.name} idea={idea} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            🎯 MVP Candidates
            <Badge variant="secondary" className="ml-3">
              Ranked by viability
            </Badge>
          </h2>
          <p className="text-muted-foreground mb-6">
            Validated ideas ready for development consideration
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mvp.map((idea, index) => (
              <div key={idea.name} className="relative">
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-semibold text-sm z-10 shadow-sm">
                  {index + 1}
                </div>
                <IdeaCard idea={idea} showEstimate={true} />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            💡 Opportunities
            <Badge variant="secondary" className="ml-3">
              {opportunities.length} validated
            </Badge>
          </h2>
          <p className="text-muted-foreground mb-6">
            Validated ideas for future consideration
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {opportunities.map((idea) => (
              <IdeaCard key={idea.name} idea={idea} />
            ))}
          </div>
        </section>

        <footer className="text-center text-muted-foreground text-sm pt-8 mt-12 border-t border-border">
          <p className="flex items-center justify-center gap-1.5">
            Built with
            <span className="text-accent font-medium">Claude Code</span>
            by Anthropic
          </p>
          <p className="text-xs mt-1">Last updated: {new Date().toLocaleString()}</p>
        </footer>
      </div>
    </div>
  )
}