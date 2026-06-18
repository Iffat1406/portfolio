import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

const HeroCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene / Camera ────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 7.5;

    // ── Lights ────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(6, 8, 4);
    scene.add(dir);
    const pt = new THREE.PointLight(0xff4d00, 0.5, 25);
    pt.position.set(-6, -4, -6);
    scene.add(pt);

    // ── Main icosahedron wireframe ─────────────────────────────
    const ico1 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.8, 3),
      new THREE.MeshStandardMaterial({ color: 0xff4d00, wireframe: true, transparent: true, opacity: 0.28 }),
    );
    scene.add(ico1);

    // ── Inner icosahedron ─────────────────────────────────────
    const ico2 = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.6, 1),
      new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.07 }),
    );
    scene.add(ico2);

    // ── Particle field ────────────────────────────────────────
    const COUNT = 120;
    const pPos  = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 16;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x888888, size: 0.055, transparent: true, opacity: 0.45 }),
    );
    scene.add(particles);

    // ── Resize ────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Render loop ───────────────────────────────────────────
    let raf;
    const t0 = performance.now();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = (performance.now() - t0) * 0.001;
      ico1.rotation.x = t * 0.12;
      ico1.rotation.y = t * 0.18;
      ico1.rotation.z = t * 0.06;
      ico2.rotation.x = -t * 0.08;
      ico2.rotation.y = -t * 0.10;
      particles.rotation.y = t * 0.035;
      particles.rotation.x = t * 0.018;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <Mount ref={mountRef} />;
};

const Mount = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;

  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

export default HeroCanvas;
