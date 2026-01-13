# Product Requirements Document
# iPhone Browser Emulator

**Version:** 1.0
**Date:** 2026-01-13
**Status:** Draft

---

## Executive Summary

The iPhone Browser Emulator is a lightweight, browser-based web application that renders a photorealistic iPhone device frame containing an embedded browser viewport. Users can input any URL to preview how web content appears within the constraints of an iPhone's screen dimensions, aspect ratio, and Safari browser characteristics.

This product addresses the gap between costly physical hardware, heavyweight native simulators, and limited browser DevTools—providing a zero-installation, cross-platform solution with realistic iPhone visual context and interactive browsing capability.

**Development Note**: This project follows a Human-In-The-Loop (HITL) workflow. Server starts for testing require explicit human intervention—the dev server runs on an external host accessible to the containerised development environment.

---

# Part 1: Product Requirements

## 1. Core Product Definition

### 1.1 Product Statement

The iPhone Browser Emulator is a lightweight, browser-based web application that renders a photorealistic iPhone device frame containing an embedded browser viewport. Users can input any URL to preview how web content appears within the constraints of an iPhone's screen dimensions, aspect ratio, and Safari browser characteristics.

### 1.2 Problem Statement

Developers, designers, and quality assurance professionals frequently need to verify how websites render on iPhone devices. Current solutions require either:
- Physical iPhone hardware (costly, limited to owned models)
- Native iOS simulator via Xcode (requires macOS, heavyweight)
- Browser DevTools device mode (lacks visual context, no realistic frame)
- Third-party screenshot services (non-interactive, latency-heavy)

This product addresses the gap: a zero-installation, cross-platform solution providing realistic iPhone visual context with interactive browsing capability.

### 1.3 Product Category

Frontend web application — single-page application (SPA) with no backend requirements beyond static hosting.

---

## 2. Target Users

### 2.1 Primary User Segments

| Segment | Description | Primary Need |
|---------|-------------|--------------|
| **Frontend Developers** | Engineers building responsive websites and web applications | Validate responsive breakpoints and mobile-specific styling |
| **UI/UX Designers** | Design professionals creating mobile-first interfaces | Present designs in realistic device context for stakeholder review |
| **QA Engineers** | Quality assurance testers performing cross-device testing | Identify rendering issues without physical device access |
| **Digital Marketers** | Marketing professionals managing landing pages and campaigns | Preview mobile ad destinations and email templates |
| **Product Managers** | Product owners reviewing feature implementations | Assess mobile experience during sprint reviews |
| **Technical Writers** | Documentation authors creating mobile guides | Capture accurate mobile screenshots for documentation |

### 2.2 User Characteristics

- **Technical proficiency**: Intermediate to advanced (comfortable with URLs, browser tools)
- **Platform**: Any modern browser (Chrome, Firefox, Safari, Edge)
- **Environment**: Desktop/laptop workstation (primary), tablet (secondary)
- **Usage pattern**: Task-oriented, intermittent (5-15 minute sessions)

---

## 3. Use Cases

### 3.1 Primary Use Cases

| ID | Use Case | Actor | Scenario | Outcome |
|----|----------|-------|----------|---------|
| **UC-01** | Responsive Design Validation | Frontend Developer | Developer enters localhost URL during development to verify mobile layout matches design specifications | Developer confirms or identifies styling issues requiring adjustment |
| **UC-02** | Stakeholder Presentation | UI Designer | Designer loads prototype URL within iPhone frame during client meeting to demonstrate mobile experience | Client visualises final product appearance on target device |
| **UC-03** | Cross-Device QA Testing | QA Engineer | Tester systematically loads production URLs across different iPhone model frames to document rendering consistency | Test report generated with identified discrepancies |
| **UC-04** | Landing Page Preview | Digital Marketer | Marketer previews campaign landing page to verify mobile conversion funnel appearance before launch | Marketing sign-off on mobile experience |
| **UC-05** | Screenshot Capture | Technical Writer | Writer loads documentation portal to capture mobile screenshots for user guide illustrations | Publication-ready mobile screenshots obtained |
| **UC-06** | Bug Reproduction | Support Engineer | Engineer loads customer-reported URL to reproduce visual bug in iPhone context | Bug confirmed and documented for development team |
| **UC-07** | A/B Test Comparison | Product Manager | PM loads variant URLs side-by-side (multiple instances) to compare mobile treatment appearances | Informed decision on preferred variant |

