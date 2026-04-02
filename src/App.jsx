import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import profile from './data/profile'

function getBiosVersion(birthDate = '1992-04-23') {
  const now = new Date()
  const birth = new Date(birthDate)
  let age = now.getFullYear() - birth.getFullYear()
  const hadBirthdayThisYear =
    now.getMonth() > birth.getMonth() ||
    (now.getMonth() === birth.getMonth() && now.getDate() >= birth.getDate())

  if (!hadBirthdayThisYear) age -= 1

  const major = Math.floor(age / 10)
  const minor = age % 10
  const currentMonth = now.getMonth() + 1

  return `v.${major}.${minor}.${currentMonth}`
}

// ─── Custom Cursor ─────────────────────────────────────────────────────────────
function CustomCursor() {
  const dot  = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      if (dot.current)  { dot.current.style.left  = e.clientX + 'px'; dot.current.style.top  = e.clientY + 'px' }
      if (ring.current) { ring.current.style.left = e.clientX + 'px'; ring.current.style.top = e.clientY + 'px' }
    }
    const onEnter = () => { dot.current?.classList.add('hovering'); ring.current?.classList.add('hovering') }
    const onLeave = () => { dot.current?.classList.remove('hovering'); ring.current?.classList.remove('hovering') }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}

// ─── Typing Effect ──────────────────────────────────────────────────────────────
function TypedText({ text, delay = 0, speed = 50, className = '' }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone]           = useState(false)

  useEffect(() => {
    let i = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) { clearInterval(interval); setDone(true) }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, delay, speed])

  return (
    <span className={className}>
      {displayed}
      {!done && <span className="animate-blink text-hack-green">█</span>}
    </span>
  )
}

// ─── Section Wrapper ────────────────────────────────────────────────────────────
function Section({ id, children, className = '' }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`py-20 px-4 max-w-5xl mx-auto ${className}`}
    >
      {children}
    </motion.section>
  )
}

// ─── Section Label ──────────────────────────────────────────────────────────────
function SectionLabel({ command, label }) {
  return (
    <div className="mb-10">
      <p className="text-hack-comment text-sm mb-1"># ── {label} ──────────────────</p>
      <h2 className="text-hack-green text-xl font-bold">
        <span className="text-hack-dim mr-2">$</span>{command}
      </h2>
    </div>
  )
}

// ─── Skill Badge ────────────────────────────────────────────────────────────────
const SKILL_COLORS = {
  React:          { bg: '#001a2e', border: '#00e5ff', text: '#00e5ff' },
  TypeScript:     { bg: '#001428', border: '#3178c6', text: '#5aa3f5' },
  Python:         { bg: '#1a1a00', border: '#f7d600', text: '#f7d600' },
  'Machine Learning': { bg: '#1a0028', border: '#bf5fff', text: '#bf5fff' },
  'Web Scraping': { bg: '#001a0a', border: '#00cc66', text: '#00cc66' },
  'Web Crawler':  { bg: '#001a0a', border: '#00cc66', text: '#00cc66' },
  Blockchain:     { bg: '#1a0a00', border: '#ff6b00', text: '#ff8c00' },
  Web3:           { bg: '#1a0014', border: '#ff00aa', text: '#ff44bb' },
  Linux:          { bg: '#0a0a1a', border: '#00ff41', text: '#00ff41' },
  'Node.js':      { bg: '#001a00', border: '#6cc24a', text: '#6cc24a' },
  GraphQL:        { bg: '#1a0016', border: '#e535ab', text: '#e535ab' },
  Cypress:        { bg: '#001a12', border: '#17202a', text: '#00c9a7' },
  TDD:            { bg: '#1a1a00', border: '#ffd700', text: '#ffd700' },
}

