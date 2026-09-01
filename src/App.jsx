import { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Particles from './components/Particles';
import ContactModal from './components/ContactModal';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Services from './pages/Services';
import ErrorBoundary from './components/ErrorBoundary';
import VlcRpcApp from './vlc-rpc/VlcRpcApp';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const location = useLocation();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const isVlcRpcRoute = location.pathname.startsWith('/tools/vlc-rpc');

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Particles />
      {!isVlcRpcRoute && <CustomCursor />}
      {!isVlcRpcRoute && <Navbar onContactClick={() => setIsContactOpen(true)} />}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home onContactClick={() => setIsContactOpen(true)} />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/services" element={<Services onContactClick={() => setIsContactOpen(true)} />} />
          <Route path="/tools/vlc-rpc/*" element={<VlcRpcApp />} />
          <Route path="/vlc-rpc/*" element={<Navigate to="/tools/vlc-rpc" replace />} />
        </Routes>
      </ErrorBoundary>
      {!isVlcRpcRoute && <Footer />}
    </>
  );
}

export default App;
