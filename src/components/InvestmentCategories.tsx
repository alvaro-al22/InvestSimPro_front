import React from 'react';
import { TrendingUp, BarChart2, Bitcoin, DollarSign, ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, description, icon, imageUrl, onClick }) => (
  <div 
    className="relative overflow-hidden bg-white rounded-xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
    onClick={onClick}
  >
    <div className="absolute inset-0">
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-full object-cover opacity-20"
      />
    </div>
    <div className="relative p-6">
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center text-indigo-600 font-medium">
        Explorar
        <ArrowRight className="ml-2 h-4 w-4" />
      </div>
    </div>
  </div>
);

interface InvestmentCategoriesProps {
  onCategorySelect: (category: string) => void;
}

const InvestmentCategories: React.FC<InvestmentCategoriesProps> = ({ onCategorySelect }) => {
  const categories = [
    {
      id: 'stocks',
      title: 'Acciones',
      description: 'Invierte en las principales empresas del mundo. Analiza su rendimiento histórico y proyecciones futuras.',
      icon: <TrendingUp className="h-6 w-6 text-indigo-600" />,
      imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'indices',
      title: 'Índices',
      description: 'Explora índices bursátiles globales como S&P 500, NASDAQ, y más. Diversifica tu inversión.',
      icon: <BarChart2 className="h-6 w-6 text-indigo-600" />,
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'crypto',
      title: 'Criptomonedas',
      description: 'Descubre el mundo de las criptomonedas. Analiza tendencias y simula inversiones en Bitcoin, Ethereum y más.',
      icon: <Bitcoin className="h-6 w-6 text-indigo-600" />,
      imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Simula tus Inversiones
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explora diferentes opciones de inversión, analiza su rendimiento histórico
          y simula escenarios futuros con datos reales del mercado.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            imageUrl={category.imageUrl}
            onClick={() => onCategorySelect(category.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default InvestmentCategories;