import { Navigation2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import PortalPage from '../components/PortalPage';
import { PortalCard, SectionLabel, StatusPill } from '../components/primitives';
import { ZONES } from '../lib/data';

const MAP_EMBED =
    'https://www.google.com/maps?q=16.4590,80.4985&hl=en&z=16&output=embed';

export default function MapPage() {
    const [locationState, setLocationState] = useState<'idle' | 'granted' | 'denied'>('idle');
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

    const mapSrc = useMemo(() => {
        if (!userLocation) return MAP_EMBED;
        return `https://www.google.com/maps?q=${userLocation.lat},${userLocation.lng}&hl=en&z=17&output=embed`;
    }, [userLocation]);

    const requestLocation = () => {
        if (!navigator.geolocation) {
            setLocationState('denied');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                setLocationState('granted');
            },
            () => setLocationState('denied'),
            { enableHighAccuracy: true, timeout: 10000 },
        );
    };

    return (
        <PortalPage className="pt-20 pb-24 lg:pb-8 px-4 lg:px-8">
            <div className="max-w-6xl mx-auto" data-portal-header>
                <SectionLabel>-- CAMPUS MAP // VIT-AP CENTRAL BLOCK --</SectionLabel>
                <div className="font-portal-display text-[36px] leading-none text-[var(--fg)] mt-2">
                    ZONE <span className="text-[var(--amber)]">MAP</span>
                </div>
                <div className="font-portal-mono text-[10px] tracking-[0.1em] text-[color-mix(in_srgb,var(--dim)_70%,white_8%)] mt-2">
                    VIT-AP University, Amaravati, Andhra Pradesh
                </div>

                {locationState !== 'granted' && (
                    <div className="mt-4 border border-[var(--border)] bg-[color-mix(in_srgb,var(--amber)_8%,transparent)] px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="font-portal-mono text-[10px] tracking-[0.1em] text-[color-mix(in_srgb,var(--amber)_80%,black_10%)] uppercase">
                            Enable location to see your position on the map
                        </span>
                        <button
                            type="button"
                            className="min-h-11 px-4 border border-[var(--border)] font-portal-mono text-[10px] tracking-[0.12em] uppercase text-[var(--amber)]"
                            onClick={requestLocation}
                        >
                            {'ENABLE ->'}
                        </button>
                    </div>
                )}

                <PortalCard className="p-0 overflow-hidden mt-6 mb-6 relative h-[60vh] min-h-[300px] max-h-[500px]" attr>
                    <iframe
                        src={mapSrc}
                        title="VIT-AP Zone Map"
                        className="w-full h-full border-0"
                        loading="lazy"
                        style={{ filter: 'invert(1) hue-rotate(180deg) brightness(0.75) contrast(1.1)' }}
                        referrerPolicy="no-referrer-when-downgrade"
                    />

                    <button
                        type="button"
                        onClick={requestLocation}
                        className="absolute bottom-4 left-4 min-h-11 px-3 py-2 border border-[var(--border)] bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] text-[var(--amber)] font-portal-mono text-[10px] tracking-[0.12em] uppercase inline-flex items-center gap-2"
                    >
                        <Navigation2 className="size-3.5" />
                        LOCATE ME
                    </button>

                    <PortalCard className="absolute top-4 left-4 bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] p-3 max-w-[180px]">
                        <div className="font-portal-mono text-[8px] tracking-[0.16em] text-[color-mix(in_srgb,var(--amber)_60%,black_10%)] uppercase mb-2">
                            ACTIVE ZONES
                        </div>
                        <div className="space-y-1.5">
                            {[
                                ['CTF', 'var(--amber)'],
                                ['KOTH', 'var(--portal-blue)'],
                                ['HARDWARE', 'var(--portal-green)'],
                                ['APPSEC', 'var(--portal-blue)'],
                            ].map(([label, color]) => (
                                <div key={label} className="font-portal-mono text-[9px] text-[color-mix(in_srgb,var(--fg)_65%,black_12%)] tracking-[0.1em] uppercase flex items-center gap-2">
                                    <span className="size-2" style={{ background: color }} />
                                    {label}
                                </div>
                            ))}
                        </div>
                    </PortalCard>
                </PortalCard>

                <SectionLabel className="mb-4 mt-6">-- ZONE LOCATIONS --</SectionLabel>

                <div className="space-y-2" data-portal-card>
                    {ZONES.map((zone) => (
                        <PortalCard key={zone.id} className="px-4 py-4">
                            <div className="flex gap-4 items-center">
                                <span className="size-2.5 shrink-0" style={{ backgroundColor: zone.color }} />
                                <div className="flex-1 min-w-0">
                                    <div className="font-portal-mono text-[11px] tracking-[0.08em] text-[var(--fg)] uppercase">
                                        {zone.name}
                                    </div>
                                    <div className="font-portal-mono text-[9px] tracking-[0.09em] text-[color-mix(in_srgb,var(--dim)_68%,white_7%)] uppercase mt-1">
                                        {zone.location}
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <StatusPill
                                        tone={zone.status === 'open' ? 'blue' : zone.status === 'soon' ? 'amber' : 'red'}
                                        label={zone.status.toUpperCase()}
                                    />
                                </div>
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`VIT-AP ${zone.location}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-portal-mono text-[9px] tracking-[0.11em] text-[var(--amber)] uppercase hover:underline whitespace-nowrap"
                                >
                                    {'GET DIRECTIONS ->'}
                                </a>
                            </div>
                        </PortalCard>
                    ))}
                </div>
            </div>
        </PortalPage>
    );
}
