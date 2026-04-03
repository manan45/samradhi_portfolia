# CLAUDE.md — Digital Marketing Portfolio Agent

## 🎯 Project Mission

Build an **interactive, modern, Apple iOS 26 "Liquid Glass" inspired** single-page portfolio website for a **digital marketing freelancer**. The site must feel like a native Apple experience brought to the web — translucent, luminous, depth-aware, and buttery smooth.



---

## 🎨 Design System: Apple iOS 26 "Liquid Glass"

### Core Design Philosophy

Apple's Liquid Glass (introduced WWDC 2025) is a **dynamic material system** that mimics real glass — translucency, refraction, depth, and motion responsiveness. It replaced flat design with layered, living interfaces where **content is primary** and controls visually recede.

### Mandatory Visual Principles

1. **Translucency & Glassmorphism**
   - All cards, navbars, modals, and floating elements MUST use `backdrop-filter: blur()` with semi-transparent backgrounds
   - Glass panels should subtly refract/reflect their surroundings
   - Use layered transparency: content sits ON glass, glass floats ABOVE background
   - Minimum blur: `20px` for primary glass surfaces, `10px` for secondary

2. **Depth & Layering**
   - Create a clear **z-axis hierarchy**: Background → Glass Layer → Content → Interactive Controls
   - Floating elements must have soft, diffused shadows (never hard drop shadows)
   - Use `box-shadow` with large spread and low opacity for "levitation" effect
   - Elements should feel like they exist in physical space

3. **Dynamic Backgrounds**
   - Use animated gradient meshes, soft aurora-style blobs, or subtle particle fields
   - Background must be **alive** — slow, continuous, ambient motion
   - Colors should shift subtly over time (CSS animations or canvas)
   - The background gives the glass surfaces something beautiful to refract

4. **Rounded Everything**
   - Border radius: `20px–28px` for cards/panels, `14px–16px` for buttons, `50%` for avatars/icons
   - iOS 26 uses continuous (superellipse) corner curves — approximate with large `border-radius`
   - No sharp corners anywhere in the UI

5. **Color Palette**
   ```
   --glass-bg: rgba(255, 255, 255, 0.12);
   --glass-bg-hover: rgba(255, 255, 255, 0.18);
   --glass-border: rgba(255, 255, 255, 0.2);
   --glass-highlight: rgba(255, 255, 255, 0.4);
   --glass-shadow: rgba(0, 0, 0, 0.12);

   /* Accent — pick ONE dominant accent, not a rainbow */
   --accent-primary: #007AFF;        /* Apple Blue */
   --accent-gradient: linear-gradient(135deg, #007AFF, #5856D6);

   /* Text on glass */
   --text-primary: rgba(255, 255, 255, 0.95);
   --text-secondary: rgba(255, 255, 255, 0.6);
   --text-tertiary: rgba(255, 255, 255, 0.4);

   /* Dark ambient background */
   --bg-deep: #0a0a0f;
   --bg-surface: #12121a;
   ```

6. **Typography**
   - Use **SF Pro Display** (via system font stack) for headings: `-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif`
   - Body text: `'SF Pro Text'` or fallback to `'Inter'` loaded from Google Fonts
   - **Alternative distinctive choice**: Use `'Outfit'` or `'Satoshi'` or `'Cabinet Grotesk'` from Google Fonts for a unique edge — do NOT use generic Arial/Roboto
   - Font weights: 300 (light labels), 400 (body), 500 (medium emphasis), 700 (bold headings)
   - Letter spacing: `-0.02em` on headings for that tight Apple feel

