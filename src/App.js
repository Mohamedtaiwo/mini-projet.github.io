// src/App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import AddForm from './components/AddForm';
import DirectoryList from './components/DirectoryList';
import Statistics from './components/Statistics';
import './App.css';
import './Background.css';

function App() {
  const [people, setPeople] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all'); // all, name, job
  const [sortBy, setSortBy] = useState('name'); // name, job, recent
  const [viewMode, setViewMode] = useState('grid'); // grid, list

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
          dateAdded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // Il y a 2 jours
        },
        {
          id: 2,
          name: 'Pierre Martin',
          job: 'Designer UX/UI',
          email: 'pierre.martin@entreprise.com',
          dateAdded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // Il y a 5 jours
        },
        {
          id: 3,
          name: 'Sophie Laurent',
          job: 'Chef de Projet',
          email: 'sophie.laurent@entreprise.com',
          dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // Hier
        },
        {
          id: 4,
          name: 'Thomas Durand',
          job: 'Développeur Backend',
          email: 'thomas.durand@entreprise.com',
          dateAdded: new Date().toISOString() // Aujourd'hui
        },
        {
          id: 5,
          name: 'Claire Moreau',
          job: 'Data Analyst',
          email: 'claire.moreau@entreprise.com',
          dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // Il y a 3 jours
        }
      ];
      setPeople(sampleData);
    }
  }, []);

  // Sauvegarder dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('annuaire-people', JSON.stringify(people));
  }, [people]);

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

  return (
    <div className="app">
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
    </div>
  );
}

export default App;