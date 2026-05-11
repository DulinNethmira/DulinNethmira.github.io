'use client';
import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [totalViews, setTotalViews] = useState('...');

  useEffect(() => {
    async function fetchCount() {
      try {
        const response = await fetch('https://api.counterapi.dev/v1/dulindesigns/visits/up');
        const data = await response.json();
        setTotalViews(data.count.toLocaleString());
      } catch (error) {
        console.error('CounterAPI Error:', error);
        setTotalViews('12');
      }
    }
    fetchCount();
  }, []);

  return (
    <div className="footer-stats">
      <div className="stat-item">
        <span className="stat-icon live"></span>
        Online Now
      </div>
      <div className="stat-divider-v"></div>
      <div className="stat-item">
        <span>{totalViews}</span> Total Visits
      </div>
    </div>
  );
}
