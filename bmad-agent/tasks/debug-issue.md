# Task: Debug System Issue

**Persona**: Developer  
**Phase**: Implementation/Maintenance  
**Prerequisites**: Issue description, access to logs and system metrics

## Objective
Systematically identify, understand, and resolve technical issues in the system.

## Process

### 1. Issue Reproduction
- [ ] Reproduce the issue in a controlled environment
- [ ] Document exact steps to trigger the problem
- [ ] Identify environmental factors (browser, device, data)
- [ ] Capture error messages, logs, and stack traces

### 2. Information Gathering
- [ ] Review application logs around the time of issue
- [ ] Check system metrics (CPU, memory, disk, network)
- [ ] Examine database query logs and performance
- [ ] Review recent code changes and deployments

### 3. Hypothesis Formation
- [ ] Generate multiple potential root causes
- [ ] Prioritize hypotheses by likelihood and impact
- [ ] Consider both technical and data-related causes
- [ ] Review similar past issues and their resolutions

### 4. Systematic Testing
- [ ] Test each hypothesis methodically
- [ ] Use debugging tools and techniques
- [ ] Add temporary logging or instrumentation
- [ ] Isolate components to narrow down the source

### 5. Root Cause Analysis
- [ ] Identify the fundamental cause, not just symptoms
- [ ] Understand why the issue wasn't caught earlier
- [ ] Document the failure mode and conditions
- [ ] Assess impact and affected users/systems

### 6. Resolution Implementation
- [ ] Develop and test the fix
- [ ] Validate fix doesn't introduce new issues
- [ ] Plan deployment strategy (hotfix vs scheduled)
- [ ] Prepare rollback plan if needed

## Debugging Techniques

### Log Analysis
- [ ] Search for error patterns and anomalies
- [ ] Correlate logs across different services
- [ ] Analyze request/response flows
- [ ] Check for performance degradation patterns

### System Monitoring
- [ ] Review resource utilization trends
- [ ] Check for memory leaks or resource exhaustion
- [ ] Analyze database performance and blocking
- [ ] Monitor network latency and connectivity

### Code Analysis
- [ ] Review recent changes related to the issue
- [ ] Check for race conditions or concurrency issues
- [ ] Validate input handling and edge cases
- [ ] Examine error handling and recovery logic

### Data Investigation
- [ ] Check for data corruption or inconsistencies
- [ ] Validate business logic with actual data
- [ ] Analyze data patterns that trigger the issue
- [ ] Review database constraints and relationships

## Issue Categories

### Performance Issues
- [ ] Slow database queries
- [ ] Memory leaks or excessive allocation
- [ ] Network latency or timeouts
- [ ] Inefficient algorithms or data structures

### Functional Bugs
- [ ] Business logic errors
- [ ] Integration failures
- [ ] Data validation problems
- [ ] UI/UX issues

### Infrastructure Problems
- [ ] Service unavailability
- [ ] Configuration errors
- [ ] Dependency failures
- [ ] Resource exhaustion

### Security Incidents
- [ ] Unauthorized access attempts
- [ ] Data exposure or leakage
- [ ] Malicious activity detection
- [ ] Compliance violations

## Deliverables
- Issue analysis report with root cause
- Fix implementation with test validation
- Post-mortem document (for significant issues)
- Prevention measures and monitoring improvements
- Updated runbooks or troubleshooting guides

## Prevention Planning
- [ ] Add monitoring or alerting to catch similar issues early
- [ ] Improve test coverage for the failure scenario
- [ ] Update documentation or runbooks
- [ ] Consider architectural changes to prevent recurrence

## Handoff
Issue resolution → Orchestrator for documentation updates
Prevention measures → All relevant personas for implementation
Lessons learned → Team knowledge base

## Notes
- Document your debugging process for future reference
- Don't stop at fixing symptoms - find the root cause
- Consider the broader implications of both the issue and the fix
- Share learnings with the team to prevent similar issues