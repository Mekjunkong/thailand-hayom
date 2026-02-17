# Content Organization Redesign

## Goal

Transform Thailand Hayom's content presentation from scattered page-specific layouts into a unified, category-first content hub inspired by [Diia Education](https://osvita.diia.gov.ua/en), while retaining the warm Thai color identity.

## Reference

**Diia Education** — minimalist black/white base with color-coded educational categories, consistent card layouts, category-grid navigation. We take the structural approach but apply warm Thai colors (gold, coral, teal).

## Category System

Seven content categories, each with a distinct warm color and Lucide icon:

| Category | Hex | Tailwind | Lucide Icon | Content |
|----------|-----|----------|-------------|---------|
| Thai Lessons | `#F59E0B` | amber-500 | BookOpen | 30 interactive lessons |
| Travel Guides | `#14B8A6` | teal-500 | Map | Destination articles |
| Food & Dining | `#F43F5E` | rose-500 | UtensilsCrossed | Restaurant/street food guides |
| Visa & Practical | `#3B82F6` | blue-500 | FileText | Visa, banking, SIM cards |
| Events | `#8B5CF6` | violet-500 | Calendar | Local events, festivals |
| Safety | `#F97316` | orange-500 | Shield | Emergency info, scam alerts |
| Premium | gradient gold-amber | Crown | Subscriber-only content |

**Color application:**
- Homepage category cards: solid background, white text, icon
- Content cards: white card, category color pill badge
- Page headers: subtle gradient with category color
- Progress bars (lessons): filled with amber-500

## Homepage Layout

Five sections top-to-bottom, replacing the current 5-section layout:

### 1. Compact Hero (~30vh)
- Thai beach parallax background (keep existing image)
- Smaller headline + single-line subtitle
- Stat pills remain (30 Lessons, 150+ Articles, Weekly Updates)
- **No CTA buttons in hero** — content grid below IS the CTA

### 2. Category Grid Hub (replaces ContentCarousel)
- 2-col mobile, 3-col desktop responsive grid
- Each cell: large card with category color background, icon, name (bilingual), description, content count
- Click navigates to category listing page
- This is the main navigation surface

### 3. Featured Content Strip
- Horizontal row of 3-4 "editor's pick" ContentCards
- Mixed types: one article, one lesson, one event
- White cards with category badges

### 4. Interactive Thailand Map (keep existing)
- Dark background section
- Map component unchanged

### 5. Newsletter + Pricing (keep existing)
- Dark background section
- Newsletter form + Free/Premium pricing cards

**Removed:** ContentCarousel component (replaced by Category Grid + Featured Strip)

## Unified ContentCard Component

Single component with `variant` prop for all content types.

### Base card structure:
```
+-----------------------------+
|  +---------------------+    |
|  |   Image 16:9        |    |
|  |  [Category Badge]   |    |  <- top-left colored pill
|  +---------------------+    |
|                              |
|  Title (2 lines max)         |
|  Description (2 lines max)   |
|                              |
|  Meta: date . views/count    |
+-----------------------------+
```

### Variants:
- **article**: author avatar, read time, view count
- **lesson**: progress bar (amber), lesson number, phrase count
- **event**: prominent date, location, registration badge

### Interaction:
- Hover: subtle y-lift (-2px) + shadow increase
- Entire card is a clickable link
- Keyboard navigable

### Grid:
- Desktop: 3 columns, 24px gap
- Tablet: 2 columns
- Mobile: 1 column full-width

## Category Listing Pages

Each category gets a consistent page layout.

### Structure:
1. **Header**: category gradient background, icon, name, description, count
2. **Filter bar**: search input, sort dropdown (Newest/Popular/A-Z), sub-category pills
3. **Content grid**: ContentCard components in responsive grid
4. **Pagination**: load more or page numbers

### Route mapping:
| Route | Category | Source |
|-------|----------|--------|
| `/lessons` | Thai Lessons | lessonsData + progress DB |
| `/articles` | Travel Guides + Food + Visa (tabbed) | articles DB |
| `/events` | Events | events DB |
| `/safety` | Safety | articles DB (safety category) |

### Lessons page special:
- Progress tracking retained
- "Continue where you left off" banner for authenticated users
- Cards show progress bars

## Bilingual / RTL

- All text uses existing `t()` helper
- Grid layout stays LTR for visual consistency
- Text within cards respects language direction
- Category names are bilingual

## Error & Loading States

- Skeleton cards matching ContentCard layout per page
- Empty states with illustration + CTA
- API errors: toast via Sonner (existing)

## Accessibility

- Keyboard-navigable card links
- Category colors meet WCAG AA contrast on white cards
- Image alt text from data
- Screen reader-friendly category labels

## Scope

### Files to create:
- `client/src/components/ContentCard.tsx` — unified card component
- `client/src/components/CategoryGrid.tsx` — homepage category hub
- `client/src/components/FeaturedStrip.tsx` — editor's picks row
- `client/src/components/CategoryHeader.tsx` — listing page header
- `client/src/components/FilterBar.tsx` — search + sort + filter
- `client/src/data/categories.ts` — category definitions (color, icon, name, route)

### Files to modify:
- `client/src/pages/Home.tsx` — new layout structure
- `client/src/pages/Articles.tsx` — use new CategoryHeader + FilterBar + ContentCard
- `client/src/pages/InteractiveLessons.tsx` — use new layout with ContentCard
- `client/src/App.tsx` — add `/safety` route, update `/events` if needed
- `client/src/components/ArticleCard.tsx` — may be replaced by ContentCard

### Files to remove:
- `client/src/components/ContentCarousel.tsx` — replaced by CategoryGrid
- `client/src/components/ArticleCardSkeleton.tsx` — replaced by ContentCard skeleton variant

## Out of Scope

- Navbar redesign
- Footer redesign
- Backend/API changes
- Database schema changes
- Authentication flow changes
- Stripe/payment changes
