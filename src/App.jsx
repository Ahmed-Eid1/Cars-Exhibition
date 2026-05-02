import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroPage from './pages/HeroPage'
import CarGallery from './components/CarGallery'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const bar = document.getElementById('progress-bar')
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = window.scrollY / total
      if (bar) bar.style.width = (progress * 100) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: '#000', minHeight: '100vh' }}>

      <div
        id="progress-bar"
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
