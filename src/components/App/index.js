import { Routes, Route } from 'react-router-dom';

import Header from 'src/components/Header';
import PageRepo from 'src/components/PageRepo';
import PageFAQ from 'src/components/PageFAQ';
import Page404 from 'src/components/Page404';

import './style.scss';

export default function App() {
    // Affichage du composant en JSX
    return (
        <div className="app">
            <Header />

            <Routes>
                <Route path="/" element={<PageRepo />} />

                <Route path="/faq" element={<PageFAQ />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}
