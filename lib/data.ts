// --- Landing page data ---

export interface OperationCard {
  name: string;
  category: string;
  description: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  duration?: string;
  flagship?: boolean;
}

export interface TimelineMilestone {
  time: string;
  event: string;
  detail?: string;
  overnight?: boolean;
}

export interface TimelineDay {
  label: string;
  date: string;
  milestones: TimelineMilestone[];
}

export interface MiniFAQ {
  question: string;
  answer: string;
}

export const operationsData: OperationCard[] = [
  {
    name: "CTF",
    category: "COMPETITION",
    description: "Jeopardy-style challenges across web, pwn, crypto, forensics, misc, and OSINT.",
    difficulty: 3,
    duration: "12hr Overnight",
    flagship: true,
  },
  {
    name: "KOTH",
    category: "COMPETITION",
    description: "Attack/defend target boxes. Points accrue per hold interval. Resets every 30-60 min.",
    difficulty: 5,
    duration: "8hr Overnight",
    flagship: true,
  },
  {
    name: "Hardware Badge + IoT Village",
    category: "VILLAGE",
    description: "Solder your own badge, explore JTAG/UART interfaces, and firmware hardening basics.",
    difficulty: 4,
  },
  {
    name: "Web Exploit Dojo",
    category: "VILLAGE",
    description: "Guided OWASP top 10 exploitation on sandboxed vulnerable apps. Beginner-friendly.",
    difficulty: 1,
  },
  {
    name: "OSINT Corner",
    category: "VILLAGE",
    description: "Time-boxed investigation puzzles using public data and synthetic personas.",
    difficulty: 2,
  },
  {
    name: "Forensics Sprint",
    category: "VILLAGE",
    description: "30-min mini-cases: memory dumps, pcap analysis, log triage, stego basics.",
    difficulty: 3,
  },
];

export const timelineData: TimelineDay[] = [
  {
    label: "DAY 1",
    date: "APR 19",
    milestones: [
      { time: "09:30", event: "Gates Open" },
      { time: "10:00", event: "Inauguration" },
      { time: "11:00", event: "Talk 1" },
      { time: "13:30", event: "Talk 2" },
      { time: "15:00", event: "All Stalls Open", detail: "10+ villages & side events" },
      { time: "17:00", event: "CTF Briefing", detail: "Rules, scoring & infra walkthrough" },
      { time: "18:00", event: "CTF Begins", detail: "12hr Jeopardy-style, 20-30 challenges", overnight: true },
    ],
  },
  {
    label: "DAY 2",
    date: "APR 20",
    milestones: [
      { time: "06:00", event: "CTF Ends", detail: "Scoreboard freeze & results" },
      { time: "10:00", event: "Recovery & Clinics", detail: "Career clinic, resume teardowns" },
      { time: "13:30", event: "Talk 3" },
      { time: "14:30", event: "Talk 4" },
      { time: "15:30", event: "All Stalls Open" },
      { time: "21:30", event: "KOTH Briefing", detail: "Team assignments & target info" },
      { time: "22:00", event: "KOTH Begins", detail: "8hr Attack/Defend, live target boxes", overnight: true },
    ],
  },
  {
    label: "DAY 3",
    date: "APR 21",
    milestones: [
      { time: "06:00", event: "KOTH Ends", detail: "Final hill ownership tallied" },
      { time: "10:30", event: "Adjudication", detail: "Score verification & disputes" },
      { time: "14:00", event: "Lightning Talks", detail: "Community presentations, 5 min each" },
      { time: "16:00", event: "Awards Ceremony", detail: "CTF, KOTH & village prizes" },
      { time: "17:00", event: "Closing & Teardown" },
    ],
  },
];

