# Color System Documentation

All colors for the portfolio site are centralized in `src/data/colors.json`. This provides a single source of truth for all color values used throughout the application.

## Structure

The color system is organized into logical categories:

- **brand**: Primary, secondary, and accent brand colors
- **background**: Page backgrounds and overlays
- **text**: Text colors for different contexts (primary, secondary, home, experiences, projects)
- **borders**: Border colors for various UI elements
- **glass**: Glass morphism effect colors (backgrounds and borders)
- **overlays**: Overlay colors for modals and effects
- **theme**: Custom Tailwind theme colors
- **shadows**: Shadow values for depth effects
- **particles**: Particle effect colors

## Usage

### In JavaScript/React Components

Import the color utility functions:

```javascript
import { getColor, getBrandColors, getTextColors } from '../utils/colors';

// Get a specific color by path
const primaryColor = getColor('brand.primary.base'); // '#0e7490'

// Get a group of colors
const brandColors = getBrandColors();
const textColors = getTextColors();
```

### In CSS Files

Colors are documented with comments referencing `colors.json`. For example:

```css
.pill-nav-link {
  color: #0e7490; /* brand.primary.base - from colors.json */
}

.pill-nav-link:hover {
  color: #155e75; /* brand.primary.hover - from colors.json */
}
```

### In Tailwind Classes

Use the theme colors defined in `index.css`:

```jsx
<div className="bg-aqua text-white">
  {/* Uses --color-aqua from theme */}
</div>
```

## Color Naming Convention

Colors are named using a hierarchical structure:
- Category (brand, text, background, etc.)
- Subcategory (primary, secondary, etc.)
- Variant (base, hover, light, dark, etc.)

Example: `brand.primary.base` → Brand category, Primary subcategory, Base variant

## Adding New Colors

1. Add the color to `src/data/colors.json` in the appropriate category
2. Include a descriptive name and description
3. Update this documentation if adding a new category
4. Reference the color in CSS files with comments

## Benefits

- **Single source of truth**: All colors defined in one place
- **Easy updates**: Change a color once, update everywhere
- **Documentation**: Each color has a name and description
- **Type safety**: Utility functions provide structured access
- **Maintainability**: Clear organization makes it easy to find and update colors

