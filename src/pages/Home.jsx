import Hero   from '../components/Hero';
import Work   from '../components/Work';
import About  from '../components/About';
import Footer from '../components/Footer';

const Home = ({ ready }) => (
  <main>
    <Hero  ready={ready} />
    <Work  />
    <About />
    <Footer />
  </main>
);

export default Home;
