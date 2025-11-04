import { useState } from "react";
import type { FAQItem } from "../../../lib/types/types";
import PageTitle from "../../atoms/pageTitle";

function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Como funciona o cadastro de um profissional?",
      answer:
        "Nossa plataforma conecta você a profissionais qualificados. Basta publicar o seu pedido de serviço, receber orçamentos e escolher o melhor profissional para suas necessidades.",
    },
    {
      id: 2,
      question: "Quanto tempo leva para receber os orçamentos?",
      answer:
        "Você normalmente receberá orçamentos em poucas horas. A maioria dos profissionais responde em até 24 horas após o seu pedido.",
    },
    {
      id: 3,
      question: "Há algum custo para usar a plataforma?",
      answer:
        "Publicar pedidos de serviço e receber orçamentos é totalmente gratuito. Você só paga quando aceita o orçamento de um profissional e o serviço é concluído.",
    },
    {
      id: 4,
      question: "Como os profissionais são verificados?",
      answer:
        "Todos os profissionais da nossa plataforma passam por um processo de verificação que inclui checagem de identidade, análise de portfólio e avaliação do feedback dos clientes.",
    },
    {
      id: 5,
      question: "E se eu não ficar satisfeito com o serviço?",
      answer:
        "Oferecemos uma garantia de satisfação. Se você não estiver satisfeito com o trabalho realizado, entre em contato com nossa equipe de suporte em até 7 dias para receber assistência.",
    },
  ];

  const toggleAccordion = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const isOpen = (id: number) => openItems.includes(id);

  return (
    <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <PageTitle title="Perguntas Frequentes" />

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg">
            <button
              onClick={() => toggleAccordion(item.id)}
              className="w-full flex justify-between items-center text-slate-800 hover:text-blue-600 transition-colors duration-200 p-5"
            >
              <span className="text-left font-medium">
                {item.id}. {item.question}
              </span>
              <span
                className={`text-slate-800 transition-transform duration-300 ${
                  isOpen(item.id) ? "rotate-180" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen(item.id) ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="text-slate-600 leading-relaxed p-5 pt-0">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
