# Frontend Architecture Document (Enhanced for Claude Code)

**Project**: [Project Name]  
**Version**: 1.0  
**Date**: [Current Date]  
**Frontend Architect**: [Your Name]  
**Related Documents**: [System Architecture, UX/UI Specs]

## Executive Summary

**Frontend Strategy**: [One paragraph describing the overall frontend approach]

**Key Technical Decisions**:
- **Framework**: [React, Vue, Angular, etc.]
- **Architecture Pattern**: [SPA, SSR, Hybrid, MPA]
- **State Management**: [Redux, Zustand, Context API, etc.]
- **Styling Approach**: [CSS-in-JS, Tailwind, SCSS, etc.]

## Frontend Requirements

### User Experience Requirements
**Primary User Flows**:
1. [Flow 1]: [Key user journey and requirements]
2. [Flow 2]: [Important interaction pattern]
3. [Flow 3]: [Critical user workflow]

**Performance Requirements**:
- **First Contentful Paint (FCP)**: < 1.5 seconds
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### Platform-Specific Requirements
**Multi-Tenant UI Needs**:
- [ ] Tenant-specific branding and themes
- [ ] Role-based UI components and layouts
- [ ] Tenant isolation in frontend routing
- [ ] Custom domain support

**Responsive Design**:
- [ ] Mobile-first design approach
- [ ] Tablet optimization
- [ ] Desktop experience
- [ ] Progressive Web App (PWA) features

## Technology Stack

### Core Framework Decision
- [ ] **React** - Component-based, large ecosystem
- [ ] **Vue.js** - Progressive framework, gentle learning curve
- [ ] **Angular** - Full framework, enterprise features
- [ ] **Svelte** - Compile-time optimizations
- [ ] **Next.js** - React with SSR/SSG capabilities
- [ ] **Nuxt.js** - Vue with SSR/SSG capabilities

**Rationale**: [Why this framework fits the project requirements]

### Rendering Strategy
- [ ] **Client-Side Rendering (CSR)** - Simple SPA approach
- [ ] **Server-Side Rendering (SSR)** - Better SEO and initial load
- [ ] **Static Site Generation (SSG)** - Pre-built pages for performance
- [ ] **Hybrid Approach** - Mix of SSR/SSG/CSR as needed

**Rationale**: [Why this rendering approach works best]

### State Management
- [ ] **Built-in State** - Component state, Context API
- [ ] **Redux Toolkit** - Predictable state container
- [ ] **Zustand** - Lightweight state management
- [ ] **Recoil** - Experimental state management by Facebook
- [ ] **Valtio** - Proxy-based state management

**Architecture Pattern**:
```
Application State
├── Global State (user, theme, tenant)
├── Page State (current view data)
├── Component State (local UI state)
└── Server State (API data, caching)
```

### Styling & UI Framework
**CSS Architecture**:
- [ ] **Tailwind CSS** - Utility-first CSS framework
- [ ] **Styled Components** - CSS-in-JS with styled-components
- [ ] **Emotion** - CSS-in-JS library
- [ ] **SCSS/SASS** - CSS preprocessor
- [ ] **CSS Modules** - Modular CSS approach

**Component Library**:
- [ ] **Custom Design System** - Built from scratch
- [ ] **Material-UI (MUI)** - Google's Material Design
- [ ] **Ant Design** - Enterprise-focused components
- [ ] **Chakra UI** - Modular and accessible
- [ ] **Headless UI** - Unstyled, accessible components

### Build Tools & Development
**Build System**:
- [ ] **Vite** - Fast build tool and dev server
- [ ] **Webpack** - Module bundler with extensive configuration
- [ ] **Parcel** - Zero-configuration build tool
- [ ] **esbuild** - Extremely fast bundler

**Development Tools**:
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Husky for git hooks

## Application Architecture

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI elements (Button, Input)
│   ├── forms/           # Form components
│   ├── layout/          # Layout components
│   └── feature/         # Feature-specific components
├── pages/               # Route components
├── hooks/               # Custom React hooks
├── services/            # API calls and external services
├── stores/              # State management
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── styles/              # Global styles and themes
└── assets/              # Static assets
```

### Component Architecture

#### Component Design Principles
1. **Single Responsibility**: Each component has one clear purpose
2. **Composition over Inheritance**: Build complex UI from simple pieces
3. **Props Interface**: Clear, typed interfaces for all components
4. **Accessibility First**: WCAG 2.1 compliance built-in

#### Component Categories
**UI Components** (Presentational):
```typescript
// Basic UI building blocks
Button, Input, Modal, Card, Table

