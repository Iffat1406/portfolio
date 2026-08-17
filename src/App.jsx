import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar }    from './components/Navbar';
import CustomCursor  from './components/CustomCursor';
import Preloader     from './components/Preloader';
import { ScrollProgress, Grain, AmbientGlow } from './components/Chrome';
import Home          from './pages/Home';
import About         from './pages/About';
import Experience    from './pages/Experience';
import Projects      from './pages/Projects';
import Skills        from './pages/Skills';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [ready, setReady] = useState(false);

  return (
    <>
      <CustomCursor />
      <AmbientGlow />
      <Grain />
      <ScrollProgress />

      {!ready && <Preloader onComplete={() => setReady(true)} />}

      <Navbar />

      <Routes>
        <Route path="/"           element={<Home     ready={ready} />}   />
        <Route path="/about"      element={<About     />}                />
        <Route path="/experience" element={<Experience />}               />
        <Route path="/projects"   element={<Projects  />}                />
        <Route path="/skills"     element={<Skills    />}                />
        {/* Legacy paths from the template */}
        <Route path="/process"    element={<Navigate to="/experience" replace />} />
        <Route path="/journal"    element={<Navigate to="/projects"   replace />} />
        <Route path="*"           element={<Navigate to="/"           replace />} />
      </Routes>
    </>
  );
};

export default App;
