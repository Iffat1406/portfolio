import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';

const Preloader = ({ onComplete }) => {
  const wrapRef  = useRef(null);
  const countRef = useRef(null);
  const barRef   = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };
    const tl  = gsap.timeline();

    // Progress bar fills in sync with counter
    tl.to(barRef.current, {
      scaleX: 1,
      duration: 1.8,
      ease: 'power2.inOut',
    }, 0);

    // Counter 000 → 100; fire onComplete when counter hits 100
    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate() {
        if (countRef.current) {
          countRef.current.textContent = String(Math.round(obj.val)).padStart(3, '0');
        }
      },
      onComplete,
    }, 0);

    // Preloader slides up after a brief pause
    tl.to(wrapRef.current, {
      yPercent: -100,
      duration: 0.85,
      ease: 'power4.inOut',
      delay: 0.2,
    });
  }, [onComplete]);

  return (
    <Wrap ref={wrapRef}>
      <Center>
        <Count ref={countRef}>000</Count>
        <Name>Iffat Shaikh · Portfolio</Name>
      </Center>
      <BarTrack>
        <BarFill ref={barRef} />
      </BarTrack>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.875rem;
`;

const Count = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(5rem, 16vw, 13rem);
  font-weight: 800;
  letter-spacing: -0.06em;
  line-height: 1;
  color: #f5f5f0;
`;

const Name = styled.span`
  font-family: ${({ theme }) => theme.font.body};
  font-size: 0.72rem;
  font-weight: 400;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #444444;
`;

const BarTrack = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 4vw;
  right: 4vw;
  height: 1px;
  background: #1a1a1a;
  overflow: hidden;
`;

const BarFill = styled.div`
  height: 100%;
  width: 100%;
  background: #ff4d00;
  transform: scaleX(0);
  transform-origin: left;
`;

export default Preloader;
