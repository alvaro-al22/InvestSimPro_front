import React, { useState } from 'react';
import { TrendingUp, Clock, ArrowUpRight, ArrowDownRight, Plus, Bell, Calendar, Filter } from 'lucide-react';

interface UserDashboardProps {
  onSimulate: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onSimulate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'finite' | 'daily'>('all');
  
  const savedSimulations = [
    {
      id: 1,
      name: 'Cartera Tech',
      assets: ['AAPL', 'GOOGL', 'MSFT'],
      initialInvestment: 10000,
      currentValue: 12500,
      change: '+25%',
      isPositive: true,
      date: '2024-01-15',
      type: 'finite',
      endDate: '2024-12-31'
    },
    {
      id: 2,
      name: 'Crypto Mix',
      assets: ['BTC', 'ETH'],
      initialInvestment: 5000,
      currentValue: 4750,
      change: '-5%',
      isPositive: false,
      date: '2024-02-01',
      type: 'finite',
      endDate: '2024-08-01'
    },
    {
      id: 3,
      name: 'Seguimiento S&P 500',
      assets: ['SPX'],
      initialInvestment: 8000,
      currentValue: 8240,
      change: '+3%',
      isPositive: true,
      date: '2024-04-15',
      type: 'daily',
      lastUpdate: '2024-05-03'
    }
  ];

  const filteredSimulations = activeTab === 'all' 
    ? savedSimulations 
    : savedSimulations.filter(sim => sim.type === activeTab);

  const dailySimulations = savedSimulations.filter(sim => sim.type === 'daily');
  const finiteSimulations = savedSimulations.filter(sim => sim.type === 'finite');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mis Inversiones</h1>
        <button
          onClick={onSimulate}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Nueva Simulación
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Total Invertido</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$23,000</p>
          <p className="text-sm text-gray-500 mt-2">En simulaciones activas</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Valor Actual</h3>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900">$25,490</p>
          <p className="text-sm text-green-600 mt-2">+10.8% total</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Simulaciones</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{savedSimulations.length}</p>
          <div className="flex text-sm text-gray-500 mt-2 space-x-2">
            <span>{finiteSimulations.length} con fecha fin</span>
            <span>•</span>
            <span>{dailySimulations.length} diarias</span>
          </div>
        </div>
      </div>

      {dailySimulations.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Bell className="h-5 w-5 text-indigo-600 mr-2" />
              Actualizaciones Recientes
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {dailySimulations.map(sim => (
                <div key={`update-${sim.id}`} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-gray-900">{sim.name}</h3>
                    <span className="text-sm text-gray-500">{sim.lastUpdate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Valor actual: ${sim.currentValue}</span>
                    <span className={`inline-flex items-center text-sm ${
                      sim.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {sim.isPositive ? (
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                      )}
                      {sim.change} hoy
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Simulaciones Guardadas</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 text-sm rounded-md ${
                  activeTab === 'all' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setActiveTab('finite')}
                className={`px-3 py-1 text-sm rounded-md flex items-center ${
                  activeTab === 'finite' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar className="h-3 w-3 mr-1" />
                Con Fecha Fin
              </button>
              <button
                onClick={() => setActiveTab('daily')}
                className={`px-3 py-1 text-sm rounded-md flex items-center ${
                  activeTab === 'daily' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Bell className="h-3 w-3 mr-1" />
                Seguimiento Diario
              </button>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {filteredSimulations.map((simulation) => (
            <div key={simulation.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">{simulation.name}</h3>
                  {simulation.type === 'daily' && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      <Bell className="h-3 w-3 mr-1" />
                      Diaria
                    </span>
                  )}
                  {simulation.type === 'finite' && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      <Calendar className="h-3 w-3 mr-1" />
                      Fecha Fin
                    </span>
                  )}
                </div>
                <span className="text-sm text-gray-500">
                  {simulation.type === 'finite' 
                    ? `${simulation.date} - ${simulation.endDate}` 
                    : `Desde ${simulation.date}`}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Activos</p>
                  <p className="font-medium text-gray-900">{simulation.assets.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Inversión Inicial</p>
                  <p className="font-medium text-gray-900">${simulation.initialInvestment}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Valor Actual</p>
                  <p className="font-medium text-gray-900">${simulation.currentValue}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Cambio</p>
                  <p className={`font-medium flex items-center ${
                    simulation.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {simulation.isPositive ? (
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 mr-1" />
                    )}
                    {simulation.change}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex space-x-4">
                <button className="text-sm text-indigo-600 hover:text-indigo-800">
                  Ver Detalles
                </button>
                <button className="text-sm text-indigo-600 hover:text-indigo-800">
                  {simulation.type === 'finite' ? 'Actualizar Simulación' : 'Ver Historial'}
                </button>
                <button className="text-sm text-red-600 hover:text-red-800">
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <TrendingUp className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Recomendaciones Personalizadas</h3>
            <p className="mt-2 text-gray-600">
              Basado en tus simulaciones actuales, te recomendamos diversificar tu cartera añadiendo índices
              para reducir el riesgo. Considera explorar el S&P 500 o fondos indexados similares.
            </p>
            <button
              onClick={onSimulate}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Crear Nueva Simulación con Índices
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;