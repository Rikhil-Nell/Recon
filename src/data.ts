/* ── RECON 2026 — all event content ──────────────────────────── */

export interface SiteEvent {
    title: string;
    description: string;
    tags: string[];
    meta: string[];
    flagship?: boolean;
}

export interface ScheduleItem {
    time: string;
    title: string;
    description: string;
    accent?: boolean;
}

export interface TeamMember {
    code: string;
    name: string;
    role: string;
}

export interface Partner {
    name: string;
    description: string;
    value?: string;
    tier: 'title' | 'co-title' | 'gold' | 'silver' | 'community';
}

/* ── Stats ────────────────────────────────────────────────────── */
export const stats = [
    { label: 'Prize Pool', value: 200, prefix: '₹', suffix: 'K+', display: '₹200K+' },
    { label: 'Hackers', value: 1200, suffix: '+', display: '1200+' },
    { label: 'Events', value: 12, display: '12' },
    { label: 'Days', value: 3, display: '3' },
];

/* ── Flagship Events ──────────────────────────────────────────── */
export const flagshipEvents: SiteEvent[] = [
    {
        title: 'Capture The Flag',
        description:
            'Jeopardy-style CTF across Web, Pwn, Reversing, Crypto, Forensics, OSINT & more. 12-hour overnight sprint — top teams win cash, swag & bragging rights.',
        tags: ['OVERNIGHT', '12 HRS', 'JEOPARDY'],
        meta: ['Team size: 1-4', 'Prizes: ₹80,000+'],
        flagship: true,
    },
    {
        title: 'King of the Hill',
        description:
            'Attack-defence arena. Exploit boxes, patch vulns, maintain access — all while opponents try to dethrone you. 8-hour overnight warzone.',
        tags: ['OVERNIGHT', '8 HRS', 'ATTACK-DEFENCE'],
        meta: ['Team size: 1-3', 'Prizes: ₹50,000+'],
        flagship: true,
    },
];

/* ── Side Events ──────────────────────────────────────────────── */
export const sideEvents: SiteEvent[] = [
    {
        title: 'NFC Lock Hunt',
        description: 'Clone NFC badges, crack access controls, and hunt hidden locks across campus in this physical-security challenge.',
        tags: ['HARDWARE', 'PHYSICAL'],
        meta: [],
    },
    {
        title: 'Hardware Badge & IoT Village',
        description: 'Solder your own conference badge. Explore IoT exploitation stations — firmware extraction, UART/JTAG, wireless sniffing.',
        tags: ['HARDWARE', 'HANDS-ON'],
        meta: [],
    },
    {
        title: 'AppSec Zone',
        description: 'Guided web & mobile app pentesting labs. OWASP Top 10, API abuse, auth bypass — learn by breaking real apps.',
        tags: ['WEB', 'MOBILE'],
        meta: [],
    },
    {
        title: 'Media Forensics & Deepfake Lab',
        description: 'Detect manipulated images, analyse metadata, uncover deepfakes. Digital forensics meets AI deception.',
        tags: ['FORENSICS', 'AI'],
        meta: [],
    },
    {
        title: 'Hacking Arena',
        description: 'Speed-hacking stages with escalating difficulty. Race the clock, solve challenges, climb the scoreboard.',
        tags: ['SPEED', 'COMPETITIVE'],
        meta: [],
    },
    {
        title: 'Cyber Expo Zone',
        description: 'Industry booths, live demos, recruiter meet-ups. See cutting-edge security tools in action.',
        tags: ['EXPO', 'NETWORKING'],
        meta: [],
    },
    {
        title: 'Escape Room',
        description: 'Cyber-themed escape room. Decode ciphers, exploit systems, escape before time runs out.',
        tags: ['PUZZLE', 'TEAM'],
        meta: [],
    },
    {
        title: 'Gaming Arena',
        description: 'Competitive gaming zone. Valorant, CS2 & more — blow off steam between hacking sessions.',
        tags: ['GAMING', 'CASUAL'],
        meta: [],
    },
    {
        title: 'Art Zone',
        description: 'Cyberpunk art installations, live pixel art, and creative coding demos. Where hacker culture meets art.',
        tags: ['CREATIVE', 'ART'],
        meta: [],
    },
    {
        title: 'Bug Bounty App Quest',
        description: 'Hunt real bugs in purpose-built apps. Triage, report, and score bounties — just like a real program.',
        tags: ['BUG BOUNTY', 'LIVE'],
        meta: [],
    },
];

