import {
  AlarmClock,
  Binary,
  Bug,
  Cpu,
  Crosshair,
  Fingerprint,
  Flag,
  Network,
  RadioTower,
  ScanSearch,
  Shield,
  Swords,
  TerminalSquare,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type Stat = {
  label: string;
  value: number;
  suffix: string;
  detail: string;
};

export type CardItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  eyebrow?: string;
};

export type ScheduleBlock = {
  day: string;
  title: string;
  summary: string;
  items: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Tracks", href: "#tracks" },
  { label: "Events", href: "#events" },
  { label: "Schedule", href: "#schedule" },
  { label: "Speakers", href: "#speakers" },
  { label: "Partners", href: "https://partner.reconhq.tech" },
  { label: "FAQ", href: "#faq" },
  { label: "Register", href: "/signup" },
];

export const heroStats = [
  { label: "Date", value: "19-21 APR 2026" },
  { label: "Venue", value: "VIT-AP UNIVERSITY" },
  { label: "Participants", value: "600+ OPERATORS" },
  { label: "Duration", value: "72 HOURS" },
];

export const diagonalStats: Stat[] = [
  {
    label: "Participants",
    value: 600,
    suffix: "+",
    detail: "National systems security turnout",
  },
  {
    label: "Side Events",
    value: 10,
    suffix: "+",
    detail: "Villages, labs, and off-axis briefs",
  },
  {
    label: "Night Competitions",
    value: 2,
    suffix: "",
    detail: "CTF and KOTH under live ops pressure",
  },
  {
    label: "Event Scale",
    value: 4.97,
    suffix: "L",
    detail: "INR operating envelope",
  },
];

export const participateCards: CardItem[] = [
  {
    title: "CTF",
    description:
      "Jeopardy-style overnight challenge lanes across web, pwn, crypto, forensics, misc, and OSINT.",
    icon: Flag,
    eyebrow: "OFFENSIVE CORE",
  },
  {
    title: "KOTH",
    description:
      "Target-box domination with hold intervals, resets, anti-cheat telemetry, and blue-red tactical pressure.",
    icon: Trophy,
    eyebrow: "LIVE FIRE",
  },
  {
    title: "AI Red Team Lab",
    description:
      "Prompt injection, jailbreak defense, exploit chains, and mitigation notes inside constrained model sandboxes.",
    icon: Bug,
    eyebrow: "MODEL SECURITY",
  },
  {
    title: "Forensics Sprint",
    description:
      "Fast memory, PCAP, log-triage, and stego mini-cases for responders who prefer proof over noise.",
    icon: Fingerprint,
    eyebrow: "ANALYST DRILL",
  },
  {
    title: "OSINT Corner",
    description:
      "Synthetic personas, metadata trails, and timed inference challenges. No shortcuts, no real-world collateral.",
    icon: ScanSearch,
    eyebrow: "INVESTIGATION",
  },
  {
    title: "Hardware Village",
    description:
      "Badge hacking, firmware basics, and solder-backed experimentation in a controlled equipment zone.",
    icon: Cpu,
    eyebrow: "PHYSICAL SYSTEMS",
  },
  {
    title: "Sponsor Career Clinic",
    description:
      "Resume triage, portfolio reviews, mock interviews, and direct signals from high-performing builders.",
    icon: Users,
    eyebrow: "TALENT PIPELINE",
  },
];

export const trackCards: CardItem[] = [
  {
    title: "Web Exploit Dojo",
    description: "Guided vulnerable-app labs with beginner and advanced lanes.",
    icon: TerminalSquare,
  },
  {
    title: "AI Red Team",
    description: "Hands-on model abuse, guardrail tests, and defense writeups.",
    icon: Bug,
  },
  {
    title: "Forensics",
    description: "Logs, memory dumps, and PCAP triage under time pressure.",
    icon: Fingerprint,
  },
  {
    title: "KOTH",
    description: "Host ownership, persistence, and scoreboard warfare across isolated targets.",
    icon: Crosshair,
  },
  {
    title: "IoT Security",
    description: "Badge labs, firmware review, default creds, and device hardening drills.",
    icon: RadioTower,
  },
  {
    title: "OSINT",
    description: "Metadata extraction, graph reasoning, and inference chains with legal guardrails.",
    icon: Network,
  },
];