### 3.2 Use Case Prioritisation (MoSCoW)

- **Must Have**: UC-01, UC-02, UC-05
- **Should Have**: UC-03, UC-04
- **Could Have**: UC-06, UC-07
- **Won't Have (v1)**: Automated testing integration, API access

---

## 4. Success Metrics

### 4.1 Key Performance Indicators (KPIs)

| Category | Metric | Target (6 months post-launch) | Measurement Method |
|----------|--------|-------------------------------|-------------------|
| **Adoption** | Monthly Active Users (MAU) | 5,000 | Analytics tracking |
| **Engagement** | URLs loaded per session | ≥ 3 | Event tracking |
| **Engagement** | Average session duration | 5-10 minutes | Analytics tracking |
| **Retention** | 7-day return rate | ≥ 30% | Cohort analysis |
| **Quality** | Task completion rate | ≥ 95% | User testing |
| **Performance** | Page load time | < 2 seconds | Lighthouse audit |
| **Satisfaction** | User satisfaction score (CSAT) | ≥ 4.0/5.0 | In-app survey |

### 4.2 Success Criteria

The product is considered successful when:
1. Users can load and view external URLs within the emulated iPhone frame without errors in ≥95% of attempts
2. The visual fidelity of the device frame is rated "realistic" by ≥80% of surveyed users
3. Time-to-first-interaction is under 3 seconds on standard broadband connection
4. Zero critical bugs reported in production for 30 consecutive days

### 4.3 Failure Indicators

- Bounce rate exceeds 70%
- iframe content fails to load for major websites (CORS/X-Frame-Options issues) in >50% of attempts
- User feedback consistently cites "unrealistic" device appearance

---

## 5. MVP Scope

### 5.1 Version 1.0 (MVP) — In Scope

| Feature | Description | Priority |
|---------|-------------|----------|
| **F-01: URL Input** | Text input field accepting valid HTTP/HTTPS URLs with validation | P0 |
| **F-02: iPhone Frame Display** | Static, photorealistic iPhone frame (single model: iPhone 15 Pro) | P0 |
| **F-03: Embedded Browser** | iframe element positioned within device screen area displaying target URL | P0 |
| **F-04: Viewport Scaling** | Content scaled to match iPhone 15 Pro logical resolution (393×852 CSS pixels) | P0 |
| **F-05: Load Button** | Explicit action to load/reload URL content | P0 |
| **F-06: Loading State** | Visual indicator during content loading | P1 |
| **F-07: Error Handling** | User-friendly message when URL cannot be loaded (CORS, invalid URL) | P1 |
| **F-08: Responsive Container** | Device frame scales appropriately on different desktop screen sizes | P1 |

### 5.2 Version 1.0 (MVP) — Explicitly Out of Scope

| Feature | Rationale for Exclusion |
|---------|------------------------|
| Multiple device models | Complexity; single reference device sufficient for MVP validation |
| Orientation toggle (portrait/landscape) | Secondary feature; portrait is primary mobile viewport |
| Device colour variants | Cosmetic; does not affect core functionality |
| Touch gesture emulation | Technical complexity; browser native scrolling sufficient |
| Network throttling | Browser DevTools provides this capability |
| Screenshot/export functionality | Can be achieved via browser native screenshot |
| User accounts/saved URLs | Requires backend infrastructure |
| Browser version emulation | Out of scope; visual preview focus only |

### 5.3 Future Versions Roadmap

| Version | Features |
|---------|----------|
| **v1.1** | Device model selector (iPhone 15, 14, SE), orientation toggle |
| **v1.2** | Screenshot export (PNG), URL history (local storage) |
| **v1.3** | Side-by-side comparison mode, shareable preview links |
| **v2.0** | iPad models, Android device frames, custom dimensions |

### 5.4 Technical Constraints (MVP)

