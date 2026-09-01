import { useState, useEffect } from 'react';
import { productInfo } from '../data/product';
import './DownloadSection.css';
import { Download, ExternalLink } from 'lucide-react';

export default function DownloadSection() {
  const [release, setRelease] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchRelease() {
      try {
        const response = await fetch(`https://api.github.com/repos/${productInfo.github.repo}/releases/latest`);
        if (!response.ok) throw new Error('API limit or network error');
        
        const data = await response.json();
        
        // Find the Windows installer (.exe)
        const exeAsset = data.assets?.find(asset => asset.name.endsWith('.exe'));
        
        if (exeAsset) {
          setRelease({
            version: data.tag_name,
            date: new Date(data.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
            url: exeAsset.browser_download_url,
            filename: exeAsset.name,
            size: (exeAsset.size / 1024 / 1024).toFixed(1) + ' MB'
          });
        } else {
          // Fallback to release page if no exe found
          setRelease({
            version: data.tag_name,
            date: new Date(data.published_at).toLocaleDateString(),
            url: productInfo.github.releases,
            filename: 'View on GitHub',
            size: 'Unknown'
          });
        }
      } catch (err) {
        setError(true);
        // Graceful degradation: use product.js fallbacks but link to github releases
        setRelease({
          version: productInfo.fallback.latestVersion,
          date: 'Latest',
          url: productInfo.github.releases,
          filename: 'Download from GitHub',
          size: ''
        });
      } finally {
        setLoading(false);
      }
    }

    fetchRelease();
  }, []);

  return (
    <section className="vlc-download-section" id="download">
      <div className="vlc-download-container">
        <h2 className="vlc-heading-section">Ready to connect VLC?</h2>
        <p className="vlc-body-large vlc-download-subtitle">
          Download the latest version of VLC RPC and elevate your media experience.
        </p>

        <div className="vlc-download-card vlc-glass-panel">
          <div className="vlc-download-card-content">
            <div className="vlc-download-info">
              <h3>Windows Installer</h3>
              {loading ? (
                <div className="vlc-loading-pulse">Fetching latest release...</div>
              ) : (
                <div className="vlc-release-meta">
                  <span className="vlc-badge">{release.version}</span>
                  <span className="vlc-meta-text">{release.date}</span>
                  {release.size && <span className="vlc-meta-text">{release.size}</span>}
                </div>
              )}
            </div>
            
            <div className="vlc-download-actions">
              <a 
                href={loading ? productInfo.github.releases : release.url}
                target={loading || error ? "_blank" : "_self"}
                rel={loading || error ? "noopener noreferrer" : ""}
                className={`vlc-primary-btn vlc-download-btn ${loading ? 'disabled' : ''}`}
              >
                <Download size={20} />
                {loading ? 'Loading...' : 'Download for Windows'}
              </a>
            </div>
          </div>
          
          <div className="vlc-download-card-footer">
            <a href={productInfo.github.repo} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} /> View Source on GitHub
            </a>
            <a href={productInfo.github.releases} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} /> All Releases
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
