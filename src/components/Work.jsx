import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/profile';
import Tilt3D from './Tilt3D';

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef(null);

  // Scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.work-header-inner > *',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          stagger: 0.08,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.work-header-inner', start: 'top 85%' },
        },
      );
      gsap.fromTo('.work-card',
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.work-cards', start: 'top 82%' },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section ref={sectionRef}>
      <Inner>
        <SectionHeader>
          <HeaderInner className="work-header-inner">
            <SectionLabel>Selected Work</SectionLabel>
            <SectionCount>({PROJECTS.length.toString().padStart(2, '0')} Systems in Production)</SectionCount>
          </HeaderInner>
        </SectionHeader>

        {/* Cards sit side by side — one row on desktop, two up on tablet,
            stacked only on phones. */}
        <Cards className="work-cards">
          {PROJECTS.map((p) => (
            <Tilt3D key={p.id} className="work-card" max={7} lift={24}>
              <Card to="/projects" data-hover>
                <Visual $gradient={p.gradient}>
                  <VisualGrid />
                  <VisualNum>{p.num}</VisualNum>
                  <VisualTitle>{p.title}</VisualTitle>
                </Visual>

                <Body>
                  <MetaRow>
                    <CardCategory>{p.category}</CardCategory>
                    <CardYear>{p.yearShort}</CardYear>
                  </MetaRow>

                  <CardSummary>{p.summary}</CardSummary>

                  <TagRow>
                    {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
                  </TagRow>

                  <CardLink>
                    Case study <CardArrow>&#8599;</CardArrow>
                  </CardLink>
                </Body>
              </Card>
            </Tilt3D>
          ))}
        </Cards>

        <ViewAll to="/projects" data-hover>
          View all projects <Arrow>&#8599;</Arrow>
        </ViewAll>
      </Inner>
    </Section>
  );
};

// ─── Styled ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  padding: 7rem 4vw 7rem;
  position: relative;
`;

const Inner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  margin-bottom: 3rem;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SectionLabel = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.4rem, 3vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.005em;
  color: ${({ theme }) => theme.colors.text};
`;

const SectionCount = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bgElevated};
  text-decoration: none;
  cursor: none;
  transition: border-color 0.3s ease, box-shadow 0.4s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentLine};
    box-shadow: ${({ theme }) => theme.colors.shadow};
  }
`;

const Visual = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  background: ${({ $gradient }) => $gradient};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
`;

const VisualGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(${({ theme }) => theme.colors.gridLine} 1px, transparent 1px),
    linear-gradient(90deg, ${({ theme }) => theme.colors.gridLine} 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
`;

const VisualNum = styled.span`
  position: absolute;
  top: 1.25rem;
  left: 1.4rem;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  color: ${({ theme }) => theme.colors.onGradientMuted};
`;

const VisualTitle = styled.span`
  position: absolute;
  bottom: 1.25rem;
  left: 1.4rem;
  right: 1.4rem;
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.3rem, 2.2vw, 1.9rem);
  font-weight: 700;
  letter-spacing: -0.008em;
  line-height: 1;
  color: ${({ theme }) => theme.colors.onGradient};
  text-shadow: 0 2px 20px rgba(255,255,255,0.35);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  flex: 1;
  padding: 1.6rem 1.6rem 1.7rem;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
`;

const CardCategory = styled.span`
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const CardYear = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const CardSummary = styled.p`
  font-size: 0.88rem;
  font-weight: 300;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: auto;
  padding-top: 0.9rem;
`;

const Tag = styled.span`
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  padding: 0.22rem 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const CardArrow = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;
`;

const CardLink = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding-top: 0.9rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSubtle};
  transition: color 0.25s ease;

  ${Card}:hover & {
    color: ${({ theme }) => theme.colors.accent};
  }

  ${Card}:hover & ${CardArrow} {
    transform: translate(3px, -3px);
  }
`;

const ViewAll = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 2.5rem;
  padding-bottom: 0.3rem;
  width: fit-content;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: color 0.25s ease, border-color 0.25s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const Arrow = styled.span`
  display: inline-block;
  transition: transform 0.3s ease;

  ${ViewAll}:hover & {
    transform: translate(3px, -3px);
  }
`;

export default Work;
