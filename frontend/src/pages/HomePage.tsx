import AllServices from "../components/molecules/allServices";
import HowItWorks from "../components/molecules/howItWorks";
import FAQ from "../components/molecules/frequentQuestions";
import Footer from "../components/molecules/footer";
import Header from "../components/molecules/header";

function HomePage() {
  return (
    <>
      <Header />
      <AllServices />
      <HowItWorks />
      <FAQ />
      <Footer />
    </>
  );
}

export default HomePage;
