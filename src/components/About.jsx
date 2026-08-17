import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { PROFILE, STATS, SKILL_PILLS as SKILLS } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const statRefs   = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left-column text reveal
      gsap.fromTo('.about-item',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          stagger: 0.09,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        },
      );

      // Stat counter + label reveal
      statRefs.current.forEach((el, i) => {
        if (!el) return;
        const { num, suffix } = STATS[i];
        const obj = { val: 0 };
        gsap.to(obj, {
          val: num,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      });

      gsap.fromTo('.stat-box',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef}>
      <Inner>
        <Left>
          <SmallTag className="about-item">About Me</SmallTag>
          <Headline className="about-item">
            Systems that run<br />when it <Italic>matters</Italic>.
          </Headline>
          <Bio className="about-item">{PROFILE.bio}</Bio>
          <SkillGrid className="about-item">
            {SKILLS.map(s => (
              <SkillPill key={s}>{s}</SkillPill>
            ))}
          </SkillGrid>
          <CtaRow className="about-item">
            <CtaLink href={`mailto:${PROFILE.email}`} data-hover>
              {PROFILE.email} <Arrow>&#8599;</Arrow>
            </CtaLink>
            <CtaLink href={`tel:${PROFILE.phoneRaw}`} data-hover>
              {PROFILE.phone} <Arrow>&#8599;</Arrow>
            </CtaLink>
          </CtaRow>
        </Left>

        <Right>
          {STATS.map((s, i) => (
            <StatBox key={s.label} className="stat-box">
              <StatNum ref={el => { statRefs.current[i] = el; }}>0+</StatNum>
              <StatLabel>{s.label}</StatLabel>
            </StatBox>
          ))}
        </Right>
      </Inner>
    </Section>
  );
};

// ─── Styled ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  padding: 7rem 4vw;
  background: ${({ theme }) => theme.colors.bgSubtle};
`;

const Inner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const SmallTag = styled.span`
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const Headline = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.9rem, 4vw, 3.4rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.text};
`;

const Italic = styled.em`
  font-style: italic;
  color: ${({ theme }) => theme.colors.accent};
`;

const Bio = styled.p`
  font-size: 0.97rem;
  font-weight: 300;
  line-height: 1.78;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 480px;
`;

const SkillGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
`;

const SkillPill = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const CtaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem 2rem;
`;

const CtaLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 0.2rem;
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Arrow = styled.span``;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const StatBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.9rem 2.1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(8px);
  overflow: hidden;
  transition: border-color 0.3s ease, background 0.3s ease, transform 0.4s ${({ theme }) => theme.ease.out};

  &::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: ${({ theme }) => theme.colors.gradient};
    transform: scaleY(0);
    transform-origin: bottom;
    transition: transform 0.45s ${({ theme }) => theme.ease.out};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    background: ${({ theme }) => theme.colors.surfaceHover};
    transform: translateX(6px);
  }

  &:hover::before { transform: scaleY(1); }
`;

const StatNum = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(2.6rem, 4.6vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const StatLabel = styled.span`
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: right;
`;

export default About;
