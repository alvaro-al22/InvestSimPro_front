import React from 'react';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface SimulationResult {
  ticker: string;
  initial_price: number;
  final_price: number;
  final_value: number;
  profit: number;
  return_percentage: number;
}

interface InvestmentResultsProps {
  results: SimulationResult[];
}

const InvestmentResults: React.FC<InvestmentResultsProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No se encontraron resultados de simulación.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {results.map((result, index) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold mb-2">{result.ticker}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Precio Inicial</p>
              <p className="text-lg font-semibold">${result.initial_price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Precio Final</p>
              <p className="text-lg font-semibold">${result.final_price.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Valor Final de Inversión</p>
              <p className="text-lg font-semibold">${result.final_value.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ganancia/Pérdida</p>
              <p className={`text-lg font-semibold ${result.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${result.profit.toFixed(2)}
              </p>
            </div>
            <div className="col-span-2">
              <div className="flex items-center space-x-2">
                {result.profit >= 0 ? (
                  <TrendingUp className="h-5 w-5 text-green-600" />
                ) : (
                  <TrendingDown className="h-5 w-5 text-red-600" />
                )}
                <p className="text-lg font-semibold">
                  {result.return_percentage.toFixed(2)}% de retorno
                </p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <p className="text-sm text-gray-500">
              Simulación realizada para {result.ticker}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvestmentResults;
