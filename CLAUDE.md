# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Setup Instructions for Using BMAD with Claude Code

To use the BMAD Method in your project with Claude Code:

1. Copy the `bmad-agent` folder to your project root
2. Copy this `CLAUDE.md` file to your project root
3. Copy `BMAD-CLAUDE-CODE-GUIDE.md` to your project root (optional but recommended)
4. Create a `docs/` folder in your project root for BMAD artifacts

Your project structure should look like:
```
your-project/
├── CLAUDE.md               # This file (required for Claude Code)
├── BMAD-CLAUDE-CODE-GUIDE.md  # Quick reference (optional)
├── bmad-agent/             # BMAD Method assets
│   ├── templates/
│   ├── tasks/
│   ├── checklists/
│   └── data/
├── docs/                   # Your BMAD artifacts will go here
└── src/                    # Your source code
```

## Project Overview

The BMAD Method (Breakthrough Method of Agile AI-driven Development) is a framework for managing software projects using specialized AI agents. It provides tools, templates, and workflows to orchestrate AI-powered agile development teams.

## Using BMAD Method with Claude Code

Claude Code utilizes the BMAD Method by embodying specialized personas that guide you through structured workflows. Each persona provides a different perspective and uses templates from `bmad-agent/` to ensure comprehensive project development.

### BMAD Personas for Claude Code

1. **Analyst** - Challenges assumptions through deep research and investigation
2. **Product Manager** - Transforms research into prioritized requirements and user stories  
3. **Architect** - Designs technical systems that support product requirements
4. **Designer** - Advocates for user experience and interface design
5. **Developer** - Implements solutions with clean, maintainable code
6. **DevOps Engineer** - Builds infrastructure and deployment automation
7. **QA Engineer** - Ensures quality through systematic testing
8. **Data Engineer** - Designs data architecture and migration strategies
9. **Orchestrator** - Maintains process discipline and project continuity

### Core BMAD Workflow

1. **Discovery**: Analyst investigates problem space → PM creates requirements
2. **Design**: Architect creates technical design ↔ Designer creates user experience
3. **Data Architecture**: Data Engineer designs schemas and data flows
4. **Implementation**: Developer builds solution → QA validates quality
5. **Deployment**: DevOps enables automated deployment and monitoring
6. **Continuity**: Orchestrator maintains process discipline throughout

### How to Work with BMAD

- **Ask for a specific persona** when you need that perspective
- **Let personas challenge each other** - built-in friction improves thinking
- **Follow phase gates** - don't skip discovery to jump to implementation
- **Use templates** from `bmad-agent/templates/` for consistent documentation
- **Run checklists** from `bmad-agent/checklists/` before phase transitions

## BMAD Method Quick Start

### Phase 1: Project Definition
When starting a new project or feature:
1. Create a Project Brief using `bmad-agent/templates/project-brief-tmpl.md`
2. Generate a PRD using `bmad-agent/templates/prd-tmpl.md`
3. Reference `bmad-agent/data/technical-preferences.txt` for technology choices

### Phase 2: Architecture Design
For technical architecture:
1. Create architecture document using `bmad-agent/templates/architecture-tmpl.md`
2. Design frontend architecture with `bmad-agent/templates/front-end-architecture-tmpl.md`
3. Define UX/UI specifications using `bmad-agent/templates/front-end-spec-tmpl.md`

### Phase 3: Story Creation
For agile story development:
1. Execute the story creation task from `bmad-agent/tasks/create-next-story.md`
2. Use `bmad-agent/templates/story-tmpl.md` for consistent story format
3. Apply `bmad-agent/checklists/story-draft-checklist.md` before approval

### Phase 4: Implementation
During development:
1. Follow the story as single source of truth
2. Apply `bmad-agent/checklists/story-dod-checklist.md` for Definition of Done
3. Update story status throughout implementation

## Common Development Tasks

### Working with Tasks and Checklists
Claude Code executes BMAD tasks directly without compilation. Simply reference the task name or checklist when needed.

### Executing BMAD Tasks
When asked to perform a BMAD task:
1. Locate the relevant task file in `bmad-agent/tasks/`
2. Follow the task instructions exactly
3. Use associated templates and checklists as specified

### Running Checklists
To run a checklist:
1. Read the checklist file from `bmad-agent/checklists/`
2. Present each item to the user for validation
3. Track completion status
4. Ensure all items pass before proceeding

## High-Level Architecture

### Core Components

1. **Agent System** (`bmad-agent/`)
   - **Personas** (`personas/`): Define individual AI agent personalities and capabilities
   - **Tasks** (`tasks/`): Self-contained instructions for specific operations
   - **Templates** (`templates/`): Document templates for various artifacts (PRDs, architecture docs, stories)
   - **Checklists** (`checklists/`): Quality assurance and process verification lists
   - **Data** (`data/`): Knowledge base and technical preferences

2. **Claude Code Integration**
   - Personas are embodied by Claude Code rather than separate orchestrators
   - No build system needed - templates and tasks are used directly
   - Session continuity managed through documentation templates

### Key BMAD Patterns for Claude Code

1. **Persona Embodiment**: Claude Code embodies different personas on request, each providing distinct perspectives and expertise.

