# School Branding Customization

## Goal
Let a school admin configure their logo and up to 5 hex color codes. The survey app dynamically recolors and shows their logo instead of the placeholder tiger.

## What Changes

### 1. Add placeholder tiger logo
- Add a tiger SVG/PNG to `public/logo-placeholder.png`
- Display it on the onboarding screen and results page where a school logo would naturally go

### 2. Branding config panel (new tab in Admin)
- New "Branding" tab alongside Methodology and Dashboard
- **Logo upload**: file input with guidelines (recommended 200x200px, max 500KB, PNG/SVG/JPG)
- **School name**: text input
- **5 hex color inputs**: labeled Primary, Secondary, Accent, Background, Text — each with a color picker + hex text input
- **Live mini-preview**: small card showing how the colors look together
- **Reset to defaults** button

### 3. Dynamic color application
- Store branding config in a React context (`BrandingProvider`)
- When custom colors are set, inject CSS custom properties (`--brand-primary`, `--brand-secondary`, etc.) on the root element
- The existing 5 theme skins continue to work but their accent colors get overridden by the school's hex codes:
  - Primary → buttons, progress bar fill, accent text
  - Secondary → hover states, secondary elements
  - Accent → icons, badges
  - Background → app background (optional override)
  - Text → main text color (optional override)
- Use Tailwind's arbitrary value syntax with CSS vars: `bg-[var(--brand-primary)]`

### 4. Logo display
- Onboarding screen: show the logo above "Discover Your Path"
- Results page: show the logo in the header area
- PDF export: include the logo at the top of the report
- When admin uploads a new logo, convert to base64 data URL and store in localStorage

### 5. Persistence
- Save entire branding config (logo base64, school name, 5 hex codes) to localStorage under key `studentPaths_branding`
- Load on app init — if config exists, apply immediately
- Also support a `branding.json` file in public/ for static deployments (localStorage overrides it)

### Files to create/modify
- **New**: `src/contexts/BrandingContext.tsx` — context + provider + hook
- **New**: `src/components/BrandingPanel.tsx` — admin branding config UI
- **Modify**: `src/components/Admin.tsx` — add Branding tab
- **Modify**: `src/components/Onboarding.tsx` — show school logo
- **Modify**: `src/components/Results.tsx` — show school logo
- **Modify**: `src/App.tsx` — wrap with BrandingProvider, apply CSS vars
- **Modify**: `src/utils/pdf.ts` — include logo in PDF
- **Add**: `public/logo-placeholder.png` — tiger placeholder image
