# Document Sharding Plan Template (Enhanced for Claude Code)

**Project**: [Project Name]  
**Phase**: Documentation Organization  
**Date**: [Current Date]  
**Objective**: Break down large documentation into focused, manageable files

## Overview

This template guides Claude Code in systematically breaking down comprehensive project documents into focused, granular files. Each section includes clear extraction instructions and Claude Code prompts for optimal execution.

## Sharding Strategy

### Document Processing Principles
1. **Atomic Sections**: Each output file should cover one specific topic
2. **Self-Contained**: Files should be independently useful
3. **Cross-Referenced**: Maintain navigation between related documents
4. **Claude Code Optimized**: Include specific prompts for AI assistance

---

## 1. Source Document: Project Requirements Document (PRD)

**Source File**: [Confirm exact filename: `prd.md`, `requirements.md`, etc.]

### 1.1. Epic Extraction

**Extraction Goal**: Create individual epic documents for focused development planning

**Claude Code Prompt**: *"Extract Epic [X] from the PRD, including all associated user stories, acceptance criteria, and success metrics. Create a standalone epic document."*

#### Target Files Pattern: `docs/epic-[id].md`

**Content to Extract**:
- Complete epic description and objectives
- Business value and user impact
- All associated user stories
- Acceptance criteria and success metrics
- Dependencies and assumptions
- Implementation timeline and phases

**File Structure Template**:
```markdown
# Epic [ID]: [Epic Name]

## Epic Overview
[Complete epic description]

## Business Value
[User value and business impact]

## User Stories
[All associated stories]

## Success Metrics
[Measurable outcomes]

## Implementation Plan
[Timeline and phases]
```

### 1.2. Requirements Documentation

**Target Files**:
- `docs/functional-requirements.md` - Core features and capabilities
- `docs/non-functional-requirements.md` - Performance, security, scalability
- `docs/user-requirements.md` - User personas and journeys
- `docs/business-requirements.md` - Business objectives and constraints

---

## 2. Source Document: System Architecture

**Source File**: [Confirm exact filename: `architecture.md`, `system-design.md`, etc.]

### 2.1. Technical Reference Documents

#### API Documentation
**Target File**: `docs/api-reference.md`
**Claude Code Prompt**: *"Extract all API endpoint definitions, request/response schemas, authentication methods, and error codes into a comprehensive API reference."*

**Content to Extract**:
- API endpoint definitions and methods
- Request/response schemas and examples
- Authentication and authorization
- Error codes and handling
- Rate limiting and versioning

#### Data Architecture
**Target File**: `docs/data-models.md`
**Claude Code Prompt**: *"Extract database schemas, entity relationships, data flow diagrams, and data governance policies into a focused data architecture document."*

**Content to Extract**:
- Entity relationship diagrams
- Database schema definitions
- Data flow and transformation logic
- Data governance and compliance
- Backup and recovery strategies

#### Environment Configuration
**Target File**: `docs/environment-vars.md`
**Claude Code Prompt**: *"Create a comprehensive environment variable reference with descriptions, default values, security considerations, and environment-specific configurations."*

**Content to Extract**:
- Environment variable definitions
- Configuration management strategy
- Security and secret management
- Environment-specific settings
- Deployment configuration

### 2.2. Architectural Views

#### System Components
**Target File**: `docs/component-view.md`
**Claude Code Prompt**: *"Extract component diagrams, service boundaries, design patterns, and architectural decisions into a component architecture reference."*

**Content to Extract**:
- Component architecture diagrams
- Service boundaries and responsibilities
- Design patterns and architectural decisions
- Inter-component communication
- Scalability and performance considerations

#### Process Workflows
**Target File**: `docs/sequence-diagrams.md`
**Claude Code Prompt**: *"Extract all sequence diagrams, workflow descriptions, and process flows into a comprehensive process documentation."*

**Content to Extract**:
- Sequence diagrams for key workflows
- Business process descriptions
- Error handling and recovery flows
- User journey mapping
- System integration processes

### 2.3. Infrastructure Documentation

#### Technology Stack
**Target File**: `docs/tech-stack.md`
**Claude Code Prompt**: *"Create a comprehensive technology stack document including frameworks, libraries, tools, and rationale for technology choices."*

**Content to Extract**:
- Core technologies and frameworks
- Development tools and libraries
- Infrastructure technologies
- Technology decision rationale
- Version management and upgrades

#### Deployment Infrastructure
**Target File**: `docs/infra-deployment.md`
**Claude Code Prompt**: *"Extract deployment strategies, infrastructure setup, scaling plans, and operational procedures into a deployment guide."*

**Content to Extract**:
- Deployment architecture and strategies
- Infrastructure as Code (IaC) setup
- Scaling and performance optimization
- Monitoring and alerting setup
- Disaster recovery procedures

### 2.4. Development Guidelines

#### Operational Standards
**Target File**: `docs/operational-guidelines.md`
**Claude Code Prompt**: *"Consolidate coding standards, testing strategies, security practices, and development workflows into comprehensive operational guidelines."*

**Content to Extract**:
- Coding standards and best practices
- Testing strategy and procedures
- Security guidelines and practices
- Development workflow and processes
- Code review and quality assurance

#### Project Organization
**Target File**: `docs/project-structure.md`
**Claude Code Prompt**: *"Document the complete project structure, including directory organization, file naming conventions, and module organization."*

**Content to Extract**:
- Directory structure and organization
- File naming conventions
- Module and package organization
- Configuration file locations
- Documentation structure

