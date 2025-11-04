import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import PageTitle from "../../atoms/pageTitle";
import Badge from "../../atoms/badge";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  category: number;
  created_at: string;
}

interface Category {
  id: number;
  name: string;
}

function AllServices() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data: servicesData, isLoading, error } = useQuery({
    queryKey: ["services", page],
    queryFn: () => api.get(`/api/v1/jobs/?page=${page}`).then(res => res.data),
  });

  // Buscar categorias da API
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("/api/v1/job-categories/").then(res => res.data),
  });

  const categories = categoriesData?.results || [];
  const services = servicesData?.results || [];

  // Função para buscar o nome da categoria pelo ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat: Category) => cat.id === categoryId);
    return category ? category.name : "Categoria não encontrada";
  };

  const formatPrice = (price: string) => {
    return `R$ ${Number(price).toFixed(2)}`;
  };

  if (isLoading) return (
    <div className="text-center text-blue-500 font-bold">
      Carregando serviços...
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 font-bold">
      Erro ao carregar os serviços.
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <PageTitle title="Serviços em Destaque" />

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service: Service) => (
          <div
            key={service.id}
            className="bg-white rounded-lg shadow-sm p-6 cursor-pointer"
            onClick={() => navigate(`dashboard/jobs/${service.id}/edit`)}
          >
            <h3 className="text-xl font-semibold text-(--main-color) mb-4">
              {service.title}
            </h3>
            <p className="text-gray-700 mb-4 line-clamp-3">
              {service.description}
            </p>
            <div className="flex justify-between items-center">
              

              <Badge name={getCategoryName(service.category)}/>
              <p className="text-gray-700 font-semibold">
                {formatPrice(service.price)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem quando não há serviços */}
      {services.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            Nenhum serviço encontrado
          </div>
          <button
            onClick={() => navigate("dashboard/jobs/new")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200"
          >
            Criar Primeiro Serviço
          </button>
        </div>
      )}

      {/* Paginação */}
      {servicesData && (servicesData.previous || servicesData.next) && (
        <div className="flex justify-center items-center mt-12 space-x-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={!servicesData.previous}
            className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium"
          >
            Anterior
          </button>
          
          <span className="text-sm text-gray-600 font-medium">
            Página {page} {servicesData.count && `de ${Math.ceil(servicesData.count / 10)}`}
          </span>
          
          <button
            onClick={() => setPage(page + 1)}
            disabled={!servicesData.next}
            className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium"
          >
            Próximo
          </button>
        </div>
      )}
    </div>
  );
}

export default AllServices;