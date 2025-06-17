// src/components/AddForm.js
import React, { useState } from 'react';
import { Plus, User, Briefcase, Mail, X, Check, AlertCircle } from 'lucide-react';

const AddForm = ({ onAddPerson }) => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState({});

  // Validation des champs en temps réel
  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        if (!value.trim()) return 'Le nom est requis';
        if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
        if (value.trim().length > 50) return 'Le nom ne peut pas dépasser 50 caractères';
        if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value.trim())) return 'Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets';
        return '';
      
      case 'job':
        if (!value.trim()) return 'Le métier est requis';
        if (value.trim().length < 2) return 'Le métier doit contenir au moins 2 caractères';
        if (value.trim().length > 100) return 'Le métier ne peut pas dépasser 100 caractères';
        return '';
      
      case 'email':
        if (!value.trim()) return 'L\'email est requis';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'L\'email n\'est pas valide';
        if (value.trim().length > 100) return 'L\'email ne peut pas dépasser 100 caractères';
        return '';
      
      default:
        return '';
    }
  };

  // Validation complète du formulaire
  const validateForm = () => {
    const newErrors = {
      name: validateField('name', name),
      job: validateField('job', job),
      email: validateField('email', email)
    };

    // Supprimer les erreurs vides
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) delete newErrors[key];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion du changement de champ avec validation
  const handleFieldChange = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        setName(value);
        break;
      case 'job':
        setJob(value);
        break;
      case 'email':
        setEmail(value);
        break;
    }

    // Validation en temps réel si le champ a été touché
    if (touchedFields[fieldName]) {
      const error = validateField(fieldName, value);
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }
  };

  // Gestion du blur (quand l'utilisateur quitte le champ)
  const handleFieldBlur = (fieldName, value) => {
    setTouchedFields(prev => ({ ...prev, [fieldName]: true }));
    const error = validateField(fieldName, value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Marquer tous les champs comme touchés
    setTouchedFields({ name: true, job: true, email: true });
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulation d'une requête async avec délai
      await new Promise(resolve => setTimeout(resolve, 800));

      const newPerson = {
        id: Date.now() + Math.random(), // ID plus unique
        name: name.trim(),
        job: job.trim(),
        email: email.trim().toLowerCase()
      };

      onAddPerson(newPerson);

      // Reset complet du formulaire
      resetForm();
      
      // Fermer le modal avec animation
      setTimeout(() => setIsOpen(false), 300);
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      // Ici vous pourriez gérer les erreurs de l'API
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName('');
    setJob('');
    setEmail('');
    setErrors({});
    setTouchedFields({});
  };

  const handleCancel = () => {
    resetForm();
    setIsOpen(false);
  };

  const handleOpenForm = () => {
    setIsOpen(true);
    // Focus automatique sur le premier champ après un court délai
    setTimeout(() => {
      const firstInput = document.querySelector('.form-modal input[type="text"]');
      if (firstInput) firstInput.focus();
    }, 300);
  };

  return (
    <div className="add-form-container">
      {/* Bouton d'ouverture avec animation améliorée */}
      <button
        onClick={handleOpenForm}
        className="add-button"
        disabled={isOpen}
      >
        <div className="add-button-content">
          <div className="add-icon-wrapper">
            <Plus className="add-icon" />
            <div className="add-icon-bg"></div>
            <div className="add-icon-pulse"></div>
          </div>
          <div className="add-text">
            <span className="add-title">Ajouter un collaborateur</span>
            <span className="add-subtitle">Enrichir votre annuaire professionnel</span>
          </div>
          <div className="add-arrow">→</div>
        </div>
      </button>

      {/* Modal/Formulaire avec overlay */}
      {isOpen && (
        <div className="form-overlay" onClick={(e) => e.target === e.currentTarget && handleCancel()}>
          <div className="form-modal">
            {/* En-tête du modal */}
            <div className="form-header">
              <div className="form-title">
                <div className="form-title-icon-wrapper">
                  <User className="form-title-icon" />
                  <div className="form-title-icon-bg"></div>
                </div>
                <div className="form-title-text">
                  <h3>Nouveau Collaborateur</h3>
                  <p>Ajoutez les informations du nouveau membre de l'équipe</p>
                </div>
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

            {/* Formulaire principal */}
            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-grid">
                {/* Champ Nom */}
                <div className="form-group">
                  <label className="form-label">
                    <User className="label-icon" />
                    Nom complet *
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      onBlur={(e) => handleFieldBlur('name', e.target.value)}
                      className={`form-input ${errors.name ? 'error' : ''} ${name && !errors.name ? 'success' : ''}`}
                      placeholder="Ex: Marie Dubois"
                      disabled={isSubmitting}
                      maxLength={50}
                    />
                    {name && !errors.name && (
                      <Check className="success-icon" />
                    )}
                    {errors.name && (
                      <AlertCircle className="error-icon" />
                    )}
                  </div>
                  {errors.name && (
                    <span className="error-message">
                      <AlertCircle className="error-message-icon" />
                      {errors.name}
                    </span>
                  )}
                  <div className="char-counter">
                    {name.length}/50
                  </div>
                </div>

                {/* Champ Métier */}
                <div className="form-group">
                  <label className="form-label">
                    <Briefcase className="label-icon" />
                    Métier *
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      value={job}
                      onChange={(e) => handleFieldChange('job', e.target.value)}
                      onBlur={(e) => handleFieldBlur('job', e.target.value)}
                      className={`form-input ${errors.job ? 'error' : ''} ${job && !errors.job ? 'success' : ''}`}
                      placeholder="Ex: Développeur Frontend"
                      disabled={isSubmitting}
                      maxLength={100}
                    />
                    {job && !errors.job && (
                      <Check className="success-icon" />
                    )}
                    {errors.job && (
                      <AlertCircle className="error-icon" />
                    )}
                  </div>
                  {errors.job && (
                    <span className="error-message">
                      <AlertCircle className="error-message-icon" />
                      {errors.job}
                    </span>
                  )}
                  <div className="char-counter">
                    {job.length}/100
                  </div>
                </div>

                {/* Champ Email */}
                <div className="form-group full-width">
                  <label className="form-label">
                    <Mail className="label-icon" />
                    Email professionnel *
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      onBlur={(e) => handleFieldBlur('email', e.target.value)}
                      className={`form-input ${errors.email ? 'error' : ''} ${email && !errors.email ? 'success' : ''}`}
                      placeholder="Ex: marie.dubois@entreprise.com"
                      disabled={isSubmitting}
                      maxLength={100}
                    />
                    {email && !errors.email && (
                      <Check className="success-icon" />
                    )}
                    {errors.email && (
                      <AlertCircle className="error-icon" />
                    )}
                  </div>
                  {errors.email && (
                    <span className="error-message">
                      <AlertCircle className="error-message-icon" />
                      {errors.email}
                    </span>
                  )}
                  <div className="char-counter">
                    {email.length}/100
                  </div>
                </div>
              </div>

              {/* Indicateur de progression */}
              <div className="form-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{
                      width: `${((name ? 1 : 0) + (job ? 1 : 0) + (email ? 1 : 0)) / 3 * 100}%`
                    }}
                  ></div>
                </div>
                <span className="progress-text">
                  {Math.round(((name ? 1 : 0) + (job ? 1 : 0) + (email ? 1 : 0)) / 3 * 100)}% complété
                </span>
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
                  disabled={isSubmitting || Object.keys(errors).length > 0 || !name || !job || !email}
                >
                  {isSubmitting ? (
                    <div className="loading-content">
                      <div className="loading-spinner"></div>
                      <span>Ajout en cours...</span>
                    </div>
                  ) : (
                    <div className="submit-content">
                      <Check className="submit-icon" />
                      <span>Ajouter le collaborateur</span>
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
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
          position: relative;
          overflow: hidden;
        }

        .add-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(16, 185, 129, 0.4);
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
        }

        .add-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .add-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: all 0.6s;
        }

        .add-button:hover::before {
          left: 100%;
        }

        .add-button-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          position: relative;
          z-index: 2;
        }

        .add-icon-wrapper {
          position: relative;
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
          z-index: 3;
        }

        .add-icon-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          animation: iconPulse 2s ease-in-out infinite;
        }

        .add-icon-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 16px;
          animation: iconPulse 2s ease-in-out infinite 1s;
        }

        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
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
          display: block;
          margin-bottom: 0.25rem;
        }

        .add-subtitle {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
          display: block;
          line-height: 1.4;
        }

        .add-arrow {
          font-size: 1.5rem;
          color: white;
          transition: transform 0.3s ease;
        }

        .add-button:hover .add-arrow {
          transform: translateX(8px);
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
          animation: overlayFadeIn 0.3s ease-out;
          backdrop-filter: blur(4px);
        }

        @keyframes overlayFadeIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(4px);
          }
        }

        .form-modal {
          background: white;
          border-radius: 24px;
          width: 100%;
          max-width: 700px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          animation: modalSlideIn 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-50px) scale(0.95);
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

        .form-title-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          border-radius: 12px;
        }

        .form-title-icon {
          width: 24px;
          height: 24px;
          color: white;
          z-index: 2;
        }

        .form-title-icon-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          animation: titleIconGlow 2s ease-in-out infinite;
        }

        @keyframes titleIconGlow {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }

        .form-title-text h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
        }

        .form-title-text p {
          margin: 0;
          font-size: 0.9rem;
          color: #6b7280;
          margin-top: 0.25rem;
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
          transform: scale(1.1);
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

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .form-input {
          width: 100%;
          padding: 1rem 3rem 1rem 1rem;
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

        .form-input.success {
          border-color: #10b981;
          background: #f0fdf4;
        }

        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-icon, .error-icon {
          position: absolute;
          right: 1rem;
          width: 20px;
          height: 20px;
        }

        .success-icon {
          color: #10b981;
        }

        .error-icon {
          color: #ef4444;
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

        .error-message-icon {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
        }

        .char-counter {
          font-size: 0.75rem;
          color: #9ca3af;
          text-align: right;
          margin-top: 0.25rem;
        }

        .form-progress {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1rem;
          background: #f8fafc;
          border-radius: 12px;
        }

        .progress-bar {
          flex: 1;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #059669);
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .progress-text {
          font-size: 0.85rem;
          font-weight: 600;
          color: #374151;
          white-space: nowrap;
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
          transform: translateY(-1px);
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
          min-width: 200px;
          justify-content: center;
          font-size: 1rem;
        }

        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.6;
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

          .add-arrow {
            display: none;
          }

          .form-header {
            padding: 1.5rem;
          }

          .form-content {
            padding: 1.5rem;
          }

          .form-title {
            flex-direction: column;
            gap: 0.75rem;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .add-button {
            padding: 1.5rem;
          }

          .add-title {
            font-size: 1.2rem;
          }

          .add-subtitle {
            font-size: 0.9rem;
          }

          .form-modal {
            border-radius: 16px;
          }

          .form-header {
            border-radius: 16px 16px 0 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AddForm;