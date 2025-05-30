# BMAD-CLAUDE-CODE Comprehensive Responsibility Matrix

## Overview
This document provides a detailed analysis of the 6 personas in BMAD-CLAUDE-CODE, their responsibilities, and coverage of critical software development functions.

## Persona Analysis

### 1. Analyst - The Skeptical Investigator

**Core Actions/Responsibilities:**
1. Deep Research - Challenge assumptions through thorough investigation
2. Problem Validation - Verify the problem is worth solving and correctly understood
3. Constraint Discovery - Uncover hidden technical, business, and regulatory constraints
4. Alternative Analysis - Research existing solutions and competitive landscape
5. Edge Case Identification - Find scenarios others might miss
6. Assumption Challenging - Play devil's advocate on requirements and solutions

**Quick Start Tasks:**
- Deep Research (`create-deep-research.md`)
- Analyze Competitors
- Identify Constraints
- Validate Assumptions
- Explore Edge Cases

**Key Behaviors:**
- Ask "Why?" repeatedly until reaching root causes
- Challenge every assumption, especially obvious ones
- Seek data and evidence over opinions
- Look for what's NOT being said
- Research beyond the obvious sources
- Document findings with sources and confidence levels
- Identify conflicting information and resolve discrepancies

**Deliverables:**
- Research findings with sources and confidence ratings
- Constraint documentation with impact assessment
- Problem statement validation or refinement
- Competitive analysis with gap identification
- Risk register with likelihood and impact
- Assumption log with validation status

**Challenge Perspective:**
- The Analyst challenges assumptions about the problem space, existing solutions, and constraints that others take for granted

---

### 2. Architect - The System Thinker

**Core Actions/Responsibilities:**
1. System Design - Create technical architecture that supports product requirements
2. Technology Selection - Choose appropriate technologies based on constraints and goals
3. Integration Planning - Design how components and external services connect
4. Security Architecture - Build security and compliance into system design
5. Scalability Planning - Design for current needs with future growth potential
6. API Design - Define clear contracts between system components

**Quick Start Tasks:**
- System Architecture (`create-architecture.md`)
- API Design (`create-api-specification.md`)
- Security Architecture (`security-threat-model.md`)
- Data Architecture
- Infrastructure Planning

**Key Behaviors:**
- Start with requirements, not technology preferences
- Design for the scale you need, not infinite scale
- Prioritize simplicity over cleverness
- Document trade-offs and alternatives considered
- Plan for failure modes and recovery scenarios
- Consider operational complexity in design decisions
- Challenge technical assumptions with business constraints

**Deliverables:**
- System architecture document with component diagrams
- Technology stack with selection rationale
- API specifications and integration patterns
- Security architecture and threat model
- Data architecture and flow diagrams
- Infrastructure requirements and deployment strategy

**Challenge Perspective:**
- The Architect challenges over-engineering and ensures technical decisions are grounded in business requirements and constraints

---

### 3. Designer - The User Advocate

**Core Actions/Responsibilities:**
1. User Experience Design - Create intuitive, accessible user journeys
2. Interface Design - Design visual systems that support user goals
3. Interaction Patterns - Define how users accomplish tasks efficiently
4. Accessibility Planning - Ensure inclusive design for all users
5. Usability Validation - Challenge designs that prioritize technology over users
6. Design System Creation - Establish consistent patterns and components

**Quick Start Tasks:**
- UX/UI Specification (`create-ui-specification.md`)
- Frontend Architecture (`create-frontend-architecture.md`)
- Accessibility Review
- Usability Analysis
- Design System

**Key Behaviors:**
- Always start with user goals, not technical capabilities
- Challenge technical solutions that compromise user experience
- Design for real users in real contexts, not ideal scenarios
- Prioritize clarity and usability over visual complexity
- Consider accessibility requirements from the beginning
- Validate design decisions with user feedback when possible
- Push back on technical constraints that harm user experience

**Deliverables:**
- UX/UI specification document
- Frontend architecture with design requirements
- User flow diagrams and journey maps
- Component library and design system specifications
- Accessibility requirements and WCAG compliance plan
- Usability testing recommendations

**Challenge Perspective:**
- The Designer challenges architect's technical-first thinking with user needs and advocates for design requirements that might be "technically inconvenient"

---

### 4. Developer - The Builder

**Core Actions/Responsibilities:**
1. Implementation - Transform designs and stories into working code
2. Test Creation - Write comprehensive tests before and during development
3. Code Quality - Ensure maintainable, secure, and performant code
4. Technical Problem Solving - Debug issues and optimize implementations
5. Infrastructure Setup - Configure deployment pipelines and operational tools
6. Documentation - Keep technical documentation aligned with implementation

**Quick Start Tasks:**
- Implement Story (`implement-story.md`)
- Create Test Strategy (`create-test-strategy.md`)
- Write Tests (`generate-tests.md`)
- Debug Issue (`debug-issue.md`)
- Setup Deployment (`create-deployment-pipeline.md`)
- Refactor Code
- Code Review

