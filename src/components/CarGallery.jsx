import { useState, useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CarCard from './CarCard';
import { carSections } from '../data/cars';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CarGallery() {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]);
  const sectionRefs = useRef([]);

  // Handle tab clicks
  const handleTabClick = (index) => {
    setActiveTab(index);
    const sectionId = carSections[index].id;
    const sectionElement = document.querySelector(`#${sectionId}-section`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // IntersectionObserver for active tab updates
  useEffect(() => {
    const options = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index, 10);
          if (index !== undefined && index !== activeTab) {
            setActiveTab(index);
          }
        }
      });
    }, options);

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeTab]);

  // Animate tab titles on mount
  useGSAP(() => {
    const tabs = document.querySelectorAll('.tab-title');
    gsap.from(tabs, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <div
      id="car-gallery"
      className="car-gallery"
      style={{
        backgroundColor: 'transparent',
        padding: 0,
        margin: 0,
        position: 'relative',
      }}
    >
      {/* PART A: Tab bar */}
      <div
        className="car-gallery-tabs"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          padding: '20px 0',
          margin: 0,
        }}
      >
        <div className="flex flex-wrap gap-6 justify-center">
          {carSections.map((section, index) => (
            <div
              key={section.id}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => handleTabClick(index)}
              className="tab-title cursor-pointer"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '13px',
                letterSpacing: '0.12em',
                fontWeight: activeTab === index ? 500 : 400,
                color: activeTab === index ? '#fff' : 'rgba(255,255,255,0.5)',
                background: activeTab === index ? '#fff' : 'transparent',
                padding: '8px 16px',
                transition: 'color 0.3s ease, background 0.3s ease',
              }}
            >
              {section.label}
            </div>
          ))}
        </div>
      </div>

      {/* PART B: Car sections */}
      {carSections.map((section, sectionIndex) => {
        const isLast = sectionIndex === carSections.length - 1;
        const nextSection = !isLast ? carSections[sectionIndex + 1] : null;

        return (
          <div
            key={section.id}
            id={`${section.id}-section`}
            ref={(el) => (sectionRefs.current[sectionIndex] = el)}
            data-index={sectionIndex}
            className="car-section"
            style={{
              position: 'relative',
              margin: 0,
              padding: 0,
              overflow: 'hidden',
            }}
          >
            {/* SECTION HEADER - positioned between first and second car */}
            <div
              className="car-section-header"
              style={{
                width: '100%',
                padding: '60px 20px',
                position: 'sticky',
                top: '0',
                zIndex: 100,
                textAlign: 'center',
                // Gradient background: upper half from current section, lower half from next section
                backgroundImage: nextSection
                  ? `linear-gradient(to bottom,
                      url(${section.cars[0].imagePath}) 50%,
                      url(${nextSection.cars[0].imagePath}) 50%)`
                  : `url(${section.cars[0].imagePath})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(0.05px) brightness(1)',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  zIndex: 2,
                  maxWidth: '800px',
                  margin: '0 auto',
                  padding: '20px',
                  background: 'rgba(0,0,0,0.4)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '8px',
                }}
              >
                <h2
                  className="section-label"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '72px',
                    color: '#fff',
                    marginBottom: '16px',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  }}
                >
                  {section.label}
                </h2>
                <p
                  className="section-tagline"
                  style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.6,
                    textShadow: '0 1px 5px rgba(0,0,0,0.5)',
                  }}
                >
                  {section.tagline}
                </p>
              </div>
            </div>

            {/* Car cards container */}
            <div
              className="car-section-cards"
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                zIndex: 10,
                margin: 0,
                padding: 0,
              }}
            >
              {section.cars.map((car, carIndex) => (
                <CarCard
                  key={car.id}
                  car={car}
                  index={carIndex}
                  sectionAccentColor={section.accentColor}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
