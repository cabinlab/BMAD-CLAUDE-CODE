# Task: Create System Architecture

**Persona**: Architect  
**Phase**: Design  
**Prerequisites**: PRD with clear requirements, technical constraints, integration needs

## Objective
Design a comprehensive technical architecture that supports product requirements while ensuring scalability, maintainability, and operational excellence.

## Process

### 1. Requirements Analysis
- [ ] Review PRD thoroughly for functional and non-functional requirements
- [ ] Understand user workflows and data flows
- [ ] Identify technical constraints and compliance requirements
- [ ] Clarify integration requirements with external systems

### 2. Architecture Pattern Selection
- [ ] Evaluate architectural patterns against requirements
- [ ] Choose deployment topology (monolith, services, serverless, hybrid)
- [ ] Select data architecture pattern (single DB, polyglot, event-sourced)
- [ ] Plan infrastructure approach (cloud, edge, on-premise, hybrid)

### 3. System Design
- [ ] Define major system components and their responsibilities
- [ ] Design component interfaces and communication patterns
- [ ] Plan data flow and storage strategies
- [ ] Define security boundaries and access control

### 4. Technology Selection
- [ ] Choose programming languages and frameworks
- [ ] Select databases and data storage solutions
- [ ] Pick infrastructure and deployment technologies
- [ ] Document rationale for each technology choice

### 5. Integration Architecture
- [ ] Design API specifications and contracts
- [ ] Plan external service integrations
- [ ] Define event and messaging patterns
- [ ] Consider authentication and authorization flows

### 6. Operational Design
- [ ] Plan monitoring and observability strategy
- [ ] Design deployment and CI/CD approach
- [ ] Consider disaster recovery and backup strategies
- [ ] Plan for scaling and performance optimization

## Architecture Documentation

### System Overview
- [ ] High-level architecture diagram
- [ ] Component responsibilities and relationships
- [ ] Key design decisions and trade-offs
- [ ] Technology stack with selection rationale

### Component Architecture
- [ ] Detailed component specifications
- [ ] Interface definitions and contracts
- [ ] Data models and schemas
- [ ] Security and access control design

### Infrastructure Design
- [ ] Deployment architecture and environments
- [ ] Network design and security boundaries
- [ ] Resource requirements and scaling plans
- [ ] Monitoring and operational considerations

### Integration Specifications
- [ ] API design and documentation
- [ ] External service integration patterns
- [ ] Event flows and messaging architecture
- [ ] Authentication and authorization systems

## Quality Validation

### Architecture Review
- [ ] Validates all functional requirements
- [ ] Meets non-functional requirements (performance, security, scalability)
- [ ] Follows established patterns and best practices
- [ ] Considers operational complexity and maintainability

### Risk Assessment
- [ ] Identifies potential technical risks
- [ ] Plans mitigation strategies
- [ ] Considers failure modes and recovery
- [ ] Evaluates vendor lock-in and dependencies

### Future Considerations
- [ ] Architecture can evolve with requirements
- [ ] Plans for technical debt management
- [ ] Considers migration and modernization paths
- [ ] Enables team productivity and development velocity

## Deliverables
- Complete architecture document using `architecture-tmpl.md`
- System diagrams and component specifications
- Technology selection with rationale
- API specifications and integration patterns
- Infrastructure and deployment plans
- Security architecture and threat model

## Handoff Process
Architecture design → Designer for UX/technical alignment
Technology choices → Developer for implementation planning
Security model → All personas for compliance integration
Infrastructure plan → Developer for deployment setup

## Notes
- Design for the scale you need, not infinite scale
- Prioritize simplicity and maintainability over complexity
- Document architectural decisions and their rationale
- Consider the team's skills and experience with chosen technologies