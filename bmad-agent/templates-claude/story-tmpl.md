# User Story: [Story Title]

**Story ID**: [Epic-Story Number, e.g., 1.1, 1.2]  
**Epic**: [Epic Name]  
**Date Created**: [Date]  
**Created By**: [Scrum Master/PO Name]  
**Status**: [ ] Pending [ ] In Progress [ ] In Review [ ] Completed

## Story Statement

**As a** [user type/persona]  
**I want to** [specific action/capability]  
**So that** [business value/user benefit]

## Story Context

### User Type
- **Primary Persona**: [Which persona this story serves]
- **User Segment**: [Specific user characteristics, if relevant]
- **Usage Context**: [When/where this story applies]

### Business Value
**Priority**: [ ] High [ ] Medium [ ] Low  
**Business Impact**: [How this contributes to business goals]  
**User Impact**: [How this improves user experience]

## Acceptance Criteria

### Functional Requirements
**Given** [initial context/state]  
**When** [user action/trigger]  
**Then** [expected outcome/result]

**Given** [another context]  
**When** [different action]  
**Then** [different expected result]

**Given** [edge case context]  
**When** [edge case action]  
**Then** [edge case handling]

### Non-Functional Requirements
- **Performance**: [Response time, load requirements]
- **Security**: [Authentication, authorization, data protection]
- **Accessibility**: [WCAG compliance, screen reader support]
- **Browser Support**: [Required browser/device compatibility]

### Platform-Specific Criteria (for multi-tenant/marketplace)
- **Tenant Isolation**: [Data separation requirements]
- **Multi-User Support**: [Concurrent user handling]
- **Scalability**: [Performance under load]
- **Compliance**: [GDPR, audit trail requirements]

## Technical Guidance

### Architecture Integration
**Related Architecture Decisions**: [Reference to architecture documents]
- [Decision 1]: [How this story implements architectural pattern]
- [Decision 2]: [Integration with existing systems]

**Data Architecture**: [How this story affects data models]
- **Entities Affected**: [Which data models are involved]
- **Data Flow**: [How data moves through the system]
- **Storage Requirements**: [Database changes needed]

### API Design
**New Endpoints** (if applicable):
- `GET /api/[endpoint]` - [Purpose and response]
- `POST /api/[endpoint]` - [Purpose and payload]
- `PUT /api/[endpoint]` - [Purpose and updates]

**Modified Endpoints** (if applicable):
- `[Method] /api/[endpoint]` - [What changes]

### Frontend Components
**New Components**:
- `[ComponentName]` - [Purpose and props]
- `[ComponentName]` - [Purpose and functionality]

**Modified Components**:
- `[ComponentName]` - [What changes and why]

### Database Changes
**Schema Changes**:
- [ ] New tables: [Table names and purpose]
- [ ] Modified tables: [Changes to existing tables]
- [ ] New indexes: [Performance optimization indexes]
- [ ] Data migration: [Required data transformations]

## Implementation Tasks

### Development Tasks
- [ ] **Backend API**: [Specific backend work needed]
  - [ ] Database schema updates
  - [ ] API endpoint implementation
  - [ ] Business logic development
  - [ ] Unit tests for backend logic

- [ ] **Frontend UI**: [Specific frontend work needed]
  - [ ] Component development
  - [ ] State management integration
  - [ ] User interface styling
  - [ ] Frontend unit tests

- [ ] **Integration**: [Connection between frontend and backend]
  - [ ] API integration
  - [ ] Error handling
  - [ ] Loading states
  - [ ] Integration tests

### Quality Assurance Tasks
- [ ] **Testing**:
  - [ ] Unit tests (target coverage: 80%+)
  - [ ] Integration tests
  - [ ] End-to-end tests
  - [ ] Manual testing scenarios

- [ ] **Security Review**:
  - [ ] Input validation
  - [ ] Authentication checks
  - [ ] Authorization verification
  - [ ] Data sanitization

- [ ] **Performance Review**:
  - [ ] Load testing (if applicable)
  - [ ] Performance profiling
  - [ ] Database query optimization
  - [ ] Caching strategy

### DevOps/Infrastructure Tasks
- [ ] **Deployment**:
  - [ ] Environment configuration
  - [ ] Database migration scripts
  - [ ] Feature flag setup (if applicable)
  - [ ] Monitoring and alerting

