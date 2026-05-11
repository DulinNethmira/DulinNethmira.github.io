'use client';
import { useEffect, useRef } from 'react';

export default function SkillsOrbit() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const skills = [
      'HTML5', 'CSS3', 'JavaScript', 'Premiere Pro', 'After Effects', 
      'CapCut', 'Photoshop', 'Web Design', 'Video Editing', 'SEO', 
      'UI/UX', 'Responsive', 'Modern Web', 'Animations'
    ];

    const tags = [];
    const radius = container.offsetWidth / 3;

    skills.forEach((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      const el = document.createElement('div');
      el.className = 'skill-tag';
      el.textContent = skill;
      container.appendChild(el);

      tags.push({ el, x, y, z });
    });

    let angleX = 0.001;
    let angleY = 0.001;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      angleX = (e.clientY - rect.top - rect.height / 2) * 0.00005;
      angleY = (e.clientX - rect.left - rect.width / 2) * 0.00005;
    };

    container.addEventListener('mousemove', handleMouseMove);

    let animationId;
    function rotate() {
      tags.forEach(tag => {
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);

        const y1 = tag.y * cosX - tag.z * sinX;
        const z1 = tag.z * cosX + tag.y * sinX;
        tag.y = y1;
        tag.z = z1;

        const x2 = tag.x * cosY + tag.z * sinY;
        const z2 = tag.z * cosY - tag.x * sinY;
        tag.x = x2;
        tag.z = z2;

        const scale = 1000 / (1000 + tag.z);
        const alpha = (tag.z + radius) / (2 * radius);

        tag.el.style.transform = `translate3d(${tag.x * scale}px, ${tag.y * scale}px, 0) scale(${scale})`;
        tag.el.style.opacity = alpha + 0.2;
        tag.el.style.zIndex = Math.floor(scale * 100);
      });
      animationId = requestAnimationFrame(rotate);
    }
    rotate();

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} id="skills-orbit" className="skills-orbit">
      {/* Tags injected by useEffect */}
    </div>
  );
}
