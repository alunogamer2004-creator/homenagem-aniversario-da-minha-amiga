# Repository Guidelines

## Project Structure & Module Organization

This is a static birthday experience built with HTML5, CSS3, and vanilla JavaScript. The entry page is `index.html`. Keep presentation in `css/style.css`, `css/animations.css`, and `css/responsive.css`; keep interaction logic in `js/main.js`, `js/effects.js`, and `js/music.js`. Store photographs in `assets/images/` and the optional soundtrack at `assets/music/trilha.mp3`.

## Build, Test, and Development Commands

No build system, package manager, or test runner is configured. Open `index.html` in a modern browser to review the experience. Test the five scenes, wish cards, letter control, confetti, keyboard navigation, and music control after adding the soundtrack. Check layouts at desktop and mobile widths and inspect the browser console and network panel for missing assets.

## Coding Style & Naming Conventions

Use UTF-8 and two-space indentation. Use semantic HTML, lowercase kebab-case for new files, descriptive CSS classes, and clear JavaScript names. Keep styles, motion, responsive rules, scene navigation, visual effects, and audio behavior in their existing dedicated files. Use native browser APIs and no framework dependencies. Preserve existing image filenames unless every reference is updated.

## Testing Guidelines

There is no automated suite or coverage requirement. Before submitting, verify that all local CSS, JavaScript, and image paths resolve. Confirm controls work with mouse and keyboard, check focus visibility and screen-reader labels, and ensure motion is reduced when `prefers-reduced-motion` is enabled. The music control should report a missing audio file gracefully.

## Commit & Pull Request Guidelines

Git history was unavailable during preparation, so no established convention could be confirmed. Use short, imperative commit subjects (for example, `Add birthday letter interaction`). Pull requests should summarize the user-facing changes, list manual checks performed, and include screenshots for visual updates. Link a related issue when one exists.

## Security & Configuration

Do not commit credentials or private configuration. Keep media references local and avoid unnecessary third-party scripts or dependencies.

