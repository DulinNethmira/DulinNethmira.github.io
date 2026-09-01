import DesktopMockup from '../components/DesktopMockup';
import ProductStatus from './ProductStatus';
import { Link } from 'react-router-dom';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="vlc-hero-section">
      <div className="vlc-hero-container">
        
        <ProductStatus />

        <h1 className="vlc-heading-display vlc-hero-headline">
          Your VLC.<br />
          <span className="vlc-text-gradient">Connected.</span>
        </h1>
        
        <p className="vlc-body-large vlc-hero-subtitle">
          VLC RPC brings intelligent Discord Rich Presence, media recognition, AniList synchronization, and rewatch-aware tracking to your VLC experience.
        </p>
        
        <div className="vlc-hero-actions">
          <Link to="/tools/vlc-rpc/download" className="vlc-primary-btn vlc-hero-btn">
            Download VLC RPC
          </Link>
          <a href="https://github.com/DulinNethmira/VLC-RPC" target="_blank" rel="noopener noreferrer" className="vlc-secondary-btn vlc-hero-btn">
            Explore the project
          </a>
        </div>

        <DesktopMockup />
        
      </div>
    </section>
  );
}