1. **iframe Limitations**: Websites setting `X-Frame-Options: DENY` or `Content-Security-Policy: frame-ancestors 'none'` will not render. This is a browser security constraint, not a product defect.
2. **Same-origin Restrictions**: JavaScript interactions between host application and iframe content are restricted by browser security policies.
3. **Viewport Emulation**: True Safari rendering engine behaviour cannot be replicated; this is a visual preview tool, not a functional emulator.

---

## 6. Assumptions and Dependencies

### 6.1 Assumptions

1. Users have access to modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
2. Target websites permit iframe embedding (acknowledged limitation in Section 5.4)
3. Users accept visual approximation rather than pixel-perfect Safari rendering
4. Desktop/laptop is the primary usage context (mobile-on-mobile use case deprioritised)

### 6.2 Dependencies

| Dependency | Type | Risk Level |
|------------|------|------------|
| iPhone device imagery/SVG assets | Design asset | Low |
| Modern browser iframe support | Platform | Low |
| Static hosting infrastructure | Infrastructure | Low |

---

## 7. Development Workflow

### 7.1 Human-In-The-Loop (HITL) Requirement

**CRITICAL**: When the development server needs to be started for testing, a **Human-In-The-Loop intervention is mandatory**.

| Phase | Action | Responsibility |
|-------|--------|----------------|
| **Development** | Code changes, component creation | AI Assistant |
| **Server Start** | Request HITL intervention | AI Assistant → Human |
| **Server Execution** | Start dev server on external host | Human |
| **Testing** | Verify functionality via provided URL | AI Assistant + Human |

### 7.2 External Host Configuration

The development server runs on an **external host** accessible to the development environment (Docker container). This architecture ensures:

1. **Network Accessibility**: The containerised development environment can reach the running application
2. **Browser Testing**: Real browser access to the emulator for validation
3. **Hot Module Replacement**: Changes propagate to the external host for live testing

**Server Start Protocol:**

```
1. AI Assistant completes code changes
2. AI Assistant requests: "Please start the dev server on the external host"
3. Human starts server: `bun run dev --host 0.0.0.0 --port 3000`
4. Human provides accessible URL to AI Assistant
5. AI Assistant confirms functionality or identifies issues
```

### 7.3 Why HITL is Required

- **Security**: Prevents autonomous network service exposure
- **Resource Control**: Human manages external host resources
- **Environment Verification**: Ensures correct host configuration before testing
- **Auditability**: Clear handoff points in development workflow

---

# Part 2: Technical Architecture

## 1. Technology Stack

### Frontend Framework: **Vue 3 with Composition API**

**Rationale:**
- Vue 3's Composition API provides excellent TypeScript support and clean separation of concerns
- Single-file components align well with the component-based architecture required
- Reactive state management built-in reduces external dependencies
- Smaller bundle size compared to React for this use case
- Vue's template syntax is more accessible for UI-heavy components like device frames

### CSS Approach: **Tailwind CSS + CSS Custom Properties**

**Rationale:**
- Tailwind provides utility-first approach ideal for precise device frame styling
- CSS Custom Properties enable runtime theming (light/dark device bezels, different iPhone models)
- Scoped styles in Vue SFCs prevent style leakage
- Tailwind's arbitrary value syntax (`w-[375px]`) maps directly to device dimensions

### Build Tools: **Vite**

**Rationale:**
- Native ES modules provide instant HMR during development
- Optimised production builds with Rollup
- First-class Vue 3 support via `@vitejs/plugin-vue`
- Built-in TypeScript support without additional configuration

### Language: **TypeScript**

**Rationale:**
- Type safety for device configuration objects (dimensions, viewport settings)
- Interface definitions for navigation state and iframe communication
- Enhanced IDE support for component props and emits

---

## 2. Architecture Overview

### Component Architecture Pattern: **Composition-based with Provide/Inject**

