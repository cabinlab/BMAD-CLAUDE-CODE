# BMAD-CLAUDE-CODE Instructions

This guide provides detailed instructions for using the BMAD Method with Claude Code in VS Code.

## Quick Start

The fastest way to get started is with our setup script:

**macOS/Linux:**
```bash
curl -O https://raw.githubusercontent.com/cabinlab/BMAD-CLAUDE-CODE/main/setup-bmad.sh
chmod +x setup-bmad.sh
./setup-bmad.sh
```

**Windows:**
```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/cabinlab/BMAD-CLAUDE-CODE/main/setup-bmad.ps1" -OutFile "setup-bmad.ps1"
.\setup-bmad.ps1
```

## Manual Setup

If you prefer manual setup:

1. **Copy BMAD Assets**
   ```bash
   cp -r bmad-agent/ /path/to/your-project/
   cp CLAUDE.md /path/to/your-project/
   cp BMAD-CLAUDE-CODE-GUIDE.md /path/to/your-project/
   ```

2. **Create Directory Structure**
   ```bash
   mkdir -p docs/.bmad-session
   mkdir -p docs/stories
   mkdir -p docs/technical
   ```

3. **Initialize Planning Journal**
   ```bash
   cp bmad-agent/templates/planning-journal-tmpl.md docs/bmad-journal.md
   cp bmad-agent/templates/session-state-tmpl.md docs/.bmad-session/current-state.md
   ```

## Using BMAD with Claude Code

### Starting a New Project

Open your project in VS Code with Claude Code enabled and start with:

```
"Let's plan a new app using BMAD"
```

Claude Code will:
1. Set up session tracking
2. Begin discovery with the Analyst persona
3. Guide you through the complete workflow

### Available Agent Personas

Claude Code can embody these specialized roles:

| Persona | Trigger Phrase | Focus Area |
|---------|----------------|------------|
| **Analyst** | "Be my business analyst" | Discovery, research, project brief |
| **PM** | "Be my PM" | PRD creation, platform strategy |
| **Architect** | "Be my architect" | System design, security, infrastructure |
| **Data Architect** | "Be my data architect" | Data modeling, search, analytics |
| **Design Architect** | "Be my design architect" | UX/UI specs, design systems |
| **PO** | "Be my PO" | Backlog management, validation |
| **SM** | "Be my SM" | Story creation, operational excellence |

### Session Management

#### Continuing Work
```
"Continue BMAD planning"
```

Claude Code will:
1. Read your session state
2. Review planning journal
3. Resume exactly where you left off

#### Creating Checkpoints
```
"Create planning checkpoint"
```

Saves current progress and decisions for easy resumption.

#### Switching Roles
```
"Switch to architect role"
```

Changes Claude Code's active persona while maintaining context.

## BMAD Workflow Phases

### Phase 1: Discovery (Analyst)
- **Input**: Raw idea or business need
- **Process**: 5 whys, first principles, market research
- **Output**: `docs/project-brief.md`

### Phase 2: Product Definition (PM)
- **Input**: Project brief
- **Process**: Epic breakdown, MVP scoping, success metrics
- **Output**: `docs/prd.md`

### Phase 3: Architecture Design

#### Data Architecture (Data Architect)
- **Input**: PRD requirements
- **Process**: Schema design, search strategy, analytics planning
- **Output**: Data models and governance docs

#### System Architecture (Architect)
- **Input**: PRD + Data architecture
- **Process**: Service design, security, infrastructure
- **Output**: `docs/architecture.md`

#### UX/UI Design (Design Architect)
- **Input**: PRD + System architecture
- **Process**: Design system, component library, prototypes
- **Output**: `docs/ux-ui-spec.md`

### Phase 4: Story Creation (PO/SM)
- **Input**: All architecture documents
- **Process**: Epic validation, story generation, dependency mapping
- **Output**: `docs/stories/` directory with user stories

### Phase 5: Implementation (Dev + SM)
- **Input**: Approved stories
- **Process**: Feature development, operational stories, monitoring
- **Output**: Working software with proper deployment

## Template Usage

BMAD provides templates for consistent documentation:

