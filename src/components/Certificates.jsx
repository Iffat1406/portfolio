import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Link } from 'react-router-dom';
import { CERTIFICATES } from '../data/profile';
import Tilt3D from './Tilt3D';

gsap.registerPlugin(ScrollTrigger);

/**
 * Certificates grid — cards sit side by side and open a full-size lightbox
 * on click. `limit` trims the list for the homepage teaser; the /certificates
 * page renders the whole set.
 */
const Certificates = ({ limit, showViewAll = false }) => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(null);

  const list = limit ? CERTIFICATES.slice(0, limit) : CERTIFICATES;

  // Scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cert-header-inner > *',
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0,
          stagger: 0.08,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cert-header-inner', start: 'top 85%' },
        },
      );
      gsap.fromTo('.cert-card',
        { opacity: 0, y: 34 },
        {
          opacity: 1, y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.cert-grid', start: 'top 84%' },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [list.length]);

  // Esc closes the lightbox; page scroll is locked while it is open
  useEffect(() => {
    if (!active) return;

    const onKey = (e) => { if (e.key === 'Escape') setActive(null); };
    const prevOverflow = document.body.style.overflow;

    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  return (
    <Section ref={sectionRef} id="certificates">
      <Inner>
        <SectionHeader>
          <HeaderInner className="cert-header-inner">
            <SectionLabel>Certificates</SectionLabel>
            <SectionCount>
              ({CERTIFICATES.length.toString().padStart(2, '0')} Earned)
            </SectionCount>
          </HeaderInner>
        </SectionHeader>

        <Grid className="cert-grid">
          {list.map((c) => (
            <Tilt3D key={c.id} className="cert-card" max={7} lift={24}>
              <Card
                type="button"
                data-hover
                onClick={() => setActive(c)}
                aria-label={'View the ' + c.title + ' certificate'}
              >
                <Preview>
                  <PreviewImg src={c.image} alt={c.title + ' certificate'} loading="lazy" />
                  <PreviewVeil />
                  <Zoom>View &#8599;</Zoom>
                </Preview>

                <Body>
                  <MetaRow>
                    <CardType>{c.type}</CardType>
                    <CardYear>{c.year}</CardYear>
                  </MetaRow>

                  <CardTitle>{c.title}</CardTitle>
                  <CardIssuer>{c.issuer}</CardIssuer>
                  {c.credential && <Credential>{c.credential}</Credential>}
                  <CardSummary>{c.summary}</CardSummary>

                  {c.skills?.length > 0 && (
                    <TagRow>
                      {c.skills.map(s => <Tag key={s}>{s}</Tag>)}
                    </TagRow>
                  )}
                </Body>
              </Card>
            </Tilt3D>
          ))}
        </Grid>

        {showViewAll && CERTIFICATES.length > list.length && (
          <ViewAll to="/certificates" data-hover>
            View all certificates <Arrow>&#8599;</Arrow>
          </ViewAll>
        )}
      </Inner>

      {active && (
        <Lightbox onClick={() => setActive(null)}>
          <LightboxClose type="button" data-hover aria-label="Close">&#10005;</LightboxClose>
          <LightboxFrame onClick={e => e.stopPropagation()}>
            <FullImg src={active.image} alt={active.title + ' certificate'} />
            <LightboxCaption>
              <LightboxTitle>{active.title}</LightboxTitle>
              <LightboxMeta>{active.issuer} &middot; {active.year}</LightboxMeta>
            </LightboxCaption>
          </LightboxFrame>
        </Lightbox>
      )}
    </Section>
  );
};

// ─── Styled ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  padding: 7rem 4vw;
  position: relative;
  background: ${({ theme }) => theme.colors.bgSubtle};
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

const Grid = styled.div`
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

const Card = styled.button`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: left;
  padding: 0;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.bgElevated};
  transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentLine};
    box-shadow: ${({ theme }) => theme.colors.shadow};
  }
`;

const Preview = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1.414 / 1;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.bgHover};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PreviewImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.6s ${({ theme }) => theme.ease.out};

  ${Card}:hover & {
    transform: scale(1.045);
  }
`;

const PreviewVeil = styled.span`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.accentSoft};
  opacity: 0;
  transition: opacity 0.3s ease;

  ${Card}:hover & { opacity: 1; }
`;

const Zoom = styled.span`
  position: absolute;
  right: 0.9rem;
  bottom: 0.9rem;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accentText};
  background: ${({ theme }) => theme.colors.gradient};
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  ${Card}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  flex: 1;
  padding: 1.6rem 1.6rem 1.8rem;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
`;

const CardType = styled.span`
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

const CardTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: -0.005em;
  color: ${({ theme }) => theme.colors.text};
`;

const CardIssuer = styled.span`
  font-size: 0.85rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Credential = styled.span`
  width: fit-content;
  padding: 0.25rem 0.7rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.accentLine};
  background: ${({ theme }) => theme.colors.accentSoft};
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.accent};
`;

const CardSummary = styled.p`
  font-size: 0.86rem;
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

const Lightbox = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4vw;
  background: ${({ theme }) => theme.colors.overlay};
  backdrop-filter: blur(18px) saturate(150%);
  -webkit-backdrop-filter: blur(18px) saturate(150%);
  animation: certFade 0.3s ease;

  @keyframes certFade {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

const LightboxFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 1100px;
  width: 100%;
  animation: certRise 0.45s ${({ theme }) => theme.ease.out};

  @keyframes certRise {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

const FullImg = styled.img`
  width: 100%;
  max-height: 76vh;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.colors.shadow};
`;

const LightboxCaption = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: center;
`;

const LightboxTitle = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const LightboxMeta = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const LightboxClose = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 4vw;
  font-size: 1.3rem;
  line-height: 1;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.25s ease;

  &:hover { color: ${({ theme }) => theme.colors.accent}; }
`;

export default Certificates;
