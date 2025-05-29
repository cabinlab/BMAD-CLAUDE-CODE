# Frontend Specification: [Project Name]

## Design Overview
[Brief description of the overall design approach and visual identity]

## Design System

### Visual Foundation

#### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #[hex] | [Main CTAs, brand elements] |
| Secondary | #[hex] | [Supporting actions, accents] |
| Success | #[hex] | [Positive feedback, confirmations] |
| Warning | #[hex] | [Cautions, alerts] |
| Error | #[hex] | [Errors, destructive actions] |
| Neutral | #[hex] | [Text, borders, backgrounds] |

#### Typography
| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| H1 | [Font family] | [px/rem] | [weight] | [ratio] |
| H2 | [Font family] | [px/rem] | [weight] | [ratio] |
| Body | [Font family] | [px/rem] | [weight] | [ratio] |
| Caption | [Font family] | [px/rem] | [weight] | [ratio] |

#### Spacing System
- Base unit: [8px/4px]
- Scale: [xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px]

#### Grid System
- Columns: [12/16/24]
- Gutter: [px]
- Breakpoints:
  - Mobile: [< 768px]
  - Tablet: [768px - 1024px]
  - Desktop: [> 1024px]

### Component Library

#### Buttons
- **Primary**: [Design description, states]
- **Secondary**: [Design description, states]
- **Text/Ghost**: [Design description, states]
- **Icon**: [Design description, states]

#### Forms
- **Text Input**: [Design, validation states, helper text]
- **Select/Dropdown**: [Design, multi-select capability]
- **Checkbox/Radio**: [Design, group behavior]
- **Toggle**: [Design, on/off states]

#### Navigation
- **Header**: [Layout, responsive behavior]
- **Sidebar**: [Collapsible, items, states]
- **Breadcrumbs**: [Style, truncation]
- **Tabs**: [Style, active states]

#### Feedback
- **Toast/Snackbar**: [Position, duration, actions]
- **Modal/Dialog**: [Overlay, sizes, close behavior]
- **Loading**: [Spinner, skeleton, progress]
- **Empty States**: [Illustration, messaging]

#### Data Display
- **Tables**: [Sorting, filtering, pagination]
- **Cards**: [Layout, actions, states]
- **Lists**: [Density options, actions]
- **Charts**: [Types, color usage, interactions]

## Page Layouts

### [Page Name]
#### Desktop Layout
```
[ASCII art or description of desktop layout]
+------------------+
|     Header       |
+------+----------+
| Nav  |  Content  |
|      |           |
+------+-----------+
```

#### Mobile Layout
```
[ASCII art or description of mobile layout]
```

#### Key Elements
- [Element 1]: [Purpose and behavior]
- [Element 2]: [Purpose and behavior]

[Repeat for each major page]

## Interaction Patterns

### Navigation Flow
[How users move through the application]

### Micro-interactions
- **Hover States**: [Behavior across components]
- **Focus States**: [Keyboard navigation indicators]
- **Transitions**: [Animation timing and easing]
- **Feedback**: [User action confirmations]

### Gestures (Mobile)
- **Swipe**: [Actions and contexts]
- **Pull-to-refresh**: [Implementation]
- **Long press**: [Context menus]

## Responsive Behavior

### Breakpoint Strategy
- **Mobile-First**: [Progressive enhancement approach]
- **Content Priority**: [What shows/hides at each breakpoint]
- **Touch Targets**: [Minimum sizes for mobile]

### Adaptive Components
[How components change across breakpoints]

## Accessibility Requirements

### WCAG Compliance
- **Level**: [A, AA, or AAA]
- **Color Contrast**: [Ratios for text/backgrounds]
- **Focus Management**: [Tab order, skip links]
- **Screen Reader**: [ARIA labels, live regions]

### Keyboard Navigation
- **Tab Order**: [Logical flow]
- **Shortcuts**: [If applicable]
- **Focus Trapping**: [Modals, dropdowns]

### Alternative Content
- **Images**: [Alt text requirements]
- **Videos**: [Captions, transcripts]
- **Icons**: [Descriptive labels]

## Motion & Animation

### Principles
- **Purpose**: [Why animations exist]
- **Duration**: [Timing guidelines]
- **Easing**: [Standard curves]

### System Animations
- **Page Transitions**: [Between routes]
- **Component States**: [Enter/exit]
- **Loading States**: [Skeleton screens, spinners]

### Reduced Motion
[Respect prefers-reduced-motion settings]

## Dark Mode Support
[If applicable]

### Color Adjustments
- **Backgrounds**: [Dark palette]
- **Text**: [Contrast requirements]
- **Components**: [Border/shadow adjustments]

### Implementation
- **Toggle**: [User preference storage]
- **System Sync**: [OS preference detection]

## Content Guidelines

### Voice & Tone
- **Personality**: [Professional, friendly, casual]
- **Language**: [Technical level, jargon usage]

### Messaging Patterns
- **Error Messages**: [Helpful, actionable]
- **Empty States**: [Encouraging, guiding]
- **Success Messages**: [Celebratory but brief]
- **Loading Messages**: [Informative, honest]

### Microcopy
- **Button Labels**: [Action-oriented]
- **Form Labels**: [Clear, concise]
- **Tooltips**: [Helpful, not required]

## Asset Requirements

### Icons
- **Style**: [Line, filled, duo-tone]
- **Library**: [Font Awesome, custom, etc.]
- **Sizes**: [Standard dimensions]

### Images
- **Formats**: [WebP, JPEG, PNG usage]
- **Optimization**: [Compression, lazy loading]
- **Responsive**: [Srcset implementation]

### Illustrations
[If applicable - style, usage, consistency]

## Browser & Device Support

### Browsers
- **Chrome**: [Version+]
- **Firefox**: [Version+]
- **Safari**: [Version+]
- **Edge**: [Version+]

### Devices
- **Mobile**: [iOS/Android minimum versions]
- **Tablet**: [Specific considerations]
- **Desktop**: [Minimum resolution]

## Performance Targets

### Loading
- **Initial Load**: [Target time]
- **Subsequent Navigation**: [Target time]
- **Interaction Response**: [Target latency]

### Bundle Size
- **CSS**: [Target size]
- **JavaScript**: [Target size]
- **Images**: [Optimization requirements]

## Implementation Notes

### CSS Architecture
[Methodology - BEM, CSS Modules, Styled Components]

### Component Props
[Naming conventions, prop types]

### State Management
[UI state handling approach]

## Design Handoff

### Design Tools
- **Source Files**: [Figma, Sketch, XD]
- **Prototypes**: [Interactive demos]
- **Assets**: [Export location/format]

### Developer Resources
- **Style Guide**: [Living documentation]
- **Component Storybook**: [If applicable]
- **Design Tokens**: [If applicable]

---
*This specification should be treated as a living document and updated as the design evolves.*