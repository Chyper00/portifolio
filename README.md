# Diego Rocha — Portfolio

Interactive IDE-style portfolio for **Diego (dos Santos) Rocha**, Senior Fullstack Engineer.

Live: [chyper00.github.io/portifolio](https://chyper00.github.io/portifolio)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Tech stack

- **Vite** + **React 18**
- **Tailwind CSS** (IDE dark theme)
- **Framer Motion** (panel transitions)
- **DM Sans** + **JetBrains Mono**

## Project structure

```
src/
├── App.jsx           # IDE shell, views, command palette
├── main.jsx
├── index.css         # IDE tokens & components
└── data/
    └── profile.js    # ← edit your content here
```

## Customize content

All copy, projects, and links live in `src/data/profile.js`.

```js
const profile = {
  fullName: 'Diego (dos Santos) Rocha',
  name: 'Diego',
  headline: '...',
  techStack: ['Node.js', 'TypeScript', ...],
  expertise: [...],
  interests: [...],
  soloProjects: [...],
  teamProjects: [...],
  socialLinks: [...],
}
```

Each project:

```js
{
  id: 1,
  title: 'My Project',
  description: 'What it does.',
  url: 'https://...',       // optional — omit or "" to hide link
  category: 'Solo',         // or 'Team'
  languages: ['React', 'Node.js'],
}
```

## Environment variables

```bash
cp .env.example .env
```

| Variable | Purpose |
|----------|---------|
| `VITE_AVATAR_URL` | Profile image URL |
| `VITE_SOCIAL_LINKEDIN` | LinkedIn profile |
| `VITE_SOCIAL_GITHUB` | GitHub profile |
| `VITE_SOCIAL_TWITTER` | Twitter / X |
| `VITE_SOCIAL_MEDIUM` | Medium blog |

## Keyboard shortcuts (in the app)

| Shortcut | Action |
|----------|--------|
| `⌘K` / `Ctrl+K` | Open command palette |
| `1` – `6` | Jump to file in explorer |

## Build & deploy

```bash
npm run build
npm run preview
npm run deploy   # GitHub Pages → dist/
```

Configured for `https://chyper00.github.io/portifolio` (`base: '/portifolio/'` in `vite.config.js`).

## Color tokens

| Token | Value | Usage |
|-------|-------|-------|
| `ide-bg` | `#0c0c10` | Editor background |
| `ide-surface` | `#12121a` | Sidebar / panels |
| `accent` | `#7c6aef` | Primary accent |
| `text` | `#e2e2ef` | Primary text |

---

Built with React. Fork it, make it yours.
