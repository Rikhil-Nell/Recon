import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Team from './components/Team';
import Prizes from './components/Prizes';
import Sponsors from './components/Sponsors';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/people" element={<Team />} />
                    <Route path="/prizes" element={<Prizes />} />
                    <Route path="/sponsors" element={<Sponsors />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
