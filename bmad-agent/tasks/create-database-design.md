# Create Database Design

**Persona**: Data Engineer  
**Phase**: Design/Architecture  
**Prerequisites**: PRD with data requirements, Architecture decisions on storage technologies

## Purpose
Design comprehensive database schemas that support application requirements while ensuring data integrity, performance, and scalability. This includes defining tables, relationships, indexes, and constraints that form the foundation of the data layer.

## Required Inputs
- **Product Requirements Document (PRD)**: `docs/prd.md`
- **System Architecture**: `docs/architecture.md` 
- **User Stories**: To understand data access patterns
- **Non-functional requirements**: Performance, scale, compliance needs

## Key Activities

### 1. Analyze Data Requirements
- Identify all entities and their attributes from requirements
- Understand relationships between entities
- Document data volumes and growth projections
- Identify access patterns and query requirements
- Note compliance and privacy requirements for data types

### 2. Choose Database Paradigm
**Evaluate best fit based on requirements:**

**Relational (SQL)**:
- Strong consistency and ACID requirements
- Complex relationships between entities
- Need for ad-hoc querying
- Reporting and analytics requirements

**Document (NoSQL)**:
- Flexible, evolving schemas
- Hierarchical or nested data
- High read/write throughput needs
- Geographic distribution requirements

**Key-Value/Cache**:
- Simple access patterns
- High-performance requirements
- Session or temporary data
- Caching layer needs

**Graph**:
- Complex many-to-many relationships
- Network analysis requirements
- Recommendation engines
- Social connections

### 3. Design Core Schema

**For Relational Databases**:
- **Entity Design**: Define tables with appropriate data types
- **Normalization**: Apply normalization rules (typically 3NF)
- **Relationships**: Define foreign keys and constraints
- **Indexes**: Plan indexes based on query patterns
- **Partitioning**: Consider partitioning for large tables

**For Document Stores**:
- **Document Structure**: Define collection schemas
- **Embedding vs References**: Decide data organization
- **Sharding Strategy**: Plan for horizontal scaling
- **Index Design**: Define secondary indexes

### 4. Data Integrity & Constraints
**Define Rules**:
- Primary keys and unique constraints
- Foreign key relationships
- Check constraints for data validation
- Default values and nullable fields
- Cascade rules for updates/deletes

**Data Types**:
- Choose appropriate data types for efficiency
- Consider timezone handling for dates
- Plan for internationalization (Unicode)
- Handle currency and decimal precision

### 5. Performance Optimization
**Query Optimization**:
- Identify frequent query patterns
- Design covering indexes
- Consider materialized views
- Plan for query result caching

**Storage Optimization**:
- Estimate storage requirements
- Plan compression strategies
- Consider archival strategies
- Design for efficient backups

### 6. Scalability Planning
**Vertical Scaling**:
- Design for larger hardware
- Consider connection pooling
- Plan for read replicas

**Horizontal Scaling**:
- Sharding key selection
- Cross-shard query handling
- Distributed transaction planning
- Data locality optimization

### 7. Security & Compliance
**Access Control**:
- Row-level security requirements
- Column-level encryption needs
- Audit trail requirements
- Data masking strategies

**Compliance**:
- PII identification and protection
- GDPR right-to-be-forgotten implementation
- Data residency requirements
- Retention policy implementation

### 8. Migration & Evolution
**Schema Versioning**:
- Plan for backward compatibility
- Design migration strategies
- Consider blue-green deployments
- Document rollback procedures

**Data Migration**:
- Design ETL processes for initial load
- Plan for zero-downtime migrations
- Create data validation procedures
- Design fallback strategies

## Deliverables

### Database Schema Document
**Structure**:
```
## Overview
- Database paradigm choice and rationale
- High-level entity relationship diagram
- Key design decisions

## Detailed Schema
- Table/Collection definitions
- Field specifications with data types
- Relationships and constraints
- Index definitions

## Data Dictionary
- Field descriptions and business rules
- Enumeration values
- Validation rules

## Access Patterns
- Common queries and their execution plans
- Performance benchmarks
- Optimization strategies

## Security Model
- Access control design
- Encryption approach
- Audit requirements

## Migration Plan
- Initial data load strategy
- Schema evolution approach
- Rollback procedures
```

### Implementation Artifacts
- SQL DDL scripts or NoSQL schema definitions
- Migration scripts with up/down procedures
- Seed data scripts for development
- Performance testing scripts
- Backup and recovery procedures

## Quality Validation

Run through design checklist:
- [ ] All entities from requirements are modeled
- [ ] Relationships maintain referential integrity
- [ ] Performance requirements can be met
- [ ] Scalability path is clear
- [ ] Security and compliance needs addressed
- [ ] Migration strategy is defined
- [ ] Backup and recovery procedures exist
- [ ] Documentation is complete

## Next Steps
After database design is complete:
1. Review with Architect for system integration
2. Validate with Developer for application needs
3. Coordinate with DevOps for infrastructure requirements
4. Create data migration strategy if needed
5. Implement security and compliance measures