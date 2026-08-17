import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';
import Tilt3D from '../components/Tilt3D';
import ThreeCanvas from '../three/ThreeCanvas';
import { networkScene } from '../three/scenes';
import { EXPERIENCE, EDUCATION, PROFILE } from '../data/profile';

gsap.registerPlugin(ScrollTrigger);

// ─── Page ────────────────────────────────────────────────────────────────────

const Experience = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.exp-hero-line',
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.07, duration: 1.2, ease: 'power4.out', delay: 0.15 },
      );
      gsap.fromTo('.exp-hero-fade',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.09, duration: 0.8, ease: 'power3.out', delay: 0.5 },
      );
      gsap.fromTo('.role-card',
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, stagger: 0.14, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.roles-list', start: 'top 82%' },
        },
      );
      gsap.fromTo('.role-divider',
        { scaleX: 0 },
        {
          scaleX: 1, stagger: 0.1, duration: 0.8, ease: 'power3.inOut',
          scrollTrigger: { trigger: '.roles-list', start: 'top 82%' },
        },
      );
      gsap.fromTo('.edu-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, stagger: 0.08, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.edu-section', start: 'top 85%' },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <Page ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <HeroSection>
        <HeroBg>
          <ThreeCanvas build={networkScene} camZ={8.2} fov={52} />
        </HeroBg>

        <HeroContent>
          <HeroLabel className="exp-hero-fade">Experience</HeroLabel>
          <HeroLines>
            {['WHERE', "I'VE BUILT."].map(w => (
              <LineWrap key={w}>
                <HeroTitle className="exp-hero-line">{w}</HeroTitle>
              </LineWrap>
            ))}
          </HeroLines>
          <HeroSub className="exp-hero-fade">
            Full stack engineering at KVAR Technologies — from intern shipping<br />
            first APIs to owning a manufacturing execution system in production.
          </HeroSub>
          <HeroPill className="exp-hero-fade">
            {PROFILE.experienceSince} — Present · {PROFILE.location}
          </HeroPill>
        </HeroContent>
      </HeroSection>

      {/* ── Roles ────────────────────────────────────────────────── */}
      <RolesSection>
        <RolesInner>
          <SectionHeader>
            <SectionLabel>Professional Experience</SectionLabel>
            <SectionCount>({EXPERIENCE.length.toString().padStart(2, '0')} Roles)</SectionCount>
          </SectionHeader>

          <RolesList className="roles-list">
            {EXPERIENCE.map(role => (
              <Tilt3D key={role.id} className="role-card" max={4} lift={16}>
                <RoleCard>
                  <RoleAside>
                    <RolePeriod>{role.period}</RolePeriod>
                    {role.current && (
                      <CurrentBadge>
                        <BadgeDot />
                        Current
                      </CurrentBadge>
                    )}
                    <RoleLocation>{role.location}</RoleLocation>
                  </RoleAside>

                  <RoleMain>
                    <RoleTitle>{role.role}</RoleTitle>
                    <RoleCompany>{role.company}</RoleCompany>
                    <RoleDivider className="role-divider" />
                    <RoleSummary>{role.summary}</RoleSummary>

                    <PointList>
                      {role.points.map(pt => (
                        <Point key={pt}>
                          <Bullet>—</Bullet>
                          {pt}
                        </Point>
                      ))}
                    </PointList>

                    <StackRow>
                      {role.stack.map(s => (
                        <StackTag key={s}>{s}</StackTag>
                      ))}
                    </StackRow>
                  </RoleMain>
                </RoleCard>
              </Tilt3D>
            ))}
          </RolesList>
        </RolesInner>
      </RolesSection>

      {/* ── Education ────────────────────────────────────────────── */}
      <EduSection className="edu-section">
        <EduInner>
          <EduLabel>Education</EduLabel>
          <EduList>
            {EDUCATION.map(e => (
              <EduItem key={e.school} className="edu-item">
                <EduPeriod>{e.period}</EduPeriod>
                <EduBody>
                  <EduDegree>{e.degree}</EduDegree>
                  <EduSchool>{e.school} — {e.location}</EduSchool>
                </EduBody>
              </EduItem>
            ))}
          </EduList>
        </EduInner>
      </EduSection>

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
  padding: 8rem 4vw 4rem;
  overflow: hidden;
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 820px;
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
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
  font-size: clamp(3.6rem, 10vw, 13rem);
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

const HeroPill = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSubtle};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  padding: 0.4rem 1rem;
  width: fit-content;
`;

const RolesSection = styled.section`
  padding: 7rem 4vw;
`;

const RolesInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const SectionHeader = styled.div`
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
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
`;

const SectionCount = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const RolesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const RoleCard = styled.article`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2.5rem;
  height: 100%;
  padding: 2.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(8px);
  transition: border-color 0.35s ease, background 0.35s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentLine};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.75rem;
  }
`;

const RoleAside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
`;

const RolePeriod = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.82rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accent};
`;

const CurrentBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.28rem 0.7rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const BadgeDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #22c55e;
  flex-shrink: 0;
  animation: rolePulse 2s ease-in-out infinite;

  @keyframes rolePulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%      { opacity: 0.4; transform: scale(0.75); }
  }
`;

const RoleLocation = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const RoleMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const RoleTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.4rem, 2.6vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  color: ${({ theme }) => theme.colors.text};
`;

const RoleCompany = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const RoleDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  transform-origin: left;
  margin: 0.5rem 0;
`;

const RoleSummary = styled.p`
  font-size: 0.97rem;
  font-weight: 300;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const PointList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-top: 0.5rem;
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
  padding-top: 0.9rem;
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
`;

const EduSection = styled.section`
  padding: 7rem 4vw;
  background: ${({ theme }) => theme.colors.bgSubtle};
`;

const EduInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const EduLabel = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.4rem, 3vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const EduList = styled.div`
  display: flex;
  flex-direction: column;
`;

const EduItem = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 2rem;
  align-items: baseline;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child { border-bottom: none; }

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const EduPeriod = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accent};
`;

const EduBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const EduDegree = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
`;

const EduSchool = styled.span`
  font-size: 0.92rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default Experience;
