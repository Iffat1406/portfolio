// ─── Single source of truth for every piece of résumé content on the site ─────
// Edit here and it updates across the whole portfolio.

export const PROFILE = {
  name:      'Iffat Shaikh',
  firstName: 'Iffat',
  role:      'Full Stack Developer',
  roleShort: 'Software Engineer',
  location:  'Mumbai, India',
  email:     'iffatshaikh1406@gmail.com',
  phone:     '+91 99870 19644',
  phoneRaw:  '+919987019644',
  tagline:   'I build production systems that factories, sensors and people rely on every day.',
  bio:
    "I'm Iffat Shaikh, a full stack developer at KVAR Technologies in Mumbai. I build " +
    'real-time industrial software — manufacturing execution systems, IoT telemetry ' +
    'platforms and monitoring dashboards — using React, TypeScript, Node.js and PostgreSQL. ' +
    'My work runs in production: secure REST APIs, WebSocket live data, and AWS deployments ' +
    'that plants and devices depend on around the clock.',
  // Year the first professional role started — powers the "years experience" counter
  experienceSince: 2023,
};

export const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/Iffat1406' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/iffat-shaikh/' },
  { label: 'Email',    href: `mailto:${PROFILE.email}` },
];

// Hero marquee tags — the stack, at a glance
export const CORE_STACK = ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'];

// ─── Experience ──────────────────────────────────────────────────────────────
// NOTE: exact start/end months weren't on the résumé — update `period` values below.

