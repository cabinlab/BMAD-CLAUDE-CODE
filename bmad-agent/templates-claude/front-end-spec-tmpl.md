# Frontend Design Specification (Enhanced for Claude Code)

**Project**: [Project Name]  
**Version**: 1.0  
**Date**: [Current Date]  
**Design Architect**: [Your Name]  
**Related Documents**: [Frontend Architecture, PRD, User Research]

## Design Strategy Overview

**Design Philosophy**: [One paragraph describing the overall design approach]

**Key Design Principles**:
1. **User-Centered**: [How user needs drive design decisions]
2. **Accessible**: [WCAG 2.1 compliance and inclusive design]
3. **Scalable**: [Design system that grows with platform]
4. **Platform-Aware**: [Multi-tenant and responsive considerations]

## Brand & Visual Identity

### Brand Guidelines
**Primary Brand Elements**:
- **Logo Usage**: [Logo variations, sizing, placement rules]
- **Color Palette**: [Primary, secondary, neutral colors with hex codes]
- **Typography**: [Font families, sizes, hierarchy]
- **Imagery Style**: [Photography, illustration guidelines]

### Multi-Tenant Branding
**Customization Levels**:
- [ ] **Full Branding** - Custom logos, colors, fonts
- [ ] **Theme Variations** - Predefined color schemes
- [ ] **Logo Only** - Custom logo with platform styling
- [ ] **No Customization** - Platform branding only

**Brand Customization Framework**:
```css
/* CSS Custom Properties for theming */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --accent-color: #28a745;
  --font-primary: 'Inter', sans-serif;
  --font-secondary: 'Inter', sans-serif;
  --border-radius: 8px;
  --shadow-base: 0 2px 4px rgba(0,0,0,0.1);
}

/* Tenant-specific overrides */
[data-tenant="custom"] {
  --primary-color: #ff6b35;
  --font-primary: 'Roboto', sans-serif;
}
```

## Design System

### Color System
**Primary Palette**:
- **Primary**: #[color] - [Usage description]
- **Secondary**: #[color] - [Usage description]
- **Accent**: #[color] - [Usage description]

**Semantic Colors**:
- **Success**: #28a745 - Confirmations, success states
- **Warning**: #ffc107 - Cautions, pending states
- **Error**: #dc3545 - Errors, destructive actions
- **Info**: #17a2b8 - Information, neutral actions

**Neutral Palette**:
- **Gray 900**: #212529 - Primary text
- **Gray 700**: #495057 - Secondary text
- **Gray 500**: #6c757d - Disabled text
- **Gray 300**: #dee2e6 - Borders
- **Gray 100**: #f8f9fa - Background

### Typography System
**Font Hierarchy**:
```css
/* Display Text */
.text-display-large { font-size: 3.5rem; line-height: 1.2; }
.text-display-medium { font-size: 2.875rem; line-height: 1.2; }
.text-display-small { font-size: 2.25rem; line-height: 1.3; }

/* Headings */
.text-h1 { font-size: 2rem; line-height: 1.3; font-weight: 700; }
.text-h2 { font-size: 1.5rem; line-height: 1.4; font-weight: 600; }
.text-h3 { font-size: 1.25rem; line-height: 1.4; font-weight: 600; }
.text-h4 { font-size: 1.125rem; line-height: 1.4; font-weight: 500; }

/* Body Text */
.text-body-large { font-size: 1.125rem; line-height: 1.6; }
.text-body { font-size: 1rem; line-height: 1.6; }
.text-body-small { font-size: 0.875rem; line-height: 1.5; }

/* Labels */
.text-label-large { font-size: 0.875rem; line-height: 1.4; font-weight: 500; }
.text-label { font-size: 0.75rem; line-height: 1.4; font-weight: 500; }
```

### Spacing System
**Spacing Scale** (based on 4px grid):
```css
/* Spacing tokens */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-10: 2.5rem;  /* 40px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */
```

## Component Library

### Core UI Components

#### Button System
**Button Variants**:
```typescript
// Button component specifications
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size: 'small' | 'medium' | 'large';
  state: 'default' | 'hover' | 'active' | 'disabled' | 'loading';
  icon?: 'leading' | 'trailing' | 'only';
}
```

