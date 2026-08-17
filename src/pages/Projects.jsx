import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import Tilt3D from '../components/Tilt3D';
import ThreeCanvas from '../three/ThreeCanvas';
import { projectScene } from '../three/scenes';
import { PROJECTS } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

const SHAPES = ['knot', 'octa', 'ico'];

const Projects = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proj-hero-line',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, ease: 'power4.out', delay: 0.15 },
      );
      gsap.fromTo('.proj-hero-fade',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.09, duration: 0.8, ease: 'power3.out', delay: 0.45 },
      );
      gsap.fromTo('.proj-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.12, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.proj-list', start: 'top 82%' },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <Page ref={pageRef}>
      <Hero>
        <HeroInner>
          <Label className="proj-hero-fade">All Projects</Label>
          <LineWrap>
            <Title className="proj-hero-line">WORK.</Title>
          </LineWrap>
          <Sub className="proj-hero-fade">
            Production systems built end to end — manufacturing execution,
            IoT telemetry and environmental monitoring.
          </Sub>
        </HeroInner>
      </Hero>

      <List className="proj-list">
        {PROJECTS.map((p, i) => (
          <Card key={p.slug} className="proj-card" $reverse={i % 2 === 1}>
            <Tilt3D max={7} lift={30}>
              <Visual $gradient={p.gradient} data-hover>
                <VisualGrid />
                <SceneLayer>
                  <ThreeCanvas build={projectScene(SHAPES[i % SHAPES.length])} />
                </SceneLayer>
                <VisualNum>{p.num}</VisualNum>
                <VisualTitle>{p.title}</VisualTitle>
              </Visual>
            </Tilt3D>

            <Body>
              <CardMetaRow>
                <CardCategory>{p.category}</CardCategory>
                <CardYear>{p.year}</CardYear>
              </CardMetaRow>

              <CardTitle>{p.fullTitle}</CardTitle>
              <CardSummary>{p.summary}</CardSummary>

              <PointList>
                {p.points.map(pt => (
                  <Point key={pt}>
                    <Bullet>—</Bullet>
                    {pt}
                  </Point>
                ))}
              </PointList>

              <StackRow>
                {p.stack.map(s => (
                  <StackTag key={s}>{s}</StackTag>
                ))}
              </StackRow>
            </Body>
          </Card>
        ))}
      </List>

      <Footer />
    </Page>
  );
};

// ─── Styled ───────────────────────────────────────────────────────────────────

const Page = styled.main``;

const Hero = styled.section`
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

const LineWrap = styled.div`
  overflow: hidden;
  padding-bottom: 0.05em;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(4rem, 11vw, 13rem);
  font-weight: 700;
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
`;

const List = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 4vw;
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const Card = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3.5rem;
  align-items: center;

  ${({ $reverse }) => $reverse && `
    direction: rtl;
    > * { direction: ltr; }
  `}

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-columns: 1fr;
    gap: 2rem;
    direction: ltr;
  }
`;

const VisualGrid = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
`;

const Visual = styled.div`
  position: relative;
  aspect-ratio: 4/3;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ $gradient }) => $gradient};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  cursor: none;
  box-shadow: ${({ theme }) => theme.colors.shadow};
  transition: box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    box-shadow: ${({ theme }) => theme.colors.shadowAccent};
  }
`;

const SceneLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
`;

const VisualNum = styled.span`
  position: absolute;
  top: 1.5rem;
  left: 1.75rem;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.6);
  z-index: 2;
`;

const VisualTitle = styled.span`
  position: absolute;
  bottom: 1.5rem;
  left: 1.75rem;
  right: 1.75rem;
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.6rem, 3.5vw, 2.8rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
  color: rgba(255,255,255,0.94);
  text-shadow: 0 2px 20px rgba(0,0,0,0.35);
  z-index: 2;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const CardMetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CardCategory = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const CardYear = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const CardTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.08;
  color: ${({ theme }) => theme.colors.text};
`;

const CardSummary = styled.p`
  font-size: 0.98rem;
  font-weight: 300;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const PointList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding-top: 0.35rem;
`;

const Point = styled.li`
  display: flex;
  gap: 0.75rem;
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Bullet = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  flex-shrink: 0;
`;

const StackRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  padding-top: 0.5rem;
`;

const StackTag = styled.span`
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  padding: 0.28rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.textSubtle};
  transition: border-color 0.2s ease, color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export default Projects;
