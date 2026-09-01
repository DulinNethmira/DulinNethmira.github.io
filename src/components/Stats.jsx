import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Stats.css';

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
  const containerRef = useRef(null);

  const stats = [
    { label: 'Views Generated', value: '1', suffix: 'K+' },
    { label: 'Years Experience', value: '1.5', suffix: '+' },
    { label: 'Projects Built', value: '5', suffix: '+' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const numbers = gsap.utils.toArray('.stat-number-val');
      
      numbers.forEach(num => {
        const targetValue = parseFloat(num.getAttribute('data-value'));
        
        gsap.to(num, {
          innerHTML: targetValue,
          duration: 2,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="stats-section" ref={containerRef}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card glass-panel">
              <div className="stat-number">
                <span className="stat-number-val" data-value={stat.value}>0</span>
                {stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
