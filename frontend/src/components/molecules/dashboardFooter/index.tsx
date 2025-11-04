import React from 'react';

const DashboardFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="flex grow-0 items-center bg-white">
      <div className="w-full px-4 lg:px-8">
        <div className="flex flex-col gap-2 py-6 text-center text-sm font-medium text-slate-600 md:flex-row md:justify-between md:gap-0 md:text-start">
          <div>
            © <span className="font-semibold">Profissa</span> {currentYear}
          </div>
          <div className="inline-flex items-center justify-center">
            <span>Todos os direitos reservados.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DashboardFooter;