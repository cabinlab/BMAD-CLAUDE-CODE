# BMAD-CLAUDE-CODE: The BMAD Method for Claude Code

This optimized version of the BMAD Method (Breakthrough Method of Agile AI-driven Development) is specifically designed for Claude Code, providing a comprehensive framework for professional software development with AI assistance.

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

This is a specialized version of the BMAD Method optimized for Claude Code's capabilities:

- **9 Specialized Personas**: Claude Code embodies Analyst, Product Manager, Architect, Designer, Developer, DevOps Engineer, QA Engineer, Data Engineer, and Orchestrator roles
- **Architecture-Agnostic Templates**: Modern templates supporting microservices, monoliths, serverless, and edge computing
- **Implementation Excellence**: Enhanced tasks for coding, testing, debugging, and deployment
- **Comprehensive Quality Gates**: 13 validation checklists ensure professional standards
- **Session Continuity**: Multi-session planning with context preservation
- **Built-in Friction**: Personas challenge each other to improve decision quality

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
- **"Act as the BMAD [Persona]"** - Claude adopts specific persona mindset
- **"Create a [document]"** - Uses appropriate BMAD template
- **"Run [checklist]"** - Executes quality validation
- **"Show planning status"** - Reviews progress and next steps

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
**Analyst** persona investigates and challenges assumptions:
- Deep research into problem space and constraints
- Competitive analysis and market validation
- Edge case identification and risk assessment

### 2. Product Definition
**Product Manager** persona transforms research into requirements:
- Creates comprehensive PRD with prioritized features
- Defines user stories with clear acceptance criteria
- Establishes success metrics and MVP scope

### 3. Technical & UX Design
**Architect** and **Designer** personas create system design:
- Architecture patterns for scalability and maintainability
- API specifications and security modeling
- User experience flows and interface design

### 4. Implementation & Quality
**Developer** persona builds the solution:
- Clean code implementation following best practices
- Debugging and refactoring for maintainability
- Technical documentation and code reviews

**QA Engineer** persona ensures quality:
- Test strategy design and test automation
- Performance and security testing
- Independent quality validation

### 5. Data Management
**Data Engineer** persona architects information flow:
- Database schema design and optimization
- Data migration and ETL pipeline creation
- Privacy compliance and data governance

### 6. Infrastructure & Operations
**DevOps Engineer** persona enables deployment:
- CI/CD pipeline setup and automation
- Infrastructure design and monitoring
- Security hardening and cost optimization

### 7. Process & Continuity
**Orchestrator** persona maintains project discipline:
- Quality gates and validation checkpoints
- Change management and course correction
- Session continuity and knowledge preservation

## Available Resources

### Templates (`bmad-agent/templates/`) - 10 Total
**Core Templates:**
- `project-brief-tmpl.md` - Vision and problem definition
- `prd-tmpl.md` - Product requirements with pattern guidance
- `architecture-tmpl.md` - System design with architecture patterns
- `story-tmpl.md` - User stories with comprehensive DoD

**Specialized Templates:**
- `front-end-architecture-tmpl.md` - Frontend technical design
- `front-end-spec-tmpl.md` - UI/UX specifications
- `test-strategy-tmpl.md` - Comprehensive testing approach
- `session-state-tmpl.md` - Session continuity tracking
- `planning-journal-tmpl.md` - Decision history across sessions
- `doc-sharding-tmpl.md` - Documentation organization

### Tasks (`bmad-agent/tasks/`) - 19 Total
**Core Tasks:**
- `create-prd.md` - Requirements definition
- `create-architecture.md` - System design
- `create-next-story.md` - User story creation
- `create-deep-research.md` - Investigation and analysis

**Design & Architecture Tasks:**
- `create-api-specification.md` - API design and contracts
- `create-frontend-architecture.md` - Frontend system design
- `create-ui-specification.md` - UI/UX design specifications
- `create-database-design.md` - Database schema design
- `security-threat-model.md` - Security analysis

**Implementation Tasks:**
- `implement-story.md` - Guided code implementation
- `create-test-strategy.md` - Comprehensive testing approach
- `generate-tests.md` - Comprehensive test creation
- `debug-issue.md` - Systematic debugging
- `create-deployment-pipeline.md` - CI/CD setup
- `create-data-migration-strategy.md` - Data migration planning

