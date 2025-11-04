import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import * as yup from "yup";
import api from "../services/api";
import type { Category } from "../lib/types/types";
import type { JobFormData } from "../lib/types/types";
import Button from "../components/atoms/button";
import DashboardContent from "../components/molecules/dashboardContent";

// Schema de validação com Yup
const schema = yup.object().shape({
  title: yup.string().required("Título de serviço obrigatório"),
  description: yup.string().required("Descrição obrigatória"),
  price: yup
    .number()
    .typeError("Preço deve ser um número")
    .positive("Preço deve ser positivo")
    .required("Preço obrigatório"),
  category: yup
    .number()
    .typeError("Categoria obrigatória")
    .required("Categoria obrigatória")
    .test("is-valid-category", "Selecione uma categoria válida", (value) => {
      return (
        value !== undefined && value !== null && !isNaN(value) && value > 0
      );
    }),
});

function JobFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JobFormData>({
    resolver: yupResolver(schema),
  });

  // Buscar categorias da API
  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => api.get("/api/v1/job-categories/").then((res) => res.data),
  });

  const categories = categoriesData?.results || [];

  // Se houver ID, está em modo de edição, busca o serviço para preencher o formulário
  useEffect(() => {
    if (id) {
      api.get(`/api/v1/jobs/${id}/`).then((res) => {
        const job = res.data;
        setValue("title", job.title);
        setValue("description", job.description);
        setValue("price", Number(job.price)); // Garantindo tipo numérico
        setValue("category", job.category);
      });
    }
  }, [id, setValue]);

  const onSubmit = async (data: JobFormData) => {
    try {
      if (id) {
        await api.put(`/api/v1/jobs/${id}/`, data);
      } else {
        await api.post("/api/v1/jobs/", data);
      }
      navigate("/dashboard");
    } catch (error) {
      alert(`Erro ao salvar serviço: ${error}.`);
    }
  };

  return (
    <DashboardContent>
      <div className="flex items-center justify-center w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
        >
          <h1 className="text-xl font-bold text-gray-900 mb-6">
            {id ? "Editar Serviço" : "Novo Serviço"}
          </h1>

          <input
            {...register("title")}
            placeholder="Título do Serviço"
            className="bg-(--second-color) text-gray-500 w-full p-3 mb-2 rounded-lg focus:outline-none focus:bg-(--third-color) text-sm"
          />
          <p className="text-red-500 text-sm mb-4">{errors.title?.message}</p>

          <textarea
            {...register("description")}
            placeholder="Descrição"
            className="bg-(--second-color) text-gray-500 w-full p-3 mb-2 rounded-lg focus:outline-none focus:bg-(--third-color) text-sm"
            rows={4}
          />
          <p className="text-red-500 text-sm mb-4">
            {errors.description?.message}
          </p>

          <input
            {...register("price")}
            type="number"
            step="0.01"
            placeholder="Preço"
            className="bg-(--second-color) text-gray-500 w-full p-3 mb-2 rounded-lg focus:outline-none focus:bg-(--third-color) text-sm"
          />
          <p className="text-red-500 text-sm mb-4">{errors.price?.message}</p>

          {/* Select de Categorias */}
          <div className="mb-4">
            <select
              {...register("category", {
                valueAsNumber: true,
              })}
              className="bg-(--second-color) text-gray-500 w-full p-3 mb-2 rounded-lg focus:outline-none focus:bg-(--third-color) text-sm"
              disabled={categoriesLoading}
            >
              <option value="">Selecione uma categoria</option>
              {categoriesLoading ? (
                <option disabled>Carregando categorias...</option>
              ) : (
                categories.map((category: Category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
            <p className="text-red-500 text-sm mt-1">
              {errors.category?.message}
            </p>
            {categoriesLoading && (
              <p className="text-blue-500 text-sm mt-1">
                Carregando categorias...
              </p>
            )}
          </div>

          <Button variant="primary" className="w-full" type="submit">
            {id ? "Atualizar Serviço" : "Cadastrar Serviço"}
          </Button>
        </form>
      </div>
    </DashboardContent>
  );
}

export default JobFormPage;
