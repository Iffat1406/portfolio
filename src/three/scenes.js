// ─── Scene builders ──────────────────────────────────────────────────────────
// Each export is a stable, module-scope function passed to <ThreeCanvas build={…} />.
// They receive { scene, camera, colors, THREE } and return { update(t, mouse) }.

const fibonacciSphere = (THREE, count, radius) => {
  const arr = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const th = golden * i;
    arr[i * 3]     = Math.cos(th) * r * radius;
    arr[i * 3 + 1] = y * radius;
    arr[i * 3 + 2] = Math.sin(th) * r * radius;
  }
  return new THREE.BufferAttribute(arr, 3);
};

const wire = (THREE, color, opacity) =>
  new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });

const litScene = (THREE, scene, colors, strength = 1) => {
  scene.add(new THREE.AmbientLight(0xffffff, 0.42 * strength));
  const key = new THREE.PointLight(colors.accent, 4.2 * strength, 40);
  key.position.set(5, 5, 6);
  scene.add(key);
  const rim = new THREE.PointLight(colors.accent2, 3.0 * strength, 40);
  rim.position.set(-6, -3, -4);
  scene.add(rim);
  const fill = new THREE.DirectionalLight(0xffffff, 0.5 * strength);
  fill.position.set(3, 8, 5);
  scene.add(fill);
  return { key, rim };
};

// ─── Hero: layered icosahedra, a morphing core and a drifting star field ─────

export const heroScene = ({ scene, colors, THREE }) => {
  const pivot = new THREE.Group();
  scene.add(pivot);

  const { key, rim } = litScene(THREE, scene, colors);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.15, 1),
    wire(THREE, colors.accent, 0.30),
  );
  pivot.add(shell);

  const mid = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.25, 1),
    wire(THREE, colors.accent2, 0.16),
  );
  pivot.add(mid);

  // Morphing metal core
  const coreGeo = new THREE.IcosahedronGeometry(1.28, 3);
  const rest    = coreGeo.attributes.position.array.slice();
  const core    = new THREE.Mesh(
    coreGeo,
    new THREE.MeshStandardMaterial({
      color: colors.accent, metalness: 0.92, roughness: 0.16, flatShading: true,
    }),
  );
  pivot.add(core);

  // Equatorial ring
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(4.1, 0.007, 3, 128),
    new THREE.MeshBasicMaterial({ color: colors.accent2, transparent: true, opacity: 0.5 }),
  );
  ring.rotation.x = Math.PI * 0.46;
  pivot.add(ring);

  // Star field
  const stars = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', fibonacciSphere(THREE, 260, 9.5)),
    new THREE.PointsMaterial({ color: colors.textSubtle, size: 0.055, transparent: true, opacity: 0.55 }),
  );
  scene.add(stars);

  const pos = coreGeo.attributes.position;

  return {
    update(t, mouse) {
      shell.rotation.set(t * 0.10, t * 0.15, t * 0.05);
      mid.rotation.set(-t * 0.13, -t * 0.09, 0);
      ring.rotation.z = t * 0.22;
      stars.rotation.y = t * 0.018;
      stars.rotation.x = t * 0.009;

      for (let i = 0; i < pos.count; i++) {
        const x = rest[i * 3], y = rest[i * 3 + 1], z = rest[i * 3 + 2];
        const n = 1 + Math.sin(x * 2.1 + t * 1.1) * Math.cos(y * 2.4 + t * 0.8) * 0.13;
        pos.setXYZ(i, x * n, y * n, z * n);
      }
      pos.needsUpdate = true;
      coreGeo.computeVertexNormals();
      core.rotation.y = t * 0.24;

      pivot.rotation.y = mouse.x * 0.32;
      pivot.rotation.x = mouse.y * 0.22;

      key.position.x = Math.sin(t * 0.6) * 6;
      key.position.z = Math.cos(t * 0.6) * 6;
      rim.position.y = Math.sin(t * 0.45) * 5;
    },
  };
};

// ─── Experience: a rotating node graph — nodes wired to their neighbours ─────

