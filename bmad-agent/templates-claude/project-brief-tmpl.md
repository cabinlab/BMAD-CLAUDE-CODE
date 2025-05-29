# Project Brief Template (Enhanced for Claude Code)

**Project Name**: [Descriptive Project Name]  
**Date**: [Current Date]  
**Created By**: [Business Analyst Name]  
**Stakeholders**: [Key people involved]

## Project Vision

### Problem Statement
**What problem are we solving?** [Clear, specific problem description]
- **For whom**: [Target user/customer type]
- **Current pain**: [What frustrates them today]
- **Impact**: [Cost of not solving this problem]

### Solution Vision
**How will we solve it?** [High-level solution approach]
- **Core value**: [Primary benefit delivered to users]
- **Key differentiator**: [What makes this solution unique]
- **Success looks like**: [Vision of successful outcome]

### Project Type
**Platform Classification**:
- [ ] **Simple SaaS** - Single-tenant, straightforward application
- [ ] **Multi-Tenant SaaS** - Multiple customers, shared infrastructure
- [ ] **Two-Sided Marketplace** - Buyers and sellers
- [ ] **Multi-Sided Platform** - Multiple participant types
- [ ] **Community Platform** - User-generated content and interaction
- [ ] **Enterprise Application** - Complex business workflows

## Target Users & Market

