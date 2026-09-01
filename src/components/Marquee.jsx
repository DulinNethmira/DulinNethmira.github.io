import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Marquee.css';

const Marquee = ({ text, speed = 1 }) => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite horizontal scroll
      gsap.to('.marquee-inner', {
        xPercent: -50,
        ease: "none",
        duration: 20 / speed,
        repeat: -1
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div className="marquee-container" ref={marqueeRef}>
      <div className="marquee-inner">
        <div className="marquee-part">{text}</div>
        <div className="marquee-part">{text}</div>
        <div className="marquee-part">{text}</div>
        <div className="marquee-part">{text}</div>
      </div>
    </div>
  );
};

export default Marquee;
