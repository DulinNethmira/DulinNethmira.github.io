import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, AppWindow } from 'lucide-react';
import { tools } from '../data/tools';
import Magnetic from '../components/Magnetic';
import gsap from 'gsap';
import './Tools.css';

const Tools = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP Reveal Animation
    const ctx = gsap.context(() => {
      gsap.fromTo('.tool-card', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out" }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="tools-page" ref={containerRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Open Source & Utilities</span>
          <h1 className="section-title">Things I <span className="gradient-text">Build</span></h1>
          <p className="section-desc">A collection of developer tools, AI utilities, and software experiments.</p>
        </div>

        <div className="tools-grid">
          {tools.map(tool => (
            <div key={tool.id} className="tool-card glass-panel">
              <div className="tool-image-wrapper">
                <img src={tool.image} alt={tool.title} className="tool-image" />
              </div>
              <div className="tool-content">
                <div className="tool-meta">
                  <span className="tool-category">{tool.category}</span>
                </div>
                <h3 className="tool-title">{tool.title}</h3>
                <p className="tool-desc">{tool.description}</p>
                <div className="tool-tech">
                  {tool.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="tool-actions">
                  {tool.productUrl && (
                    <Magnetic>
                      <a href={tool.productUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary border-none">
                        <AppWindow size={18} /> View Product
                      </a>
                    </Magnetic>
                  )}
                  {tool.github && (
                    <Magnetic>
                      <a href={tool.github} target="_blank" rel="noreferrer" className="btn btn-outline border-none">
                        <ExternalLink size={18} /> View Source
                      </a>
                    </Magnetic>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Tools;
