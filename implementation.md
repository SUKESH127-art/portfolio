# Home Page Implementation Guide

This document explains how every relevant component works on the home page, including the navigation bar, components, images, and assets.

## Site Metadata Configuration

Site metadata (title, favicon, meta tags) is configured in `src/data/siteMetadata.json` and dynamically applied to the page. This allows easy editing of site information without modifying HTML files.

**Location**: `src/data/siteMetadata.json`

**Usage**: The metadata is automatically loaded and applied when the app initializes via `src/utils/setSiteMetadata.js` in `main.jsx`.

## 1. Navigation Bar (`PillNav`)

**Location**: Fixed at the top center of the page

**How it works**:
- **Scroll Detection**: Uses a `useEffect` hook with a scroll listener to detect which section is currently active
  - Calculates scroll position relative to each section's `offsetTop` with offset of 100px (`scrollPosition = window.scrollY + 100`)
  - Updates `activeSection` state based on which section is in view
  - More precise detection: checks if scroll position is within each section's bounds (`sectionTop <= scrollPosition < sectionBottom`)
  - Special handling: if near the bottom (within 100px), it automatically sets "projects" as active
- **Visual Feedback**: Active link gets an underline (`textDecoration: 'underline'` with color `#0e7490`, thickness `2px`, offset `8px`)
- **StarBorder Wrapper**: Wrapped in a `StarBorder` component that creates an animated border effect
  - Two gradient divs (top and bottom) animate horizontally across the border
  - Creates a "star" or "shimmer" effect using radial gradients
  - Glass morphism: semi-transparent background with backdrop blur
  - Customizable props: `color="white"`, `speed="8s"`
- **Responsive Design**: 
  - Desktop: Shows all nav links horizontally with gap of `2rem`
  - Mobile: Shows only the current section title (e.g., "Home", "About Me", "Work", "Projects")
  - Mobile breakpoint: `max-width: 768px`

### StarBorder Component Details

The `StarBorder` component creates an animated border effect:
- **Two animated gradients**: One at the top and one at the bottom
- **Animation**: Gradients move horizontally across the border (top moves right, bottom moves left)
- **Visual effect**: Creates a "star" or "shimmer" effect with radial gradients
- **Glass morphism**: The inner content has a semi-transparent background with backdrop blur
- **Customizable**: Accepts `color`, `speed`, and `thickness` props

## 2. Home Section Components

### `HomeText` Component

**Purpose**: Displays the main home text with animations

**Features**:
- **Framer Motion Animations**: Text elements fade in and slide from the left with staggered delays
  - "Hey, I'm Sukesh!" appears at 1s delay
  - "I'm technologist who loves" appears at 1.2s delay
  - The `FlipWords` component appears at 1.5s delay
- **FlipWords Animation**: Cycles through words: "designing!", "building!", "iterating!", "launching!"
  - Each word animates with a spring effect
  - Letters animate individually with blur-to-focus effect
  - Words flip every 3 seconds (configurable `duration` prop)
  - Exit animation: words scale up, blur, and move diagonally before disappearing
- **Responsive**: Different layouts for desktop vs mobile

### `FlipWords` Component Details

The `FlipWords` component creates an animated word cycling effect:
- **Word cycling**: Automatically cycles through an array of words
- **Letter-by-letter animation**: Each letter animates individually with a blur-to-focus effect
- **Spring physics**: Uses Framer Motion's spring animation for smooth transitions
- **Exit animation**: When a word exits, it scales up, blurs, and moves diagonally
- **Timing**: Default duration is 3000ms (3 seconds) between word changes

### `ParallaxBackground` Component

**Purpose**: Creates a layered parallax background with sky and clouds

**How it works**:
- **Scroll-based Parallax**: Uses Framer Motion's `useScroll` and `useTransform` hooks
  - Tracks scroll progress (`scrollYProgress`)
  - Creates different vertical movement speeds for each layer
- **Layers** (from back to front):
  1. **Sky Background** (`/assets/sky.jpg`): Static, positioned at bottom, covers full screen
  2. **Cloud Layer 3** (furthest back): Moves 70% as you scroll (opacity: 0.6)
  3. **Cloud Layer 2** (middle): Moves 30% as you scroll (opacity: 0.5)
  4. **Cloud Layer 1** (closest): Doesn't move (opacity: 0.4)
- **Parallax Effect**: As you scroll, clouds move at different speeds, creating depth
- **Gradient Overlay**: A subtle white gradient overlay on top for blending

### Seagulls Image

