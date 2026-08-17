import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroCanvas from './HeroCanvas';
import { PROFILE, CORE_STACK } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = ['FULL STACK', 'DEVELOPER.'];
const TAGS     = CORE_STACK;

const Hero = ({ ready }) => {
  const sectionRef = useRef(null);

  // Set initial GSAP states immediately so nothing flashes before preloader
  useEffect(() => {
    gsap.set('.hero-line',    { yPercent: 115 });
    gsap.set('.hero-fade',    { opacity: 0, y: 18 });
    gsap.set('.hero-line-hr', { scaleX: 0 });
  }, []);

  // Main entry — fires once preloader signals ready
  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.to('.hero-line', {
          yPercent: 0,
          stagger: 0.065,
          duration: 1.2,
        })
        .to('.hero-fade', {
          opacity: 1,
          y: 0,
          stagger: 0.07,
          duration: 0.85,
          ease: 'power3.out',
        }, '-=0.9')
        .to('.hero-line-hr', {
          scaleX: 1,
          duration: 1.0,
          ease: 'power3.inOut',
        }, '-=0.85');
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  // Parallax on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-heading', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef}>
      <GridBg />
      <Glow />
      <HeroCanvas />

      <Inner>
        <TopRow>
          <Badge className="hero-fade">
            <BadgePulse />
            Available for work
          </Badge>
          <IndexNum className="hero-fade">Software Engineer @ KVAR Technologies</IndexNum>
        </TopRow>

        <HeadingArea className="hero-heading">
          {HEADLINE.map((word, i) => (
            <LineWrap key={word}>
              <Heading className="hero-line" $gradient={i === 1}>{word}</Heading>
            </LineWrap>
          ))}
        </HeadingArea>

        <BottomRow>
          <DescBlock>
            <Desc className="hero-fade">
              I build real-time manufacturing &amp; IoT<br />
              systems that run in production.
            </Desc>
            <TagRow>
              {TAGS.map((t) => (
                <Tag key={t} className="hero-fade">{t}</Tag>
              ))}
            </TagRow>
          </DescBlock>

          <MetaBlock>
            <MetaItem className="hero-fade">Based in {PROFILE.location}</MetaItem>
            <MetaItem className="hero-fade">{PROFILE.name}</MetaItem>
            <MetaEmail className="hero-fade" href={`mailto:${PROFILE.email}`} data-hover>
              {PROFILE.email}
            </MetaEmail>
          </MetaBlock>
        </BottomRow>

        <Divider className="hero-line-hr" />

        <ScrollHint className="hero-fade">
          <ScrollLabel>Scroll to explore</ScrollLabel>
          <ScrollArrow>&#8595;</ScrollArrow>
        </ScrollHint>
      </Inner>
    </Section>
  );
};

// ─── Styled ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem 4vw 4rem;
  overflow: hidden;
`;

const GridBg = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(${({ theme }) => theme.colors.border} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.border} 1px, transparent 1px);
  background-size: 96px 96px;
  opacity: 0.55;
  mask-image: radial-gradient(ellipse 90% 70% at 50% 45%, #000 15%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 45%, #000 15%, transparent 80%);
  pointer-events: none;
`;

const Glow = styled.div`
  position: absolute;
  top: -18%;
  right: -10%;
  width: 62vw;
  height: 62vw;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.glow};
  filter: blur(50px);
  pointer-events: none;
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.25rem;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  background: ${({ theme }) => theme.colors.surface};
`;

const BadgePulse = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
  animation: heroPulse 2s ease-in-out infinite;

  @keyframes heroPulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(0.75); }
  }
`;

const IndexNum = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const HeadingArea = styled.div``;

const LineWrap = styled.div`
  overflow: hidden;
  padding-bottom: 0.06em;
`;

const Heading = styled.h1`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(3.2rem, 10.5vw, 12.5rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.94;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  will-change: transform;

  ${({ $gradient, theme }) => $gradient && `
    background: ${theme.colors.gradient};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  `}
`;

const BottomRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const DescBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const Desc = styled.p`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 360px;
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const Tag = styled.span`
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  padding: 0.32rem 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textMuted};
  backdrop-filter: blur(6px);
  transition: border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentLine};
    color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

const MetaBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    align-items: flex-start;
  }
`;

const MetaItem = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const MetaEmail = styled.a`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  transition: color 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  transform-origin: left;
`;

const ScrollHint = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const ScrollLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const ScrollArrow = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSubtle};
  animation: scrollBob 1.6s ease-in-out infinite;

  @keyframes scrollBob {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(5px); }
  }
`;

export default Hero;
