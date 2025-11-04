import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import Button from "../components/atoms/button";

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-(--second-color) flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        <div className="mb-4">
          <div className="mx-auto flex items-center justify-center">
            <FaExclamationTriangle size={80} className="text-yellow-500" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Página não encontrada
        </h2>
        <p className="text-gray-600 mb-8 text-lg">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" icon={<FaHome />} to="/">
            Voltar para Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
