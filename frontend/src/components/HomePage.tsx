import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Job = {
  id: number;
  title: string;
  description: string;
  price: string;
  professional: number;
  category: number;
};

function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://127.0.0.1:8000/api/v1/jobs/");
        if (!response.ok) {
          throw new Error("Erro ao carregar jobs.");
        }

        const data = await response.json();
        setJobs(data.results); 
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center text-blue-500 font-bold">Carregando jobs...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-bold">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Encontre o serviço que você precisa
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105">
            <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
            <p className="text-gray-700 my-2">{job.description}</p>
            <p className="text-blue-600 font-semibold">Preço: R$ {job.price}</p>
            <Link
              to={`/professional/${job.professional}`}
              className="text-sm text-blue-500 mt-2 inline-block"
            >
              Ver profissional
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
