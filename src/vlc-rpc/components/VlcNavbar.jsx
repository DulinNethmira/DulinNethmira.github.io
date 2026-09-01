import { Link } from 'react-router-dom';
import './VlcNavbar.css';

export default function VlcNavbar() {
  return (
    <nav className="vlc-nav">
      <div className="vlc-nav-container">
        <div className="vlc-nav-left">
          <Link to="/tools/vlc-rpc" className="vlc-nav-brand">
            <img src="/vlc-rpc-icon.png" alt="VLC RPC Logo" className="vlc-logo" />
            <span className="vlc-brand-text">VLC RPC</span>
          </Link>
          <div className="vlc-nav-links">
            <Link to="/tools/vlc-rpc">Features</Link>
            <a href="#how-it-works">How It Works</a>
            <a href="#anilist">AniList</a>
            <Link to="/tools/vlc-rpc/docs">Documentation</Link>
            <Link to="/tools/vlc-rpc/changelog">Changelog</Link>
          </div>
        </div>
        <div className="vlc-nav-right">
          <a href="https://github.com/DulinNethmira/VLC-RPC" target="_blank" rel="noopener noreferrer" className="vlc-nav-link">GitHub</a>
          <Link to="/tools/vlc-rpc/download" className="vlc-primary-btn">Download VLC RPC</Link>
        </div>
      </div>
    </nav>
  );
}
