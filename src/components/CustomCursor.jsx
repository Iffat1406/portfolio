import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    const dot    = dotRef.current;
    const ringEl = ringRef.current;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05, ease: 'none' });
    };

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      gsap.set(ringEl, { x: ring.current.x, y: ring.current.y });
      raf.current = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      gsap.to(ringEl, { scale: 2.2, duration: 0.35, ease: 'power2.out' });
      gsap.to(dot,    { scale: 0,   duration: 0.25 });
    };
    const onLeave = () => {
      gsap.to(ringEl, { scale: 1, duration: 0.4, ease: 'elastic.out(1,0.6)' });
      gsap.to(dot,    { scale: 1, duration: 0.4 });
    };
    const onDown = () => gsap.to(ringEl, { scale: 0.75, duration: 0.12 });
    const onUp   = () => gsap.to(ringEl, { scale: 1,    duration: 0.3, ease: 'elastic.out(1,0.5)' });

    window.addEventListener('mousemove',  onMove);
    window.addEventListener('mousedown',  onDown);
    window.addEventListener('mouseup',    onUp);
    raf.current = requestAnimationFrame(tick);

    // Attach hover listeners to interactive elements; re-run periodically
    // so dynamically-rendered elements are picked up.
    const attach = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    const interval = setInterval(attach, 1200);
    attach();

    return () => {
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('mousedown',  onDown);
      window.removeEventListener('mouseup',    onUp);
      cancelAnimationFrame(raf.current);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Dot  ref={dotRef}  />
      <Ring ref={ringRef} />
    </>
  );
};

const Dot = styled.div`
  position: fixed;
  top: -4px;
  left: -4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
`;

const Ring = styled.div`
  position: fixed;
  top: -18px;
  left: -18px;
  width: 36px;
  height: 36px;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  will-change: transform;
  opacity: 0.6;
`;

export default CustomCursor;
