# Coordinate Multi-Persona Feature

**Persona**: Orchestrator  
**Phase**: All phases - Discovery through Implementation  
**Prerequisites**: Complex feature requiring multiple personas to work in parallel

## Purpose
Orchestrate the development of complex features that require coordination between multiple personas working in parallel. This task ensures efficient collaboration, manages dependencies, resolves conflicts, and maintains alignment across all workstreams.

## Required Inputs
- **Feature Requirements**: High-level description of the feature to be built
- **Initial Scope Assessment**: Understanding of feature complexity and components
- **Available Resources**: Which personas are available and their capacity
- **Timeline Constraints**: Deadlines and milestone requirements

## Key Activities

### 1. Feature Decomposition & Analysis

**Break Down the Feature**:
- Identify all technical components required
- Map which personas need to be involved
- Determine the logical boundaries between workstreams
- Identify shared components and integration points
- Estimate complexity and effort for each component

**Example Decomposition**:
```
Feature: Real-time Collaboration System
├── Backend Components (Developer, Data Engineer)
│   ├── WebSocket infrastructure
│   ├── Conflict resolution engine
│   └── Data synchronization layer
├── Frontend Components (Developer, Designer)
│   ├── Real-time UI updates
│   ├── Collaboration indicators
│   └── Conflict resolution UI
├── Infrastructure (DevOps, Data Engineer)
│   ├── Message queue setup
│   ├── Caching layer
│   └── Database optimization
└── Quality Assurance (QA Engineer)
    ├── Real-time testing framework
    ├── Load testing scenarios
    └── Conflict simulation tests
```

### 2. Dependency Mapping

**Identify Dependencies**:
- Technical dependencies between components
- Data dependencies and flow
- API contracts between layers
- Shared libraries or utilities
- Infrastructure prerequisites

**Create Dependency Matrix**:
```
| Component | Depends On | Blocks | Critical Path |
|-----------|------------|--------|---------------|
| WebSocket Server | Infrastructure setup | Frontend integration | Yes |
| Conflict Engine | Data model design | UI conflict display | Yes |
| Real-time UI | WebSocket server, API design | User testing | No |
| Load Testing | All components complete | Production release | No |
```

### 3. Parallel Workstream Planning

**Define Workstreams**:
```
## Workstream 1: Core Infrastructure (Week 1-2)
- Lead: DevOps Engineer
- Support: Data Engineer
- Deliverables:
  - Message queue setup
  - WebSocket infrastructure
  - Monitoring and alerting

## Workstream 2: Data Layer (Week 1-3)
- Lead: Data Engineer
- Support: Developer
- Deliverables:
  - Conflict resolution data model
  - Synchronization schema
  - Performance optimization

## Workstream 3: API Design (Week 1-2)
- Lead: Architect
- Support: Developer, Designer
- Deliverables:
  - WebSocket protocol design
  - REST API extensions
  - Error handling standards

## Workstream 4: UI/UX Design (Week 1-2)
- Lead: Designer
- Support: Developer
- Deliverables:
  - Collaboration indicators design
  - Conflict resolution UI
  - Real-time feedback patterns
```

### 4. Integration Point Definition

**Specify Integration Requirements**:
- API contracts with request/response formats
- Data schemas for shared models
- Event definitions for pub/sub systems
- Error codes and handling conventions
- Performance SLAs for each integration

**Integration Timeline**:
```
Week 3: API Integration Checkpoint
- Backend API ready for frontend consumption
- Integration test environment available
- Mock data generators ready

Week 4: Full Stack Integration
- End-to-end flow working
- Performance benchmarks met
- Error scenarios handled
```

### 5. Communication & Sync Strategy

**Regular Sync Points**:
- **Daily Standups**: Quick blockers and progress check
- **Twice-weekly Integration Meetings**: Technical alignment
- **Weekly Stakeholder Updates**: Overall progress and risks

