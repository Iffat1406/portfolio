import styled from 'styled-components';
import Footer from '../components/Footer';

const PROJECTS = [
  { num: '01', title: 'LUMIÈRE',  category: 'E-Commerce',    year: '2024', gradient: 'linear-gradient(135deg,#1a1a2e,#0f3460)' },
  { num: '02', title: 'VERSE',    category: 'Music Platform', year: '2024', gradient: 'linear-gradient(135deg,#1a0533,#4a00a0)' },
  { num: '03', title: 'ATLAS',    category: 'Travel & Maps',  year: '2023', gradient: 'linear-gradient(135deg,#0d2b1d,#2d7a4f)' },
  { num: '04', title: 'NOIR',     category: 'Photography',    year: '2023', gradient: 'linear-gradient(135deg,#1c1c1c,#444)' },
  { num: '05', title: 'SOLSTICE', category: 'Brand Identity', year: '2023', gradient: 'linear-gradient(135deg,#2d1800,#a05000)' },
  { num: '06', title: 'AETHER',   category: 'SaaS Dashboard', year: '2022', gradient: 'linear-gradient(135deg,#001a2d,#005080)' },
];

const Projects = () => (
  <main>
    <Hero>
      <HeroInner>
        <Label>All Projects</Label>
        <Title>WORK.</Title>
      </HeroInner>
    </Hero>
    <Grid>
      {PROJECTS.map(p => (
        <Card key={p.num} data-hover>
          <CardImg $gradient={p.gradient} />
          <CardBody>
            <CardNum>{p.num}</CardNum>
            <CardTitle>{p.title}</CardTitle>
            <CardMeta>{p.category} &mdash; {p.year}</CardMeta>
          </CardBody>
        </Card>
      ))}
    </Grid>
    <Footer />
  </main>
);

// ─── Styled ───────────────────────────────────────────────────────────────────

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

const Title = styled.h1`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(4rem, 11vw, 13rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.92;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

const Grid = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 5rem 4vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  cursor: none;

  &:hover > div:first-child {
    transform: scale(1.03);
  }
`;

const CardImg = styled.div`
  width: 100%;
  aspect-ratio: 4/3;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ $gradient }) => $gradient};
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0.25rem 0;
`;

const CardNum = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.3rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
`;

const CardMeta = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default Projects;
