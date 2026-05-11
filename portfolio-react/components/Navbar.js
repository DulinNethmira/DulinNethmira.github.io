'use client';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(false);
  const menuRef = useRef(null);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (e) => {
    const link = e.currentTarget;
    const indicator = indicatorRef.current;
    const menu = menuRef.current;
    
    if (indicator && menu) {
      const rect = link.getBoundingClientRect();
      const parentRect = menu.getBoundingClientRect();
      
      indicator.style.width = `${rect.width}px`;
      indicator.style.left = `${rect.left - parentRect.left}px`;
      indicator.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (indicatorRef.current) {
      indicatorRef.current.style.opacity = '0';
    }
  };

  const handleMouseMove = (e) => {
    const link = e.currentTarget;
    const rect = link.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    link.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLinkLeave = (e) => {
    e.currentTarget.style.transform = 'translate(0, 0)';
  };

  return (
    <nav id="navbar" className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#" className="nav-logo">dulin<span className="accent-dot">.</span></a>
        
        <button 
          className={`nav-toggle ${active ? 'active' : ''}`} 
          onClick={() => setActive(!active)}
          aria-label="Toggle navigation"
        >
          <span></span><span></span><span></span>
        </button>

        <ul ref={menuRef} className={`nav-menu ${active ? 'active' : ''}`} onMouseLeave={handleMouseLeave}>
          {['home', 'services', 'projects', 'process', 'pricing', 'about', 'faq'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item}`} 
                className="nav-link"
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleLinkLeave}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            </li>
          ))}
          <li>
            <a 
              href="#contact" 
              className="nav-link nav-cta"
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleLinkLeave}
            >
              Let's Talk
            </a>
          </li>
          <div ref={indicatorRef} className="nav-indicator"></div>
        </ul>
      </div>
    </nav>
  );
}
