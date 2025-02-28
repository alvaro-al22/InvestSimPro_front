import React from 'react';
import { TrendingUp, ArrowRight, Shield, LineChart, BarChart2 } from 'lucide-react';

interface HomeViewProps {
  onStartSimulation: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onStartSimulation }) => {
  const features = [
    {
      icon: <LineChart className="h-6 w-6 text-indigo-600" />,
      title: 'Simulaciones Precisas',
      description: 'Utiliza datos históricos reales para simular el rendimiento de tus inversiones.'
    },
    {
      icon: <Shield className="h-6 w-6 text-indigo-600" />,
      title: 'Análisis de Riesgo',
      description: 'Evalúa el riesgo potencial de tus inversiones con nuestras herramientas avanzadas.'
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-indigo-600" />,
      title: 'Múltiples Activos',
      description: 'Simula inversiones en acciones, índices, criptomonedas y más.'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Simula tus Inversiones
          <br />
          <span className="text-indigo-600">Toma Mejores Decisiones</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Descubre el potencial de tus inversiones con simulaciones basadas en datos reales.
          Analiza, compara y optimiza tu estrategia de inversión.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onStartSimulation}
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg"
          >
            Comenzar Ahora
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <a
            href="#demo"
            className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:text-lg"
          >
            Ver Demo
          </a>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-4 mb-4">
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
            </div>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Demo Section */}
      <div id="demo" className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Ejemplo de Simulación</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Parámetros de Ejemplo</h3>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-gray-600">Inversión Inicial</span>
                  <span className="font-semibold">$10,000</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Período</span>
                  <span className="font-semibold">5 años</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Activos</span>
                  <span className="font-semibold">S&P 500, NASDAQ</span>
                </li>
              </ul>
            </div>
            <div className="bg-indigo-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Resultados Simulados</h3>
              <ul className="space-y-4">
                <li className="flex justify-between">
                  <span className="text-gray-600">Valor Final</span>
                  <span className="font-semibold text-green-600">$15,300</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Rendimiento</span>
                  <span className="font-semibold text-green-600">+53%</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Rendimiento Anual</span>
                  <span className="font-semibold text-green-600">8.9%</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Gráfico de Rendimiento</h3>
            <div className="aspect-w-16 aspect-h-9 bg-white rounded-lg p-4">
              {/* Aquí iría el gráfico real */}
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Gráfico de ejemplo
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={onStartSimulation}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Crear Tu Propia Simulación
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">
          ¿Listo para empezar?
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Únete a miles de inversores que ya están tomando mejores decisiones con InvestSim Pro.
        </p>
        <button
          onClick={onStartSimulation}
          className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Comenzar Gratis
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default HomeView;