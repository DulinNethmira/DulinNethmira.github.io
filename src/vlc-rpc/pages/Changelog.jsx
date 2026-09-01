import { changelogData } from '../data/product';
import './Pages.css';

export default function Changelog() {
  return (
    <div className="vlc-page-container">
      <div className="vlc-page-header">
        <h1 className="vlc-heading-display">Changelog</h1>
        <p className="vlc-body-large">New updates and improvements to VLC RPC.</p>
      </div>

      <div className="vlc-page-content">
        {changelogData.map((release, index) => (
          <section key={index} className="vlc-content-section" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '3rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <h2 style={{ margin: 0 }}>{release.version}</h2>
              <span className="vlc-mono" style={{ color: '#71717a' }}>{release.date}</span>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {release.changes.map((change, i) => {
                let badgeColor = '#52525b';
                let badgeBg = 'rgba(255,255,255,0.05)';
                if (change.type === 'NEW') { badgeColor = '#22c55e'; badgeBg = 'rgba(34, 197, 94, 0.1)'; }
                if (change.type === 'IMPROVED') { badgeColor = '#3b82f6'; badgeBg = 'rgba(59, 130, 246, 0.1)'; }
                if (change.type === 'FIXED') { badgeColor = '#ff8c00'; badgeBg = 'rgba(255, 140, 0, 0.1)'; }

                return (
                  <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <span style={{ 
                      color: badgeColor, 
                      background: badgeBg,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      marginTop: '4px'
                    }}>
                      {change.type}
                    </span>
                    <span style={{ color: '#e4e4e7', lineHeight: 1.6 }}>{change.text}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
