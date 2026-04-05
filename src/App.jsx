import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'
import { LanguageProvider } from './context/LanguageContext'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import ParticlesBackground from './components/ParticlesBackground'
import Home from './pages/Home'
import CastCrew from './pages/CastCrew'
import Updates from './pages/Updates'
import Gallery from './pages/Gallery'
import Tickets from './pages/Tickets'
import Analytics from './pages/Analytics'
import SoundToggle from './components/SoundToggle'

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [appVisible, setAppVisible] = useState(false)

  const handleLoadingDone = () => {
    setLoading(false)
    setTimeout(() => setAppVisible(true), 50)
  }

  return (
    <HelmetProvider>
    <LanguageProvider>
    <ThemeProvider>
    <BrowserRouter>
      <ScrollToTop />
      {loading && <LoadingScreen onDone={handleLoadingDone} />}
      <div
        className="transition-opacity duration-500 min-h-screen flex flex-col relative text-white"
        style={{ opacity: appVisible ? 1 : 0 }}
      >
        <ParticlesBackground />
        <SoundToggle />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/cast"      element={<CastCrew />} />
            <Route path="/updates"   element={<Updates />} />
            <Route path="/gallery"   element={<Gallery />} />
            <Route path="/tickets"   element={<Tickets />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
    </ThemeProvider>
    </LanguageProvider>
    </HelmetProvider>
  )
}
