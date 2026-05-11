'use client';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ['Modern Websites', 'Clean Video Edits', 'Elite UI Designs', 'Fast Performance'];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setTypedText(isDeleting 
        ? fullText.substring(0, typedText.length - 1) 
        : fullText.substring(0, typedText.length + 1)
      );

      setTypingSpeed(isDeleting ? 80 : 150);

      if (!isDeleting && typedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="home" className="hero">
      <div className="hero-bg-grid"></div>
      <div className="container hero-container">
        <div className="hero-badge">
          <span className="status-dot"></span>
          Available for Projects
        </div>
        <h1 className="hero-title">
          Hey, I'm <span className="gradient-text">Dulin</span><br />
          I make<br />
          <span className="hero-typed">{typedText}</span>
        </h1>
        <p className="hero-subtitle">
          I'm a web designer and video editor based in Homagama, Sri Lanka.
          I help small businesses look good online without charging crazy prices.
        </p>
        <div className="hero-actions">
          <a href="#about" className="btn btn-primary">About Me</a>
          <a href="#contact" className="btn btn-ghost">Get in Touch</a>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-number">Fresh</span>
            <span className="stat-label">Talent</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">Affordable</span>
            <span className="stat-label">Pricing</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-number">100%</span>
            <span className="stat-label">Dedication</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
