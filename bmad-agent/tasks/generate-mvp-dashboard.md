# Task: Generate MVP Dashboard

**Persona**: Product Manager / Orchestrator  
**Phase**: Implementation (ongoing)  
**Prerequisites**: Stories with MVP classifications

## Objective
Generate a comprehensive dashboard view of MVP scope by scanning story files and organizing them by classification, providing clear visibility into what's in/out of MVP scope.

## Process

### 1. Scan Story Files
- [ ] Locate all story files in project (typically in `docs/stories/` or similar)
- [ ] Extract MVP Classification from each story header
- [ ] Collect story metadata: ID, title, epic, priority, status
- [ ] Note any stories missing MVP classification

### 2. Organize by Classification
Group stories into three categories:
- **MVP Core**: Must-have for launch
- **MVP Optional**: Include if time/resources allow
- **Future**: Post-MVP features

### 3. Generate Dashboard Document
Create `docs/mvp-dashboard.md` with:
- [ ] Overview summary with story counts
- [ ] Detailed breakdown by classification
- [ ] Progress tracking for each category
- [ ] Timeline and capacity assessment

## Dashboard Template

```markdown
# MVP Scope Dashboard

*Generated: [Date] | Last Updated: [Date]*

## Overview
- **MVP Core**: [X] stories | [X] completed | [X%] done
- **MVP Optional**: [X] stories | [X] completed | [X%] done  
- **Future**: [X] stories | [X] completed | [X%] done
- **Unclassified**: [X] stories requiring classification

## MVP Core Stories (Must Have for Launch)

### Epic: [Epic Name]
| Story ID | Title | Status | Priority | Notes |
|----------|-------|--------|----------|-------|
| PROJ-001 | [Story Title] | In Progress | High | [Any blockers/notes] |
| PROJ-002 | [Story Title] | Done | Critical | |

### Epic: [Epic Name]
[Continue for each epic...]

## MVP Optional Stories (Include if Time Allows)

### Epic: [Epic Name]
| Story ID | Title | Status | Priority | Dependencies |
|----------|-------|--------|----------|-------------|
| PROJ-010 | [Story Title] | Ready | Medium | Requires PROJ-001 |

## Future Stories (Post-MVP)

### Epic: [Epic Name]  
| Story ID | Title | Priority | Planned Release |
|----------|-------|----------|----------------|
| PROJ-020 | [Story Title] | Low | v2.0 |

## Unclassified Stories
*These stories need MVP classification:*
- [ ] [Story ID]: [Title] - [Epic]

## MVP Health Check

### Scope Concerns
- [ ] **Scope Creep**: Any Core stories added recently?
- [ ] **Over-scoped**: Too many Core stories for timeline?
- [ ] **Under-scoped**: Core stories don't deliver full user value?
- [ ] **Dependencies**: Any Core stories blocked by Optional/Future work?

### Timeline Assessment  
- **Estimated MVP Completion**: [Date]
- **Core Stories Remaining**: [X] stories
- **Average Story Completion**: [X] per week
- **Projected Timeline**: [X] weeks remaining

### Recommendations
- [Any scope adjustments needed]
- [Risk mitigation suggestions]
- [Resource allocation recommendations]

---
*This dashboard is auto-generated from story files. Update story MVP classifications to modify scope.*
```

## Dashboard Generation Steps

### Automated Approach (if possible)
1. **File Scanning**: Use grep/find to locate story files
2. **Metadata Extraction**: Parse MVP Classification from story headers
3. **Template Population**: Fill dashboard template with extracted data
4. **Status Calculation**: Compute completion percentages

### Manual Approach
1. **Story Inventory**: List all story files manually
2. **Classification Review**: Check each story's MVP Classification
3. **Dashboard Creation**: Manually populate template
4. **Regular Updates**: Schedule weekly/bi-weekly regeneration

## Dashboard Usage

### Daily Standups
- Quick scope overview for team
- Identify any newly completed Core stories
- Surface any blockers on Core work

### Weekly Planning
- Review progress toward MVP completion
- Assess if scope changes needed
- Plan upcoming story priorities

### Stakeholder Updates
- Clear communication of MVP progress
- Transparent view of what's in/out of scope
- Evidence-based timeline projections

## Maintenance

### Update Triggers
- New stories created
- Story MVP classifications changed
- Story status updates (In Progress → Done)
- Scope change decisions made

### Validation Checks
- [ ] All stories have MVP classifications
- [ ] No Core stories depend on Optional/Future work
- [ ] Core stories form coherent user experience
- [ ] Timeline projections are realistic

## Success Criteria
- Clear visibility into MVP scope at all times
- Easy identification of scope changes needed
- Accurate progress tracking toward MVP completion
- Effective communication tool for stakeholders

## Deliverables
- `docs/mvp-dashboard.md` file
- Regular updates (weekly/bi-weekly)
- Scope change recommendations when needed
- Timeline projections based on current progress