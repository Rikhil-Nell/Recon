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

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname]);

    return null;
}

export default function App() {
    return (
        <>
            <Preloader />
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
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
        </>
    );
}
