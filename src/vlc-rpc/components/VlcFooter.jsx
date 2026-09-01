import { Link } from 'react-router-dom';
import './VlcFooter.css';

export default function VlcFooter() {
  return (
    <footer className="vlc-footer">
      <div className="vlc-footer-container">
        <div className="vlc-footer-brand-col">
          <div className="vlc-nav-brand">
            <img src="/vlc-rpc-icon.png" alt="VLC RPC Logo" className="vlc-logo" />
            <span className="vlc-brand-text">VLC RPC</span>
          </div>
          <p className="vlc-footer-desc">
            Intelligent media presence for VLC.<br/>
            Watch. Recognize. Sync. Repeat.
          </p>
        </div>
        
        <div className="vlc-footer-links-grid">
          <div className="vlc-footer-col">
            <h4>Product</h4>
            <Link to="/tools/vlc-rpc">Features</Link>
            <Link to="/tools/vlc-rpc/download">Download</Link>
            <Link to="/tools/vlc-rpc/changelog">Changelog</Link>
          </div>
          <div className="vlc-footer-col">
            <h4>Resources</h4>
            <Link to="/tools/vlc-rpc/docs">Documentation</Link>
            <a href="#faq">FAQ</a>
            <Link to="/tools/vlc-rpc/docs/troubleshooting">Troubleshooting</Link>
          </div>
          <div className="vlc-footer-col">
            <h4>Developer</h4>
            <a href="https://github.com/DulinNethmira/VLC-RPC" target="_blank" rel="noopener noreferrer">Source</a>
            <a href="https://github.com/DulinNethmira/VLC-RPC/releases" target="_blank" rel="noopener noreferrer">Releases</a>
            <a href="https://github.com/DulinNethmira/VLC-RPC/issues" target="_blank" rel="noopener noreferrer">Issues</a>
          </div>
          <div className="vlc-footer-col">
            <h4>Legal</h4>
            <Link to="/tools/vlc-rpc/privacy">Privacy</Link>
            <a href="https://github.com/DulinNethmira/VLC-RPC/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">License</a>
          </div>
        </div>
      </div>
      
      <div className="vlc-footer-bottom">
        <div className="vlc-footer-bottom-container">
          <p>© {new Date().getFullYear()} Dulin Nethmira</p>
          <p className="vlc-disclaimer">VLC RPC is an independent project and is not affiliated with VideoLAN or Discord.</p>
        </div>
      </div>
    </footer>
  );
}
