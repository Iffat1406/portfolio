import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

// ─── Vanilla Three.js hero background ────────────────────────────────────────

const TorusKnotCanvas = () => {
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
    const camera = new THREE.PerspectiveCamera(52, W / H, 0.1, 100);
    camera.position.z = 6;

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const dir = new THREE.DirectionalLight(0xffffff, 1);
    dir.position.set(6, 8, 4);
    scene.add(dir);
    const pt = new THREE.PointLight(0xff4d00, 0.5, 25);
    pt.position.set(-4, -4, -4);
    scene.add(pt);

    const knotGeo = new THREE.TorusKnotGeometry(1, 0.28, 180, 20);
    const knotMat1 = new THREE.MeshStandardMaterial({
      color: 0xffffff, wireframe: true, transparent: true, opacity: 0.18,
    });
    const knotMat2 = new THREE.MeshStandardMaterial({
      color: 0xff4d00, wireframe: true, transparent: true, opacity: 0.1,
    });
    const knot1 = new THREE.Mesh(knotGeo, knotMat1);
    const knot2 = new THREE.Mesh(knotGeo, knotMat2);
    knot1.scale.setScalar(1.7);
    knot2.scale.setScalar(1.7);
    scene.add(knot1);
    scene.add(knot2);

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    let raf;
    const t0 = performance.now();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = (performance.now() - t0) * 0.001;
      knot1.rotation.x = t * 0.09;
      knot1.rotation.y = t * 0.14;
      knot1.rotation.z = t * 0.04;
      knot2.rotation.x = -t * 0.05;
      knot2.rotation.y = -t * 0.08;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      knotGeo.dispose();
      knotMat1.dispose();
      knotMat2.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <BgMount ref={mountRef} />;
};

// ─── Mini shape canvas per step card ─────────────────────────────────────────

const SHAPE_SPEED = [0.55, 0.72, 0.48, 0.68];

