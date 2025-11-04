function LoadingFallback() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <span className="ml-3 text-gray-700 text-lg font-medium">
        Carregando...
      </span>
    </div>
  );
}

export default LoadingFallback;
