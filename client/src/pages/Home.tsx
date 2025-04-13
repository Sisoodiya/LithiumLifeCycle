import Hero from "../components/home/Hero";
import MarketAnalytics from "../components/home/MarketAnalytics";
import KeyBenefits from "../components/home/KeyBenefits";

const Home = () => {
  return (
    <section className="pt-10 pb-20">
      <Hero />
      <MarketAnalytics />
      <KeyBenefits />
    </section>
  );
};

export default Home;
