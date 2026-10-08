// ============================================================
// data/config.ts — Single source of truth for all site content
// ============================================================

export const siteMeta = {
  name: "Shivprasad Mane",
  title: "Shivprasad Mane — Full-Stack Software Engineer",
  description:
    "Full-Stack Software Engineer specializing in FinTech platforms with React, NestJS, TypeScript, and PostgreSQL. Building scalable multi-tenant systems at Mettarev.",
  url: "https://shivprasadmane.dev",
  ogImage: "/og",
  twitterHandle: "@shivprasadmane",
  keywords: [
    "full-stack engineer",
    "react developer",
    "nestjs",
    "typescript",
    "postgresql",
    "fintech",
    "portfolio",
    "shivprasad mane",
  ],
};

// ─── Navigation ────────────────────────────────────────────────
export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

// ─── Hero ───────────────────────────────────────────────────────
export const hero = {
  name: "Shivprasad Mane",
  role: "Full-Stack Engineer",
  location: "Pune, India",
  timeZone: "Asia/Kolkata",
  available: true,
  availability: "Open to new opportunities",
  // Headline is split so the middle phrase can be set in the serif italic
  headline: {
    before: "I engineer",
    accent: "financial software",
    after: "that holds up in production.",
  },
  tagline:
    "Full-stack engineer at Mettarev, shipping a 51-module multi-tenant FinTech platform end to end — from NestJS APIs and PostgreSQL schemas to the React interfaces people actually use.",
  ctaPrimary: { label: "See selected work", href: "#work" },
  ctaSecondary: { label: "Get in touch", href: "#contact" },
  resumeUrl: "/resume.pdf",
  metrics: [
    { value: 370, suffix: "", label: "REST endpoints designed" },
    { value: 82, suffix: "", label: "Postgres tables modelled" },
    { value: 400, suffix: "+", label: "RBAC guard checkpoints" },
    { value: 300, suffix: "+", label: "Managed DB transactions" },
  ],
};

// Lines streamed by the "live system" panel in the hero.
export const systemLog = [
  { kind: "req", method: "POST", path: "/v1/settlements/run", status: 201, ms: 84 },
  { kind: "cron", name: "daily-settlement", note: "1,284 rows reconciled" },
  { kind: "req", method: "GET", path: "/v1/tenants/:code/policies", status: 200, ms: 23 },
  { kind: "guard", note: "CASL · can(update, Policy) → allow" },
  { kind: "req", method: "PATCH", path: "/v1/clients/4821", status: 200, ms: 41 },
  { kind: "cron", name: "bank-sync", note: "3 accounts updated" },
  { kind: "req", method: "POST", path: "/v1/documents/render", status: 202, ms: 112 },
  { kind: "event", note: "docusign.envelope.completed → webhook ok" },
  { kind: "req", method: "GET", path: "/v1/reports/monthly", status: 200, ms: 57 },
  { kind: "guard", note: "CASL · can(delete, Payout) → deny" },
  { kind: "cron", name: "monthly-reconciliation", note: "0 discrepancies" },
  { kind: "req", method: "POST", path: "/v1/payouts", status: 409, ms: 12 },
] as const;

// ─── About ──────────────────────────────────────────────────────
export const about = {
  avatar: "/images/avatar.svg",
  statement:
    "The transactions, permissions, and cron jobs that quietly keep money moving correctly — that's where I do my best work.",
  now: [
    { label: "Building", value: "Multi-tenant FinTech platform @ Mettarev" },
    { label: "Exploring", value: "AI agents in real-time video" },
    { label: "Reading", value: "Designing Data-Intensive Applications" },
  ],
  education: {
    degree: "B.Tech, Computer Science",
    school: "G H Raisoni College of Engineering, Pune",
  },
  bio: [
    "I'm a Full-Stack Software Engineer specializing in FinTech platforms, with deep expertise in React, NestJS, TypeScript, and PostgreSQL. Currently at Mettarev, I architect and ship features across a 51-module, multi-tenant white-label FinTech platform used by real financial businesses.",
    "I enjoy the complexity that comes with production-grade systems — designing 370-endpoint REST APIs, enforcing role-based access via CASL policy models, ensuring transactional consistency across financial flows, and automating operations with cron jobs and webhook integrations.",
    "B.Tech in Computer Science from G H Raisoni College of Engineering, Pune. When I'm not building at Mettarev, I'm working on AI-powered apps, P2P systems, and ML projects.",
  ],
  highlights: [
    { value: "1+", label: "Years Experience" },
    { value: "3+", label: "Projects Built" },
    { value: "370+", label: "API Endpoints" },
    { value: "51", label: "Modules Shipped" },
  ],
};

