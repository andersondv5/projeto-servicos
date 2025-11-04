import type { ReactNode } from 'react';

interface DashboardContentProps {
  children: ReactNode;
}

function DashboardContent({ children }: DashboardContentProps) {
  return (
    <main className="flex max-w-full flex-auto flex-col">
      <div className="p-4 lg:p-8">        
        {children}       
      </div>
    </main>
  );
}

export default DashboardContent;