// src/components/DirectoryList.js
import React from 'react';
import PersonCard from './PersonCard';

const DirectoryList = ({ 
  people, 
  onDeletePerson, 
  onUpdatePerson, 
  viewMode, 
  searchTerm 
}) => {
  if (people.length === 0 && searchTerm) {
    return (
      <div className="no-results">
        <div className="no-results-content">
          <div className="no-results-icon">🔍</div>
          <h3>Aucun résultat</h3>
          <p>Aucun collaborateur ne correspond à votre recherche "{searchTerm}"</p>
          <div className="search-suggestions">
            <p>Suggestions :</p>
            <ul>
              <li>Vérifiez l'orthographe</li>
              <li>Essayez des termes plus généraux</li>
              <li>Recherchez par nom ou métier</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="directory-container">
      {searchTerm && (
        <div className="search-results-header">
          <span className="results-count">
            {people.length} résultat{people.length > 1 ? 's' : ''} 
            {searchTerm && ` pour "${searchTerm}"`}
          </span>
        </div>
      )}

      <div className={`directory-list ${viewMode}`}>
        {people.map((person, index) => (
          <div 
            key={person.id} 
            className="person-item"
            style={{ 
              animationDelay: `${index * 0.1}s`,
              animation: 'slideInUp 0.6s ease-out forwards'
            }}
          >
            <PersonCard
              person={person}
              onDelete={onDeletePerson}
              onUpdate={onUpdatePerson}
              viewMode={viewMode}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .directory-container {
          position: relative;
        }

        .search-results-header {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .results-count {
          color: #4a5568;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .directory-list {
          display: grid;
          gap: 1.5rem;
        }

        .directory-list.grid {
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }

        .directory-list.list {
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .person-item {
          opacity: 0;
          transform: translateY(30px);
        }

        .no-results {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 400px;
          padding: 2rem;
        }

        .no-results-content {
          text-align: center;
          background: rgba(255, 255, 255, 0.95);
          padding: 3rem 2rem;
          border-radius: 20px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          max-width: 400px;
        }

        .no-results-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          animation: searchBounce 2s ease-in-out infinite;
        }

        @keyframes searchBounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        .no-results-content h3 {
          color: #2d3748;
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }

        .no-results-content > p {
          color: #718096;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .search-suggestions {
          background: #f7fafc;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: left;
        }

        .search-suggestions p {
          font-weight: 500;
          color: #4a5568;
          margin-bottom: 0.75rem;
        }

        .search-suggestions ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .search-suggestions li {
          color: #718096;
          padding: 0.25rem 0;
          position: relative;
          padding-left: 1.25rem;
        }

        .search-suggestions li::before {
          content: "→";
          position: absolute;
          left: 0;
          color: #a0aec0;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .directory-list.grid {
            grid-template-columns: 1fr;
          }
          
          .no-results-content {
            margin: 1rem;
            padding: 2rem 1rem;
          }
          
          .search-suggestions {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .directory-list {
            gap: 1rem;
          }
          
          .no-results-icon {
            font-size: 3rem;
          }
          
          .no-results-content h3 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DirectoryList;