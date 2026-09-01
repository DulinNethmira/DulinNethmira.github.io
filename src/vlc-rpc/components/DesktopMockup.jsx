import './DesktopMockup.css';
import { Play, Pause, ChevronRight } from 'lucide-react';

export default function DesktopMockup() {
  return (
    <div className="vlc-mockup-container">
      <div className="vlc-mockup-header">
        <div className="vlc-mockup-dots">
          <span></span><span></span><span></span>
        </div>
        <div className="vlc-mockup-title">VLC RPC — Connection Active</div>
      </div>
      
      <div className="vlc-mockup-body">
        {/* Playback Source */}
        <div className="vlc-mockup-step">
          <div className="vlc-mockup-step-label">VLC Playback</div>
          <div className="vlc-mockup-card vlc-file-card">
            <span className="vlc-mono">Overlord_II_E10_1080p.mkv</span>
            <div className="vlc-progress-bar">
              <div className="vlc-progress-fill" style={{width: '78%'}}></div>
            </div>
            <div className="vlc-time-flex">
              <span>18:42</span>
              <span>23:40</span>
            </div>
          </div>
        </div>

        <ChevronRight className="vlc-mockup-arrow" />

        {/* Media Recognition */}
        <div className="vlc-mockup-step">
          <div className="vlc-mockup-step-label">Recognition</div>
          <div className="vlc-mockup-card vlc-meta-card">
            <h4>Overlord II</h4>
            <p>Season 2 · Episode 10</p>
            <div className="vlc-status-badge">
              <span className="vlc-pulse-dot"></span> Smart Matched
            </div>
          </div>
        </div>

        <ChevronRight className="vlc-mockup-arrow" />

        {/* Presence & Sync */}
        <div className="vlc-mockup-split">
          
          <div className="vlc-mockup-step">
            <div className="vlc-mockup-step-label">Discord RPC</div>
            <div className="vlc-mockup-card vlc-discord-card">
              <div className="vlc-discord-flex">
                <div className="vlc-discord-art"></div>
                <div className="vlc-discord-info">
                  <strong>Watching Overlord II</strong>
                  <span>Episode 10</span>
                  <span>18:42 elapsed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="vlc-mockup-step">
            <div className="vlc-mockup-step-label">AniList</div>
            <div className="vlc-mockup-card vlc-anilist-card">
              <div className="vlc-anilist-flex">
                <div className="vlc-anilist-info">
                  <strong>Watching</strong>
                  <span>Progress: 10 / 13</span>
                </div>
                <div className="vlc-sync-indicator">
                  Synced
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