export const networkScene = ({ scene, colors, THREE }) => {
  const pivot = new THREE.Group();
  scene.add(pivot);

  const COUNT = 54;
  const attr  = fibonacciSphere(THREE, COUNT, 3.25);
  const base  = attr.array.slice();

  const nodeGeo = new THREE.BufferGeometry().setAttribute('position', attr);
  const nodes = new THREE.Points(
    nodeGeo,
    new THREE.PointsMaterial({ color: colors.accent2, size: 0.11, transparent: true, opacity: 0.95 }),
  );
  pivot.add(nodes);

  // Wire every pair closer than the threshold
  const pairs = [];
  for (let i = 0; i < COUNT; i++) {
    for (let j = i + 1; j < COUNT; j++) {
      const dx = base[i * 3] - base[j * 3];
      const dy = base[i * 3 + 1] - base[j * 3 + 1];
      const dz = base[i * 3 + 2] - base[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < 1.35 * 1.35) pairs.push(i, j);
    }
  }
  const linePos = new Float32Array(pairs.length * 3);
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
  const lines = new THREE.LineSegments(
    lineGeo,
    new THREE.LineBasicMaterial({ color: colors.accent, transparent: true, opacity: 0.34 }),
  );
  pivot.add(lines);

  const halo = new THREE.Mesh(
    new THREE.IcosahedronGeometry(4.4, 1),
    wire(THREE, colors.accent, 0.07),
  );
  pivot.add(halo);

  const nPos = nodeGeo.attributes.position;
  const lPos = lineGeo.attributes.position;

  return {
    update(t, mouse) {
      for (let i = 0; i < COUNT; i++) {
        const s = 1 + Math.sin(t * 1.2 + i * 0.7) * 0.045;
        nPos.setXYZ(i, base[i * 3] * s, base[i * 3 + 1] * s, base[i * 3 + 2] * s);
      }
      nPos.needsUpdate = true;

      for (let k = 0; k < pairs.length; k++) {
        const i = pairs[k];
        lPos.setXYZ(k, nPos.getX(i), nPos.getY(i), nPos.getZ(i));
      }
      lPos.needsUpdate = true;

      pivot.rotation.y = t * 0.11 + mouse.x * 0.35;
      pivot.rotation.x = Math.sin(t * 0.2) * 0.14 + mouse.y * 0.22;
      halo.rotation.z = -t * 0.07;
    },
  };
};

// ─── Skills: point globe wrapped in orbiting rings ───────────────────────────

export const globeScene = ({ scene, colors, THREE }) => {
  const pivot = new THREE.Group();
  scene.add(pivot);

  const globe = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', fibonacciSphere(THREE, 1100, 2.7)),
    new THREE.PointsMaterial({ color: colors.accent2, size: 0.032, transparent: true, opacity: 0.85 }),
  );
  pivot.add(globe);

  const husk = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.68, 2),
    wire(THREE, colors.accent, 0.09),
  );
  pivot.add(husk);

  const rings = [0.42, -0.75, 1.35].map((tilt, i) => {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(3.35 + i * 0.42, 0.006, 3, 140),
      new THREE.MeshBasicMaterial({
        color: i === 1 ? colors.accent2 : colors.accent,
        transparent: true,
        opacity: 0.45,
      }),
    );
    r.rotation.x = tilt;
    r.rotation.y = tilt * 0.5;
    pivot.add(r);
    return r;
  });

  return {
    update(t, mouse) {
      globe.rotation.y = t * 0.085;
      husk.rotation.y  = t * 0.085;
      husk.rotation.x  = t * 0.03;
      rings.forEach((r, i) => { r.rotation.z = t * (0.18 + i * 0.09) * (i % 2 ? -1 : 1); });
      pivot.rotation.y = mouse.x * 0.3;
      pivot.rotation.x = mouse.y * 0.2;
    },
  };
};

// ─── About: morphing orb with an orbiting particle halo ──────────────────────

export const orbScene = ({ scene, colors, THREE }) => {
  const pivot = new THREE.Group();
  scene.add(pivot);
  litScene(THREE, scene, colors);

  const geo  = new THREE.SphereGeometry(2, 64, 64);
  const rest = geo.attributes.position.array.slice();
  const orb  = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ color: colors.accent, roughness: 0.12, metalness: 0.88 }),
  );
  pivot.add(orb);

  const halo = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', fibonacciSphere(THREE, 220, 3.3)),
    new THREE.PointsMaterial({ color: colors.accent2, size: 0.05, transparent: true, opacity: 0.7 }),
  );
  pivot.add(halo);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(3.9, 1),
    wire(THREE, colors.accent, 0.10),
  );
  pivot.add(shell);

  const pos = geo.attributes.position;

  return {
    update(t, mouse) {
      for (let i = 0; i < pos.count; i++) {
        const x = rest[i * 3], y = rest[i * 3 + 1], z = rest[i * 3 + 2];
        const n = Math.sin(x * 2.6 + t) * Math.cos(y * 2.6 + t * 0.7) * Math.sin(z * 1.8 + t * 1.3) * 0.28;
        pos.setXYZ(i, x * (1 + n), y * (1 + n), z * (1 + n));
      }
      pos.needsUpdate = true;
      geo.computeVertexNormals();

      orb.rotation.set(t * 0.07, t * 0.11, 0);
      halo.rotation.y = -t * 0.14;
      halo.rotation.x = t * 0.06;
      shell.rotation.y = t * 0.05;

      pivot.rotation.y = mouse.x * 0.28;
      pivot.rotation.x = mouse.y * 0.2;
    },
  };
};

