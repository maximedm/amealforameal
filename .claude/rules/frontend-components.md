# Frontend Component Organization

## Page-Scoped Components

When creating or extracting React components that are only used by a single page (or pages within the same directory), place them in a `components/` folder next to that page.

```
resources/js/pages/zla/venues/
  index.tsx
  show.tsx
  components/
    venue-card.tsx
    venue-filters.tsx
```

- Import page-scoped components using relative paths: `import { VenueCard } from './components/venue-card'`.
- If a component is only used within one page directory, it belongs in that page's `components/` folder, not in the global components folder.

## Global Components (`resources/js/components/`)

The top-level `resources/js/components/` folder is reserved for components that are shared across multiple pages or used application-wide (layouts, navigation, UI primitives, etc.).

- Before placing a component in global `components/`, confirm it is used (or will be used) by more than one page directory.
- UI primitives (`resources/js/components/ui/`) remain global since they are shared by design.

## Promoting a Component

If a page-scoped component later needs to be used by other pages, move it to `resources/js/components/` and update all imports accordingly.
