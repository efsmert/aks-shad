/** Self-contained so the same seasonal decision runs before paint and after navigation. */
export function applySeasonalTheme() {
    const root = document.documentElement;
    const requested = new URLSearchParams(window.location.search).get('theme');
    const themes = ['valentine', 'halloween', 'classic'];
    let preview: string | null = null;
    try {
        if (requested && themes.includes(requested)) {
            sessionStorage.setItem('aks-season-preview', requested);
        }
        preview = sessionStorage.getItem('aks-season-preview');
    } catch { /* Preview links still work when browser storage is unavailable. */ }
    if (requested && themes.includes(requested)) preview = requested;
    if (!preview || !themes.includes(preview)) preview = null;
    // The chapter's calendar, independent of a visitor's time zone.
    const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York', month: '2-digit', day: '2-digit',
    }).formatToParts(new Date());
    const day = `${parts.find(part => part.type === 'month')?.value}-${parts.find(part => part.type === 'day')?.value}`;
    root.dataset.season = preview ?? (day === '02-14' ? 'valentine' : day === '10-31' ? 'halloween' : 'classic');
    if (preview) root.dataset.seasonPreview = preview;
    else delete root.dataset.seasonPreview;
}

export const seasonalThemeScript = `(${applySeasonalTheme.toString()})();`;
