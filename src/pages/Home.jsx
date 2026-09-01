import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';
import Magnetic from '../components/Magnetic';
import TextScramble from '../components/TextScramble';
import Marquee from '../components/Marquee';
import Stats from '../components/Stats';
import './Home.css';

const Home = ({ onContactClick }) => {
  const containerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('web');
  
  useEffect(() => {
    // Advanced GSAP Reveals
    const ctx = gsap.context(() => {
      
      // Hero Animation
      gsap.fromTo('.hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.8 });
      gsap.fromTo('.hero-subtitle', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 1.0 });
      gsap.fromTo('.hero-actions', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 1.2 });
      
      // Scroll Reveals
      const revealElements = gsap.utils.toArray('.reveal');
      revealElements.forEach(el => {
        gsap.fromTo(el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Project Parallax
      const projectCards = gsap.utils.toArray('.project-card');
      projectCards.forEach(project => {
        const img = project.querySelector('.project-img');
        if (img) {
          gsap.to(img, {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
              trigger: project,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate tab content on switch + fix ScrollTrigger for dynamically rendered content
  useEffect(() => {
    const content = document.querySelector('.work-tab-content');
    if (content) {
      gsap.fromTo(content, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
    }
    // Refresh ScrollTrigger after tab content renders
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, [activeTab]);

  const webProjects = projects.filter(p => p.category === 'Web Development');
  const videoLongForm = projects.filter(p => p.category === 'Video Editing' && p.type === 'Content Creation');
  const videoShortForm = projects.filter(p => p.category === 'Video Editing' && p.type === 'Short-Form');

  return (
    <main className="home-page" ref={containerRef}>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-grid-bg"></div>
        <div className="hero-glow"></div>
        <div className="container hero-container">
          <div className="hero-badge">
            <span className="status-dot"></span>
            Open to opportunities
          </div>
          <h1 className="hero-title">
            <TextScramble text="Dulin Nethmira" />
            <br />
            <span className="gradient-text"><TextScramble text="Builder & Creator." /></span>
          </h1>
          <p className="hero-subtitle">
            Vibe-Coder · AI Developer · Creative Technologist
            <br />
            I build intelligent tools, creative content, and digital experiences.
          </p>
          <div className="hero-actions">
            <Magnetic>
              <a href="#work" className="btn btn-primary border-none">View Work</a>
            </Magnetic>
            <Magnetic>
              <button onClick={onContactClick} className="btn btn-outline border-none">Let's Talk</button>
            </Magnetic>
          </div>
        </div>
      </section>

      <Stats />

      {/* SELECTED WORK — TAB LAYOUT (matching old portfolio) */}
      <section id="work" className="section work-section">
        <div className="container">
          <div className="section-header reveal">
            <span className="section-tag">Portfolio</span>
            <h2 className="section-title">Selected <span className="gradient-text">Work</span></h2>
          </div>
          
          {/* Tab Switcher */}
          <div className="work-tabs reveal">
            <button
              className={`work-tab ${activeTab === 'web' ? 'active' : ''}`}
              onClick={() => setActiveTab('web')}
            >
              Web Design
            </button>
            <button
              className={`work-tab ${activeTab === 'video' ? 'active' : ''}`}
              onClick={() => setActiveTab('video')}
            >
              Video Editing
            </button>
          </div>

          {/* Tab Content */}
          <div className="work-tab-content">
            {activeTab === 'web' && (
              <div className="web-projects-list">
                {webProjects.map((project, i) => (
                  <div key={project.id} className="web-project-card glass-panel reveal">
                    <div className="web-project-info">
                      <div className="project-meta">
                        <span className="project-tag-pill">Web Design</span>
                        <span className="project-tag-pill outline">{project.type}</span>
                      </div>
                      <h3 className="web-project-title">{project.title}</h3>
                      <p className="web-project-desc">{project.description}</p>
                      {project.demoLink && (
                        <Magnetic>
                          <a href={project.demoLink} target="_blank" rel="noreferrer" className="project-link">
                            View Project <ArrowRight size={16} />
                          </a>
                        </Magnetic>
                      )}
                    </div>
                    <div className="web-project-img-wrapper">
                      <img src={project.image} alt={project.title} className="web-project-img" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'video' && (
              <div className="video-projects-container">
                {/* YouTube Long-Form */}
                {videoLongForm.length > 0 && (
                  <>
                    <h3 className="video-subcategory-title">YouTube (Long-Form)</h3>
                    <div className="video-grid-2col">
                      {videoLongForm.map((project) => (
                        <a key={project.id} href={project.demoLink} target="_blank" rel="noreferrer" className="video-thumb-card">
                          <div className="video-thumb-wrapper">
                            <img src={project.image} alt={project.title} className="video-thumb-img" />
                            <div className="video-thumb-overlay">
                              <ExternalLink size={24} />
                            </div>
                          </div>
                          <p className="video-thumb-title">{project.title}</p>
                        </a>
                      ))}
                    </div>
                  </>
                )}

                {/* Short-Form */}
                {videoShortForm.length > 0 && (
                  <>
                    <h3 className="video-subcategory-title">Short-Form (TikToks &amp; Shorts)</h3>
                    <div className="video-grid-3col">
                      {videoShortForm.map((project) => (
                        <a key={project.id} href={project.demoLink} target="_blank" rel="noreferrer" className="video-thumb-card">
                          <div className="video-thumb-wrapper short">
                            <img src={project.image} alt={project.title} className="video-thumb-img" />
                            <div className="video-thumb-overlay">
                              <ExternalLink size={24} />
                            </div>
                          </div>
                          <p className="video-thumb-title">{project.title}</p>
                        </a>
                      ))}
                    </div>
                  </>
                )}

                {videoLongForm.length === 0 && videoShortForm.length === 0 && (
                  <div className="video-grid-2col">
                    {projects.filter(p => p.category === 'Video Editing').map((project) => (
                      <a key={project.id} href={project.demoLink} target="_blank" rel="noreferrer" className="video-thumb-card">
                        <div className="video-thumb-wrapper">
                          <img src={project.image} alt={project.title} className="video-thumb-img" />
                          <div className="video-thumb-overlay">
                            <ExternalLink size={24} />
                          </div>
                        </div>
                        <p className="video-thumb-title">{project.title}</p>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Marquee text="VIBE-CODER — CREATIVE TECHNOLOGIST — AI DEVELOPER — " speed={0.8} />

      {/* ABOUT & JOURNEY */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content reveal">
              <span className="section-tag">About Me</span>
              <h2 className="section-title">Driven by <span className="gradient-text">Curiosity</span></h2>
              <p className="about-text">
                I'm Dulin, a developer and creative based in Sri Lanka. I've always been fascinated by how technology and design intersect. What started as exploring creative tools like Premiere Pro and After Effects eventually evolved into a deep dive into software engineering and AI development.
              </p>
              <p className="about-text">
                Today, I focus on building robust web applications, exploring artificial intelligence, and maintaining my creative roots through digital content. My goal is to craft tools and experiences that are not only functional but visually compelling.
              </p>
            </div>
            <div className="journey-timeline glass-panel reveal">
              <h3>Journey</h3>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>AI & Vibe-Coding</h4>
                  <p>Building intelligent tools and expanding technical depth through AI assistance.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Web Development</h4>
                  <p>Creating interactive and performant web experiences.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Creative Technology</h4>
                  <p>Video editing, motion design, and visual experimentation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS & TECH I USE — Horizontal Scroller */}
      <section className="tools-scroller-section">
        <div className="container">
          <p className="tools-scroller-title reveal">Tools & Tech I Use</p>
        </div>
        <div className="tools-scroller-track">
          <div className="tools-scroller-inner">
            <span className="tool-item">Python</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">JavaScript</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">HTML5</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">CSS3</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">React</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">Vite</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">GSAP</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">Premiere Pro</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">After Effects</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">CapCut</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">ChatGPT</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">Midjourney</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">Claude AI</span>
            <span className="tool-divider">·</span>
            {/* Duplicate for infinite scroll */}
            <span className="tool-item">Python</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">JavaScript</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">HTML5</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">CSS3</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">React</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">Vite</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">GSAP</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">Premiere Pro</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">After Effects</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">CapCut</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">ChatGPT</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">Midjourney</span>
            <span className="tool-divider">·</span>
            <span className="tool-item">Claude AI</span>
            <span className="tool-divider">·</span>
          </div>
        </div>
      </section>

      {/* CURRENTLY BUILDING & CTA */}
      <section className="section final-section">
        <div className="container">
          <div className="dual-grid">
            <div className="building-card glass-panel reveal hover-glow">
              <h3>Currently Building</h3>
              <p>Expanding my knowledge in AI development and building developer utilities. Check out my tools directory.</p>
              <Magnetic>
                <Link to="/tools" className="inline-link border-none">View my tools <ArrowRight size={16}/></Link>
              </Magnetic>
            </div>
            <div className="creative-card glass-panel reveal hover-glow" style={{transitionDelay: '0.1s'}}>
              <h3>Creative Services</h3>
              <p>I still take on select freelance projects for web design and video editing. Need something built or edited?</p>
              <Magnetic>
                <Link to="/services" className="inline-link border-none">View services <ArrowRight size={16}/></Link>
              </Magnetic>
            </div>
          </div>
          
          <div className="contact-cta reveal">
            <h2 className="section-title">Let's build <span className="gradient-text">something.</span></h2>
            <Magnetic>
              <button onClick={onContactClick} className="btn btn-primary btn-large border-none">Get in Touch</button>
            </Magnetic>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
