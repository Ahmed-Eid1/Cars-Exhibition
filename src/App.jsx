import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroPage from './pages/HeroPage'
import CarGallery from './components/CarGallery'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const scrollProgress = useScrollProgress()

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>

      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          zIndex: 9999,
          width: scrollProgress * 100 + '%',
          background: 'linear-gradient(to right, #E24B4A, #EF9F27)',
          transition: 'width 0.05s linear'
        }}
      />

      <HeroPage />
      <CarGallery />
    </div>
  )
}
