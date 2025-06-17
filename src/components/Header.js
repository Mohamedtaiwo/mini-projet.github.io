// src/components/Header.js
import React from 'react';
import { Search, Users, Building, Filter, Grid, List, SortAsc } from 'lucide-react';

const Header = ({ 
  searchTerm, 
  setSearchTerm, 
  totalCount, 
  filterBy, 
  setFilterBy,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode
}) => {
  return (
    <div className="header-container">
      {/* En-tête principal */}
      <div className="header-main">
        {/* Animation de particules */}
        <div className="header-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <div className="header-content">
          <div className="header-title">
            <div className="logo-container">
              <Building className="logo-icon" />
              <div className="logo-pulse"></div>
            </div>
            <div className="title-text">
              <h1>Annuaire Professionnel</h1>
              <p>Gérez vos collaborateurs efficacement</p>
            </div>
          </div>
          
          <div className="header-stats">
            <div className="stat-item">
              <Users className="stat-icon" />
              <div className="stat-info">
                <span className="stat-number">{totalCount}</span>
                <span className="stat-label">Collaborateurs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="search-controls">
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher par nom, métier ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="clear-search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="controls-row">
          {/* Filtres */}
          <div className="filter-group">
            <Filter className="filter-icon" />
            <select 
              value={filterBy} 
              onChange={(e) => setFilterBy(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tous les champs</option>
              <option value="name">Nom uniquement</option>
              <option value="job">Métier uniquement</option>
            </select>
          </div>

          {/* Tri */}
          <div className="sort-group">
            <SortAsc className="sort-icon" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Trier par nom</option>
              <option value="job">Trier par métier</option>
              <option value="recent">Plus récents</option>
            </select>
          </div>

          {/* Mode d'affichage */}
          <div className="view-toggle">
            <button
              onClick={() => setViewMode('grid')}
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            >
              <Grid className="view-icon" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            >
              <List className="view-icon" />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header-container {
          margin-bottom: 2rem;
        }

        .header-main {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 24px;
          padding: 2rem;
          margin-bottom: 1rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .header-particles {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: particleFloat 3s ease-in-out infinite;
        }

        .particle:nth-child(1) {
          top: 20%;
          left: 20%;
          animation-delay: 0s;
        }

        .particle:nth-child(2) {
          top: 60%;
          right: 30%;
          animation-delay: 1s;
        }

        .particle:nth-child(3) {
          bottom: 30%;
          left: 70%;
          animation-delay: 2s;
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .logo-container {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          backdrop-filter: blur(10px);
        }

        .logo-icon {
          width: 30px;
          height: 30px;
          color: white;
          z-index: 2;
        }

        .logo-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .title-text h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: white;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .title-text p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          margin-top: 0.5rem;
        }

        .header-stats {
          display: flex;
          gap: 1rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.15);
          padding: 1rem 1.5rem;
          border-radius: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-icon {
          width: 24px;
          height: 24px;
          color: white;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          display: block;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
          display: block;
        }

        .search-controls {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .search-container {
          margin-bottom: 1rem;
        }

        .search-input-wrapper {
          position: relative;
          max-width: 600px;
          margin: 0 auto;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          color: #718096;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .clear-search {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #718096;
          cursor: pointer;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        .clear-search:hover {
          background: #f7fafc;
        }

        .controls-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        }

        .filter-group, .sort-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-icon, .sort-icon {
          width: 18px;
          height: 18px;
          color: #4a5568;
        }

        .filter-select, .sort-select {
          padding: 0.5rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          background: white;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-select:focus, .sort-select:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
        }

        .view-toggle {
          display: flex;
          background: #f7fafc;
          border-radius: 8px;
          padding: 0.25rem;
        }

        .view-btn {
          padding: 0.5rem;
          border: none;
          background: none;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .view-btn.active {
          background: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .view-icon {
          width: 18px;
          height: 18px;
          color: #4a5568;
        }

        .view-btn.active .view-icon {
          color: #667eea;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .title-text h1 {
            font-size: 2rem;
          }

          .controls-row {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }

          .view-toggle {
            align-self: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Header;