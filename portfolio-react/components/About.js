import SkillsOrbit from './SkillsOrbit';

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrapper">
            <div className="about-image-card">
              <SkillsOrbit />
              <div className="about-image-decoration"></div>
            </div>
          </div>
          <div className="about-content">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">Just a guy who likes <span className="gradient-text">making things look good</span></h2>
            <p className="about-text">
              I'm Dulin, and I'm from Homagama, Sri Lanka. I got into web design and video editing because I genuinely enjoy it. 
              I noticed a lot of small businesses around here don't have a proper website or good video content, 
              and the ones that do usually paid way too much for it.
            </p>
            <p className="about-text">
              So that's basically what I do. I make websites and edit videos for local businesses at prices that actually make sense. 
              Nothing fancy, just solid work that helps you look professional and get more customers. 
              If you need a website, a video for your socials, or a YouTube edit, just hit me up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
