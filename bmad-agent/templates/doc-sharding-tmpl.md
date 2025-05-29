# Documentation Organization: [Project Name]

## Documentation Structure

```
docs/
├── index.md                    # Project hub and navigation
├── project-brief.md           # Vision and goals
├── prd.md                     # Product requirements
├── architecture/
│   ├── overview.md            # System architecture
│   ├── frontend.md            # Frontend architecture
│   ├── backend.md             # Backend architecture
│   ├── data.md                # Data architecture
│   ├── infrastructure.md      # Deployment architecture
│   └── decisions/             # Architecture Decision Records
│       ├── adr-001-xxx.md
│       └── adr-002-xxx.md
├── design/
│   ├── design-system.md       # Visual design system
│   ├── ux-patterns.md         # UX patterns and flows
│   └── mockups/               # Design files/links
├── api/
│   ├── overview.md            # API design principles
│   ├── reference/             # Endpoint documentation
│   │   ├── auth.md
│   │   ├── users.md
│   │   └── [domain].md
│   └── examples.md            # Usage examples
├── development/
│   ├── setup.md               # Developer setup guide
│   ├── conventions.md         # Code conventions
│   ├── testing.md             # Testing strategy
│   └── workflows.md           # Development workflows
├── deployment/
│   ├── environments.md        # Environment details
│   ├── ci-cd.md              # Pipeline documentation
│   ├── monitoring.md          # Observability setup
│   └── runbooks/              # Operational guides
├── stories/
│   ├── epics/
│   │   ├── epic-001-xxx.md
│   │   └── epic-002-xxx.md
│   └── current-sprint/
│       ├── story-001.md
│       └── story-002.md
└── planning/
    ├── journal.md             # Planning journal
    ├── sessions/              # Session states
    │   ├── 2024-01-15.md
    │   └── 2024-01-16.md
    └── retrospectives/
        └── sprint-01.md
```

## Document Templates

### index.md (Project Hub)
```markdown
# [Project Name]

## Quick Links
- [Vision & Goals](./project-brief.md)
- [Product Requirements](./prd.md)
- [Architecture Overview](./architecture/overview.md)
- [API Documentation](./api/overview.md)
- [Current Sprint Stories](./stories/current-sprint/)

## Project Status
- **Phase**: [Current phase]
- **Sprint**: [Current sprint]
- **Next Milestone**: [Date and deliverable]

## Getting Started
- [Developer Setup](./development/setup.md)
- [Architecture Overview](./architecture/overview.md)
- [Contribution Guide](./development/workflows.md)

## Key Decisions
[Link to recent ADRs or important decisions]

## Team Resources
[Links to team tools, communication channels, etc.]
```

### Epic Template
```markdown
# Epic: [Epic Title]

**Epic ID**: EPIC-001  
**Status**: [Not Started | In Progress | Complete]  
**Target Release**: [Version/Date]

## Epic Overview
[What this epic accomplishes]

## Business Value
[Why this epic matters]

## Success Criteria
- [ ] [Measurable outcome]
- [ ] [Measurable outcome]

## Stories
| Story ID | Title | Status | Points |
|----------|-------|--------|--------|
| STORY-001 | [Title] | [Status] | [Points] |
| STORY-002 | [Title] | [Status] | [Points] |

## Dependencies
[Other epics or external dependencies]

## Progress Tracking
- **Started**: [Date]
- **Stories Completed**: X of Y
- **Points Completed**: X of Y
```

## Document Relationships

### Upstream Documents
```
Project Brief
    └─> PRD
        └─> Architecture
            └─> Stories
```

### Cross-References
- Stories reference Architecture sections
- API docs reference Data Architecture
- Runbooks reference Infrastructure
- ADRs reference all affected documents

## Sharding Strategy

### When to Split Documents

#### Size Triggers
- Document exceeds 500 lines
- Page load time exceeds 2 seconds
- Multiple teams editing simultaneously

#### Complexity Triggers
- More than 5 major sections
- Deep nesting (>3 levels)
- Mixed audiences (dev/business/ops)

### How to Split

#### By Audience
- Technical vs Business documentation
- Internal vs External documentation
- Role-specific guides

#### By Lifecycle
- Planning documents (relatively static)
- Active development docs (frequent updates)
- Reference docs (versioned)

#### By Component
- Frontend / Backend / Infrastructure
- Feature-specific documentation
- Service-specific documentation

## Naming Conventions

### Files
- `kebab-case.md` for all markdown files
- Prefix with numbers for ordering: `01-setup.md`
- Include ID in stories: `story-001-user-auth.md`
- Date format for sessions: `YYYY-MM-DD.md`

### Directories
- Lowercase, no spaces
- Plural for collections: `stories/`, `runbooks/`
- Singular for concepts: `architecture/`, `deployment/`

## Linking Strategy

### Internal Links
- Use relative paths: `../architecture/overview.md`
- Link to specific sections: `overview.md#deployment`
- Maintain link integrity when moving files

### External Links
- Centralize in index.md when possible
- Include link checker in CI/CD
- Document external dependencies

## Version Control

### What to Track
- All markdown files
- Diagrams as code (Mermaid, PlantUML)
- Configuration examples
- Skip generated documentation

### Commit Messages
- `docs: add API authentication guide`
- `docs: update architecture for new service`
- `docs: fix broken links in setup guide`

## Maintenance

### Regular Reviews
- **Weekly**: Update sprint stories
- **Sprint End**: Archive completed stories
- **Monthly**: Review and update architecture
- **Quarterly**: Audit all documentation

### Deprecation Process
1. Mark as deprecated with date
2. Add pointer to replacement
3. Keep for 2 releases
4. Archive in `docs/archive/`

### Quality Checks
- [ ] No broken internal links
- [ ] All code examples tested
- [ ] Diagrams match implementation
- [ ] No sensitive data exposed
- [ ] Consistent formatting

## Search & Discovery

### Metadata Headers
```markdown
---
title: Component Architecture
tags: [architecture, backend, microservices]
updated: 2024-01-15
author: TeamMember
---
```

### Table of Contents
- Include for documents >100 lines
- Use tool to auto-generate
- Keep max 2 levels deep

### Indexing
- Maintain searchable index.md
- Use consistent terminology
- Include glossary for domain terms

## Tools & Automation

### Recommended Tools
- **Diagrams**: Mermaid, PlantUML
- **API Docs**: OpenAPI/Swagger
- **Link Checking**: markdown-link-check
- **Formatting**: Prettier with markdown

### CI/CD Integration
- Automated link checking
- Spell checking
- Format validation
- Deploy to documentation site

---
*This organization structure should evolve with the project. Adjust based on team needs and project complexity.*