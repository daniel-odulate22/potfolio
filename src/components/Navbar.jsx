import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import './Navbar.css';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">

        {/* Logo — clicking scrolls back to top */}
        <button className="navbar__logo" onClick={() => scrollTo('hero')}>
          DANIEL <span className="navbar__dot">.</span>
        </button>

        {/* Desktop links + theme toggle */}
        <div className="navbar__right">
          <div className="navbar__links">
            <button onClick={() => scrollTo('experience')}>Work</button>
            <button onClick={() => scrollTo('projects')}>Projects</button>
            <button onClick={() => scrollTo('contact')}>Contact</button>
          </div>
          <ThemeToggle />
        </div>

      </div>
    </nav>
  );
}