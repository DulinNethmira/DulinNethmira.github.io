import { useEffect } from 'react';
import VlcNavbar from '../components/VlcNavbar';
import VlcFooter from '../components/VlcFooter';
import '../styles/theme.css';
import '../styles/animations.css';

export default function VlcLayout({ children }) {
  useEffect(() => {
    // Add a class to body for specific VLC RPC global scoping if needed
    document.body.classList.add('vlc-rpc-active');
    return () => {
      document.body.classList.remove('vlc-rpc-active');
    };
  }, []);

  return (
    <div className="vlc-rpc-layout">
      <VlcNavbar />
      <main className="vlc-rpc-main">{children}</main>
      <VlcFooter />
    </div>
  );
}