export const scheduleBlocks: ScheduleBlock[] = [
  {
    day: "DAY 01",
    title: "Threat Model Alignment",
    summary: "Workshop open, keynote blocks live, side villages activated, overnight CTF armed at 18:00.",
    items: [
      "0900 // registration, QR issuance, zone deployment",
      "1100 // keynote and systems security workshop",
      "1400 // villages open: web exploit dojo, hardware, OSINT, forensics",
      "1800 // CTF briefing and overnight challenge launch",
    ],
  },
  {
    day: "DAY 02",
    title: "Escalation Window",
    summary: "Career clinic, sponsor activations, live queues, and KOTH staging under command supervision.",
    items: [
      "1000 // sponsor clinic, AI red-team lab, forensic sprints",
      "1400 // command staff talks and tactical demos",
      "2130 // KOTH briefing, target windows frozen",
      "2200 // overnight KOTH begins",
    ],
  },
  {
    day: "DAY 03",
    title: "Closeout and Debrief",
    summary: "Final scores, awards, postmortem, and partner visibility locked into the final broadcast.",
    items: [
      "0600 // KOTH ends, validation and anti-cheat review",
      "1000 // finalist acknowledgements and sponsor recap",
      "1400 // awards, documentation handoff, and command debrief",
      "1600 // site shutdown and team offboarding",
    ],
  },
];

export const commandStaff = [
  {
    role: "Event Director",
    people: "Rikhil Nellimarla",
    detail: "Mission owner and escalation point",
  },
  {
    role: "Chief Technical Officer",
    people: "Abhiram Venkat Sai Adabala",
    detail: "Platform integrity and infra oversight",
  },
  {
    role: "Operations Chief",
    people: "Mohammed Faariz, Cheppali Chanu",
    detail: "Field movement, crowd control, incident flow",
  },
  {
    role: "CTF / KOTH Competition Director",
    people: "Vikhyat Shajee Nambiar, Swarnim Bandekar",
    detail: "Rules, challenge windows, adjudication",
  },
  {
    role: "Program and Speakers Lead",
    people: "Aditya J Shettigar, Akshat Abhishek Singh",
    detail: "Briefings, speaker blocks, main-stage timing",
  },
  {
    role: "Sponsorship and Partnerships Lead",
    people: "Ayushi",
    detail: "Sponsor activations, partner logistics, ROI",
  },
  {
    role: "Design, Media, and Broadcast Lead",
    people: "Jahnvi Kotangale",
    detail: "Visual system, screens, and media coverage",
  },
  {
    role: "Volunteer and Logistics Lead",
    people: "Reet Mishra, A. Dharineesh",
    detail: "Shift assignments, help desks, physical flow",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Is Recon a hackathon?",
    answer:
      "No. Recon is a national systems security event with workshop blocks, offensive-security competitions, side villages, and sponsor activations built around real cybersecurity practice.",
  },
  {
    question: "Will offensive security challenges touch live campus systems?",
    answer:
      "Never. All exploit and target activities are sandboxed, explicitly scoped, and isolated from university infrastructure and public targets.",
  },
  {
    question: "Who should register?",
    answer:
      "Security engineers, red-teamers, systems builders, students aiming for offensive security roles, and technical communities that want a serious competitive environment.",
  },
  {
    question: "Can beginners attend?",
    answer:
      "Yes. The site is designed with guided lanes such as the Web Exploit Dojo, OSINT Corner, Forensics Sprint, and Career Clinic so new entrants can learn without diluting the high bar.",
  },
  {
    question: "How are teams handled?",
    answer:
      "The CTF supports solo or teams of up to four. Other villages vary by ruleset, and operator identities are tied to registration for queueing, anti-cheat, and scoring.",
  },
  {
    question: "How do partners participate?",
    answer:
      "Partners activate through challenge-backed demos, career clinics, booths, technical talks, and measurable recruiting touchpoints. The full details live on the partners route.",
  },
];