// ─── Skills ─────────────────────────────────────────────────────
export type Skill = {
  name: string;
  icon: string;
  category: "frontend" | "backend" | "devops" | "tools";
  level: number; // 1-5
  color: string;
};

export const skills: Skill[] = [
  // Frontend
  { name: "React", icon: "Atom", category: "frontend", level: 5, color: "#61DAFB" },
  { name: "Next.js", icon: "Layers", category: "frontend", level: 5, color: "#a78bfa" },
  { name: "TypeScript", icon: "FileCode", category: "frontend", level: 5, color: "#3178C6" },
  { name: "Tailwind CSS", icon: "Wind", category: "frontend", level: 5, color: "#06B6D4" },
  { name: "shadcn/ui", icon: "Sparkles", category: "frontend", level: 4, color: "#7c3aed" },
  // Backend
  { name: "Node.js", icon: "Server", category: "backend", level: 5, color: "#339933" },
  { name: "NestJS", icon: "Zap", category: "backend", level: 5, color: "#E0234E" },
  { name: "PostgreSQL", icon: "Database", category: "backend", level: 5, color: "#336791" },
  { name: "REST APIs", icon: "Globe", category: "backend", level: 5, color: "#FF6B35" },
  { name: "tRPC", icon: "Share2", category: "backend", level: 4, color: "#398CCB" },
  { name: "WebSockets", icon: "Network", category: "backend", level: 4, color: "#F97316" },
  { name: "TypeORM", icon: "Code", category: "backend", level: 4, color: "#E83524" },
  // DevOps
  { name: "Docker", icon: "Container", category: "devops", level: 4, color: "#2496ED" },
  { name: "AWS EC2", icon: "Cloud", category: "devops", level: 4, color: "#FF9900" },
  { name: "CI/CD", icon: "GitBranch", category: "devops", level: 4, color: "#F05032" },
  { name: "Linux", icon: "Terminal", category: "devops", level: 4, color: "#FCC624" },
  // Tools
  { name: "Git", icon: "GitMerge", category: "tools", level: 5, color: "#F05032" },
  { name: "Java", icon: "Cpu", category: "tools", level: 4, color: "#F89820" },
  { name: "Python", icon: "BookOpen", category: "tools", level: 4, color: "#3776AB" },
  { name: "System Design", icon: "Pen", category: "tools", level: 4, color: "#7c3aed" },
];

export const skillCategories = [
  { id: "all", label: "All" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps" },
  { id: "tools", label: "Tools" },
] as const;

// ─── Projects ───────────────────────────────────────────────────
export type CaseStudy = {
  problem: string;
  solution: string;
  impact: string;
  metrics?: { label: string; value: string }[];
};

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  thumbnail: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  caseStudy?: CaseStudy;
};

