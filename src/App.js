import { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { SnakeGame } from './components/games/SnakeGame';
import { MemoryMatch } from './components/games/MemoryMatch';
import { TypingTest } from './components/games/TypingTest';
//import avatarImg from './assets/avatar.png'; // Add your photo here
import './App.css';

/* ─── Scroll-reveal with IntersectionObserver ─── */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '-80px 0px' }
    );
    document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

/* ─── Reusable section label ─── */
function SectionLabel({ title }) {
  return (
    <div className="editorial-label-col">
      <div className="section-label">
        <span className="section-label-text">{title}</span>
        <span className="section-label-line" />
      </div>
    </div>
  );
}

/* ─── Inline SVG icons ─── */
const ArrowDown = () => (
  <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <polyline points="19 12 12 19 5 12"/>
  </svg>
);

const ArrowRight = () => (
  <svg className="btn-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const ExternalLink = () => (
  <svg className="project-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

/* ─── Expertise data ─── */
const LANGUAGES_TECH = [
  'JavaScript', 'TypeScript', 'Python', 'C++', 'Arduino', 'CSS', 'HTML',
  'Git', 'REST API', 'MongoDB', 'PostgreSQL', 'SQL', 'Docker', 'CI/CD', 'TinkerCAD',
  'Linux', 'Firebase', 'Supabase', 'AWS', 'Azure', 'Figma'
];

const FRAMEWORKS = [
  'React', 'Node.js', 'Express.js', 'Vue.js', 'React Native', 'Bootstrap', 'Tailwind CSS', 'Django', 'Flask', 'TensorFlow.js', 'Three.js', 'GSAP'
];

function SkillsCarousel() {
  const allSkills = [...LANGUAGES_TECH, ...FRAMEWORKS];
  const skillsDouble = [...allSkills, ...allSkills];

  return (
    <section id="expertise" className="section-padding container fade-in-up">
      <div className="editorial-row">
        <SectionLabel title="Expertise" />
        <div className="editorial-content-col">
          <div className="skills-carousel" role="region" aria-label="Expertise skills carousel">
            <div className="skills-track">
              {skillsDouble.map((skill, idx) => (
                <span className="skill-chip" key={`skill-${skill}-${idx}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Projects data ─── */
const PROJECTS = [
  {
    title: 'Robotics Research',
    stack: 'C++, Arduino, Hardware',
    desc: 'Autonomous prototypes utilizing ultrasonic sensors. Achieved 98% obstacle detection accuracy in dynamic environments.',
    link: 'https://github.com/daniel-odulate22',
  },
  {
    title: 'PulsePoint News',
    stack: 'Node.js, React, APIs',
    desc: 'Full-stack news aggregator reducing reading time by 60% with sub-2s load times and real-time fetching.',
    link: 'https://pulse-point-news.vercel.app/',
  },
  {
    title: 'Vigil Health - Medical Adherence App',
    stack: 'Mobile, JS Backend, HealthTech',
    desc: 'The Doulingo but for your medication...except if you miss a streak, it could cost you your life. A Medication adherence mobile application designed to prevent missed doses with real-time caregiver updates.',
    link: 'https://vigilhealth-waitlist.vercel.app',
  },
  {
    title: 'NutriTrack',
    stack: 'Web App, Fitness',
    desc: 'Meal logging application tailored for gym enthusiasts with comprehensive macro tracking.',
    link: 'https://nutri-track-v1.vercel.app/',
  },
];

export default function App() {
  useScrollReveal();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Navbar />

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section id="hero" className="hero container">
        <div className="hero__grid">

          {/* Left — text column */}
          <div className="hero__text hero-text-animate">

            {/* "Available for work" badge */}
            <div className="hero__badge">
              <span className="pulse-dot-wrapper">
                <span className="pulse-dot-ring" />
                <span className="pulse-dot-core" />
              </span>
              Available for work
            </div>

            {/* Giant name */}
            <h1 className="hero__name">
              Daniel<br />
              <span className="hero__name--muted">Alexander</span>
            </h1>

            {/* Role subtitle */}
             <p className="hero_subtitle">
              Taking what's in your head and bringing it to life.
            </p>

              <p className="hero__subtitle">
              Full-Stack Developer &amp; Robotics Software Engineer building intelligent
              systems and seamless web experiences.
            </p>

            {/* CTA links — styled text with arrows, NOT pill buttons */}
            <div className="hero__ctas">
              <button className="cta-link cta-link--primary" onClick={() => scrollTo('projects')}>
                <span className="cta-link__label">View Projects</span>
                <ArrowDown />
              </button>
              <button className="cta-link cta-link--secondary" onClick={() => scrollTo('contact')}>
                <span className="cta-link__label">Contact Me</span>
                <ArrowRight />
              </button>
            </div>
          </div>

          {/* Right — avatar */}
          {/* <div className="hero__avatar-wrap hero-avatar-animate"> */}
            {/*
              AVATAR: Replace with your photo at src/assets/avatar.png
              The image has a slight desaturation + contrast boost.
              On hover, colour is fully restored.
            */}
            {/* <div style={{
              width: '100%',
              maxWidth: '480px',
              height: 'auto',
              backgroundColor: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--muted-fg)',
              fontFamily: 'var(--font-mono)',
              fontSize: '14px',
              textAlign: 'center'
            }}>
            </div>
          </div> */}

        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════ */}
      <section id="about" className="section-padding container fade-in-up">
        <div className="editorial-row">
          <SectionLabel title="About" />
          <div className="editorial-content-col">
            <p className="about__text">
              A creative software engineer bridging the gap between digital
              interfaces and physical hardware. With expertise in web development and
              embedded systems, I build solutions that live on screens and move in the
              real world. Constantly exploring the intersection of AI, robotics, and clean UI.
            </p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <SkillsCarousel />

      <hr className="section-divider" />

      {/* ═══════════════════════════════════════
          EXPERIENCE
      ═══════════════════════════════════════ */}
      <section id="experience" className="section-padding container fade-in-up">
        <div className="editorial-row">
          <SectionLabel title="Experience" />
          <div className="editorial-content-col">
            <div className="exp__list">

              <div className="exp__item">
                <span className="exp__date">Mar 2026 — Present</span>
                <div>
                  <h3 className="exp__role">Assistant to Founder</h3>
                  <p className="exp__company">Your Favourite Engineer (YFE)</p>
                  <p className="exp__desc">
                    Identified bottlenecks in the founder's technical workflow. Applied
                    systems architecture principles to audit and streamline engineering
                    documentation. Standardized brand positioning across technical assets.
                  </p>
                </div>
              </div>

              <div className="exp__item">
                <span className="exp__date">Aug 2025</span>
                <div>
                  <h3 className="exp__role">Core Member / Backend Developer</h3>
                  <p className="exp__company">GDG Babcock University</p>
                  <p className="exp__desc">
                    Active contributor to community software projects and technical
                    workshops as a backend developer.
                  </p>
                </div>
              </div>

              <div className="exp__item">
                <span className="exp__date">May–Aug 2025</span>
                <div>
                  <h3 className="exp__role">Lead Web Developer</h3>
                  <p className="exp__company">Model College Sagamu</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════════════════════════
          PROJECTS
      ═══════════════════════════════════════ */}
      <section id="projects" className="section-padding container fade-in-up">
        <div className="editorial-row">
          <SectionLabel title="Selected Work" />
          <div className="editorial-content-col">
            <div className="projects__list">
              {PROJECTS.map((project, i) => (
                <a key={i} href={project.link} className="project__row">
                  <div className="project__header">
                    <h3 className="project__title">
                      {project.title}
                      <ExternalLink />
                    </h3>
                    <span className="project__stack">{project.stack}</span>
                  </div>
                  <p className="project__desc">{project.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════════════════════════
          EDUCATION
      ═══════════════════════════════════════ */}
      <section className="section-padding container fade-in-up">
        <div className="editorial-row">
          <SectionLabel title="Education" />
          <div className="editorial-content-col">
            <div className="edu__list">

              <div className="edu__item">
                <h3 className="edu__degree">BSc Software Engineering</h3>
                <div className="edu__meta">
                  <span className="edu__school">Babcock University</span>
                  <span className="edu__year">Expected 2028</span>
                </div>
              </div>

              <div className="edu__item">
                <h3 className="edu__degree">Software Dev Certification</h3>
                <div className="edu__meta">
                  <span className="edu__school">Digital Skillup Africa</span>
                  <span className="edu__year">Completed</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* ═══════════════════════════════════════
          GAMES
      ═══════════════════════════════════════ */}
      <section id="games" className="section-padding container fade-in-up">
        <div className="editorial-row">
          <SectionLabel title="Play" />
          <div className="editorial-content-col">

            <div className="games__header">
              <h2 className="games__title">Take a Break.</h2>
              <p className="games__subtitle">Interactive components built with React.</p>
            </div>

            <div className="games__grid">
              <div className="game-card game-card--snake">
                <SnakeGame />
              </div>
              <div className="game-card game-card--memory">
                <MemoryMatch />
              </div>
              <div className="game-card game-card--typing">
                <TypingTest />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════ */}
      <section id="contact" className="contact section-padding container fade-in-up">

        <h2 className="contact__heading">
          Let's Build<br />Something Together.
        </h2>

        <div className="contact__body">
          <a href="mailto:xand3r2297@gmail.com" className="contact__email">
            xand3r2297@gmail.com
          </a>

        <div className="contact__socials">
          <a href="https://www.linkedin.com/in/danielodulate/" target="_blank" rel="noopener noreferrer" className="social-link">
            <ArrowRight /> LinkedIn
          </a>
          <a href="https://github.com/daniel-odulate22" target="_blank" rel="noopener noreferrer" className="social-link">
           <ArrowRight /> GitHub
          </a>
         <a href="https://www.instagram.com/d.al3x_1/" target="_blank" rel="noopener noreferrer" className="social-link">
          <ArrowRight /> Instagram
         </a>
      <a href="https://x.com/Xander_danny229/" target="_blank" rel="noopener noreferrer" className="social-link">
        <ArrowRight /> Twitter / X
        </a>
    </div>
    </div>

      </section>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Daniel Alexander. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