### Primary Users
**User Type**: [Primary user persona]
- **Demographics**: [Age, role, context where relevant]
- **Current behavior**: [How they solve this problem today]
- **Key needs**: [Top 3 needs this solution addresses]
- **Success criteria**: [How they'll measure success]

### Secondary Users (if applicable)
**User Type**: [Secondary user persona]
- **Role in platform**: [How they participate]
- **Value exchange**: [What they give/get]
- **Relationship to primary users**: [How they interact]

### Market Context
**Market Size**: [Addressable market, if known]
**Competition**: [Key competitors and how we're different]
**Market Opportunity**: [Why now? What's changed?]

## Business Model & Platform Economics

### Revenue Model
**How will this generate revenue?**
- [ ] **Subscription** - Monthly/yearly recurring fees
- [ ] **Transaction** - Commission on sales/transactions
- [ ] **Freemium** - Free tier with premium upgrades
- [ ] **Marketplace Commission** - Percentage of vendor sales
- [ ] **Advertising** - Sponsored content and listings
- [ ] **Enterprise Licensing** - Custom pricing for large customers

### Platform Dynamics (for marketplaces/platforms)
**Network Effects**: [How more users create more value]
**Chicken-Egg Strategy**: [How to bootstrap initial user base]
**Platform Governance**: [Quality control and user guidelines]

### Unit Economics
**Key Financial Metrics** (estimates):
- Customer Acquisition Cost (CAC): $[amount]
- Customer Lifetime Value (LTV): $[amount]
- Monthly Recurring Revenue (MRR) target: $[amount]
- Break-even timeline: [months]

## Success Metrics

### Business Success
**Primary Metric**: [Main measure of business success]
**Supporting Metrics**:
- Revenue: [Monthly/yearly targets]
- Users: [Growth targets]
- Retention: [Churn rate goals]

### User Success
**User Value Metrics**:
- Time saved: [How much time users save]
- Efficiency gained: [Productivity improvements]
- Satisfaction: [NPS or satisfaction targets]

### Platform Success (for marketplaces)
**Platform Health**:
- Liquidity: [Supply/demand balance]
- Transaction volume: [GMV targets]
- Vendor success: [Vendor retention, revenue]

## High-Level Requirements

### Core Functional Requirements
**Must-Have Features** (MVP):
1. [Feature 1]: [User value and acceptance criteria]
2. [Feature 2]: [User value and acceptance criteria]
3. [Feature 3]: [User value and acceptance criteria]

### Platform Requirements (for multi-tenant/marketplace)
**Multi-Tenancy Needs**:
- [ ] Data isolation between tenants/vendors
- [ ] Custom branding per tenant
- [ ] Role-based access control
- [ ] Tenant-specific configurations

**Search & Discovery**:
- [ ] Full-text search across content
- [ ] Faceted search with filters
- [ ] Location-based search (if applicable)
- [ ] Personalized recommendations

### Non-Functional Requirements
**Performance**: [Response time, user load expectations]
**Security**: [Authentication, data protection needs]
**Compliance**: [GDPR, CCPA, industry regulations]
**Scalability**: [Expected growth and scaling needs]

## Technical Considerations

### Architecture Approach
**Recommended Pattern**:
- [ ] **Monolithic** - Single application, simpler deployment
- [ ] **Modular Monolith** - Clear modules, single deployment
- [ ] **Microservices** - Multiple services, complex scaling
- [ ] **Serverless** - Function-based, event-driven

**Data Strategy**:
- [ ] **Single Database** - Simple, single source of truth
- [ ] **Database per Service** - Service isolation
- [ ] **Multi-Tenant Database** - Tenant isolation strategy
- [ ] **Hybrid Approach** - Mix based on data types

### Integration Requirements
**External Services Needed**:
- Payment processing: [Stripe, PayPal, etc.]
- Email/SMS: [SendGrid, Twilio, etc.]
- Maps/Location: [Google Maps, if applicable]
- Analytics: [Google Analytics, Mixpanel, etc.]

### Data Architecture Considerations
**Data Complexity**:
- [ ] **Simple** - Basic CRUD operations
- [ ] **Moderate** - Relationships, reporting needs
- [ ] **Complex** - Multi-tenant, analytics, search
- [ ] **Very Complex** - Real-time, ML, compliance

## Constraints & Assumptions

### Resource Constraints
**Timeline**: [Project deadline or target launch]
**Budget**: [Development budget constraints]
**Team**: [Available team size and skills]

### Technical Constraints
**Existing Systems**: [Systems that must be integrated]
**Technology Preferences**: [Required or preferred tech stack]
**Compliance Requirements**: [Regulatory constraints]

### Business Constraints
**Market Timing**: [Competitive or market pressures]
**Strategic Alignment**: [How this fits business strategy]
**Risk Tolerance**: [Acceptable risk levels]

## Risk Assessment

### Business Risks
**Market Risk**: [Competition, market changes]
- **Mitigation**: [How to address]

**Product Risk**: [User adoption, feature gaps]
- **Mitigation**: [How to address]

### Technical Risks
**Complexity Risk**: [Technical implementation challenges]
- **Mitigation**: [How to address]

**Scalability Risk**: [Performance under load]
- **Mitigation**: [How to address]

**Security Risk**: [Data protection, compliance]
- **Mitigation**: [How to address]

## MVP Definition

### Phase 1: MVP (Target: [Date])
**Core Value**: [Minimum viable user value]
**Essential Features**:
- [ ] [Feature 1]: [Why essential]
- [ ] [Feature 2]: [Why essential]
- [ ] [Feature 3]: [Why essential]

**Success Criteria**:
- [Specific, measurable criteria for MVP success]

### Phase 2: Growth (Target: [Date])
**Enhanced Value**: [Additional user value]
**Growth Features**:
- [ ] [Feature 4]: [Growth impact]
- [ ] [Feature 5]: [User retention benefit]

### Phase 3: Scale (Target: [Date])
**Advanced Features**:
- [ ] [Advanced feature 1]: [Competitive advantage]
- [ ] [Platform feature]: [Ecosystem expansion]

## Next Steps

### Immediate Actions
1. **Validate Assumptions**: [How to test key assumptions]
2. **Stakeholder Alignment**: [Who needs to approve this brief]
3. **Resource Planning**: [Team and budget allocation]

### Project Initiation
1. **PRD Creation**: [Move to detailed product requirements]
2. **Technical Discovery**: [Architecture and feasibility analysis]
3. **Design Planning**: [UX/UI design requirements]

## Stakeholder Sign-Off

**Business Stakeholder**: _________________ Date: _______
**Technical Stakeholder**: _________________ Date: _______
**Product Stakeholder**: _________________ Date: _______

---

## Claude Code Prompts

*Use these prompts to help complete the project brief:*

**For Problem Definition**: "Help me clearly articulate the specific problem this project solves and who experiences this problem most acutely."

**For Solution Vision**: "Based on this problem, what would be an ideal solution that creates real user value?"

**For Business Model**: "For this type of solution and user base, what are the most viable revenue models to consider?"

**For Technical Approach**: "Given these requirements and constraints, what technical architecture would be most appropriate?"

**For Risk Assessment**: "What are the key risks for this type of project and how can they be mitigated?"

**For MVP Definition**: "What is the absolute minimum set of features that would deliver meaningful value to users?"