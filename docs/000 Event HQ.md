
# National Workshop on System Security: from vulnerabilities to trustworthy systems

**Owner:** Rikhil Nellimarla
**Partner clubs:** OSC + Null Chapter 
**Advisory escalation:** Dr. Sibi Chakkaravarty
**Funding baseline:** INR 4,97,000 (IIT-M linked, security-first objective)
**Target scale:** 600 participants, 80 workforce, 3 days
**Event window:** Apr 19-21
**Venue anchor:** SAC + campus distributed zones

## Quick Links

### 📄 Docs

- [[001 Agenda & Run of Show]]
- [[002 Logistics]]
- [[003 Sponsors and Partners]]
- [[004 Comms & Marketing]]

### 📋 Ops Playbooks

- [[005 Risk Register]]
- [[006 Volunteer Handbook]]
- [[007 Zone SOPs]]

---

## 0) Mission and Success Definition

**Mission:** Run a national-level, security-focused, DEFCON-style campus event with high technical credibility, high engagement, and safe operations under strict university constraints.

### Primary Outcomes (must hit)

- 2 keynote/talk blocks delivered without delay.
- 1 overnight CTF delivered end-to-end.
- 1 overnight KOTH delivered end-to-end.
- 10+ side events run on published schedule.
- No legal or policy breach (especially networking/security).
- Zero critical safety incidents.

### Secondary Outcomes (good to hit)

- 15+ sponsors/partners actively participating.
- 600 registrations, 450+ active attendance, 250+ outstation attendees.
- Media footprint: live social, campus screens, recap assets.

---

## 1) Non-Negotiables (Hard Guardrails)

<aside> 🚫

- All offensive security activities must be sandboxed and explicitly in-scope.
- No testing against real university infrastructure or public internet targets unless formal written approval exists.
- Campus IT restrictions are assumed hostile/unstable; core operations cannot depend on campus Wi-Fi.
- Every event zone has 1 named owner and 1 backup owner.
- Any side event not green by T-7 days is dropped automatically.
- Any event lacking rulebook + safety brief + reset procedure does not open.
- All prize logic is written before Day 1 and frozen. </aside>

---

## 2) Operating Model (Feature-Max but Resilient)

Use a modular architecture:

- **Layer A (Flagship):** Talks, CTF, KOTH, awards.
- **Layer B (Side villages):** 10+ rotating activities.
- **Layer C (Engagement fabric):** App, points/passport, leaderboards, screens.
- **Layer D (Sponsor fabric):** stalls, sponsor challenges, recruiting touchpoints.

### Failure Isolation Rule

- If one side event fails, flagship must continue unaffected.
- If app fails, manual QR + paper fallback must still run scoring/check-in.

---

## 3) Organizational Chart (50-Person Workforce)

### Core Command (14)

| Role                              | Owner                                         | Reg No.                   | Contact                    |
| --------------------------------- | --------------------------------------------- | ------------------------- | -------------------------- |
| Event Director                    | Rikhil Nellimarla                             | 23BEC7030                 | 7386175224                 |
| Chief Technical Officer           | Abhiram Venkat Sai Adabala                    | 23BCE8643                 | 7338299721                 |
| Operations Chief                  | Mohammed Faariz  <br>Cheppali Chanu           | 24BCE7839  <br>23BCE20115 | 7010616263  <br>7989313174 |
| Technical Infrastructure Lead     | Izhaan Raza  <br>Surya Theja Dhommalapati     | 24BCA7544  <br>24BCS7011  | 990515819  <br>7075052734  |
| CTF/KOTH Competition Director     | Vikhyat Shajee Nambiar  <br>Swarnim Bandekar  | 23BCB7137  <br>24BCB7157  | 7795351504  <br>9945721305 |
| Program and Speakers Lead         | Aditya J Shettigar  <br>Akshat Abhishek Singh | 23MIC7018  <br>24BCE7295  | 8861248515  <br>9310753160 |
| Sponsorship and Partnerships Lead | Ayushi                                        | 24BCA7064                 | 8938967796                 |
| Design, Media, and Broadcast Lead | Jahnvi Kotangale                              | 23BCE8201                 | 9082812563                 |
| Volunteer and Logistics Lead      | Reet Mishra  <br>A. Dharineesh                | 23BCE8992  <br>23BCE7490  | 8639627939  <br>6374853503 |

### Functional Pods