- [ ] **Documentation**:
  - [ ] API documentation updates
  - [ ] User documentation
  - [ ] Technical documentation
  - [ ] Deployment notes

## Dependencies

### Prerequisites
- [ ] **Story Dependencies**: [Other stories that must be completed first]
  - Story [X.Y]: [Story title] - [Why this dependency exists]
  - Story [X.Z]: [Story title] - [Relationship to this story]

- [ ] **Technical Dependencies**: [Infrastructure or technical requirements]
  - [Dependency]: [What's needed and why]
  - [Service/API]: [External dependency requirements]

### Blockers
- [ ] **Current Blockers**: [Issues preventing start/completion]
  - [Blocker description]: [What's blocking and who's responsible]
  - [Another blocker]: [Impact and resolution plan]

## Testing Scenarios

### Happy Path Testing
1. **Scenario**: [Normal user flow]
   - **Steps**: [Detailed test steps]
   - **Expected Result**: [What should happen]

2. **Scenario**: [Another normal flow]
   - **Steps**: [Test steps]
   - **Expected Result**: [Expected outcome]

### Edge Case Testing
1. **Scenario**: [Edge case or error condition]
   - **Steps**: [How to reproduce]
   - **Expected Result**: [How system should handle]

2. **Scenario**: [Another edge case]
   - **Steps**: [Reproduction steps]
   - **Expected Result**: [Expected behavior]

### Multi-Tenant Testing (for platform features)
1. **Scenario**: [Cross-tenant data isolation]
   - **Steps**: [How to verify tenant separation]
   - **Expected Result**: [Data isolation confirmation]

2. **Scenario**: [Concurrent multi-user access]
   - **Steps**: [Multi-user test scenario]
   - **Expected Result**: [System behavior under load]

## Definition of Done

### Development Complete
- [ ] All implementation tasks completed
- [ ] Code reviewed and approved
- [ ] Unit tests written and passing (80%+ coverage)
- [ ] Integration tests passing
- [ ] No critical or high-severity bugs

### Quality Assurance Complete
- [ ] All acceptance criteria verified
- [ ] Manual testing completed
- [ ] Performance requirements met
- [ ] Security review completed
- [ ] Accessibility standards met

### Documentation Complete
- [ ] API documentation updated
- [ ] Technical documentation current
- [ ] User-facing documentation updated
- [ ] Release notes prepared

### Deployment Ready
- [ ] Feature flag configured (if applicable)
- [ ] Database migrations tested
- [ ] Monitoring and alerting configured
- [ ] Rollback plan documented

### Platform-Specific DoD (for multi-tenant features)
- [ ] Tenant data isolation verified
- [ ] Multi-user concurrency tested
- [ ] Compliance requirements met
- [ ] Audit logging implemented

## Notes & Comments

### Design Decisions
**Decision**: [Key design choice made]
**Rationale**: [Why this approach was chosen]
**Alternatives Considered**: [Other options evaluated]

### Implementation Notes
- [Important technical consideration]
- [Performance optimization applied]
- [Security measure implemented]

### Future Considerations
- [Potential enhancements for later]
- [Technical debt considerations]
- [Scalability improvements identified]

---

## Links & References

- **Epic**: [Link to epic document]
- **Architecture**: [Link to relevant architecture decisions]
- **Design**: [Link to UI/UX designs, if applicable]
- **API Docs**: [Link to API documentation]
- **Related Stories**: [Links to dependent or related stories]

---

## Progress Tracking

**Started**: [Date work began]  
**Completed**: [Date work finished]  
**Time Estimated**: [Original estimate]  
**Time Actual**: [Actual time spent]  
**Completed By**: [Developer name]  

### Story History
- **[Date]**: [Status change or significant update]
- **[Date]**: [Another update or milestone]
- **[Date]**: [Final completion note]

---

## Claude Code Prompts

*Use these prompts to help develop the story:*

**For Acceptance Criteria**: "Based on this user story, what are the specific, testable conditions that must be met for this feature to be considered complete?"

**For Technical Guidance**: "What are the key technical considerations for implementing this feature, including database changes, API design, and frontend components?"

**For Testing Scenarios**: "What are the most important test cases to cover for this feature, including both happy path and edge cases?"

**For Dependencies**: "What other stories, technical components, or external factors does this story depend on?"