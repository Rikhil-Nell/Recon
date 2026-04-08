import { useMousePosition } from '../hooks';

export default function Crosshair() {
    const { x, y } = useMousePosition();

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none hidden md:block" aria-hidden="true">
            {/* Vertical line */}
            <div
                className="absolute top-0 bottom-0 w-px bg-cream/[0.07]"
                style={{ left: x, transition: 'left 0.05s linear' }}
            />
            {/* Horizontal line */}
            <div
                className="absolute left-0 right-0 h-px bg-cream/[0.07]"
                style={{ top: y, transition: 'top 0.05s linear' }}
            />
            {/* Center dot */}
            <div
                className="absolute w-1 h-1 rounded-full bg-cream/40"
                style={{
                    left: x,
                    top: y,
                    transform: 'translate(-50%, -50%)',
                    transition: 'left 0.05s linear, top 0.05s linear',
                }}
            />
            {/* Coordinates readout */}
            <div
                className="absolute font-mono text-[9px] tracking-[0.2em] text-faint/60 uppercase"
                style={{
                    left: x + 14,
                    top: y + 14,
                    transition: 'left 0.05s linear, top 0.05s linear',
                }}
            >
                {String(x).padStart(4, '0')}.{String(y).padStart(4, '0')}
            </div>
        </div>
    );
}