**Location**: Positioned absolutely at bottom-right of the Home section

**How it works**:
- **Image**: `/assets/seagulls.png`
- **Animation**: Custom CSS `@keyframes float` animation
  - Moves up and down continuously (6s duration, infinite loop)
  - Moves 30px vertically in a smooth ease-in-out motion
- **Positioning**: 
  - Desktop: `bottom-32 right-40` (128px from bottom, 160px from right)
  - Mobile: `bottom-20 right-32` (80px from bottom, 128px from right)
- **Size**: Responsive height (30vh on mobile, 40vh on desktop)

## 3. Assets Used

### Background Images
- **`/assets/sky.jpg`** - The sky background layer (static, full screen)
- **`/assets/cloud.png`** - Used 3 times with different opacities for layered cloud effect
  - Layer 3: opacity 0.6, moves 70% on scroll
  - Layer 2: opacity 0.5, moves 30% on scroll
  - Layer 1: opacity 0.4, static position
- **`/assets/seagulls.png`** - The animated seagulls image (floating animation)

**All assets are located in**: `/public/assets/` directory

## Overall Layout Flow

1. **App.jsx** renders:
   - `PillNav` (fixed position at top)
   - Scroll container with sections:
     - Home section (`#home`)
     - About section (`#about`)
     - Experiences section (`#experience`)
     - Projects section (`#projects`)

2. **Home Section** (`#home`) contains:
   - `HomeText` (left side, z-index 10) - Main text content with animations
   - `ParallaxBackground` (full screen, absolute positioning) - Layered sky and clouds
   - Seagulls image (bottom-right, absolute positioning) - Floating animation

3. **Styling**: 
   - Body has a light blue background (`#e0f2fe`) that shows through the semi-transparent parallax layers
   - Smooth scroll behavior enabled
   - Font: "Bodoni Moda" serif font

## Technical Details

### Animation Libraries
- **Framer Motion** (`motion/react`): Used for scroll-based parallax, text animations, and word flipping
- **CSS Animations**: Custom keyframe animations for floating seagulls and star border effects

