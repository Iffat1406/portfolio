import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import CertificatesSection from '../components/Certificates';
import Footer from '../components/Footer';
import { CERTIFICATES } from '../data/profile';

const Certificates = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cert-hero-line',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, ease: 'power4.out', delay: 0.15 },
      );
      gsap.fromTo('.cert-hero-fade',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.09, duration: 0.8, ease: 'power3.out', delay: 0.45 },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <Page ref={pageRef}>
      <Hero>
        <HeroInner>
          <Label className="cert-hero-fade">Credentials</Label>
          <LineWrap>
            <Title className="cert-hero-line">CERTIFICATES.</Title>
          </LineWrap>
          <Sub className="cert-hero-fade">
            Programs, courses and competitions I have taken part in —
            {' '}{CERTIFICATES.length} certificate
            {CERTIFICATES.length === 1 ? '' : 's'} so far. Click any card to read the full document.
          </Sub>
        </HeroInner>
      </Hero>

      <CertificatesSection />

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
  font-size: clamp(2.6rem, 9vw, 11rem);
  font-weight: 700;
  letter-spacing: -0.008em;
  line-height: 0.92;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`;

const Sub = styled.p`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  max-width: 560px;
  margin-top: 0.5rem;
`;

export default Certificates;