function SkillBadge({ skill }) {
  const color = SKILL_COLORS[skill] || { bg: '#141820', border: '#1e2530', text: '#00ff41' }
  return (
    <motion.div
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold cursor-default select-none"
      style={{
        background: color.bg,
        border: `1px solid ${color.border}44`,
        color: color.text,
        boxShadow: `0 0 8px ${color.border}22`,
        transition: 'all 0.2s ease',
      }}
      onHoverStart={e => {
        e.target.style.borderColor = color.border
        e.target.style.boxShadow   = `0 0 12px ${color.border}66`
      }}
      onHoverEnd={e => {
        e.target.style.borderColor = `${color.border}44`
        e.target.style.boxShadow   = `0 0 8px ${color.border}22`
      }}
    >
      <span style={{ color: color.border, opacity: 0.7 }}>▸</span>
      {skill}
    </motion.div>
  )
}

// ─── Category Filter ────────────────────────────────────────────────────────────
// ─── Project Card ───────────────────────────────────────────────────────────────
const CATEGORY_COLORS = {
  Blockchain:       '#ff8c00',
  'Machine Learning': '#bf5fff',
  Integration:      '#00e5ff',
  'Dev Tools':      '#00ff41',
  Backend:          '#6cc24a',
}

function ProjectCard({ project, index }) {
  const catColor = CATEGORY_COLORS[project.category] || '#00ff41'
  const links = [
    project.repoLink && { href: project.repoLink, label: 'repo', icon: '⎇' },
    project.demoLink && { href: project.demoLink, label: 'demo', icon: '↗' },
    project.url      && { href: project.url,      label: 'link', icon: '⬡' },
  ].filter(Boolean)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="relative group rounded-sm border border-hack-border bg-hack-card p-5 flex flex-col gap-3 overflow-hidden"
      style={{ transition: 'border-color 0.2s ease, box-shadow 0.2s ease' }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${catColor}66`
        e.currentTarget.style.boxShadow   = `0 0 20px ${catColor}22`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = ''
        e.currentTarget.style.boxShadow   = ''
      }}
    >
      {/* Corner accent */}
      <span
        className="absolute top-0 right-0 w-0 h-0 group-hover:w-10 group-hover:h-10 transition-all duration-300"
        style={{
          borderTop:   `2px solid ${catColor}`,
          borderRight: `2px solid ${catColor}`,
        }}
      />

      {/* Category */}
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-sm"
          style={{ background: `${catColor}18`, color: catColor, border: `1px solid ${catColor}44` }}
        >
          {project.category}
        </span>
        <span className="text-hack-comment text-xs">#{String(project.id).padStart(2,'0')}</span>
      </div>

      {/* Title */}
      <h3 className="text-hack-text font-bold text-base leading-tight group-hover:text-hack-green transition-colors duration-200">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-hack-comment text-xs leading-relaxed flex-1">
        // {project.description}
      </p>

      {/* Languages */}
      <div className="flex flex-wrap gap-1.5">
        {project.languages.map(lang => (
          <span key={lang} className="tag-chip">{lang}</span>
        ))}
      </div>

      {/* Links */}
      {links.length > 0 && (
        <div className="flex gap-2 pt-1 border-t border-hack-border">
          {links.map(({ href, label, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-hack-comment hover:text-hack-green border border-hack-border hover:border-hack-green px-2.5 py-1 rounded-sm transition-all duration-150 hover:shadow-neon-sm"
            >
              <span>{icon}</span> {label}
            </a>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ─── Hobby Card ─────────────────────────────────────────────────────────────────
function HobbyCard({ emoji, name, comment, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center gap-2 p-5 rounded-sm border border-hack-border bg-hack-card text-center cursor-default"
    >
      <motion.span
        className="text-3xl"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, delay: delay + 0.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {emoji}
      </motion.span>
      <span className="text-hack-green font-bold text-sm">{name}</span>
      <span className="text-hack-comment text-xs leading-relaxed">// {comment}</span>
    </motion.div>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['about', 'skills', 'projects', 'hobbies']

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-hack-bg/95 backdrop-blur-sm border-b border-hack-border' : ''
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="text-hack-green font-bold text-sm hover:shadow-neon-sm transition-all">
          <span className="text-hack-comment">~/</span>portfolio
        </a>
        <div className="flex gap-1">
          {links.map(link => (
            <a
              key={link}
              href={`#${link}`}
              className="px-3 py-1 text-xs text-hack-comment hover:text-hack-green hover:bg-hack-surface rounded-sm transition-all duration-150"
            >
              ./{link}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────────
function Hero() {
  const [phase, setPhase] = useState(0)
  const biosVersion = getBiosVersion()

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 1400),
      setTimeout(() => setPhase(3), 2600),
      setTimeout(() => setPhase(4), 4000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center px-4 max-w-5xl mx-auto pt-20">
      {/* Boot sequence */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-12 text-hack-comment text-xs space-y-0.5"
      >
        <p><span className="text-hack-dim">BIOS</span> {biosVersion} - loading personality matrix... (this is my age)</p>
        <p><span className="text-hack-dim">CPU</span>: Brain (overclocked, poorly cooled)</p>
        <p><span className="text-hack-dim">RAM</span>: Coffee-dependent, ~8 cups/day</p>
        <p><span className="text-hack-green">OK</span>  all systems nominal. <span className="animate-blink">▐</span></p>
      </motion.div>

      <div className="space-y-6">
        {/* Prompt + whoami */}
        <div>
          <p className="text-hack-comment text-sm mb-2">guest@portfolio:~$</p>
          {phase >= 1 && (
            <h1 className="text-hack-green text-3xl sm:text-5xl font-black leading-none glitch-text">
              <TypedText text="whoami" speed={80} />
            </h1>
          )}
        </div>

        {phase >= 2 && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <div className="border-l-2 border-hack-green pl-5 space-y-2">
              <p className="text-hack-text text-lg sm:text-2xl font-bold">
                {profile.name} <span className="text-hack-comment font-normal text-base">// {profile.subtitle}</span>
              </p>
              <p className="text-hack-comment text-sm">
                📍 {profile.location} &nbsp;·&nbsp;
                <span className="text-hack-cyan">{profile.timezone}</span>
                &nbsp;(I'm awake, I promise)
              </p>
            </div>
          </motion.div>
        )}

        {phase >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="bg-hack-surface border border-hack-border rounded-sm p-4 font-mono text-sm">
              <span className="text-hack-comment">$ </span>
              <span className="text-hack-green">sudo break things</span>
              <span className="text-hack-text"> --fix</span>
              <span className="text-hack-comment"> | {profile.role} // {profile.experience}</span>
            </div>
          </motion.div>
        )}

        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <a
              href="#projects"
              className="px-5 py-2 text-sm font-bold bg-hack-green text-hack-bg rounded-sm hover:shadow-neon transition-all duration-200 hover:-translate-y-0.5"
            >
              ./view-projects
            </a>
            <a
              href="#skills"
              className="px-5 py-2 text-sm font-bold border border-hack-green text-hack-green rounded-sm hover:bg-hack-green hover:text-hack-bg transition-all duration-200"
            >
              ./inspect-skills
            </a>
          </motion.div>
        )}

        {phase >= 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl pt-3"
          >
            <div className="border border-hack-border bg-hack-card rounded-sm p-4 flex items-center gap-4">
              <img
                src={profile.avatarPath}
                alt={profile.avatarAlt}
                className="w-16 h-16 rounded-sm object-cover border border-hack-border"
              />
              <div className="text-xs text-hack-comment leading-relaxed">
                <p className="text-hack-green font-bold">{profile.name}</p>
                <p>aka {profile.nicknames.join(', ')}</p>
                <p>{profile.aiProductivityLine}</p>
              </div>
            </div>
            <div className="border border-hack-border bg-hack-card rounded-sm p-4 text-xs text-hack-comment space-y-2">
              <p className="text-hack-green font-bold">Find me on the internet:</p>
              <div className="flex flex-wrap gap-2">
                {profile.socialLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 border border-hack-border rounded-sm hover:border-hack-green hover:text-hack-green transition-all duration-150"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Scroll hint */}
      <motion.div
        className="mt-16 flex flex-col items-start gap-1 text-hack-comment text-xs"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>scroll to continue ↓</span>
      </motion.div>
    </section>
  )
}

// ─── Skills ────────────────────────────────────────────────────────────────────
const SKILLS = [
  'React', 'TypeScript', 'Python', 'Machine Learning',
  'Web Scraping', 'Web Crawler', 'Blockchain', 'Web3',
  'Linux', 'Node.js', 'GraphQL', 'Cypress', 'TDD',
]

function Skills() {
  return (
    <Section id="skills">
      <SectionLabel command="inspect skills --verbose" label="capabilities" />
      <div className="flex flex-wrap gap-3">
        {SKILLS.map((skill, i) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
          >
            <SkillBadge skill={skill} />
          </motion.div>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-hack-comment text-xs"
      >
        <span className="text-hack-green">{'>'}</span> {SKILLS.length} skills loaded.{' '}
        <span className="text-hack-dim">// WARNING: may cause spontaneous debugging at 2am</span>
      </motion.p>
    </Section>
  )
}

// ─── Projects ──────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <Section id="projects">
      <SectionLabel command="ls -la ./projects" label="work" />
      <div className="space-y-10">
        <div>
          <p className="text-hack-green text-sm font-bold mb-4">$ ls ./late-night-solo-projects</p>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {profile.soloProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div>
          <p className="text-hack-cyan text-sm font-bold mb-4">$ ls ./team-projects</p>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {profile.teamProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <p className="mt-6 text-hack-comment text-xs">
        <span className="text-hack-green">{'>'}</span> {profile.soloProjects.length + profile.teamProjects.length} project(s) loaded.{' '}
        <span className="text-hack-dim">// edit in src/data/profile.js</span>
      </p>
    </Section>
  )
}

// ─── Hobbies ──────────────────────────────────────────────────────────────────
const HOBBIES = [
  { emoji: '🏋️', name: 'Gym',       comment: 'Compiling gains. Build failed: skipped leg day.' },
  { emoji: '🥋', name: 'Jiu-Jitsu', comment: 'Social network with submission attempts.' },
  { emoji: '🎨', name: 'Drawing',   comment: 'GUI for the brain. No dark mode yet.' },
  { emoji: '🎸', name: 'Ukulele',   comment: '4-string instrument, 0 excuses not to play.' },
]

function Hobbies() {
  return (
    <Section id="hobbies">
      <SectionLabel command="apt-get install hobbies" label="interests" />
      <div className="bg-hack-surface border border-hack-border rounded-sm p-4 text-xs mb-8 space-y-1">
        <p><span className="text-hack-dim">Reading package lists…</span></p>
        <p><span className="text-hack-dim">Building dependency tree…</span></p>
        <p><span className="text-hack-green">4 newly installed packages: gym jiu-jitsu drawing ukulele</span></p>
        <p className="text-hack-comment">// Debugging my biceps and my code. One core dump at a time.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {HOBBIES.map((h, i) => (
          <HobbyCard key={h.name} {...h} delay={i * 0.1} />
        ))}
      </div>
    </Section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-hack-border py-10 px-4">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-hack-comment text-xs">
        <div className="space-y-1">
          <p>© 2025 &nbsp;|&nbsp; <span className="text-hack-green">echo</span> <span className="text-hack-text">'Keep hacking, stay curious'</span></p>
          <p className="text-hack-muted">// Made with caffeine, Linux, and questionable life choices.</p>
        </div>
        <div className="flex gap-4">
          {profile.socialLinks.map(link => (
            <a
              key={link.label}
              href={link.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-hack-comment hover:text-hack-green transition-colors duration-150 flex items-center gap-1.5 text-xs"
            >
              <span>◈</span> {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Matrix Rain Background (subtle) ──────────────────────────────────────────
function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas  = canvasRef.current
    const ctx     = canvas.getContext('2d')
    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    const cols    = Math.floor(W / 20)
    const drops   = Array(cols).fill(1)
    const chars   = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ'

    const draw = () => {
      ctx.fillStyle = 'rgba(10,12,15,0.05)'
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = '#00ff4115'
      ctx.font = '14px JetBrains Mono'
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * 20, y * 20)
        if (y * 20 > H && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }

    const interval = setInterval(draw, 60)
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    return () => { clearInterval(interval); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0, opacity: 0.4 }}
    />
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="relative min-h-screen bg-hack-bg scanlines crt-vignette">
      <CustomCursor />
      <MatrixRain />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Skills />
          <Projects />
          <Hobbies />
        </main>
        <Footer />
      </div>
    </div>
  )
}
