'use client';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import VisitorCounter from '../components/VisitorCounter';

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return <div style={{ background: '#0a0a0b', minHeight: '100vh' }}></div>;

  return (
    <main>
      {/* Ambient Glowing Backgrounds */}
      <div className="ambient-bg">
        <div className="ambient-orb orb-1"></div>
        <div className="ambient-orb orb-2"></div>
        <div className="ambient-orb orb-3"></div>
      </div>

      {/* BACKGROUND RUNNING TEXT */}
      <div className="bg-running-text">
        <div className="running-text-track">
          <span>CREATIVE DESIGNER • VIDEO EDITOR • WEB ARCHITECT • </span>
          <span>CREATIVE DESIGNER • VIDEO EDITOR • WEB ARCHITECT • </span>
        </div>
      </div>

      <Navbar />
      <Hero />

      {/* TOOLS SECTION */}
      <section className="tools-section">
        <div className="container tools-container">
          <p className="tools-title">Tools & Tech I Use</p>
          <div className="tools-scroll">
            <div className="tools-track">
              {['HTML5', 'CSS3', 'JavaScript', 'Premiere Pro', 'After Effects', 'CapCut', 'ChatGPT', 'Midjourney', 'Claude AI'].map(tool => (
                <div key={tool} className="tool-item"><span>{tool}</span></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section services">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What I Do</span>
            <h2 className="section-title">Services I <span className="gradient-text">Offer</span></h2>
            <p className="section-subtitle">I do web design and video editing for small businesses. Good work, fair prices. Simple as that.</p>
          </div>
          <div className="services-grid">
            <ServiceCard title="Web Design" num="01" desc="I'll design you a clean, good-looking website that works on phones, tablets, and desktops." />
            <ServiceCard title="Web Development" num="02" desc="I build websites that load fast and actually work well for your business." />
            <ServiceCard title="Redesign" num="03" desc="Got an old website? I can fix that up and make it look modern and fresh again." />
            <ServiceCard title="Video Editing" num="04" desc="Clean cuts, nice colors, smooth transitions for YouTube and Social Media." />
            <ServiceCard title="Short Content" num="05" desc="Viral-style Reels and TikToks to help you get more attention." />
            <ServiceCard title="Promo Videos" num="06" desc="High-quality promotional videos to showcase your products or services." />
          </div>
        </div>
      </section>

      <About />

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <span className="section-tag">Contact</span>
              <h2 className="section-title">Let's build something <span className="gradient-text">together</span></h2>
              <p className="contact-desc">Ready to start your project? Message me on WhatsApp or copy my email and send me a message.</p>
              <div className="contact-methods">
                <a href="https://wa.link/q3u4v3" className="btn btn-whatsapp">Message me on WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-container">
          <a href="#" className="footer-logo">dulin<span className="accent-dot">.</span></a>
          <p className="footer-text">&copy; 2026 Dulin. Made in Homagama.</p>
          <VisitorCounter />
          <div className="footer-links">
            {['home', 'services', 'projects', 'pricing', 'about', 'contact'].map(link => (
              <a key={link} href={`#${link}`}>{link.charAt(0).toUpperCase() + link.slice(1)}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}

function ServiceCard({ title, desc, num }) {
  return (
    <div className="service-card">
      <h3 className="service-title">{title}</h3>
      <p className="service-desc">{desc}</p>
      <span className="service-number">{num}</span>
    </div>
  );
}
