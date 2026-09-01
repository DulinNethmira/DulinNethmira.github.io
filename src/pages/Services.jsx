import React, { useEffect, useRef, useState } from 'react';
import { Layout, Code, Video, Smartphone } from 'lucide-react';
import { services } from '../data/services';
import Magnetic from '../components/Magnetic';
import gsap from 'gsap';
import './Services.css';

const iconMap = {
  layout: Layout,
  code: Code,
  video: Video,
  smartphone: Smartphone
};

const Services = ({ onContactClick }) => {
  const containerRef = useRef(null);
  const cursorImageRef = useRef(null);
  const [hoveredImage, setHoveredImage] = useState(null);

  useEffect(() => {
    // Hide cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    
    const moveImage = (e) => {
      if (cursorImageRef.current) {
        gsap.to(cursorImageRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: "power3.out"
        });
      }
    };

    window.addEventListener('mousemove', moveImage);
    return () => window.removeEventListener('mousemove', moveImage);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.service-card', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div 
        ref={cursorImageRef}
        className={`service-cursor-image ${hoveredImage ? 'active' : ''}`}
        style={{ backgroundImage: hoveredImage ? `url(${hoveredImage})` : 'none' }}
      ></div>
      <main className="services-page" ref={containerRef}>
      <div className="container">
        <div className="section-header center">
          <span className="section-tag">Freelance & Commercial</span>
          <h1 className="section-title">Creative <span className="gradient-text">Services</span></h1>
          <p className="section-desc">I take on select freelance projects for small businesses and creators, offering high-quality work at fair rates.</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
              <div 
                key={service.id} 
                className="service-card glass-panel clickable"
                onMouseEnter={() => setHoveredImage(service.previewImage)}
                onMouseLeave={() => setHoveredImage(null)}
              >
                <div className="service-icon-wrapper">
                  <IconComponent size={28} />
                  <span className="service-number">0{index + 1}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul className="service-features">
                  {service.features.map(feature => (
                    <li key={feature}>
                      <span className="feature-dot"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="contact-cta">
          <h2 className="section-title">Need something <span className="gradient-text">built?</span></h2>
          <p className="section-desc" style={{margin: '0 auto 32px'}}>Fill out the form with your project details.</p>
          <Magnetic>
            <button onClick={onContactClick} className="btn btn-primary btn-large border-none">Request a Quote</button>
          </Magnetic>
        </div>
      </div>
    </main>
    </>
  );
};

export default Services;