**Visual Specifications**:
- **Primary Button**: Primary color background, white text
- **Secondary Button**: Gray background, dark text
- **Outline Button**: Transparent background, colored border
- **Ghost Button**: Transparent background, colored text
- **Destructive Button**: Error color, for dangerous actions

#### Form Components
**Input Field System**:
```typescript
interface InputFieldProps {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  size: 'small' | 'medium' | 'large';
  state: 'default' | 'focus' | 'error' | 'success' | 'disabled';
  label?: string;
  placeholder?: string;
  helpText?: string;
  errorMessage?: string;
}
```

**Form Layout Patterns**:
- Single column forms for simple data entry
- Two column forms for complex forms
- Inline forms for quick actions
- Multi-step forms for complex workflows

#### Navigation Components
**Primary Navigation**:
- Header navigation with logo, main menu, user menu
- Sidebar navigation for dashboard/admin areas
- Breadcrumb navigation for deep hierarchies
- Pagination for content lists

**Navigation States**:
- Default, hover, active, disabled states
- Mobile responsive collapsed navigation
- Multi-tenant navigation customization

### Layout Components

#### Grid System
**Responsive Grid**:
```css
/* 12-column grid system */
.container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
.row { display: flex; flex-wrap: wrap; margin: 0 -0.75rem; }
.col { flex: 1; padding: 0 0.75rem; }

/* Responsive columns */
.col-sm-6 { width: 50%; }
.col-md-4 { width: 33.333%; }
.col-lg-3 { width: 25%; }

/* Breakpoints */
@media (max-width: 768px) { .col-sm-6 { width: 100%; } }
@media (max-width: 992px) { .col-md-4 { width: 50%; } }
```

#### Layout Patterns
**Application Layouts**:
1. **Marketing Layout**: Header + Hero + Content + Footer
2. **Dashboard Layout**: Header + Sidebar + Main Content
3. **Form Layout**: Header + Centered Form + Footer
4. **Detail Layout**: Header + Breadcrumb + Content + Sidebar

### Platform-Specific Components

#### Multi-Tenant Components
**Tenant Selector**:
```typescript
interface TenantSelectorProps {
  currentTenant: Tenant;
  availableTenants: Tenant[];
  onTenantChange: (tenant: Tenant) => void;
  showCreateOption?: boolean;
}
```

**Role-Based Components**:
```typescript
interface RoleGateProps {
  requiredRole: UserRole[];
  fallback?: React.ComponentType;
  children: React.ReactNode;
}

// Usage
<RoleGate requiredRole={['admin', 'vendor']}>
  <AdminPanel />
</RoleGate>
```

#### Marketplace Components
**Product Card**:
- Product image with fallback
- Title, price, rating display
- Action buttons (view, add to cart, etc.)
- Vendor information
- Responsive layout

**Search & Filter Interface**:
- Search input with autocomplete
- Category filters with hierarchy
- Price range sliders
- Location-based filters
- Sort options dropdown

## Responsive Design

### Breakpoint System
**Device Breakpoints**:
```css
/* Mobile first approach */
/* Default: Mobile (320px+) */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1440px) { /* Large Desktop */ }
```

### Mobile Design Patterns
**Touch-Friendly Design**:
- Minimum 44px touch targets
- Thumb-friendly navigation zones
- Swipe gestures for content browsing
- Pull-to-refresh functionality

**Mobile-Specific Components**:
- Bottom sheet modals
- Floating action buttons
- Collapsible navigation
- Tab bar navigation

### Progressive Web App (PWA)
**PWA Features**:
- [ ] App manifest for installability
- [ ] Service worker for offline functionality
- [ ] Push notifications
- [ ] Background sync

## Accessibility (A11y) Design

### WCAG 2.1 Compliance
**Level AA Requirements**:
- **Color Contrast**: 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Visible focus states for all interactive elements
- **Keyboard Navigation**: All functionality accessible via keyboard
- **Screen Reader Support**: Semantic HTML and ARIA labels

### Accessible Design Patterns
**Focus Management**:
```css
/* Custom focus indicators */
.focus-ring:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2);
}
```

**Color Accessibility**:
- Never rely on color alone for information
- Provide text alternatives for color-coded information
- Test with color blindness simulators

### Inclusive Design Considerations
**Cognitive Accessibility**:
- Clear, simple language in UI text
- Consistent navigation patterns
- Error messages with clear guidance
- Progressive disclosure for complex features