// Usage example
<Button 
  variant="primary" 
  size="medium" 
  onClick={handleClick}
  disabled={loading}
>
  Submit
</Button>
```

**Feature Components** (Container):
```typescript
// Business logic components
UserProfile, ProductListing, CheckoutForm

// Usage example
<ProductListing 
  tenantId={tenant.id}
  category={selectedCategory}
  onProductSelect={handleSelection}
/>
```

**Layout Components**:
```typescript
// Page structure components
Header, Sidebar, Footer, PageLayout

// Usage example
<PageLayout>
  <Header user={currentUser} tenant={tenant} />
  <main>{children}</main>
  <Footer />
</PageLayout>
```

### Routing Architecture

#### Route Structure
```typescript
// App routing structure
/                          # Public homepage
/auth/login               # Authentication
/auth/register           # User registration
/[tenant]/               # Tenant-specific routes
  ├── dashboard          # Tenant dashboard
  ├── products/          # Product management
  │   ├── list           # Product listing
  │   ├── [id]           # Product details
  │   └── create         # Create product
  └── settings/          # Tenant settings
```

#### Route Protection
```typescript
// Protected route patterns
<ProtectedRoute 
  requiredRole="vendor"
  tenantRequired={true}
>
  <VendorDashboard />
</ProtectedRoute>
```

### State Management Architecture

#### Global State Structure
```typescript
interface AppState {
  // User authentication and profile
  auth: {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
  };
  
  // Tenant/organization context
  tenant: {
    current: Tenant | null;
    permissions: Permission[];
    branding: BrandingConfig;
  };
  
  // UI state
  ui: {
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
    notifications: Notification[];
  };
  
  // Feature-specific state
  products: ProductState;
  orders: OrderState;
}
```

#### Data Fetching Strategy
- [ ] **React Query/TanStack Query** - Server state management
- [ ] **SWR** - Data fetching with caching
- [ ] **Apollo Client** - GraphQL client with caching
- [ ] **Custom Hook Pattern** - Fetch data with custom hooks

**API Integration Pattern**:
```typescript
// Custom hook for data fetching
function useProducts(tenantId: string) {
  return useQuery(['products', tenantId], () => 
    apiClient.getProducts(tenantId)
  );
}

// Component usage
function ProductList() {
  const { data: products, isLoading, error } = useProducts(tenant.id);
  
  if (isLoading) return <ProductSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  
  return <ProductGrid products={products} />;
}
```

## Multi-Tenant Frontend Design

### Tenant Isolation Strategy
**Route-Based Tenancy**:
- Subdomain routing: `tenant1.platform.com`
- Path-based routing: `platform.com/tenant1`
- Custom domain support: `custom-domain.com`

**Branding & Theming**:
```typescript
// Tenant-specific theming
interface TenantTheme {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  fontFamily: string;
  customCSS?: string;
}

