# BMAD-CLAUDE-CODE: The BMAD Method for Claude Code

This fork adapts the BMAD Method (Breakthrough Method of Agile AI-driven Development) specifically for use with Claude Code in VS Code, providing a structured approach to AI-driven software development.

## Quick Start

### Automated Setup (Recommended)

Use our setup script to automatically configure BMAD in your project:

**macOS/Linux:**
```bash
curl -O https://raw.githubusercontent.com/cabinlab/BMAD-CLAUDE-CODE/main/setup-bmad.sh
chmod +x setup-bmad.sh
./setup-bmad.sh
```

**Windows (PowerShell):**
```powershell
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/cabinlab/BMAD-CLAUDE-CODE/main/setup-bmad.ps1" -OutFile "setup-bmad.ps1"
.\setup-bmad.ps1
```

The script will:
- Copy all necessary BMAD files to your project
- Create the proper directory structure
- Initialize planning journal and session files
- Let you choose between basic and enhanced Claude.md

### Manual Setup

1. Clone this repository or download the files
2. Copy these to your project root:
   - `bmad-agent/` folder (templates, tasks, checklists)
   - `CLAUDE.md` or `CLAUDE-ENHANCED.md` (rename to CLAUDE.md)
   - `BMAD-CLAUDE-CODE-GUIDE.md` (optional quick reference)
3. Create a `docs/` folder in your project for BMAD artifacts
4. Start using BMAD with Claude Code!

## What is BMAD-CLAUDE-CODE?

This is a specialized version of the BMAD Method that works seamlessly with Claude Code's capabilities:

- **Full Planning Support**: Claude Code can embody different agent roles (Analyst, PM, Architect, PO, SM)
- **Session Continuity**: Multi-session planning with context preservation
- **Template-Driven**: Consistent, high-quality artifacts using proven templates
- **Quality Assured**: Built-in checklists ensure nothing is missed
- **Document-Centric**: All decisions and progress tracked in markdown files

## Using BMAD with Claude Code

### Starting a New Project
```
User: "Let's plan a new app using BMAD"
Claude Code: I'll help you start a new BMAD project. Let me set up the planning structure...
```

### Continuing Work
```
User: "Continue BMAD planning"
Claude Code: I see we were working on the PRD as the Product Manager...
```

### Key Commands
- **"Be my [role]"** - Claude adopts specific agent mindset
- **"Create a [document]"** - Uses appropriate template
- **"Run [checklist]"** - Executes quality checks
- **"Show planning status"** - Reviews progress

## Project Structure

```
your-project/
├── CLAUDE.md                  # Claude Code instructions
├── BMAD-CLAUDE-CODE-GUIDE.md  # Quick reference
├── bmad-agent/                # BMAD assets
│   ├── templates/             # Document templates
│   ├── tasks/                 # Executable tasks
│   ├── checklists/            # Quality checklists
│   └── data/                  # Knowledge base
├── docs/                      # Your project artifacts
│   ├── bmad-journal.md        # Planning history
│   ├── .bmad-session/         # Session continuity
│   ├── project-brief.md       # Vision document
│   ├── prd.md                 # Requirements
│   ├── architecture.md        # Technical design
│   └── stories/               # User stories
└── src/                       # Your code
```

## The BMAD Method Philosophy

The BMAD Method is a revolutionary approach that elevates "vibe coding" to advanced project planning, ensuring AI-driven development starts with clear vision and completes with explicit guidance. It provides a structured yet flexible framework to plan, execute, and manage software projects.

### Key Benefits

- **Structured Planning**: Move from idea to implementation with clear phases
- **Quality Built-In**: Checklists and templates ensure nothing is missed
- **Context Preservation**: Never lose planning decisions across sessions
- **Role-Based Thinking**: Claude Code adopts appropriate mindsets for each phase
- **Document-Driven**: All artifacts are markdown files, easy to review and version

## BMAD Workflow Phases

### 1. Discovery & Analysis
Claude Code acts as your Business Analyst to understand requirements:
- Explores business needs and user problems
- Identifies constraints and success criteria
- Creates structured project brief

