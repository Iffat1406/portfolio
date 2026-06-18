import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar }    from './components/Navbar';
import CustomCursor  from './components/CustomCursor';
import Preloader     from './components/Preloader';
import Home          from './pages/Home';
import About         from './pages/About';
import Process       from './pages/Process';
import Projects      from './pages/Projects';
import Skills        from './pages/Skills';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [ready, setReady] = useState(false);

  return (
    <>
      <CustomCursor />

      {!ready && <Preloader onComplete={() => setReady(true)} />}

      <Navbar />

      <Routes>
        <Route path="/"         element={<Home    ready={ready} />} />
        <Route path="/about"    element={<About   />}               />
        <Route path="/process"  element={<Process />}               />
        <Route path="/journal"  element={<Projects />}              />
        <Route path="/projects" element={<Projects />}              />
        <Route path="/skills"   element={<Skills  />}               />
      </Routes>
    </>
  );
};

export default App;
