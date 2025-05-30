# Task: Manage MVP Scope

**Persona**: Product Manager  
**Phase**: Requirements → Implementation (ongoing)  
**Prerequisites**: Stories with MVP classifications, active development

## Objective
Provide a systematic approach to review and adjust MVP scope during development, maintaining focus while adapting to new information and constraints.

## Process

### 1. Review Current MVP Scope
- [ ] Generate current MVP dashboard from story classifications
- [ ] Assess progress on MVP Core stories
- [ ] Identify any MVP Core stories that are blocked or at risk
- [ ] Review estimated effort remaining for MVP Core stories

### 2. Evaluate Scope Change Triggers
Common reasons for MVP scope changes:
- [ ] **Timeline pressure**: Delivery date approaching with too much work remaining
- [ ] **Technical complexity**: Stories taking longer than estimated
- [ ] **New learning**: User feedback suggesting different priorities
- [ ] **Resource constraints**: Team capacity changes
- [ ] **Market conditions**: Competitive or business pressures

### 3. Analyze Impact of Proposed Changes
For each story being considered for reclassification:
- [ ] **User Impact**: What user value is gained/lost?
- [ ] **Technical Impact**: Does this create technical debt or dependencies?
- [ ] **Business Impact**: How does this affect success metrics?
- [ ] **Timeline Impact**: How much development time is saved/added?

### 4. MVP Scope Change Options

#### Promote Story (Optional → Core)
- [ ] Justify why this story is now critical for MVP success
- [ ] Verify team capacity to absorb additional work
- [ ] Update dependencies and sequencing
- [ ] Communicate impact to stakeholders

#### Demote Story (Core → Optional)
- [ ] Ensure this doesn't break core user flows
- [ ] Verify no other Core stories depend on this
- [ ] Document mitigation for lost functionality
- [ ] Get stakeholder approval for reduced scope

#### Defer Story (Core/Optional → Future)
- [ ] Confirm MVP can launch without this functionality
- [ ] Plan how to add this in post-MVP releases
- [ ] Update user communications about missing features
- [ ] Ensure technical architecture supports future addition

### 5. Update Documentation
- [ ] Update story MVP classifications
- [ ] Regenerate MVP dashboard
- [ ] Update PRD MVP scope section if needed
- [ ] Update project timeline and milestones
- [ ] Communicate changes to team and stakeholders

### 6. Validate New Scope
- [ ] Review updated MVP scope for coherence
- [ ] Ensure Core stories still deliver minimum viable product
- [ ] Verify no critical user flows are broken
- [ ] Confirm scope is achievable within timeline/resources

## MVP Classification Guidelines

### MVP Core
- **Essential for launch**: Product cannot ship without this
- **User-critical**: Breaks core user flow if missing
- **Business-critical**: Required for business model to work
- **Foundation**: Other features depend on this

### MVP Optional  
- **Valuable but not essential**: Improves experience but not required
- **Timeline dependent**: Include if development is ahead of schedule
- **Low risk**: Easy to add/remove without breaking other features
- **Enhancement**: Makes core features better but not necessary

### Future
- **Post-launch feature**: Planned for subsequent releases
- **Nice to have**: Good idea but not priority for initial launch
- **Complex**: Requires significant development effort
- **Uncertain**: Needs more user validation before building

## Scope Change Communication Template

```markdown
## MVP Scope Change: [Date]

### Changes Made
- **Promoted to Core**: [Story] - Reason: [justification]
- **Demoted to Optional**: [Story] - Reason: [justification]  
- **Deferred to Future**: [Story] - Reason: [justification]

### Impact Assessment
- **Timeline**: [impact on delivery date]
- **User Experience**: [what users will/won't get]
- **Business Impact**: [effect on success metrics]
- **Technical Debt**: [any shortcuts or compromises]

### Stakeholder Approval
- [ ] Product stakeholders informed
- [ ] Development team aligned  
- [ ] Timeline expectations updated
- [ ] User communication planned

### Next Review
Scheduled for: [date]
```

## Red Flags for Scope Changes

Stop and reassess if you see:
- **Frequent scope changes**: More than weekly adjustments
- **Core story churn**: Moving stories in/out of Core repeatedly  
- **Broken user flows**: Demoting stories that break core functionality
- **Technical debt accumulation**: Too many shortcuts to hit timeline
- **Team confusion**: Different understanding of what's in scope

## Success Criteria
- MVP scope is clear and stable
- All stakeholders understand current scope
- Core stories deliver coherent user value
- Timeline is realistic for current scope
- Team is confident in delivery capability

## Deliverables
- Updated story MVP classifications
- Current MVP dashboard
- Scope change communication (if changes made)
- Updated project timeline
- Stakeholder alignment confirmation