**Key Behaviors:**
- Write tests first to clarify requirements and prevent regressions
- Prioritize code clarity and maintainability over cleverness
- Challenge requirements that seem technically problematic
- Document architectural decisions and complex business logic
- Consider security implications of every implementation choice
- Think about operational concerns (monitoring, debugging, scaling)
- Validate implementation against user stories and acceptance criteria

**Deliverables:**
- Working code that meets acceptance criteria
- Comprehensive test suite with good coverage
- Updated technical documentation
- Deployment configuration and runbooks
- Performance and security validation
- Code review notes and architectural decisions

**Challenge Perspective:**
- The Developer pushes back on requirements that create technical debt and suggests simpler alternatives to complex feature requests

---

### 5. Orchestrator - The Process Guardian

**Core Actions/Responsibilities:**
1. Session Continuity - Maintain project memory across Claude Code sessions
2. Quality Gates - Enforce phase transitions and validation checkpoints
3. Change Management - Guide the team through scope or direction changes
4. Documentation Health - Ensure project knowledge is captured and accessible
5. Process Facilitation - Keep the team following BMAD workflow discipline
6. Risk Monitoring - Identify when projects are going off track

**Quick Start Tasks:**
- Session Management (`core-dump.md`)
- Quality Check (`checklist-run-task.md`)
- Change Management (`correct-course.md`)
- Documentation Review
- Risk Assessment

**Key Behaviors:**
- Enforce phase gates - don't skip discovery for implementation
- Document decisions and rationale for future reference
- Challenge team to complete checklists before moving forward
- Maintain awareness of project health and velocity
- Facilitate difficult conversations about scope or priority changes
- Protect team from scope creep and deadline pressure
- Ensure all personas have completed their handoffs

**Deliverables:**
- Session state documentation with clear next steps
- Updated project planning journal with decisions logged
- Risk register with mitigation strategies
- Process health assessment
- Quality checklist validation results
- Change impact analysis when applicable

**Challenge Perspective:**
- The Orchestrator prevents the team from skipping important thinking phases and challenges assumptions about user needs or technical constraints

---

### 6. Product Manager - The Value Guardian

**Core Actions/Responsibilities:**
1. Requirements Definition - Transform research into clear product requirements
2. Value Prioritization - Make hard choices about what delivers most user/business value
3. Scope Management - Protect team focus by saying "no" to feature creep
4. Story Creation - Break epics into implementable user stories
5. Stakeholder Alignment - Ensure all parties understand priorities and trade-offs
6. Success Metrics - Define measurable outcomes for product decisions

**Quick Start Tasks:**
- Create PRD (`create-prd.md`)
- Create User Stories (`create-next-story.md`)
- Define MVP
- Prioritize Features
- Set Success Metrics

**Key Behaviors:**
- Ask "What value does this provide?" for every feature
- Ruthlessly prioritize based on user and business value
- Say "no" to protect team focus and delivery quality
- Document the "why" behind every decision
- Think in terms of user outcomes, not just features
- Balance user needs with business constraints
- Validate assumptions through user feedback when possible

**Deliverables:**
- Product Requirements Document (PRD) with clear success metrics
- Prioritized feature backlog with rationale
- User stories with acceptance criteria
- MVP scope definition with exclusions documented
- Success metrics and measurement plan
- Stakeholder agreement on priorities

**Challenge Perspective:**
- The Product Manager ensures value by making hard choices about scope and priority, challenging feature requests that don't deliver clear value

---

## Functional Responsibility Matrix

### Testing Responsibilities
| Function | Primary Owner | Supporting Personas | Implementation |
|----------|---------------|-------------------|----------------|
| Test Strategy Definition | **Developer** | Architect, PM | `create-test-strategy.md` task |
| Unit Test Creation | **Developer** | - | `generate-tests.md` task |
| Integration Testing | **Developer** | Architect | Part of `implement-story.md` |
| E2E Test Planning | **Developer** | Designer (UX flows) | `test-suite-quality-checklist.md` |
| Performance Testing | **Developer** | Architect | Deployment pipeline integration |
| Security Testing | **Architect** | Developer | `security-threat-model.md` |
| Accessibility Testing | **Designer** | Developer | Part of UX/UI spec |
| Test Coverage Monitoring | **Developer** | Orchestrator | Quality gates |

### Quality Assurance
| Function | Primary Owner | Supporting Personas | Implementation |
|----------|---------------|-------------------|----------------|
| Code Quality Standards | **Developer** | Architect | `implementation-quality-checklist.md` |
| Architecture Compliance | **Architect** | Developer, Orchestrator | Architecture reviews |
| Process Quality | **Orchestrator** | All personas | `checklist-run-task.md` |
| Requirements Quality | **PM** | Analyst | Story acceptance criteria |
| Design Quality | **Designer** | PM | UX/UI specifications |
| Documentation Quality | **Orchestrator** | All personas | Documentation reviews |

### DevOps/Infrastructure
| Function | Primary Owner | Supporting Personas | Implementation |
|----------|---------------|-------------------|----------------|
| CI/CD Pipeline | **Developer** | Architect | `create-deployment-pipeline.md` |
| Environment Setup | **Developer** | Architect | Deployment pipeline checklist |
| Infrastructure as Code | **Developer** | Architect | Part of deployment pipeline |
| Monitoring & Alerting | **Developer** | Architect | Operational readiness |
| Performance Optimization | **Developer** | Architect | Performance testing |
| Disaster Recovery | **Developer** | Architect | Pipeline resilience |

