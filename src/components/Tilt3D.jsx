import { useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

/**
 * Perspective tilt for cards — pure CSS 3D, no extra WebGL context.
 * The inner layer lifts on the Z axis so content sits above the surface.
 */
const Tilt3D = ({ children, max = 9, lift = 26, className }) => {
  const wrapRef  = useRef(null);
  const innerRef = useRef(null);
  const glareRef = useRef(null);

  const reduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e) => {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    const r  = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top)  / r.height;

    gsap.to(innerRef.current, {
      rotateY: (px - 0.5) * max * 2,
      rotateX: (0.5 - py) * max * 2,
      z: lift,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
    gsap.to(glareRef.current, {
      opacity: 1,
      '--gx': `${px * 100}%`,
      '--gy': `${py * 100}%`,
      duration: 0.4,
    });
  };

  const onLeave = () => {
    if (reduced) return;
    gsap.to(innerRef.current, {
      rotateX: 0, rotateY: 0, z: 0,
      duration: 0.9,
      ease: 'elastic.out(1, 0.55)',
    });
    gsap.to(glareRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <Wrap ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      <Inner ref={innerRef}>
        {children}
        <Glare ref={glareRef} />
      </Inner>
    </Wrap>
  );
};

const Wrap = styled.div`
  perspective: 1000px;
`;

const Inner = styled.div`
  position: relative;
  height: 100%;
  transform-style: preserve-3d;
  will-change: transform;
`;

const Glare = styled.span`
  position: absolute;
  inset: 0;
  border-radius: ${({ theme }) => theme.radius.lg};
  opacity: 0;
  pointer-events: none;
  background: radial-gradient(
    340px circle at var(--gx, 50%) var(--gy, 50%),
    ${({ theme }) => theme.colors.accentSoft} 0%,
    transparent 62%
  );
`;

export default Tilt3D;
