import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import profile from './data/profile'

// ─── File tree config ──────────────────────────────────────────────────────────
const FILES = [
  { id: 'readme', label: 'README.md', icon: '📄', shortcut: '1' },
  { id: 'experience', label: 'experience.json', icon: '📋', shortcut: '2' },
  { id: 'projects', label: 'projects/', icon: '📁', shortcut: '3' },
  { id: 'skills', label: 'skills.ts', icon: '⚡', shortcut: '4' },
  { id: 'interests', label: 'interests.md', icon: '✦', shortcut: '5' },
  { id: 'contact', label: 'contact.sh', icon: '📡', shortcut: '6' },
]

const FILE_MAP = Object.fromEntries(FILES.map(f => [f.id, f]))

// ─── Icons ─────────────────────────────────────────────────────────────────────
const IconClose = () => (
  <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.5" fill="#ff5f57" /></svg>
)
const IconMin = () => (
  <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.5" fill="#febc2e" /></svg>
)
const IconMax = () => (
  <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4.5" fill="#28c840" /></svg>
)

// ─── Command Palette ───────────────────────────────────────────────────────────
function CommandPalette({ open, onClose, onSelect }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  const filtered = FILES.filter(f =>
    f.label.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.15 }}
        className="relative w-full max-w-md bg-ide-surface border border-ide-border rounded-xl shadow-panel overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <motion.div className="flex items-center gap-2 px-4 py-3 border-b border-ide-border">
          <span className="text-accent font-mono text-sm">›</span>
          <input
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="go to file..."
            className="flex-1 bg-transparent text-text text-sm outline-none placeholder:text-text-muted font-mono"
          />
          <span className="kbd">esc</span>
        </motion.div>
        <div className="max-h-64 overflow-y-auto py-1">
          {filtered.map(f => (
            <button
              key={f.id}
              onClick={() => { onSelect(f.id); onClose() }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-ide-panel transition-colors"
            >
              <span>{f.icon}</span>
              <span className="font-mono text-sm text-text-secondary">{f.label}</span>
              <span className="ml-auto kbd">{f.shortcut}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-center text-text-muted text-sm font-mono">no matches</p>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ─── Content views ─────────────────────────────────────────────────────────────
function ReadmeView() {
  return (
    <div className="animate-fade-in space-y-8 font-mono text-sm leading-relaxed">
      <div>
        <p className="text-syntax-keyword text-base mb-2">
          # <span className="text-text">{profile.fullName}</span>
        </p>
        <p className="text-syntax-comment pl-4 border-l-2 border-ide-border">
          {'> '}{profile.headline}
        </p>
      </div>

      <div>
        <p className="text-syntax-keyword mb-3">## about</p>
        <div className="space-y-3 text-text-secondary pl-1">
          <p>
            hi, i'm <span className="text-syntax-string">{profile.name.toLowerCase()}</span>.
            {' '}{profile.role.toLowerCase()} based in{' '}
            <span className="text-syntax-string">{profile.location.toLowerCase()}</span>.
            {' '}{profile.experience} shipping software.
          </p>
          <p>{profile.philosophy}</p>
          <p>{profile.mentoring}</p>
        </div>
      </div>

      <div>
        <p className="text-syntax-keyword mb-3">## engineer.ts</p>
        <motion.div className="rounded-lg border border-ide-border bg-ide-panel p-4 overflow-x-auto">
          <p className="text-syntax-keyword">
            export const <span className="text-syntax-func">engineer</span> = {'{'}
          </p>
          <div className="pl-4 space-y-1">
            <p><span className="text-syntax-property">role</span>: <span className="text-syntax-string">"{profile.role}"</span>,</p>
            <p><span className="text-syntax-property">location</span>: <span className="text-syntax-string">"{profile.location}"</span>,</p>
            <p><span className="text-syntax-property">experience</span>: <span className="text-syntax-string">"{profile.experience}"</span>,</p>
            <p><span className="text-syntax-property">timezone</span>: <span className="text-syntax-string">"{profile.timezone}"</span>,</p>
            <p className="pt-1">
              <span className="text-syntax-property">stack</span>: [
              {profile.techStack.map((t, i) => (
                <span key={t}>
                  <span className="text-syntax-string"> "{t}"</span>
                  {i < profile.techStack.length - 1 ? ', ' : ''}
                </span>
              ))}
              ],
            </p>
          </div>
          <p className="text-syntax-keyword">{'}'}</p>
        </motion.div>
      </div>

      <div>
        <p className="text-syntax-keyword mb-3">## explore this repo</p>
        <div className="rounded-lg border border-ide-border overflow-hidden text-xs">
          <div className="grid grid-cols-[1fr_auto] gap-4 px-4 py-2 bg-ide-panel border-b border-ide-border text-text-muted">
            <span>file</span>
            <span>what's inside</span>
          </div>
          {[
            ['experience.json', 'teams & companies'],
            ['projects/', 'solo side projects'],
            ['skills.ts', 'technical expertise'],
            ['interests.md', 'currently exploring'],
            ['contact.sh', 'reach out'],
          ].map(([file, desc]) => (
            <div key={file} className="grid grid-cols-[1fr_auto] gap-4 px-4 py-2 border-b border-ide-border last:border-0 hover:bg-ide-panel/50 transition-colors">
              <span className="text-syntax-string">{file}</span>
              <span className="text-text-muted">{desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="text-syntax-keyword mb-3">## shortcuts</p>
        <div className="space-y-1.5 text-text-secondary">
          <p><span className="text-syntax-type">⌘K</span> — command palette</p>
          <p><span className="text-syntax-type">1–6</span> — jump to file</p>
          <p><span className="text-syntax-type">tabs</span> — open multiple files from sidebar</p>
        </div>
      </div>

      <div>
        <p className="text-syntax-keyword mb-3">## links</p>
        <div className="space-y-1.5">
          {profile.socialLinks.map(link => (
            <p key={link.label}>
              <span className="text-text-muted">- </span>
              <a
                href={link.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-syntax-func hover:text-accent transition-colors"
              >
                {link.label}
              </a>
              <span className="text-syntax-comment"> → {link.url || 'coming soon'}</span>
            </p>
          ))}
        </div>
      </div>

      <p className="text-syntax-comment pt-2 border-t border-ide-border">
        {'// you found README.md — explore the sidebar or hit ⌘K'}
      </p>
    </div>
  )
}

function ExperienceView() {
  return (
    <motion.div className="animate-fade-in">
      <pre className="font-mono text-xs text-syntax-comment mb-6">
        {'// experience.json — teams & companies'}
      </pre>
      <div className="space-y-3">
        {profile.teamProjects.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className="bento-card group"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-text font-medium text-sm group-hover:text-accent transition-colors">
                {job.url ? (
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    {job.title}
                  </a>
                ) : job.title}
              </h3>
              <span className="font-mono text-[10px] text-text-muted shrink-0 px-2 py-0.5 rounded bg-ide-bg border border-ide-border">
                {job.category}
              </span>
            </div>
            <p className="text-text-secondary text-xs leading-relaxed mb-3">{job.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {job.languages.map(l => (
                <span key={l} className="font-mono text-[10px] text-syntax-type px-2 py-0.5 rounded bg-ide-bg">
                  {l}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

function ProjectsView() {
  return (
    <div className="animate-fade-in">
      <pre className="font-mono text-xs text-syntax-comment mb-6">
        {'// projects/ — solo builds, late nights, real problems'}
      </pre>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {profile.soloProjects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bento-card group cursor-default"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-full" />
            <h3 className="text-text font-medium text-sm mb-2 group-hover:text-accent transition-colors">
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {p.title} ↗
                </a>
              ) : p.title}
            </h3>
            <p className="text-text-secondary text-xs leading-relaxed mb-3">{p.description}</p>
            <motion.div className="flex flex-wrap gap-1.5">
              {p.languages.map(l => (
                <span key={l} className="font-mono text-[10px] text-syntax-string">{l}</span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function SkillsView() {
  return (
    <div className="animate-fade-in font-mono text-sm leading-loose">
      <p className="text-syntax-comment mb-4">{'// skills.ts'}</p>
      <p><span className="text-syntax-keyword">export type</span> <span className="text-syntax-type">Expertise</span> =</p>
      <p className="pl-4 text-syntax-keyword">|</p>
      {profile.expertise.map(skill => (
        <p key={skill} className="pl-8 text-syntax-string">"{skill}"</p>
      ))}
      <p className="pl-4 text-syntax-keyword">|</p>
      <p className="mt-6 text-syntax-comment">{'// proficiency: senior-level across the board'}</p>
      <p className="text-syntax-comment">{'// TDD enjoyer. SOLID believer. RFC reader.'}</p>
    </div>
  )
}

function InterestsView() {
  return (
    <div className="animate-fade-in">
      <pre className="font-mono text-xs text-syntax-comment mb-6">{'# interests.md'}</pre>
      <h2 className="text-text font-medium text-lg mb-4">Currently exploring</h2>
      <ul className="space-y-3">
        {profile.interests.map((item, i) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 text-sm text-text-secondary"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            {item}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

function ContactView() {
  return (
    <div className="animate-fade-in font-mono text-sm">
      <p className="text-syntax-comment mb-4">{'#!/bin/bash'}</p>
      <p className="text-syntax-comment mb-6">{'# contact.sh — reach out'}</p>
      <div className="space-y-2 text-text-secondary">
        <p><span className="text-syntax-func">echo</span> <span className="text-syntax-string">"open to interesting problems & hard conversations"</span></p>
        <p className="pt-4 text-syntax-comment"># links</p>
        {profile.socialLinks.map(link => (
          <p key={link.label}>
            <span className="text-syntax-func">open</span>{' '}
            <a
              href={link.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-syntax-string hover:text-accent transition-colors underline"
            >
              "{link.url || link.label}"
            </a>
            <span className="text-syntax-comment"> {' # '}{link.label}</span>
          </p>
        ))}
        <p className="pt-4 text-syntax-comment">
          # made with react. too much coffee. zero regrets.
        </p>
      </div>
    </div>
  )
}

const VIEWS = {
  readme: ReadmeView,
  experience: ExperienceView,
  projects: ProjectsView,
  skills: SkillsView,
  interests: InterestsView,
  contact: ContactView,
}

// ─── Mini terminal ─────────────────────────────────────────────────────────────
function MiniTerminal() {
  const [lines, setLines] = useState([])
  const [cursor, setCursor] = useState(true)

  useEffect(() => {
    const script = [
      { text: '$ whoami', delay: 400 },
      { text: `> ${profile.name.toLowerCase()} — ${profile.role.toLowerCase()}`, delay: 900 },
      { text: '$ cat /etc/location', delay: 1400 },
      { text: `> ${profile.location} (${profile.timezone})`, delay: 1900 },
      { text: '$ echo $STATUS', delay: 2400 },
      { text: '> open to cool problems ✓', delay: 2900 },
    ]
    const timers = script.map(({ text, delay }) =>
      setTimeout(() => setLines(prev => [...prev, text]), delay)
    )
    const blink = setInterval(() => setCursor(c => !c), 530)
    return () => { timers.forEach(clearTimeout); clearInterval(blink) }
  }, [])

  return (
    <div className="border-t border-ide-border bg-ide-title px-4 py-2 font-mono text-[11px] text-text-muted overflow-hidden">
      <div className="flex gap-6 overflow-x-auto whitespace-nowrap">
        {lines.map((line, i) => (
          <span key={i} className={line.startsWith('$') ? 'text-accent' : 'text-text-secondary'}>
            {line}
          </span>
        ))}
        <span className={cursor ? 'opacity-100' : 'opacity-0'}>▋</span>
      </div>
    </div>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeFile, setActiveFile] = useState('readme')
  const [openTabs, setOpenTabs] = useState(['readme'])
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const openFile = useCallback((id) => {
    setActiveFile(id)
    setOpenTabs(prev => prev.includes(id) ? prev : [...prev, id])
    setSidebarOpen(false)
  }, [])

  const closeTab = (id, e) => {
    e.stopPropagation()
    if (openTabs.length === 1) return
    const next = openTabs.filter(t => t !== id)
    setOpenTabs(next)
    if (activeFile === id) setActiveFile(next[next.length - 1])
  }

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen(o => !o)
      }
      if (!paletteOpen && !e.metaKey && !e.ctrlKey && e.key >= '1' && e.key <= '6') {
        const f = FILES[parseInt(e.key) - 1]
        if (f) openFile(f.id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen, openFile])

  const ActiveView = VIEWS[activeFile]

  return (
    <div className="h-screen flex flex-col bg-ide-bg overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center h-9 bg-ide-title border-b border-ide-border shrink-0 px-4 gap-3">
        <div className="flex gap-1.5">
          <IconClose /><IconMin /><IconMax />
        </div>
        <span className="flex-1 text-center font-mono text-[11px] text-text-muted truncate">
          diego.rocha — ~/portfolio
        </span>
        <button
          onClick={() => setPaletteOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded border border-ide-border text-[10px] text-text-muted hover:text-text-secondary hover:border-ide-border-bright transition-colors"
        >
          <span>⌘K</span>
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Activity bar */}
        <div className="hidden sm:flex flex-col items-center w-12 bg-ide-title border-r border-ide-border py-3 gap-3 shrink-0">
          {['📁', '🔍', '⌥', '⚙'].map((icon, i) => (
            <button
              key={i}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm transition-colors ${
                i === 0 ? 'bg-accent-dim text-accent' : 'text-text-muted hover:text-text-secondary hover:bg-ide-panel'
              }`}
            >
              {icon}
            </button>
          ))}
        </div>

        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          sm:translate-x-0
          fixed sm:relative z-40
          w-56 h-full bg-ide-surface border-r border-ide-border
          flex flex-col shrink-0 transition-transform duration-200
        `}>
          <div className="px-3 py-3 border-b border-ide-border">
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Explorer</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <p className="font-mono text-[10px] text-text-muted px-2 py-1 mb-1">PORTFOLIO</p>
            {FILES.map(f => (
              <button
                key={f.id}
                onClick={() => openFile(f.id)}
                className={`file-row w-full ${activeFile === f.id ? 'active' : ''}`}
              >
                <span className="text-[11px]">{f.icon}</span>
                <span className="font-mono truncate">{f.label}</span>
              </button>
            ))}
          </div>
          <div className="p-3 border-t border-ide-border">
            <p className="font-mono text-[10px] text-text-muted leading-relaxed">
              press <span className="kbd">⌘K</span> to jump
              <br />
              <span className="kbd">1</span>–<span className="kbd">6</span> quick nav
            </p>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 bg-black/50 sm:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Editor area */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Tabs */}
          <div className="flex items-center bg-ide-surface border-b border-ide-border overflow-x-auto shrink-0">
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className="sm:hidden px-3 py-2 text-text-muted hover:text-text border-r border-ide-border"
            >
              ☰
            </button>
            {openTabs.map(tabId => {
              const f = FILE_MAP[tabId]
              return (
                <button
                  key={tabId}
                  onClick={() => setActiveFile(tabId)}
                  className={`tab ${activeFile === tabId ? 'active' : ''}`}
                >
                  <span>{f.icon}</span>
                  <span>{f.label}</span>
                  {openTabs.length > 1 && (
                    <span
                      onClick={e => closeTab(tabId, e)}
                      className="ml-1 text-text-muted hover:text-text px-0.5"
                    >
                      ×
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 px-4 py-1.5 bg-ide-bg border-b border-ide-border shrink-0">
            <span className="font-mono text-[10px] text-text-muted">
              ~/portfolio/<span className="text-accent">{FILE_MAP[activeFile]?.label}</span>
            </span>
          </div>

          {/* Content */}
          <motion.div className="flex-1 overflow-y-auto dot-grid">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFile}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="p-5 sm:p-8 max-w-3xl"
              >
                <ActiveView />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <MiniTerminal />
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center h-6 bg-accent px-3 gap-4 shrink-0 font-mono text-[10px] text-white/90">
        <span>⎇ main</span>
        <span className="hidden sm:inline">{profile.location}</span>
        <span className="hidden sm:inline">UTF-8</span>
        <span className="hidden sm:inline">{profile.techStack.slice(0, 4).join(' · ')}</span>
        <span className="ml-auto">{profile.role}</span>
      </div>

      <AnimatePresence>
        {paletteOpen && (
          <CommandPalette
            open={paletteOpen}
            onClose={() => setPaletteOpen(false)}
            onSelect={openFile}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
