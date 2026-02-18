# Trip Planner — Design Document

**Date:** 2026-02-19
**Status:** Approved

## Overview

Interactive drag-and-drop trip planner for Israeli travelers in Thailand. Users build day-by-day itineraries from a curated destination/activity catalog, with live budget tracking in ILS. Planning is free; saving, sharing, and PDF export are gated behind login/premium.

## Approach

Client-side drag-and-drop with server persistence. All planning state lives in React state with localStorage auto-save. Server handles save/load/share/PDF for logged-in users.

## Data Model

### New Table: `itineraries`

| Column | Type | Notes |
|--------|------|-------|
| `id` | serial PK | |
| `userId` | integer, nullable | FK to users; null = anonymous |
| `shareToken` | text, unique | nanoid-generated public share link |
| `title` | text | e.g. "2 Weeks in Northern Thailand" |
| `titleHe` | text | Hebrew version |
| `startDate` | date, nullable | Trip start date |
| `totalDays` | integer | Number of days |
| `budget` | jsonb | `{ accommodation, food, activities, transport }` totals in ILS |
| `days` | jsonb | Array of day objects (see below) |
| `createdAt` | timestamp | |
| `updatedAt` | timestamp | |

### Days JSONB Structure

```ts
interface Day {
  dayNumber: number;
  destinationId: string;
  activities: Activity[];
  notes: string;
  notesHe: string;
}

interface Activity {
  id: string;
  name: string;
  nameHe: string;
  category: string;
  estimatedCostIls: number;
  duration: string;
}
```

### Static Data Files (no DB tables)

- `shared/destinations.ts` — ~12 curated destinations with metadata and activities
- `shared/activityCategories.ts` — activity type icons and colors

## Destination Catalog

~12 popular destinations across Thailand:

| Region | Destinations |
|--------|-------------|
| Central | Bangkok |
| North | Chiang Mai, Chiang Rai, Pai |
| South (Andaman) | Phuket, Krabi, Koh Lanta |
| South (Gulf) | Koh Samui, Koh Phangan, Koh Tao |
| East | Pattaya, Koh Chang |

Each destination includes:
- `id`, `name`, `nameHe`, `region`, `image`
- `suggestedDays` range (e.g. Bangkok: 3-4)
- `budgetPerDay` by tier: `{ backpacker, midRange, luxury }` in ILS
- 5-8 activities with name/nameHe, category, estimated cost, duration

## UI Layout (Vertical)

```
+--------------------------------------------------+
|  Trip Header: Title, dates, total budget (ILS)   |
+--------------------------------------------------+
|  Destination Catalog (horizontal strip)          |
|  [Search] [Bangkok] [Chiang Mai] [Phuket] ...   |
|  Activity cards (scrollable row per destination) |
+--------------------------------------------------+
|  Day Timeline (vertical accordion)               |
|  Day 1 - Bangkok: [Act] [Act] [+ Drop here]     |
|  Day 2 - Bangkok: [Act] [+ Drop here]           |
|  Day 3 - Chiang Mai: [Act] [Act] [Act]          |
|  [+ Add Day]                                     |
+--------------------------------------------------+
|  Budget Summary: total | per-day average         |
+--------------------------------------------------+
|  [Save] [Share Link] [Export PDF]                |
+--------------------------------------------------+
```

Works identically on desktop and mobile — no responsive breakpoint needed.

## Components

New directory: `client/src/components/trip-planner/`

| Component | Purpose |
|-----------|---------|
| `TripPlanner.tsx` | Main page, state management, DnD context |
| `DestinationCatalog.tsx` | Horizontal strip with destination tabs and activity cards |
| `DayTimeline.tsx` | Vertical list of day columns |
| `DayColumn.tsx` | Single day with droppable zone, destination label |
| `ActivityCard.tsx` | Draggable card: name, cost, duration, icon |
| `BudgetSummary.tsx` | Running total breakdown in ILS |
| `TripActions.tsx` | Save/share/export buttons with premium gating |

**DnD Library:** `@dnd-kit/core` + `@dnd-kit/sortable`

## API (tRPC)

New router: `server/tripPlannerRouter.ts`, mounted in `server/routers.ts`.

| Endpoint | Procedure | Description |
|----------|-----------|-------------|
| `trip.save` | protectedProcedure | Save itinerary (create or update) |
| `trip.getById` | publicProcedure | Load by ID (owner or shareToken) |
| `trip.getByShareToken` | publicProcedure | Load shared itinerary (read-only) |
| `trip.list` | protectedProcedure | List user's saved itineraries |
| `trip.delete` | protectedProcedure | Delete itinerary |
| `trip.generatePdf` | protectedProcedure | PDF export (premium only, uses pdfkit) |

## Premium Gating

| Tier | Capabilities |
|------|-------------|
| Free (no login) | Full planning, budget calculator, localStorage auto-save |
| Logged in (free) | Save up to 3 itineraries, share via link |
| Premium | Unlimited saves, PDF export, priority tips |

## Share Flow

1. On save, server generates `shareToken` via nanoid
2. Share URL: `/trip-planner/shared/{token}`
3. Opens in read-only mode
4. "Copy this trip" button clones into viewer's planner

## Bilingual Support

- All data: `name`/`nameHe`, `title`/`titleHe`, `notes`/`notesHe`
- UI labels via existing `LanguageContext`
- PDF renders in user's selected language
- Hebrew mode uses RTL direction throughout

## Error Handling

- **Offline:** DnD works client-side, localStorage auto-save every 30s
- **Save failures:** Toast (sonner) with retry
- **Share collision:** Regenerate nanoid on constraint violation
- **PDF failures:** Error toast with retry suggestion

## Testing

- Unit tests for budget calculation logic
- API tests for CRUD + share endpoints
- No E2E DnD tests in v1

## Route

`/trip-planner` — registered in `client/src/App.tsx`
`/trip-planner/shared/:token` — shared itinerary view
