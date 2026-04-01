import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import CastCrew from './pages/CastCrew'
import Music from './pages/Music'
import Updates from './pages/Updates'
import Gallery from './pages/Gallery'
import Tickets from './pages/Tickets'
import Analytics from './pages/Analytics'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [appVisible, setAppVisible] = useState(false)

  const handleLoadingDone = () => {
    setLoading(false)
    setTimeout(() => setAppVisible(true), 50)
  }

  return (
    <BrowserRouter>
      {loading && <LoadingScreen onDone={handleLoadingDone} />}
      <div
        className="transition-opacity duration-500 min-h-screen flex flex-col relative"
        style={{ opacity: appVisible ? 1 : 0 }}
      >
        <div className="grain-overlay" />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/cast"      element={<CastCrew />} />
            <Route path="/music"     element={<Music />} />
            <Route path="/updates"   element={<Updates />} />
            <Route path="/gallery"   element={<Gallery />} />
            <Route path="/tickets"   element={<Tickets />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