export const EXPERIENCE = [
  {
    id:      'kvar-swe',
    company: 'KVAR Technologies',
    role:    'Software Engineer',
    period:  '2024 — Present',
    location:'Mumbai, India',
    current: true,
    summary:
      'Own end-to-end delivery of a full-stack Andon Manufacturing Execution System — ' +
      'from database design to production deployment.',
    points: [
      'Developed and maintained a full-stack Andon Manufacturing Execution System (MES) using React, TypeScript, Node.js, Express.js and PostgreSQL.',
      'Designed and implemented secure REST APIs with JWT authentication, Role-Based Access Control (RBAC) and middleware-based authorization.',
      'Implemented real-time production monitoring and alert notifications using WebSockets and Socket.IO.',
      'Optimized PostgreSQL queries, indexing and database design to improve application performance and scalability.',
      'Implemented security enhancements including CORS, Content Security Policy, rate limiting and input validation — resolving VAPT findings.',
      'Deployed and maintained applications on AWS using Docker, monitoring production systems and troubleshooting live issues.',
      'Built production dashboards, reporting modules, fault management, escalation workflows and device management features.',
      'Collaborated with cross-functional teams using Git and Agile for feature development, code reviews and production releases.',
    ],
    stack: ['React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'Socket.IO', 'AWS', 'Docker'],
  },
  {
    id:      'kvar-intern',
    company: 'KVAR Technologies',
    role:    'Software Engineer Intern',
    period:  '2023 — 2024',
    location:'Mumbai, India',
    current: false,
    summary:
      'Joined as an intern building backend services and React interfaces alongside senior developers.',
    points: [
      'Developed RESTful APIs using Node.js, Express.js and PostgreSQL for backend services.',
      'Built responsive frontend components using React and Material UI.',
      'Created SQL queries and integrated backend services with frontend applications.',
      'Assisted in debugging, testing and shipping new features while collaborating with senior developers.',
      'Gained hands-on experience with Git, Docker, PostgreSQL and modern full-stack development practices.',
    ],
    stack: ['Node.js', 'Express.js', 'PostgreSQL', 'React', 'Material UI', 'Git'],
  },
];

export const EDUCATION = [
  {
    school: 'Usha Pravin Gandhi College',
    degree: 'Bachelor of Science in Information Technology',
    period: 'June 2021 — May 2024',
    location: 'Mumbai',
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    id:       1,
    num:      '01',
    slug:     'andon-mes',
    title:    'ANDON MES',
    fullTitle:'Andon Manufacturing Execution System',
    category: 'Manufacturing Execution',
    year:     '2025 — Present',
    yearShort:'2025',
    tags:     ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    stack:    ['React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL', 'JWT', 'Socket.IO', 'AWS', 'Docker'],
    summary:
      'A full-stack MES for real-time production monitoring, fault management and escalation workflows on the factory floor.',
    points: [
      'Real-time production monitoring, fault management and escalation workflows for manufacturing lines.',
      'Secure REST APIs with JWT authentication, Role-Based Access Control and middleware-based authorization.',
      'WebSocket-driven live notifications and production dashboards for workstation displays.',
      'PostgreSQL query and index tuning, plus security hardening based on VAPT recommendations.',
    ],
    gradient: 'linear-gradient(135deg, #0E1130 0%, #312E81 55%, #6366F1 100%)',
  },
  {
    id:       2,
    num:      '02',
    slug:     'aqi-platform',
    title:    'AQI PLATFORM',
    fullTitle:'AQI Monitoring Platform — KVAR Weather Logger',
    category: 'IoT / Environmental',
    year:     '2024 — 2025',
    yearShort:'2024',
    tags:     ['Node.js', 'PostgreSQL', 'Chart.js', 'AWS'],
    stack:    ['Node.js', 'Express.js', 'PostgreSQL', 'Bootstrap', 'Chart.js', 'Leaflet', 'AWS'],
    summary:
      'An IoT air-quality monitoring platform for live environmental data, map-based views and device fleet management.',
    points: [
      'Dashboards for live sensor data, historical reports, map-based monitoring and device allocation.',
      'Data ingestion APIs for weather-logger devices, with PostgreSQL storage tuned for high-frequency writes.',
      'Automated reporting, calibration tracking and alert management in production on AWS.',
    ],
    gradient: 'linear-gradient(135deg, #041C26 0%, #0E5A6E 55%, #22D3EE 100%)',
  },
  {
    id:       3,
    num:      '03',
    slug:     'tracesentinel',
    title:    'TRACESENTINEL',
    fullTitle:'TraceSentinel IoT Monitoring System',
    category: 'IoT Telemetry',
    year:     '2024',
    yearShort:'2024',
    tags:     ['Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    stack:    ['Node.js', 'Express.js', 'PostgreSQL', 'Docker', 'AWS EC2'],
    summary:
      'Backend services for IoT device telemetry — ingesting, storing and reporting on real-time sensor data at scale.',
    points: [
      'Backend APIs for processing IoT device telemetry and storing real-time sensor data in PostgreSQL.',
      'Secure device communication and dashboard reporting, deployed with Docker on AWS EC2.',
      'Query and index optimization to support large-scale sensor data processing.',
    ],
    gradient: 'linear-gradient(135deg, #16102E 0%, #4C1D95 55%, #A78BFA 100%)',
  },
];

// ─── Skills ──────────────────────────────────────────────────────────────────

export const SKILLS = [
  { cat: 'Languages',      items: ['JavaScript', 'TypeScript', 'Python', 'SQL', 'Java'] },
  { cat: 'Frontend',       items: ['React.js', 'Material UI', 'HTML5', 'CSS3', 'Bootstrap'] },
  { cat: 'Backend',        items: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'RBAC', 'WebSockets'] },
  { cat: 'Databases',      items: ['PostgreSQL', 'TimescaleDB'] },
  { cat: 'Cloud & DevOps', items: ['AWS EC2', 'Docker', 'Git', 'GitHub'] },
  { cat: 'Tools',          items: ['Postman', 'VS Code', 'pgAdmin', 'Figma', 'Terraform (Basics)'] },
];

// Flat list used for pill rows
export const SKILL_PILLS = [
  'React', 'TypeScript', 'Node.js', 'Express.js', 'PostgreSQL',
  'WebSockets', 'Docker', 'AWS', 'REST APIs', 'JWT', 'Python', 'Git',
];

export const TECH_COUNT = SKILLS.reduce((n, g) => n + g.items.length, 0);

// ─── Stats ───────────────────────────────────────────────────────────────────

const yearsExperience = Math.max(
  1,
  new Date().getFullYear() - PROFILE.experienceSince,
);

export const STATS = [
  { num: yearsExperience, suffix: '+', label: 'Years Building Software' },
  { num: PROJECTS.length, suffix: '',  label: 'Production Systems Shipped' },
  { num: TECH_COUNT,      suffix: '+', label: 'Technologies in the Toolkit' },
];

// ─── What I care about ───────────────────────────────────────────────────────

export const VALUES = [
  {
    icon: '◈',
    title: 'Ships to Production',
    desc:  'Every system I build runs live — monitored, deployed on AWS, and depended on by real operators, not just demoed.',
  },
  {
    icon: '◎',
    title: 'Secure by Default',
    desc:  'JWT auth, RBAC, CSP, rate limiting and input validation from day one. I close VAPT findings, I don\'t defer them.',
  },
  {
    icon: '◇',
    title: 'Performance in the Query',
    desc:  'Most slow apps are slow databases. I profile queries, design indexes, and make PostgreSQL do the heavy lifting well.',
  },
];

// ─── Journey timeline ────────────────────────────────────────────────────────

export const TIMELINE = [
  { year: '2021', text: 'Started a B.Sc. in Information Technology at Usha Pravin Gandhi College, Mumbai.' },
  { year: '2022', text: 'Went deep on JavaScript, SQL and the fundamentals behind how the web actually works.' },
  { year: '2023', text: 'Joined KVAR Technologies as a Software Engineer Intern — first REST APIs shipped with Node.js and PostgreSQL.' },
  { year: '2024', text: 'Graduated and stepped up to Software Engineer. Built TraceSentinel IoT telemetry backends and deployed on AWS with Docker.' },
  { year: '2025', text: 'Led development of the Andon MES — real-time production monitoring, RBAC, WebSockets and security hardening.' },
  { year: '2026', text: 'Scaling the MES and its dashboards, and open to building the next ambitious production system.' },
];
