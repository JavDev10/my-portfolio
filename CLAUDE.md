# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm preview    # Preview production build
```

## Architecture

**Stack:** Astro 5, TypeScript, Tailwind CSS 4, sharp (image optimization), `@astrojs/sitemap`.

**Pages** (`src/pages/`):
- `index.astro` — CV/Curriculum page (home)
- `sobre-mi.astro` — About me
- `proyectos.astro` — Projects
- `blog.astro` — Blog

Each page imports its own CSS file (e.g., `curriculum.css`) and uses `<Layout>` + `<Header>` + `<Footer>` shell.

**Layout** (`src/layouts/Layout.astro`): Wraps all pages. Handles SEO meta tags, Open Graph, Google Fonts (Fira Mono), Microsoft Clarity analytics, and Astro's `<ClientRouter>` for view transitions. Also sets the initial language class on `<html>` before paint to avoid flash.

**i18n system** — all translatable content lives in `src/i18n/translations.ts` as a nested object with `es` and `en` leaf keys. To render translated text, use `<TranslatedText keyStr="section.key" />`:
- It renders *both* language elements simultaneously, each with `.lang-es` or `.lang-en` classes.
- `src/styles/base.css` hides the inactive language via `:root:not(.lang-en) .lang-en { display: none }` and `:root.lang-en .lang-es { display: none }`.
- Language state is stored in `localStorage` under the key `"language"` and toggled by `LanguageSwitch.astro`.
- Default language is Spanish (`es`). Adding `lang-en` class to `<html>` activates English.

**When adding new text:** Add both `es` and `en` entries to `translations.ts`, then use `<TranslatedText keyStr="..." />` in the component.

**Navigation** (`public/scripts/navigation.js`): Loaded `is:inline` on each page. Handles mobile hamburger menu toggle and `.fade-in` animation for `.body-content`. Hooks into `astro:page-load` to re-run after view transitions.

**Static assets:** Images go in `public/img/`. Project images are under `public/img/proyects/proj1/`, `proj2/`, `proj3/`.

**Background** (`src/components/Background.astro`): Uses `transition:persist` so it stays fixed across page navigations.