7. **Motion & Animation**
   - **Page load**: Staggered fade-up reveals with `animation-delay` (each section 100ms apart)
   - **Scroll**: Elements animate in using `IntersectionObserver` — fade + translateY(30px)
   - **Hover**: Glass panels lift slightly (`translateY(-4px)`) with increased glow
   - **Tab bar**: Shrinks on scroll, expands on scroll-up (iOS 26 behavior)
   - **Transitions**: All transitions use `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — Apple's ease curve
   - **Duration**: 300ms–500ms for UI transitions, 600ms–1000ms for reveal animations
   - **CRITICAL**: No janky animations. Use `will-change`, `transform`, and `opacity` only for GPU-accelerated smoothness

8. **Borders & Highlights**
   - Glass panels get a 1px top/left border in `rgba(255,255,255,0.15)` for a light-catch effect
   - Add a subtle inner glow using `inset box-shadow`
   - Bottom/right borders should be even more transparent or absent

---

## 🏗️ Site Architecture

### Single Page Application — 7 Sections

```
┌─────────────────────────────────────────┐
│  FLOATING NAV BAR (glass, pill-shaped)  │  ← Fixed, shrinks on scroll
├─────────────────────────────────────────┤
│                                         │
│  1. HERO SECTION                        │  ← Full viewport, animated bg
│     - Name, tagline, CTA buttons        │     Glass card with photo
│     - Floating stats badges             │
│                                         │
├─────────────────────────────────────────┤
│  2. ABOUT / BIO                         │  ← Glass panel, split layout
│     - Professional summary              │     Photo + text side by side
│     - Key highlights as pill badges     │
│                                         │
├─────────────────────────────────────────┤
│  3. SERVICES                            │  ← Glass card grid (2x3 or 3x2)
│     - Icon + title + description        │     Hover: lift + glow effect
│     - Each service = one glass card     │
│                                         │
├─────────────────────────────────────────┤
│  4. PORTFOLIO / CASE STUDIES            │  ← Horizontal scroll carousel
│     - Project cards with thumbnails     │     OR bento grid layout
│     - Metrics overlay on hover          │     Click → modal with details
│                                         │
├─────────────────────────────────────────┤
│  5. RESULTS / METRICS                   │  ← Animated counter section
│     - Key numbers (clients, ROI, etc.)  │     Count-up animation on scroll
│     - Glass stat cards                  │
│                                         │
├─────────────────────────────────────────┤
│  6. TESTIMONIALS                        │  ← Auto-sliding carousel
│     - Client quotes in glass cards      │     Or stacked card deck
│     - Client name, role, company        │
│                                         │
├─────────────────────────────────────────┤
│  7. CONTACT / CTA                       │  ← Glass form panel
│     - Email, social links               │     Floating action button
│     - Contact form (glassmorphic)       │
│     - "Let's work together" CTA         │
│                                         │
├─────────────────────────────────────────┤
│  FOOTER (minimal, glass strip)          │
└─────────────────────────────────────────┘
```

### Navigation Bar Behavior (iOS 26 Style)
- **Default**: Floating pill-shaped glass bar centered at top with ~20px margin from edges
- **On scroll down**: Shrinks to a compact pill with just icons
- **On scroll up**: Expands back to full nav with labels
- **Active section**: Highlighted with accent fill inside the glass pill
- **Mobile**: Moves to bottom as a tab bar (iOS style)

---

## 🛠️ Tech Stack

### Required
- **Framework**: React (single `.jsx` file) OR vanilla HTML/CSS/JS (single `.html` file)
- **Styling**: CSS custom properties (variables) — no Tailwind classes beyond utility, no CSS frameworks
- **Animations**: CSS animations + `IntersectionObserver` for scroll triggers
- **Icons**: Lucide React icons or inline SVG (clean, thin-line style like SF Symbols)
- **Fonts**: Google Fonts — load `Outfit` (or `Satoshi` / `Cabinet Grotesk`) + `Inter` as fallback

### Forbidden
- ❌ No Bootstrap, Tailwind component libraries, Material UI
- ❌ No heavy JS frameworks beyond React
- ❌ No jQuery
- ❌ No stock photo placeholders from `placehold.co` — use gradient backgrounds or SVG illustrations
- ❌ No flat/Material Design aesthetics
- ❌ No generic "AI slop" color schemes (purple-on-white gradients)
- ❌ No `localStorage` or `sessionStorage` in artifacts

---

## 📐 Component Specifications

### Glass Card Component
```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 24px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.glass-card:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-4px);
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}
```

### Animated Background
- Use CSS `@keyframes` with multiple layered radial gradients
- OR a `<canvas>` element with soft, slowly-moving gradient blobs
- Colors: deep navy (#0a0a2e), dark purple (#1a0a3e), subtle blue (#0a1a3e), hints of teal
- Movement: Very slow (30s–60s animation cycles), organic, smooth

### Floating Navigation Pill
```
┌──────────────────────────────────────────────┐
│  ●  Home    About    Services    Work    Contact  │
└──────────────────────────────────────────────┘
  ^ Active indicator (filled pill behind text)

