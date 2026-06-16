import styled from 'styled-components';
import About  from '../components/About';
import Footer from '../components/Footer';

const SKILLS_DATA = [
  { cat: 'Frontend',   items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Styled Components'] },
  { cat: 'Animation',  items: ['GSAP', 'Framer Motion', 'Three.js', 'Lottie', 'CSS Animations']       },
  { cat: 'Design',     items: ['Figma', 'Adobe XD', 'Illustrator', 'Photoshop', 'Spline']             },
  { cat: 'Backend',    items: ['Node.js', 'Express', 'Prisma', 'PostgreSQL', 'REST APIs']             },
];

const Skills = () => (
  <main>
    <PageHero>
      <HeroInner>
        <Label>About &amp; Skills</Label>
        <Title>WHO<br />I AM.</Title>
      </HeroInner>
    </PageHero>
    <About />
    <SkillsSection>
      <SkillsInner>
        <SectionLabel>Technical Skills</SectionLabel>
        <SkillsGrid>
          {SKILLS_DATA.map(({ cat, items }) => (
            <SkillGroup key={cat}>
              <CatLabel>{cat}</CatLabel>
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
    <Footer />
  </main>
);

// ─── Styled ───────────────────────────────────────────────────────────────────

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

const Title = styled.h1`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(4rem, 11vw, 13rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.92;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
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
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;

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

const CatLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
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
  transition: color 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

export default Skills;
