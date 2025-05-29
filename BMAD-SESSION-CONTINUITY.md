# BMAD Session Continuity System

This document outlines how to maintain planning context across multiple Claude Code sessions.

## The Challenge

Claude Code starts fresh with each session, but BMAD planning often spans multiple conversations. We need a way to:
- Track planning progress
- Maintain decision history
- Resume conversations seamlessly
- Preserve the "agent personality" context

## Solution: Planning Journal & Session Files

### 1. BMAD Planning Journal (`docs/bmad-journal.md`)

A running log of all planning sessions with structured entries:

```markdown
# BMAD Planning Journal

## Session: 2024-01-15 - Project Inception
**Role**: Business Analyst
**Phase**: Discovery
**Status**: Completed

### Decisions Made:
- Target audience: Small business owners
- Core problem: Lack of integrated project management
- Key differentiator: AI-powered task prioritization

### Open Questions:
- [ ] Budget constraints?
- [ ] Mobile app required?
- [ ] Integration requirements?

### Next Steps:
- Create PRD with PM role
- Review technical constraints

---

## Session: 2024-01-16 - PRD Creation
**Role**: Product Manager
**Phase**: Product Definition
**Status**: In Progress
**Current Focus**: Epic 2 definition

### Work Completed:
- ✓ Vision statement
- ✓ Success metrics
- ✓ Epic 1: User Management
- ◐ Epic 2: Task Management (in progress)

### Key Decisions:
- MVP includes 3 epics
- Web-first approach
- 3-month timeline

### Resume Point:
Working on Epic 2 user stories. Need to define:
- Task creation workflow
- Collaboration features
- Notification system
```

### 2. Session State Files (`docs/.bmad-session/`)

Lightweight state files for quick session resumption:

**`current-state.md`**:
```markdown
# Current BMAD Session State

**Active Role**: Product Manager
**Current Phase**: Product Definition
**Working On**: Epic 2 - Task Management
**Document**: docs/prd.md (Section: Epic 2)

## Context Summary:
Creating PRD for AI-powered task management system. Completed Epic 1 (User Management) with 5 stories. Currently defining Epic 2 stories focusing on core task functionality.

## Key Constraints:
- 3-month timeline
- $50K budget
- Team of 3 developers
- Web-first (mobile later)

## Immediate Next Action:
Define acceptance criteria for Story 2.1: Task Creation
```

### 3. Planning Checkpoint System

At natural breakpoints, Claude Code creates checkpoints:

**`docs/.bmad-session/checkpoint-001.md`**:
```markdown
# BMAD Planning Checkpoint

**Date**: 2024-01-16 14:30
**Phase**: PRD Creation
**Completeness**: 40%

## Documents Created/Updated:
- ✓ docs/project-brief.md
- ◐ docs/prd.md (40% complete)
- ○ docs/architecture.md (not started)

## Decisions Requiring Validation:
1. Chose PostgreSQL over MongoDB - confirm?
2. Deferred mobile app to Phase 2 - acceptable?
3. Limited MVP to 3 epics - sufficient?

## Critical Path Items:
- Complete PRD by end of day
- Architecture design tomorrow
- Story generation by Thursday
```

## How to Use Session Continuity

### Starting a New Session

User prompt options:
1. **"Continue BMAD planning"** - Claude reads current-state.md
2. **"Resume as [role]"** - Claude loads specific role context
3. **"Show planning status"** - Claude summarizes from journal
4. **"Load checkpoint X"** - Claude resumes from specific point

### During Planning Sessions

Claude Code automatically:
1. Updates session state after major decisions
2. Logs key information to planning journal
3. Creates checkpoints at phase transitions
4. Maintains decision audit trail

### Example Session Resumption

```
User: "Continue BMAD planning"

Claude Code: I see we're in the middle of PRD creation. You're working as the Product Manager on Epic 2 (Task Management). 

Current status:
- Epic 1: ✓ Complete (5 stories)
- Epic 2: In progress
- Epic 3: Not started

Last session you were defining the task creation workflow. The key constraints are:
- 3-month timeline
- Web-first approach
- Team of 3 developers

Shall we continue with Story 2.1: Task Creation acceptance criteria?
```

## Implementation in CLAUDE.md

Add these sections to CLAUDE.md:

```markdown
## Session Management

### Maintaining Context Across Sessions

BMAD planning often spans multiple Claude Code sessions. To maintain continuity:

1. **Start each session** by checking for:
   - `docs/.bmad-session/current-state.md`
   - `docs/bmad-journal.md`
   - Recent checkpoint files

2. **During planning**, automatically:
   - Update session state after key decisions
   - Log progress to planning journal
   - Create checkpoints at phase boundaries

3. **End each session** by:
   - Summarizing progress
   - Updating current-state.md
   - Noting next steps

### Session Commands

- **"Continue planning"**: Resume from current state
- **"Show planning status"**: Display progress summary
- **"What did we decide about X?"**: Search planning journal
- **"Create checkpoint"**: Force a checkpoint save
- **"Switch to [role]"**: Change active agent role

### Session State Structure

Always maintain these files during planning:
```
docs/
├── bmad-journal.md          # Full planning history
├── .bmad-session/
│   ├── current-state.md     # Quick resume file
│   ├── checkpoint-001.md    # Phase checkpoints
│   └── decisions.md         # Decision log
```
```

## Benefits

1. **Seamless Resumption**: Pick up exactly where you left off
2. **Decision History**: Never lose important choices
3. **Progress Tracking**: See how planning evolved
4. **Team Collaboration**: Others can understand context
5. **Audit Trail**: Document why decisions were made

## Best Practices

1. **Checkpoint Frequently**: At least once per session
2. **Use Clear Summaries**: Make context obvious
3. **Tag Decisions**: Mark reversible vs irreversible
4. **Note Dependencies**: Track what affects what
5. **Update Regularly**: Keep state files current

This system allows the high-level planning function to work effectively across multiple Claude Code sessions while maintaining the full context and decision history of the BMAD Method.