import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: 5,  suffix: '+', label: 'Years Experience'   },
  { num: 40, suffix: '+', label: 'Projects Delivered' },
  { num: 15, suffix: '+', label: 'Happy Clients'      },
];

const SKILLS = ['React', 'TypeScript', 'Next.js', 'GSAP', 'Three.js', 'Figma', 'Node.js', 'Tailwind'];

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
            Crafting interfaces<br />that feel <Italic>alive</Italic>.
          </Headline>
          <Bio className="about-item">
            I&apos;m Iffat Shaikh, a creative developer and designer based in India.
            I specialise in building high-performance, visually rich web experiences
            that merge clean engineering with expressive design — from smooth
            micro-interactions to immersive WebGL scenes.
          </Bio>
          <SkillGrid className="about-item">
            {SKILLS.map(s => (
              <SkillPill key={s}>{s}</SkillPill>
            ))}
          </SkillGrid>
          <CtaRow className="about-item">
            <CtaLink href="mailto:hello@iffat.dev" data-hover>
              hello@iffat.dev <Arrow>&#8599;</Arrow>
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
  font-weight: 800;
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

const CtaRow = styled.div``;

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.75rem 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color 0.3s ease, background 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderHover};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const StatNum = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(2.8rem, 5vw, 4.5rem);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text};
`;

const StatLabel = styled.span`
  font-size: 0.82rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: right;
`;

export default About;
