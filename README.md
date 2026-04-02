# 💻 Hacker Portfolio

> `$ sudo make me a portfolio --theme=hacker --vibe=lighthearted`

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

---

*// exit code 0 — have fun hacking*
