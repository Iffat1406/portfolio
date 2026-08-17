import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { gsap } from 'gsap';
import ThreeCanvas from '../three/ThreeCanvas';
import { loaderScene } from '../three/scenes';
import { PROFILE } from '../data/profile';

const Preloader = ({ onComplete }) => {
  const wrapRef  = useRef(null);
  const countRef = useRef(null);
  const barRef   = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };
    const tl  = gsap.timeline();

    tl.to(barRef.current, { scaleX: 1, duration: 1.8, ease: 'power2.inOut' }, 0);

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

    tl.to(wrapRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: 'power4.inOut',
      delay: 0.2,
    });
  }, [onComplete]);

  return (
    <Wrap ref={wrapRef}>
      <Stage>
        <ThreeCanvas build={loaderScene} camZ={4.4} parallax={0} />
      </Stage>

      <Center>
        <Count ref={countRef}>000</Count>
        <Name>{PROFILE.name} · {PROFILE.role}</Name>
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
  z-index: ${({ theme }) => theme.zIndex.loader};
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Stage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(56vmin, 420px);
  height: min(56vmin, 420px);
  transform: translate(-50%, -58%);
  opacity: 0.9;
`;

const Center = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Count = styled.span`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(4rem, 13vw, 10rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 1;
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Name = styled.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.7rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSubtle};
`;

const BarTrack = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 4vw;
  right: 4vw;
  height: 2px;
  background: ${({ theme }) => theme.colors.border};
  overflow: hidden;
  border-radius: 9999px;
`;

const BarFill = styled.div`
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.gradient};
  transform: scaleX(0);
  transform-origin: left;
`;

export default Preloader;