**Process Tasks:**
- `coordinate-multi-persona-feature.md` - Multi-persona coordination
- `correct-course.md` - Change management
- `core-dump.md` - Session memory capture
- `checklist-run-task.md` - Quality gate execution

### Checklists (`bmad-agent/checklists/`) - 13 Total
**Product & Requirements:**
- `pm-checklist.md` - PRD quality validation
- `po-master-checklist.md` - Backlog readiness
- `story-draft-checklist.md` - Story quality validation
- `story-dod-checklist.md` - Definition of Done

**Architecture & Design:**
- `architect-checklist.md` - System architecture review
- `frontend-architecture-checklist.md` - Frontend design validation
- `api-design-checklist.md` - API specification quality
- `security-threat-model-checklist.md` - Security analysis validation

**Implementation & Quality:**
- `implementation-quality-checklist.md` - Code quality standards
- `test-suite-quality-checklist.md` - Test coverage validation
- `deployment-pipeline-checklist.md` - CI/CD quality validation
- `debug-process-checklist.md` - Issue resolution validation
- `change-checklist.md` - Change management validation

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

## Session Management Options

### Basic Setup (CLAUDE.md)
Use for simple, single-session projects:
- Copy `CLAUDE.md` as-is to your project root
- No session tracking needed  
- Best for small features or quick prototypes
- All planning happens in one session

### Enhanced Setup (CLAUDE-ENHANCED.md)  
Use for complex, multi-session planning:
- Copy `CLAUDE-ENHANCED.md` to your project root and rename to `CLAUDE.md`
- Create `docs/.bmad-session/` directory for session state tracking
- Enable planning journal (`docs/bmad-journal.md`) for decision history
- Best for full application development with extended planning phases
- Supports resuming work across multiple Claude Code sessions

## Documentation

- [CLAUDE.md](CLAUDE.md) - Main instructions for Claude Code
- [CLAUDE-ENHANCED.md](CLAUDE-ENHANCED.md) - Enhanced version with full planning
- [BMAD-CLAUDE-CODE-GUIDE.md](BMAD-CLAUDE-CODE-GUIDE.md) - Quick reference
- [BMAD-SESSION-CONTINUITY.md](BMAD-SESSION-CONTINUITY.md) - Session management
- [Instructions](./docs/instruction.md) - Detailed BMAD documentation

## Contributing

This fork is very experimental, and probably not at a point contributions make sense.

## Key Features

**🎯 Claude Code Optimized:**
- 9 specialized personas designed for single-agent embodiment
- Templates and tasks optimized for Claude Code workflows
- Session continuity support for multi-session planning

**🏗️ Architecture-Agnostic Design:**
- Templates support any architecture pattern (monolith, microservices, serverless, edge)
- Pattern selection guides with professional examples
- No forced technology or deployment assumptions

**⚡ Implementation Excellence:**
- Comprehensive tasks covering full development lifecycle
- Quality checklists ensuring professional standards
- Test-driven development and deployment automation support

**📋 Professional Quality Gates:**
- Consistent checklist format with clear validation criteria
- Complete coverage from discovery through deployment
- Phase discipline ensuring thorough planning before implementation

## Claude Code Adaptations

This fork adapts the original BMAD-METHOD for Claude Code's single-agent model:

**Persona System:**
- 9 personas designed for Claude Code embodiment rather than multi-agent orchestration
- Built-in perspective friction to improve decision quality
- Streamlined workflow optimized for VS Code integration

**Template System:**
- Enhanced templates with comprehensive guidance
- Session state management for project continuity
- Documentation-driven workflow supporting Claude Code's memory model

**Task Framework:**
- Complete task library covering discovery through deployment
- Implementation-focused tasks leveraging Claude Code's coding capabilities
- Quality validation tasks ensuring professional development standards

## Credits

BMAD-CLAUDE-CODE is a fork of the original [BMAD-METHOD](https://github.com/bmadcode/BMAD-METHOD) by bmadcode, adapted specifically for Claude Code users.

## License

[MIT License](./docs/LICENSE)
