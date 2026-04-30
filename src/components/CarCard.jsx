import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CarCard({ car, index, sectionAccentColor }) {
  const containerRef = useRef(null);
  const briefRef = useRef(null);
  const imageRef = useRef(null);

  const isEven = index % 2 === 0;

  useGSAP(() => {
    // Animate image sliding in
    gsap.from(imageRef.current, {
      x: isEven ? -100 : 100,
      opacity: 0,
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 80%',
      },
    });

    // Animate brief text words
    if (briefRef.current) {
      const words = gsap.utils.toArray('.word');
      gsap.from(words, {
        opacity: 0,
        y: 12,
        stagger: 0.025,
        duration: 0.5,
        scrollTrigger: {
          trigger: briefRef.current,
          start: 'top 80%',
        },
      });
    }
  }, { scope: containerRef, dependencies: [index, sectionAccentColor, isEven] });

  return (
    <div
      ref={containerRef}
      className="car-card car-card-inner"
      style={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 0,
        margin: 0,
        position: 'relative',
        overflow: 'hidden',
        flexDirection: isEven ? 'row' : 'row-reverse',
        gap: '40px',
      }}
    >
      {/* Blurred Photo Background - full width/height, no borders - zoomed out 20% */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${car.imagePath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(10px) brightness(0.4)',
          transform: 'scale(1)',
          zIndex: -2,
          pointerEvents: 'none',
        }}
      />

      {/* Background decorative circle */}
      <div
        className="car-card-decor"
        style={{
          position: 'absolute',
          top: '50%',
          left: isEven ? '50%' : 'auto',
          right: isEven ? 'auto' : '50%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.06)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Image side */}
      <div
        ref={imageRef}
        style={{
          width: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isEven ? 'flex-start' : 'flex-end',
        }}
      >
        <div
          className="car-card-image"
          style={{
            width: '100%',
            maxWidth: '560px',
            height: '560px',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '4px',
          }}
        >
          <img
            src={car.imagePath}
            alt={car.model}
            onError={(e) => {
              e.target.style.background = '#111';
              e.target.style.opacity = '0.3';
              e.target.src = '';
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* 5% dark gray edge fade overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              boxShadow: 'inset 0 0 45px 15px rgba(20, 20, 20, 0.95)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Text side */}
      <div
        className="car-card-text"
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: isEven ? 'flex-start' : 'flex-end',
          textAlign: isEven ? 'left' : 'right',
          borderLeft: isEven ? `3px solid ${sectionAccentColor}` : 'none',
          borderRight: !isEven ? `3px solid ${sectionAccentColor}` : 'none',
          paddingLeft: isEven ? '24px' : '0',
          paddingRight: !isEven ? '24px' : '0',
        }}
      >
        {/* Tag pill */}
        <div
          style={{
            display: 'inline-block',
            padding: '4px 12px',
            backgroundColor: `${sectionAccentColor}26`,
            border: `1px solid ${sectionAccentColor}`,
            borderRadius: '4px',
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: '#fff',
            textTransform: 'uppercase',
            marginBottom: '16px',
            width: 'fit-content',
          }}
        >
          {car.tag}
        </div>

        {/* Brand */}
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '16px',
            color: 'rgba(255,255,255,0.45)',
            marginTop: '16px',
          }}
        >
          {car.brand}
        </div>

        {/* Model */}
        <div
          className="car-model-name"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '64px',
            lineHeight: 1,
            color: '#fff',
            marginTop: '4px',
          }}
        >
          {car.model}
        </div>

        {/* Accent line */}
        <div
          style={{
            width: '55px',
            height: '2px',
            backgroundColor: sectionAccentColor,
            marginTop: '24px',
            marginBottom: '24px',
          }}
        />

        {/* Brief text */}
        <div
          ref={briefRef}
          style={{
            fontSize: '15px',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.65)',
          }}
        >
          {car.brief.split(' ').map((word, i) => (
            <span
              key={i}
              className="word"
              style={{ display: 'inline-block', marginRight: '4px' }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
