import React, { useState } from 'react';
import { Search, TrendingUp, ArrowRight, Info } from 'lucide-react';

interface ExplorationViewProps {
  category: string;
  onStartSimulation: (assets: string[]) => void;
}

const ExplorationView: React.FC<ExplorationViewProps> = ({ category, onStartSimulation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  // Datos de ejemplo - En una implementación real, estos vendrían de una API
  const mockAssets = {
    stocks: [
      { id: 'AAPL', name: 'Apple Inc.', price: '175.43', change: '+2.3%' },
      { id: 'GOOGL', name: 'Alphabet Inc.', price: '2,789.23', change: '+1.8%' },
      { id: 'MSFT', name: 'Microsoft Corp.', price: '334.12', change: '+1.5%' },
      { id: 'AMZN', name: 'Amazon.com Inc.', price: '3,421.57', change: '-0.7%' },
    ],
    indices: [
      { id: 'SPX', name: 'S&P 500', price: '4,532.12', change: '+1.2%' },
      { id: 'NDX', name: 'NASDAQ 100', price: '15,234.56', change: '+1.7%' },
      { id: 'DJI', name: 'Dow Jones', price: '34,567.89', change: '+0.9%' },
    ],
    crypto: [
      { id: 'BTC', name: 'Bitcoin', price: '45,678.90', change: '+5.4%' },
      { id: 'ETH', name: 'Ethereum', price: '3,234.56', change: '+4.2%' },
      { id: 'BNB', name: 'Binance Coin', price: '412.34', change: '+2.8%' },
    ],
  };

  const assets = mockAssets[category as keyof typeof mockAssets] || [];
  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAsset = (assetId: string) => {
    setSelectedAssets(prev => 
      prev.includes(assetId)
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Explorar {category === 'stocks' ? 'Acciones' : category === 'indices' ? 'Índices' : 'Criptomonedas'}
        </h2>
        {selectedAssets.length > 0 && (
          <button
            onClick={() => onStartSimulation(selectedAssets)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Simular Inversión
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre o símbolo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Seleccionar
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Símbolo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio Actual
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cambio 24h
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <tr 
                  key={asset.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleAsset(asset.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedAssets.includes(asset.id)}
                      onChange={() => toggleAsset(asset.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{asset.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{asset.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${asset.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex text-sm ${
                      asset.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {asset.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExplorationView;