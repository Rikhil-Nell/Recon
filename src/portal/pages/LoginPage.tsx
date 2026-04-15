import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import BootSequence from '../components/BootSequence';
import PortalDiagnostics from '../components/PortalDiagnostics';
import { PrimaryButton } from '../components/primitives';
import { useAuthStore } from '../stores/authStore';

const BOOT_LINES = [
    'RECON 2026 // SECURE ACCESS TERMINAL',
    'INITIALIZING PARTICIPANT AUTHENTICATION...',
    'STATUS: AWAITING CREDENTIALS',
];

export default function LoginPage() {
    const navigate = useNavigate();
    const setEmail = useAuthStore((state) => state.setEmail);
    const seedEmail = useAuthStore((state) => state.email);
    const [email, setLocalEmail] = useState(seedEmail || '');
    const [loading, setLoading] = useState(false);
    const [bootDone, setBootDone] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.dataset.portal = 'true';
        return () => {
            delete document.body.dataset.portal;
        };
    }, []);

    useLayoutEffect(() => {
        if (!bootDone || !formRef.current || !inputRef.current || !buttonRef.current) return;

        gsap.fromTo(
            formRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
        );
        gsap.fromTo(
            inputRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, delay: 0.05 },
        );
        gsap.fromTo(
            buttonRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.35, delay: 0.3 },
        );
    }, [bootDone]);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!email.trim() || loading) return;
        setLoading(true);
        setEmail(email.trim());
        await new Promise((resolve) => setTimeout(resolve, 900));
        navigate('/verify');
    };

    return (
        <div className="min-h-screen bg-[var(--bg)] portal-grain relative px-6 flex flex-col items-center justify-center">
            <BootSequence lines={BOOT_LINES} speed={40} onComplete={() => setBootDone(true)} />

            <div ref={formRef} className="w-full max-w-sm mt-8 opacity-0">
                <div className="portal-card px-8 py-10">
                    <div className="font-portal-display text-[36px] leading-none text-[var(--fg)] tracking-[0.03em]">
                        RECON <span className="text-[var(--amber)]">2026</span>
                    </div>
                    <div className="mt-2 font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--dim)_76%,white_6%)]">
                        PARTICIPANT CLEARANCE PORTAL
                    </div>

                    <div className="h-px bg-[var(--border-dim)] my-6" />

                    <form onSubmit={onSubmit}>
                        <label className="block font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--amber)_62%,black_12%)] mb-2">
                            REGISTERED EMAIL
                        </label>

                        <input
                            ref={inputRef}
                            type="email"
                            required
                            value={email}
                            onChange={(event) => setLocalEmail(event.target.value)}
                            placeholder="operator@domain.com"
                            className="w-full min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-4 py-3 font-portal-mono text-[16px] text-[var(--fg)] placeholder:text-[color-mix(in_srgb,var(--dim)_55%,black_20%)] outline-none focus:border-[var(--amber)] opacity-0"
                        />

                        <div ref={buttonRef} className="opacity-0 mt-4">
                            <PrimaryButton type="submit" disabled={loading}>
                                {loading ? (
                                    <span className="inline-flex items-center gap-1">
                                        TRANSMITTING
                                        <span className="typing-dots" aria-hidden="true" />
                                    </span>
                                ) : (
                                    'REQUEST ACCESS CODE ->'
                                )}
                            </PrimaryButton>
                        </div>

                        <p className="mt-4 text-center font-portal-mono text-[9px] tracking-[0.08em] text-[color-mix(in_srgb,var(--dim)_58%,black_20%)] leading-relaxed">
                            An 8-digit access code will be sent to your registered email address.
                        </p>
                    </form>
                </div>
            </div>

            <PortalDiagnostics />
        </div>
    );
}
