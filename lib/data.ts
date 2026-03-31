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
