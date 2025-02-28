import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, DollarSign, TrendingUp, Clock, Bell } from 'lucide-react';
import InvestmentForm from './InvestmentForm';
import InvestmentResults from './InvestmentResults';

interface SimulationViewProps {
  category: string;
  selectedAssets: string[];
  onBack: () => void;
  isLoggedIn: boolean;
  onSaveSimulation: () => void;
  onSimulationTypeSelect: (type: 'finite' | 'daily') => void;
  defaultSimulationType: 'finite' | 'daily';
}

const SimulationView: React.FC<SimulationViewProps> = ({ 
  category, 
  selectedAssets, 
  onBack, 
  isLoggedIn,
  onSaveSimulation,
  onSimulationTypeSelect,
  defaultSimulationType
}) => {
  const [results, setResults] = useState(null);
  const [simulationType, setSimulationType] = useState<'finite' | 'daily'>(defaultSimulationType);

  // Actualizar el tipo de simulación cuando cambia el prop
  useEffect(() => {
    setSimulationType(defaultSimulationType);
  }, [defaultSimulationType]);

  const handleSimulationTypeChange = (type: 'finite' | 'daily') => {
    onSimulationTypeSelect(type);
    setSimulationType(type);
  };

  const handleSimulation = (data: any) => {
    // Aquí iría la lógica real de simulación
    const mockResults = {
      initialInvestment: parseFloat(data.amount),
      finalValue: parseFloat(data.amount) * 1.5,
      returnPercentage: 50,
      isPositive: true,
      recommendations: [
        "Diversifica tu cartera para minimizar riesgos",
        "Considera reinvertir las ganancias",
        "Mantén un horizonte de inversión a largo plazo"
      ],
      selectedAssets,
      simulationType,
      dailyUpdates: simulationType === 'daily' ? [
        { date: '2024-05-01', value: parseFloat(data.amount) * 1.02, change: '+2.0%' },
        { date: '2024-05-02', value: parseFloat(data.amount) * 1.03, change: '+1.0%' },
        { date: '2024-05-03', value: parseFloat(data.amount) * 1.025, change: '-0.5%' },
      ] : null
    };
    setResults(mockResults);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Volver
        </button>
        <h2 className="text-2xl font-bold text-gray-900">
          Simular Inversión en {selectedAssets.join(', ')}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
              Configurar Simulación
            </h3>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Simulación
              </label>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleSimulationTypeChange('finite')}
                  className={`px-4 py-2 rounded-md ${
                    simulationType === 'finite' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Con Fecha Fin</span>
                  </div>
                </button>
                <button
                  onClick={() => handleSimulationTypeChange('daily')}
                  className={`px-4 py-2 rounded-md ${
                    simulationType === 'daily' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } ${!isLoggedIn ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!isLoggedIn}
                >
                  <div className="flex items-center">
                    <Bell className="h-4 w-4 mr-2" />
                    <span>Seguimiento Diario</span>
                  </div>
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {simulationType === 'finite' 
                  ? 'Simula tu inversión con una fecha de inicio y fin específicas.' 
                  : 'Recibe actualizaciones diarias sobre el rendimiento de tu inversión.'}
              </p>
              {!isLoggedIn && (
                <p className="mt-2 text-sm text-amber-600">
                  Necesitas iniciar sesión para crear simulaciones de seguimiento diario.
                </p>
              )}
            </div>
            
            <InvestmentForm 
              onSimulate={handleSimulation} 
              simulationType={simulationType}
            />
          </div>

          <div className="mt-6 bg-indigo-50 rounded-xl p-6">
            <div className="flex items-start">
              <TrendingUp className="h-5 w-5 text-indigo-600 mr-2 mt-1 flex-shrink-0" />
              <p className="text-sm text-indigo-900">
                {simulationType === 'finite' 
                  ? 'Simula tus inversiones en diferentes períodos de tiempo. Obtén análisis detallados y recomendaciones personalizadas basadas en datos históricos y predicciones futuras.' 
                  : 'Con el seguimiento diario, recibirás actualizaciones sobre el rendimiento de tu inversión cada día, permitiéndote ajustar tu estrategia en tiempo real.'}
              </p>
            </div>
          </div>
        </div>

        {results && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <TrendingUp className="h-5 w-5 text-indigo-500 mr-2" />
              Resultados del Análisis
            </h3>
            <InvestmentResults results={results} />
            
            {isLoggedIn && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={onSaveSimulation}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Guardar Simulación
                </button>
              </div>
            )}
            
            {!isLoggedIn && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-2">
                  Inicia sesión para guardar esta simulación y recibir actualizaciones.
                </p>
                <button
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Iniciar Sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulationView;