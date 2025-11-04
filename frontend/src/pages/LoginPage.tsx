import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../lib/context/AuthContext";
import type { LoginFormInputs } from "../lib/types/types";
import Button from "../components/atoms/button";
import Logo from "../components/atoms/logo";
import Input from "../components/atoms/input";

// Schema de validação com Yup
const schema = yup.object().shape({
  username: yup.string().required("Usuário obrigatório"),
  password: yup
    .string()
    .min(5, "Mínimo 5 caracteres")
    .required("Senha obrigatória"),
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.username, data.password);
      navigate("/dashboard");
    } catch (error) {
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-2xl shadow-md w-full max-w-md"
      >
        <div className="flex justify-center items-center mb-6">
          <Logo size="lg" />
        </div>

        <Input register={register} name="username" placeholder="Usuário" />
        <p className="text-red-500 text-sm mb-4">{errors.username?.message}</p>

        <Input
          type="password"
          register={register}
          name="password"
          placeholder="Senha"
        />
        <p className="text-red-500 text-sm mb-6">{errors.password?.message}</p>
        <Button variant="primary" to="/login" className="w-full" type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
