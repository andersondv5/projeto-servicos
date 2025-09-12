import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Tipos para avaliação
type Rating = {
  id: number;
  client: string;
  comment: string;
  stars: number;
};

// Tipo para profissional
type Professional = {
  id: number;
  name: string;
  profession: string;
  contact: string;
  bio: string;
  services: string[];
  ratings: Rating[];
};

function ProfessionalProfile() {
  const { id } = useParams<{ id: string }>(); // pega o ID da URL
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProfessional = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/v1/professionals/${id}/`);
        if (!response.ok) {
          throw new Error("Erro ao carregar dados do profissional");
        }

        const data: Professional = await response.json();
        setProfessional(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessional();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-blue-500 text-xl font-bold">
        Carregando...
      </div>
    );
  }

  if (error || !professional) {
    return (
      <div className="text-center text-red-500 text-xl font-bold">
        {error ?? "Profissional não encontrado!"}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-4xl font-bold text-blue-700 mb-2">
        {professional.name}
      </h2>
      <p className="text-xl text-gray-600 mb-4">{professional.profession}</p>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Sobre</h3>
        <p className="text-gray-700">{professional.bio}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Serviços</h3>
        <ul className="list-disc list-inside text-gray-700">
          {professional.services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">Avaliações</h3>
        {professional.ratings.length > 0 ? (
          professional.ratings.map((rating) => (
            <div
              key={rating.id}
              className="bg-gray-50 rounded-lg p-4 mb-3 border-l-4 border-blue-500"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{rating.client}</span>
                <div className="text-yellow-500">
                  {"⭐".repeat(rating.stars)}
                </div>
              </div>
              <p className="italic text-gray-700">"{rating.comment}"</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            Este profissional ainda não tem avaliações.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfessionalProfile;