// ─── Footer: a wireframe terrain rolling under the contact block ─────────────

export const waveScene = ({ scene, camera, colors, THREE }) => {
  camera.position.set(0, 2.4, 7);
  camera.lookAt(0, 0, 0);

  const geo = new THREE.PlaneGeometry(34, 18, 68, 34);
  const rest = geo.attributes.position.array.slice();

  const mesh = new THREE.Mesh(geo, wire(THREE, colors.accent, 0.24));
  mesh.rotation.x = -Math.PI / 2.35;
  mesh.position.y = -1.6;
  scene.add(mesh);

  const dots = new THREE.Points(
    geo,
    new THREE.PointsMaterial({ color: colors.accent2, size: 0.035, transparent: true, opacity: 0.5 }),
  );
  dots.rotation.copy(mesh.rotation);
  dots.position.copy(mesh.position);
  scene.add(dots);

  const pos = geo.attributes.position;

  return {
    update(t, mouse) {
      for (let i = 0; i < pos.count; i++) {
        const x = rest[i * 3], y = rest[i * 3 + 1];
        pos.setZ(i, Math.sin(x * 0.42 + t * 0.8) * 0.62 + Math.cos(y * 0.38 + t * 0.55) * 0.48);
      }
      pos.needsUpdate = true;
      mesh.rotation.z = mouse.x * 0.06;
      dots.rotation.z = mesh.rotation.z;
    },
  };
};

// ─── Project cards: one signature solid per project ──────────────────────────

const GEOMETRY_BY_KIND = {
  knot: (THREE) => new THREE.TorusKnotGeometry(1.05, 0.32, 150, 18),
  octa: (THREE) => new THREE.OctahedronGeometry(1.55, 0),
  ico:  (THREE) => new THREE.IcosahedronGeometry(1.5, 1),
};

const projectCache = new Map();

export const projectScene = (kind) => {
  if (!projectCache.has(kind)) {
    projectCache.set(kind, ({ scene, camera, colors, THREE }) => {
      camera.position.z = 4.6;
      const pivot = new THREE.Group();
      scene.add(pivot);

      const make = GEOMETRY_BY_KIND[kind] || GEOMETRY_BY_KIND.ico;
      const outer = new THREE.Mesh(make(THREE), wire(THREE, '#ffffff', 0.30));
      const inner = new THREE.Mesh(make(THREE), wire(THREE, colors.accent2, 0.55));
      inner.scale.setScalar(0.72);
      pivot.add(outer, inner);

      const dust = new THREE.Points(
        new THREE.BufferGeometry().setAttribute('position', fibonacciSphere(THREE, 120, 3.1)),
        new THREE.PointsMaterial({ color: '#ffffff', size: 0.03, transparent: true, opacity: 0.4 }),
      );
      pivot.add(dust);

      return {
        update(t, mouse) {
          outer.rotation.set(t * 0.22, t * 0.31, t * 0.08);
          inner.rotation.set(-t * 0.28, -t * 0.19, 0);
          dust.rotation.y = t * 0.05;
          const s = 1 + Math.sin(t * 0.9) * 0.035;
          pivot.scale.setScalar(s);
          pivot.rotation.y = mouse.x * 0.22;
          pivot.rotation.x = mouse.y * 0.16;
        },
      };
    });
  }
  return projectCache.get(kind);
};

// ─── Preloader: a single spinning cage ───────────────────────────────────────

export const loaderScene = ({ scene, camera, colors, THREE }) => {
  camera.position.z = 4.4;
  litScene(THREE, scene, colors, 0.9);

  const cage = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.65, 1),
    wire(THREE, colors.accent, 0.55),
  );
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.72, 2),
    new THREE.MeshStandardMaterial({
      color: colors.accent2, metalness: 0.9, roughness: 0.2, flatShading: true,
    }),
  );
  scene.add(cage, core);

  return {
    update(t) {
      cage.rotation.set(t * 0.6, t * 0.85, t * 0.2);
      core.rotation.set(-t * 0.9, -t * 0.7, 0);
      const s = 1 + Math.sin(t * 2.4) * 0.08;
      core.scale.setScalar(s);
    },
  };
};
