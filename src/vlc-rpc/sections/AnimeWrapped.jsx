import './AnimeWrapped.css';
import { BarChart3, Download, Share2 } from 'lucide-react';

export default function AnimeWrapped() {
  return (
    <section className="vlc-wrapped-section">
      <div className="vlc-wrapped-container">
        
        <div className="vlc-wrapped-content">
          <h2 className="vlc-heading-section">Your watching history, <span className="vlc-text-gradient">visualized.</span></h2>
          <p className="vlc-body-large">
            VLC RPC tracks your entire media history in a local SQLite database. 
            Generate a beautiful "Anime Wrapped" image directly from the dashboard to share your stats.
          </p>
          
          <ul className="vlc-wrapped-features">
            <li><span className="vlc-accent-dot"></span> Average Session Length</li>
            <li><span className="vlc-accent-dot"></span> Most Binge-Watched Day</li>
            <li><span className="vlc-accent-dot"></span> Total Hours Watched</li>
            <li><span className="vlc-accent-dot"></span> Completed Series Count</li>
          </ul>
        </div>
        
        <div className="vlc-wrapped-visual vlc-glass-panel">
          <div className="vlc-wrapped-header">
            <BarChart3 className="vlc-wrapped-icon" />
            <span>My 2026 Anime Wrap</span>
          </div>
          
          <div className="vlc-wrapped-stats">
            <div className="vlc-stat-box">
              <span className="vlc-stat-label">Episodes Watched</span>
              <strong className="vlc-stat-value">482</strong>
            </div>
            <div className="vlc-stat-box">
              <span className="vlc-stat-label">Total Hours</span>
              <strong className="vlc-stat-value">164h</strong>
            </div>
            <div className="vlc-stat-box">
              <span className="vlc-stat-label">Top Series</span>
              <strong className="vlc-stat-value">Frieren</strong>
            </div>
            <div className="vlc-stat-box">
              <span className="vlc-stat-label">Binge Record</span>
              <strong className="vlc-stat-value">12 eps/day</strong>
            </div>
          </div>
          
          <div className="vlc-wrapped-footer">
            <button className="vlc-wrapped-btn"><Download size={16}/> Save Image</button>
            <button className="vlc-wrapped-btn"><Share2 size={16}/> Share</button>
          </div>
        </div>
        
      </div>
    </section>
  );
}
