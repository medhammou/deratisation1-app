import { useState } from 'react';

interface SidebarProps {
  onSectionChange: (section: string) => void;
  activeSection: string;
}

const Sidebar = ({ onSectionChange, activeSection }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const sections = [
    { id: 'analyse', title: '1. Analyse des Besoins' },
    { id: 'architecture', title: '2. Architecture Fonctionnelle' },
    { id: 'mobile', title: '3. Application Mobile' },
    { id: 'web', title: '4. Application Web' },
    { id: 'technologies', title: '5. Technologies Recommandées' },
    { id: 'ameliorations', title: '6. Améliorations Proposées' },
    { id: 'developpement', title: '7. Démarches de Développement' },
  ];

  return (
    <div className={`bg-gray-100 h-screen ${isOpen ? 'w-64' : 'w-16'} transition-all duration-300 fixed left-0 top-0 shadow-md`}>
      <div className="p-4 flex justify-between items-center border-b border-gray-200">
        <h2 className={`font-bold text-gray-800 ${isOpen ? 'block' : 'hidden'}`}>Sommaire</h2>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="p-2 rounded-md hover:bg-gray-200"
        >
          {isOpen ? '◀' : '▶'}
        </button>
      </div>
      <nav className="p-2">
        <ul>
          {sections.map((section) => (
            <li key={section.id} className="mb-2">
              <button
                onClick={() => onSectionChange(section.id)}
                className={`p-2 rounded-md w-full text-left ${
                  activeSection === section.id 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-gray-200'
                } ${!isOpen ? 'px-2' : 'px-4'} transition-all`}
              >
                {isOpen ? section.title : section.title.charAt(0)}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
