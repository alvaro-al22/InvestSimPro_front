import React, { useState } from 'react';
import { Calendar, DollarSign, Clock } from 'lucide-react';

interface InvestmentFormProps {
  onSimulate: (data: any) => void;
  simulationType: 'finite' | 'daily';
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ onSimulate, simulationType }) => {
  const [formData, setFormData] = useState({
    amount: '',
    startDate: '',
    endDate: '',
    reinvestDividends: false,
    riskLevel: 'moderate',
    notificationFrequency: 'daily'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSimulate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Cantidad a Invertir
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha de Inicio
        </label>
        <div className="mt-1">
          <input
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      {simulationType === 'finite' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Fecha Final
          </label>
          <div className="mt-1">
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
      )}

      {simulationType === 'daily' && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Frecuencia de Notificaciones
          </label>
          <select
            value={formData.notificationFrequency}
            onChange={(e) => setFormData({ ...formData, notificationFrequency: e.target.value })}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="daily">Diaria</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensual</option>
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nivel de Riesgo
        </label>
        <select
          value={formData.riskLevel}
          onChange={(e) => setFormData({ ...formData, riskLevel: e.target.value })}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="conservative">Conservador</option>
          <option value="moderate">Moderado</option>
          <option value="aggressive">Agresivo</option>
        </select>
      </div>

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="reinvestDividends"
            type="checkbox"
            checked={formData.reinvestDividends}
            onChange={(e) => setFormData({ ...formData, reinvestDividends: e.target.checked })}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="reinvestDividends" className="font-medium text-gray-700">
            Reinvertir Dividendos
          </label>
          <p className="text-gray-500">Reinvierte automáticamente los dividendos generados.</p>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {simulationType === 'finite' ? 'Simular Inversión' : 'Iniciar Seguimiento Diario'}
      </button>
    </form>
  );
};

export default InvestmentForm;