export const socialLinks = [
  { label: "X", href: "https://x.com/Recon2k26" },
  { label: "Instagram", href: "https://www.instagram.com/recon_2k26" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/recon-events/" },
];

export const partnerLogoPaths = [
  "/logo/VITAP Logo.png",
  "/logo/IIT Madras Logo.png",
  "/logo/ISEA Logo.png",
  "/logo/OSC Logo.png",
  "/logo/Null Logo.png",
];

export const partnerTiers = [
  {
    name: "Title",
    price: "₹2,00,000",
    note: "(1 slot available)",
    features: [
      'Exclusive naming rights ("Powered by [You]")',
      "30-minute keynote + demo slot on main stage",
      "Premium booth in central networking zone",
      "Full logo prominence on all event creatives",
      "Dedicated challenge category in CTF",
      "Direct access to participant resume database",
      "5 all-access passes for recruiting team",
    ],
  },
  {
    name: "Gold",
    price: "₹75,000",
    note: "(Up to 4 slots available)",
    features: [
      "15-minute presentation block",
      "Standard booth with branded backdrop",
      "Secondary stage/logo placement across venue",
      "Sponsored challenge in CTF or workshop",
      "Access to opt-in participant resume book",
      "3 event passes for recruiting team",
    ],
  },
  {
    name: "Community",
    price: "₹25,000",
    note: "(Unlimited slots)",
    features: [
      "Logo placement on website & sponsor wall",
      "Shared booth or kiosk window in sponsor zone",
      "Swag/reward partner recognition",
      "Social media recognition pre/post event",
      "1 event pass for company representative",
    ],
  },
];

export const partnerActivations = [
  {
    title: "Secure Coding Sprint",
    description:
      "45-min timed challenge. Participants fix intentionally vulnerable code in your provided tech stack. Winners get prizes, you identify top dev-sec talent.",
  },
  {
    title: "API Bug Hunt (Sandbox)",
    description:
      "Deploy an intentionally vulnerable API instance on our sandboxed network. Participants race to find bugs using your tools. Live leaderboard drives competition.",
  },
  {
    title: "Cloud Security Quest",
    description:
      "30-45 min misconfigured cloud environment challenge. Teams exploit (then secure) IAM, S3, or logging setups. Perfect for cloud talent.",
  },
  {
    title: "Reverse Eng Micro-Challenge",
    description:
      "30-min static/dynamic binary analysis puzzle. Sponsor provides the binary, participants retrieve the flag and explain the reasoning.",
  },
  {
    title: "Career Booth & Speed Interviews",
    description:
      'Continuous activation throughout Day 2. Perform on-site resume triage, portfolio checks, and give out "fast-track" mock interview tokens.',
  },
];

export const partnerRoi = [
  { value: "CVs", label: "Qualified Candidate Pipeline (Opt-in)" },
  { value: "Data", label: "Challenge Performance Analytics" },
  { value: "Media", label: "Post-Event Content Assets" },
  { value: "Reach", label: "Tracked Footfall & Impressions" },
];

export const partnerTimeline = [
  { label: "T-30", detail: "Mar 20: Sponsor commitment period opens. Select tier, outline activation format." },
  { label: "T-21", detail: "Mar 29: Commercial intent locked. SOW signatures and package confirmation." },
  { label: "T-14", detail: "Apr 5: Assets freeze. Branding assets, final copy, and initial logistics brief submitted." },
  { label: "T-10", detail: "Apr 9: Technical freeze. Power/network stall requirements locked. Challenge scope reviewed." },
  { label: "T-7", detail: "Apr 12: Dry run. Challenge dry run and compliance check within sandbox environment." },
  { label: "DAY 0", detail: "Apr 19-21: Recon event live. Real-time engagement tracking." },
  { label: "T+7", detail: "Apr 28: Deliverables. Final sponsor analytics report and candidate database handover." },
];
