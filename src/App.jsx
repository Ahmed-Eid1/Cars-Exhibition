import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroPage from './pages/HeroPage'
import CarGallery from './components/CarGallery'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
