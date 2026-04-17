import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import PortalNavigation from './PortalNavigation';
import PortalToasts from './PortalToasts';
import PortalDiagnostics from './PortalDiagnostics';
import { useAnnouncementStore } from '../stores/announcementStore';
import { useAuthStore } from '../stores/authStore';
import { useToastStore } from '../stores/toastStore';
import { useZoneStore } from '../stores/zoneStore';

export default function PortalLayout() {
    const sessionStatus = useAuthStore((state) => state.sessionStatus);
    const announcements = useAnnouncementStore((state) => state.announcements);
    const hydrated = useAnnouncementStore((state) => state.hydrated);
    const fetchAnnouncements = useAnnouncementStore((state) => state.fetchAnnouncements);
    const setHighlightedAnnouncement = useAnnouncementStore(
        (state) => state.setHighlightedAnnouncement,
    );
    const hydrateZones = useZoneStore((state) => state.hydrateZones);
    const zonesHydrated = useZoneStore((state) => state.hydrated);
    const addToast = useToastStore((state) => state.addToast);

    useEffect(() => {
        document.body.dataset.portal = 'true';
        return () => {
            delete document.body.dataset.portal;
        };
    }, []);

    useEffect(() => {
        if (sessionStatus !== 'authenticated') return;
        if (hydrated) return;
        void fetchAnnouncements();
    }, [fetchAnnouncements, hydrated, sessionStatus]);

    useEffect(() => {
        if (sessionStatus !== 'authenticated') return;
        if (zonesHydrated) return;
        void hydrateZones();
    }, [hydrateZones, sessionStatus, zonesHydrated]);

    useEffect(() => {
        const hasFired = sessionStorage.getItem('recon-portal-ann-toast-fired');
        if (hasFired) return;

        const featured = announcements[0];
        if (!featured) return;

        const id = window.setTimeout(() => {
            addToast({
                type: featured.priority === 'URGENT' ? 'error' : 'warning',
                title: 'NEW ANNOUNCEMENT',
                body: `${featured.title} - ${featured.body.slice(0, 60)}...`,
                durationMs: featured.priority === 'URGENT' ? 8000 : 4000,
                ctaPath: '/announcements',
            });
            setHighlightedAnnouncement(featured.id);
            sessionStorage.setItem('recon-portal-ann-toast-fired', '1');
        }, 30000);

        return () => clearTimeout(id);
    }, [addToast, announcements, setHighlightedAnnouncement]);

    return (
        <div className="min-h-[100dvh] bg-[var(--bg)] text-[var(--fg)] portal-grain overflow-x-hidden">
            <PortalNavigation />
            <PortalToasts />
            <PortalDiagnostics />
            <Outlet />
        </div>
    );
}
