# Alaskanist Architecture Guide - Vertical Slice Pattern

## Architecture Decision

**Pattern**: Vertical Slice Architecture
**Rationale**: Optimized for rapid feature development, easy feature removal, and ADHD-friendly development workflow

## Tech Stack

- **Frontend**: Next.js with App Router (deployed as Cloudflare Container)
- **API**: Cloudflare Workers 
- **Database**: Supabase PostgreSQL with Row Level Security
- **Caching**: Cloudflare KV for edge caching
- **Storage**: Supabase Storage + Cloudflare R2
- **ML Service**: Separate on-premise Alaska infrastructure (HTTP API)

## Core Principles

1. **Feature-First Organization**: Group by user features, not technical layers
2. **Schema-Driven Development**: All entities follow standardized Schema.org patterns
3. **Progressive Enhancement**: Load essential data first, detailed data on demand
4. **Edge Optimization**: Cache frequently accessed data at Cloudflare edge
5. **Easy Feature Experimentation**: Adding/removing features should be simple

## Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── directory/[id]/page.tsx
│   ├── marketplace/search/page.tsx
│   └── api/                      # Route handlers that proxy to Workers
├── features/                     # MAIN BUSINESS LOGIC
│   ├── business-search/
│   │   ├── SearchBusinesses.endpoint.ts
│   │   ├── SearchBusinesses.handler.ts
│   │   ├── SearchBusinesses.types.ts
│   │   └── SearchBusinesses.schema.ts
│   ├── create-marketplace-listing/
│   │   ├── CreateListing.endpoint.ts
│   │   ├── CreateListing.handler.ts
│   │   ├── CreateListing.types.ts
│   │   └── CreateListing.schema.ts
│   ├── hunting-season-lookup/
│   │   ├── HuntingSeasonLookup.endpoint.ts
│   │   ├── HuntingSeasonLookup.handler.ts
│   │   └── HuntingSeasonLookup.types.ts
│   ├── seasonal-notifications/
│   │   ├── SeasonalNotifications.endpoint.ts
│   │   ├── SeasonalNotifications.handler.ts
│   │   └── SeasonalNotifications.types.ts
│   └── cross-domain-search/
│       ├── SearchEverything.endpoint.ts
│       ├── SearchEverything.handler.ts
│       └── SearchEverything.types.ts
├── shared/                       # Cross-feature utilities
│   ├── database/
│   │   ├── supabase-client.ts
│   │   └── schema-types.ts
│   ├── cache/
│   │   ├── cloudflare-kv.ts
│   │   └── edge-cache.ts
│   ├── schemas/                  # Standardized Schema.org patterns
│   │   ├── base-entity.ts
│   │   ├── defined-term-sets.ts
│   │   └── geo-entities.ts
│   ├── ml/
│   │   └── alaska-ml-client.ts
│   └── utils/
│       ├── validation.ts
│       └── geo-utils.ts
└── components/                   # Reusable UI components
    ├── business-card.tsx
    ├── map-component.tsx
    └── notification-preferences.tsx
```

## Key Patterns

### Feature Structure Pattern

Each feature folder contains:

```typescript
// FeatureName.endpoint.ts - Cloudflare Worker endpoint
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const handler = new FeatureNameHandler(env);
    return handler.handle(request);
  }
};

// FeatureName.handler.ts - Business logic
export class FeatureNameHandler {
  constructor(private env: Env) {}
  
  async handle(request: Request): Promise<Response> {
    // All feature logic here
    // Database calls, validation, business rules
    // Return standardized schema response
  }
}

// FeatureName.types.ts - TypeScript interfaces
export interface FeatureRequest {
  // Request structure
}

export interface FeatureResponse {
  "@context": "https://schema.org";
  "@type": string;
  "@id": string;
  // ... standardized schema properties
}

// FeatureName.schema.ts - Schema validation
export const validateFeatureRequest = (data: unknown): FeatureRequest => {
  // Validation logic using standardized patterns
};
```

### Schema Integration Pattern

All responses follow standardized Schema.org patterns:

```typescript
// Example: Business search response
interface BusinessSearchResponse {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  "@id": string; // Always use @id references
  name: string;
  naturalRegion: {
    "@id": string;
    "@type": "NaturalRegion";
  };
  businessCategory: {
    "@type": "DefinedTerm";
    "inDefinedTermSet": { "@id": string };
    "termCode": string;
    "name": string;
  };
}
```

### Edge Caching Pattern

```typescript
// Use KV for frequently accessed data
export class EdgeCache {
  async getWithCache<T>(
    key: string, 
    fetcher: () => Promise<T>,
    ttl: number = 3600
  ): Promise<T> {
    // Try cache first, fallback to fetcher, cache result
  }
}
```

## Feature Development Workflow

### Adding a New Feature

1. **Create feature folder**: `src/features/new-feature-name/`
2. **Implement handler**: Business logic in `NewFeature.handler.ts`
3. **Add endpoint**: Cloudflare Worker in `NewFeature.endpoint.ts`
4. **Define types**: TypeScript interfaces in `NewFeature.types.ts`
5. **Add schema validation**: Follow standardized patterns
6. **Deploy**: Single `wrangler deploy` command

### Removing a Feature

1. **Delete feature folder**: `rm -rf src/features/feature-name/`
2. **Remove from routing**: Update main worker routing
3. **Deploy**: Feature completely removed

## Business-Specific Features

### Core Alaskanist Features to Implement

1. **Business Directory Search**
   - Filter by natural region, business category
   - Integration with hunting/fishing areas

2. **Marketplace Listings**  
   - Product/service listings with Alaska-specific attributes
   - FFL integration for regulated items

3. **Hunting/Fishing Opportunities**
   - Season lookup by location and species
   - Regulation integration with business directory

4. **Cross-Service Recommendations**
   - "Complete trip planning" (accommodation + activity + gear)
   - Based on user location and interests

5. **Seasonal Notifications**
   - Season start/end alerts
   - License expiration reminders
   - Custom notification preferences

### Alaska-Specific Considerations

- **Geographic Optimization**: Use bounding boxes and centroids for performance
- **Regulatory Integration**: Hunting/fishing regulations with business connections
- **Seasonal Awareness**: Features that adapt to Alaska's seasonal patterns
- **Remote Access**: Offline-capable features for areas with poor connectivity

## Integration Points

### External Services

- **Supabase**: Primary database with RLS for security
- **Alaska ML Service**: On-premise service for embeddings/search
- **Cloudflare**: Edge caching, Workers, container deployment

### Cross-Feature Communication

Use shared utilities in `src/shared/` for:
- Database access patterns
- Schema validation
- Edge caching strategies  
- ML service integration

## Development Priorities

1. **Start Simple**: Implement core features first (business search, basic listings)
2. **Add Incrementally**: Each new feature is isolated and testable
3. **Measure Usage**: Easy to identify and remove unused features
4. **Scale Gradually**: Add complexity only when needed

## Success Metrics

- **Feature Development Speed**: Can add new feature in < 1 day
- **Feature Removal Speed**: Can remove feature in < 1 hour  
- **Code Organization**: Developers can find feature code immediately
- **User Value**: Each feature directly serves identified user needs