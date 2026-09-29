# Seasonal themes

The Valentine skin activates on **February 14**; Halloween activates on **October 31**.
Both use **America/New_York** for the chapter calendar.
All other dates use the normal chapter theme. Open pages recheck once a minute
and when returning to the tab.

## Preview without changing the calendar

- `/?theme=valentine` previews Valentine's Day on any date.
- `/?theme=halloween` previews Halloween on any date.
- `/?theme=classic` previews the normal theme, including on either holiday.
- The choice follows internal navigation in that browser tab (session storage).
- **Exit preview** removes the override and returns to the real calendar.
- No saved light/dark preference or permanent site setting is modified.

`src/lib/seasonal-theme.ts` makes the same decision before the initial paint and
after navigation. `src/app/valentine.css` and `src/app/halloween.css` contain the isolated seasonal palettes.
`SeasonalTheme` adds decorative rose illustrations and eight small CSS petals;
petals are hidden for reduced motion and paused in background tabs. `Crest3D`
blends the existing showcase lights and initial sweep to rose, cherry, and pearl
without creating extra render loops. Explicit Crest Studio lighting presets
remain available for experiments.

Halloween reuses one 238 KB WebP skull in two decorative positions, with slow
opacity changes, tiny drifting embers, and a static cobweb. The crest shifts to
ember, cold green, and bone-white lighting, including the opening sweep. No extra
WebGL contexts or animation clocks are created. Reduced motion stops the skull
breathing and hides embers; background tabs pause all seasonal CSS animations.
See `docs/halloween-artwork.md` for the generated artwork source and prompt.