export const miniFaqData: MiniFAQ[] = [
  {
    question: "Who can participate?",
    answer: "Any college student from any institution across India. All skill levels welcome — we have beginner-friendly tracks.",
  },
  {
    question: "What should I bring?",
    answer: "Laptop, charger, ethernet adapter (recommended), and curiosity. VMs and tools guide shared pre-event.",
  },
  {
    question: "How do I register?",
    answer: "Click Register Now, fill the form. Registration is open. Limited to 600 seats.",
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Schedule", href: "/schedule" },
  { label: "Prizes", href: "/prizes" },
  { label: "Team", href: "/team" },
  { label: "Partners", href: "/partners" },
  { label: "Gallery", href: "/gallery" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks = [
  { platform: "Instagram", url: "#" },
  { platform: "LinkedIn", url: "#" },
  { platform: "Twitter", url: "#" },
  { platform: "Discord", url: "#" },
];

export const sponsorPlaceholders = [
  "VIT-AP University",
  "IIT Madras",
  "ISEA",
  "Open Source Community",
  "Null Chapter",
  "HackTheBox",
  "OffSec",
  "Partner 8",
];

// --- Existing page data (used by schedule, team, FAQ, etc.) ---

export interface Track {
  id: string;
  icon: string;
  title: string;
  desc: string;
  tag: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  type?: string;
}

export interface ScheduleItem {
  time: string;
  text: string;
  phase: "armed" | "active" | "closeout" | "standby" | "pending";
}

export interface Day {
  day: string;
  title: string;
  items: ScheduleItem[];
}

export interface Staff {
  role: string;
  name: string;
  sub: string;
  dept: string;
  id: string;
  index?: number;
}

export const tracksData: Track[] = [
  { id: "01", icon: "terminal", title: "CTF", desc: "Capture The Flag operations covering web, crypto, rev, pwn, and forensics under real-world constraints.", tag: "Active Ops", difficulty: 3 },
  { id: "02", icon: "security", title: "KOTH", desc: "King of The Hill. Maintain persistence and defend your access against 600+ live operators.", tag: "Persistence", difficulty: 5 },
  { id: "03", icon: "psychology", title: "AI RED TEAM LAB", desc: "Adversarial ML, prompt injection, and bypass techniques against large language models.", tag: "Neuromorphic", difficulty: 4 },
  { id: "04", icon: "manage_search", title: "FORENSICS SPRINT", desc: "Digital Forensics, memory dumps, and network cap analysis in breach scenarios.", tag: "Analyst Drill", difficulty: 3 },
  { id: "05", icon: "travel_explore", title: "OSINT CORNER", desc: "Open Source Intelligence gathering. Connect the dots across the public web safely.", tag: "Investigation", difficulty: 2 },
  { id: "06", icon: "memory", title: "HARDWARE VILLAGE", desc: "Hardware exploitation, JTAG, UART interfaces, and side-channel attack demos.", tag: "Component Level", difficulty: 4 },
  { id: "07", icon: "router", title: "IOT SECURITY LAB", desc: "Connected device vulnerabilities, firmware analysis, and protocol security.", tag: "Device Layer", difficulty: 4 },
  { id: "08", icon: "code", title: "WEB EXPLOIT DOJO", desc: "Guided application security testing, perfect for operators securing their first shell.", tag: "Beginner Lane", difficulty: 1 },
  { id: "09", icon: "badge", title: "CAREER CLINIC", desc: "Resume teardowns, interview prep, and direct networking with industry sponsors.", tag: "Talent Pipeline", difficulty: 1 },
];

export const schedData: Day[] = [
  {
    day: "01",
    title: "THREAT MODEL ALIGNMENT",
    items: [
      { time: "0900", text: "Registration & Comm Check", phase: "active" },
      { time: "1100", text: "Opening Keynote", phase: "pending" },
      { time: "1400", text: "Villages Open", phase: "pending" },
      { time: "1800", text: "Night Ops Briefing", phase: "pending" },
    ],
  },
  {
    day: "02",
    title: "ESCALATION WINDOW",
    items: [
      { time: "1000", text: "CTF Infrastructure Live", phase: "standby" },
      { time: "1400", text: "Advanced Exploitation Clinic", phase: "standby" },
      { time: "2130", text: "KOTH Bracket A", phase: "standby" },
      { time: "2200", text: "Lockdown: Continuous Attack", phase: "standby" },
    ],
  },
  {
    day: "03",
    title: "CLOSEOUT + DEBRIEF",
    items: [
      { time: "0600", text: "Operations Freeze", phase: "standby" },
      { time: "1000", text: "Defensive Review", phase: "standby" },
      { time: "1400", text: "Awards & Recognition", phase: "standby" },
      { time: "1600", text: "System Stand Down", phase: "standby" },
    ],
  },
];

export const staffData: Staff[] = [
  { role: "Event Director", name: "Rikhil Nellimarla", sub: "Core Operations", id: "OP-01", dept: "CMD" },
  { role: "Chief Technical Officer", name: "Abhiram Venkat Sai", sub: "Infrastructure", id: "OP-02", dept: "TEC" },
  { role: "Operations Chief", name: "M. Faariz & Chanu", sub: "Logistics & Execution", id: "OP-03", dept: "LOG" },
  { role: "CTF / KOTH Director", name: "Vikhyat & Swarnim", sub: "Offensive Scenarios", id: "OP-04", dept: "OFF" },
  { role: "Program & Speakers", name: "Aditya & Akshat", sub: "Content & Briefings", id: "OP-05", dept: "PRG" },
  { role: "Sponsors & Partnerships", name: "Ayushi", sub: "External Relations", id: "OP-06", dept: "EXT" },
  { role: "Design & Media", name: "Jahnvi Kotangale", sub: "Brand & Visual Identity", id: "OP-07", dept: "MED" },
  { role: "Volunteer Leads", name: "Reet & Dharineesh", sub: "Ground Support", id: "OP-08", dept: "GRD" },
];

export const faqData: string[][] = [
  ["WHO CAN PARTICIPATE IN RECON 2026?", "Any student, enthusiast, or professional interested in offensive security and system operations. Undergraduates and beginners have dedicated tracks like the Web Exploit Dojo to get started."],
  ["WHAT SHOULD I BRING TO THE NIGHT OPS?", "Your laptop with necessary VMs/tools installed (Kali, Parrot OS or equivalent), adapters, sleeping bag (if you plan to rest). Wired ethernet adapters are highly recommended for specific villages."],
  ["IS THERE A PRIZE POOL FOR THE CTF?", "Yes. Top performing teams across CTF and KOTH tracks receive hardware prizes, cash bounties, and direct interview pipelines with our associated partners."],
  ["DO I NEED PRIOR EXPERIENCE?", "No. While Recon is a high-intensity environment, we have entry points for all skill levels. If you understand basic networking, Linux commands, and have a persistence mindset, you belong here."],
  ["ARE MEALS AND ACCOMMODATION PROVIDED?", "Yes. Full meals, energy drinks, and coffee runs are covered. Safe resting zones are available on campus during the 72-hour operational window for participants."],
  ["HOW DOES THE SCORING SYSTEM WORK?", "CTF is jeopardy style with dynamic scoring. KOTH features live hill-ownership points calculated per second. The unified Recon dashboard tracks both offensive and defensive persistence."],
];

export const partnersData: string[] = [
  "VIT-AP University",
  "IIT Madras",
  "ISEA",
  "Open Source Community",
  "Null Chapter",
  "HackTheBox",
  "OffSec",
];