/* ── Schedule ─────────────────────────────────────────────────── */
export const schedule: Record<string, ScheduleItem[]> = {
    'Day 1': [
        { time: '08:00', title: 'Gates Open', description: 'Registration & badge pickup' },
        { time: '09:00', title: 'Opening Ceremony', description: 'Keynote & event kickoff' },
        { time: '10:00', title: 'Side Events Begin', description: 'All zones go live' },
        { time: '13:00', title: 'Lunch Break', description: 'Refuel at the food court' },
        { time: '14:00', title: 'Workshops & Talks', description: 'Industry speakers & hands-on labs' },
        { time: '18:00', title: 'Dinner Break', description: 'Evening refuel' },
        { time: '20:00', title: 'CTF Begins', description: '12-hour overnight Jeopardy CTF', accent: true },
    ],
    'Day 2': [
        { time: '08:00', title: 'CTF Ends & Recovery', description: 'Results posted, breakfast served' },
        { time: '10:00', title: 'Side Events Resume', description: 'All zones reopen' },
        { time: '13:00', title: 'Lunch Break', description: 'Midday refuel' },
        { time: '14:00', title: 'Workshops Round 2', description: 'Deep-dive sessions' },
        { time: '18:00', title: 'Dinner Break', description: 'Evening refuel' },
        { time: '20:00', title: 'King of the Hill', description: '8-hour overnight attack-defence', accent: true },
    ],
    'Day 3': [
        { time: '04:00', title: 'KOTH Ends', description: 'Final scores locked' },
        { time: '08:00', title: 'Recovery Morning', description: 'Late breakfast, chill zone' },
        { time: '10:00', title: 'Side Events Finals', description: 'Last chance to compete' },
        { time: '13:00', title: 'Lunch Break', description: 'Final refuel' },
        { time: '15:00', title: 'Closing Ceremony', description: 'Awards, prizes & wrap-up', accent: true },
        { time: '17:00', title: 'After-Party', description: 'Networking, music & goodbye' },
    ],
};

/* ── Team ──────────────────────────────────────────────────────── */
export const team: TeamMember[] = [
    { code: 'ED', name: 'Rikhil', role: 'Executive Director' },
    { code: 'CTO', name: 'Abhiram', role: 'Chief Technology Officer' },
    { code: 'OPS', name: 'Faariz', role: 'Operations Lead' },
    { code: 'INFRA', name: 'Izhaan & Surya', role: 'Infrastructure Leads' },
    { code: 'CTF', name: 'Vikhyat & Swarnim', role: 'CTF Leads' },
    { code: 'SPK', name: 'Aditya', role: 'Speakers & Outreach' },
    { code: 'BIZ', name: 'Ayushi', role: 'Business & Sponsorships' },
    { code: 'DSN', name: 'Jahnvi', role: 'Design Lead' },
    { code: 'LOG', name: 'Reet & Dharineesh', role: 'Logistics Leads' },
];

/* ── Partners ─────────────────────────────────────────────────── */
export const partners: Partner[] = [
    { name: 'Hackers Daddy', description: 'Title sponsor — premium cybersecurity training & certifications.', value: '₹7,00,000', tier: 'title' },
    { name: 'APISec University', description: 'Co-title sponsor — API security education platform.', value: '₹7,00,000', tier: 'co-title' },
    { name: 'Altered Security', description: 'Gold sponsor — advanced red team & AD training.', value: '₹47,000', tier: 'gold' },
    { name: 'INE', description: 'Gold sponsor — eLearnSecurity & cybersecurity cert training.', value: '~₹28,000', tier: 'gold' },
    { name: 'zSecurity', description: 'Gold sponsor — ethical hacking courses & resources.', tier: 'gold' },
    { name: 'TheXSSRat', description: 'Silver sponsor — bug bounty mentorship & community.', value: '₹3,27,000', tier: 'silver' },
    { name: 'Hackviser', description: 'Silver sponsor — cybersecurity advisory & training.', tier: 'silver' },
    { name: 'Caido', description: 'Silver sponsor — next-gen web security testing proxy.', value: '₹1,02,000', tier: 'silver' },
    { name: '.xyz Domains', description: 'Silver sponsor — domain registrar for the next generation.', value: '₹35,000', tier: 'silver' },
    { name: 'Hacktronix', description: 'Silver sponsor — hardware hacking tools & education.', tier: 'silver' },
    { name: 'OSMSEC', description: 'Community partner — open-source security collective.', tier: 'community' },
    { name: 'OSEN', description: 'Community partner — open security education network.', tier: 'community' },
];

export const communityPartners = [
    'HackTheBox Mumbai',
    'BSides Vizag',
];

/* ── Marquee strings ──────────────────────────────────────────── */
export const marqueeItems = [
    'RECON 2026',
    'VIT-AP UNIVERSITY',
    'HUNT. BREAK. DEFEND.',
    '₹200K + PRIZE POOL',
    '3 DAYS',
    '12+ EVENTS',
    '1200+ HACKERS',
    'CTF × KOTH × HARDWARE × FORENSICS',
    'REGISTER NOW',
];

/* ── ASCII banner ─────────────────────────────────────────────── */
export const asciiBanner = `
██████╗ ███████╗ ██████╗ ██████╗ ███╗   ██╗
██╔══██╗██╔════╝██╔════╝██╔═══██╗████╗  ██║
██████╔╝█████╗  ██║     ██║   ██║██╔██╗ ██║
██╔══██╗██╔══╝  ██║     ██║   ██║██║╚██╗██║
██║  ██║███████╗╚██████╗╚██████╔╝██║ ╚████║
╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝`.trim();
