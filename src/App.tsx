import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Team from './components/Team';
import Prizes from './components/Prizes';
import Sponsors from './components/Sponsors';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import PortalLayout from './portal/components/PortalLayout';
import { RedirectIfVerified, RequireVerified } from './portal/components/RouteGuards';
import LoginPage from './portal/pages/LoginPage';
import VerifyPage from './portal/pages/VerifyPage';
import DashboardPage from './portal/pages/DashboardPage';
import ZonesPage from './portal/pages/ZonesPage';
import ZoneDetailPage from './portal/pages/ZoneDetailPage';
import MapPage from './portal/pages/MapPage';
import MerchPage from './portal/pages/MerchPage';
import AnnouncementsPage from './portal/pages/AnnouncementsPage';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname]);

    return null;
}

function ConditionalPreloader() {
    const { pathname } = useLocation();
    const isPortalPath =
        pathname.startsWith('/login')
        || pathname.startsWith('/verify')
        || pathname.startsWith('/dashboard')
        || pathname.startsWith('/zones')
        || pathname.startsWith('/map')
        || pathname.startsWith('/merch')
        || pathname.startsWith('/announcements');

    if (isPortalPath) return null;
    return <Preloader />;
}

export default function App() {
    return (
        <BrowserRouter>
            <ConditionalPreloader />
            <ScrollToTop />
            <Routes>
                <Route element={<RedirectIfVerified />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/verify" element={<VerifyPage />} />
                </Route>

                <Route element={<RequireVerified />}>
                    <Route element={<PortalLayout />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/zones" element={<ZonesPage />} />
                        <Route path="/zones/:id" element={<ZoneDetailPage />} />
                        <Route path="/map" element={<MapPage />} />
                        <Route path="/merch" element={<MerchPage />} />
                        <Route path="/announcements" element={<AnnouncementsPage />} />
                    </Route>
                </Route>

                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/people" element={<Team />} />
                    <Route path="/prizes" element={<Prizes />} />
                    <Route path="/sponsors" element={<Sponsors />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<Contact />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
