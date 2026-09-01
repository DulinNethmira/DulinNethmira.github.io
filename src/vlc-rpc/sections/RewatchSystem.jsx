import './RewatchSystem.css';
import { RefreshCw, PlayCircle, CheckCircle2, CheckSquare } from 'lucide-react';

export default function RewatchSystem() {
  return (
    <section className="vlc-rewatch-section">
      <div className="vlc-rewatch-container">
        
        <div className="vlc-rewatch-content">
          <h2 className="vlc-heading-section">Finished doesn't always mean finished.</h2>
          <p className="vlc-body-large">
            VLC RPC is fully aware of your watch history. If you start playing a series you've already completed on AniList, it initiates an intelligent rewatch cycle.
          </p>
          <p className="vlc-body-large vlc-text-secondary">
            Instead of failing to sync or overwriting your past score, the system waits for you to cross the configurable playback threshold before officially mutating your AniList progress.
          </p>
        </div>

        <div className="vlc-rewatch-visual vlc-glass-panel">
          <div className="vlc-rewatch-machine">
            
            <div className="vlc-rewatch-state completed">
              <CheckSquare className="vlc-state-icon" />
              <span>Status: Completed</span>
            </div>
            
            <div className="vlc-rewatch-line"></div>
            
            <div className="vlc-rewatch-state detected">
              <PlayCircle className="vlc-state-icon" />
              <span>Playback Detected</span>
            </div>
            
            <div className="vlc-rewatch-line threshold">
              <div className="vlc-threshold-marker">
                <span>80% Threshold</span>
              </div>
            </div>
            
            <div className="vlc-rewatch-state confirmed">
              <CheckCircle2 className="vlc-state-icon" />
              <span>Threshold Confirmed</span>
            </div>
            
            <div className="vlc-rewatch-line"></div>
            
            <div className="vlc-rewatch-state sync">
              <RefreshCw className="vlc-state-icon" />
              <span>Rewatch Sync Mutation</span>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
}