export const projects: Project[] = [
  {
    id: "meetai",
    title: "MeetAI",
    description:
      "AI-powered video meeting platform where users deploy intelligent agents that auto-join and assist in live meetings in real time.",
    longDescription:
      "MeetAI is an AI-driven video meeting platform that lets users create custom AI agents and host real-time meetings with automated in-call assistance. Built with Next.js 15, tRPC, and PostgreSQL, featuring full CRUD modules for agents and meetings with filtering, search, pagination, and RBAC. Integrates OpenAI and Gemini APIs for real-time speech and response automation inside live calls.",
    thumbnail: "/images/project-luminary.svg",
    tags: ["Next.js", "TypeScript", "React", "tRPC", "PostgreSQL", "OpenAI", "shadcn/ui"],
    githubUrl: "https://github.com/ShivMane",
    featured: true,
    caseStudy: {
      problem:
        "There was no platform that let developers deploy custom AI agents that could autonomously join video meetings, respond to questions, and handle session lifecycle events end-to-end.",
      solution:
        "Built a full-stack video meeting platform with Next.js 15 and tRPC. AI agents powered by OpenAI and Gemini APIs auto-join meetings via webhook-based session lifecycle events. React Query caching and server-client hydration keep the UI snappy even during live calls.",
      impact:
        "Delivered a working AI meeting assistant platform with fully automated agent lifecycle — from creation, to auto-join, to real-time in-call interaction — with zero manual intervention.",
      metrics: [
        { value: "2", label: "AI APIs integrated" },
        { value: "CRUD", label: "Full agent & meeting mgmt" },
        { value: "Webhook", label: "Session automation" },
        { value: "RBAC", label: "Role-based access" },
      ],
    },
  },
  {
    id: "filepeer",
    title: "FilePeer",
    description:
      "Secure peer-to-peer file sharing platform with direct transfers — no intermediary cloud storage, powered by a Java socket backend on AWS EC2.",
    longDescription:
      "FilePeer is a P2P file sharing platform built for secure, real-time transfers without routing data through intermediary cloud storage. A custom Java backend using socket programming and REST APIs handles the transfer layer. The backend runs on AWS EC2 behind an Nginx reverse proxy; the Next.js frontend is hosted on Vercel. Invite-based sharing uses temporary port allocation for secure, one-time access.",
    thumbnail: "/images/project-tradepulse.svg",
    tags: ["Java", "Socket Programming", "Next.js", "TypeScript", "AWS EC2", "Nginx", "Vercel"],
    githubUrl: "https://github.com/ShivMane",
    featured: true,
    caseStudy: {
      problem:
        "Existing file sharing tools route data through cloud intermediaries, introducing latency and privacy risks for sensitive file transfers — especially in low-trust or high-security contexts.",
      solution:
        "Designed a Java backend with raw socket programming for direct peer-to-peer transfers. Deployed on AWS EC2 behind Nginx. Invite-based sharing generates temporary port allocations so each transfer session is isolated and expires after use.",
      impact:
        "Achieved secure P2P file transfer with zero cloud intermediary, full EC2 deployment with Nginx routing, and a polished Next.js frontend on Vercel — production-ready architecture from scratch.",
      metrics: [
        { value: "P2P", label: "No cloud intermediary" },
        { value: "AWS EC2", label: "Backend deployment" },
        { value: "Nginx", label: "Reverse proxy" },
        { value: "Invite-only", label: "Secure access model" },
      ],
    },
  },
  {
    id: "disease-prediction",
    title: "Predictive Disease Analysis",
    description:
      "ML system predicting diabetes, heart disease, and Parkinson's using Logistic Regression, Random Forest, and SVM — 85% accuracy with an interactive Streamlit dashboard.",
    longDescription:
      "Built an ML system that predicts three diseases (diabetes, heart disease, Parkinson's) from clinical datasets. Used Logistic Regression, Random Forest, and SVM with feature selection on UCI datasets via scikit-learn. An interactive Streamlit dashboard allows real-time predictions from user-input clinical values, with matplotlib visualisations for feature importance and model performance.",
    thumbnail: "/images/project-aurora.svg",
    tags: ["Python", "scikit-learn", "Streamlit", "pandas", "NumPy", "Machine Learning"],
    githubUrl: "https://github.com/ShivMane",
    featured: false,
  },
];

export const projectTags = [
  "All",
  "Next.js",
  "React",
  "TypeScript",
  "Java",
  "Python",
  "PostgreSQL",
  "AWS EC2",
];

// ─── Experience ─────────────────────────────────────────────────
export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  tech: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Developer",
    company: "Mettarev",
    period: "May 2026 — Present",
    location: "Hybrid",
    description:
      "Shipping features across a 51-module, multi-tenant white-label FinTech platform with a partner-code-driven architecture supporting runtime tenant configuration.",
    achievements: [
      "Designed and maintained a 370-endpoint REST API across 49 NestJS controllers and an 82-table PostgreSQL schema, enforcing RBAC via a CASL policy model with 400+ guard checkpoints.",
      "Guaranteed transactional consistency across financial flows using 300+ managed DB transactions and 15 composite unique constraints for insert-level idempotency.",
      "Automated recurring operations with 10 production cron jobs (daily settlement, bank sync, monthly reconciliation) and integrated DocuSign, SendGrid, and Puppeteer.",
      "Drove 35 Handlebars PDF templates and 47 MJML email templates that replaced fully manual document workflows.",
    ],
    tech: ["React", "TypeScript", "NestJS", "PostgreSQL", "CASL", "SendGrid", "DocuSign"],
  },
  {
    role: "Software Developer (Intern)",
    company: "Mettarev",
    period: "Feb 2026 — Apr 2026",
    location: "Hybrid",
    description:
      "Built features and RESTful APIs for the same multi-tenant FinTech platform, delivering client, policy, and financial modules with production bug fixes.",
    achievements: [
      "Engineered reusable React components with validation, pagination, filtering, and role-based access control across multiple financial modules.",
      "Delivered client, policy, and financial modules end-to-end — from REST API design to frontend integration — while fixing production bugs.",
    ],
    tech: ["React", "TypeScript", "NestJS", "TypeORM", "PostgreSQL"],
  },
  {
    role: "Software Development Intern",
    company: "SmartTech Solutions",
    period: "Jan 2025 — Jun 2025",
    location: "Remote",
    description:
      "Built and deployed a full MERN-stack e-commerce application, improving UI responsiveness and cutting average page load time by 30%.",
    achievements: [
      "Built and deployed a full MERN-stack e-commerce application, improving UI responsiveness and reducing average page load time by 30%.",
      "Implemented JWT and bcrypt-based authentication and authorization, strengthening platform security and session handling.",
      "Designed REST APIs for product management, cart operations, and user interactions, ensuring reliable frontend–backend communication.",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "REST APIs"],
  },
];

// ─── Process / How I Work ────────────────────────────────────────
export type ProcessStep = {
  step: number;
  icon: string;
  title: string;
  description: string;
};

export const workProcess: ProcessStep[] = [
  {
    step: 1,
    icon: "Compass",
    title: "Discover",
    description:
      "I start by understanding the problem space, business constraints, and data model before writing a line of code — requirements first, always.",
  },
  {
    step: 2,
    icon: "Lightbulb",
    title: "Design",
    description:
      "I design the API contract, DB schema, and component tree upfront. Good architecture decisions made early save weeks of refactoring later.",
  },
  {
    step: 3,
    icon: "Code2",
    title: "Build",
    description:
      "I write type-safe, RBAC-enforced, tested code in small reviewable increments — full-stack, from NestJS controllers to React components.",
  },
  {
    step: 4,
    icon: "Rocket",
    title: "Ship",
    description:
      "I deploy with CI/CD pipelines, monitor with production cron jobs, and iterate based on real usage data and stakeholder feedback.",
  },
];

// ─── Writing / Blog Posts ────────────────────────────────────────
export type BlogPost = {
  title: string;
  publication: string;
  url: string;
  date: string;
  readTime: string;
  description: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Add Your First Article Title Here",
    publication: "Dev.to",
    url: "#",
    date: "2025-01-15",
    readTime: "5 min read",
    description:
      "Replace this with a short summary of your article. Share your insights on NestJS, FinTech architecture, or anything you've learned building production systems.",
  },
  {
    title: "Building Multi-Tenant Systems with NestJS",
    publication: "Medium",
    url: "#",
    date: "2024-12-01",
    readTime: "8 min read",
    description:
      "Update this card with a real article. Documenting your experience with the 51-module FinTech platform would be incredibly valuable to other engineers.",
  },
  {
    title: "CASL + NestJS: Fine-Grained RBAC in Practice",
    publication: "Personal Blog",
    url: "#",
    date: "2024-10-20",
    readTime: "6 min read",
    description:
      "Replace with a real post. Your experience designing 400+ CASL guard checkpoints across a production FinTech platform is genuinely unique knowledge worth sharing.",
  },
];

// ─── Testimonials ───────────────────────────────────────────────
export type Testimonial = {
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Your Manager at Mettarev",
    role: "Engineering Lead",
    company: "Mettarev",
    avatar: "/images/avatar-priya.svg",
    quote:
      "Replace this with a real testimonial from your manager or a colleague at Mettarev. A quote about your ownership of the 370-endpoint API and FinTech delivery would be highly credible.",
  },
  {
    name: "A Senior Dev You Worked With",
    role: "Senior Engineer",
    company: "Mettarev",
    avatar: "/images/avatar-marcus.svg",
    quote:
      "Ask a team member for a 2-3 sentence quote about working with you. Specifics — like the cron jobs you automated or the CASL policy model you designed — make testimonials much more compelling.",
  },
  {
    name: "SmartTech Mentor or Manager",
    role: "Tech Lead",
    company: "SmartTech Solutions",
    avatar: "/images/avatar-sofia.svg",
    quote:
      "Reach out to someone from your SmartTech internship for a short quote. Even a brief testimonial about how you reduced page load time by 30% or your API design quality would be valuable.",
  },
  {
    name: "A Peer or Classmate",
    role: "Software Engineer",
    company: "GHRCE",
    avatar: "/images/avatar-james.svg",
    quote:
      "A testimonial from a peer who collaborated with you on projects or saw your work up close can be just as powerful as one from a manager. Replace this with a real quote.",
  },
];

// ─── Social Links ────────────────────────────────────────────────
export const socialLinks = [
  { label: "GitHub", href: "https://github.com/ShivMane", icon: "Github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/shivprasad-mane", icon: "Linkedin" },
  { label: "Twitter", href: "https://twitter.com/shivprasadmane", icon: "Twitter" },
  { label: "Email", href: "mailto:shivprasadmane190@gmail.com", icon: "Mail" },
];

// ─── Contact ─────────────────────────────────────────────────────
export const contact = {
  heading: "Let's Work Together",
  subheading:
    "I'm open to freelance projects, collaborations, and full-time opportunities. Drop me a line and I'll get back to you within 24 hours.",
  email: "shivprasadmane190@gmail.com",
  location: "Pune, India",
};
