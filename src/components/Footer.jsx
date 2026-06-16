import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Work',    path: '/'        },
  { label: 'About',   path: '/about'   },
  { label: 'Process', path: '/process' },
];

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com'   },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter',  href: 'https://twitter.com'  },
  { label: 'Dribbble', href: 'https://dribbble.com' },
];

const Footer = () => {
  const sectionRef = useRef(null);
  const emailRef   = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-cta-line',
        { yPercent: 115 },
        {
          yPercent: 0,
          stagger: 0.06,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 82%' },
        },
      );
      gsap.fromTo('.footer-fade',
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0,
          stagger: 0.07,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.footer-bottom', start: 'top 92%' },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMagnet = (e) => {
    const el = emailRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: (e.clientX - r.left - r.width  / 2) * 0.22,
      y: (e.clientY - r.top  - r.height / 2) * 0.22,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  const handleMagnetLeave = () => {
    gsap.to(emailRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,0.5)' });
  };

  return (
    <Section ref={sectionRef}>
      <Inner>
        <CtaBlock>
          <CtaEyebrow>Let&apos;s build something</CtaEyebrow>
          <CtaLines>
            {["LET'S WORK", 'TOGETHER.'].map(line => (
              <CtaLineWrap key={line}>
                <CtaLine className="footer-cta-line">{line}</CtaLine>
              </CtaLineWrap>
            ))}
          </CtaLines>
          <EmailWrap>
            <EmailLink
              ref={emailRef}
              href="mailto:hello@iffat.dev"
              data-hover
              onMouseMove={handleMagnet}
              onMouseLeave={handleMagnetLeave}
            >
              hello@iffat.dev
              <EmailArrow>&#8599;</EmailArrow>
            </EmailLink>
          </EmailWrap>
        </CtaBlock>

        <Divider />

        <BottomBar className="footer-bottom">
          <FooterLogo to="/" className="footer-fade">
            Iffat<LogoAccent>.</LogoAccent>
          </FooterLogo>

          <NavRow>
            {NAV_LINKS.map(({ label, path }) => (
              <FooterNavLink key={label} to={path} className="footer-fade">
                {label}
              </FooterNavLink>
            ))}
          </NavRow>

          <SocialRow>
            {SOCIALS.map(({ label, href }) => (
              <SocialLink
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-fade"
                data-hover
              >
                {label}
              </SocialLink>
            ))}
          </SocialRow>

          <Copyright className="footer-fade">
            &copy; 2024 Iffat Shaikh
          </Copyright>
        </BottomBar>
      </Inner>
    </Section>
  );
};

// ─── Styled ───────────────────────────────────────────────────────────────────

const Section = styled.footer`
  padding: 7rem 4vw 3rem;
  background: ${({ theme }) => theme.colors.bgElevated};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const Inner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const CtaBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CtaEyebrow = styled.span`
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const CtaLines = styled.div``;

const CtaLineWrap = styled.div`
  overflow: hidden;
  padding-bottom: 0.05em;
`;

const CtaLine = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(3rem, 9vw, 11rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.93;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

const EmailWrap = styled.div`
  margin-top: 0.5rem;
`;

const EmailLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.1rem, 2.2vw, 2.2rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  will-change: transform;
  transition: color 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const EmailArrow = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;

  ${EmailLink}:hover & {
    transform: translate(4px, -4px);
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const FooterLogo = styled(Link)`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
`;

const LogoAccent = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

const NavRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    display: none;
  }
`;

const FooterNavLink = styled(Link)`
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const SocialLink = styled.a`
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Copyright = styled.span`
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

export default Footer;