```
┌─────────────────────────────────────────────────────────────┐
│                        App.vue                               │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                 DeviceProvider                          ││
│  │  (provides: deviceConfig, navigationState)              ││
│  │  ┌───────────────────────────────────────────────────┐  ││
│  │  │              DeviceFrame.vue                      │  ││
│  │  │  ┌─────────────────────────────────────────────┐  │  ││
│  │  │  │           DeviceBezel.vue                   │  │  ││
│  │  │  │  ┌───────────────────────────────────────┐  │  │  ││
│  │  │  │  │        DeviceScreen.vue               │  │  ││  │
│  │  │  │  │  ┌─────────────────────────────────┐  │  │  ││  │
│  │  │  │  │  │     StatusBar.vue               │  │  │  ││  │
│  │  │  │  │  ├─────────────────────────────────┤  │  │  ││  │
│  │  │  │  │  │     BrowserChrome.vue           │  │  │  ││  │
│  │  │  │  │  │  (URL bar, navigation controls) │  │  │  ││  │
│  │  │  │  │  ├─────────────────────────────────┤  │  │  ││  │
│  │  │  │  │  │     BrowserViewport.vue         │  │  │  ││  │
│  │  │  │  │  │  (iframe container)             │  │  │  ││  │
│  │  │  │  │  ├─────────────────────────────────┤  │  │  ││  │
│  │  │  │  │  │     HomeIndicator.vue           │  │  │  ││  │
│  │  │  │  │  └─────────────────────────────────┘  │  │  ││  │
│  │  │  │  └───────────────────────────────────────┘  │  ││  │
│  │  │  └─────────────────────────────────────────────┘  ││  │
│  │  └───────────────────────────────────────────────────┘│  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┐│
│  │              ControlPanel.vue (optional)                ││
│  │  (device model selector, orientation toggle, settings)  ││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### State Management: **Vue Composables + Pinia (lightweight)**

Given the focused scope of this application, state management follows this hierarchy:

1. **Local Component State**: UI interactions (hover states, input focus)
2. **Composables**: Shared logic (useNavigation, useDeviceConfig, useViewport)
3. **Pinia Store**: Global persistent state (navigation history, device preferences)

---

## 3. Core Components

### 3.1 iPhone Frame/Bezel Component

**Component: `DeviceFrame.vue`**

**Responsibilities:**
- Render accurate iPhone device housing (bezel, rounded corners, buttons)
- Support multiple device models (iPhone 14, 15, SE, etc.)
- Handle orientation changes with smooth transitions
- Provide realistic visual fidelity (shadows, reflections, materials)

**Device Model Configuration:**

```typescript
interface DeviceModel {
  id: string;
  name: string;
  screenWidth: number;      // CSS pixels (logical)
  screenHeight: number;     // CSS pixels (logical)
  devicePixelRatio: number; // For retina simulation
  bezelRadius: number;      // Corner radius in px
  notchType: 'dynamic-island' | 'notch' | 'none';
  hasHomeButton: boolean;
  safeAreaInsets: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}
