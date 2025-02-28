import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Calendar, Bell } from 'lucide-react';

interface InvestmentResultsProps {
  results: any;
}

const InvestmentResults: React.FC<InvestmentResultsProps> = ({ results }) => {
  // Usamos los resultados pasados como prop o simulamos datos para demostración
  const mockResults = results || {
    initialInvestment: 1000,
    finalValue: 1500,
    returnPercentage: 50,
    isPositive: true,
    simulationType: 'finite',
    recommendations: [
      "Diversifica tu cartera para minimizar riesgos",
      "Considera reinvertir las ganancias",
      "Mantén un horizonte de inversión a largo plazo"
    ],
    dailyUpdates: [
      { date: '2024-05-01', value: 1020, change: '+2.0%' },
      { date: '2024-05-02', value: 1030, change: '+1.0%' },
      { date: '2024-05-03', value: 1025, change: '-0.5%' },
    ]
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Inversión Inicial</span>
            <span className="text-lg font-semibold">${mockResults.initialInvestment}</span>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Valor Final</span>
            <span className="text-lg font-semibold">${mockResults.finalValue}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          {mockResults.isPositive ? (
            <TrendingUp className="h-5 w-5 text-green-500" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-500" />
          )}
          <span className="text-lg font-semibold">
            {mockResults.returnPercentage}% de retorno
          </span>
        </div>
      </div>

      {mockResults.simulationType === 'daily' && mockResults.dailyUpdates && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-indigo-50 px-4 py-3 border-b">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-indigo-600 mr-2" />
              <h3 className="text-sm font-medium text-indigo-900">Actualizaciones Diarias</h3>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {mockResults.dailyUpdates.map((update: any, index: number) => (
              <div key={index} className="px-4 py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{update.date}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium mr-3">${update.value.toFixed(2)}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    update.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {update.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t pt-6">
        <h3 className="text-lg font-medium mb-4">Recomendaciones</h3>
        <div className="space-y-3">
          {mockResults.recommendations.map((rec: string, index: number) => (
            <div key={index} className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-600">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {mockResults.simulationType === 'daily' && (
        <div className="bg-indigo-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-indigo-900">
            <Bell className="h-5 w-5" />
            <p className="text-sm">
              Recibirás actualizaciones diarias sobre el rendimiento de tu inversión. 
              Puedes ajustar la frecuencia de notificaciones en cualquier momento.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentResults;