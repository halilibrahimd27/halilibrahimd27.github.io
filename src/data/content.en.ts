import type { Content } from './types';
import type { EducationId, ExperienceId, VolunteeringId } from './timeline';
import type { ProjectId } from './projects';
import type { SkillGroupId } from './skills';

/**
 * ENGLISH CONTENT — every English string on the site lives here.
 *
 * Mirrors content.tr.ts field for field through the `Content` contract.
 * Change a field in one file and forget the other → `pnpm build` fails.
 */
export const en = {
  meta: {
    locale: 'en',
    htmlLang: 'en-GB',
    title: 'Halil İbrahim Dürmüş — DevSecOps Engineer',
    description:
      'DevSecOps Engineer. Proxmox and Docker infrastructure, GitOps-based CI/CD pipelines, defence layers that reach from pre-commit to runtime.',
    ogImageAlt: 'Halil İbrahim Dürmüş — DevSecOps Engineer',
    ogTagline: 'Secure software delivery · Durable operations · Offensive mindset',
    usesTitle: 'Uses — Halil İbrahim Dürmüş',
    usesDescription:
      'The infrastructure, delivery pipeline and security tooling I work with daily.',
  },

  ui: {
    skipToContent: 'Skip to content',
    sectionsLabel: 'Sections',
    themeToggle: 'Toggle theme',
    themeLight: 'Light theme',
    themeDark: 'Dark theme',
    languageLabel: 'Language',
    switchTo: 'Türkçe',
    backToTop: 'Back to top',
    externalLink: 'opens in a new tab',
    stars: 'stars',
    updatedPrefix: 'updated',
    liveDemo: 'Live',
    sourceCode: 'Source',
    present: 'present',
    inPreparation: 'in preparation',
    backHome: 'Back to home',
  },

  nav: {
    about: 'About',
    experience: 'Experience',
    projects: 'Projects',
    skills: 'Skills',
    principles: 'Principles',
    education: 'Education',
    contact: 'Contact',
  },

  hero: {
    name: 'Halil İbrahim Dürmüş',
    role: 'DevSecOps Engineer',
    positioning:
      'I run production-scale Proxmox and Docker infrastructure, and I own the defence layers that reach from pre-commit to runtime along with the GitOps-based CI/CD pipelines that carry them. My focus is secure software delivery (SAST/SCA/SBOM, signed images), durable operations (SLOs, blameless postmortems, runbook hygiene) and an offensive mindset.',
    locationLabel: 'Location',
    location: 'Türkiye · Remote (UTC+3)',
    ctaGithub: 'GitHub',
    ctaLinkedin: 'LinkedIn',
    ctaCv: 'Download CV',
    statusLabel: 'Languages',
    statusValue: 'Turkish · English (B1–B2)',
  },

  about: {
    heading: 'About',
    paragraphs: [
      'At Ayssoft I am the company’s only DevOps engineer: the entire delivery chain from commit to production is mine. I have provisioned and now operate more than 100 virtual machines across multiple Proxmox nodes, and over 90 container-based repositories are built and deployed with GitHub Actions.',
      'I came to infrastructure from full-stack Java and React development, and that shapes how I work: I build hardening, secret management and observability that development teams adopt rather than route around.',
      'I lead production incident response — Proxmox LVM thin-pool exhaustion, Redis AOF corruption, MySQL 8 physical restores, Kafka offset recovery, multi-tenant Docker stack failures. I am currently preparing for OSCP+, CKA and CKS.',
    ],
    languagesLabel: 'Languages',
    languages: ['Turkish — native', 'English — CEFR B1–B2'],
  },

  experience: {
    heading: 'Experience',
    items: {
      ayssoft: {
        role: 'DevSecOps Engineer',
        summary:
          'Sole DevOps engineer; owner of the delivery chain from commit through to production.',
        bullets: [
          'Provisioned and operated 100+ virtual machines across multiple Proxmox VE nodes: Docker workloads, HAProxy and Nginx reverse proxies, database services.',
          'GitHub Actions CI/CD for 90+ container-based repositories; removed duplicated pipeline code with reusable workflows and BuildKit layer caching.',
          'Embedded security controls in the pipeline: SAST and software composition analysis, container image scanning with Trivy, centralised secret management with HashiCorp Vault, least-privileged registry and access tokens.',
          'Led production incident response: Proxmox LVM thin-pool exhaustion, Redis AOF corruption, MySQL 8 physical restores, Kafka offset recovery, multi-tenant Docker stack failures.',
          'Designed the technical hiring process for DevOps candidates: hands-on test cases and review checkpoints built on the company’s actual in-house stack.',
        ],
      },
      'inonu-ddo': {
        role: 'Junior DevSecOps Engineer',
        summary: 'CI/CD and server operations for applications built in-house by the university.',
        bullets: [
          'Managed CI/CD processes for applications developed in-house by the university.',
          'Configured Linux application servers, Nginx reverse proxy rules and TLS termination for internal and public-facing services.',
          'Carried out application deployment, systemd service management, user and permission management, and baseline server hardening.',
          'Documented deployment and server configuration procedures so projects transfer cleanly between student development teams.',
        ],
      },
      shiftsoft: {
        role: 'Penetration Testing Intern',
        summary:
          'The compulsory summer internship of the Software Engineering programme, in the company’s software security department.',
        bullets: [
          'Conducted penetration tests on the company’s own products: reconnaissance, authentication and authorisation testing, and common web vulnerability categories aligned with the OWASP Top 10.',
          'Reported findings to the development team with reproduction steps, impact assessments and remediation recommendations.',
        ],
      },
      'unity-dev': {
        role: 'Founder & Manager',
        summary:
          'Ran both delivery and business operations at a software development company I founded.',
        bullets: [
          'Customer acquisition, project scoping, pricing and delivery commitments.',
          'Led the development team across task allocation, code reviews and release planning; mentored junior developers on version control and deployment practices.',
          'Delivered custom web and application projects end to end, from requirements analysis through deployment.',
        ],
      },
      rextabi: {
        role: 'Software Engineer',
        summary:
          'Full-stack development with Java (Spring Boot, JPA) on the back end and React on the front end.',
        bullets: [
          'Designed relational database schemas and REST APIs.',
          'Managed features through every stage from requirements analysis to production release.',
        ],
      },
    },
  },

  projects: {
    heading: 'Projects',
    intro:
      'All public. Star counts and last-updated dates are pulled from GitHub when the page loads; if that fails, the last known values are shown.',
    moreHeading: 'Other projects',
    allReposLabel: 'All repositories on GitHub',
    items: {
      'cheat-sheet': {
        tagline:
          'Local-first pentest workbench — 5,040 commands with their expected output, a box-solving workspace (services, credential vault, timeline, generated report), 16 exam/lab session presets and a Markdown write-up editor. Runs on Node or fully in the browser.',
      },
      'tenant-trace': {
        tagline:
          'Multi-tenant isolation auditor — proves whether tenant A can reach tenant B’s data. Seeds two tenants, attacks one as the other, and reports confirmed BOLA/IDOR leaks with canary-backed evidence. Works as a CI merge gate.',
      },
      'devsecops-handbook': {
        tagline:
          'A Turkish DevOps · DevSecOps · SRE · Platform Engineering reference book. 21 topics, 125+ deep dives, 9 cheatsheets, 25+ production-ready templates, 65K+ lines — Kubernetes, Terraform, GitOps, FinOps, Observability, LLMOps, KVKK/GDPR.',
      },
      'databases-stack': {
        tagline:
          '12 databases on one server, from one panel. Memory limits are sized from real measurements, the standby takes over automatically when the primary fails, and backups are proved by actually restoring them. Docker Compose + Kubernetes, internal TLS included.',
      },
      'pipeline-101-lab': {
        tagline:
          'A hands-on CI/CD security lab. Five security flaws are left in on purpose; fixing all of them and getting the scorecard to 5/5 is the task.',
      },
      'api-sentinel': {
        tagline:
          'Severity-aware monitoring that automatically detects response schema changes in third-party APIs. Plugin-based — alert channel, auth and storage are runtime plugins. FastAPI + APScheduler + deepdiff.',
      },
      'wakapi-admin': {
        tagline:
          'Self-hosted Wakapi stack with a custom Flask admin panel. Real-time active users, a domain tag system, AI editor detection (Cursor/Copilot/Claude Code/Codeium), PDF reports and a team leaderboard; Prometheus + Grafana included.',
      },
      'goad-light-vmware-windows': {
        tagline:
          'A complete guide and fix scripts for deploying the GOAD-Light Active Directory lab on VMware Workstation with a Windows host. For OSCP / AD practice.',
      },
      'file-crypter': {
        tagline:
          'File and folder encryption with AES-256-CBC + PBKDF2 — a single command from the terminal, Turkish CLI.',
      },
      'ai-dev-swarm': {
        tagline:
          'A local autonomous multi-agent development system: it ideates, plans, builds and ships projects to GitHub on its own.',
      },
      'living-api-contract-guardian': {
        tagline:
          'A CI service that reverse-engineers de-facto API contracts by statically analysing client repositories and replaying recorded traffic, then runs evolution rules (additive vs. breaking) on every schema diff.',
      },
      kurulum: {
        tagline:
          'A from-scratch walkthrough of a single-node (all-in-one) Kubernetes installation on Ubuntu 22.04.',
      },
      yepaket: {
        tagline:
          'A marketplace that matches food left unsold at the end of the day with buyers at a third of the price. Flutter mobile app, React web and merchant panel, NestJS API, PostgreSQL + PostGIS.',
      },
      'trafik-analiz': {
        tagline:
          'Classifying 43 traffic signs on the GTSRB dataset with a 4-block CNN trained from scratch — a Deep Neural Networks course project.',
      },
      RealTimeObjectDetection: {
        tagline:
          'Real-time object detection with YOLOv8; a custom-trained model, an Angular 18 interface and a Flask service.',
      },
    },
  },

  skills: {
    heading: 'Skills',
    intro: 'The tooling I use in production, grouped by area.',
    groups: {
      languages: 'Languages',
      platform: 'Infrastructure & Platform',
      security: 'Security',
      observability: 'Observability',
      cicd: 'CI/CD',
      data: 'Data',
    },
  },

  principles: {
    heading: 'Engineering principles',
    intro: 'The short list I fall back on when making a call.',
    items: [
      {
        title: 'Self-host first, decide later',
        body: 'Running a service on your own infrastructure is the shortest path to actually understanding it. Only then do you know what you depend on when it breaks.',
      },
      {
        title: 'Write the tool you need',
        body: 'Where the off-the-shelf answer stops is where the real work starts. If you are solving a problem by hand for the second time, it is a tool.',
      },
      {
        title: 'Defence that does not know the attacker stays on paper',
        body: 'You only learn whether a control works by trying it like an attacker. A penetration test is the verification of the checklist.',
      },
      {
        title: 'Every incident earns a write-up',
        body: 'Blameless postmortem, updated runbook, repeatable fix. An incident that is never written down happens a second time.',
      },
      {
        title: 'Pragmatism > purity',
        body: 'A perfect pipeline the team avoids is worse than a good one it uses. Adoption is a security property.',
      },
    ],
  },

  education: {
    heading: 'Education & Volunteering',
    educationLabel: 'Education',
    volunteeringLabel: 'Volunteering',
    certificationsLabel: 'Certifications',
    items: {
      msc: { degree: 'MSc — Software Engineering', note: 'Thesis track' },
      bsc: { degree: 'BSc — Software Engineering' },
    },
    volunteeringOrg: 'İnönü University Cyber Security Society',
    volunteeringRoles: {
      member: 'Member',
      board: 'Board Member',
      lead: 'Manager',
    },
    volunteeringNote:
      'Planning the community’s annual activity programme, coordinating the board, representing the community within the university, and running hands-on technical workshops that introduce students to security fundamentals.',
    certifications: [
      { name: 'OSCP+', full: 'OffSec Certified Professional' },
      { name: 'CKA', full: 'Certified Kubernetes Administrator' },
      { name: 'CKS', full: 'Certified Kubernetes Security Specialist' },
    ],
  },

  contact: {
    heading: 'Contact',
    intro:
      'I am working towards a security architecture role in an international engineering team. You can reach me through the channels below.',
    emailLabel: 'Email',
    emailPending: 'Coming soon',
    githubLabel: 'GitHub',
    linkedinLabel: 'LinkedIn',
    cvLabel: 'CV (PDF)',
  },

  uses: {
    heading: 'Uses',
    intro: 'The infrastructure and tooling I rely on day to day.',
    groups: [
      {
        title: 'Infrastructure',
        items: [
          { name: 'Proxmox VE', note: 'Self-hosted virtualisation; multiple nodes, 100+ VMs.' },
          {
            name: 'Docker · Docker Compose',
            note: 'The packaging unit for nearly every workload.',
          },
          { name: 'Kubernetes', note: 'Container orchestration; hardened with kube-bench.' },
          { name: 'VMware Workstation', note: 'For Active Directory attack labs.' },
          { name: 'Nginx · HAProxy', note: 'Reverse proxying and TLS termination.' },
        ],
      },
      {
        title: 'Delivery pipeline',
        items: [
          { name: 'GitHub Actions', note: 'Reusable workflows, BuildKit caching.' },
          { name: 'Argo CD', note: 'Deployment through GitOps.' },
          { name: 'Terraform · Ansible', note: 'Infrastructure and configuration as code.' },
        ],
      },
      {
        title: 'Security',
        items: [
          { name: 'Trivy', note: 'Container image and dependency scanning.' },
          { name: 'Semgrep', note: 'SAST, wired into the pipeline as a merge gate.' },
          { name: 'HashiCorp Vault', note: 'Centralised secret management.' },
          { name: 'Cosign', note: 'Image signing and verification.' },
        ],
      },
      {
        title: 'Observability',
        items: [
          { name: 'Prometheus · Grafana', note: 'Metrics and dashboards.' },
          { name: 'ELK', note: 'Centralised logging.' },
          { name: 'Sentry', note: 'Application error tracking.' },
          { name: 'Wakapi (self-hosted)', note: 'My own coding-time analytics.' },
        ],
      },
    ],
  },

  notFound: {
    code: '404',
    title: 'Page not found',
    body: 'The page you are looking for may have moved, or it may never have existed.',
  },

  footer: {
    builtWith: 'Built with Astro and Tailwind. No third-party analytics, no cookies.',
    sourceLabel: 'Source code',
    rights: 'Halil İbrahim Dürmüş',
  },
} as const satisfies Content<ExperienceId, ProjectId, SkillGroupId, EducationId, VolunteeringId>;
