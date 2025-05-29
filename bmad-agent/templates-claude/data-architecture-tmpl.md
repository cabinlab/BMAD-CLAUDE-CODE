# Data Architecture Document

**Project**: [Project Name]  
**Version**: 1.0  
**Date**: [Current Date]  
**Data Architect**: [Your Name]  
**Related Documents**: [Links to System Architecture, PRD]

## Executive Summary

**Data Strategy Overview**: [One paragraph describing the overall approach to data in this system]

**Key Data Decisions**:
- [Decision 1]: [Brief rationale]
- [Decision 2]: [Brief rationale]
- [Decision 3]: [Brief rationale]

## Data Requirements

### Business Data Needs
**Primary Data Types**:
- [Data type 1]: [What it represents, why it's critical]
- [Data type 2]: [Purpose and importance]
- [Data type 3]: [Business value and usage]

**Data Governance Requirements**:
- **Data Ownership**: [Who owns what data]
- **Data Quality**: [Accuracy, completeness standards]
- **Data Lifecycle**: [How long data is retained]
- **Compliance**: [GDPR, CCPA, industry regulations]

### Platform-Specific Requirements

#### Multi-Tenant Data Isolation
- **Tenant Boundary**: [How tenant data is separated]
- **Shared Data**: [What data can be shared across tenants]
- **Access Control**: [How data access is controlled]

#### Search & Discovery Requirements
- **Search Scope**: [What content needs to be searchable]
- **Search Features**: [Full-text, faceted, geo-location search]
- **Search Performance**: [Response time requirements]
- **Search Relevance**: [Ranking and scoring needs]

#### Analytics Requirements
- **Business Intelligence**: [What insights are needed]
- **Real-time Analytics**: [Live data requirements]
- **Historical Analysis**: [Trend analysis needs]
- **User Analytics**: [Behavior tracking requirements]

## Data Models

### Core Entities

#### User/Account Management
```
User
├── id (UUID, primary key)
├── email (unique, encrypted)
├── name (encrypted)
├── role (admin, vendor, customer)
├── tenant_id (foreign key)
├── created_at
├── updated_at
└── deleted_at (soft delete)

Tenant
├── id (UUID, primary key)
├── name
├── subdomain (unique)
├── settings (JSON)
├── subscription_tier
├── created_at
└── status (active, suspended, deleted)
```

#### [Core Business Entity]
```
[EntityName]
├── id (UUID, primary key)
├── tenant_id (foreign key, indexed)
├── [field1] ([type, constraints])
├── [field2] ([type, constraints])
├── [field3] ([type, constraints])
├── created_at
├── updated_at
└── metadata (JSON, for extensibility)
```

#### [Secondary Business Entity]
```
[EntityName]
├── id (UUID, primary key)
├── tenant_id (foreign key, indexed)
├── [relationship]_id (foreign key)
├── [field1] ([type, constraints])
├── [field2] ([type, constraints])
├── created_at
└── updated_at
```

### Relationship Mapping
- **User** → **Tenant**: Many-to-One (users belong to one tenant)
- **[Entity1]** → **[Entity2]**: [Relationship type and cardinality]
- **[Entity1]** → **User**: [Relationship description]

### Data Integrity Rules
- **Referential Integrity**: [Foreign key constraints and cascading rules]
- **Business Rules**: [Domain-specific constraints and validations]
- **Audit Trail**: [Change tracking and versioning strategy]

## Data Storage Strategy

### Primary Database Design

#### Database Technology
- [ ] **PostgreSQL** - Relational with JSON support
- [ ] **MongoDB** - Document-based NoSQL
- [ ] **MySQL** - Traditional relational
- [ ] **Hybrid** - Multiple databases for different needs

**Rationale**: [Why this database choice fits the requirements]

#### Database Architecture
- [ ] **Single Database** - All data in one database
- [ ] **Database per Tenant** - Isolated databases for each tenant
- [ ] **Shared Database, Separate Schema** - Schema-level isolation
- [ ] **Shared Database, Shared Schema** - Row-level isolation with tenant_id

**Multi-Tenancy Strategy**: [How tenant data is isolated]

#### Indexing Strategy
**Performance Indexes**:
- `tenant_id` - Present on all multi-tenant tables
- `[entity]_id` + `tenant_id` - Composite indexes for tenant queries
- `created_at` - For time-based queries
- `status` + `tenant_id` - For filtered queries

**Search Indexes**:
- Full-text search on `[searchable_fields]`
- Geospatial indexes on location data (if applicable)
- Custom indexes for faceted search

### Search Infrastructure

#### Search Technology
- [ ] **Elasticsearch** - Advanced search and analytics
- [ ] **Algolia** - Managed search service
- [ ] **PostgreSQL Full-Text** - Built-in database search
- [ ] **Solr** - Open-source search platform

**Search Architecture**:
- **Indexing Strategy**: [How data gets into search index]
- **Update Frequency**: [Real-time vs batch updates]
- **Index Structure**: [How search data is organized]

#### Search Index Design
```
SearchIndex: [IndexName]
├── document_id (unique identifier)
├── tenant_id (for isolation)
├── content_type ([entity type])
├── title (searchable text)
├── description (searchable text)
├── tags (faceted search)
├── location (geo search, if applicable)
├── created_at (date filtering)
└── metadata (additional facets)
```

### Analytics Data Store

#### Analytics Architecture
- [ ] **Embedded Analytics** - Same database as application
- [ ] **Separate Analytics Database** - Dedicated OLAP system
- [ ] **Data Warehouse** - Full ETL pipeline to warehouse
- [ ] **Real-time Stream Processing** - Event-driven analytics

#### Analytics Data Models
**Event Tracking**:
```
UserEvent
├── id (UUID)
├── tenant_id
├── user_id
├── event_type
├── entity_id (what was acted upon)
├── properties (JSON, event-specific data)
├── timestamp
└── session_id
```

**Aggregated Metrics**:
```
DailyMetrics
├── date
├── tenant_id
├── metric_type
├── metric_value
├── dimensions (JSON, breakdown data)
└── created_at
```

## Data Flow Architecture

### Data Ingestion
**User-Generated Data**:
1. User action → Application API
2. Validation & business logic
3. Primary database write
4. Search index update (async)
5. Analytics event (async)

**External Data Sources**:
- [Source 1]: [How data flows from external source]
- [Source 2]: [Integration pattern and frequency]

### Data Processing Pipelines

#### Real-time Processing
- **Event Streaming**: [Technology choice - Kafka, Redis, etc.]
- **Stream Processing**: [Real-time data transformations]
- **Trigger Actions**: [Automated responses to data changes]

#### Batch Processing
- **ETL Jobs**: [Extract, Transform, Load processes]
- **Data Aggregation**: [Summary and reporting data creation]
- **Data Cleanup**: [Maintenance and optimization tasks]

### Data Synchronization
**Cross-Service Sync**: [How data stays consistent across services]
**Cache Invalidation**: [Strategy for cache updates]
**Event Sourcing**: [If using event-driven architecture]

## Security & Privacy

### Data Protection Strategy

#### Encryption
- **At Rest**: [Database encryption approach]
- **In Transit**: [API and data transfer encryption]
- **Application Level**: [Field-level encryption for sensitive data]

#### Access Control
- **Database Level**: [Database user permissions and roles]
- **Application Level**: [How app controls data access]
- **API Level**: [Authentication and authorization for data APIs]

### Privacy Compliance

#### GDPR/CCPA Compliance
- **Data Inventory**: [Catalog of personal data collected]
- **Consent Management**: [How user consent is tracked]
- **Right to Access**: [How users can access their data]
- **Right to Delete**: [Data deletion and anonymization process]
- **Data Portability**: [Data export capabilities]

#### Audit and Compliance
- **Audit Logging**: [What data access is logged]
- **Data Lineage**: [Tracking data sources and transformations]
- **Compliance Reporting**: [Automated compliance checking]

### Multi-Tenant Security
- **Data Isolation**: [Technical implementation of tenant separation]
- **Cross-Tenant Checks**: [Prevention of data leakage]
- **Admin Access**: [How platform admins access tenant data]

## Performance & Scalability

### Database Performance

#### Query Optimization
- **Index Strategy**: [How indexes are maintained and optimized]
- **Query Patterns**: [Common query optimizations]
- **Connection Pooling**: [Database connection management]

#### Scaling Strategy
- **Vertical Scaling**: [When to scale up database resources]
- **Horizontal Scaling**: [Read replicas and sharding strategy]
- **Caching**: [Database query caching approach]

### Search Performance
- **Index Size Management**: [How to handle growing search indexes]
- **Query Performance**: [Search response time optimization]
- **Relevance Tuning**: [Search result quality improvement]

### Analytics Performance
- **Real-time vs Batch**: [When to use each approach]
- **Data Aggregation**: [Pre-computed vs on-demand analytics]
- **Historical Data**: [Archive and compression strategies]

## Backup & Disaster Recovery

### Backup Strategy
- **Database Backups**: [Frequency and retention policy]
- **Search Index Backups**: [How search data is backed up]
- **Cross-Region Replication**: [Geographic redundancy]

### Recovery Procedures
- **RTO (Recovery Time Objective)**: [Target recovery time]
- **RPO (Recovery Point Objective)**: [Acceptable data loss window]
- **Recovery Testing**: [How recovery procedures are validated]

## Monitoring & Observability

### Data Quality Monitoring
- **Data Validation**: [Automated data quality checks]
- **Anomaly Detection**: [Unusual data pattern alerts]
- **Completeness Monitoring**: [Missing data detection]

### Performance Monitoring
- **Database Metrics**: [Query performance, connection counts]
- **Search Metrics**: [Search latency, index health]
- **Data Pipeline Metrics**: [ETL job success rates, processing times]

### Business Metrics
- **Data Usage Analytics**: [How data is being consumed]
- **Storage Growth**: [Data volume trends]
- **Query Patterns**: [Most common data access patterns]

## Migration & Evolution

### Data Migration Strategy
- **Initial Data Import**: [How to migrate existing data]
- **Zero-Downtime Migrations**: [Strategy for live system changes]
- **Rollback Procedures**: [How to undo migrations if needed]

### Schema Evolution
- **Versioning Strategy**: [How database schemas are versioned]
- **Backward Compatibility**: [Supporting old and new schema versions]
- **Migration Automation**: [Tools and processes for schema changes]

### Platform Growth
- **New Tenant Onboarding**: [How data infrastructure scales with tenants]
- **Feature Data Requirements**: [How new features affect data architecture]
- **Geographic Expansion**: [Data residency and localization considerations]

---

## Implementation Phases

### Phase 1: Core Data Foundation
- [ ] Primary database setup with core entities
- [ ] Basic multi-tenant data isolation
- [ ] Essential indexes and constraints
- [ ] Basic backup and monitoring

### Phase 2: Search & Analytics
- [ ] Search infrastructure deployment
- [ ] Analytics event tracking
- [ ] Basic reporting dashboards
- [ ] Performance optimization

### Phase 3: Advanced Features
- [ ] Advanced analytics and ML pipelines
- [ ] Enhanced search features
- [ ] Compliance automation
- [ ] Advanced monitoring and alerting

---

## Claude Code Prompts

*Use these prompts to help develop the data architecture:*

**For Entity Modeling**: "Based on the business requirements, what are the core entities and their relationships for this system?"

**For Multi-Tenant Design**: "How should data be structured to ensure secure isolation between tenants while maintaining performance?"

**For Search Strategy**: "What search capabilities are needed and how should the search index be structured for optimal performance?"

**For Analytics Design**: "What business metrics and user analytics are important to track, and how should this data be modeled?"

**For Compliance**: "What data privacy and compliance requirements apply to this system and how should they be implemented?"