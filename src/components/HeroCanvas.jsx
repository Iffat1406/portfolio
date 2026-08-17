import styled from 'styled-components';
import ThreeCanvas from '../three/ThreeCanvas';
import { heroScene } from '../three/scenes';

const HeroCanvas = () => (
  <Mount>
    <ThreeCanvas build={heroScene} camZ={7.6} fov={50} />
  </Mount>
);

const Mount = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
`;

export default HeroCanvas;
