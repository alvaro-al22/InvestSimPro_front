import React, { useState } from 'react';
import { TrendingUp, BookOpen, HelpCircle, User, Briefcase } from 'lucide-react';
import InvestmentCategories from './components/InvestmentCategories';
import ExplorationView from './components/ExplorationView';
import SimulationView from './components/SimulationView';
import HomeView from './components/HomeView';
import BlogView from './components/BlogView';
import SupportView from './components/SupportView';
import UserDashboard from './components/UserDashboard';
import LoginView from './components/LoginView';
import RegisterView from './components/RegisterView';

type ViewType =
  | 'home'
  | 'categories'
  | 'explore'
  | 'simulate'
  | 'blog'
  | 'support'
  | 'dashboard'
  | 'investments'
  | 'login'
  | 'register';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [view, setView] = useState<ViewType>('home');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [simulationType, setSimulationType] = useState<'finite' | 'daily'>('finite');
  const [username, setUsername] = useState(''); // Estado para guardar el nombre de usuario
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controla el menú desplegable

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setView('explore');
  };

  const handleStartSimulation = (assets: string[]) => {
    setSelectedAssets(assets);
    setView('simulate');
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setView('categories');
  };

  const handleLoginClick = () => {
    setView('login');
  };

  const handleSimulationTypeSelect = (type: 'finite' | 'daily') => {
    if (!isLoggedIn && type === 'daily') {
      alert('Necesitas iniciar sesión para crear simulaciones de seguimiento diario');
      return;
    }
    setSimulationType(type);
  };

  // Callback que se ejecuta cuando la autenticación es exitosa.
  // Aquí se establece el estado de autenticación y se guarda el nombre de usuario.
  const handleAuthSuccess = (usernameFromBackend: string) => {
    setIsLoggedIn(true);
    setUsername(usernameFromBackend); // Se almacena el nombre real del usuario
    setView('dashboard');
  };

  // Función para cerrar sesión: borra el token, el estado y redirige al home.
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    localStorage.removeItem('token');
    setView('home');
  };

  const navigationItems = [
    { id: 'home', label: 'Inicio', icon: <TrendingUp className="h-5 w-5" /> },
    { id: 'blog', label: 'Aprende', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'support', label: 'Ayuda', icon: <HelpCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('home')}>
              <TrendingUp className="h-6 w-6 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">InvestSim Pro</h1>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setView(item.id as ViewType)}
                  className={`flex items-center space-x-2 text-sm font-medium ${
                    view === item.id ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}

              {isLoggedIn && (
                <button
                  onClick={() => setView('investments')}
                  className={`flex items-center space-x-2 text-sm font-medium ${
                    view === 'investments' ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Briefcase className="h-5 w-5" />
                  <span>Inversiones</span>
                </button>
              )}
            </nav>

            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    <User className="h-5 w-5" />
                    <span>{username}</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
                      <button
                        onClick={() => {
                          setView('investments');
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Ver inversiones
                      </button>
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {view === 'home' && <HomeView onStartSimulation={() => setView('categories')} />}
        {view === 'categories' && <InvestmentCategories onCategorySelect={handleCategorySelect} />}
        {view === 'explore' && selectedCategory && (
          <ExplorationView category={selectedCategory} onStartSimulation={handleStartSimulation} />
        )}
        {view === 'simulate' && (
          <SimulationView
            category={selectedCategory!}
            selectedAssets={selectedAssets}
            onBack={() => setView('explore')}
            isLoggedIn={isLoggedIn}
            onSaveSimulation={() => setView('dashboard')}
            onSimulationTypeSelect={handleSimulationTypeSelect}
            defaultSimulationType={simulationType}
          />
        )}
        {view === 'blog' && <BlogView />}
        {view === 'support' && <SupportView />}
        {view === 'dashboard' && <UserDashboard onSimulate={() => setView('categories')} />}
        {view === 'investments' && isLoggedIn && <UserDashboard onSimulate={() => setView('categories')} />}
        {view === 'login' && (
          <LoginView onAuthSuccess={handleAuthSuccess} onSwitchToRegister={() => setView('register')} />
        )}
        {view === 'register' && (
          <RegisterView onAuthSuccess={handleAuthSuccess} onSwitchToLogin={() => setView('login')} />
        )}
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Sobre Nosotros</h3>
              <p className="mt-4 text-base text-gray-500">
                InvestSim Pro te ayuda a tomar mejores decisiones de inversión a través de simulaciones basadas en datos reales.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Enlaces Rápidos</h3>
              <ul className="mt-4 space-y-4">
                {navigationItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setView(item.id as ViewType)}
                      className="text-base text-gray-500 hover:text-gray-900"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                    Términos de Uso
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-8 text-center">
            <p className="text-base text-gray-400">&copy; 2024 InvestSim Pro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
