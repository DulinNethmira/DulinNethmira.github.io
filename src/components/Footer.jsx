import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Magnetic from './Magnetic';
import logoUrl from '../assets/logo.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer section">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logoUrl} alt="Dulin Logo" style={{ height: '32px', width: 'auto', display: 'block' }} />
            </Link>
            <p className="footer-desc">Vibe-Coder, AI Developer, and Creative Technologist.</p>
          </div>
          <div className="footer-links-group">
            <div className="footer-col">
              <h4>Navigation</h4>
              <Link to="/">Home</Link>
              <Link to="/tools">Tools</Link>
              <Link to="/services">Services</Link>
            </div>
            <div className="footer-col">
              <h4>Connect</h4>
              <a href="mailto:dulinethmira08@gmail.com">Email</a>
              <a href="https://github.com/DulinNethmira" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Dulin Nethmira. All rights reserved.</p>
          <p className="location">Building in Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