On scroll → shrinks to:
┌────────────────────────┐
│  🏠  👤  ⚙️  📁  ✉️  │
└────────────────────────┘
```

### Stats/Metrics Counter
- Numbers count up from 0 when scrolled into view
- Use `requestAnimationFrame` for smooth counting
- Format: "150+" clients, "3.5x" average ROI, "₹2Cr+" revenue generated
- Each stat in its own small glass badge

### Contact Form
- Inputs with glass styling: transparent bg, bottom border glow on focus
- Labels float above on focus (Material-style float labels but with glass aesthetic)
- Submit button: solid accent gradient with glass overlay on hover
- Success state: checkmark animation

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile first */
@media (min-width: 640px)  { /* sm — tablet portrait */ }
@media (min-width: 1024px) { /* lg — tablet landscape / small desktop */ }
@media (min-width: 1280px) { /* xl — desktop */ }
@media (min-width: 1536px) { /* 2xl — large desktop */ }
```

### Mobile Adaptations
- Nav moves to **bottom tab bar** (iOS style) on mobile
- Service cards stack to single column
- Portfolio carousel becomes swipeable horizontal scroll
- Glass blur reduced to `12px` on mobile for performance
- Hero section: stack vertically, reduce padding
- Touch targets: minimum `44px × 44px` (Apple HIG)

---

## ✅ Quality Checklist

Before considering the build complete, verify:

- [ ] All glass surfaces have proper `backdrop-filter` + `-webkit-backdrop-filter`
- [ ] Background is animated (not static)
- [ ] Page load has staggered reveal animations
- [ ] Scroll-triggered animations on every section
- [ ] Nav bar shrinks/expands on scroll
- [ ] Hover states on all interactive elements (lift + glow)
- [ ] Counter animation triggers on scroll into view
- [ ] Fully responsive: mobile, tablet, desktop
- [ ] Bottom tab bar on mobile
- [ ] No harsh colors — everything feels soft, luminous, premium
- [ ] Text is readable on all glass surfaces (sufficient contrast)
- [ ] Smooth 60fps animations (GPU-accelerated properties only)
- [ ] Apple-style easing curves on all transitions
- [ ] Form inputs are functional and styled
- [ ] Social links present and styled
- [ ] No console errors
- [ ] Accessibility: semantic HTML, proper heading hierarchy, focus states

---

## 🚫 Anti-Patterns to Avoid

1. **Flat cards with solid backgrounds** — Every surface should have translucency
2. **Generic grid layouts** — Use asymmetric, magazine-style, or bento layouts
3. **Static backgrounds** — Background MUST move/shift
4. **Harsh shadows** — Only soft, diffused, large-radius shadows
5. **Rainbow color schemes** — Stick to ONE accent color + neutrals
6. **Thin 1px borders everywhere** — Use selective light-catch borders (top/left only)
7. **Instant transitions** — Everything needs eased, intentional motion
8. **Cookie-cutter testimonial sliders** — Make them feel unique (stacked cards, floating quotes)
9. **Generic footer** — Keep it minimal, almost invisible, pure glass
10. **Overloaded sections** — White space is premium. Let content breathe.

---

## 🎬 Implementation Order

1. **Setup**: HTML structure, CSS variables, font imports, animated background
2. **Nav**: Floating glass pill with scroll behavior
3. **Hero**: Full-viewport section with animated entrance
4. **About**: Split glass panel with bio
5. **Services**: Glass card grid with hover effects
6. **Portfolio**: Bento grid or carousel with project cards
7. **Metrics**: Animated counter section
8. **Testimonials**: Glass quote cards
9. **Contact**: Glass form + social links
10. **Footer**: Minimal glass strip
11. **Polish**: Scroll animations, mobile responsive, performance optimization

---

## 💡 Bonus Features (If Time Permits)

- **Cursor glow effect**: Subtle radial gradient follows mouse cursor across glass panels
- **Parallax depth**: Background layers move at different speeds on scroll
- **Dark/Light toggle**: Switch between dark glass and frosted-white glass themes
- **Magnetic hover**: Cards slightly tilt toward cursor position (3D transform)
- **Sound design**: Subtle click sounds on button interactions (optional, off by default)
- **Easter egg**: Konami code or hidden interaction that reveals something fun
- **PDF resume download**: Glass-styled download button that downloads `assets/resume.pdf`. Place a prominent download button in the Hero section and/or About section with a download icon. The button should use `<a href="assets/resume.pdf" download>` — no JS generation needed, just link to the static PDF file. Style it as a glass pill button with accent gradient.

