import HeroSection from '../sections/HeroSection';
import TargetAudience from '../sections/TargetAudience';
import TechnicalCredibility from '../sections/TechnicalCredibility';
import AnimeWrapped from '../sections/AnimeWrapped';
import RewatchSystem from '../sections/RewatchSystem';
import DownloadSection from '../sections/DownloadSection';

export default function Landing() {
  return (
    <div className="vlc-landing-page">
      <HeroSection />
      <TargetAudience />
      <AnimeWrapped />
      <RewatchSystem />
      <TechnicalCredibility />
      <DownloadSection />
    </div>
  );
}
