'use client';

import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    function toggleTheme() {
        const dark = document.documentElement.classList.toggle('dark');
        try {
            localStorage.setItem('aks-theme', dark ? 'dark' : 'light');
        } catch {
            // The toggle remains usable when browser storage is unavailable.
        }
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-200 text-heritage-900 transition-colors hover:bg-stone-100"
        >
            <Moon className="h-[18px] w-[18px] dark:hidden" aria-hidden="true" />
            <Sun className="hidden h-[18px] w-[18px] dark:block" aria-hidden="true" />
            <span className="sr-only dark:hidden">Switch to dark mode</span>
            <span className="sr-only hidden dark:inline">Switch to light mode</span>
        </button>
    );
}
