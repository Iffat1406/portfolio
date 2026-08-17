import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

// ─── Scroll progress ─────────────────────────────────────────────────────────

export const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const setter = gsap.quickSetter(barRef.current, 'scaleX');
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setter(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <ProgressTrack>
      <ProgressBar ref={barRef} />
    </ProgressTrack>
  );
};

const ProgressTrack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  z-index: ${({ theme }) => theme.zIndex.modal};
  pointer-events: none;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  background: ${({ theme }) => theme.colors.gradient};
`;

// ─── Film grain ──────────────────────────────────────────────────────────────
// A tiny inline SVG turbulence tile — adds depth without a texture request.

const GRAIN_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const Grain = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay + 1};
  pointer-events: none;
  opacity: ${({ theme }) => theme.colors.grain};
  background-image: ${GRAIN_URI};
  mix-blend-mode: ${({ theme }) => (theme.mode === 'dark' ? 'screen' : 'multiply')};
`;

// ─── Ambient glow that trails the pointer ────────────────────────────────────

export const AmbientGlow = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const xTo = gsap.quickTo(ref.current, 'x', { duration: 1.1, ease: 'power3.out' });
    const yTo = gsap.quickTo(ref.current, 'y', { duration: 1.1, ease: 'power3.out' });
    const onMove = (e) => { xTo(e.clientX); yTo(e.clientY); };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return <GlowBlob ref={ref} />;
};

const GlowBlob = styled.div`
  position: fixed;
  top: -22vmax;
  left: -22vmax;
  width: 44vmax;
  height: 44vmax;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.glow};
  filter: blur(30px);
  pointer-events: none;
  z-index: 0;

  @media (hover: none) { display: none; }
`;
