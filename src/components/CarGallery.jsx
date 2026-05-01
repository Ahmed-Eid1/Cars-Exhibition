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
          background: 'transparent(10px)',
          justifyContent: 'space-around',
          padding: '10px 0',
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
                fontSize: '16px',
                letterSpacing: '0.15em',
                fontWeight: activeTab === index ? 500 : 400,
                color: activeTab === index ? 'black' : 'rgba(255,255,255,0.5)',
                background: activeTab === index ? 'darkgray' : 'transparent',
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
        return (
          <div
            key={section.id}
            id={`${section.id}-section`}
            ref={(el) => (sectionRefs.current[sectionIndex] = el)}
            data-index={sectionIndex}
            className="car-section"
            style={{ position: 'relative', margin: 0, padding: 0 }}
          >
            {/* 1. THE HEADER: Now transparent and floating */}
            <div
              className="car-section-header"
              style={{
                width: '100%',
                minHeight: '40vh', // Adjust height to control how much of the first car shows
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                position: 'relative',
                zIndex: 40, // Keep text above the card
                pointerEvents: 'none', // Allows clicking "through" the header to the car
              }}
            >
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: '120px',
                color: '#fff',
                margin: '18px 0 0 0',
                textShadow: '0 10px 30px rgba(0,0,0,0.8)' // High contrast is key here
              }}>
                {section.label}
              </h2>

              <p
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  marginTop: '-35px',
                  letterSpacing: '2px'
                }}>
                {section.tagline}
              </p>
            </div>

            {/* 2. THE CARDS CONTAINER: Pulled up with negative margin */}
            <div
              className="car-section-cards"
              style={{
                marginTop: '-40vh', // This MUST match the minHeight of the header above
                position: 'relative',
                zIndex: 10,
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
