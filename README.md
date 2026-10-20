# JGA Intelligence — AI Discovery Research

An editorial, interactive research report for JGA Recruitment Group, built from its October 2026 payroll-recruitment AI discovery study.

## Current release

The first implementation is an honest **Round 1 / provisional** view of the selected 176 responses (44 exact buyer questions × four products). The 352-response benchmark, independently reviewed coding, all raw evidence, six finished written competitor reports and final recommendation blueprint are **not yet complete**. Do not mistake the UI for an approved full benchmark.

## Development

Static, dependency-free application. Run `python3 -m http.server 8080` (or any static web server), then open http://localhost:8080. `index.html`, `styles.css`, `data.js` and `app.js` form the application.

## Product principles

- The executive story first; detailed drill-down behind it.
- Every count includes a denominator and provisional status.
- Recommendations, mentions, citations and hypotheses are different things.
- Empty evidence records must not be invented or rendered as collected.
- Original study files remain the source of truth. This site will support versioned import rather than editing originals.

## Source

Original research archive supplied by the project owner, latest internal working graph generated 2026-10-20. Selected first-pass totals independently reconfirmed from the graph. Two historical S01-A pilot duplicates excluded from selected 176.

## Next build phases

1. Full selected-response evidence import with confidential-data review and exact question bank.
2. Response explorer with original transcripts, recorded conditions and source-event links.
3. Source-rank reconciliation; six editorial competitor dossiers; evidence-selected page blueprint.
4. Complete versioned exports (PDF/CSV/JSON) and second-pass import.
5. QA and access control before any production client delivery.


## Phase 2 — original question and response explorer

Implemented:
- All 44 exact question texts from the locked v4 bank.
- One observed JGA recommendation flag for each question × ChatGPT/Gemini/Perplexity/Claude (176 flags; tool totals 36/31/22/20).
- Search and filters by question, situation and recommendation pattern.
- Dedicated question detail pages, plus deep links from each of the 11 buyer situation analyses.
- Exact-question CSV export.
- A browser-local full-evidence reader at `#/full-evidence`, accepting `JGA-Full-First-Pass-Evidence-2026-10-20.json` from the generated evidence handover. The file is read in the browser; this version does not upload it to Vercel, persist it, or publish it to GitHub. It shows complete full-text response, record conditions and recorded supporting-citation URLs after local import.

Verified directly from the source archive:
- 44 unique exact questions, 176 distinct selected question/product pairs.
- 109 provisional JGA recommendations, decomposed 36 ChatGPT, 31 Gemini, 22 Perplexity, 20 Claude.
- 171 complete, 3 partial, 1 pending and 1 none-present recorded source captures.
- Full original response texts match stored SHA-256 digests.

Not yet complete: permanent hosted transcript/screenshot storage and reviewed permissions, independently validated recommendation/citation coding, full per-tool ranked source-ledger tables, six finished comparator dossiers, final selected-page rewrite, Round 2 and final PDF package.

The companion evidence export is delivered separately to the project owner; the public repository deliberately does not bundle internal collection files.
