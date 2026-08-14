import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import About  from '../components/About';
import Footer from '../components/Footer';
import { SKILLS, TECH_COUNT } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

const FOCUS = [
  {
    title: 'Real-Time Systems',
    desc:  'WebSockets and Socket.IO powering live production monitoring, alerts and escalation workflows.',
  },
  {
    title: 'API Security',
    desc:  'JWT authentication, RBAC, middleware authorization, CORS, CSP, rate limiting and input validation.',
  },
  {
    title: 'Database Performance',
    desc:  'PostgreSQL and TimescaleDB schema design, query tuning and indexing for high-frequency sensor data.',
  },
  {
    title: 'Cloud & Deployment',
    desc:  'Dockerised services on AWS EC2, with production monitoring and troubleshooting of live systems.',
  },
];

const Skills = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-hero-line',
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.07, duration: 1.2, ease: 'power4.out', delay: 0.15 },
      );
      gsap.fromTo('.skills-hero-fade',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.09, duration: 0.8, ease: 'power3.out', delay: 0.45 },
      );
      gsap.fromTo('.skill-group',
        { opacity: 0, y: 26 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.skills-grid', start: 'top 84%' },
        },
      );
      gsap.fromTo('.focus-card',
        { opacity: 0, y: 26 },
        {
          opacity: 1, y: 0, stagger: 0.09, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.focus-grid', start: 'top 84%' },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <Page ref={pageRef}>
      <PageHero>
        <HeroInner>
          <Label className="skills-hero-fade">Technical Skills</Label>
          <HeroLines>
            {['WHAT', 'I BUILD WITH.'].map(w => (
              <LineWrap key={w}>
                <Title className="skills-hero-line">{w}</Title>
              </LineWrap>
            ))}
          </HeroLines>
          <Sub className="skills-hero-fade">
            The stack behind production manufacturing and IoT systems —
            {' '}{TECH_COUNT} technologies, used in anger.
          </Sub>
        </HeroInner>
      </PageHero>

      <SkillsSection>
        <SkillsInner>
          <SectionLabel>The Stack</SectionLabel>
          <SkillsGrid className="skills-grid">
            {SKILLS.map(({ cat, items }) => (
              <SkillGroup key={cat} className="skill-group">
                <CatHead>
                  <CatLabel>{cat}</CatLabel>
                  <CatCount>{items.length.toString().padStart(2, '0')}</CatCount>
                </CatHead>
                <ItemList>
                  {items.map(item => (
                    <Item key={item}>{item}</Item>
                  ))}
                </ItemList>
              </SkillGroup>
            ))}
          </SkillsGrid>
        </SkillsInner>
      </SkillsSection>

      <FocusSection>
        <FocusInner>
          <SectionLabel>Focus Areas</SectionLabel>
          <FocusGrid className="focus-grid">
            {FOCUS.map(({ title, desc }, i) => (
              <FocusCard key={title} className="focus-card">
                <FocusNum>{(i + 1).toString().padStart(2, '0')}</FocusNum>
                <FocusTitle>{title}</FocusTitle>
                <FocusDesc>{desc}</FocusDesc>
              </FocusCard>
            ))}
          </FocusGrid>
        </FocusInner>
      </FocusSection>

      <About />
      <Footer />
    </Page>
  );
};

// ─── Styled ───────────────────────────────────────────────────────────────────

const Page = styled.main``;

const PageHero = styled.section`
  padding: 10rem 4vw 5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeroInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.span`
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

const Title = styled.h1`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(3.2rem, 9vw, 11rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.92;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

const Sub = styled.p`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 520px;
  margin-top: 0.5rem;
`;

const SkillsSection = styled.section`
  padding: 7rem 4vw;
`;

const SkillsInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const SectionLabel = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.4rem, 3vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SkillGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CatHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const CatLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const CatCount = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const ItemList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Item = styled.li`
  font-size: 0.95rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMuted};
  padding-left: 1rem;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  transition: color 0.2s ease, border-color 0.2s ease, padding-left 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.accent};
    padding-left: 1.35rem;
  }
`;

const FocusSection = styled.section`
  padding: 7rem 4vw;
  background: ${({ theme }) => theme.colors.bgSubtle};
`;

const FocusInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const FocusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    grid-template-columns: 1fr;
  }
`;

const FocusCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color 0.3s ease, background 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const FocusNum = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.accent};
`;

const FocusTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
`;

const FocusDesc = styled.p`
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default Skills;