## Animation & Interactions

### Motion Design System
**Animation Principles**:
1. **Purposeful**: Animations serve a functional purpose
2. **Performant**: 60fps smooth animations
3. **Respectful**: Honor user's motion preferences
4. **Consistent**: Unified timing and easing

### Animation Specifications
**Timing Functions**:
```css
/* Easing curves */
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

/* Duration tokens */
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
```

**Common Animations**:
- **Micro-interactions**: Button hover, form focus
- **Page Transitions**: Smooth route changes
- **Loading States**: Skeleton screens, spinners
- **Feedback**: Success confirmations, error states

### Interaction Patterns
**Touch Interactions**:
- Tap feedback with visual/haptic response
- Long press for contextual actions
- Swipe gestures for navigation
- Pinch/zoom for content viewing

## Design Token System

### Token Architecture
**Token Categories**:
```css
/* Primitive tokens */
--color-blue-500: #3b82f6;
--space-4: 1rem;
--font-weight-medium: 500;

/* Semantic tokens */
--color-primary: var(--color-blue-500);
--space-component-padding: var(--space-4);
--font-weight-heading: var(--font-weight-medium);

/* Component tokens */
--button-primary-bg: var(--color-primary);
--button-padding: var(--space-component-padding);
--button-font-weight: var(--font-weight-heading);
```

### Dark Mode Support
**Theme Switching**:
```css
/* Light theme (default) */
:root {
  --bg-primary: #ffffff;
  --text-primary: #1f2937;
  --border-color: #e5e7eb;
}

/* Dark theme */
[data-theme="dark"] {
  --bg-primary: #1f2937;
  --text-primary: #f9fafb;
  --border-color: #374151;
}
```

## Content Strategy

### Content Guidelines
**Writing Tone**:
- **Professional but Friendly**: Accessible without being casual
- **Clear and Concise**: Short sentences, active voice
- **Helpful**: Focus on user needs and goals
- **Inclusive**: Avoid jargon, consider all users

### Microcopy Standards
**UI Text Patterns**:
- **Button Labels**: Action-oriented (Submit, Save Changes, Delete)
- **Error Messages**: Specific, actionable guidance
- **Empty States**: Encouraging, with clear next steps
- **Loading States**: Informative progress indicators

### Multi-Language Considerations
**Internationalization (i18n)**:
- [ ] Text expansion considerations (30-50% longer in some languages)
- [ ] Right-to-left (RTL) language support
- [ ] Number, date, and currency formatting
- [ ] Cultural color and symbol considerations

## Implementation Guidelines

### Design-to-Code Handoff
**Design Documentation**:
- Component specifications with all states
- Spacing and sizing measurements
- Color and typography specifications
- Interaction and animation details

### Quality Assurance
**Design QA Checklist**:
- [ ] Visual consistency across components
- [ ] Responsive behavior on all breakpoints
- [ ] Accessibility compliance testing
- [ ] Cross-browser compatibility
- [ ] Performance impact of design decisions

### Design System Maintenance
**Evolution Strategy**:
- Regular design system audits
- Component usage analytics
- User feedback integration
- Performance monitoring

---

## Implementation Timeline

### Phase 1: Foundation (Week 1)
- [ ] Design token system setup
- [ ] Base component library
- [ ] Typography and color system
- [ ] Basic layout components

### Phase 2: Core Components (Week 2-3)
- [ ] Form components with validation states
- [ ] Navigation components
- [ ] Data display components
- [ ] Interactive components

### Phase 3: Platform Features (Week 4)
- [ ] Multi-tenant theming system
- [ ] Role-based component variations
- [ ] Marketplace-specific components
- [ ] Mobile responsive optimizations

---

## Claude Code Prompts

*Use these prompts to help develop the design specification:*

**For Design System**: "Help me create a comprehensive design system that supports multi-tenant branding while maintaining consistency."

**For Component Design**: "Design accessible, reusable components for a [platform type] that work across different user roles."

**For Responsive Strategy**: "What are the key responsive design considerations for a multi-tenant platform with diverse user types?"

**For Accessibility**: "How can I ensure this design meets WCAG 2.1 AA standards while maintaining good user experience?"

**For Performance**: "What design decisions will impact frontend performance and how can they be optimized?"