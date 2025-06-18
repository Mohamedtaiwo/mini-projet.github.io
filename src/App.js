// src/App.js - Version temporaire sans ThemeSelector
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddForm from './components/AddForm';
import DirectoryList from './components/DirectoryList';
import Statistics from './components/Statistics';
// import ThemeSelector from './components/ThemeSelector'; // COMMENTÉ TEMPORAIREMENT
import PresentationPage from './components/PresentationPage';
import './App.css';
import './Background.css';

function App() {
  const [showPresentation, setShowPresentation] = useState(true);
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [currentTheme, setCurrentTheme] = useState('default');

  // Vérifier si la présentation a déjà été vue
  useEffect(() => {
    const hasSeenPresentation = localStorage.getItem('annuaire-presentation-seen');
    if (hasSeenPresentation === 'true') {
      setShowPresentation(false);
    }
  }, []);

  // Fonction appelée quand la présentation se termine
  const handlePresentationComplete = () => {
    localStorage.setItem('annuaire-presentation-seen', 'true');
    setShowPresentation(false);
  };

  // Charger le thème depuis localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('annuaire-theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Sauvegarder le thème dans localStorage
  useEffect(() => {
    localStorage.setItem('annuaire-theme', currentTheme);
  }, [currentTheme]);

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const savedPeople = localStorage.getItem('annuaire-people');
    if (savedPeople) {
      setPeople(JSON.parse(savedPeople));
    } else {
      // Données d'exemple pour démo
      const sampleData = [
        {
          id: 1,
          name: 'Marie Dubois',
          job: 'Développeuse Frontend',
          email: 'marie.dubois@entreprise.com',
          dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 2,
          name: 'Pierre Martin',
          job: 'Designer UX/UI',
          email: 'pierre.martin@entreprise.com',
          dateAdded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 3,
          name: 'Sophie Laurent',
          job: 'Chef de Projet',
          email: 'sophie.laurent@entreprise.com',
          dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 4,
          name: 'Thomas Durand',
          job: 'Développeur Backend',
          email: 'thomas.durand@entreprise.com',
          dateAdded: new Date().toISOString()
        },
        {
          id: 5,
          name: 'Claire Moreau',
          job: 'Data Analyst',
          email: 'claire.moreau@entreprise.com',
          dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      setPeople(sampleData);
    }
  }, []);

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    if (!showPresentation) {
      localStorage.setItem('annuaire-people', JSON.stringify(people));
    }
  }, [people, showPresentation]);

  // Ajouter une personne
  const addPerson = (newPerson) => {
    const personWithDate = {
      ...newPerson,
      dateAdded: new Date().toISOString()
    };
    setPeople(prev => [...prev, personWithDate]);
  };

  // Supprimer une personne
  const deletePerson = (id) => {
    setPeople(prev => prev.filter(person => person.id !== id));
  };

  // Modifier une personne
  const updatePerson = (id, updatedData) => {
    setPeople(prev => prev.map(person => 
      person.id === id ? { ...person, ...updatedData } : person
    ));
  };

  // Changer de thème
  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
  };

  // Filtrer les données
  const filteredPeople = people.filter(person => {
    const searchLower = searchTerm.toLowerCase();
    
    switch(filterBy) {
      case 'name':
        return person.name.toLowerCase().includes(searchLower);
      case 'job':
        return person.job.toLowerCase().includes(searchLower);
      default:
        return person.name.toLowerCase().includes(searchLower) || 
               person.job.toLowerCase().includes(searchLower) ||
               person.email.toLowerCase().includes(searchLower);
    }
  });

  // Trier les données
  const sortedPeople = [...filteredPeople].sort((a, b) => {
    switch(sortBy) {
      case 'job':
        return a.job.localeCompare(b.job);
      case 'recent':
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // Si la présentation doit être affichée
  if (showPresentation) {
    return <PresentationPage onComplete={handlePresentationComplete} />;
  }

  // Classe CSS pour le thème
  const themeClass = currentTheme === 'default' ? '' : `theme-${currentTheme}`;

  return (
    <div className={`app ${themeClass}`}>
      {/* Arrière-plan avec animations multiples */}
      <div className="background-animation">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
          <div className="shape shape-6"></div>
          <div className="shape shape-7"></div>
          <div className="shape shape-8"></div>
        </div>
      </div>

      {/* Particules lumineuses */}
      <div className="light-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Orbes en mouvement */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Grille subtile */}
      <div className="grid-overlay"></div>

      {/* Vagues en bas */}
      <div className="wave-container">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>

      {/* Sélecteur de thème flottant - COMMENTÉ TEMPORAIREMENT */}
      {/*
      <div className="theme-selector-container">
        <ThemeSelector 
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
        />
      </div>
      */}

      {/* Bouton pour revoir la présentation */}
      <div className="presentation-replay-container">
        <button
          onClick={() => setShowPresentation(true)}
          className="presentation-replay-btn"
          title="Revoir la présentation"
        >
          🎭 Présentation
        </button>
      </div>

      <div className="container">
        <Header 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          totalCount={people.length}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <Statistics people={people} />

        <AddForm onAddPerson={addPerson} />

        <DirectoryList 
          people={sortedPeople}
          onDeletePerson={deletePerson}
          onUpdatePerson={updatePerson}
          viewMode={viewMode}
          searchTerm={searchTerm}
        />

        {people.length === 0 && (
          <div className="empty-state">
            <div className="empty-illustration">
              <div className="empty-icon">👥</div>
              <h3>Aucun collaborateur</h3>
              <p>Commencez par ajouter votre premier collaborateur à l'annuaire</p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .presentation-replay-container {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 100;
          animation: slideInLeft 0.6s ease-out;
        }

        .presentation-replay-btn {
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .presentation-replay-btn:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .presentation-replay-container {
            top: 10px;
            left: 10px;
          }

          .presentation-replay-btn {
            padding: 10px 16px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .presentation-replay-container {
            top: 5px;
            left: 5px;
          }

          .presentation-replay-btn {
            padding: 8px 12px;
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;