- **Infra + Security Ops** (10)
- **Competition Ops** (8)
- **Side Event Ops** (12)
- **Registration + Crowd + Helpdesk** (6)
- **Stage + AV + Speaker Ops** (6)
- **Design/Screens** (4)
- **Media Team** (10)
- **Floaters and Incident Response** (4)

### Staffing Principle

- No one works more than 10 active duty hours/day.
- Overnight shifts must rotate; next-day rest is mandatory.

---

## 4) Master Timeline (Mar 18 → Apr 19)

### T-38 to T-30

- Freeze event name, theme, identity, logo, domain, registration stack.
- Finalize venue map and zone capacities.
- Publish sponsor deck, open outreach to 250+ companies.

### T-29 to T-21

- Finalize CTF platform and KOTH architecture.
- Publish first speaker line-up and registration opens.
- Publish rulebooks (CTF/KOTH/side events).

### T-20 to T-14

- Vendor lock: internet, routers, power backup, print, merch, badges.
- Finalize lodging and food partner MoUs.
- Side events complete dry run #1.

### T-13 to T-7

- Full technical rehearsal with fake load.
- Incident drills: internet fail, power fail, app fail, speaker no-show.
- Final sponsor commitments and slot allocations freeze at T-10.

### T-6 to T-1

- Print packs, signage install plan, roster by hour.
- Final app content freeze at T-3.
- Campus screen content and emergency templates ready.

---

## 5) Infrastructure Blueprint (Cloud-First, No VLAN Dependency)

## Realistic Constraints

- Campus network: 3-4 Gbps shared across entire university (hostels + admin)
- Unstable and unpredictable for 600-person event with frequent small disconnects
- Physical server exists but on admin network via Thinlinc (not practical for participant-facing services)
- Campus IT will not provide VLAN segmentation or reliable network isolation
- Single ISP tower; no secondary internet provider available

## Core Architecture Principles

- All core services cloud-hosted: CTFd, KOTH targets, app backend, scoreboard
- Participant internet: campus Wi-Fi (best-effort) used for cloud service access
- Isolation via OpenVPN: overlay network for CTF/KOTH participant access to challenge targets
- Fallback independence: if campus network restricts/fails, core competition infra stays up
- Ops team backup: 4G/5G data for command & control when campus network degrades

## Technology Stack

### Compute & Hosting

- CTF Platform: Self-hosted CTFd on AWS EC2 (t3.xlarge: 4 vCPU, 16 GB RAM)
- KOTH Targets: 10× AWS EC2 instances (t3.medium: 2 vCPU, 4 GB each) with snapshot/restore automation
- OpenVPN Server: AWS EC2 (t3.large: 2 vCPU, 8 GB) running Community Edition
- App Backend: AWS EC2 (t3.medium) or ECS for FastAPI services
- Challenge Files: AWS S3 with CloudFront CDN for global distribution

### Database & Storage

- Primary Database: Neon Postgres (managed, serverless, Pro tier for event scale)
- EBS Volumes: 500 GB total across instances
- S3 Storage: Challenge files, static assets, backups

### Monitoring & Reliability

- CloudWatch: Metrics, logs, and alerting
- SNS: Alert notifications to ops team
- Automated Snapshots: Hourly backups during event window

## Network Architecture (OpenVPN Overlay Model)

### Why OpenVPN

- Campus network is unreliable and admin-controlled
- Cannot depend on VLAN segmentation
- Creates overlay network on top of any internet connection (even unstable campus Wi-Fi)
- Participants connect to VPN → access isolated challenge subnet → campus IT never sees challenge traffic
- Provides audit trail for anti-cheat (all connections logged with participant IDs)

### OpenVPN Server Configuration

