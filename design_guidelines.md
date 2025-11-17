# Design Guidelines: Glucose Odyssey

## Design Approach
**Reference-Based:** Inspired by futuristic medical interfaces (Apple Health + Tesla UI + Sci-fi HUDs). Dark mode-first aesthetic combining clinical precision with cyberpunk energy.

## Core Design Principles
1. **Futuristic Medical Precision**: Clean data visualization meets sci-fi control room
2. **Luminous Depth**: Glowing accents, subtle gradients, layered transparency
3. **Kinetic Intelligence**: Purposeful micro-animations that communicate system activity
4. **Information Hierarchy**: Critical health data always prominent and clear

---

## Typography
**Font Families:**
- Primary: 'Inter' (body, UI elements)
- Display: 'JetBrains Mono' (data values, code-like elements)
- Accent: 'Space Grotesk' (hero headlines)

**Hierarchy:**
- Hero Headlines: 3xl-6xl, font-bold, Space Grotesk
- Section Headers: 2xl-4xl, font-semibold, tracking-tight
- Data Values: xl-3xl, JetBrains Mono, tabular-nums
- Body Text: base-lg, leading-relaxed
- Labels/Captions: sm-xs, uppercase tracking-wide for technical labels

---

## Layout System
**Spacing Primitives:** Tailwind units 2, 4, 6, 8, 12, 16, 24
- Component padding: p-6, p-8
- Section spacing: py-16, py-24
- Card gaps: gap-6, gap-8
- Element margins: mb-4, mb-6, mb-8

**Grid System:**
- Hero: Full-width with max-w-7xl container
- Simulator: 2-column split (controls | visualization)
- Research Cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- About: Single column max-w-4xl for readability

---

## Component Library

### Navigation
- Fixed top nav with glass-morphism backdrop (backdrop-blur-lg)
- Logo: Glowing glucose molecule icon
- Nav items with subtle underline animation
- Floating "Simulator" and "Research Vault" CTAs with glow effect

### Hero Section (Home)
- Full viewport height (min-h-screen)
- Animated particle grid background (subtle dots/connections)
- Center-aligned headline + subtext + dual CTA buttons
- DNA helix animation orbiting the main headline
- Gradient text treatment on "Glucose Odyssey"

### Insulin Simulator Interface
**Control Panel (Left 40%):**
- Card-based input groups with frosted glass effect
- Slider inputs with glowing track indicators
- Numerical readouts in monospace font
- Collapsible parameter sections with smooth expand/collapse
- "Run Simulation" button with pulsing ring animation

**Visualization Area (Right 60%):**
- Real-time line chart (Chart.js) with glowing data points
- Dual Y-axes: Glucose (mg/dL) + Insulin (units)
- Time scrubber with playback controls
- Legend with color-coded status indicators
- CGM point hover reveals pulse animation (Easter egg)
- Export chart button (icon-only, top-right)

**Data Stream Display:**
- Scrolling terminal-style log below charts
- Green monospace text on dark background
- Timestamps + algorithm decision logs
- Auto-scroll with pause on hover

### AI Research Vault
**Header:**
- Search bar with glowing focus ring
- Filter chips (AID Systems, CGM, Pumps, Type 1)
- "Refresh Articles" button with rotating icon animation

**Article Cards:**
- 3-column grid on desktop, stack on mobile
- Each card: frosted glass background with subtle border glow
- Title (font-semibold, mb-2)
- Source badge (small pill, translucent)
- One-sentence summary (text-sm, text-gray-300)
- "Why it matters" badge (gradient accent, bottom)
- Hover state: lift + intensify border glow
- Click expands inline for full abstract

**Neural Network Background:**
- Animated SVG nodes and connecting lines
- Slow, organic movement
- Very subtle, low opacity (5-10%)

### Loading States
- DNA double-helix spinner (center viewport)
- Rotating base pairs with gradient colors
- "Analyzing data..." text below

### Buttons & CTAs
**Primary (Simulator Entry):**
- Large rounded-xl, px-8 py-4
- Gradient background (cyan to blue)
- Text: uppercase, tracking-wide, font-semibold
- Glow effect on hover
- Blurred background if over images

**Secondary (Research Vault):**
- Outlined style, border-2
- Transparent bg with hover fill
- Same size/padding as primary

**Icon Buttons:**
- Circular, fixed size (w-10 h-10)
- Subtle hover rotate or scale

### Data Visualization Elements
- Charts use gradient fills below lines
- Grid lines: very subtle, gray-800
- Axis labels: text-xs, gray-400
- Tooltips: dark bg, white text, shadow-xl
- Color palette: Cyan (glucose), Purple (insulin), Amber (carbs)

### Cards & Panels
- Background: dark with 5% opacity overlay
- Border: 1px, subtle glow (gray-700)
- Rounded corners: rounded-xl
- Padding: p-6 or p-8
- Subtle inner shadow for depth

---

## Animations
**Sparingly Used, High Impact:**
- Page transitions: fade + slide (300ms ease-out)
- Chart data: animate-in on load with stagger
- DNA helix: continuous slow rotation
- Data stream: scroll animation (CSS only)
- Button hover: scale-105 + glow intensity
- Card hover: translateY(-4px) + shadow increase
- Loading spinner: smooth rotation

**No animations on:** Text, backgrounds, or layout shifts

---

## Images
**Hero Section:**
- Conceptual image of futuristic CGM device or abstract glucose molecule visualization
- Full-width, moderate height (60vh)
- Dark overlay (opacity-50) to ensure text contrast
- Buttons with backdrop-blur-md backgrounds

**About/Methodology:**
- Diagram illustrations of glucose-insulin feedback loop
- Icon graphics for PubMed + LLM integration flow

**Research Cards:**
- Optional small thumbnail icons for article types (32x32px)

---

## Color Treatment Philosophy
Layout, spacing, and hierarchy defined above. Visual styling (dark backgrounds, glowing accents, gradient overlays) applied during implementation to create the futuristic medical aesthetic while maintaining all structural specifications.

---

## Accessibility
- All interactive elements: min-height 44px
- Focus rings: 2px offset, cyan color
- Chart data accessible via data tables (hidden, screen-reader only)
- ARIA labels on all icon-only buttons
- Color contrast: WCAG AA minimum on all text