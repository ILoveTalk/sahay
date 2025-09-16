import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const HomePage = lazy(() => import('./pages/HomePage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage'));
const PeerSupportPage = lazy(() => import('./pages/PeerSupportPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#FEFAE0]">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<div className="flex justify-center items-center h-full p-20 text-xl font-semibold text-[#343A40]">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/peer-support" element={<PeerSupportPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
