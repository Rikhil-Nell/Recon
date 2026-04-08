import { marqueeItems } from '../data';

interface MarqueeProps {
    items?: string[];
    speed?: 'normal' | 'fast';
    className?: string;
    separator?: string;
}

export default function Marquee({
    items = marqueeItems,
    speed = 'normal',
    className = '',
    separator = '◆',
}: MarqueeProps) {
    const animClass = speed === 'fast' ? 'animate-marquee-fast' : 'animate-marquee';
    const row = items.map((item) => `${item}  ${separator}  `).join('');
    // If className includes text-void, use that; otherwise default to text-faint
    const textClass = className.includes('text-void')
        ? 'font-mono text-[11px] tracking-[0.3em] uppercase text-void/80'
        : 'font-mono text-xs tracking-[0.3em] uppercase text-faint';

    return (
        <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
            <div className={`inline-block ${animClass}`}>
                <span className={textClass}>
                    {row}
                </span>
                <span className={textClass}>
                    {row}
                </span>
            </div>
        </div>
    );
}
