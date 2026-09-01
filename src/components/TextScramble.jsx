import React, { useEffect, useRef, useState } from 'react';

const TextScramble = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = '!<>-_\\\\/[]{}—=+*^?#________';

  useEffect(() => {
    let frameRequest;
    let frame = 0;
    const queue = [];

    // Create the queue of characters
    for (let i = 0; i < text.length; i++) {
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push({
        from: text[i] === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)],
        to: text[i],
        start,
        end,
        char: ''
      });
    }

    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i];
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = chars[Math.floor(Math.random() * chars.length)];
            queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      }

      setDisplayText(output);

      if (complete === queue.length) {
        setDisplayText(text); // Ensure final string is clean HTML-wise
      } else {
        frameRequest = requestAnimationFrame(update);
        frame++;
      }
    };

    update();

    return () => cancelAnimationFrame(frameRequest);
  }, [text]);

  return (
    <span 
      className={className} 
      dangerouslySetInnerHTML={{ __html: displayText === text ? text : displayText }} 
    />
  );
};

export default TextScramble;
