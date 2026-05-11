'use client';
import { useEffect, useState } from 'react';

export default function VisitorCounter() {
  const [totalViews, setTotalViews] = useState('...');

  useEffect(() => {
    async function fetchCount() {
      const storageKey = 'dulin_visited_unique';
      const hasVisited = localStorage.getItem(storageKey);

      try {
        let url = 'https://api.counterapi.dev/v1/dulindesigns/unique_visits/up';
        if (hasVisited) {
          url = 'https://api.counterapi.dev/v1/dulindesigns/unique_visits';
        }

        const response = await fetch(url);
        const data = await response.json();
        setTotalViews(data.count.toLocaleString());

        if (!hasVisited) {
          localStorage.setItem(storageKey, 'true');
        }
      } catch (error) {
        console.error('CounterAPI Error:', error);
        setTotalViews('1');
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
