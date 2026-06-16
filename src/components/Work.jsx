import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    num: '01',
    title: 'LUMIÈRE',
    category: 'E-Commerce',
    tags: ['React', 'GSAP', 'Shopify'],
    year: '2024',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    id: 2,
    num: '02',
    title: 'VERSE',
    category: 'Music Platform',
    tags: ['Next.js', 'WebGL', 'Three.js'],
    year: '2024',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #2d0066 50%, #4a00a0 100%)',
  },
  {
    id: 3,
    num: '03',
    title: 'ATLAS',
    category: 'Travel & Maps',
    tags: ['React', 'Mapbox', 'Node.js'],
    year: '2023',
    gradient: 'linear-gradient(135deg, #0d2b1d 0%, #1a4a2e 50%, #2d7a4f 100%)',
  },
  {
    id: 4,
    num: '04',
    title: 'NOIR',
    category: 'Photography',
    tags: ['Next.js', 'Framer Motion', 'Prismic'],
    year: '2023',
    gradient: 'linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 50%, #444 100%)',
  },
];

const Work = () => {
  const [hovered, setHovered] = useState(null);
  const sectionRef  = useRef(null);
  const imgWrapRef  = useRef(null);
  const isLeaving   = useRef(false);

  // Floating image follows cursor
  const onMouseMove = (e) => {
    gsap.to(imgWrapRef.current, {
      x: e.clientX + 28,
      y: e.clientY - 160,
      duration: 0.45,
      ease: 'power2.out',
    });
  };

  const onEnter = (id) => {
    isLeaving.current = false;
    setHovered(id);
    gsap.fromTo(imgWrapRef.current,
      { opacity: 0, scale: 0.85, rotate: -3 },
      { opacity: 1, scale: 1, rotate: 0, duration: 0.4, ease: 'power2.out' },
    );
  };

  const onLeave = () => {
    isLeaving.current = true;
    gsap.to(imgWrapRef.current, {
      opacity: 0,
      scale: 0.88,
      rotate: 2,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        if (isLeaving.current) setHovered(null);
      },
    });
  };

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
      gsap.fromTo('.work-row',
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          stagger: 0.07,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.work-rows', start: 'top 80%' },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeProject = PROJECTS.find(p => p.id === hovered);

  return (
    <Section ref={sectionRef} onMouseMove={onMouseMove}>
      <Inner>
        <SectionHeader>
          <HeaderInner className="work-header-inner">
            <SectionLabel>Selected Work</SectionLabel>
            <SectionCount>({PROJECTS.length.toString().padStart(2, '0')} Projects)</SectionCount>
          </HeaderInner>
        </SectionHeader>

        <Rows className="work-rows">
          {PROJECTS.map((p) => (
            <Row
              key={p.id}
              className="work-row"
              onMouseEnter={() => onEnter(p.id)}
              onMouseLeave={onLeave}
              $active={hovered === p.id}
            >
              <RowNum>{p.num}</RowNum>
              <RowTitle $active={hovered === p.id}>{p.title}</RowTitle>
              <RowCategory>{p.category}</RowCategory>
              <RowTags>
                {p.tags.map(t => <RowTag key={t}>{t}</RowTag>)}
              </RowTags>
              <RowYear>{p.year}</RowYear>
              <RowArrow $visible={hovered === p.id}>&#8599;</RowArrow>
            </Row>
          ))}
        </Rows>
      </Inner>

      {/* Floating hover image */}
      <FloatingImg ref={imgWrapRef} style={{ opacity: 0 }}>
        {activeProject && <ImgGrad $gradient={activeProject.gradient} />}
        {activeProject && <ImgLabel>{activeProject.title}</ImgLabel>}
      </FloatingImg>
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
  margin-bottom: 2.5rem;
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
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
`;

const SectionCount = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 3rem 1fr auto auto 4rem 2.5rem;
  align-items: center;
  gap: 1.25rem;
  padding: 1.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: none;
  transition:
    background 0.3s ease,
    padding-left 0.35s cubic-bezier(0.16,1,0.3,1);

  ${({ $active, theme }) => $active && `
    background: ${theme.colors.surface};
    padding-left: 2rem;
  `}

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: 2.5rem 1fr auto 2.5rem;
  }
`;

const RowNum = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const RowTitle = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.25rem, 2.5vw, 2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme, $active }) => $active ? theme.colors.accent : theme.colors.text};
  transition: color 0.3s ease;
`;

const RowCategory = styled.span`
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textMuted};

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    display: none;
  }
`;

const RowTags = styled.div`
  display: flex;
  gap: 0.4rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    display: none;
  }
`;

const RowTag = styled.span`
  font-size: 0.65rem;
  font-weight: 500;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  padding: 0.22rem 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const RowYear = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: right;

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    display: none;
  }
`;

const RowArrow = styled.span`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.accent};
  opacity: ${({ $visible }) => $visible ? 1 : 0};
  transform: ${({ $visible }) => $visible ? 'translate(0,0)' : 'translate(-6px,6px)'};
  transition: opacity 0.25s ease, transform 0.25s ease;
`;

const FloatingImg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 280px;
  height: 210px;
  border-radius: 10px;
  overflow: hidden;
  pointer-events: none;
  z-index: 50;
  will-change: transform;
`;

const ImgGrad = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ $gradient }) => $gradient};
`;

const ImgLabel = styled.span`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: rgba(255,255,255,0.7);
`;

export default Work;