2. **Phase-Gated Development**: Enforced progression through Discovery → Design → Implementation with quality checkpoints.

3. **Template-Driven Documentation**: Consistent project artifacts using standardized templates that maintain coherence across sessions.

4. **External Memory**: Documentation templates compensate for Claude Code's session limitations through persistent project state.

### Workflow Architecture

The system follows an Agile-inspired workflow:
1. **Analyst/PM** agents handle requirements gathering and PRD creation
2. **Architect** agents design technical architecture
3. **PO/SM** agents break down work into stories and manage backlogs
4. **Dev** agents implement features following the defined architecture

Each agent has access to role-specific templates, checklists, and tasks to ensure consistency and quality.

## BMAD Method Reference

### Available Templates

### Core Templates
- `project-brief-tmpl.md`: Initial project vision and problem definition
- `prd-tmpl.md`: Product Requirements Document with prioritized features
- `architecture-tmpl.md`: Technical architecture with pattern selection
- `story-tmpl.md`: User stories with comprehensive acceptance criteria

### Specialized Templates  
- `front-end-architecture-tmpl.md`: Frontend technical architecture
- `front-end-spec-tmpl.md`: UI/UX design specifications
- `session-state-tmpl.md`: Session continuity for Claude Code
- `planning-journal-tmpl.md`: Decision tracking across sessions
- `doc-sharding-tmpl.md`: Documentation organization strategy

### Available Personas
- `analyst.md`: Deep research and assumption challenging
- `pm.md`: Requirements definition and story creation  
- `architect.md`: Technical system design and patterns
- `designer.md`: User experience and interface design
- `developer.md`: Implementation and code quality
- `devops.md`: Infrastructure and deployment automation
- `qa.md`: Testing strategy and quality validation
- `data-engineer.md`: Database design and data management
- `orchestrator.md`: Process management and quality gates

### Key Tasks
- `create-next-story.md`: Generate the next story in sequence
- `create-prd.md`: Create a comprehensive PRD
- `create-architecture.md`: Design system architecture
- `coordinate-multi-persona-feature.md`: Orchestrate complex multi-persona features
- `correct-course.md`: Analyze and fix project issues
- `checklist-run-task.md`: Execute any checklist interactively

### Essential Checklists
- `pm-checklist.md`: Product management quality checks
- `architect-checklist.md`: Architecture review points
- `story-draft-checklist.md`: Story quality validation
- `story-dod-checklist.md`: Definition of Done criteria
- `po-master-checklist.md`: Product owner review items

### Document Organization
When working on a BMAD project, maintain this structure:
```
docs/
├── index.md              # Project overview and navigation
├── project-brief.md      # Initial vision document
├── prd.md               # Product requirements
├── architecture.md       # Technical architecture
├── front-end-architecture.md
├── ux-ui-spec.md
├── stories/
│   ├── epic-1.md        # Epic overview with story list
│   ├── story-1-1.md     # Individual story files
│   └── story-1-2.md
└── technical/
    ├── api-reference.md
    ├── data-models.md
    └── tech-stack.md
```

## Working with BMAD in Claude Code

### Starting a New Project
When beginning a software project with BMAD:
1. **Analyst** - Investigate the problem space and challenge assumptions
2. **Product Manager** - Transform research into requirements and prioritized stories
3. **Architect** - Design technical systems that support product goals
4. **Designer** - Create user experience that serves real user needs
5. **Developer** - Implement with quality, testing, and operational excellence
6. **Orchestrator** - Maintain process discipline and documentation throughout

### Switching Personas
- **Ask explicitly** for a persona: "Please act as the BMAD Analyst"
- **Let personas challenge each other** - this improves decision quality
- **Follow natural handoffs** - Analyst → PM → Architect ↔ Designer → Developer
- **Use Orchestrator** when you need process guidance or session continuity

### Persona Identification
When embodying a BMAD persona, always start your response with a clear identifier:
- **[Analyst]**: For investigation and research responses
- **[PM]**: For product management and requirements responses
- **[Architect]**: For technical architecture responses
- **[Designer]**: For UX/UI design responses
- **[Developer]**: For implementation and coding responses
- **[DevOps]**: For infrastructure and deployment responses
- **[QA]**: For testing and quality responses
- **[Data Engineer]**: For data architecture responses
- **[Orchestrator]**: For process and continuity responses

Example:
```
User: "Act as the BMAD Analyst and investigate this problem"
Assistant: [Analyst] I'll investigate this problem space thoroughly...
```

### Quality Gates
BMAD enforces phase transitions through checklists and validation:
1. **Discovery complete** before moving to requirements
2. **Requirements stable** before architectural design
3. **Architecture decided** before implementation begins
4. **Tests written** before deployment
5. **Documentation updated** throughout

## Important Notes

- **Phase discipline**: Don't skip discovery to jump to implementation - this leads to building the wrong thing efficiently
- **Document-driven**: External documentation compensates for Claude Code's session memory limitations  
- **Quality gates**: Use checklists to validate phase completion before proceeding
- **Persona switching**: Each persona provides a different perspective to challenge assumptions and improve thinking
- **Template consistency**: Use BMAD templates to maintain project coherence across sessions
- **Session continuity**: Use session-state and planning-journal templates for multi-session projects