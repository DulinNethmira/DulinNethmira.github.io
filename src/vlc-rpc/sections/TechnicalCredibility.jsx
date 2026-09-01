import './TechnicalCredibility.css';
import { ChevronDown, Network, ShieldCheck } from 'lucide-react';

export default function TechnicalCredibility() {
  return (
    <section className="vlc-technical-section" id="how-it-works">
      <div className="vlc-technical-container">
        <div className="vlc-technical-header">
          <h2 className="vlc-heading-section">Under the hood.</h2>
          <p className="vlc-body-large">
            VLC RPC is engineered for reliability, running locally on your machine with a predictable state machine and secure OAuth architecture.
          </p>
        </div>

        <div className="vlc-architecture-grid">
          
          {/* Runtime Architecture */}
          <div className="vlc-arch-card vlc-glass-panel">
            <div className="vlc-arch-card-header">
              <Network className="vlc-arch-icon" />
              <h3>Runtime Architecture</h3>
            </div>
            
            <div className="vlc-arch-flow">
              <div className="vlc-arch-node">VLC Media Player</div>
              <ChevronDown className="vlc-arch-arrow" />
              <div className="vlc-arch-node">Playback Monitor (Lua HTTP)</div>
              <ChevronDown className="vlc-arch-arrow" />
              <div className="vlc-arch-node">Media Recognition</div>
              <ChevronDown className="vlc-arch-arrow" />
              <div className="vlc-arch-node">Metadata / Smart Matching (2-tier)</div>
              <ChevronDown className="vlc-arch-arrow" />
              <div className="vlc-arch-node highlight-node">Playback State</div>
              
              <div className="vlc-arch-split">
                <div className="vlc-arch-branch">
                  <div className="vlc-arch-line-vertical"></div>
                  <div className="vlc-arch-line-horizontal left"></div>
                  <ChevronDown className="vlc-arch-arrow-small" />
                  <div className="vlc-arch-node branch-node">Discord Presence</div>
                </div>
                <div className="vlc-arch-branch">
                  <div className="vlc-arch-line-vertical"></div>
                  <div className="vlc-arch-line-horizontal right"></div>
                  <ChevronDown className="vlc-arch-arrow-small" />
                  <div className="vlc-arch-node branch-node">AniList Synchronization</div>
                </div>
              </div>
            </div>
          </div>

          {/* Auth Architecture */}
          <div className="vlc-arch-card vlc-glass-panel">
            <div className="vlc-arch-card-header">
              <ShieldCheck className="vlc-arch-icon" />
              <h3>Authentication Flow</h3>
            </div>
            
            <div className="vlc-arch-flow">
              <div className="vlc-arch-node">AniList OAuth 2.0 Request</div>
              <ChevronDown className="vlc-arch-arrow" />
              <div className="vlc-arch-node">Local Callback Server (127.0.0.1)</div>
              <ChevronDown className="vlc-arch-arrow" />
              <div className="vlc-arch-node highlight-node">Secure Token Exchange</div>
              <ChevronDown className="vlc-arch-arrow" />
              <div className="vlc-arch-node">SQLite Local Storage</div>
              <ChevronDown className="vlc-arch-arrow" />
              <div className="vlc-arch-node branch-node">Authenticated AniList API</div>
            </div>
            
            <div className="vlc-arch-footer-note">
              No intermediary proxy backend is used. Your credentials remain strictly on your machine.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
