# BMAD Method Quick Guide for Claude Code

This guide helps Claude Code execute BMAD Method workflows in VS Code. Reference this when users want to use the BMAD Method for their projects.

## 📋 Setup Instructions

**IMPORTANT**: This file should be copied to your project root along with CLAUDE.md and the bmad-agent folder.

### Initial Setup
```bash
# From the BMAD-METHOD repository, copy these to your project:
cp -r bmad-agent /path/to/your-project/
cp CLAUDE.md /path/to/your-project/
cp BMAD-CLAUDE-CODE-GUIDE.md /path/to/your-project/

# In your project, create the docs folder:
mkdir -p /path/to/your-project/docs
```

### Expected Structure
```
your-project/
├── CLAUDE.md                  # Required for Claude Code
├── BMAD-CLAUDE-CODE-GUIDE.md  # This file (for reference)
├── bmad-agent/                # BMAD templates and assets
├── docs/                      # Where BMAD artifacts go
└── src/                       # Your implementation code
```

## 🚀 Quick Start Commands

### "Let's use BMAD Method for my project"
1. Copy the `bmad-agent` folder to the project root
2. Create a `docs/` folder for all BMAD artifacts
3. Start with Phase 1: Project Definition

### "Create a Project Brief"
```
Read: bmad-agent/templates/project-brief-tmpl.md
Create: docs/project-brief.md
Focus on: Vision, goals, constraints, success criteria
```

### "Create a PRD"
```
Read: bmad-agent/templates/prd-tmpl.md
Read: bmad-agent/tasks/create-prd.md (for detailed instructions)
Requires: Completed project brief
Creates: docs/prd.md with epic breakdown
```

### "Design the Architecture"
```
Read: bmad-agent/templates/architecture-tmpl.md
Read: bmad-agent/tasks/create-architecture.md
Input: PRD and technical requirements
Creates: docs/architecture.md
```

### "Create UI/UX Specifications"
```
Read: bmad-agent/templates/front-end-spec-tmpl.md
Read: bmad-agent/tasks/create-ui-specification.md
Input: PRD and user requirements
Creates: docs/ux-ui-spec.md
```

### "Design Frontend Architecture"
```
Read: bmad-agent/templates/front-end-architecture-tmpl.md
Read: bmad-agent/tasks/create-frontend-architecture.md
Input: PRD, system architecture, UI/UX spec
Creates: docs/front-end-architecture.md
```

### "Create User Stories"
```
Read: bmad-agent/templates/story-tmpl.md
Read: bmad-agent/tasks/create-next-story.md
Process: Identify next story → Apply template → Run draft checklist
Creates: docs/stories/story-X-Y.md
```

### "Implement a Story"
```
1. Read current story file
2. Update status to "In Progress"
3. Complete tasks with checkboxes
4. Follow technical guidance
5. Run story-dod-checklist.md
6. Update status to "Completed"
```

## 📋 Checklist Execution

### Running Any Checklist
1. Read the checklist file from `bmad-agent/checklists/`
2. Present each item as a question/validation
3. Track responses (✓ Pass, ✗ Fail, ⚠️ Needs Review)
4. Summarize results and required actions

### Example Checklist Flow
```
User: "Run the story draft checklist"
Claude Code:
1. Reads bmad-agent/checklists/story-draft-checklist.md
2. "Let's review your story. First item: Does the story have a clear user role?"
3. User: "Yes, it specifies 'As a registered user'"
4. "✓ Clear user role. Next: Is the desired outcome specific and measurable?"
5. [Continue through all items]
6. "Summary: 12/15 items passed. Issues to address: ..."
```

## 🎯 Task Execution Patterns

### Pattern 1: Template-Based Creation
```
1. Read template file
2. Gather required information interactively
3. Fill template with user's content
4. Apply relevant checklist
5. Save to appropriate location
```

### Pattern 2: Analysis and Correction
```
1. Read existing artifacts
2. Identify issues or gaps
3. Propose corrections
4. Update documents
5. Validate changes
```

### Pattern 3: Story Workflow
```
1. Check epic status (docs/stories/epic-N.md)
2. Identify next story based on prerequisites
3. Create story using template
4. Link to technical docs
5. Add to epic's story list
```

## 📁 File Organization

### Standard BMAD Project Structure
```
project-root/
├── bmad-agent/          # Copy from BMAD-METHOD repo
│   ├── templates/
│   ├── tasks/
│   ├── checklists/
│   └── data/
├── docs/                # All BMAD artifacts
│   ├── index.md
│   ├── project-brief.md
│   ├── prd.md
│   ├── architecture.md
│   ├── stories/
│   │   ├── epic-1.md
│   │   ├── story-1-1.md
│   │   └── story-1-2.md
│   └── technical/
└── src/                 # Implementation code
```

## 🔄 Workflow States

### Document Status Tracking
- **Draft**: Initial creation, not reviewed
- **In Review**: Under checklist validation
- **Approved**: Passed checklist, ready for use
- **In Progress**: Actively being implemented
- **Completed**: Implementation done, DoD met

### Story States
1. **Pending**: Created but not started
2. **In Progress**: Active development
3. **Blocked**: Has impediments
4. **In Review**: Code complete, under review
5. **Completed**: All criteria met

## 💡 Common Scenarios

### "I have an idea for an app"
1. Create project brief
2. Develop PRD with epics
3. Design architecture
4. Generate first epic's stories
5. Start implementing story 1-1

### "Add a new feature to existing project"
1. Review current PRD
2. Add new epic or extend existing
3. Update architecture if needed
4. Create feature stories
5. Implement incrementally

### "Fix technical debt"
1. Run architect checklist on current architecture
2. Identify issues
3. Create technical debt epic
4. Generate refactoring stories
5. Implement with testing

## 🚨 Important Reminders

1. **Always use templates** - Don't create documents from scratch
2. **Run checklists before approval** - Quality gates matter
3. **Maintain single source of truth** - Story files during implementation
4. **Update status regularly** - Keep documents current
5. **Follow the workflow** - Brief → PRD → Architecture → Stories → Code

## 🛠️ Troubleshooting

### "Template seems too complex"
- Start with required sections only
- Add detail iteratively
- Focus on user value first

### "Not sure what story to create next"
- Check epic's story list
- Review prerequisites
- Look for "Pending" status
- Consider dependencies

### "Checklist has failing items"
- Address critical items first
- Document exceptions with rationale
- Get user approval for exceptions
- Update artifact and re-run

Remember: BMAD Method is about structured, iterative progress. Each phase builds on the previous one, creating a comprehensive blueprint for successful software development.