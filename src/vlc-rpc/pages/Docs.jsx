import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './Pages.css';

export default function Docs() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="vlc-page-container">
      <div className="vlc-page-header">
        <h1 className="vlc-heading-display">Documentation</h1>
        <p className="vlc-body-large">Everything you need to set up, configure, and troubleshoot VLC RPC.</p>
      </div>

      <div className="vlc-docs-layout">
        <aside className="vlc-docs-sidebar">
          <h3>Getting Started</h3>
          <nav className="vlc-docs-nav">
            <Link to="/tools/vlc-rpc/docs" className={`vlc-docs-link ${currentPath === '/tools/vlc-rpc/docs' ? 'active' : ''}`}>Installation</Link>
            <Link to="/tools/vlc-rpc/docs/configuration" className={`vlc-docs-link ${currentPath === '/tools/vlc-rpc/docs/configuration' ? 'active' : ''}`}>Configuration</Link>
          </nav>
          
          <h3 style={{ marginTop: '2rem' }}>Integrations</h3>
          <nav className="vlc-docs-nav">
            <Link to="/tools/vlc-rpc/docs/discord" className={`vlc-docs-link ${currentPath.includes('discord') ? 'active' : ''}`}>Discord</Link>
            <Link to="/tools/vlc-rpc/docs/anilist" className={`vlc-docs-link ${currentPath.includes('anilist') ? 'active' : ''}`}>AniList Sync</Link>
          </nav>

          <h3 style={{ marginTop: '2rem' }}>Advanced</h3>
          <nav className="vlc-docs-nav">
            <Link to="/tools/vlc-rpc/docs/recognition" className={`vlc-docs-link ${currentPath.includes('recognition') ? 'active' : ''}`}>Media Recognition</Link>
            <Link to="/tools/vlc-rpc/docs/troubleshooting" className={`vlc-docs-link ${currentPath.includes('troubleshooting') ? 'active' : ''}`}>Troubleshooting</Link>
            <Link to="/tools/vlc-rpc/docs/faq" className={`vlc-docs-link ${currentPath.includes('faq') ? 'active' : ''}`}>FAQ</Link>
          </nav>
        </aside>

        <div className="vlc-page-content">
          <Routes>
            <Route path="/" element={
              <section className="vlc-content-section">
                <h2>Installation</h2>
                <p>Welcome to VLC RPC. To get started, download the latest Windows executable from the download page.</p>
                <h3>Prerequisites</h3>
                <ul>
                  <li>Windows 10 or 11 (64-bit)</li>
                  <li>VLC Media Player installed</li>
                  <li>A Discord desktop client running (if you want Rich Presence)</li>
                </ul>
                <p><em>(Detailed documentation content will be populated here in the future.)</em></p>
              </section>
            } />
            <Route path="/:topic" element={
              <section className="vlc-content-section">
                <h2>Work in Progress</h2>
                <p>This documentation section is currently being written. Please check the official GitHub repository for detailed setup instructions in the meantime.</p>
              </section>
            } />
          </Routes>
        </div>
      </div>
    </div>
  );
}