---

## 📝 Real Content — Samradhi Nagar

### Profile

**Name**: Samradhi Nagar
**Title**: Marketing Professional — Social Media Management, Digital Marketing & Strategy
**Location**: Abu Dhabi, UAE
**Phone**: +971-582761576
**Email**: samradhingr@gmail.com
**LinkedIn**: https://www.linkedin.com/in/samradhi-nagar-514323192
**Tagline**: "Turning campaigns into conversations — 6 years of marketing experience"
**DOB**: 10th May 1998
**Languages**: English, Hindi, Gujarati

### Profile Summary

Marketing professional with nearly 6 years of experience specializing in Social Media Management, Digital Marketing, and Strategic Campaign Execution. Previously worked as Social Media Specialist at Fateh Education, managed end-to-end digital platforms and executing campaigns, led targeted initiatives for the study-abroad segment. Proficient in Google Analytics 4, Tableau, Power BI, and advanced MS Excel. Specialized in end-to-end YouTube and LinkedIn management, with hands-on expertise in ad shoots, podcast creation, scriptwriting & high-impact digital campaigns. Expanded app-based student network from 10K to 60K+ active users within 12 months.

### Experience

1. **Social Media Specialist — Fateh Education** (Sep 2025 – Feb 2026)
   - New Delhi, India
   - Directed complete lifecycle management of Instagram and YouTube
   - Formulated and implemented data-backed marketing plans aligned with business objectives
   - Contributed to cross-border marketing assignment focused on Dubai

2. **Marketing Executive — GeeksforGeeks** (Apr 2023 – Sep 2025 · 2 yrs 5 mos)
   - Noida, India
   - Built GATE course ecosystem from zero via LinkedIn, YouTube, and Telegram; achieved 13K LinkedIn followers and 62K YouTube subscribers organically within 5 months
   - Directed marketing for Sandeep Jain's Tech channel — drove expansion to 1M subscribers and secured Golden Play Button
   - Accelerated CEO and AVP LinkedIn profiles to 6.2K+ and 18K followers respectively
   - Launched podcasts across GFG and Tech Baatcheet — boosted weekly audience engagement by 30%
   - Rebuilt Quora presence through multi-account strategy and 3 GFG Challenge pages
   - Refined ad creatives — 15% uplift in conversion performance
   - Managed Google and display advertising campaigns

3. **Sr. Associate — Community & Outreach — Leverage Edu** (Jun 2021 – Mar 2023 · ~2 yrs)
   - Noida, India
   - Partnered with 50+ creators across Hyderabad, Mumbai, and Surat
   - Reduced customer acquisition cost by 70% via organic community building
   - Delivered 30+ events/webinars with average 1.5K+ participants per event
   - Crafted scalable engagement playbooks for mentors and counselors

4. **Marketing Associate — Creatikartta** (May 2020 – Apr 2021 · 11 mos)
   - Dehradun, India
   - Crafted pitch decks and roadmaps for 40+ brands and startups
   - Onboarded and supervised 20+ freelancers and interns
   - Delivered campaigns for Nearz App, BBlunt, Black Papper, Kamini Sareer, Beertale, NGO partners
   - Directed branded reels and creator collaborations — 200K+ cumulative views

### Education

- **MBA in Finance & Marketing** — Graphic Era University, Dehradun (2021)
- **B.Com.** — Chandigarh University (2019)

### Certifications

- **Digital Marketing Certification** — Indian School of Business (2024)
- **Advertising & Marcom Mastery** — GrowthSchool (2023)
- **Podcast Marketing Workshop** — IIDE (2022)

### Core Competencies

Digital Marketing Strategy, Brand Development, Audience Engagement, Content Strategy Development, Influencer Marketing, Market Research & Analysis, Community Building, Event Management, Strategic Partnerships, Performance Metrics Analysis

### Technical Skills

Google Analytics 4 (GA4), Tableau, Power BI, MS Office Suite (Excel, etc.)

### Services (for portfolio display)

