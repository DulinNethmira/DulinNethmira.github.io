import { Routes, Route } from 'react-router-dom';
import VlcLayout from './layouts/VlcLayout';
import Landing from './pages/Landing';
import Docs from './pages/Docs';
import Changelog from './pages/Changelog';
import Privacy from './pages/Privacy';
import Download from './pages/Download';

export default function VlcRpcApp() {
  return (
    <VlcLayout>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/docs/*" element={<Docs />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/download" element={<Download />} />
      </Routes>
    </VlcLayout>
  );
}
