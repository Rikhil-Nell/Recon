import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Link, useNavigate } from 'react-router-dom';
import PortalDiagnostics from '../components/PortalDiagnostics';
import OtpInput from '../components/OtpInput';
import { PrimaryButton } from '../components/primitives';
import { maskEmail } from '../lib/utils';
import { useAuthStore } from '../stores/authStore';

const VALID_OTP = '12345678';

export default function VerifyPage() {
    const navigate = useNavigate();
    const email = useAuthStore((state) => state.email);
    const completeVerification = useAuthStore((state) => state.completeVerification);
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [attemptsLeft, setAttemptsLeft] = useState(3);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [resendLeft, setResendLeft] = useState(0);
    const sweepRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.body.dataset.portal = 'true';
        return () => {
            delete document.body.dataset.portal;
        };
    }, []);

    useEffect(() => {
        if (!resendLeft) return;
        const id = window.setInterval(() => {
            setResendLeft((value) => (value > 0 ? value - 1 : 0));
        }, 1000);
        return () => clearInterval(id);
    }, [resendLeft]);

    const onVerify = async (event: React.FormEvent) => {
        event.preventDefault();
        if (otp.length !== 8 || loading || success) return;

        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (otp === VALID_OTP) {
            completeVerification();
            setSuccess(true);
            setLoading(false);

            const tl = gsap.timeline({
                onComplete: () => navigate('/dashboard'),
            });
            tl.to(sweepRef.current, {
                scaleY: 1,
                duration: 0.25,
                ease: 'power2.inOut',
                transformOrigin: 'top center',
            })
                .to({}, { duration: 0.3 })
                .to(sweepRef.current, {
                    scaleY: 0,
                    duration: 0.25,
                    ease: 'power2.inOut',
                    transformOrigin: 'bottom center',
                });
            return;
        }

        const nextAttempts = Math.max(0, attemptsLeft - 1);
        setAttemptsLeft(nextAttempts);
        setError(true);
        setLoading(false);
        window.setTimeout(() => setError(false), 450);
    };

    return (
        <div className="min-h-[100dvh] bg-[var(--bg)] portal-grain relative px-4 sm:px-6 py-8 sm:py-10 flex flex-col items-center justify-center overflow-y-auto">
            <header className="fixed top-[max(0.75rem,env(safe-area-inset-top))] inset-x-0 z-[120] px-4 sm:px-6">
                <div className="max-w-7xl mx-auto flex items-center justify-start">
                    <Link to="/" className="font-display text-sm tracking-[0.3em] text-paper uppercase" aria-label="Go to RECON home page">
                        RECON
                    </Link>
                </div>
            </header>

            <div
                ref={sweepRef}
                className="fixed inset-0 z-[250] pointer-events-none bg-[var(--amber)]"
                style={{ transform: 'scaleY(0)' }}
            />

            <div className="w-full max-w-md mt-6 sm:mt-8" data-portal-card>
                <div className="portal-card px-5 py-8 sm:px-8 sm:py-10">
                    <div className="font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--amber)_70%,black_10%)]">
                        CODE TRANSMITTED
                    </div>

                    <div className="mt-2 font-portal-mono text-[10px] tracking-[0.08em] text-[color-mix(in_srgb,var(--dim)_72%,white_8%)] leading-relaxed">
                        Access code sent to: {maskEmail(email || 'operator@domain.com')}
                    </div>

                    <div className="h-px bg-[var(--border-dim)] my-6" />

                    <form onSubmit={onVerify}>
                        <label className="block font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--amber)_62%,black_12%)] mb-3 text-center">
                            ENTER ACCESS CODE
                        </label>

                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            disabled={loading || success}
                            error={error}
                            success={success}
                        />

                        {error && (
                            <div className="mt-3 text-center font-portal-mono text-[10px] tracking-[0.1em] uppercase text-[var(--portal-red)]">
                                INVALID CODE - {attemptsLeft} ATTEMPTS REMAINING
                            </div>
                        )}

                        {success && (
                            <div className="mt-3 text-center font-portal-display text-[26px] text-[var(--amber)] tracking-[0.08em]">
                                ACCESS GRANTED
                            </div>
                        )}

                        <PrimaryButton type="submit" className="mt-5" disabled={loading || otp.length !== 8 || success}>
                            {loading ? (
                                <span className="inline-flex items-center gap-1">
                                    VERIFYING
                                    <span className="typing-dots" aria-hidden="true" />
                                </span>
                            ) : (
                                'VERIFY and ENTER'
                            )}
                        </PrimaryButton>

                        <div className="mt-4 text-center font-portal-mono text-[9px] tracking-[0.08em] text-[color-mix(in_srgb,var(--dim)_58%,black_20%)]">
                            Didn't receive it?{' '}
                            {resendLeft > 0 ? (
                                <span>
                                    Resend in 00:{resendLeft.toString().padStart(2, '0')}
                                </span>
                            ) : (
                                <button
                                    type="button"
                                    className="text-[var(--amber)] hover:underline underline-offset-2"
                                    onClick={() => setResendLeft(60)}
                                >
                                    Resend code
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            <PortalDiagnostics />
        </div>
    );
}