1. Social Media Management (YouTube, Instagram, LinkedIn, Quora)
2. Community Building & Outreach
3. Content Strategy & Script Writing
4. Video Ads & Podcast Management
5. Influencer Marketing & Creator Collaborations
6. Event Management & Webinars

### Key Stats (for animated counters)

- 6 Years Experience
- 1M+ YouTube Subscribers Driven (Sandeep Jain's Tech channel)
- 60K+ App Users Grown (from 10K in 12 months)
- 70% Reduction in Customer Acquisition Cost
- 40+ Brands Strategized For
- 50+ Influencer Partnerships
- 30+ Events & Webinars Delivered
- 200K+ Views on Creator Campaigns

### Positions of Responsibility

- Co-authored *The Zenith of the Writing* (ISBN: 9781685231590)
- Led government research project analyzing crime rates in Uttarakhand (2019)
- Headed Smart City Dehradun initiative (2019)
- Delivered workshop session at GEMS 2019, Graphic Era University
- Directed Smart City research project as Project Lead (2019)

### Testimonials (Real — from LinkedIn)

- "Working with Samradhi was like having a Swiss Army knife! Super versatile, always ready to jump in, and just made everything easier. Whether it was growing our YouTube channel or keeping projects on track, she handled it all like a pro (with a smile!). Super reliable, full of ideas, and just genuinely fun to work with. Would team up with her again without thinking twice!" — **Aryan Sharma**

- "Samradhi brings a rare combination of creativity and analytical thinking to the table. Whether it was brainstorming marketing strategies, managing partnerships, or handling cross-functional collaborations, she always brought her A-game and a positive attitude. What truly sets her apart is her willingness to support others and create a collaborative, motivating environment around her. Any team would be lucky to have someone with her integrity, drive, and professionalism." — **Khyati Gupta**

### Work Portfolio Links

**YouTube Longform**:
- https://www.youtube.com/watch?v=cC8MjoYGedk&t=2s
- https://www.youtube.com/watch?v=y5sN2D4Zkmo

**YouTube Shorts**:
- https://www.youtube.com/shorts/tiFIf_nUCZc
- https://www.youtube.com/shorts/wn0btNJ65ws

**Instagram Accounts Managed**:
- https://www.instagram.com/twaritanagar/
- https://www.instagram.com/sunejaajay/
- https://www.instagram.com/reel/DU3BRwNEhbH/
- https://www.instagram.com/reel/DSPlcp5kmPN/

**Pinterest**:
- https://in.pinterest.com/geeks_for_geeks/

**Telegram Channels**:
- https://web.telegram.org/k/#@CJSIR_Digital
- https://web.telegram.org/k/#@marketingin60seconds (own channel)

**LinkedIn Pages Managed**:
- https://www.linkedin.com/showcase/geeksforgeeks-gate-cse-da-complete-resources/posts/?feedView=all
- https://www.linkedin.com/in/sandeep-jain-/

**Influencer Accounts Managed**:
- https://www.youtube.com/@TechnicalSuneja
- https://www.instagram.com/sunejaajay/
- https://www.instagram.com/twaritanagar/

**Video Ads**:
- https://www.youtube.com/watch?v=-R64PWJPf2k
- https://www.youtube.com/watch?v=y5sN2D4Zkmo
- https://www.youtube.com/watch?v=hDfjzq9m5vI

**Product Launch**:
- https://www.youtube.com/watch?v=xBLTmQmAvz0
- https://www.youtube.com/watch?v=Tcmo0fSCAJQ

**YouTube Channels Managed**:
- https://www.youtube.com/@GeeksforGeeksVideos/featured
- https://www.youtube.com/@TechnicalSuneja
- https://www.youtube.com/@SandeepJainGfG
- https://www.youtube.com/@GfG_GATE

**Self Work / Building In Public**:
- https://www.youtube.com/watch?v=b7Gn0dZKIws
- https://www.instagram.com/reel/DU7WnRqkhZs/
- https://www.youtube.com/watch?v=JZo33ruBBDA
- https://www.youtube.com/watch?v=O2ravPU29Gw

**Mobile App Marketing**:
- https://play.google.com/store/apps/details?id=com.leverageedu.leverageedu

**Event Management**:
- https://www.linkedin.com/posts/samradhi-nagar-514323192_marketingsebrandingtak-offlinemarketing-offlineevet-activity-7403710698826018816-jf8z