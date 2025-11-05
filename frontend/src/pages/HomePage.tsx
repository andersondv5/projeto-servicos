import AllServices from "../components/molecules/allServices";
import HowItWorks from "../components/molecules/howItWorks";
import FAQ from "../components/molecules/frequentQuestions";
import Footer from "../components/molecules/footer";
import Header from "../components/molecules/header";
import MainSearch from "../components/molecules/mainSearch";

function HomePage() {
  return (
    <>
      <Header />
      <MainSearch />
      <AllServices />
      <HowItWorks />
      <FAQ />
      <Footer />
    </>
  );
}

export default HomePage;