**Communication Channels**:
```
## Async Communication
- Shared project channel for general updates
- Technical decisions documented in architecture doc
- API changes tracked in version control
- Blockers raised immediately in team channel

## Sync Communication
- Integration meetings for technical discussions
- Pair programming sessions for complex integrations
- Design reviews before implementation
- Demo sessions for completed components
```

### 6. Conflict Resolution Process

**Technical Conflicts**:
1. **Identify Conflict**: Document competing approaches
2. **Impact Analysis**: Assess pros/cons of each approach
3. **Facilitate Discussion**: Bring relevant personas together
4. **Decision Making**: Use decision matrix if needed
5. **Document Decision**: Record rationale in architecture doc

**Resource Conflicts**:
1. **Assess Priority**: Determine critical path impact
2. **Negotiate Trade-offs**: Find acceptable compromises
3. **Adjust Timeline**: Update schedules if needed
4. **Communicate Changes**: Inform all stakeholders

**Example Conflict Resolution**:
```
Conflict: Database schema approach
- Developer wants: Normalized schema for consistency
- Data Engineer wants: Denormalized for performance
- Resolution: Hybrid approach with normalized core and denormalized views
- Rationale: Balances both needs with acceptable complexity
```

### 7. Progress Tracking & Reporting

**Tracking Mechanisms**:
- Kanban board with swimlanes per workstream
- Dependency tracking with blocked/blocking status
- Daily progress metrics per component
- Integration test status dashboard
- Risk register with mitigation plans

**Status Report Template**:
```
## Week N Status Report

### Overall Progress: 65% Complete

### Workstream Status:
- Infrastructure: ✅ On track (80% complete)
- Data Layer: ⚠️ At risk (50% complete, blocker identified)
- API Design: ✅ Complete
- UI/UX: ✅ On track (60% complete)

### Key Accomplishments:
- WebSocket infrastructure deployed to staging
- API contracts finalized and documented
- Initial UI prototypes approved

### Blockers & Risks:
- Data model complexity higher than estimated
- Mitigation: Bringing in additional Data Engineer capacity

### Next Week Focus:
- Resolve data model blockers
- Begin integration testing
- Complete UI implementation
```

### 8. Quality Coordination

**Cross-Workstream Quality**:
- Integration test scenarios covering all touchpoints
- Performance testing across the full stack
- Security review of all components
- Documentation completeness check
- Code review across team boundaries

**Quality Gates**:
```
Pre-Integration Checklist:
□ All APIs documented with examples
□ Error handling implemented consistently
□ Performance benchmarks defined
□ Security requirements addressed
□ Monitoring hooks in place

Pre-Release Checklist:
□ All integration tests passing
□ Load testing completed successfully
□ Documentation updated
□ Rollback plan tested
□ Stakeholder sign-off received
```

## Deliverables

### Coordination Plan Document
- Feature decomposition with workstreams
- Dependency matrix and critical path
- Integration timeline and milestones
- Communication plan and meeting schedule
- Risk mitigation strategies

### Tracking Artifacts
- Kanban board configuration
- Progress tracking dashboard
- Decision log with rationales
- Integration test results
- Status reports for stakeholders

### Technical Artifacts
- API contract documentation
- Integration test suites
- Shared component libraries
- Performance benchmarks
- Deployment runbooks

## Success Criteria

The multi-persona coordination is successful when:
- [ ] All workstreams complete on schedule
- [ ] Integration points work seamlessly
- [ ] No critical defects from integration issues
- [ ] Team reports effective collaboration
- [ ] Feature delivered meeting all requirements

## Next Steps

After coordination plan is approved:
1. Set up communication channels and tools
2. Schedule kickoff meeting with all personas
3. Create tracking boards and dashboards
4. Document initial technical decisions
5. Begin parallel workstream execution

---
*The Orchestrator uses this structured approach to ensure complex features are delivered efficiently through coordinated multi-persona collaboration.*