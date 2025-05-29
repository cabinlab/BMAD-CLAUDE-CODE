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

Claude Code can utilize the BMAD Method by following the structured workflows and using the templates provided in the `bmad-agent/` directory. When asked to help with a software project, Claude Code should:

1. **Follow the BMAD Workflow**: Project Brief → PRD → Architecture → Stories → Implementation
2. **Use BMAD Templates**: Apply templates from `bmad-agent/templates/` for consistent documentation
3. **Execute BMAD Tasks**: Reference task files in `bmad-agent/tasks/` for specific operations
4. **Apply Checklists**: Use checklists from `bmad-agent/checklists/` for quality assurance

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
1. Execute the story creation task from `bmad-agent/tasks/create-next-story-task.md`
2. Use `bmad-agent/templates/story-tmpl.md` for consistent story format
3. Apply `bmad-agent/checklists/story-draft-checklist.md` before approval

### Phase 4: Implementation
During development:
1. Follow the story as single source of truth
2. Apply `bmad-agent/checklists/story-dod-checklist.md` for Definition of Done
3. Update story status throughout implementation

## Common Development Tasks

### Building the Web Agent
To compile the web orchestrator agent for use with Gemini or ChatGPT:
```bash
node build-web-agent.js
```
This creates bundled assets in the configured build directory (default: `./web-build-sample/`).

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

2. **Orchestrators**
   - **Web Orchestrator** (`web-bmad-orchestrator-agent.md`): Manages multiple agent personas in web environments with large context windows
   - **IDE Orchestrator** (`ide-bmad-orchestrator.md`): Lightweight version for IDE integration
   - Configuration files (`.cfg.md`) define available agents and their capabilities

3. **Build System**
   - `build-web-agent.js`: Node.js script that bundles agent assets into consolidated text files
   - `build-web-agent.cfg.js`: Configuration for the build process
   - Output includes `agent-prompt.txt` and bundled resource files

### Key Architectural Patterns

1. **Agent Morphing**: The orchestrator can dynamically "become" any configured agent persona, loading their specific instructions and resources.

2. **Resource Resolution**: Agents reference resources using a `prefix#section` pattern (e.g., `personas#pm`) which the orchestrator resolves from bundled files.

3. **Task-Based Operations**: Complex workflows are decomposed into discrete tasks that any capable agent can execute.

4. **Configuration-Driven**: Agent capabilities, available tasks, and resource access are all defined in configuration files rather than hardcoded.

### Workflow Architecture

The system follows an Agile-inspired workflow:
1. **Analyst/PM** agents handle requirements gathering and PRD creation
2. **Architect** agents design technical architecture
3. **PO/SM** agents break down work into stories and manage backlogs
4. **Dev** agents implement features following the defined architecture

Each agent has access to role-specific templates, checklists, and tasks to ensure consistency and quality.

## BMAD Method Reference

### Available Templates
- `project-brief-tmpl.md`: Initial project vision and goals
- `prd-tmpl.md`: Product Requirements Document with epics and stories
- `architecture-tmpl.md`: Technical architecture and system design
- `front-end-architecture-tmpl.md`: Frontend-specific architecture
- `front-end-spec-tmpl.md`: UX/UI specifications
- `story-tmpl.md`: User story format with acceptance criteria

### Key Tasks
- `create-next-story-task.md`: Generate the next story in sequence
- `create-prd.md`: Create a comprehensive PRD
- `create-architecture.md`: Design system architecture
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
When a user asks to start a new software project:
1. Ask about their vision and goals
2. Create a project brief using the template
3. Guide them through PRD creation
4. Design the architecture
5. Break down into epics and stories

### Implementing Features
When working on implementation:
1. Always reference the current story file
2. Maintain story status (Pending → In Progress → Completed)
3. Update task completion checkboxes
4. Follow the technical guidance section
5. Validate against Definition of Done

### Quality Assurance
Before marking any artifact complete:
1. Run the appropriate checklist
2. Address any failing items
3. Get user confirmation on critical decisions
4. Update related documents if needed

## Important Notes

- The project is designed to be tool-agnostic and can be adapted to various AI platforms
- When using BMAD Method, maintain the document-driven workflow
- Always use templates for consistency
- Apply checklists before moving between phases
- Keep stories as the single source of truth during implementation