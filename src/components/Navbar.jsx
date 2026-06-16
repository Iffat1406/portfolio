import { useRef, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { gsap } from 'gsap';
import ThemeToggle from './ToggleTheme';

const LINKS = [
  { label: 'Work',    path: '/'        },
  { label: 'About',   path: '/about'   },
  { label: 'Process', path: '/process' },
  { label: 'Journal', path: '/journal' },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navRef     = useRef(null);
  const logoRef    = useRef(null);
  const linksRef   = useRef([]);
  const rightRef   = useRef(null);
  const ctaRef     = useRef(null);
  const lastScroll = useRef(0);
  const lastHide   = useRef(false);

  // Entry animation
  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete() {
        gsap.set(navRef.current, { clearProps: 'transform,opacity,y,yPercent' });
      },
    });
    tl.fromTo(navRef.current,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, delay: 0.5 }
      )
      .fromTo(logoRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.6 }, '-=0.4'
      )
      .fromTo(linksRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.5 }, '-=0.4'
      )
      .fromTo(rightRef.current,
        { opacity: 0, x: 16 },
        { opacity: 1, x: 0, duration: 0.6 }, '-=0.5'
      );
  }, []);

  // Hide-on-scroll — GSAP only, no CSS transform conflict
  useEffect(() => {
    const onScroll = () => {
      const cur = window.scrollY;
      const shouldHide = cur > lastScroll.current && cur > 80;
      if (shouldHide !== lastHide.current) {
        gsap.to(navRef.current, {
          yPercent: shouldHide ? -100 : 0,
          duration: shouldHide ? 0.35 : 0.5,
          ease: shouldHide ? 'power2.in' : 'power3.out',
          overwrite: true,
        });
        lastHide.current = shouldHide;
      }
      lastScroll.current = cur;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Magnetic CTA
  const handleMagnet = (e, el) => {
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width  / 2) * 0.3,
      y: (e.clientY - r.top  - r.height / 2) * 0.3,
      duration: 0.4,
      ease: 'power2.out',
    });
  };
  const handleMagnetLeave = (el) => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
  };

  return (
    <>
      <Nav ref={navRef}>
        <Logo ref={logoRef} to="/">
          <LogoDot />
          Iffat<Accent>.</Accent>
        </Logo>

        <Links>
          {LINKS.map(({ label, path }, i) => (
            <li key={label}>
              <NavLink
                ref={el => { linksRef.current[i] = el; }}
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

          <ThemeToggle />

          <CtaBtn
            ref={ctaRef}
            onMouseMove={e => handleMagnet(e, ctaRef.current)}
            onMouseLeave={() => handleMagnetLeave(ctaRef.current)}
          >
            Let's talk <Arrow>↗</Arrow>
          </CtaBtn>

          <Hamburger
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(v => !v)}
            $open={menuOpen}
          >
            <Line $open={menuOpen} $i={0} />
            <Line $open={menuOpen} $i={1} />
            <Line $open={menuOpen} $i={2} />
          </Hamburger>
        </Right>
      </Nav>

      <MobileMenu $open={menuOpen}>
        <MobileClose onClick={() => setMenuOpen(false)}>✕</MobileClose>
        {LINKS.map(({ label, path }) => (
          <MobileLink key={label} to={path} onClick={() => setMenuOpen(false)}>
            {label}
          </MobileLink>
        ))}
        <MobileCta href="mailto:hello@iffat.dev">hello@iffat.dev</MobileCta>
      </MobileMenu>
    </>
  );
};

// ─── Styled Components ────────────────────────────────────────────────────────

const Nav = styled.nav`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 4vw;
  background: ${({ theme }) => `${theme.colors.bg}e0`};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  will-change: transform;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.15rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
`;

const LogoDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  flex-shrink: 0;
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

const Links = styled.ul`
  display: flex;
  align-items: center;
  gap: 2.5rem;
  list-style: none;

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-family: ${({ theme }) => theme.font.body};
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${({ theme, $active }) => $active ? theme.colors.text : theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1rem;
`;

const Status = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    display: none;
  }
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.8); }
  }
`;

const CtaBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 1.2rem;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-family: ${({ theme }) => theme.font.body};
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  border-radius: 9999px;
  border: none;
  will-change: transform;
  transition: background 0.25s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    display: none;
  }
`;

const Arrow = styled.span``;

const Hamburger = styled.button`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  padding: 4px;
  background: none;
  border: none;

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    display: flex;
  }
`;

const Line = styled.span`
  display: block;
  width: 22px;
  height: 1.5px;
  background: ${({ theme }) => theme.colors.text};
  transform-origin: center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;

  ${({ $open, $i }) => {
    if (!$open) return '';
    if ($i === 0) return 'transform: rotate(45deg) translate(4px, 4px);';
    if ($i === 1) return 'opacity: 0; transform: scaleX(0);';
    if ($i === 2) return 'transform: rotate(-45deg) translate(4px, -4px);';
    return '';
  }}
`;

const MobileMenu = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transform: translateX(${({ $open }) => $open ? '0' : '100%'});
  transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);

  @media (min-width: ${({ theme }) => theme.breakpoint.md}) {
    display: none;
  }
`;

const MobileClose = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 4vw;
  background: none;
  border: none;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const MobileLink = styled(Link)`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(2.2rem, 8vw, 5rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const MobileCta = styled.a`
  margin-top: 2rem;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0.25rem;
`;
