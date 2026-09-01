import DownloadSection from '../sections/DownloadSection';
import './Pages.css';

export default function Download() {
  return (
    <div className="vlc-page-container">
      <div className="vlc-page-header">
        <h1 className="vlc-heading-display">Download</h1>
        <p className="vlc-body-large">Get the latest release of VLC RPC for Windows.</p>
      </div>

      <div className="vlc-page-content">
        <DownloadSection />
      </div>
    </div>
  );
}
