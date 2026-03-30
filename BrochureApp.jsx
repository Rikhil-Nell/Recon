
import { useState, useEffect, useRef } from 'react';
import './index.css';

function App() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleClick = (e) => {
            if (!e.target.closest('.header-logo') && !e.target.closest('.contact-dropdown')) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, []);

    // Scroll progress bar
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll-reveal: fade up elements as they enter viewport
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1
        });

        const revealTargets = document.querySelectorAll('.slide-inner');
        revealTargets.forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
            <div className="noise" />

            <div
                className="header-logo"
                id="headerLogo"
                title="Contact Us"
                onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <img src="logo/Recon Event Logo.jpeg" alt="Recon" />
            </div>

            <div className={`contact-dropdown ${dropdownOpen ? 'open' : ''}`} id="contactDropdown">
                <div className="cd-title">Event Contact</div>
                <a href="mailto:recon2k26@gmail.com" className="cd-item">
                    <svg className="cd-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>recon2k26@gmail.com</span>
                </a>
                <a href="https://x.com/Recon2k26" target="_blank" className="cd-item">
                    <svg className="cd-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                    </svg>
                    <span>@Recon2k26</span>
                </a>
                <a href="https://www.instagram.com/recon_2k26" target="_blank" className="cd-item">
                    <svg className="cd-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                    <span>recon_2k26</span>
                </a>
                <a href="https://www.linkedin.com/in/recon-events/" target="_blank" className="cd-item">
                    <svg className="cd-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span>recon-events</span>
                </a>

                <div className="cd-title">Event Director</div>
                <a href="mailto:nrikhil@gmail.com" className="cd-item">
                    <svg className="cd-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                    </svg>
                    <span>nrikhil@gmail.com</span>
                </a>
                <a href="tel:+917386175224" className="cd-item">
                    <svg className="cd-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />

                    </svg>
                    <span>+91 738 617 5224</span>
                </a>
                <a href="https://linkedin.com/in/rikhil-nellimarla" target="_blank" className="cd-item">
                    <svg className="cd-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                    </svg>
                    <span>rikhil nellimarla</span>
                </a>
                <div
                    style={{ marginTop: '1rem', paddingTop: '.8rem', borderTop: '1px solid rgba(255,255,255,.05)', fontSize: '.8rem', color: 'var(--gray-400)' }}>
                    Organized by Open Source Community & Null Chapter
                </div>
            </div>

            <div className="deck" id="deck">
                <div className="slide" id="s1">
                    <div className="glow glow-1"></div>
                    <div className="glow glow-2"></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Inaugural Annual Edition • April 19-21 · VIT-AP University, Amaravati</div>
                        <h1>RECON<br /><span className="accent">2026</span></h1>
                        <p className="subtitle">India's premier student-led DEFCON-style cybersecurity conference. Three days of
                            offensive security, competitive hacking, and direct access to 600+ driven security engineers.</p>
                        <div className="stat-row">
                            <div className="stat">
                                <div className="stat-num">600+</div>
                                <div className="stat-label">Security Enthusiasts</div>
                            </div>
                            <div className="stat">
                                <div className="stat-num">72H</div>
                                <div className="stat-label">Nonstop Operations</div>
                            </div>
                            <div className="stat">
                                <div className="stat-num">10+</div>
                                <div className="stat-label">Security Villages</div>
                            </div>
                            <div className="stat">
                                <div className="stat-num">₹4.97L</div>
                                <div className="stat-label">Event Budget</div>
                            </div>
                        </div>
                        <div className="marquee-wrapper">
                            <div className="marquee-track">
                                <div className="marquee-content">
                                    <div className="sponsor-pill">
                                        <img src="logo/VITAP%20Logo.png" alt="VIT-AP University" />
                                    </div>
                                    <div className="sponsor-pill">
                                        <img src="logo/IIT%20Madras%20Logo.png" alt="IIT Madras" style={{ transform: 'scale(1.4)' }} />
                                    </div>
                                    <div className="sponsor-pill">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Ministry_of_Electronics_and_Information_Technology.svg" alt="MeitY" />
                                    </div>
                                    <div className="sponsor-pill">
                                        <img src="logo/ISEA%20Logo.png" alt="ISEA" style={{ transform: 'scale(1.3)' }} />
                                    </div>
                                    <div className="sponsor-pill">
                                        <img src="logo/DF%20HD%20Logo.png" alt="Digital Fortress" style={{ transform: 'scale(1.5)' }} />
                                    </div>
                                </div>
                                <div className="marquee-content" aria-hidden="true">
                                    <div className="sponsor-pill">
                                        <img src="logo/VITAP%20Logo.png" alt="VIT-AP University" />
                                    </div>
                                    <div className="sponsor-pill">
                                        <img src="logo/IIT%20Madras%20Logo.png" alt="IIT Madras" style={{ transform: 'scale(1.4)' }} />
                                    </div>
                                    <div className="sponsor-pill">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Ministry_of_Electronics_and_Information_Technology.svg" alt="MeitY" />
                                    </div>
                                    <div className="sponsor-pill">
                                        <img src="logo/ISEA%20Logo.png" alt="ISEA" style={{ transform: 'scale(1.3)' }} />
                                    </div>
                                    <div className="sponsor-pill">
                                        <img src="logo/DF%20HD%20Logo.png" alt="Digital Fortress" style={{ transform: 'scale(1.5)' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="slide" id="s2">
                    <div className="glow glow-1" style={{ top: '-30%', right: '20%' }}></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Why This Exists</div>
                        <h2>NOT ANOTHER<br />TECH FEST</h2>
                        <div style={{ maxWidth: '900px' }}>
                            <p className="subtitle" style={{ marginBottom: '1rem' }}>Recon is a national-level, security-focused,
                                DEFCON-style campus event built for
                                high technical credibility, real engagement, and zero compromises on safety.</p>
                            <p className="body" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}><strong>Mission:</strong> Run a
                                3-day cybersecurity immersion under strict university constraints —
                                sandboxed offensive security, real infrastructure, actual skill assessment — not a glorified
                                seminar with PowerPoints.</p>
                        </div>

                        <div className="two-col"
                            style={{ marginTop: '1rem', borderTop: '1px dashed var(--gray-800)', paddingTop: '2rem' }}>
                            <div>
                                <h3>Primary Outcomes</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', marginTop: '.8rem' }}>
                                    <div className="body" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}><span
                                        style={{ color: 'var(--green)' }}>✓</span> <span>4 keynote/talk blocks delivered on
                                            schedule</span></div>
                                    <div className="body" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}><span
                                        style={{ color: 'var(--green)' }}>✓</span> <span>1 overnight CTF delivered
                                            end-to-end</span></div>
                                    <div className="body" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}><span
                                        style={{ color: 'var(--green)' }}>✓</span> <span>1 overnight KOTH delivered
                                            end-to-end</span></div>
                                    <div className="body" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}><span
                                        style={{ color: 'var(--green)' }}>✓</span> <span>10+ side events on published
                                            schedule</span></div>
                                    <div className="body" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}><span
                                        style={{ color: 'var(--green)' }}>✓</span> <span>Zero legal/policy breaches / safety
                                            incidents</span></div>
                                </div>
                            </div>
                            <div>
                                <h3>Secondary Goals</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', marginTop: '.8rem' }}>
                                    <div className="body" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}><span
                                        style={{ color: 'var(--purple-light)', fontFamily: 'JetBrains Mono' }}>→</span> <span>15+
                                            sponsors/partners active</span></div>
                                    <div className="body" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}><span
                                        style={{ color: 'var(--purple-light)', fontFamily: 'JetBrains Mono' }}>→</span> <span>450+
                                            active attendance, 250+ outstation</span></div>
                                    <div className="body" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}><span
                                        style={{ color: 'var(--purple-light)', fontFamily: 'JetBrains Mono' }}>→</span> <span>Live
                                            social + campus screen media footprint</span></div>
                                </div>
                                <div className="callout"
                                    style={{ marginTop: '1.5rem', background: 'transparent', border: '1px solid var(--gray-800)', borderLeft: '3px solid var(--purple)' }}>
                                    <p style={{ color: 'var(--gray-300)', fontSize: '0.9rem' }}>Backed by <strong>IIT Madras</strong>.
                                        Organized by <strong>Open Source Community + Null Chapter</strong> at VIT-AP. Advisory:
                                        <strong>Dr. Sibi Chakkaravarty</strong>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="slide" id="s3">
                    <div className="glow glow-2" style={{ bottom: '-25%', left: '30%' }}></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Scale & Impact</div>
                        <h2>BY THE<br />NUMBERS</h2>
                        <p className="subtitle">A fully operational security conference with the infrastructure and logistics to
                            back it up.</p>
                        <div className="stat-row">
                            <div className="stat">
                                <div className="stat-num">600</div>
                                <div className="stat-label">Registered Participants</div>
                            </div>
                            <div className="stat">
                                <div className="stat-num">250+</div>
                                <div className="stat-label">Outstation Attendees</div>
                            </div>
                            <div className="stat">
                                <div className="stat-num">40</div>
                                <div className="stat-label">Trained Workforce</div>
                            </div>
                            <div className="stat">
                                <div className="stat-num">3</div>
                                <div className="stat-label">Days, 72 Hours</div>
                            </div>
                        </div>
                        <div className="stat-row">
                            <div className="stat">
                                <div className="stat-num">10+</div>
                                <div className="stat-label">Security Villages & Workshops</div>
                            </div>
                            <div className="stat">
                                <div className="stat-num">20-30</div>
                                <div className="stat-label">CTF Challenges</div>
                            </div>
                            <div className="stat">
                                <div className="stat-num">12</div>
                                <div className="stat-label">KOTH Target Machines</div>
                            </div>
                            <div className="stat">
                                <div className="stat-num">15+</div>
                                <div className="stat-label">Sponsor/Partner Slots</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="slide" id="s4">
                    <div className="glow glow-1" style={{ top: '10%', right: '-15%' }}></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Event Schedule</div>
                        <h2>THREE DAYS.<br />ZERO DOWNTIME.</h2>
                        <div className="timeline">
                            <div className="tl-day">
                                <div className="tl-label">DAY 1</div>
                                <div className="tl-items">
                                    <div className="tl-item"><span className="tl-time">09:30</span>Gates Open</div>
                                    <div className="tl-item"><span className="tl-time">10:00</span>Inauguration</div>
                                    <div className="tl-item">
                                        <span className="tl-time">11:00</span>
                                        <div>
                                            <strong className="text-white">Talk 1</strong>
                                            <div style={{ fontSize: '0.85em', color: 'var(--gray-400)', lineHeight: '1.4', marginTop: '0.2rem' }}>
                                                National Workshop on System Security: From Vulnerabilities To Trustworthy Systems
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tl-item">
                                        <span className="tl-time">13:30</span>
                                        <div>
                                            <strong className="text-white">Talk 2</strong>
                                            <div style={{ fontSize: '0.85em', color: 'var(--gray-400)', lineHeight: '1.4', marginTop: '0.2rem' }}>
                                                National Workshop on System Security: From Vulnerabilities To Trustworthy Systems
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tl-item"><span className="tl-time">15:00</span>All Stalls Open</div>
                                    <div className="tl-item"><span className="tl-time">17:00</span>CTF Briefing & Break</div>
                                    <div className="tl-item"><span className="tl-time">18:00</span><strong className="text-white">Overnight
                                        CTF begins →</strong> runs until 06:00</div>
                                </div>
                            </div>
                            <div className="tl-day">
                                <div className="tl-label">DAY 2</div>
                                <div className="tl-items">
                                    <div className="tl-item"><span className="tl-time">06:00</span>Recovery & Low-Intensity Block</div>
                                    <div className="tl-item">
                                        <span className="tl-time">13:30</span>
                                        <div>
                                            <strong className="text-white">Talk 3</strong>
                                            <div style={{ fontSize: '0.85em', color: 'var(--gray-400)', lineHeight: '1.4', marginTop: '0.2rem' }}>
                                                National Workshop on System Security: From Vulnerabilities To Trustworthy Systems
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tl-item">
                                        <span className="tl-time">14:30</span>
                                        <div>
                                            <strong className="text-white">Talk 4</strong>
                                            <div style={{ fontSize: '0.85em', color: 'var(--gray-400)', lineHeight: '1.4', marginTop: '0.2rem' }}>
                                                National Workshop on System Security: From Vulnerabilities To Trustworthy Systems
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tl-item"><span className="tl-time">15:30</span>All Stalls Open</div>
                                    <div className="tl-item"><span className="tl-time">21:30</span>Dinner + KOTH Briefing</div>
                                    <div className="tl-item"><span className="tl-time">22:00</span><strong className="text-white">Overnight
                                        KOTH begins →</strong> runs until 06:00</div>
                                </div>
                            </div>
                            <div className="tl-day">
                                <div className="tl-label">DAY 3</div>
                                <div className="tl-items">
                                    <div className="tl-item"><span className="tl-time">06:00</span>Recovery & Adjudication</div>
                                    <div className="tl-item"><span className="tl-time">14:00</span>Finals Highlights & Lightning Talks</div>
                                    <div className="tl-item"><span className="tl-time">16:00</span><strong className="text-white">Awards &
                                        Closing Ceremony</strong></div>
                                    <div className="tl-item"><span className="tl-time">17:00</span>Teardown & asset recovery</div>
                                </div>
                            </div>
                        </div>
                        <div className="callout">
                            <p><strong>Sponsor Demo Street</strong> runs on Day 1 (16:00) and Day 2 (16:00) — your prime window for
                                booth traffic, challenge engagement, and direct talent conversations.</p>
                        </div>
                    </div>
                </div>


                <div className="slide" id="s5">
                    <div className="glow glow-2" style={{ bottom: '10%', right: '20%' }}></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Flagship Competition #1</div>
                        <h2>CAPTURE<br />THE FLAG</h2>
                        <p className="subtitle">12-hour overnight jeopardy-style CTF. The single largest engagement window of the
                            event.</p>
                        <div className="two-col">
                            <div>
                                <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
                                    <div className="card">
                                        <div className="card-title">Format</div>
                                        <div className="card-text">Day 1 18:00 → Day 2 06:00. Jeopardy style with 20–30 challenges
                                            across tiered difficulty levels. Dynamic hints unlock as the night progresses. Teams
                                            of 1–4. <strong>The Top 3 teams are awarded grand prizes.</strong></div>
                                    </div>
                                    <div className="card">
                                        <div className="card-title">Categories</div>
                                        <div className="card-text">Web exploitation · Binary pwn · Cryptography · Digital forensics
                                            · Miscellaneous · OSINT. Sponsors can deploy custom challenges aligned with their
                                            tech stack.</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
                                    <div className="card">
                                        <div className="card-title">Anti-Cheat</div>
                                        <div className="card-text">Account/device/IP correlation checks. VPN-logged connections tied
                                            to participant IDs. Writeup audits for top 10 teams before prize confirmation.</div>
                                    </div>
                                    <div className="card">
                                        <div className="card-title">Infrastructure</div>
                                        <div className="card-text">Self-hosted CTFd on AWS EC2 (t3.xlarge). CloudFront CDN for
                                            challenge files. OpenVPN overlay for isolated challenge access. Hourly snapshot
                                            backups.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="callout">
                            <p><strong>Sponsor Opportunity:</strong> Deploy a branded challenge category within the CTF. Your
                                team writes the challenges, we handle infra. Participants associate your brand with the hardest
                                problems they solved all night.</p>
                        </div>
                    </div>
                </div>


                <div className="slide" id="s6">
                    <div className="glow glow-1" style={{ top: '20%', left: '-10%' }}></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Flagship Competition #2</div>
                        <h2>KING OF<br />THE HILL</h2>
                        <p className="subtitle">8-hour overnight attack/defend war on live vulnerable infrastructure. The ultimate
                            test of offensive and defensive skill.</p>
                        <div className="two-col">
                            <div>
                                <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
                                    <div className="card">
                                        <div className="card-title">Format</div>
                                        <div className="card-text">Day 2 22:00 → Day 3 06:00. 8–12 target boxes running real
                                            vulnerable services. Teams gain points for every interval they hold a machine.
                                            Red/Blue hybrid optional for finals. Teams
                                            of 1–4. <strong>The Top 3 teams are awarded grand prizes.</strong></div>
                                    </div>
                                    <div className="card">
                                        <div className="card-title">Target Architecture</div>
                                        <div className="card-text">10× AWS EC2 instances (t3.medium) in isolated VPN subnet.
                                            Automated snapshot/restore every 30–60 min to prevent dead boxes. Security groups
                                            enforce VPN-only access.</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="card-grid" style={{ gridTemplateColumns: '1fr' }}>
                                    <div className="card">
                                        <div className="card-title">Scoring</div>
                                        <div className="card-text">Point accrual per hold interval. First blood bonuses. Longest
                                            hold awards. Mandatory reset windows keep competition fair and prevent box lockouts.
                                            Target rotation maintains momentum.
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-title">Prize Logic</div>
                                        <div className="card-text">Top 3 overall + first blood + longest hold. Side-event passport
                                            pool rewards the top 20 point earners across all activities including KOTH.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="slide" id="s7">
                    <div className="glow glow-2" style={{ bottom: '-20%', left: '40%' }}></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Security Villages — Part 1</div>
                        <h2>HANDS-ON<br />VILLAGES</h2>
                        <p className="subtitle">Rotating, immersive activity zones that keep 600 participants engaged between
                            flagship competitions.</p>
                        <div className="grid-5-centered">
                            <div className="card">
                                <div className="card-icon">🔐</div>
                                <div className="card-title">RFID Lock Hunt</div>
                                <div className="card-text">Campus-wide clue trail leading to RFID lockbox challenges. 3 programmable
                                    locks, 8 RFID keycards, key logic rotates every 2 hours. Max 3 unlock attempts per session.
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">🔧</div>
                                <div className="card-title">Hardware Badge + IoT Village</div>
                                <div className="card-text">Build interactive badges with MCU boards, LEDs, sensors. 40 solder
                                    stations with PPE-mandatory safety marshals. Tracks: beginner blink → sensor integration →
                                    firmware hardening.</div>
                            </div>
                            <div className="card">
                                <div className="card-icon">🎮</div>
                                <div className="card-title">Gaming Arena</div>
                                <div className="card-text">Short-format FIFA/Valorant/CS2 tournaments. 12–20 gaming rigs, 20-min
                                    slot model with app-managed queues. Passport points for winners — drives sponsor zone foot
                                    traffic.</div>
                            </div>
                            <div className="card">
                                <div className="card-icon">🌐</div>
                                <div className="card-title">Web Exploit Dojo</div>
                                <div className="card-text">OWASP Top 10 sandbox with guided 45-min modules. Beginner & advanced
                                    lanes. Containerized targets reset every session — credentials rotated per block.</div>
                            </div>
                            <div className="card">
                                <div className="card-icon">🔍</div>
                                <div className="card-title">OSINT Corner</div>
                                <div className="card-text">Time-boxed investigations on synthetic personas & public datasets. Social
                                    graph mapping, location inference, metadata extraction. New scenario every hour.</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="slide" id="s8">
                    <div className="glow glow-1" style={{ top: '-15%', left: '50%' }}></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Security Villages — Part 2</div>
                        <h2>MORE<br />VILLAGES</h2>
                        <p className="subtitle">From AI red-teaming to career clinics — every skill level and interest has a home at
                            Recon.</p>
                        <div className="grid-5-centered">
                            <div className="card">
                                <div className="card-icon">🧬</div>
                                <div className="card-title">Forensics Sprint</div>
                                <div className="card-text">30-min rapid DFIR cases: memory dumps, pcap analysis, log triage,
                                    steganography. Rolling case drops every hour. Individual or pairs.</div>
                            </div>
                            <div className="card">
                                <div className="card-icon">🤖</div>
                                <div className="card-title">AI Red-Team Mini-Lab</div>
                                <div className="card-text">Prompt injection, jailbreak defenses, model misuse case studies.
                                    Attack/defend tabletop + hands-on sandbox. Teams submit exploit chain + mitigation notes.
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-icon">🐛</div>
                                <div className="card-title">Bug Bounty App Quest</div>
                                <div className="card-text">Hidden easter egg campaign in the event app. Legally scoped targets on
                                    isolated challenge hosts. Discoverable by participants, tracked on secret leaderboard.</div>
                            </div>
                            <div className="card">
                                <div className="card-icon">💼</div>
                                <div className="card-title">Security Career Clinic</div>
                                <div className="card-text">CV triage, GitHub profile reviews, roadmap advising, internship prep.
                                    High engagement for non-hardcore participants — a soft landing for sponsor recruitment
                                    conversations.</div>
                            </div>
                            <div className="card">
                                <div className="card-icon">🏪</div>
                                <div className="card-title">Sponsor Demo Street</div>
                                <div className="card-text">Fixed demo blocks with mandatory interactive components. No pure sales
                                    pitches &gt;10 min. Resume reviews, secure coding sprints, API bug hunts, RE puzzles with swag.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <div className="slide" id="s9">
                    <div className="glow glow-1" style={{ top: '-30%', right: '-10%' }}></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Audience Profile</div>
                        <h2>YOUR NEXT<br />SECURITY TEAM</h2>
                        <p className="subtitle">Connect with India's most driven cybersecurity talent in an environment built for
                            authentic engagement.</p>
                        <div className="stat-row">
                            <div className="stat">
                                <div className="stat-num">65%</div>
                                <div className="stat-label">CS & Engineering Students</div>
                            </div>
                            <div className="stat">
                                <div className="stat-num">40%</div>
                                <div className="stat-label">Final Year (Placement Ready)</div>
                            </div>
                            <div className="stat">
                                <div className="stat-num">250+</div>
                                <div className="stat-label">Active CTF Competitors</div>
                            </div>
                        </div>
                        <div className="card-grid">
                            <div className="card">
                                <div className="card-title">CTF Champions</div>
                                <div className="card-text">Top performers from national jeopardy and attack/defend capture-the-flag
                                    competitions, looking for real-world challenges.</div>
                            </div>
                            <div className="card">
                                <div className="card-title">Placement-Ready Seniors</div>
                                <div className="card-text">Final-year students actively seeking security engineering, penetration
                                    testing, and SOC analyst roles.</div>
                            </div>
                            <div className="card">
                                <div className="card-title">Security Researchers</div>
                                <div className="card-text">Students publishing CVEs, discovering vulnerabilities, and contributing
                                    to open-source security tooling.</div>
                            </div>
                            <div className="card">
                                <div className="card-title">Community Leaders</div>
                                <div className="card-text">Active members and leads of Null chapters, OWASP student chapters, and
                                    university security clubs.</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="slide" id="s10">
                    <div className="glow glow-2" style={{ bottom: '-20%', left: '-10%' }}></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Partnership Opportunities</div>
                        <h2>SPONSORSHIP<br />TIERS</h2>
                        <p className="subtitle">Three tiers, one goal: measurable talent acquisition and brand visibility.</p>
                        <div className="tier-grid">
                            <div className="tier featured">
                                <div className="tier-name">Title</div>
                                <div className="tier-price">₹2,00,000</div>
                                <p className="body" style={{ marginBottom: '1rem', fontSize: '.85rem' }}>(1 slot available)</p>
                                <ul className="tier-list">
                                    <li>Exclusive naming rights ("Powered by [You]")</li>
                                    <li>30-minute keynote + demo slot on main stage</li>
                                    <li>Premium booth in central networking zone</li>
                                    <li>Full logo prominence on all event creatives</li>
                                    <li>Dedicated challenge category in CTF</li>
                                    <li>Direct access to participant resume database</li>
                                    <li>5 all-access passes for recruiting team</li>
                                </ul>
                            </div>
                            <div className="tier">
                                <div className="tier-name">Gold</div>
                                <div className="tier-price">₹75,000</div>
                                <p className="body" style={{ marginBottom: '1rem', fontSize: '.85rem' }}>(Up to 4 slots available)</p>
                                <ul className="tier-list">
                                    <li>15-minute presentation block</li>
                                    <li>Standard booth with branded backdrop</li>
                                    <li>Secondary stage/logo placement across venue</li>
                                    <li>Sponsored challenge in CTF or workshop</li>
                                    <li>Access to opt-in participant resume book</li>
                                    <li>3 event passes for recruiting team</li>
                                </ul>
                            </div>
                            <div className="tier">
                                <div className="tier-name">Community</div>
                                <div className="tier-price">₹25,000</div>
                                <p className="body" style={{ marginBottom: '1rem', fontSize: '.85rem' }}>(Unlimited slots)</p>
                                <ul className="tier-list">
                                    <li>Logo placement on website & sponsor wall</li>
                                    <li>Shared booth or kiosk window in sponsor zone</li>
                                    <li>Swag/reward partner recognition</li>
                                    <li>Social media recognition pre/post event</li>
                                    <li>1 event pass for company representative</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="slide" id="s11">
                    <div className="glow glow-1" style={{ top: '20%', right: '-10%' }}></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Engagement Formats</div>
                        <h2>ACTIVATIONS<br />THAT CONVERT</h2>
                        <p className="subtitle">No pure sales pitches. Recon sponsor activations must be hands-on technical
                            experiences or direct career opportunities.</p>
                        <div className="grid-5-centered">
                            <div className="feat">
                                <div className="feat-title">Secure Coding Sprint</div>
                                <div className="feat-text">45-min timed challenge. Participants fix intentionally vulnerable code in
                                    your provided tech stack. Winners get prizes, you identify top dev-sec talent.</div>
                            </div>
                            <div className="feat">
                                <div className="feat-title">API Bug Hunt (Sandbox)</div>
                                <div className="feat-text">Deploy an intentionally vulnerable API instance on our sandboxed network.
                                    Participants race to find bugs using your tools. Live leaderboard drives competition.</div>
                            </div>
                            <div className="feat">
                                <div className="feat-title">Cloud Security Quest</div>
                                <div className="feat-text">30-45 min misconfigured cloud environment challenge. Teams exploit (then
                                    secure) IAM, S3, or logging setups. Perfect for cloud talent.</div>
                            </div>
                            <div className="feat">
                                <div className="feat-title">Reverse Eng Micro-Challenge</div>
                                <div className="feat-text">30-min static/dynamic binary analysis puzzle. Sponsor provides the
                                    binary, participants retrieve the flag and explain the reasoning.</div>
                            </div>
                            <div className="feat">
                                <div className="feat-title">Career Booth & Speed Interviews</div>
                                <div className="feat-text">Continuous activation throughout Day 2. Perform on-site resume triage,
                                    portfolio checks, and give out "fast-track" mock interview tokens.</div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="slide" id="s12">
                    <div className="glow glow-2" style={{ bottom: '-30%', left: '20%' }}></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Measurable Outcomes</div>
                        <h2>QUANTIFIED<br />ROI</h2>
                        <p className="subtitle">Trackable, predictable metrics to prove your sponsorship delivered real hiring and
                            branding outcomes.</p>
                        <div className="roi-row">
                            <div className="roi">
                                <div className="roi-val">CVs</div>
                                <div className="roi-label">Qualified Candidate Pipeline (Opt-in)</div>
                            </div>
                            <div className="roi">
                                <div className="roi-val">Data</div>
                                <div className="roi-label">Challenge Performance Analytics</div>
                            </div>
                            <div className="roi">
                                <div className="roi-val">Media</div>
                                <div className="roi-label">Post-Event Content Assets</div>
                            </div>
                            <div className="roi">
                                <div className="roi-val">Reach</div>
                                <div className="roi-label">Tracked Footfall & Impressions</div>
                            </div>
                        </div>
                        <div className="two-col">
                            <div>
                                <h3>Talent Discovery</h3>
                                <p className="body">Receive resumes (with attendee consent) explicitly linked to challenge
                                    completion. Stop guessing skills during technical rounds — hire the student who solved your
                                    custom pwn challenge at 3 AM.</p>
                            </div>
                            <div>
                                <h3>Documentation & Brand Engagement</h3>
                                <p className="body">Preliminary sponsor report delivered within 72 hours. Final detailed report
                                    (footfall estimates by slot, challenge solves, stage mentions) delivered within 7 days.
                                    <strong> All sponsors receive high-resolution photographic documentation of their branding,
                                        booths, and winning teams for internal verification and marketing.</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="slide" id="s13">
                    <div className="glow glow-1" style={{ top: '10%', left: '-20%' }}></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Behind the Scenes</div>
                        <h2>ENTERPRISE-GRADE<br />INFRASTRUCTURE</h2>
                        <p className="subtitle">We built a resilient, cloud-first architecture so operations never fail when the
                            campus network inevitably chokes.</p>
                        <div className="two-col">
                            <div className="card" style={{ borderColor: 'var(--purple)' }}>
                                <div className="card-title accent">OpenVPN Overlay Network</div>
                                <div className="card-text">Campus IT restrictions bypassed safely. All participants connect to AWS
                                    OpenVPN via custom .ovpn profiles (600+ unique configs tied to IDs). 10.8.x.x subnet access
                                    only.</div>
                                <div className="tag-row">
                                    <span className="tag">AWS EC2</span><span className="tag">VPN</span><span
                                        className="tag">Anti-Cheat</span>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-title">Cloud-Hosted Flagships</div>
                                <div className="card-text">CTF platform running on scalable self-hosted instances. KOTH comprises 10
                                    isolated targets running in a locked-down VPC with automated snapshot restores.</div>
                                <div className="tag-row">
                                    <span className="tag">CTFd</span><span className="tag">AWS S3</span><span className="tag">CloudFront
                                        CDN</span>
                                </div>
                            </div>
                        </div>
                        <div className="card" style={{ marginTop: '1.5rem' }}>
                            <div className="card-title text-white">Strict Compliance & Safety</div>
                            <div className="card-text">All targets are strictly sandboxed. Zero-trust regarding university
                                infrastructure. Full logging for challenge environments. Clear vulnerability disclosure policies
                                and immediate disqualification protocol for out-of-scope attacks. Incident response playbook
                                active 24/7.</div>
                        </div>
                    </div>
                </div>


                <div className="slide" id="s14">
                    <div className="glow glow-2" style={{ bottom: '-20%', right: '-10%' }}></div>
                    <div className="slide-inner">
                        <div className="eyebrow">Key Dates</div>
                        <h2>PARTNERSHIP<br />TIMELINE</h2>
                        <p className="subtitle">Structured milestones to ensure flawless execution and mutual preparedness.</p>
                        <div className="timeline">
                            <div className="tl-day">
                                <div className="tl-label" style={{ color: 'var(--white)' }}>T-30</div>
                                <div className="tl-items">
                                    <div className="tl-item"><strong className="accent">Mar 20: Sponsor commitment period
                                        opens.</strong> Select tier, outline activation format.</div>
                                </div>
                            </div>
                            <div className="tl-day">
                                <div className="tl-label" style={{ color: 'var(--purple-light)' }}>T-21</div>
                                <div className="tl-items">
                                    <div className="tl-item"><strong>Mar 29: Commercial intent locked.</strong> SOW signatures and
                                        package confirmation.</div>
                                </div>
                            </div>
                            <div className="tl-day">
                                <div className="tl-label" style={{ color: 'var(--purple-light)' }}>T-14</div>
                                <div className="tl-items">
                                    <div className="tl-item"><strong>Apr 5: Assets freeze.</strong> Branding assets, final copy, and
                                        initial logistics brief submitted.</div>
                                </div>
                            </div>
                            <div className="tl-day">
                                <div className="tl-label" style={{ color: 'var(--purple-light)' }}>T-10</div>
                                <div className="tl-items">
                                    <div className="tl-item"><strong>Apr 9: Technical freeze.</strong> Power/network stall
                                        requirements locked. Challenge scope reviewed.</div>
                                </div>
                            </div>
                            <div className="tl-day">
                                <div className="tl-label" style={{ color: 'var(--purple-light)' }}>T-7</div>
                                <div className="tl-items">
                                    <div className="tl-item"><strong>Apr 12: Dry run.</strong> Challenge dry run and compliance
                                        check within sandbox environment.</div>
                                </div>
                            </div>
                            <div className="tl-day">
                                <div className="tl-label" style={{ color: 'var(--purple)' }}>DAY 0</div>
                                <div className="tl-items">
                                    <div className="tl-item"><strong>Apr 19–21: Recon event live.</strong> Real-time engagement
                                        tracking.</div>
                                </div>
                            </div>
                            <div className="tl-day">
                                <div className="tl-label" style={{ color: 'var(--purple)' }}>T+7</div>
                                <div className="tl-items">
                                    <div className="tl-item"><strong>Apr 28: Deliverables.</strong> Final sponsor analytics report
                                        and candidate database handover.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="slide" id="s15">
                    <div className="glow glow-1"
                        style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', opacity: '.08' }}></div>
                    <div className="slide-inner" style={{ textAlign: 'center' }}>
                        <div className="cta-box">
                            <div className="cta-inner">
                                <div className="eyebrow"
                                    style={{ background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.2)', color: 'var(--white)' }}>
                                    Let's Build This Together</div>
                                <div className="cta-title">SECURE YOUR<br />HIRING FUNNEL NOW</div>
                                <p className="cta-text">Sponsor slots are capped to maintain event quality and ensure high ROI for
                                    all partners. Reach out to discuss how Recon 2026 fits your technical recruitment strategy.
                                </p>
                                <div className="contact-cols">

                                    <div>
                                        <div className="contact-col-title">Event Contact</div>
                                        <div className="contact-col-links">
                                            <div className="contact-item">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path
                                                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />

                                                    <polyline points="22,6 12,13 2,6" />
                                                </svg>
                                                <a href="mailto:recon2k26@gmail.com">recon2k26@gmail.com</a>
                                            </div>
                                            <div className="contact-item">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                                                    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                                                </svg>
                                                <a href="https://x.com/Recon2k26" target="_blank">@Recon2k26</a>
                                            </div>
                                            <div className="contact-item">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                                </svg>
                                                <a href="https://www.instagram.com/recon_2k26" target="_blank">@recon_2k26</a>
                                            </div>
                                            <div className="contact-item">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path
                                                        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />

                                                    <rect x="2" y="9" width="4" height="12" />
                                                    <circle cx="4" cy="4" r="2" />
                                                </svg>
                                                <a href="https://www.linkedin.com/in/recon-events/"
                                                    target="_blank">recon-events</a>
                                            </div>
                                        </div>
                                    </div>


                                    <div>
                                        <div className="contact-col-title">Event Director</div>
                                        <div className="contact-col-links">
                                            <div className="contact-item">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path
                                                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />

                                                    <polyline points="22,6 12,13 2,6" />
                                                </svg>
                                                <a href="mailto:nrikhil@gmail.com">nrikhil@gmail.com</a>
                                            </div>
                                            <div className="contact-item">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path
                                                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />

                                                </svg>
                                                <a href="tel:+917386175224">+91 7386175224</a>
                                            </div>
                                            <div className="contact-item">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    strokeLinejoin="round">
                                                    <path
                                                        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />

                                                    <rect x="2" y="9" width="4" height="12" />
                                                    <circle cx="4" cy="4" r="2" />
                                                </svg>
                                                <a href="https://linkedin.com/in/rikhil-nellimarla" target="_blank">rikhil
                                                    nellimarla</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--gray-800)' }}>
                            <p
                                style={{ fontSize: '.9rem', color: 'var(--gray-400)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                                Organized By</p>
                            <div
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '1rem' }}>
                                <img src="logo/OSC%20Logo.png" alt="OSC" style={{ height: '50px', objectFit: 'contain' }} />
                                <img src="logo/Null%20Logo.png" alt="Null"
                                    style={{ height: '50px', objectFit: 'contain' }} />
                            </div>
                            <p style={{ fontSize: '1rem', color: 'var(--purple-light)' }}>VIT-AP University • Advisory: Dr. Sibi
                                Chakkaravarty</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
