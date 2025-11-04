import makeRequestImg from "../../../assets/images/make-request.svg";
import receiveQuotesImg from "../../../assets/images/receive-quotes.svg";
import chooseBestImg from "../../../assets/images/choose-best.svg";
import PageTitle from "../../atoms/pageTitle";

function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Faça o seu pedido",
      image: makeRequestImg,
      size: "w-24 h-24", // Menor
    },
    {
      id: 2,
      title: "Receba orçamentos",
      image: receiveQuotesImg,
      size: "w-48 h-48", // Maior
    },
    {
      id: 3,
      title: "Escolha o melhor",
      image: chooseBestImg,
      size: "w-24 h-24", // Menor
    },
  ];

  return (
    <div className="bg-[#F9F4EA] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <PageTitle title="Como Funciona" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-end">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className="mb-6">
                <img
                  src={step.image}
                  alt={step.title}
                  className={`${step.size} object-contain mx-auto transition-all duration-300`}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;