// Dynamic theme application
const ThemeProvider = ({ tenant, children }) => {
  const theme = useMemo(() => 
    createTheme(tenant.branding), [tenant]
  );
  
  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
};
```

### Role-Based UI Components
```typescript
// Conditional rendering based on user role
function ProductActions({ product, userRole }) {
  return (
    <div>
      {userRole === 'vendor' && (
        <EditProductButton product={product} />
      )}
      {userRole === 'admin' && (
        <ApproveProductButton product={product} />
      )}
      <ViewProductButton product={product} />
    </div>
  );
}
```

## Performance Optimization

### Code Splitting Strategy
```typescript
// Route-based code splitting
const ProductPage = lazy(() => import('./pages/ProductPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));

// Component-based code splitting
const HeavyChart = lazy(() => import('./components/HeavyChart'));
```

### Bundle Optimization
**Optimization Techniques**:
- Tree shaking to eliminate dead code
- Dynamic imports for feature modules
- Vendor bundle splitting
- Service worker for caching

**Performance Monitoring**:
- Web Vitals tracking
- Bundle size monitoring
- Runtime performance profiling
- User experience metrics

### Caching Strategy
**Browser Caching**:
- Static asset caching (images, fonts, CSS)
- API response caching with React Query
- Local storage for user preferences
- Session storage for temporary data

## Security Considerations

### Frontend Security
**Input Validation**:
- Client-side validation for UX
- Never trust client-side validation alone
- Sanitize user inputs
- XSS prevention

**Authentication & Authorization**:
```typescript
// JWT token handling
const authService = {
  storeToken: (token: string) => {
    // Store in httpOnly cookie, not localStorage
    document.cookie = `auth_token=${token}; Secure; SameSite=Strict`;
  },
  
  getAuthHeader: () => {
    const token = getTokenFromCookie();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};
```

**Content Security Policy (CSP)**:
```html
<!-- Strict CSP for production -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-eval'; 
               style-src 'self' 'unsafe-inline';">
```

## Accessibility (A11y)

### Accessibility Standards
**WCAG 2.1 Compliance**:
- Level AA compliance minimum
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements

**Implementation**:
```typescript
// Accessible component example
function AccessibleButton({ onClick, children, disabled, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </button>
  );
}
```

### Testing Strategy
**Accessibility Testing**:
- Automated testing with @axe-core/react
- Manual keyboard navigation testing
- Screen reader testing
- Color contrast validation

## Testing Strategy

### Testing Pyramid
**Unit Tests** (70%):
- Component testing with React Testing Library
- Utility function testing
- Custom hook testing

**Integration Tests** (20%):
- Feature workflow testing
- API integration testing
- Multi-component interaction testing

**E2E Tests** (10%):
- Critical user journey testing
- Cross-browser compatibility
- Performance testing

### Testing Tools
```typescript
// Component testing example
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('product search filters results correctly', async () => {
  const user = userEvent.setup();
  render(<ProductSearch />);
  
  const searchInput = screen.getByPlaceholderText('Search products...');
  await user.type(searchInput, 'laptop');
  
  const results = await screen.findByTestId('search-results');
  expect(results).toBeInTheDocument();
});
```

## Deployment & DevOps

### Build Process
**Production Build**:
```javascript
// Optimized production build configuration
const buildConfig = {
  minification: true,
  treeshaking: true,
  codesplitting: true,
  bundleAnalysis: true,
  sourceMapGeneration: false // Security consideration
};
```

### Environment Configuration
**Environment Variables**:
```typescript
// Environment-specific configuration
interface Config {
  API_BASE_URL: string;
  STRIPE_PUBLIC_KEY: string;
  GOOGLE_MAPS_API_KEY: string;
  SENTRY_DSN: string;
}

const config: Config = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL!,
  STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY!,
  // ... other config
};
```

### Monitoring & Analytics
**Performance Monitoring**:
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- Error tracking with Sentry
- User analytics with privacy compliance

## Documentation & Maintenance

### Component Documentation
**Storybook Integration**:
- Component showcase and documentation
- Interactive component playground
- Design system documentation
- Accessibility testing integration

### Code Standards
**Development Guidelines**:
- TypeScript strict mode
- Consistent naming conventions
- Component composition patterns
- Performance best practices

---

## Implementation Timeline

### Phase 1: Foundation (Weeks 1-2)
- [ ] Project setup and tooling configuration
- [ ] Design system and component library
- [ ] Authentication and routing setup
- [ ] Basic layout components

### Phase 2: Core Features (Weeks 3-6)
- [ ] Multi-tenant architecture implementation
- [ ] Key user flows development
- [ ] API integration and state management
- [ ] Testing framework setup

### Phase 3: Enhancement (Weeks 7-8)
- [ ] Performance optimization
- [ ] Accessibility improvements
- [ ] Advanced features implementation
- [ ] Production deployment preparation

---

## Claude Code Prompts

*Use these prompts to help develop the frontend architecture:*

**For Framework Selection**: "Based on these project requirements and team skills, what frontend framework and architecture would be most appropriate?"

**For Component Design**: "Help me design a component architecture that supports multi-tenant features while maintaining reusability."

**For Performance Strategy**: "What are the key performance optimizations needed for this type of application?"

**For State Management**: "How should application state be structured to handle multi-tenant data and user roles effectively?"

**For Security Implementation**: "What frontend security measures are essential for this type of platform?"