import Hero         from '../components/Hero';
import Work         from '../components/Work';
import Certificates from '../components/Certificates';
import About        from '../components/About';
import Footer       from '../components/Footer';

const Home = ({ ready }) => (
  <main>
    <Hero  ready={ready} />
    <Work  />
    <Certificates limit={3} showViewAll />
    <About />
    <Footer />
  </main>
);

export default Home;
