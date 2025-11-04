import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";
import { FaRegTrashAlt, FaPencilAlt } from "react-icons/fa";
import Button from "../../atoms/button";
import type { Category } from "../../../lib/types/types";

function CategoriesList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  const {
    data: categoriesData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories", page],
    queryFn: () =>
      api.get(`/api/v1/job-categories/?page=${page}`).then((res) => res.data),
  });

  const categories = categoriesData?.results || [];

  const handleDelete = async (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        await api.delete(`/api/v1/job-categories/${id}/`);
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      } catch (error) {
        alert(`Erro ao excluir categoria: ${error}.`);
      }
    }
  };

  if (isLoading)
    return <p className="text-center mt-10">Carregando categorias...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Erro ao carregar as categorias.
      </p>
    );

  return (
    <div className="overflow-hidden rounded-xl bg-white sm:col-span-12">
      <div className="px-6 pt-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Categorias</h2>
            <h3 className="text-sm font-medium text-slate-500">
              {categoriesData?.count
                ? `Total de ${categoriesData.count} categorias`
                : "Gerencie suas categorias aqui"}
            </h3>
          </div>
          <Button variant="outline" to="/dashboard/categories/new">
            Nova Categoria
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Tabela de categorias */}
        <div className="min-w-full overflow-x-auto rounded-sm">
          <table className="min-w-full align-middle text-sm">
            <thead>
              <tr className="border-b-2 border-slate-100">
                <th className="px-3 py-2 text-start text-sm font-semibold uppercase tracking-wider text-slate-700">
                  Nome
                </th>
                <th className="hidden px-3 py-2 text-start text-sm font-semibold uppercase tracking-wider text-slate-700 md:table-cell">
                  Descrição
                </th>
                <th className="px-3 py-2 text-end text-sm font-semibold uppercase tracking-wider text-slate-700">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: Category, index: number) => (
                <tr
                  key={category.id}
                  className={`hover:bg-(--third-color) ${
                    index % 2 === 1 ? "bg-(--second-color)" : ""
                  }`}
                >
                  <td className="p-3 text-start font-medium">
                    {category.name}
                    <div className="text-xs text-slate-500 mt-1 md:hidden">
                      {category.description || "Sem descrição"}
                    </div>
                  </td>
                  <td className="hidden p-3 text-slate-600 md:table-cell">
                    {category.description || "Sem descrição"}
                  </td>
                  <td className="p-3 text-end">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/categories/${category.id}/edit`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 px-2 py-2 rounded w-auto cursor-pointer"
                        title="Editar categoria"
                      >
                        <FaPencilAlt className="w-3 h-3 text-white" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="bg-red-600 hover:bg-red-700 px-2 py-2 rounded w-auto cursor-pointer"
                        title="Excluir categoria"
                      >
                        <FaRegTrashAlt className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Mensagem quando não há categorias */}
          {categories.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              Nenhuma categoria encontrada. Crie sua primeira categoria!
            </div>
          )}
        </div>

        {/* Paginação */}
        {categoriesData && (categoriesData.previous || categoriesData.next) && (
          <div className="flex justify-center items-center mt-8 space-x-4">
            <button
              onClick={() => setPage(page - 1)}
              disabled={!categoriesData.previous}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
              Anterior
            </button>

            <span className="text-sm text-slate-600">
              Página {page}{" "}
              {categoriesData.count && `de ${Math.ceil(categoriesData.count / 10)}`}
            </span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={!categoriesData.next}
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

export default CategoriesList;