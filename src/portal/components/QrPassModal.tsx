import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { StatusPill } from './primitives';

interface QrPassModalProps {
    open: boolean;
    zoneName: string;
    code: string;
    active: boolean;
    onClose: () => void;
}

export default function QrPassModal({ open, zoneName, code, active, onClose }: QrPassModalProps) {
    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!open || !contentRef.current) return;
        gsap.fromTo(
            contentRef.current,
            { scale: 0.92, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.out' },
        );
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[300] bg-[var(--bg)] flex flex-col items-center justify-center px-4">
            <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 min-h-11 min-w-11 inline-flex items-center justify-center text-[var(--fg)]"
                aria-label="Close pass modal"
            >
                <X className="size-5" />
            </button>

            <div ref={contentRef} className="text-center max-w-sm w-full">
                <div className="font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--amber)_62%,black_15%)] mb-4">
                    ENTRY PASS // {zoneName.toUpperCase()}
                </div>

                <div className="relative inline-block border border-[var(--border)] p-3 bg-white">
                    <QRCodeSVG value={`${zoneName}:${code}`} size={260} bgColor="#ffffff" fgColor="#111111" />
                    {!active && (
                        <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--portal-red)_24%,transparent)] flex items-center justify-center">
                            <span className="font-portal-mono text-[12px] tracking-[0.16em] text-[var(--portal-red)] uppercase">
                                PASS EXPIRED
                            </span>
                        </div>
                    )}
                </div>

                <div className="mt-4 flex justify-center">
                    <StatusPill tone={active ? 'green' : 'red'} label={active ? 'VALID' : 'EXPIRED'} />
                </div>
                <div className="mt-2 font-portal-mono text-[10px] text-[color-mix(in_srgb,var(--dim)_70%,white_7%)] tracking-[0.12em]">
                    PASS ID: {code}
                </div>
                <div className="mt-6 font-portal-mono text-[9px] text-[color-mix(in_srgb,var(--dim)_65%,white_6%)] tracking-[0.12em] uppercase">
                    Present this to the zone marshal at entrance.
                </div>
            </div>
        </div>
    );
}
