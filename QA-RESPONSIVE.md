# JGA Intelligence — Responsive QA matrix

## Implemented responsive improvements (October 20, 2026)
- Fluid typography and content-driven breakpoints.
- Container-aware research charts and stacked card layouts.
- Scrollable, focusable data tables with headings and a visible mobile swipe cue on the executive report.
- 44px touch-oriented controls where practical, larger mobile navigation targets, keyboard Escape to close the menu.
- Adjustments for narrow 320px and 360px widths, phones, tablets, laptops, large desktops and low-height screens.
- Minimal motion with reduced-motion support; no forced scroll snapping or hover-only content.
- Print-specific A4 executive report styling.

## Tested automatically
- JavaScript syntax for application and report: passed.
- Loaded research data: 44 question texts, 176 selected response indicators, 109 provisional JGA recommendations: passed.
- Report generation: seven sections, seven tables, print button and links generated: passed.
- Vercel production deployment: ready.
- Live browser navigation: report, overview, sources and blueprint loaded correctly at observed desktop width (~1024px+), without obvious desktop clipping.

## Still requires actual manual browser QA
The remote browser tool could not resize the viewport. Mark all items below as **not yet visually verified**:

| Viewport / test | Checks | Status |
| --- | --- | --- |
| 320 × 568 | Hero title reflow, 2-column metric grid, heatmap, mobile menu | Not visually verified |
| 360 × 740 | Full-width filters, question/answer cards, source names | Not visually verified |
| 375 × 812 | Report tables swipe, mobile nav, full evidence importer | Not visually verified |
| 430 × 932 | Blueprint copy/actions, read length, overlays | Not visually verified |
| 768 × 1024 | Tablet cards and split comparison layout | Not visually verified |
| 1024 × 768 | Short desktop/nav breakpoint, sticky scroll | Desktop-size check only |
| 1280 × 800 | Laptop report charts, no unintended clipping | Not separately verified |
| 1440 × 900 | Editorial cover, large report and table density | Not separately verified |
| 1920 × 1080 | Maximum reading width, restrained wide spacing | Not visually verified |
| 1280 desktop at 400% zoom | Equivalent ~320px CSS viewport, WCAG 1.4.10 reflow | Not visually verified |
| 200% text enlargement | Control labels, text and line-break integrity | Not visually verified |
| Touch device | Click/tap, horizontal table scroll, menu and accessible panels | Not visually verified |
| Keyboard | All links and controls, focus order, scroll regions, Escape mobile menu | Partly code-checked, not live verified |
| Reduce Motion | No decorative motion; page links still work | CSS implemented, not live verified |
| Print / Save PDF | A4 page breaks, all headings/tables, no clipped rows | Print rules implemented, not live verified |

## Acceptance criteria
- No horizontal **document-level** scrolling at 320 CSS px, excluding intentionally scrollable tables.
- All essential content is visible without hover.
- Mobile controls are comfortable to tap and labels do not truncate.
- Tables scroll horizontally in their own focusable region and retain headers.
- Keyboard-only users can navigate the full report and evidence drill-down.
- Reading and navigation remain functional with reduced motion and 400% browser zoom.
- PDF print view has no clipped tables, headings or content.
- Do not claim WCAG 2.2 AA or a measured Core Web Vitals pass until independently tested.

## Primary guidance
- W3C WCAG 2.2 Reflow and Target Size
- GOV.UK Design System Layout and Type Scale
- web.dev Responsive Web Design and Fluid Typography
- MDN Container Queries, Pointer Queries and Reduced Motion
- Nielsen Norman Group Data Tables
- UK National Archives scrollable table guidance
