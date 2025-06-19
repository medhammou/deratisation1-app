import { useState } from 'react';
import Sidebar from './components/Sidebar';

// Sections content components
import AnalyseBesoins from './components/sections/AnalyseBesoins';
import Architecture from './components/sections/Architecture';
import AppMobile from './components/sections/AppMobile';
import AppWeb from './components/sections/AppWeb';
import Technologies from './components/sections/Technologies';
import Ameliorations from './components/sections/Ameliorations';
import Developpement from './components/sections/Developpement';

function App() {
  const [activeSection, setActiveSection] = useState('analyse');

  const renderContent = () => {
    switch (activeSection) {
      case 'analyse':
        return <AnalyseBesoins />;
      case 'architecture':
        return <Architecture />;
      case 'mobile':
        return <AppMobile />;
      case 'web':
        return <AppWeb />;
      case 'technologies':
        return <Technologies />;
      case 'ameliorations':
        return <Ameliorations />;
      case 'developpement':
        return <Developpement />;
      default:
        return <AnalyseBesoins />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onSectionChange={setActiveSection} activeSection={activeSection} />
      
      <main className="flex-1 p-6 ml-16 md:ml-64 transition-all">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Spécification Fonctionnelle Détaillée
          </h1>
          <h2 className="text-xl text-gray-600">
            Application de Gestion de Dératisation
          </h2>
        </header>
        
        <div className="prose max-w-none">
          {renderContent()}
        </div>
        
        <footer className="mt-12 pt-6 border-t text-center text-gray-500 text-sm">
          © 2025 - Documentation technique - Application de Gestion de Dératisation
        </footer>
      </main>
    </div>
  );
}

export default App;