---

## 3. Source Document: Frontend Architecture

**Source File**: [Confirm exact filename: `frontend-architecture.md`, `ui-architecture.md`, etc.]

### 3.1. Frontend Technical Documentation

#### Frontend Project Organization
**Target File**: `docs/frontend-structure.md`
**Claude Code Prompt**: *"Extract frontend project structure, component organization, and build configuration into a frontend development guide."*

**Content to Extract**:
- Frontend directory structure
- Component organization patterns
- Build and bundling configuration
- Asset management strategy
- Development environment setup

#### UI Component Library
**Target File**: `docs/component-library.md`
**Claude Code Prompt**: *"Create a comprehensive component library reference including design system, component specifications, and usage guidelines."*

**Content to Extract**:
- Design system principles
- Component specifications and APIs
- Usage guidelines and examples
- Accessibility requirements
- Component testing strategies

#### Frontend State Management
**Target File**: `docs/frontend-state-management.md`
**Claude Code Prompt**: *"Extract state management strategy, data flow patterns, and state synchronization approaches into a frontend state guide."*

**Content to Extract**:
- State management architecture
- Data flow and synchronization
- API integration patterns
- Caching and persistence strategies
- Performance optimization

### 3.2. UI/UX Documentation

#### Design Specifications
**Target File**: `docs/design-system.md`
**Claude Code Prompt**: *"Extract design system specifications, brand guidelines, and visual design standards into a comprehensive design reference."*

**Content to Extract**:
- Brand guidelines and visual identity
- Color palette and typography
- Spacing and layout systems
- Component visual specifications
- Responsive design guidelines

#### User Experience Guidelines
**Target File**: `docs/ux-guidelines.md`
**Claude Code Prompt**: *"Create user experience guidelines including interaction patterns, accessibility standards, and usability principles."*

**Content to Extract**:
- User interaction patterns
- Accessibility standards (WCAG compliance)
- Usability principles and guidelines
- User testing procedures
- Performance and optimization guidelines

---

## 4. Platform-Specific Documentation (Multi-Tenant/Marketplace)

### 4.1. Platform Architecture
**Target File**: `docs/platform-architecture.md`
**Claude Code Prompt**: *"Extract multi-tenant architecture, platform governance, and scaling strategies into a platform-specific architecture guide."*

### 4.2. Multi-Tenancy Documentation
**Target File**: `docs/multi-tenant-design.md`
**Claude Code Prompt**: *"Document tenant isolation strategies, data partitioning, and tenant management processes."*

### 4.3. Marketplace Features
**Target File**: `docs/marketplace-features.md`
**Claude Code Prompt**: *"Extract marketplace-specific features, vendor management, and transaction processing into a marketplace operations guide."*

---

## 5. Compliance and Security Documentation

### 5.1. Security Architecture
**Target File**: `docs/security-architecture.md`
**Claude Code Prompt**: *"Extract security requirements, threat modeling, and security controls into a comprehensive security guide."*

### 5.2. Compliance Framework
**Target File**: `docs/compliance-framework.md`
**Claude Code Prompt**: *"Document regulatory compliance requirements, audit procedures, and compliance automation."*

---

## 6. Post-Sharding Tasks

### 6.1. Index Creation
**Target File**: `docs/index.md`
**Claude Code Prompt**: *"Create a comprehensive documentation index with descriptions of each document's purpose and how they relate to each other."*

**Index Structure**:
```markdown
# Project Documentation Index

## Core Documentation
- [Project Brief](project-brief.md) - Project vision and requirements
- [System Architecture](architecture.md) - Technical system design

## Implementation Guides
- [API Reference](api-reference.md) - API endpoints and usage
- [Component Library](component-library.md) - UI component specifications

## Operational Documentation
- [Deployment Guide](infra-deployment.md) - Infrastructure and deployment
- [Operational Guidelines](operational-guidelines.md) - Development standards
```

### 6.2. Cross-Reference Validation
**Claude Code Prompt**: *"Review all sharded documents to ensure cross-references are accurate and create missing links between related documents."*

### 6.3. Document Completeness Check
**Claude Code Prompt**: *"Verify that all sections from source documents have been appropriately extracted and no critical information has been lost."*

---

## Execution Workflow

### Phase 1: Document Analysis
1. **Inventory Source Documents**: Identify all source documents to be sharded
2. **Map Content Sections**: Create a mapping of source sections to target files
3. **Validate Extraction Plan**: Ensure all content will be captured

### Phase 2: Content Extraction
1. **Extract Core Documents**: Process PRD and architecture documents first
2. **Extract Specialized Documents**: Process frontend and platform-specific content
3. **Validate Content**: Ensure extracted content is complete and coherent

### Phase 3: Organization and Cross-Referencing
1. **Create Document Index**: Build comprehensive navigation
2. **Add Cross-References**: Link related documents
3. **Validate Structure**: Ensure logical document organization

---

## Claude Code Execution Notes

**For Each Extraction Task**:
1. Read the source document completely
2. Identify the specific sections to extract
3. Create a well-structured target document
4. Include appropriate headings and formatting
5. Add cross-references to related documents
6. Validate content completeness

**Quality Checks**:
- Ensure extracted content is self-contained
- Verify all source content has been captured
- Check that document structure is logical
- Validate cross-references work correctly
- Ensure consistent formatting and style

**File Management**:
- Use consistent naming conventions
- Organize files in logical directory structure
- Maintain proper file permissions
- Create backup of original documents before sharding