- Ubuntu 22.04 LTS on AWS EC2 in same region as CTFd/KOTH
- Install via [openvpn-install.sh](http://openvpn-install.sh/) automation script
- Subnet: 10.8.0.0/16 (supports up to 65,000 concurrent clients)
- NAT and firewall rules: only VPN subnet can reach CTF/KOTH instances
- Port forwarding optimized for campus firewall compatibility

### Client Access Model

- 600+ unique .ovpn configuration files generated via script
- Each config tied to participant/team registration ID for anti-cheat tracking
- Distribution methods:
    - Primary: App download (scan QR → download personalized .ovpn)
    - Fallback: Help desk USB/email distribution

### Participant Onboarding Flow

1. Pre-event (Apr 20-24): Mandatory VPN dry run window
    - Email/Discord blast: "Test your VPN connection before event starts"
    - Dedicated support channel live on Discord/Telegram
    - Troubleshooting guide and video tutorial published
    - Help desk tracks connection success rate
2. Day 1 (Apr 25): VPN support desk at registration
    - 2 dedicated volunteers for VPN troubleshooting
    - Pre-configured test laptops for immediate diagnostics
    - USB drives with .ovpn files and client installers

### Challenge Target Routing

- CTFd web interface: Accessible via both public internet AND VPN (for scoreboard visibility)
- Challenge boxes (SSH, web exploits, binary challenges): Only accessible via VPN tunnel (AWS security groups enforce)
- KOTH targets: VPN-only access, no public IPs exposed
- Firewall default-deny: All inbound traffic blocked except from OpenVPN subnet

### Anti-Cheat & Monitoring

- Log all VPN connections: IP, timestamp, user ID, connection duration
- Rate-limit connections per config (prevent credential sharing)
- Automatic .ovpn revocation on abuse detection
- Real-time connection dashboard for ops team

## Fallback Mechanisms

### Campus Network Degradation

- CDN-cached static assets (challenge files, images) reduce live bandwidth requirements
- Throttle non-essential app features (live chat, heavy media) during congestion
- Queue-based challenge file downloads instead of simultaneous bursts
- Read-only backup scoreboard webpage hosted separately OpenVPN Server Failure
- Hot standby OpenVPN instance (pre-configured, ready to activate)
- DNS-based failover to backup server
- Challenge target security groups allow both primary and backup VPN subnets

### Complete Internet Outage

- Ops team switches to 4G/5G backup data for critical operations
- Manual score capture sheet (absolute fallback)
- Pause competition clock until connectivity restored AWS Cost Breakdown (10-Day Window)

### Compute Resources

- CTFd server (t3.xlarge × 10 days): ₹8,000–₹10,000
- OpenVPN server (t3.large × 10 days): ₹4,000–₹6,000
- KOTH targets (10× t3.medium × 10 days): ₹12,000–₹16,000
- App backend (t3.medium × 10 days): ₹2,000–₹3,000

### Storage & Network

- EBS volumes (500 GB total): ₹2,000–₹3,000
- S3 + CloudFront (~100 GB transfer): ₹1,500–₹3,000
- Data transfer out (600 participants × 2 GB avg = 1.2 TB): ₹8,000–₹12,000

### Database

- Neon Postgres (Pro tier, 10 days): ₹4,000–₹6,000

### Monitoring & Backup

- CloudWatch + SNS alerts: ₹500–₹1,000
- Automated snapshots/backups: ₹1,000–₹2,000

### Additional (Non-AWS)

- Domain + SSL certificate: ₹1,000–₹2,000
- Backup 4G/5G data (ops-only, ~50 GB): ₹2,000–₹3,000 Total AWS Infrastructure: ₹43,000–₹62,000 Grand Total Cloud Infra: ₹46,000–₹67,000 `Fits comfortably within ₹1,10,000 infra budget envelope with ₹43,000–₹64,000 headroom for physical equipment, power backup, and contingency. Bandwidth Planning (600 Participants)`

### Capacity Assumptions

- 600 registered, ~450 active at peak (overnight CTF/KOTH)
- Average per-participant bandwidth: 1–3 Mbps (web challenges, SSH, light downloads)
- Peak aggregate demand: 450 × 2 Mbps = 900 Mbps (~1 Gbps) sustained

### Campus Network Reality Check

- If campus provides even 500 Mbps usable aggregate, participants can access cloud infra
- CDN caching and download queuing will reduce burst load
- OpenVPN compression reduces bandwidth by 20-30% for text-heavy traffic

### Mitigation Strategies

- Aggressive CloudFront caching (24-hour TTL for challenge files)
- Progressive challenge file delivery (unlock files as participants advance)
- Compress all downloadable assets (gzip/brotli)
- App displays real-time bandwidth status and suggests off-peak download windows

---

## 6) Competition Format

### CTF (Overnight #1)

- **Start** Day 1 at 18:00, **end** Day 2 at 06:00.
- Jeopardy style categories: web, pwn, crypto, forensics, misc, OSINT.
- 20–30 challenges, tiered difficulty, dynamic hints.
- Team size: 1–4.
- Anti-cheat: account/device/IP checks, writeup audit for top teams.

### KOTH (Overnight #2)

- **Start** Day 2 at 22:00, **end** Day 3 at 06:00.
- 8–12 target boxes, point accrual per hold interval.
- Red/Blue hybrid optional for finals.
- Mandatory target reset windows to prevent dead boxes.

### Prize Logic

- **CTF winners:** top 3 + category specials.
- **KOTH winners:** top 3 + first blood + longest hold.
- **Side-event passport:** winner pool (top 20 point earners).

---

## 7) Side Events Catalog (Detailed SOP)

### 7.1 NFC Lock Hunt (Hybrid Digital + Physical Puzzle System)

**Concept**

A campus-wide, multi-stage puzzle hunt where teams solve location-based challenges and authenticate progression using NFC identity cards. Clues are unlocked sequentially through a backend-driven system, culminating in a physical NFC-enabled lockbox challenge.

The system combines QR-based puzzle delivery, NFC-based identity verification, and backend-controlled progression.

---

**Flow**

1. Registration
    
    Teams register at the Hunt Desk and receive a unique NFC card encoded with a secure team token, along with an initial clue. Teams access the web app (PWA) to begin.
    
2. Checkpoint Progression (8–12 Nodes)
    
    At each checkpoint, teams scan a QR code which opens a puzzle in the web app. After submitting the correct answer, the app prompts them to tap their NFC card. The tap opens a secure route containing their token, which the backend verifies along with puzzle completion. Upon validation, the checkpoint is marked complete and the next clue is revealed.
    
3. State Management
    
    All progression is maintained in the backend, including completed checkpoints and timestamps. The NFC card functions only as an identity token and does not store game state.
    
4. Final Challenge — Lockbox Zone
    
    After completing all checkpoints, teams return to the Hunt Zone and tap their NFC card on a lockbox reader (ESP32 + PN532). The backend verifies completion and eligibility. If valid, the lockbox opens and the attempt is recorded.
    

---

**Unlock Rules**

Each team is allowed a maximum of three unlock attempts. All attempts are validated through the backend, and the lock opens only upon successful verification of completion.

---

**Reset Cadence**

Puzzle validation logic rotates every two hours. The backend enforces time-based conditions, allowing dynamic variation without requiring any physical reprogramming of cards or devices.

---

**Infrastructure**

Hardware includes NFC cards (NTAG213/215) for each team, one to three lockboxes using ESP32 with PN532 readers, solenoid or magnetic locks, and appropriate power sources such as power banks or adapters.

Software consists of a web app (PWA) handling QR scanning, puzzle interaction, and NFC-triggered flows, along with a backend (e.g., FastAPI) managing team state, validation, and endpoints such as `/tap`, `/solve`, `/progress`, and `/final`. A map interface dynamically reveals checkpoints.

Control and monitoring are handled via an admin interface for tracking team progress, resetting attempts, and overriding outcomes if necessary. All actions such as taps, submissions, and unlock attempts are logged.

---

**Rules**

Only issued NFC cards are valid identifiers. Physical tampering with lockboxes or checkpoints is prohibited. No forceful unlocking or use of external tools is allowed. Sharing answers is discouraged and may be mitigated through backend validation or variation. Organizer decisions are final.

---

**Operational Design Decisions**

No NFC readers are deployed at checkpoints to reduce hardware dependency and increase reliability. Phones act as the primary interaction device, handling both QR scanning and NFC taps. The backend serves as the single source of truth, ensuring consistency and preventing misuse. All entry points are designed to be stateless so the system can recover regardless of device or browser state.

---

**Experience Goals**

The experience is designed to feel seamless, with a flow of scan, solve, tap, and continue. NFC interactions provide a physical layer of engagement, while the final lockbox delivers a tangible and rewarding conclusion.

### 7.2 Hardware Badge + IoT Village (combined zone)

**Concept** — Build a simple interactive badge (LED, buzzer, NFC/RFID optional). IoT mini-labs around badge hacking and secure firmware basics.

**Tracks**

- _Beginner:_ solder + blink + serial debug.
- _Intermediate:_ sensor readouts + button challenge.
- _Security:_ firmware hardening basics, default creds, OTA risks.

**Infra** — 40 solder stations across rotations. Component kits: MCU board, LEDs, resistors, sensor pack, battery. Fire-safe solder setup and ESD mats.

**Rules** — PPE mandatory (goggles in solder area). One trained mentor per 10 seats.

**Output** — Participants leave with badge and challenge completion QR.

### 7.3 Gaming Arena (engagement + sponsor footfall)

**Format** — Short-format tournaments: FIFA/Valorant/CS2 (subject to machine capacity). 20-min slot model with queue management in app.

**Infra** — 12–20 gaming rigs or console setups. Dedicated LAN switch and anti-cheat configs.

**Scoring** — Not part of core security ranking, but gives passport points.

### 7.4 Web Exploit Dojo

**Concept** — Controlled vulnerable apps (OWASP top 10 style).

**Flow** — Guided modules every 45 min. Beginner and advanced lanes.

**Safety** — Targets are local sandbox only. Explicit scope shown on wall and in app.

### 7.5 OSINT Corner

**Concept** — Time-boxed investigation puzzles using public data and synthetic personas.

**Challenges** — Social graph mapping, location inference, metadata extraction. No doxxing, no real-person harassment.

### 7.6 Forensics Sprint

**Concept** — 30-min mini-cases: memory dump, pcap, log triage, stego basics.

**Flow** — Rolling case drops every hour. Individual or pairs.

### 7.7 AI Red-Team Mini-Lab

**Concept** — Prompt injection, jailbreak defenses, model misuse case study.

**Format** — Attack/defend tabletop + hands-on sandbox.

**Deliverable** — Teams submit exploit chain and mitigation notes.

### 7.8 Sponsor Demo Street (DAY-2 only)

**Concept** — Sponsor stalls with fixed demo blocks and micro-challenges.

**Good sponsored event examples:**

- Resume review and fast-track interview desk.
- Secure coding speed challenge.
- API bug hunt in sponsor sandbox.
- Reverse engineering mini-puzzle with swag rewards.
- Cloud security quest with voucher prizes.

**Commercial guardrail** — No pure sales pitches longer than 10 min without interactive component.

### 7.9 Bug Bounty App Quest (secret campaign)

**Design principle** — Keep it a discoverable easter egg, but legally scoped.

**Implementation** — Event app includes hidden challenge path and fake rogue-machine narrative. True target is isolated challenge host in event infrastructure.

**Rules** — In-scope assets listed in app legal page. Out-of-scope attacks = immediate disqualification.

### 7.10 Security Career Clinic (DAY-2 only)

**Format** — CV triage, GitHub profile clinic, roadmap advising, internship prep.

**Value** — High engagement for non-hardcore participants.

---

## 8) Event App Requirements (Minimum Viable + Fallback)

### Must-Have Features

- Registration QR and check-in.
- Live schedule and zone map.
- Live queues by zone.
- Scoreboard and passport points.
- Push notifications.
- Rulebooks and legal scope pages.

### Nice-to-Have

- Team formation board.
- Feedback pulse every 6 hours.

### Fallback

- Static microsite + Telegram/WhatsApp broadcast backup.

---

## 9) Full 3-Day Schedule with Rest Windows

Please refer: [[001 Agenda & Run of Show]]

---

## 10) Crowd Flow and Capacity Controls

### Capacity Model

- Main hall: fixed seated capacity with hard cap.
- Side zones: each has occupancy cap and queue threshold.
- App displays red/amber/green crowd indicators.

### Controls

- Wristband or QR color coding by participant type.
- Staggered starts for side events.
- Overflow waiting lounges with live stream.

### Queue Policy

- 15 min grace per slot.
- No-shows auto-release seats.

---

## 11) Outstation Logistics (Lodging, Travel, Food)

### Audience Segments

- In-campus students.
- Outstation participants (city/state).
- Speakers/sponsors.

### Lodging Plan

- **Tier A:** speaker/sponsor hotel block near campus.
- **Tier B:** participant hostel/partner budget hotels.
- **Emergency overbooking buffer:** 10% rooms.

### Travel Desk

- Pre-arrival guide with nearest station/airport routes.
- Shuttle windows at fixed intervals.
- Night safety transport for post-midnight movement.

### Food Plan

- 3 meal windows + midnight snack for overnight tracks.
- Veg/non-veg clearly labeled; allergy markers mandatory.
- Water points every major zone.

---

## 12) Merch and Identity System

### Merch Lineup

- Lanyard + RFID enabled badge (where feasible).
- Sticker packs, tees, limited challenge coins, sponsor swag.

### Distribution

- Core kit at check-in.
- Unlockable merch via points milestones.

### Anti-Loss

- Controlled inventory sheet with hourly reconciliation.

---

## 13) Sponsor Management SOP

### Tiering

- Title sponsor, gold sponsor, community sponsor.

### Deliverables by Tier

- Branding locations, stage mentions, app banner placement.
- Stall size and power/network allotment.
- Challenge slot rights.

### Process

- One sponsor owner per account.
- Written statement of work for every sponsor.
- No custom last-minute commitments after T-10.

---

## 14) Security, Legal, and Compliance

### Documents Required

- Participant code of conduct.
- Competition rules and scope.
- Vulnerability disclosure policy for event targets.
- Media consent and data policy.

### Operational Controls

- Isolated challenge infra only.
- Full logs for challenge environments.
- Incident report form with response SLA.

---

## 15) Incident Response Runbook

### Severity Levels

- **SEV-1:** Life safety or complete event outage.
- **SEV-2:** Core track degraded (CTF/KOTH/app/network).
- **SEV-3:** Single zone impact.

### Escalation Chain

- Zone owner → Ops Chief → Event Director → Dr. Sibi Chakkaravarty (institutional escalation).

### Common Incidents

- **Internet outage:** switch to backup router, freeze scoring window, public announcement.
- **Power issues:** UPS route for core infra, postpone only affected zones.
- **Crowd surge:** temporary zone closure and queue reroute.
- **Speaker no-show:** swap with backup lightning talk block.

---

## 16) Finance Control and Procurement

### Budget Envelope (Baseline)

|Category|Amount (₹)|
|---|---|
|Infra/network/cloud|1,10,000|
|Speakers and hospitality|1,20,000|
|Prizes|80,000|
|Branding/media/print|50,000|
|Venue/logistics|60,000|
|Side event materials|30,000|
|**Contingency**|**47,000**|
|**Total**|**4,97,000**|

### Controls

- Every spend tagged to cost center.
- Daily burn tracker from T-20 onward.
- Two-signature approval above threshold amount.

---

## 18) 72-Hour Pre-Event Checklist (Must Pass)

- [ ] CTF and KOTH full simulation complete
- [ ] All side events have reset scripts and owners
- [ ] App + fallback channels tested
- [ ] Power and internet backup validated
- [ ] Food, lodging, transport confirmations locked
- [ ] Host and emcee scripts printed
- [ ] Emergency response contacts distributed

---

## 19) Day-of Command Protocol

- Command room opens 2 hours before gates.
- Status update every 90 minutes from each zone.
- One single source of truth dashboard for operations.
- Any schedule change must be approved by Ops Chief and announced across app + screens.

---

## 20) Post-Event Closure

- Winner verification and payout timeline published within 24 hours.
- Sponsor report pack in 7 days (footfall, engagement, brand impressions).
- Incident and lessons-learned review in 10 days.
- Publish next-edition intent note while momentum is high.

---

## Appendix A — Zone Owner Template

For each zone, define:

- Owner + backup + contact.
- Capacity + slot length + reset time.
- Equipment list + spare list.
- Safety constraints.
- Failure fallback.

## Appendix B — Minimum Volunteer Brief

- What this zone does.
- How participants enter and queue.
- What to do when equipment fails.
- What behavior requires escalation.
- Whom to call at each severity level.

## Appendix C — Suggested KPIs

- Registration to attendance conversion.
- Average queue time per zone.
- CTF/KOTH uptime.
- App engagement and notification open rates.
- Sponsor satisfaction score.
- Incident count by severity.

---

[Recon — Agenda & Run of Show](https://www.notion.so/Recon-Agenda-Run-of-Show-65f96a56b9ba43df8d503b28d299a51e?pvs=21)

[Recon — Logistics](https://www.notion.so/Recon-Logistics-14efbba5c0c44105b5cf8ad667f6829a?pvs=21)

[Recon — Sponsors & Partners](https://www.notion.so/Recon-Sponsors-Partners-dc8410c3f03c4dabb91a183783763aaa?pvs=21)

[Recon — Comms & Marketing](https://www.notion.so/Recon-Comms-Marketing-e4ec8daac8cc4ab694052c08e86d7a92?pvs=21)

[Recon — Risk Register](https://www.notion.so/Recon-Risk-Register-1206301103964681b90df3512e5cc8a8?pvs=21)

[Recon — Volunteer Handbook](https://www.notion.so/Recon-Volunteer-Handbook-19b2e40001e8445aa18259768fbab9fb?pvs=21)

[Recon — Zone SOPs](https://www.notion.so/Recon-Zone-SOPs-a49ef27cd1774166977dd8d7fe9a056b?pvs=21)

[Recon — Tasks](https://www.notion.so/0658302ea7de455f9919847f6896dde9?pvs=21)

[Recon — Schedule](https://www.notion.so/4c5a3565c48b4c78b2beea73c2743eca?pvs=21)