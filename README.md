# 💻 Hacker Portfolio

> Feel free to clone this repo and use it, amiguinho.

A dark, terminal-aesthetic React portfolio with Matrix rain, neon accents, custom cursor, and Framer Motion animations.

## ⚡ Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🔧 Tech Stack

- **Vite** + **React 18**
- **Tailwind CSS** (custom hacker theme)
- **Framer Motion** (scroll & hover animations)
- **JetBrains Mono** font

## 📁 Structure

```
src/
├── App.jsx              # All components (Hero, Skills, Projects, Hobbies, Footer)
├── main.jsx             # Entry point
├── index.css            # Tailwind + custom effects (scanlines, cursor, scrollbar)
└── data/
    └── projects.json    # ← Edit this to add/remove projects
```

## ✏️ Customizing Projects

Edit `src/data/projects.json`. Each project:

```json
{
  "id": 7,
  "title": "My Cool Project",
  "description": "What it does and why it's cool.",
  "url": "https://myproject.com",        // optional — omit or set "" to hide
  "category": "Backend",
  "languages": ["Rust", "Go"],
  "repoLink": "https://github.com/...",  // optional
  "demoLink": null                       // null or "" = no button shown
}
```

> Any field that is `null`, `""`, or omitted will **not** render a button. Zero broken links.

## 🎨 Hacker Color Palette

| Token             | Value     | Usage               |
|-------------------|-----------|---------------------|
| `hack-bg`         | `#0a0c0f` | Page background     |
| `hack-surface`    | `#0f1117` | Input / code blocks |
| `hack-card`       | `#141820` | Project cards       |
| `hack-green`      | `#00ff41` | Primary accent      |
| `hack-cyan`       | `#00e5ff` | Secondary accent    |
| `hack-comment`    | `#4a6650` | Muted / comments    |
| `hack-text`       | `#c8ffd4` | Body text           |

## 🚀 Build for Production

```bash
npm run build
npm run preview
```

Output in `dist/`.

## 🌐 Deploy to GitHub Pages

This project is configured for:
- Repository: `Chyper00/portifolio`
- URL: `https://chyper00.github.io/portifolio`

Deploy command:

```bash
npm run deploy
```

If this is your first push, make sure the repository is connected as `origin` and your branch is on GitHub.

## 🖼️ Set Your Avatar

Copy `.env.example` to `.env` and replace the values with your own links.

```bash
cp .env.example .env
```

Avatar and social links are loaded from env vars:

- `VITE_AVATAR_URL`
- `VITE_SOCIAL_DISCORD`
- `VITE_SOCIAL_LINKEDIN`
- `VITE_SOCIAL_TWITTER`
- `VITE_SOCIAL_MEDIUM`

Example `.env`:

```env
VITE_AVATAR_URL=https://your-image-url-here
VITE_SOCIAL_DISCORD=https://discord.com/users/your-id
VITE_SOCIAL_LINKEDIN=https://linkedin.com/in/your-user
VITE_SOCIAL_TWITTER=https://twitter.com/your-user
VITE_SOCIAL_MEDIUM=https://medium.com/@your-user
```

---

*// exit code 0 — have fun hacking*