const StepCanvas = ({ shape, index }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = 60;
    const H = 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
    camera.position.z = 3.5;

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pt = new THREE.PointLight(0xff4d00, 1.5, 15);
    pt.position.set(4, 4, 4);
    scene.add(pt);

    let geo;
    switch (shape) {
      case 'torus':      geo = new THREE.TorusGeometry(0.8, 0.32, 16, 60); break;
      case 'box':        geo = new THREE.BoxGeometry(1.5, 1.5, 1.5);       break;
      case 'octahedron': geo = new THREE.OctahedronGeometry(1.1);           break;
      default:           geo = new THREE.SphereGeometry(1, 24, 24);         break;
    }
    const mat  = new THREE.MeshStandardMaterial({
      color: 0xff4d00, wireframe: true, transparent: true, opacity: 0.7,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const spd = SHAPE_SPEED[index % SHAPE_SPEED.length];

    let raf;
    const t0 = performance.now();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = (performance.now() - t0) * 0.001;
      mesh.rotation.x = t * spd * 0.4;
      mesh.rotation.y = t * spd * 0.6;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [shape, index]);

  return <MiniMount ref={mountRef} />;
};

// ─── Page data ────────────────────────────────────────────────────────────────

const STEPS = [
  {
    num: '01', shape: 'sphere', title: 'DISCOVER', sub: '1–2 weeks',
    desc: 'Deep research into your brand, audience, and competitors. We define clear goals, map user journeys, and establish a shared creative direction before a single wireframe is drawn.',
    tools: ['User Interviews', 'Competitive Audit', 'Moodboarding', 'Brief Definition'],
  },
  {
    num: '02', shape: 'torus', title: 'DESIGN', sub: '1–2 weeks',
    desc: 'From rough wireframes to high-fidelity prototypes. Every component, typographic choice, and motion blueprint is reviewed collaboratively — revisions are welcome at every step.',
    tools: ['Figma', 'Design System', 'Motion Prototypes', 'Client Review'],
  },
  {
    num: '03', shape: 'box', title: 'DEVELOP', sub: '3–5 weeks',
    desc: 'React-based build with GSAP and Three.js animations. Performance budgets set from day one. Pixel-perfect, accessible, and responsive — tested on real devices at each milestone.',
    tools: ['React / Next.js', 'GSAP', 'Three.js', 'Storybook'],
  },
  {
    num: '04', shape: 'octahedron', title: 'DELIVER', sub: '1 week',
    desc: 'Lighthouse audit, cross-browser QA, and deployment to your infrastructure. Full documentation and handoff. Post-launch support included for 30 days.',
    tools: ['CI/CD', 'Lighthouse', 'Vercel / AWS', '30-day Support'],
  },
];

const PRINCIPLES = [
  { label: 'No templates',        desc: 'Every project starts from zero. Your brand is not a theme.' },
  { label: 'Mobile-first',        desc: 'Designed and tested for small screens before scaling up.' },
  { label: 'Performance budget',  desc: 'Core Web Vitals targets defined before the first commit.' },
  { label: 'Open communication',  desc: 'Weekly check-ins, async updates, no surprises.' },
];

// ─── Page ────────────────────────────────────────────────────────────────────

const Process = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proc-hero-line',
        { yPercent: 110 },
        { yPercent: 0, stagger: 0.07, duration: 1.2, ease: 'power4.out', delay: 0.15 },
      );
      gsap.fromTo('.proc-hero-fade',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, stagger: 0.09, duration: 0.8, ease: 'power3.out', delay: 0.5 },
      );
      gsap.fromTo('.step-card',
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0, stagger: 0.1, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '.steps-grid', start: 'top 80%' },
        },
      );
      gsap.fromTo('.step-divider',
        { scaleX: 0 },
        {
          scaleX: 1, stagger: 0.06, duration: 0.7, ease: 'power3.inOut',
          scrollTrigger: { trigger: '.steps-grid', start: 'top 80%' },
        },
      );
      gsap.fromTo('.principle-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0, stagger: 0.07, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.principles-section', start: 'top 82%' },
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
          <TorusKnotCanvas />
        </HeroBg>

        <HeroContent>
          <HeroLabel className="proc-hero-fade">How I work</HeroLabel>
          <HeroLines>
            {['HOW', 'I WORK.'].map(w => (
              <LineWrap key={w}>
                <HeroTitle className="proc-hero-line">{w}</HeroTitle>
              </LineWrap>
            ))}
          </HeroLines>
          <HeroSub className="proc-hero-fade">
            A transparent, iterative process built on<br />
            communication, craft, and clear deliverables.
          </HeroSub>
          <StepCount className="proc-hero-fade">4 phases — typically 6 to 10 weeks</StepCount>
        </HeroContent>
      </HeroSection>

      {/* ── Steps ────────────────────────────────────────────────── */}
      <StepsSection>
        <StepsInner>
          <StepsHeader>
            <StepsLabel>The Process</StepsLabel>
          </StepsHeader>

          <StepsGrid className="steps-grid">
            {STEPS.map((step, i) => (
              <StepCard key={step.num} className="step-card">
                <StepTop>
                  <StepNum>{step.num}</StepNum>
                  <StepMini>
                    <StepCanvas shape={step.shape} index={i} />
                  </StepMini>
                </StepTop>

                <StepDivider className="step-divider" />

                <StepTitle>{step.title}</StepTitle>
                <StepSub>{step.sub}</StepSub>
                <StepDesc>{step.desc}</StepDesc>

                <ToolList>
                  {step.tools.map(t => (
                    <ToolTag key={t}>{t}</ToolTag>
                  ))}
                </ToolList>
              </StepCard>
            ))}
          </StepsGrid>
        </StepsInner>
      </StepsSection>

      {/* ── Principles ───────────────────────────────────────────── */}
      <PrinciplesSection className="principles-section">
        <PrInner>
          <PrLabel>Principles</PrLabel>
          <PrList>
            {PRINCIPLES.map(({ label, desc }) => (
              <PrItem key={label} className="principle-item">
                <PrItemLabel>{label}</PrItemLabel>
                <PrItemDesc>{desc}</PrItemDesc>
              </PrItem>
            ))}
          </PrList>
        </PrInner>
      </PrinciplesSection>

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

const BgMount = styled.div`
  width: 100%;
  height: 100%;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 800px;
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
  font-size: clamp(4rem, 11vw, 14rem);
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

const StepCount = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSubtle};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  padding: 0.4rem 1rem;
  width: fit-content;
`;

const StepsSection = styled.section`
  padding: 7rem 4vw;
`;

const StepsInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const StepsHeader = styled.div`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const StepsLabel = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.4rem, 3vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.md}) {
    grid-template-columns: 1fr;
  }
`;

const StepCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const StepTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StepNum = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const StepMini = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
`;

const MiniMount = styled.div`
  width: 60px;
  height: 60px;

  canvas {
    display: block;
  }
`;

const StepDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  transform-origin: left;
`;

const StepTitle = styled.h3`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
`;

const StepSub = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.accent};
`;

const StepDesc = styled.p`
  font-size: 0.87rem;
  font-weight: 300;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textMuted};
  flex: 1;
`;

const ToolList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const ToolTag = styled.span`
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.25rem 0.6rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 9999px;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const PrinciplesSection = styled.section`
  padding: 7rem 4vw;
  background: ${({ theme }) => theme.colors.bgSubtle};
`;

const PrInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const PrLabel = styled.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.4rem, 3vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: ${({ theme }) => theme.colors.text};
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PrList = styled.div`
  display: flex;
  flex-direction: column;
`;

const PrItem = styled.div`
  display: grid;
  grid-template-columns: 260px 1fr;
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

const PrItemLabel = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
`;

const PrItemDesc = styled.span`
  font-size: 0.93rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export default Process;
