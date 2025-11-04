import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import Button from "../../atoms/button";

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

function ServicesByProfessional() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const {
    data: servicesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services", page],
    queryFn: () =>
      api.get(`/api/v1/jobs/?page=${page}`).then((res) => res.data),
  });

  // Buscar categorias da API
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("/api/v1/job-categories/").then((res) => res.data),
  });

  const categories = categoriesData?.results || [];
  const services = servicesData?.results || [];

  // Função para buscar o nome da categoria pelo ID
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat: Category) => cat.id === categoryId);
    return category ? category.name : "Categoria não encontrada";
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este serviço?")) {
      try {
        await api.delete(`/api/v1/jobs/${id}/`);
        queryClient.invalidateQueries({ queryKey: ["services"] });
      } catch (error) {
        alert(`Erro ao excluir serviço: ${error}.`);
      }
    }
  };

  const formatPrice = (price: string) => {
    return `R$ ${Number(price).toFixed(2)}`;
  };

  if (isLoading)
    return <p className="text-center mt-10">Carregando serviços...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Erro ao carregar os serviços.
      </p>
    );

  return (
    <div className="overflow-hidden rounded-xl bg-white sm:col-span-12">
      <div className="px-6 pt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Serviços</h2>
            <h3 className="text-sm font-medium text-slate-500">
              {servicesData?.count
                ? `Total de ${servicesData.count} serviços`
                : "Gerencie seus serviços aqui"}
            </h3>
          </div>
          <Button variant="outline" to="/dashboard/jobs/new">
            Adicionar Serviço
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Tabela de serviços */}
        <div className="min-w-full overflow-x-auto rounded-sm">
          <table className="min-w-full align-middle text-sm">
            <thead>
              <tr className="border-b-2 border-slate-100">
                <th className="px-3 py-2 text-start text-sm font-semibold uppercase tracking-wider text-slate-700">
                  Título
                </th>
                <th className="hidden px-3 py-2 text-start text-sm font-semibold uppercase tracking-wider text-slate-700 md:table-cell">
                  Categoria
                </th>
                <th className="hidden px-3 py-2 text-end text-sm font-semibold uppercase tracking-wider text-slate-700 md:table-cell">
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service: Service, index: number) => (
                <tr
                  key={service.id}
                  className={`hover:bg-(--third-color) ${
                    index % 2 === 1 ? "bg-(--second-color)" : ""
                  }`}
                >
                  <td className="p-3 text-start">
                    {service.title}
                    <div className="text-xs text-slate-500 mt-1 md:hidden">
                      {getCategoryName(service.category)}
                    </div>
                  </td>
                  <td className="hidden p-3 text-slate-600 md:table-cell">
                    {getCategoryName(service.category)}
                  </td>
                  <td className="hidden p-3 text-end font-medium md:table-cell">
                    {formatPrice(service.price)}
                  </td>
                  <td className="p-3 text-end font-medium">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/jobs/${service.id}/edit/`)
                      }
                      className="bg-blue-600 hover:bg-blue-700 px-2 py-2 me-2 rounded w-auto cursor-pointer"
                    >
                      <FaPencilAlt className="w-3 h-3 text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="bg-red-600 hover:bg-red-700 px-2 py-2 rounded w-auto cursor-pointer"
                    >
                      <FaRegTrashAlt className="w-3 h-3 text-white" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mensagem quando não há serviços */}
          {services.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              Nenhum serviço encontrado. Crie seu primeiro serviço!
            </div>
          )}
        </div>

        {/* Paginação */}
        {servicesData && (servicesData.previous || servicesData.next) && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={!servicesData.previous}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              Anterior
            </button>

            <span className="text-sm text-slate-600">
              Página {page}{" "}
              {servicesData.count && `de ${Math.ceil(servicesData.count / 10)}`}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={!servicesData.next}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              Próximo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ServicesByProfessional;
