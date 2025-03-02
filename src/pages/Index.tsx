
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedProducts from '../components/FeaturedProducts';
import CategorySection from '../components/CategorySection';
import ArtisanSpotlight from '../components/ArtisanSpotlight';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <CategorySection />
      <ArtisanSpotlight />
      <Newsletter />
      <Footer />
    </main>
  );
};

export default Index;