### Core Templates
- `project-brief-tmpl.md` - Initial vision capture
- `prd-tmpl.md` - Complete product requirements
- `architecture-tmpl.md` - Technical system design
- `story-tmpl.md` - User story format

### Specialized Templates
- `front-end-architecture-tmpl.md` - UI technical design
- `front-end-spec-tmpl.md` - Design system specs
- `planning-journal-tmpl.md` - Session tracking
- `session-state-tmpl.md` - Quick context resumption

## Task Execution

BMAD includes pre-built tasks for common operations:

### Planning Tasks
- `create-prd.md` - Comprehensive PRD generation
- `create-architecture.md` - System architecture design
- `create-frontend-architecture.md` - UI architecture

### Story Management
- `create-next-story.md` - Generate next logical story
- `correct-course.md` - Analyze and fix project issues

### Quality Assurance
- `checklist-run-task.md` - Execute any checklist interactively

## Quality Gates

BMAD uses checklists to ensure quality at each phase:

### Pre-Development
- `pm-checklist.md` - Product requirements validation
- `architect-checklist.md` - Technical design review
- `po-master-checklist.md` - Overall project readiness

### During Development
- `story-draft-checklist.md` - Story quality validation
- `story-dod-checklist.md` - Definition of Done criteria

## Project Structure

A typical BMAD project looks like:

```
your-project/
├── CLAUDE.md                    # Claude Code instructions
├── BMAD-CLAUDE-CODE-GUIDE.md    # Quick reference
├── bmad-agent/                  # BMAD assets
│   ├── personas/                # Optimized personas
│   ├── templates/               # Document templates
│   ├── tasks/                   # Executable tasks
│   ├── checklists/             # Quality gates
│   └── data/                   # Knowledge base
├── docs/                       # Your artifacts
│   ├── bmad-journal.md         # Planning history
│   ├── .bmad-session/          # Session state
│   ├── project-brief.md        # Vision
│   ├── prd.md                  # Requirements
│   ├── architecture.md         # Technical design
│   ├── ux-ui-spec.md          # Design system
│   ├── stories/                # User stories
│   │   ├── epic-1.md
│   │   ├── story-1-1.md
│   │   └── story-1-2.md
│   └── technical/              # Technical specs
│       ├── api-reference.md
│       ├── data-models.md
│       └── tech-stack.md
└── src/                        # Your implementation
```

## Advanced Usage

### Complex Platforms
For marketplace or multi-tenant platforms:

1. **Start with Data Architect** to model complex data relationships
2. **Use enhanced PM persona** for platform economics
3. **Leverage enhanced Architect** for security and scalability
4. **Apply enhanced SM** for operational excellence

### Multi-Session Planning
For large projects spanning multiple planning sessions:

1. **Initialize session tracking** with setup script
2. **Use checkpoints** at phase boundaries
3. **Maintain planning journal** for decision history
4. **Resume with context** using session state

### Team Collaboration
When working with others:

1. **Share session state** files for context
2. **Use planning journal** for decision documentation
3. **Apply checklists** for consistent quality
4. **Track handoffs** between personas

## Troubleshooting

### Common Issues

**"Claude Code seems to forget context"**
- Ensure `docs/.bmad-session/current-state.md` is updated
- Use "Continue BMAD planning" to resume properly
- Create checkpoints more frequently

**"Not sure which persona to use"**
- Use the planning journal to see recent progress
- Check the workflow phase you're in
- Ask Claude Code: "What should I work on next?"

**"Templates seem too complex"**
- Start with basic sections only
- Add detail iteratively
- Focus on user value first

**"Stories don't seem ready"**
- Run `story-draft-checklist.md`
- Ensure architecture is complete
- Check for missing dependencies

### Getting Help

For issues with BMAD-CLAUDE-CODE:
1. Check this documentation
2. Review the quick reference guide
3. Open an issue on GitHub

## Best Practices

1. **Always use templates** for consistency
2. **Run checklists** before moving between phases
3. **Maintain session state** for continuity
4. **Document decisions** in planning journal
5. **Start simple** and add complexity iteratively
6. **Focus on user value** in every artifact
7. **Plan for production** from the beginning