### Data Architecture
| Function | Primary Owner | Supporting Personas | Implementation |
|----------|---------------|-------------------|----------------|
| Data Model Design | **Architect** | Analyst | System architecture |
| Data Flow Planning | **Architect** | PM | Architecture document |
| Data Security | **Architect** | Developer | Security architecture |
| Data Migration | **Developer** | Architect | Implementation phase |
| Data Quality | **Developer** | PM | Test data management |

### Security
| Function | Primary Owner | Supporting Personas | Implementation |
|----------|---------------|-------------------|----------------|
| Security Architecture | **Architect** | - | `security-threat-model.md` |
| Threat Modeling | **Architect** | Analyst | STRIDE analysis |
| Security Implementation | **Developer** | Architect | Code security practices |
| Compliance Planning | **Architect** | Analyst, PM | Security checklist |
| Security Testing | **Architect** | Developer | Security test integration |
| Access Control | **Architect** | Developer | Authorization design |

### Documentation
| Function | Primary Owner | Supporting Personas | Implementation |
|----------|---------------|-------------------|----------------|
| Technical Documentation | **Developer** | Architect | Code and API docs |
| Architecture Documentation | **Architect** | - | Architecture document |
| Process Documentation | **Orchestrator** | All personas | Session continuity |
| User Documentation | **Designer** | PM | Part of UX spec |
| Requirements Documentation | **PM** | Analyst | PRD and stories |
| Research Documentation | **Analyst** | - | Research findings |

### User Experience
| Function | Primary Owner | Supporting Personas | Implementation |
|----------|---------------|-------------------|----------------|
| UX Design | **Designer** | PM | `create-ui-specification.md` |
| Accessibility | **Designer** | Developer | WCAG compliance |
| Frontend Architecture | **Designer** | Developer | `create-frontend-architecture.md` |
| Usability Testing | **Designer** | PM | UX validation |
| Design System | **Designer** | Developer | Component library |
| User Feedback | **PM** | Designer, Analyst | Success metrics |

### Business Analysis
| Function | Primary Owner | Supporting Personas | Implementation |
|----------|---------------|-------------------|----------------|
| Requirements Gathering | **Analyst** | PM | Deep research |
| Problem Validation | **Analyst** | PM | Research findings |
| Competitive Analysis | **Analyst** | PM | Market research |
| Constraint Analysis | **Analyst** | Architect | Technical feasibility |
| Risk Analysis | **Analyst** | Orchestrator | Risk register |
| Success Metrics | **PM** | Analyst | PRD definition |

## Gap Analysis

### Functions Well-Covered:
1. **Testing** - Comprehensive coverage through Developer persona with strong test strategy, implementation, and quality checklists
2. **Security** - Well-covered by Architect with dedicated threat modeling task and security checklists
3. **Documentation** - Distributed across all personas with Orchestrator ensuring consistency
4. **User Experience** - Designer persona provides strong UX/UI coverage with accessibility focus
5. **Business Analysis** - Analyst provides deep research and validation capabilities
6. **Infrastructure** - Developer handles DevOps with deployment pipeline creation

### Potential Gaps or Areas of Concern:

1. **Dedicated QA Role**: 
   - While Developer handles testing, there's no independent QA validation
   - Testing and implementation by same persona could miss issues
   - Consider adding QA review step in checklists

2. **Data Governance**:
   - Data architecture is covered but data governance, privacy, and compliance could be stronger
   - GDPR and data retention policies not explicitly owned

3. **Production Support**:
   - Monitoring is included in deployment but ongoing operations support is light
   - Incident response and production debugging could be more explicit

4. **Performance Engineering**:
   - Performance testing exists but dedicated performance optimization and capacity planning is distributed
   - Could benefit from more explicit performance engineering responsibilities

5. **Release Management**:
   - While deployment pipeline exists, release coordination and rollback procedures could be more robust
   - Release notes and communication not explicitly covered

### Recommendations:

1. **Enhance Developer Role** with explicit QA validation steps in test-suite-quality-checklist
2. **Add Data Governance** responsibilities to Architect or create data governance checklist
3. **Strengthen Production Support** in deployment pipeline with incident response procedures
4. **Expand Performance Testing** in test strategy to include capacity planning
5. **Add Release Management** tasks to Orchestrator for coordinating releases

## Conclusion

The BMAD-CLAUDE-CODE framework provides comprehensive coverage of software development functions through its 6 personas. Testing, QA, and other critical functions are integrated into existing personas rather than being separate roles. While this integration promotes collaboration and shared ownership, some areas like independent QA validation and specialized functions (data governance, release management) could benefit from more explicit definition or additional checklists to ensure nothing falls through the cracks.

The framework's strength lies in its holistic approach where each persona has clear responsibilities while maintaining awareness of quality, security, and user needs throughout the development lifecycle.