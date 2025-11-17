# Design Guidelines: Glucose Odyssey (Professional Edition)

## Design Approach
**Human-Centered & Professional:** Inspired by leading diabetes technology companies (Insulet, Tandem, Medtronic). Clean, approachable design that puts people first—emphasizing empowerment, simplicity, and clinical trust.

## Core Design Principles
1. **Clinical Trust**: Professional aesthetics that inspire confidence in healthcare technology
2. **Human Connection**: Real people, real stories—not abstract visualizations
3. **Clarity First**: Information hierarchy that prioritizes understanding over spectacle
4. **Accessible Warmth**: Approachable colors and typography that reduce medical anxiety
5. **Purposeful Simplicity**: Every element serves user needs, no decoration for decoration's sake

---

## Color Palette

### Primary Colors
- **Primary Purple**: `#5941A9` - Main brand color, trust and innovation
- **Secondary Purple**: `#7F56D9` - Lighter accent for interactive elements
- **Deep Navy**: `#2F3A60` - Professional depth, headers and text

### Neutrals
- **Background**: `#F7F7FB` (light mode), `#1A1A2E` (dark mode optional)
- **Surface**: `#FFFFFF` (cards, panels)
- **Border**: `#E5E5EA`
- **Text Primary**: `#1A1A2E`
- **Text Secondary**: `#6B6B80`
- **Text Tertiary**: `#9999A8`

### Functional Colors
- **Success/Target**: `#10B981` - In-range glucose, positive outcomes
- **Warning**: `#F59E0B` - Attention needed, moderate urgency
- **Error/High**: `#EF4444` - Out of range, urgent attention
- **Info Blue**: `#3B82F6` - Informational elements

---

## Typography

**Font Families:**
- **Primary**: Inter (UI, body text, data)
- **Display**: Source Serif 4 (hero headlines, storytelling)
- **Code/Data**: JetBrains Mono (only for algorithm logs, code snippets)

**Hierarchy:**
- **Hero Headlines**: 48px-72px, Source Serif 4, font-weight 600
- **Section Headers**: 32px-48px, Inter, font-weight 700
- **Subsections**: 24px-32px, Inter, font-weight 600
- **Body Large**: 18px-20px, Inter, line-height 1.6
- **Body**: 16px, Inter, line-height 1.5
- **Small/Captions**: 14px, Inter, line-height 1.4
- **Data Values**: 16px-24px, Inter, font-weight 600, tabular-nums

---

## Layout System

**Spacing Scale**: 4px base unit
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

**Component Padding**: Consistent 24px (lg) for cards, 32px (xl) for sections

**Grid**:
- Max width: 1280px
- Gutter: 24px
- Hero: Full-width with contained content
- Simulator: 40% controls | 60% visualization
- Research: 3-column grid (desktop), stack on mobile

---

## Component Design

### Navigation
- White background with subtle shadow
- Primary purple logo accent
- Clean horizontal menu (desktop), hamburger (mobile)
- Sticky on scroll with fade-in effect
- Simple active state: bold + purple underline

### Hero Section
- Full-width lifestyle photography with dark overlay (opacity 30-40%)
- Centered content with max-width constraint
- Source Serif headline in white
- Clear two-CTA pattern (primary + secondary outline)
- Subtle fade-in animation on load

### Cards
- White background, subtle shadow: `0 1px 3px rgba(0,0,0,0.12)`
- Border: 1px solid `#E5E5EA`
- Border radius: 12px
- Padding: 24px
- Hover: lift slightly with shadow increase

### Buttons
**Primary (Purple):**
- Background: `#5941A9`
- Text: White
- Padding: 12px 32px
- Border radius: 8px
- Hover: darken 10%

**Secondary (Outline):**
- Border: 2px `#5941A9`
- Text: `#5941A9`
- Background: transparent
- Hover: light purple background

### Simulator Interface
**Control Panel:**
- Light cards with clear section headers
- Sliders with discrete value labels
- Progress indicators for target ranges
- Clinical language: "Meal Announcement" not "Carb Intake"
- Clean data display in tabular numbers

**Visualization:**
- Clean line charts with muted grid
- Professional color coding (green=glucose, purple=insulin)
- Clear axis labels and legends
- Export button (subtle, top-right)

### Research Cards
- Two-column editorial layout
- Source Serif headlines
- Muted tag badges
- Clear "Clinical Insight" callout boxes
- Professional source attribution

### Data Visualization
- Clean charts with minimal grid lines
- Professional color palette (no neon)
- Glucose: `#10B981` (green)
- Insulin: `#7F56D9` (purple)
- Background zones: very subtle fills
- Clear labels in Inter font

---

## Photography & Imagery

**Style Guide:**
- Real people in authentic settings (not stock photo poses)
- Diverse age, ethnicity, body types
- Natural lighting, warm tones
- Devices visible but not prominent
- Empowering, positive emotions
- Professional medical context without clinical coldness

**Image Treatments:**
- Subtle overlays (dark 30-40% for text contrast)
- No filters or heavy color grading
- Consistent aspect ratios per section
- Lazy loading for performance

---

## Animations & Motion

**Philosophy**: Subtle and purposeful. Motion should guide attention, not demand it.

**Approved Animations:**
- Fade in on scroll: 200ms ease-out
- Card hover lift: 150ms ease-out, translateY(-4px)
- Button states: 150ms ease-out
- Page transitions: 300ms fade
- Loading: simple circular progress (no DNA helix)

**Prohibited:**
- Looping animations (glow, pulse, float)
- Particle effects or grids
- Rotating/spinning elements
- Neon glow effects
- Excessive transforms

---

## Content Tone & Voice

### Messaging Principles
- **Empowering not Fearful**: Focus on control and freedom
- **Clear not Clinical**: Medical accuracy with plain language
- **Inclusive not Exclusive**: Everyone's diabetes journey is valid
- **Hopeful not Hype**: Realistic optimism about technology

### Example Transformations
- ❌ "Glucose Odyssey — The Future of Diabetes Technology"
- ✅ "Glucose Odyssey — Understanding Diabetes Technology Together"

- ❌ "AI-Powered Research Vault"
- ✅ "Latest Diabetes Research Insights"

- ❌ "Experience next-generation glucose control"
- ✅ "Explore how automated insulin delivery works"

---

## Accessibility

- **WCAG AA minimum** on all text (AAA preferred)
- Focus indicators: 2px purple outline, 2px offset
- Touch targets: minimum 44x44px
- Screen reader labels on all interactive elements
- Semantic HTML structure
- Keyboard navigation support
- Reduced motion respect

---

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Mobile Adjustments:**
- Stack all columns
- Larger touch targets (48x48px minimum)
- Simplified navigation (hamburger)
- Hero text size reduction (scale down 30%)
- Hide non-essential decorative elements

---

## Brand Personality

**We are**: Trustworthy, Clear, Empowering, Inclusive, Professional
**We are not**: Flashy, Complex, Intimidating, Exclusive, Gimmicky

---

## Implementation Notes

- Use Inter for 95% of text
- Source Serif only for hero headlines and storytelling sections
- Photography should show diverse representation
- Maintain consistent spacing (24px/32px)
- Test in both light and dark modes
- Ensure fast load times (< 3s)
