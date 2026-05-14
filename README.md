# Diego Rocha — Senior Software Engineer Portfolio

> Feel free to clone this repo and use it.

A dark, terminal-aesthetic React portfolio for senior software engineers — neon accents, custom cursor, and Framer Motion animations.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Tech Stack

- **Vite** + **React 18**
- **Tailwind CSS** (custom terminal theme)
- **Framer Motion** (scroll & hover animations)
- **JetBrains Mono** font

## Structure

```
src/
├── App.jsx              # All components (Hero, Skills, Projects, Hobbies, Footer)
├── main.jsx             # Entry point
├── index.css            # Tailwind + custom effects (scanlines, cursor, scrollbar)
└── data/
    └── profile.js       # ← Edit this to add/remove projects and copy
```

## Customizing Projects

Edit `src/data/profile.js`. Each project:

```js
{
  id: 7,
  title: 'My Cool Project',
  description: 'What it does and why it matters.',
  url: 'https://myproject.com',   // optional — omit or "" to hide
  category: 'Solo',               // or 'Team'
  languages: ['React', 'Node.js'],
}
```

## Color Palette

| Token             | Value     | Usage               |
|-------------------|-----------|---------------------|
| `hack-bg`         | `#0a0c0f` | Page background     |
| `hack-surface`    | `#0f1117` | Input / code blocks |
| `hack-card`       | `#141820` | Project cards       |
| `hack-green`      | `#00ff41` | Primary accent      |
| `hack-cyan`       | `#00e5ff` | Secondary accent    |
| `hack-comment`    | `#4a6650` | Muted / comments    |
| `hack-text`       | `#c8ffd4` | Body text           |

## Build for Production

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

Live: [chyper00.github.io/portifolio](https://chyper00.github.io/portifolio)

## Avatar & Social Links

```bash
cp .env.example .env
```

- `VITE_AVATAR_URL`
- `VITE_SOCIAL_DISCORD`
- `VITE_SOCIAL_LINKEDIN`
- `VITE_SOCIAL_TWITTER`
- `VITE_SOCIAL_MEDIUM`

---

*// build well. ship often.*
