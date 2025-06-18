// src/components/ThemeSelector.js
import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';

const ThemeSelector = ({ currentTheme, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    {
      id: 'default',
      name: 'Original',
      description: 'Violet-rose élégant',
      colors: ['#667eea', '#764ba2', '#f093fb']
    },
    {
      id: 'blue',
      name: 'Bleu Pro',
      description: 'Professionnel moderne',
      colors: ['#1e3a8a', '#3b82f6', '#60a5fa']
    },
    {
      id: 'green',
      name: 'Vert Croissance',
      description: 'Dynamique et frais',
      colors: ['#064e3b', '#10b981', '#6ee7b7']
    },
    {
      id: 'orange',
      name: 'Orange Énergie',
      description: 'Vibrant et chaleureux',
      colors: ['#c2410c', '#f97316', '#fb923c']
    },
    {
      id: 'purple',
      name: 'Violet Créatif',
      description: 'Élégant et créatif',
      colors: ['#581c87', '#8b5cf6', '#c4b5fd']
    },
    {
      id: 'pink',
      name: 'Rose Innovation',
      description: 'Moderne et audacieux',
      colors: ['#be185d', '#ec4899', '#f9a8d4']
    },
    {
      id: 'cyan',
      name: 'Cyan Tech',
      description: 'Frais et technologique',
      colors: ['#0f766e', '#06b6d4', '#67e8f9']
    },
    {
      id: 'indigo',
      name: 'Indigo Corporate',
      description: 'Sophistiqué et sérieux',
      colors: ['#312e81', '#6366f1', '#a5b4fc']
    },
    {
      id: 'dark',
      name: 'Mode Sombre',
      description: 'Élégant et reposant',
      colors: ['#1f2937', '#374151', '#4b5563']
    },
    {
      id: 'sunset',
      name: 'Coucher de Soleil',
      description: 'Chaleureux et inspirant',
      colors: ['#dc2626', '#f59e0b', '#fbbf24']
    },
    {
      id: 'ocean',
      name: 'Océan',
      description: 'Apaisant et fluide',
      colors: ['#155e75', '#0891b2', '#22d3ee']
    }
  ];

  const handleThemeSelect = (themeId) => {
    onThemeChange(themeId);
    setIsOpen(false);
  };

  const currentThemeData = themes.find(theme => theme.id === currentTheme) || themes[0];

  return (
    <div className="theme-selector">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-button"
        title="Changer le thème de couleur"
      >
        <Palette className="theme-icon" />
        <span className="theme-text">Thème</span>
        <div className="theme-preview">
          {currentThemeData.colors.map((color, index) => (
            <div
              key={index}
              className="preview-dot"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </button>

      {isOpen && (
        <div className="theme-overlay" onClick={() => setIsOpen(false)}>
          <div className="theme-modal" onClick={(e) => e.stopPropagation()}>
            <div className="theme-header">
              <h3>Choisir un thème</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="close-btn"
              >
                ×
              </button>
            </div>
            
            <div className="theme-grid">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className={`theme-option ${currentTheme === theme.id ? 'active' : ''}`}
                >
                  <div className="theme-colors">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="color-dot"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  
                  <div className="theme-info">
                    <span className="theme-name">{theme.name}</span>
                    <span className="theme-description">{theme.description}</span>
                  </div>
                  
                  {currentTheme === theme.id && (
                    <Check className="check-icon" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .theme-selector {
          position: relative;
        }

        .theme-button {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
        }

        .theme-button:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .theme-icon {
          width: 18px;
          height: 18px;
        }

        .theme-text {
          font-size: 0.9rem;
        }

        .theme-preview {
          display: flex;
          gap: 2px;
        }

        .preview-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .theme-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
          animation: overlayFadeIn 0.3s ease-out;
        }

        @keyframes overlayFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .theme-modal {
          background: white;
          border-radius: 20px;
          padding: 0;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          animation: modalSlideIn 0.3s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .theme-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid #f0f0f0;
          background: #f8fafc;
        }

        .theme-header h3 {
          margin: 0;
          font-size: 1.25rem;
          color: #2d3748;
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          color: #718096;
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: #e2e8f0;
        }

        .theme-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          padding: 1.5rem;
          max-height: 60vh;
          overflow-y: auto;
        }

        .theme-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: #f8fafc;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .theme-option:hover {
          border-color: #cbd5e0;
          background: #f1f5f9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .theme-option.active {
          border-color: #3b82f6;
          background: #eff6ff;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
        }

        .theme-colors {
          display: flex;
          gap: 3px;
          flex-shrink: 0;
        }

        .color-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        }

        .theme-info {
          display: flex;
          flex-direction: column;
          text-align: left;
          flex: 1;
        }

        .theme-name {
          font-weight: 600;
          color: #2d3748;
          font-size: 0.95rem;
        }

        .theme-description {
          font-size: 0.8rem;
          color: #718096;
          margin-top: 0.25rem;
        }

        .check-icon {
          width: 18px;
          height: 18px;
          color: #3b82f6;
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
        }

        @media (max-width: 768px) {
          .theme-modal {
            width: 95%;
            margin: 1rem;
          }

          .theme-grid {
            grid-template-columns: 1fr;
            padding: 1rem;
          }

          .theme-button {
            padding: 0.5rem 0.75rem;
          }

          .theme-text {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ThemeSelector;