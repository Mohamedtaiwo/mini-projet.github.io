// src/components/AddForm.js - Version corrigée
import React, { useState } from 'react';
import { Plus, User, Briefcase, Mail, X, Check, AlertCircle } from 'lucide-react';

const AddForm = ({ onAddPerson }) => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation simple
  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = 'Le nom est requis';
    }
    if (!job.trim()) {
      newErrors.job = 'Le métier est requis';
    }
    if (!email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'L\'email n\'est pas valide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🚀 Tentative de soumission du formulaire');
    console.log('Données:', { name, job, email });
    
    if (!validateForm()) {
      console.log('❌ Validation échouée:', errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulation d'un délai
      await new Promise(resolve => setTimeout(resolve, 500));

      const newPerson = {
        id: Date.now() + Math.random(), // ID unique
        name: name.trim(),
        job: job.trim(),
        email: email.trim().toLowerCase()
      };

      console.log('✅ Nouvelle personne créée:', newPerson);
      
      // Appel de la fonction parent
      if (onAddPerson && typeof onAddPerson === 'function') {
        onAddPerson(newPerson);
        console.log('✅ Fonction onAddPerson appelée avec succès');
        
        // Reset du formulaire
        resetForm();
        setIsOpen(false);
      } else {
        console.error('❌ onAddPerson n\'est pas une fonction valide');
      }
      
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setJob('');
    setEmail('');
    setErrors({});
  };

  const handleCancel = () => {
    resetForm();
    setIsOpen(false);
  };

  const handleOpenForm = () => {
    setIsOpen(true);
  };

  return (
    <div className="add-form-container">
      {/* Bouton d'ouverture */}
      <button
        onClick={handleOpenForm}
        className="add-button"
        disabled={isOpen}
      >
        <div className="add-button-content">
          <div className="add-icon-wrapper">
            <Plus className="add-icon" />
          </div>
          <div className="add-text">
            <span className="add-title">Ajouter un collaborateur</span>
            <span className="add-subtitle">Enrichir votre annuaire professionnel</span>
          </div>
        </div>
      </button>

      {/* Modal/Formulaire */}
      {isOpen && (
        <div className="form-overlay" onClick={(e) => e.target === e.currentTarget && handleCancel()}>
          <div className="form-modal">
            {/* En-tête */}
            <div className="form-header">
              <div className="form-title">
                <User className="form-title-icon" />
                <h3>Nouveau Collaborateur</h3>
              </div>
              <button 
                onClick={handleCancel}
                className="close-button"
                type="button"
                disabled={isSubmitting}
              >
                <X className="close-icon" />
              </button>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-grid">
                {/* Champ Nom */}
                <div className="form-group">
                  <label className="form-label">
                    <User className="label-icon" />
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Ex: Marie Dubois"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <span className="error-message">
                      <AlertCircle className="error-icon" />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Champ Métier */}
                <div className="form-group">
                  <label className="form-label">
                    <Briefcase className="label-icon" />
                    Métier *
                  </label>
                  <input
                    type="text"
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    className={`form-input ${errors.job ? 'error' : ''}`}
                    placeholder="Ex: Développeur Frontend"
                    disabled={isSubmitting}
                  />
                  {errors.job && (
                    <span className="error-message">
                      <AlertCircle className="error-icon" />
                      {errors.job}
                    </span>
                  )}
                </div>

                {/* Champ Email */}
                <div className="form-group full-width">
                  <label className="form-label">
                    <Mail className="label-icon" />
                    Email professionnel *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Ex: marie.dubois@entreprise.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <span className="error-message">
                      <AlertCircle className="error-icon" />
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel-btn"
                  disabled={isSubmitting}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="loading-content">
                      <div className="loading-spinner"></div>
                      <span>Ajout en cours...</span>
                    </div>
                  ) : (
                    <div className="submit-content">
                      <Check className="submit-icon" />
                      <span>Ajouter</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .add-form-container {
          margin-bottom: 2rem;
        }

        .add-button {
          width: 100%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: none;
          border-radius: 20px;
          padding: 2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
          position: relative;
          overflow: hidden;
        }

        .add-button:hover:not(:disabled) {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(16, 185, 129, 0.4);
        }

        .add-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .add-button-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .add-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }

        .add-icon {
          width: 28px;
          height: 28px;
          color: white;
        }

        .add-text {
          display: flex;
          flex-direction: column;
          text-align: left;
          flex: 1;
        }

        .add-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: white;
          margin-bottom: 0.25rem;
        }

        .add-subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
        }

        .form-overlay {
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
          padding: 1rem;
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

        .form-modal {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 600px;
          max-height: 90vh;
          overflow-y: auto;
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

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2rem;
          border-bottom: 1px solid #f0f0f0;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 24px 24px 0 0;
        }

        .form-title {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .form-title-icon {
          width: 24px;
          height: 24px;
          color: #4a5568;
        }

        .form-title h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
        }

        .close-button {
          background: none;
          border: none;
          padding: 0.75rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-button:hover:not(:disabled) {
          background: #f7fafc;
        }

        .close-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .close-icon {
          width: 20px;
          height: 20px;
          color: #718096;
        }

        .form-content {
          padding: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }

        .label-icon {
          width: 18px;
          height: 18px;
          color: #6b7280;
        }

        .form-input {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-input.error {
          border-color: #ef4444;
          background: #fef2f2;
        }

        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #ef4444;
          font-size: 0.85rem;
          margin-top: 0.5rem;
          font-weight: 500;
        }

        .error-icon {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          padding-top: 2rem;
          border-top: 1px solid #f0f0f0;
        }

        .cancel-btn {
          padding: 1rem 2rem;
          border: 2px solid #e5e7eb;
          background: white;
          color: #6b7280;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .cancel-btn:hover:not(:disabled) {
          border-color: #d1d5db;
          background: #f9fafb;
        }

        .cancel-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .submit-btn {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          min-width: 150px;
          justify-content: center;
          font-size: 1rem;
        }

        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-1px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .submit-content, .loading-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .submit-icon {
          width: 18px;
          height: 18px;
        }

        .loading-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .form-modal {
            margin: 0.5rem;
            max-height: calc(100vh - 1rem);
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .form-actions {
            flex-direction: column;
          }

          .add-button-content {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .add-text {
            text-align: center;
          }

          .form-header {
            padding: 1.5rem;
          }

          .form-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AddForm;