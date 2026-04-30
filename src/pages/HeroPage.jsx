import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroPage() {
  const heroRef = useRef(null);

  useGSAP(() => {
    gsap.from(".hero-letter", {
      x: () => (Math.random() - 0.5) * 1200,
      y: () => (Math.random() - 0.5) * 800,
      rotation: () => (Math.random() - 0.5) * 360,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.06,
    })
  }, { scope: heroRef });

  return (
    <div
      ref={heroRef}
      className="relative w-full"
      style={{ minHeight: '100vh' }}
    >
      {/* Layer 1: Background image with gradient overlay */}
      <div className="absolute inset-0 w-full h-[100vh]">
        <img
          src="/public/hero.png"
          alt="Cars exhibition"
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover', opacity: 0.9 }}
        />
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 100%)',
          }}
        />
      </div>

      {/* Layer 2: Logo animation (top-left) */}
      <div className="absolute top-32 left-32 z-10">
        <div className="flex">
          {['T', 'u', 'r', 'b', 'o', 'N', 'O', 'S'].map((char, i) => (
            <span
              key={i}
              className="hero-letter inline-block font-display text-8xl text-white"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                lineHeight: 1,
              }}
            >
              {char}
            </span>
          ))}
        </div>

      </div>

      {/* Layer 3: Tagline and scroll indicator */}
      <div className="absolute bottom-[18%] left-1/2 -translate-x-1/2 text-center z-10">
        <div className="tagline">
          <p
            className="text-white"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '22px',
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            Where legends are forged in asphalt and fire.
          </p>
          <div
            className="mt-4 mx-auto"
            style={{
              width: '120px',
              height: '1px',
              backgroundColor: 'rgba(255,255,255,0.2)',
            }}
          />
        </div>

        {/* Animated scroll chevron */}
        <div className="mt-8 flex justify-center scroll-chevron">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white opacity-60"
          >
            <path
              d="M7 10L12 15L17 10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Bottom pulsing red circle with scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 cursor-pointer scroll-indicator"
        onClick={() => {
          const engineSection = document.querySelector('#engine-section');
          if (engineSection) {
            engineSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        style={{
          width: '60px',
          height: '60px',
          backgroundColor: 'rgba(255, 0, 0, 0.9)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(255, 0, 0, 0.5)',
        }}
      >
        <div className="pulse-ring absolute inset-0 rounded-full" />
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white relative z-10"
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