```

### 3.2 Embedded Browser View

**Component: `BrowserViewport.vue`**

**Responsibilities:**
- Render target URL content within constrained viewport
- Simulate Mobile Safari viewport behaviour
- Handle loading states and errors gracefully
- Manage iframe sandboxing appropriately

**Sandbox Policy:**
```typescript
const sandboxPolicy = [
  'allow-scripts',
  'allow-same-origin',
  'allow-forms',
  'allow-popups',
  'allow-popups-to-escape-sandbox'
].join(' ');
```

### 3.3 URL Input and Navigation Controls

**Component: `BrowserChrome.vue`**

**Responsibilities:**
- URL input with validation and auto-completion
- Back/forward navigation buttons
- Refresh/stop loading control
- Progress indicator during page loads

---

## 4. Technical Constraints and Mitigations

### 4.1 Cross-Origin Considerations with Iframes

| Constraint | Mitigation Strategy |
|------------|---------------------|
| Cannot read iframe document | Use `postMessage` API for cooperative sites; display URL-based info for others |
| Cannot detect iframe navigation | Monitor iframe `load` events; use proxy server for full control (optional) |
| X-Frame-Options / CSP blocks | Display clear error with explanation; offer to open in new tab |
| Cannot inject user-agent | Implement proxy server that modifies requests (optional enhancement) |

### 4.2 Viewport Simulation

**CSS Transform Scaling:**
```typescript
const calculateScale = (
  iframeWidth: number,
  iframeHeight: number,
  deviceWidth: number,
  deviceHeight: number
): number => {
  const scaleX = deviceWidth / iframeWidth;
  const scaleY = deviceHeight / iframeHeight;
  return Math.min(scaleX, scaleY);
};
```

---

## 5. File Structure

```
/app/GitHub/iphone-browser-emulator/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── favicon.ico
│   └── device-assets/
│       ├── iphone-15-pro-frame.svg
│       ├── iphone-se-frame.svg
│       └── dynamic-island.svg
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── main.css
│   │   │   ├── variables.css
│   │   │   └── animations.css
│   │   └── icons/
│   ├── components/
│   │   ├── device/
│   │   │   ├── DeviceFrame.vue
│   │   │   ├── DeviceBezel.vue
│   │   │   ├── DeviceScreen.vue
│   │   │   ├── StatusBar.vue
│   │   │   ├── DynamicIsland.vue
│   │   │   └── HomeIndicator.vue
│   │   ├── browser/
│   │   │   ├── BrowserChrome.vue
│   │   │   ├── BrowserViewport.vue
│   │   │   ├── ProgressBar.vue
│   │   │   └── ErrorOverlay.vue
│   │   ├── controls/
│   │   │   ├── ControlPanel.vue
│   │   │   ├── DeviceSelector.vue
│   │   │   └── ThemeToggle.vue
│   │   └── common/
│   │       ├── LoadingSpinner.vue
│   │       └── Button.vue
│   ├── composables/
│   │   ├── useNavigation.ts
│   │   ├── useDeviceConfig.ts
│   │   ├── useViewport.ts
│   │   └── useLocalStorage.ts
│   ├── stores/
│   │   ├── navigation.ts
│   │   └── preferences.ts
│   ├── types/
│   │   ├── device.ts
│   │   ├── navigation.ts
│   │   └── index.ts
│   ├── config/
│   │   ├── devices.ts
│   │   └── constants.ts
│   ├── utils/
│   │   ├── url.ts
│   │   └── dimensions.ts
│   ├── App.vue
│   └── main.ts
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## 6. Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vue` | ^3.4.0 | Core framework |
| `pinia` | ^2.1.0 | State management |
| `@vueuse/core` | ^10.7.0 | Vue Composition utilities |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vite` | ^5.0.0 | Build tool and dev server |
| `@vitejs/plugin-vue` | ^4.5.0 | Vue 3 SFC support |
| `typescript` | ^5.3.0 | Type checking |
| `vue-tsc` | ^1.8.0 | Vue TypeScript compiler |
| `tailwindcss` | ^3.4.0 | Utility CSS framework |
| `postcss` | ^8.4.0 | CSS processing |
| `autoprefixer` | ^10.4.0 | CSS vendor prefixes |
| `eslint` | ^8.56.0 | Code linting |
| `prettier` | ^3.2.0 | Code formatting |

---

# Part 3: User Experience

## 1. Visual Design Principles

### Device Frame Aesthetic

The iPhone frame should strike a balance between **realistic recognition** and **purposeful stylisation**—"believably iconic."

- **Frame Design**: Clean, simplified rendering of the iPhone silhouette with recognisable elements (Dynamic Island, rounded corners, speaker grille) without photorealistic distractions
- **Material Feel**: Subtle gradient suggesting brushed titanium/aluminium
- **Bezel Treatment**: True-to-life proportions for each device model

### Environmental Context

- **Default Background**: Soft, neutral gradient (warm grey to cool grey) creating depth without distraction
- **Optional Environments**: Minimal (pure gradient), workspace (subtle desk texture), dark void
- **Shadow Treatment**: Soft, diffused drop shadow for grounding

### Theme Considerations

| Context | Frame | Background | Rationale |
|---------|-------|------------|-----------|
| **Light Mode** | Space Black frame | Warm light gradient | Maximum contrast for viewport |
| **Dark Mode** | Silver/White frame | Deep charcoal gradient | Frame "pops" against darkness |
| **Auto** | Follows system preference | Smooth transition | Respects user's environment |

---

## 2. Interaction Design

### URL Input Experience

1. **Placement**: Prominent position above the device
2. **Input Field**: Large hit target, placeholder "Enter URL to preview...", auto-complete from recent URLs
3. **Submit Action**: Enter key triggers load, optional "Go" button with hover state

### Loading States & Feedback

```
[URL Entered] → [Connecting] → [Loading] → [Rendering] → [Complete]
```

- **Connecting Phase**: Subtle pulse animation on device frame edge
- **Loading Phase**: iOS-authentic progress bar
- **Error States**: Friendly illustrations with retry buttons and explanations

### Navigation Controls

A floating control bar beneath the device:

```
[ ← Back ] [ Forward → ] [ ↻ Refresh ] [ ⋮ More ]
```

### Device Model Switcher

- **Trigger**: Clicking on the device frame itself
- **Selector UI**: Horizontal carousel of device silhouettes
- **Transition**: Frame morphs between models smoothly
- **Models**: iPhone 15 Pro Max, iPhone 15 Pro, iPhone 15, iPhone SE

---

## 3. Responsive Behaviour

### Desktop (>1200px)
- Device displayed at 100% scale
- Generous whitespace around device
- URL bar and controls alongside or above

### Tablet (768px–1200px)
- Device scales to 85%
- Controls stack below device
- Single-column layout

### Mobile (<768px)
- "Phone on phone" view at ~60% scale
- Or "full viewport" mode hiding the frame
- Touch-friendly controls

---

## 4. Delightful Details

1. **Device Wake Animation**: Screen "wakes up" like a real iPhone
2. **Haptic-Style Feedback**: Micro-interactions with subtle bounce animations
3. **Screenshot Feature**: Captures viewport with iOS-style flash and thumbnail
4. **Orientation Toggle**: Spins the entire device 90° with satisfying animation
5. **Dynamic Island**: Subtle ambient animation
6. **Keyboard Shortcuts**: Ghost hints on hover ("⌘R to refresh")

---

## 5. Accessibility

### Keyboard Navigation
- Full keyboard operability
- Arrow keys navigate device carousel
- Visible focus indicators

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for all interactive elements
- Live regions for loading states

### Visual Accessibility
- WCAG AA colour contrast
- No information by colour alone
- Respects `prefers-reduced-motion` and `prefers-contrast`

### Motor Accessibility
- Minimum 44px click targets
- No drag-required interactions

---

## 6. Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                         │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 🌐  [         Enter URL to preview...              ] [Go]│   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│                         DEVICE AREA                             │
│         ┌─────────────────────────────────────┐                 │
│         │ ░░░░░░ Dynamic Island ░░░░░░░░░░░░░│                 │
│         │                                     │                 │
│         │        IFRAME VIEWPORT              │                 │
│         │        (Website renders here)       │                 │
│         │                                     │                 │
│         └─────────────────────────────────────┘                 │
│                      ◀ shadow ▶                                │
│                                                                 │
│           [ ← ]  [ → ]  [ ↻ ]  [ 📱▼ ]  [ ⋮ ]                  │
│           NAVIGATION CONTROLS BAR                               │
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│  FOOTER: "iPhone 15 Pro • 393×852 • 3x" | Theme Toggle | Help  │
└─────────────────────────────────────────────────────────────────┘
```

---

# Glossary

| Term | Definition |
|------|------------|
| **Device frame** | Visual representation of iPhone hardware (bezel, buttons, notch) surrounding the screen area |
| **Viewport** | The visible area of the webpage within the emulated device screen |
| **iframe** | HTML element that embeds another document within the current page |
| **Responsive** | Design approach where layout adapts to different screen dimensions |
| **CORS** | Cross-Origin Resource Sharing; browser security mechanism that may prevent iframe loading |
| **Dynamic Island** | The pill-shaped cutout on iPhone 14 Pro and later models |
| **Safe Area Insets** | The areas of the screen that may be obscured by device hardware |

---

*Document generated by Agent Factory with three specialist agents: Business Strategist (Analytical/Systematic), Technical Specialist (Meticulous/Thorough), and Creative Specialist (Enthusiastic/Exploratory).*