### 2. Product Definition
Claude Code becomes your Product Manager to define the product:
- Creates comprehensive PRD with epics
- Defines success metrics and user stories
- Prioritizes features based on value

### 3. Technical Architecture
Claude Code serves as your Architect to design the system:
- Creates scalable technical architecture
- Defines technology stack and data models
- Designs for maintainability and growth

### 4. Story Creation & Implementation
Claude Code helps as Scrum Master and Developer:
- Generates detailed user stories
- Tracks implementation progress
- Maintains Definition of Done

## Available Resources

### Templates (`bmad-agent/templates/`)
- `project-brief-tmpl.md` - Vision and goals
- `prd-tmpl.md` - Product requirements
- `architecture-tmpl.md` - System design
- `story-tmpl.md` - User stories
- `planning-journal-tmpl.md` - Session tracking

### Tasks (`bmad-agent/tasks/`)
- `create-prd.md` - PRD creation process
- `create-architecture.md` - Architecture design
- `create-next-story-task.md` - Story generation
- `correct-course.md` - Problem analysis

### Checklists (`bmad-agent/checklists/`)
- `pm-checklist.md` - Product quality
- `architect-checklist.md` - Architecture review
- `story-draft-checklist.md` - Story validation
- `story-dod-checklist.md` - Definition of Done

## Getting Started Examples

### Example 1: Starting Fresh
```
User: "I want to build a task management app using BMAD"
Claude Code: I'll help you start a new BMAD project for your task management app. 
Let me set up the planning structure and begin with discovery...
```

### Example 2: Continuing Work
```
User: "Continue BMAD planning"
Claude Code: I see we were working on Epic 2 of your PRD. Last session we completed 
the user authentication stories. Shall we continue with the task management stories?
```

### Example 3: Running Checklists
```
User: "Run the architecture checklist"
Claude Code: I'll run through the architecture checklist for your current design.
Let's validate each aspect...
```

## Documentation

- [CLAUDE.md](CLAUDE.md) - Main instructions for Claude Code
- [CLAUDE-ENHANCED.md](CLAUDE-ENHANCED.md) - Enhanced version with full planning
- [BMAD-CLAUDE-CODE-GUIDE.md](BMAD-CLAUDE-CODE-GUIDE.md) - Quick reference
- [BMAD-SESSION-CONTINUITY.md](BMAD-SESSION-CONTINUITY.md) - Session management
- [Instructions](./docs/instruction.md) - Detailed BMAD documentation

## Contributing

This fork is specifically adapted for Claude Code. For contributions:
1. Focus on Claude Code compatibility
2. Maintain template and checklist quality
3. Enhance session continuity features
4. Improve documentation clarity

See [contributing guidelines](docs/CONTRIBUTING.md) for more details.

## Changes from Original BMAD-METHOD

This fork optimizes BMAD specifically for Claude Code by:

**Added:**
- `CLAUDE.md` & `CLAUDE-ENHANCED.md` - Claude Code instructions
- `BMAD-CLAUDE-CODE-GUIDE.md` - Quick reference
- `BMAD-SESSION-CONTINUITY.md` - Multi-session planning
- Session management templates
- Setup scripts for quick start
- `personas-claude/` - Optimized personas for Claude Code
- Data Architect persona for complex platforms

**Enhanced:**
- Streamlined all personas (80%+ size reduction)
- Added production-ready capabilities to Architect, PM, and SM
- Enhanced for multi-tenant platforms and marketplace architectures
- Added security, DevOps, and operational excellence focus

**Removed:**
- Web orchestrator files (build scripts, configs)
- IDE-specific agents (.ide.md files)
- Legacy versions (V1, V2)
- Demo outputs
- ~135 files, ~22K lines

The core BMAD templates, tasks, and checklists remain intact, with personas now optimized for both simple projects and production-scale platforms.

## Credits

BMAD-CLAUDE-CODE is a fork of the original [BMAD-METHOD](https://github.com/bmadcode/BMAD-METHOD) by bmadcode, adapted specifically for Claude Code users.

## License

[MIT License](./docs/LICENSE)
