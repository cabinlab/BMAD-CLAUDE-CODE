# Task: Security Threat Modeling

**Persona**: Architect  
**Phase**: Design  
**Prerequisites**: System architecture, data flow diagrams, compliance requirements

## Objective
Identify security threats and design appropriate mitigations before implementation begins.

## Process

### 1. Asset Identification
- [ ] Catalog sensitive data (PII, financial, health, etc.)
- [ ] Identify critical system components
- [ ] Map trust boundaries and attack surfaces
- [ ] Document compliance requirements (GDPR, HIPAA, PCI, etc.)

### 2. Threat Identification (STRIDE)
- **Spoofing**: [ ] Identity verification vulnerabilities
- **Tampering**: [ ] Data integrity threats
- **Repudiation**: [ ] Non-repudiation gaps
- **Information Disclosure**: [ ] Data exposure risks
- **Denial of Service**: [ ] Availability threats
- **Elevation of Privilege**: [ ] Authorization bypass risks

### 3. Attack Vector Analysis
- [ ] External network attacks
- [ ] Insider threats and privilege escalation
- [ ] Supply chain and dependency vulnerabilities
- [ ] Social engineering and phishing risks
- [ ] Physical security considerations

### 4. Risk Assessment
- [ ] Rate threat likelihood (High/Medium/Low)
- [ ] Assess potential impact (High/Medium/Low)
- [ ] Calculate risk priority (Impact × Likelihood)
- [ ] Identify compliance violations

### 5. Mitigation Strategy
- [ ] Design preventive controls
- [ ] Plan detective controls and monitoring
- [ ] Establish incident response procedures
- [ ] Document recovery and business continuity

### 6. Security Architecture
- [ ] Authentication mechanisms and flows
- [ ] Authorization models and policies
- [ ] Data encryption (at rest and in transit)
- [ ] Network security and segmentation
- [ ] Audit logging and monitoring

## Threat Categories

### Authentication & Authorization
- [ ] Weak password policies
- [ ] Session management vulnerabilities
- [ ] Multi-factor authentication bypass
- [ ] Privilege escalation paths
- [ ] OAuth/SAML implementation flaws

### Data Protection
- [ ] Unencrypted sensitive data
- [ ] Inadequate key management
- [ ] Data leakage through logs or errors
- [ ] Insufficient data anonymization
- [ ] Cross-tenant data exposure

### Network & Infrastructure
- [ ] Unencrypted communications
- [ ] Man-in-the-middle attacks
- [ ] DDoS and resource exhaustion
- [ ] Infrastructure misconfigurations
- [ ] Container and orchestration vulnerabilities

### Application Security
- [ ] SQL injection vulnerabilities
- [ ] Cross-site scripting (XSS)
- [ ] Cross-site request forgery (CSRF)
- [ ] Insecure direct object references
- [ ] Business logic bypass

### Supply Chain
- [ ] Vulnerable dependencies
- [ ] Malicious packages or libraries
- [ ] Compromised build or deployment pipeline
- [ ] Third-party service vulnerabilities

## Deliverables
- Threat model document with identified threats and mitigations
- Security architecture diagram with trust boundaries
- Risk register with prioritized threats
- Security requirements for implementation teams
- Incident response and monitoring plan
- Compliance checklist and gap analysis

## Mitigation Planning
For each identified threat:
- [ ] **Prevention**: How to prevent the threat
- [ ] **Detection**: How to detect if it occurs
- [ ] **Response**: How to respond and recover
- [ ] **Testing**: How to validate the mitigation

## Handoff
Security model → Developer for implementation of security controls
Compliance requirements → All personas for integration
Monitoring requirements → Developer for observability setup

## Notes
- Security by design is more effective than security as an afterthought
- Consider both technical and procedural mitigations
- Plan for regular security reviews and updates
- Balance security with usability and performance