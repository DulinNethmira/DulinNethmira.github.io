import './TargetAudience.css';
import { MonitorPlay, Users, LayoutDashboard, History } from 'lucide-react';

export default function TargetAudience() {
  const audiences = [
    {
      title: "Anime Watchers",
      desc: "Stop manually updating AniList. Let VLC RPC sync your progress automatically with OP/ED skipping support.",
      icon: <MonitorPlay className="vlc-audience-icon" />
    },
    {
      title: "VLC Power Users",
      desc: "Enhance your favorite media player with modern presence and tracking features without leaving the ecosystem.",
      icon: <LayoutDashboard className="vlc-audience-icon" />
    },
    {
      title: "Discord Communities",
      desc: "Share exactly what you're watching with your friends through accurate and elegant Rich Presence cards.",
      icon: <Users className="vlc-audience-icon" />
    },
    {
      title: "Data Enthusiasts",
      desc: "Maintain a complete, local SQLite history of everything you watch and generate your yearly Anime Wrapped.",
      icon: <History className="vlc-audience-icon" />
    }
  ];

  return (
    <section className="vlc-audience-section">
      <div className="vlc-audience-container">
        <div className="vlc-audience-header">
          <h2 className="vlc-heading-section">Built for people who live in VLC.</h2>
          <p className="vlc-body-large">
            Designed for local media enthusiasts who want intelligent tracking without sacrificing control.
          </p>
        </div>

        <div className="vlc-audience-grid">
          {audiences.map((item, index) => (
            <div key={index} className="vlc-audience-card vlc-glass-panel">
              <div className="vlc-audience-icon-wrapper">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