### Z-Index Layering
- Navigation: z-index 99 (fixed at top)
- HomeText: z-index 10 (above background)
- ParallaxBackground: z-index -10 to -50 (behind content)
- Seagulls: pointer-events-none (doesn't interfere with interactions)

### Responsive Breakpoints
- Mobile: `< 768px` - Shows section title instead of full nav, adjusted text sizes
- Desktop: `>= 768px` - Full navigation bar, larger text sizes


# Section Background Pattern

All sections (About, Experiences, Projects) use a consistent **`SectionBackground`** component pattern for full-width backgrounds.

## `SectionBackground` Component

**Purpose**: Reusable component that creates full-width background images using absolute positioning

**How it works**:
- **Background Layer**: Absolutely positioned div with `-z-50` that contains the background image
  - Uses `left: 50%` and `transform: translateX(-50%)` to center the background
  - Sets `width: 100vw` to extend full viewport width
  - Uses `height: 100%` and `minHeight` prop to match section height
  - Positioned with `top: 0` to align with section start
- **Content Layer**: Relatively positioned div with `z-10` that contains section content
- **Full Viewport Coverage**: Background extends edge-to-edge regardless of parent container width
- **Section Element**: The section itself uses `position: relative` and accepts `minHeight` prop (default: `100vh`)

**Props**:
- `imageUrl` (required): Path to background image
- `children` (required): Section content
- `className`: Additional CSS classes (e.g., `section-gradient-overlay`)
- `id`: Section ID for navigation
- `backgroundPosition`: Background image position (default: 'center')
- `minHeight`: Minimum section height (default: '100vh')
- `...rest`: Additional style props

**Benefits**:
- **Consistent Pattern**: All sections use the same approach as Home's `ParallaxBackground`
- **No Fragile Calculations**: Absolute positioning works regardless of container width
- **DRY Principle**: Single component handles all full-width backgrounds
- **Maintainable**: Change background behavior in one place
- **Reliable**: Works on all screen sizes and container configurations

# About Me Section

**Component**: `About.jsx`

**Background Image**: `/assets/watercolor-painting-seascape-beach-Itogahama-Oita-Japan.jpg`

**Implementation**:
- Uses `SectionBackground` component with watercolor seascape image
- Applies `section-gradient-overlay` className for gradient fade effect
- Section ID: `about` (for navigation)
- Minimum height: `100vh`
- Padding top: `5rem` for spacing from navigation
- Content container structure ready for content implementation

# Experiences Section

**Component**: `Experiences.jsx`

**Background Image**: `/assets/work_experiences/monet1.jpg`

**Implementation**:
- Uses `SectionBackground` component with Monet painting image
- Section ID: `experience` (for navigation)
- Minimum height: `100vh`
- Padding top: `4rem` for spacing
- Contains `Timeline` component displaying work experiences

**Content**:
- Renders timeline of work experiences from `experiences` constant
- Uses `Timeline` component for visual presentation

## Timeline Component

**Location**: `src/components/Timeline.jsx`

**Purpose**: Displays work experience timeline with scroll-based animations and glassmorphism design

**Features**:

### Scroll-based Animation
- **Moon Icon**: Moves down the timeline as user scrolls
  - Position: `md:left-3` (12px from left on desktop)
  - Size: `w-28 h-28` (112px × 112px)
  - Image: `/assets/moon_icon Background Removed.png`
  - Animation: Stops moving at 76% of timeline height (`stoppingHeight: 0.76`)
  - Uses Framer Motion's `useTransform` with `scrollYProgress`
  - Visual effect: Drop shadow with glow (`drop-shadow-[0_0_20px_rgba(148,163,184,0.8)]`)
  
- **Shooting Star Trail**: Extends from top, following the moon's position
  - Position: `md:left-18` (72px from left on desktop)
  - Width: `8px` with rounded full ends
  - Color: Gradient from `slate-300` to `slate-300`
  - Height: Animates from `120px` offset to `height * 0.76 + 120px`
  - Fade in: Between 10-15% scroll progress (`fadeInStart: 0.1`, `fadeInEnd: 0.15`)
  - Stops extending at 80% scroll progress (`stoppingPoint: 0.8`)

### Experience Cards
- **Glassmorphism Design**: 
  - Background: `bg-white/10` with `backdrop-blur-xl`
  - Border: `border-white/20` with shadow effects
  - Hover: Background becomes `bg-white/12`, scales to `1.02`, moves up `5px`
  
- **Card Layout**:
  - Company logo: `w-28 h-28` (112px × 112px) in rounded container
  - Logo rotates 360° on hover (`group-hover:rotate-[360deg]`)
  - Job title: Large text (`text-2xl md:text-3xl`) in sky blue
  - Position title: Medium text (`text-xl`) in lighter sky blue
  - Date: Displayed below position title
  
- **Tech Stack Orbiting Circles**: 
  - Position: Bottom-right of each card (`bottom-6 right-6`)
  - Container: Glass container (`bg-white/15`, `backdrop-blur-md`) with `w-32 h-32`
  - Orbiting animation: 25 seconds duration, 30px radius
  - Tech icons: Job-specific (24px size)
  - Tech stack mapping:
    - Google: Kotlin, Java, Git, YouTube, Android
    - PetSmart: SQLite, Salesforce, Java, Azure, Git
    - Havenly Treats: React, JavaScript, CSS3, HTML5, SQLite
    - Veras Retail: Angular, Ionic, TypeScript, Git, Swift
    - ASU: Semiconductor, Physics, Research
    - MicroDrop: Biology, Research, Hospital

### Responsive Design
- Timeline effects (moon and trail) hidden on mobile (`hidden md:block`)
- Cards maintain full functionality on all screen sizes
- Spacing adjusts: `space-y-8` on mobile, `space-y-10` on desktop

# Projects Section

**Component**: `Projects.jsx`

**Background Image**: `/assets/impression-sunrise.jpg`

**Implementation**:
- Uses `SectionBackground` component with Impressionist sunrise image
- Section ID: `projects` (for navigation)
- Minimum height: `100vh`
- Padding top: `5rem` for spacing
- Contains complex 3D carousel with project cards

**Custom Hooks**:
- **`useIsomorphicLayoutEffect`**: Custom hook for isomorphic layout effect
  - Uses `useLayoutEffect` on client-side, `useEffect` on server-side
  - Prevents SSR hydration issues
- **`useMediaQuery`**: Custom hook for responsive media queries
  - Detects screen size changes in real-time
  - Returns boolean for query match
  - Used to determine mobile vs desktop carousel size
  - Breakpoint: `max-width: 640px`

**Features**:
- **3D Cylindrical Carousel**: Rotating carousel displaying projects
  - Uses Framer Motion's `useMotionValue` and `useTransform` for 3D rotation
  - Cylinder width: 1200px (desktop) or 800px (mobile, `max-width: 640px`)
  - Each project card positioned on a face of the cylinder using `rotateY` and `translateZ`
  - Perspective: 1000px for 3D depth effect
  - Face count: Based on number of projects in `myProjects` array
  - Face width: `cylinderWidth / faceCount`
  - Radius calculation: `cylinderWidth / (2 * Math.PI)`
- **Auto-rotation**: Continuously rotates when not hovered
  - Rotation speed: 0.5 degrees per 50ms interval
  - Pauses on hover or when modal is open
  - Uses `useEffect` with interval for smooth continuous rotation
- **Project Cards**: Glassmorphism design with hover effects
  - Cards have backdrop blur (`backdrop-blur-md`) and semi-transparent white background
  - Image blur effect: cards show blurred image that becomes sharp on hover
  - Hover effects: scale up (`scale: 1.02`), move up (`y: -5px`), and color transitions
  - Displays project title and top 3 tech tags
- **Glass Indicator Card**: Static glass card in center showing carousel position
  - Dimensions: 520px × 455px
  - Opacity: 60% to indicate carousel center
  - Hover detection for pausing auto-rotation
- **Modal Details**: Click project to view detailed information
  - Full-screen modal with backdrop blur overlay (`bg-black/30 backdrop-blur-sm`)
  - Z-index: `z-[9999]` to appear above all content
  - Modal container: `max-w-4xl` with glassmorphism design
  - Displays project image, title, description in 2-column grid layout
  - Close button: Top-right corner with hover effects
  - GitHub/External link button: Top-left corner
    - Shows GitHub icon for `github.com` links
    - Shows external link icon for other URLs
    - Hover effect: scales to `1.1`
  - Animated entrance/exit using Framer Motion's `AnimatePresence`
    - Initial: `scale: 0.9, opacity: 0`
    - Animate: `scale: 1, opacity: 1`
    - Exit: `scale: 0.9, opacity: 0`
  - Click outside modal to close
  - Scrollable content: `max-h-[90vh] overflow-y-auto`
  
- **Footer**: Displays tech stack credits and social links
  - Position: Bottom of Projects section
  - Layout: Three-column flex layout with space-between
  - Left: "❤️ React + Vite + Tailwind + 3JS" tech stack credits
  - Center: Social links (LinkedIn, Instagram, GitHub)
    - GitHub replaces WhatsApp in social links
    - Icons: 20px × 20px with white filter (`brightness(0) invert(1)`)
    - Links open in new tab with `target="_blank" rel="noopener noreferrer"`
  - Right: Copyright notice "© 2025 Sukesh Ram."
  - Text color: White (`text-white`)
  - Padding: `mt-16 pb-8` for spacing
  
- **Responsive**: Adjusts carousel size based on screen width
  - Uses custom `useMediaQuery` hook for screen size detection
  - Breakpoint: `max-width: 640px` for mobile
  - Mobile: smaller cylinder width (800px) for better mobile experience
  - Desktop: full cylinder width (1200px)

# SectionBackground Implementation Details

**Usage Pattern**:
```jsx
<SectionBackground
  imageUrl="/assets/image.jpg"
  id="section-id"
  className="section-gradient-overlay"
  minHeight="100vh"
  style={{ paddingTop: '5rem' }}
>
  {/* Section content */}
</SectionBackground>
```

**Technical Implementation**:
- Background layer uses `left: 50%` + `transform: translateX(-50%)` to center relative to viewport
- Sets `width: 100vw` to extend full viewport width
- Uses `absolute` positioning with `-z-50` to sit behind content
- Content layer uses `relative` positioning with `z-10` to sit above background
- `absolute` positioning removes element from normal document flow, allowing it to extend beyond container constraints
- Works with any parent container width or max-width constraints
- Consistent behavior across all screen sizes

# Shared Assets

## Background Images
- **`/assets/watercolor-painting-seascape-beach-Itogahama-Oita-Japan.jpg`** - About section background
- **`/assets/work_experiences/monet1.jpg`** - Experiences section background
- **`/assets/impression-sunrise.jpg`** - Projects section background

**All assets are located in**: `/public/assets/` directory

# Section Gradient Overlay

The `section-gradient-overlay` CSS class creates a gradient fade effect at the top of sections:

**CSS Implementation**:
```css
.section-gradient-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, rgba(224, 242, 254, 0.3), transparent);
  pointer-events: none;
  z-index: 0;
}
```

**Purpose**: 
- Blends section backgrounds with page background (`#e0f2fe`)
- Creates smooth visual transitions between sections
- Applied to About section for seamless Home-to-About transition
- Uses subtle opacity (0.3) for gentle blending effect
