import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Schedule from './components/Schedule';
import Pricing from './components/Pricing';
import Rules from './components/Rules';
import Location from './components/Location';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ScrollEffects from './components/ScrollEffects';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useScrollAnimations } from './hooks/useScrollAnimations';
import './App.css';

function App() {
  useSmoothScroll();
  useScrollAnimations();

  return (
    <>
      <ScrollEffects />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyChooseUs />
        <Schedule />
        <Pricing />
        <Rules />
        <Location />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

export default App;
