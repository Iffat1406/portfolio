import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutStats from '../components/About';
import Footer     from '../components/Footer';
import Tilt3D     from '../components/Tilt3D';
import ThreeCanvas from '../three/ThreeCanvas';
import { orbScene } from '../three/scenes';
import { TIMELINE, VALUES, PROFILE } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

// ─── Page ────────────────────────────────────────────────────────────────────

const About = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-hero-line',
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.07, duration: 1.2, ease: 'power4.out', delay: 0.15 },
      );
      gsap.fromTo('.about-hero-fade',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.5 },
      );
      gsap.fromTo('.tl-item',
        { opacity: 0, x: -28 },
        {
          opacity: 1, x: 0, stagger: 0.08, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.tl-section', start: 'top 78%' },
        },
      );
      gsap.fromTo('.val-card',
        { opacity: 0, y: 26 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.val-section', start: 'top 80%' },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <Page ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <HeroSection>
        <ThreeRight>
          <ThreeCanvas build={orbScene} camZ={6.4} fov={48} />
        </ThreeRight>

        <HeroContent>
          <HeroLabel className="about-hero-fade">About Me</HeroLabel>
          <HeroLines>
            {['THE HUMAN', 'BEHIND', 'THE CODE.'].map(w => (
              <LineWrap key={w}>
                <HeroTitle className="about-hero-line">{w}</HeroTitle>
              </LineWrap>
            ))}
          </HeroLines>
          <HeroSub className="about-hero-fade">
            Full stack developer, systems thinker and perpetual<br />
            learner based in {PROFILE.location}.
          </HeroSub>
        </HeroContent>
      </HeroSection>

      {/* ── Timeline ─────────────────────────────────────────────── */}
      <TlSection className="tl-section">
        <TlInner>
          <TlHeader>
            <TlLabel>Journey</TlLabel>
            <TlYears>{TIMELINE[0].year} — {TIMELINE[TIMELINE.length - 1].year}</TlYears>
          </TlHeader>
          <TlList>
            {TIMELINE.map(({ year, text }) => (
              <TlItem key={year} className="tl-item">
                <TlYear>{year}</TlYear>
                <TlBar />
                <TlText>{text}</TlText>
              </TlItem>
            ))}
          </TlList>
        </TlInner>
      </TlSection>

      {/* ── Values ───────────────────────────────────────────────── */}
      <ValSection className="val-section">
        <ValInner>
          <ValLabel>Core Values</ValLabel>
          <ValGrid>
            {VALUES.map(({ icon, title, desc }) => (
              <Tilt3D key={title} className="val-card" max={8} lift={24}>
                <ValCard>
                  <ValIcon>{icon}</ValIcon>
                  <ValTitle>{title}</ValTitle>
                  <ValDesc>{desc}</ValDesc>
                </ValCard>
              </Tilt3D>
            ))}
          </ValGrid>
        </ValInner>
      </ValSection>

      <AboutStats />
      <Footer />
    </Page>
  );
};

// ─── Styled ───────────────────────────────────────────────────────────────────

const Page = styled.main``;

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 8rem 4vw 4rem;
`;

const ThreeRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 52%;
  height: 100%;
  pointer-events: none;
  z-index: 0;

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    width: 100%;
    opacity: 0.35;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeroLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const HeroLines = styled.div``;

const LineWrap = styled.div`
  overflow: hidden;
  padding-bottom: 0.05em;
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(3.5rem, 9vw, 12rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.92;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

const HeroSub = styled.p`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const TlSection = styled.section`
  padding: 7rem 4vw;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const TlInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const TlHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TlLabel = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.4rem, 3vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
`;

const TlYears = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const TlList = styled.div`
  display: flex;
  flex-direction: column;
`;

const TlItem = styled.div`
  display: grid;
  grid-template-columns: 4.5rem 1px 1fr;
  align-items: start;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child { border-bottom: none; }
`;

const TlYear = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accent};
  padding-top: 0.1rem;
`;

const TlBar = styled.div`
  width: 1px;
  height: 100%;
  background: ${({ theme }) => theme.colors.border};
`;

const TlText = styled.p`
  font-size: 0.97rem;
  font-weight: 300;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ValSection = styled.section`
  padding: 7rem 4vw;
  background: ${({ theme }) => theme.colors.bgSubtle};
`;

const ValInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ValLabel = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.4rem, 3vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ValGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ValCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  padding: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(8px);
  transition: border-color 0.3s ease, background 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentLine};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const ValIcon = styled.span`
  font-size: 1.6rem;
  line-height: 1;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const ValTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
`;

const ValDesc = styled.p`
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default About;
