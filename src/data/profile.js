const avatarPath =
  import.meta.env.VITE_AVATAR_URL ||
  'https://placehold.co/120x120/f1f3f4/1a73e8?text=D'

const socialLinks = [
  { label: 'LinkedIn', url: import.meta.env.VITE_SOCIAL_LINKEDIN || 'https://linkedin.com/in/your-user' },
  { label: 'GitHub', url: import.meta.env.VITE_SOCIAL_GITHUB || 'https://github.com/chyper00' },
  { label: 'Twitter', url: import.meta.env.VITE_SOCIAL_TWITTER || 'https://twitter.com/your-user' },
  { label: 'Medium', url: import.meta.env.VITE_SOCIAL_MEDIUM || 'https://medium.com/@your-user' },
]

const profile = {
  fullName: 'Diego (dos Santos) Rocha',
  name: 'Diego',
  headline:
    'Senior Fullstack Engineer focused on scalable products, system design and high-performance web applications',
  techStack: ['Node.js', 'Python', 'TypeScript', 'React', 'Next.js', 'Vue', 'IA', 'AWS', 'GCP'],
  role: 'Senior Fullstack Engineer',
  experience: '7+ years',
  location: 'Campinas-SP, Brazil',
  timezone: 'UTC-3',
  avatarAlt: 'Diego Rocha',
  avatarPath,
  expertise: [
    'Node.js / TypeScript',
    'Scalable Frontend Architecture',
    'System Design',
    'APIs & Backend Engineering',
    'Clean Architecture & SOLID',
    'TDD / E2E Testing',
    'Product Engineering',
  ],
  mentoring:
    'I also have experience mentoring developers, teaching programming and algorithms, and helping teams improve engineering quality, processes, and productivity.',
  philosophy:
    'Hands-on engineer focused on solving real business problems through simple, scalable, and maintainable solutions.',
  interests: [
    'Fullstack Engineering',
    'Product Engineering',
    'SaaS & Internal Tools',
    'AI-assisted development workflows',
    'High-performance web platforms',
    'Developer Experience & Productivity',
  ],
  socialLinks,
  soloProjects: [
    {
      id: 1,
      title: 'Junta AI Club',
      description: 'Solo late-night project focused on product and community experiments.',
      url: 'https://www.juntaai.club/',
      category: 'Solo',
      languages: ['Product', 'Web'],
    },
    {
      id: 4,
      title: 'Solana Glossary',
      description: 'Personal glossary project for Solana bounty projects.',
      url: '',
      category: 'Solo',
      languages: ['Solana', 'Web3'],
    },
    {
      id: 5,
      title: 'Ethernal Defence',
      description: 'Web tower defense game built with Phaser.js.',
      url: '',
      category: 'Solo',
      languages: ['JavaScript', 'Phaser.js', 'Game Dev'],
    },
    {
      id: 2,
      title: 'Pingu.ink',
      description: 'Independent project focused on product experience and solo execution.',
      url: 'https://www.pingu.ink/pt-br/',
      category: 'Solo',
      languages: ['Web', 'Design'],
    },
    {
      id: 3,
      title: 'Stream Forge',
      description: 'Solo late-night tool built to solve a real streaming workflow need.',
      url: 'https://stream-forge.vercel.app/',
      category: 'Solo',
      languages: ['React', 'Vercel'],
    },
  ],
  teamProjects: [
    {
      id: 101,
      title: 'Zengate',
      description: 'Worked across teams and projects with focus on delivery and product evolution.',
      url: 'https://www.zengate.global/',
      category: 'Team',
      languages: ['Product', 'Web'],
    },
    {
      id: 102,
      title: 'Palmyra',
      description: 'Contributions in product and engineering in a team environment.',
      url: 'https://palmyra.app/',
      category: 'Team',
      languages: ['Web', 'Product'],
    },
    {
      id: 103,
      title: 'Cardano (ADA)',
      description: 'Projects and integrations in the Cardano ecosystem.',
      url: '',
      category: 'Team',
      languages: ['Blockchain', 'Cardano'],
    },
    {
      id: 104,
      title: 'iFood',
      description: 'Participation in multiple teams and projects.',
      url: 'https://www.ifood.com.br/',
      category: 'Team',
      languages: ['Scale', 'Product'],
    },
    {
      id: 105,
      title: 'SmartPOS',
      description: 'Worked as a contractor across multiple fronts.',
      url: 'https://www.smartpos.net.br/',
      category: 'Team',
      languages: ['POS', 'B2B'],
    },
    {
      id: 106,
      title: 'PagBank (contractor)',
      description: 'Contributed to online business solutions and integrations.',
      url: 'https://pagbank.com.br/para-seu-negocio/online/',
      category: 'Team',
      languages: ['Payments', 'Web'],
    },
    {
      id: 107,
      title: 'PagBank Catalog (SmartPOS white-label)',
      description: 'Helped with the PagBank catalog as a SmartPOS white-label solution (possibly discontinued).',
      url: '',
      category: 'Team',
      languages: ['White Label', 'Catalog'],
    },
    {
      id: 108,
      title: 'ZigomaViewer',
      description: '3D project for tomography file visualization. Link will be added later.',
      url: '',
      category: 'Team',
      languages: ['3D', 'Medical Imaging'],
    },
  ],
}

export default profile
