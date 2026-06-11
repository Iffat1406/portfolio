import { useRef, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { useTheme } from '../theme/AppTheme';
import ThemeToggle from './ToggleTheme';

const LINKS = [
  { label: 'Work',    path: '/'        },
  { label: 'About',   path: '/about'   },
  { label: 'Process', path: '/process' },
  { label: 'Journal', path: '/journal' },
];

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen]   = useState(false);
  const [hidden, setHidden]       = useState(false);
  const location = useLocation();

  const navRef      = useRef(null);
  const logoRef     = useRef(null);
  const linksRef    = useRef([]);
  const rightRef    = useRef(null);
  const themeRef    = useRef(null);
  const lastScroll  = useRef(0);

  // ── Entry animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(navRef.current,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0,    opacity: 1, duration: 1, delay: 0.5 }
      )
      .fromTo(logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0,  duration: 0.6 }, '-=0.4'
      )
      .fromTo(linksRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5 }, '-=0.4'
      )
      .fromTo(rightRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6 }, '-=0.5'
      );
  }, []);

  // ── Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY;
      setHidden(cur > lastScroll.current && cur > 80);
      lastScroll.current = cur;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Theme icon spin
  const handleThemeToggle = () => {
    gsap.fromTo(themeRef.current,
      { rotate: 0,   scale: 1   },
      { rotate: 360, scale: 1.3, duration: 0.5,
        ease: 'back.out(2)',
        onComplete: () => gsap.set(themeRef.current, { rotate: 0 })
      }
    );
    toggleTheme();
  };

  // ── Magnetic CTA
  const handleMagnet = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
  };
  const handleMagnetLeave = (el) => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
  };

  const ctaRef = useRef(null);

  return (
    <>
      <Nav ref={navRef} $hidden={hidden}>

        <Logo ref={logoRef} to="/">
          <LogoDot />
          Your<Accent>Name</Accent>
        </Logo>

        <Links>
          {LINKS.map(({ label, path }, i) => (
            <li key={label}>
              <NavLink
                ref={el => linksRef.current[i] = el}
                to={path}
                $active={location.pathname === path}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </Links>

        <Right ref={rightRef}>
          <Status>
            <StatusDot /> Available
          </Status>

          <ThemeToggle ref={themeRef} onClick={handleThemeToggle} />

          <CtaBtn
            ref={ctaRef}
            onMouseMove={e => handleMagnet(e, ctaRef.current)}
            onMouseLeave={() => handleMagnetLeave(ctaRef.current)}
          >
            Let's talk <Arrow>↗</Arrow>
          </CtaBtn>

          <Hamburger onClick={() => setMenuOpen(v => !v)} $open={menuOpen}>
            <Line $open={menuOpen} $i={0} />
            <Line $open={menuOpen} $i={1} />
            <Line $open={menuOpen} $i={2} />
          </Hamburger>
        </Right>
      </Nav>

      <MobileMenu $open={menuOpen}>
        {LINKS.map(({ label, path }) => (
          <MobileLink
            key={label}
            to={path}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </MobileLink>
        ))}
      </MobileMenu>
    </>
  );
};