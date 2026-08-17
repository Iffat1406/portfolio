import { useEffect, useRef } from 'react';
import styled, { useTheme } from 'styled-components';

/**
 * A single, reusable WebGL surface.
 *
 * Pass a `build` function — defined at module scope so its identity is stable —
 * which receives { scene, camera, renderer, colors, THREE } and returns an
 * optional { update(t, mouse, dt), resize(w, h), dispose() }.
 *
 * Handled here so no scene has to repeat it:
 *   · three.js fetched on demand, so it never blocks first paint
 *   · device-pixel-ratio clamping and container-driven resize
 *   · damped, normalised pointer tracking for parallax
 *   · pausing the render loop while off-screen or on a hidden tab
 *   · prefers-reduced-motion (renders one static frame)
 *   · full geometry/material/renderer disposal on unmount and theme change
 */

const mountScene = (THREE, mount, opts) => {
  const { build, colors, fov, camZ, parallax, dpr } = opts;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = mount.clientWidth  || 1;
  let H = mount.clientHeight || 1;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: window.devicePixelRatio < 2,
    powerPreference: 'high-performance',
  });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, dpr));
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(fov, W / H, 0.1, 200);
  camera.position.z = camZ;

  const api = build({ scene, camera, renderer, colors, THREE }) || {};

  // ── Pointer parallax ────────────────────────────────────────
  const target = { x: 0, y: 0 };
  const mouse  = { x: 0, y: 0 };
  const onPointer = (e) => {
    target.x = (e.clientX / window.innerWidth)  * 2 - 1;
    target.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (parallax && !reduced) {
    window.addEventListener('pointermove', onPointer, { passive: true });
  }

  // ── Resize ──────────────────────────────────────────────────
  const applySize = () => {
    W = mount.clientWidth  || 1;
    H = mount.clientHeight || 1;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
    api.resize?.(W, H);
  };
  const ro = new ResizeObserver(applySize);
  ro.observe(mount);

  // ── Render loop, paused while off-screen ────────────────────
  let raf = null;
  let visible = true;
  let last = performance.now();
  const t0 = last;

  const tick = () => {
    raf = requestAnimationFrame(tick);
    const now = performance.now();
    const dt  = Math.min((now - last) * 0.001, 0.05);
    last = now;

    mouse.x += (target.x - mouse.x) * 0.045;
    mouse.y += (target.y - mouse.y) * 0.045;

    api.update?.((now - t0) * 0.001, mouse, dt);
    renderer.render(scene, camera);
  };

  const start = () => {
    if (raf === null && visible && !reduced) {
      last = performance.now();
      tick();
    }
  };
  const stop = () => {
    if (raf !== null) { cancelAnimationFrame(raf); raf = null; }
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    },
    { rootMargin: '120px' },
  );
  io.observe(mount);

  const onVisibility = () => { if (document.hidden) stop(); else start(); };
  document.addEventListener('visibilitychange', onVisibility);

  if (reduced) {
    api.update?.(0, mouse, 0);
    renderer.render(scene, camera);
  } else {
    start();
  }

  // ── Teardown ────────────────────────────────────────────────
  return () => {
    stop();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pointermove', onPointer);
    api.dispose?.();

    scene.traverse((obj) => {
      obj.geometry?.dispose?.();
      const mat = obj.material;
      if (Array.isArray(mat)) mat.forEach(m => m.dispose?.());
      else mat?.dispose?.();
    });
    scene.clear();
    renderer.dispose();
    if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
  };
};

const ThreeCanvas = ({
  build,
  fov      = 50,
  camZ     = 7,
  parallax = 1,
  dpr      = 1.75,
  className,
}) => {
  const mountRef = useRef(null);
  const theme    = useTheme();

  // Scenes are rebuilt when the palette flips so 3D light matches the UI
  const paletteKey = theme.mode;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let cancelled = false;
    let teardown  = null;

    import('three').then((THREE) => {
      if (cancelled) return;
      teardown = mountScene(THREE, mount, {
        build, colors: theme.colors, fov, camZ, parallax, dpr,
      });
    });

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [build, fov, camZ, parallax, dpr, paletteKey]); // eslint-disable-line react-hooks/exhaustive-deps

  return <Mount ref={mountRef} className={className} aria-hidden="true" />;
};

const Mount = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
  }
`;

export default ThreeCanvas;
