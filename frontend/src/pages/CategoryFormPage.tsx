import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import api from "../services/api";
import Button from "../components/atoms/button";
import type { CategoryFormData } from "../lib/types/types";
import DashboardContent from "../components/molecules/dashboardContent";
// Tipo para os dados do formulário de categoria

// Schema de validação com Yup
const schema = yup.object().shape({
  name: yup.string().required("Nome da categoria é obrigatório"),
  description: yup.string().required("Descrição é obrigatória"),
});

function CategoryFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: yupResolver(schema),
  });

  // Se houver ID, está em modo de edição, busca a categoria para preencher o formulário
  useEffect(() => {
    if (id) {
      api
        .get(`/api/v1/job-categories/${id}/`)
        .then((res) => {
          const category = res.data;
          setValue("name", category.name);
          setValue("description", category.description);
        })
        .catch(() => {
          navigate("/dashboard/categories");
        });
    }
  }, [id, setValue, navigate]);

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (id) {
        await api.put(`/api/v1/job-categories/${id}/`, data);
      } else {
        await api.post("/api/v1/job-categories/", data);
      }
      navigate("/dashboard/categories"); // ou para onde quiser redirecionar após salvar
    } catch (error) {
      alert(`Erro ao salvar categoria: ${error}.`);
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
            {id ? "Editar Categoria" : "Nova Categoria"}
          </h1>

          {/* Campo Nome */}
          <div className="mb-4">
            <input
              {...register("name")}
              placeholder="Nome da Categoria"
              className="bg-(--second-color) text-gray-500 w-full p-3 rounded-lg focus:outline-none focus:bg-(--third-color) text-sm"
            />
            <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
          </div>

          {/* Campo Descrição */}
          <div className="mb-6">
            <textarea
              {...register("description")}
              placeholder="Descrição da Categoria"
              className="bg-(--second-color) text-gray-500 w-full p-3 rounded-lg focus:outline-none focus:bg-(--third-color) text-sm"
              rows={4}
            />
            <p className="text-red-500 text-sm mt-1">
              {errors.description?.message}
            </p>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Salvando..."
                : id
                ? "Atualizar Categoria"
                : "Criar Categoria"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardContent>
  );
}

export default CategoryFormPage;
