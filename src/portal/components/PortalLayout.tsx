import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import PortalNavigation from './PortalNavigation';
import PortalToasts from './PortalToasts';
import PortalDiagnostics from './PortalDiagnostics';
import { useAnnouncementStore } from '../stores/announcementStore';
import { useToastStore } from '../stores/toastStore';

export default function PortalLayout() {
    const navigate = useNavigate();
    const announcements = useAnnouncementStore((state) => state.announcements);
    const setHighlightedAnnouncement = useAnnouncementStore(
        (state) => state.setHighlightedAnnouncement,
    );
    const addToast = useToastStore((state) => state.addToast);

    useEffect(() => {
        document.body.dataset.portal = 'true';
        return () => {
            delete document.body.dataset.portal;
        };
    }, []);

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
    }, [addToast, announcements, navigate, setHighlightedAnnouncement]);

    return (
        <div className="min-h-[100dvh] bg-[var(--bg)] text-[var(--fg)] portal-grain overflow-x-hidden">
            <PortalNavigation />
            <PortalToasts />
            <PortalDiagnostics />
            <Outlet />
        </div>
    );
}
