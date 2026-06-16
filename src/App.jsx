import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar }    from './components/Navbar';
import CustomCursor  from './components/CustomCursor';
import Preloader     from './components/Preloader';
import Home          from './pages/Home';
import Projects      from './pages/Projects';
import Skills        from './pages/Skills';

// Register GSAP plugins once at app level
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [ready, setReady] = useState(false);

  return (
    <>
      <CustomCursor />

      {!ready && <Preloader onComplete={() => setReady(true)} />}

      <Navbar />

      <Routes>
        <Route path="/"        element={<Home     ready={ready} />} />
        <Route path="/about"   element={<Skills   />}               />
        <Route path="/process" element={<Skills   />}               />
        <Route path="/journal" element={<Projects />}               />
        <Route path="/projects" element={<Projects />}              />
      </Routes>
    </>
  );
};

export default App;
