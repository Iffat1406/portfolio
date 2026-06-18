import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AboutStats from '../components/About';
import Footer     from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

// ─── Vanilla Three.js orb ────────────────────────────────────────────────────

const OrbCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 100);
    camera.position.z = 5.5;

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const pt1 = new THREE.PointLight(0xff4d00, 2.5, 20);
    pt1.position.set(4, 6, 4);
    scene.add(pt1);
    const pt2 = new THREE.PointLight(0xffffff, 0.6, 20);
    pt2.position.set(-5, -5, -4);
    scene.add(pt2);

    // Morphing orb — sphere with per-frame vertex displacement
    const orbGeo = new THREE.SphereGeometry(2, 48, 48);
    const origPos = orbGeo.attributes.position.array.slice(); // snapshot
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0xff4d00, roughness: 0.05, metalness: 0.9,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    scene.add(orb);

    // Orbital particles
    const COUNT = 80;
    const pPos  = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.random() * Math.PI;
      const r     = 2.8 + Math.random() * 1.5;
      pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0xff4d00, size: 0.04, transparent: true, opacity: 0.6 }),
    );
    scene.add(particles);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const posAttr = orbGeo.attributes.position;
    let raf;
    const t0 = performance.now();

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = (performance.now() - t0) * 0.001;

      // Vertex displacement
      for (let i = 0; i < posAttr.count; i++) {
        const ox = origPos[i * 3];
        const oy = origPos[i * 3 + 1];
        const oz = origPos[i * 3 + 2];
        const noise =
          Math.sin(ox * 3 + t) *
          Math.cos(oy * 3 + t * 0.7) *
          Math.sin(oz * 2 + t * 1.3) * 0.35;
        posAttr.setXYZ(i, ox * (1 + noise), oy * (1 + noise), oz * (1 + noise));
      }
      posAttr.needsUpdate = true;
      orbGeo.computeVertexNormals();

      orb.rotation.x = t * 0.08;
      orb.rotation.y = t * 0.12;
      particles.rotation.y = t * 0.09;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      orbGeo.dispose();
      orbMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <OrbMount ref={mountRef} />;
};

const OrbMount = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

// ─── Page data ────────────────────────────────────────────────────────────────

const TIMELINE = [
  { year: '2019', text: 'Started building UIs with React and vanilla CSS. Fell in love with the creative side of the web.' },
  { year: '2020', text: 'Specialised in GSAP animation. First paid project — an interactive landing page for a music label.' },
  { year: '2021', text: 'First major client: built an interactive brand experience reaching 100k+ monthly visitors.' },
  { year: '2022', text: 'Deep-dived into WebGL and Three.js. Started blending visual design with creative engineering.' },
  { year: '2023', text: 'Led front-end for a seed-stage startup from design system to production in 12 weeks.' },
  { year: '2024', text: 'Open for new collaborations — building the next ambitious digital experience.' },
];

const VALUES = [
  { icon: '◈', title: 'Obsessive Detail', desc: 'Every pixel, every transition, every micro-interaction. Perfection is the baseline, not the goal.' },
  { icon: '◎', title: 'Performance First', desc: 'Beautiful code is also fast code. Lighthouse 95+ isn\'t a nice-to-have — it\'s a requirement.' },
  { icon: '◇', title: 'Human-Centred', desc: 'Technology in service of people. The best interface is the one nobody consciously notices.' },
];

// ─── Page ────────────────────────────────────────────────────────────────────

const About = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-hero-line',
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.07, duration: 1.2, ease: 'power4.out', delay: 0.15 },
      );
      gsap.fromTo('.about-hero-fade',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.5 },
      );
      gsap.fromTo('.tl-item',
        { opacity: 0, x: -28 },
        {
          opacity: 1, x: 0, stagger: 0.08, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.tl-section', start: 'top 78%' },
        },
      );
      gsap.fromTo('.val-card',
        { opacity: 0, y: 26 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: '.val-section', start: 'top 80%' },
        },
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <Page ref={pageRef}>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <HeroSection>
        <ThreeRight>
          <OrbCanvas />
        </ThreeRight>

        <HeroContent>
          <HeroLabel className="about-hero-fade">About Me</HeroLabel>
          <HeroLines>
            {['THE HUMAN', 'BEHIND', 'THE CODE.'].map(w => (
              <LineWrap key={w}>
                <HeroTitle className="about-hero-line">{w}</HeroTitle>
              </LineWrap>
            ))}
          </HeroLines>
          <HeroSub className="about-hero-fade">
            Creative developer, design enthusiast,<br />and perpetual learner based in India.
          </HeroSub>
        </HeroContent>
      </HeroSection>

      {/* ── Timeline ─────────────────────────────────────────────── */}
      <TlSection className="tl-section">
        <TlInner>
          <TlHeader>
            <TlLabel>Journey</TlLabel>
            <TlYears>2019 — 2024</TlYears>
          </TlHeader>
          <TlList>
            {TIMELINE.map(({ year, text }) => (
              <TlItem key={year} className="tl-item">
                <TlYear>{year}</TlYear>
                <TlBar />
                <TlText>{text}</TlText>
              </TlItem>
            ))}
          </TlList>
        </TlInner>
      </TlSection>

      {/* ── Values ───────────────────────────────────────────────── */}
      <ValSection className="val-section">
        <ValInner>
          <ValLabel>Core Values</ValLabel>
          <ValGrid>
            {VALUES.map(({ icon, title, desc }) => (
              <ValCard key={title} className="val-card">
                <ValIcon>{icon}</ValIcon>
                <ValTitle>{title}</ValTitle>
                <ValDesc>{desc}</ValDesc>
              </ValCard>
            ))}
          </ValGrid>
        </ValInner>
      </ValSection>

      <AboutStats />
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
  overflow: hidden;
  padding: 8rem 4vw 4rem;
`;

const ThreeRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 52%;
  height: 100%;
  pointer-events: none;
  z-index: 0;

  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    width: 100%;
    opacity: 0.35;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 680px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
  font-size: clamp(3.5rem, 9vw, 12rem);
  font-weight: 800;
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

const TlSection = styled.section`
  padding: 7rem 4vw;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const TlInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const TlHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TlLabel = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.4rem, 3vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
`;

const TlYears = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const TlList = styled.div`
  display: flex;
  flex-direction: column;
`;

const TlItem = styled.div`
  display: grid;
  grid-template-columns: 4.5rem 1px 1fr;
  align-items: start;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child { border-bottom: none; }
`;

const TlYear = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accent};
  padding-top: 0.1rem;
`;

const TlBar = styled.div`
  width: 1px;
  height: 100%;
  background: ${({ theme }) => theme.colors.border};
`;

const TlText = styled.p`
  font-size: 0.97rem;
  font-weight: 300;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const ValSection = styled.section`
  padding: 7rem 4vw;
  background: ${({ theme }) => theme.colors.bgSubtle};
`;

const ValInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ValLabel = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.4rem, 3vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const ValGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ValCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color 0.3s ease, background 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const ValIcon = styled.span`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.accent};
`;

const ValTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.2rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
`;

const ValDesc = styled.p`
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default About;
