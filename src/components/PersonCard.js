// src/components/PersonCard.js
import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  Mail, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Calendar,
  MapPin,
  Phone
} from 'lucide-react';

const PersonCard = ({ person, onDelete, onUpdate, viewMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: person.name,
    job: person.job,
    email: person.email
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Générer des couleurs d'avatar basées sur le nom
  const getAvatarColor = (name) => {
    const colors = [
      'from-blue-400 to-blue-600',
      'from-green-400 to-green-600',
      'from-purple-400 to-purple-600',
      'from-pink-400 to-pink-600',
      'from-yellow-400 to-yellow-600',
      'from-red-400 to-red-600',
      'from-indigo-400 to-indigo-600',
      'from-teal-400 to-teal-600',
      'from-orange-400 to-orange-600',
      'from-cyan-400 to-cyan-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Obtenir les initiales
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  // Calculer le temps depuis l'ajout
  const getTimeAgo = (dateString) => {
    if (!dateString) return 'Récemment';
    
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Aujourd\'hui';
    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.floor(diffDays / 7)} semaines`;
    return `Il y a ${Math.floor(diffDays / 30)} mois`;
  };

  const handleSave = () => {
    if (editData.name.trim() && editData.job.trim() && editData.email.trim()) {
      onUpdate(person.id, editData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name: person.name,
      job: person.job,
      email: person.email
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(person.id);
    setShowDeleteConfirm(false);
  };

  if (viewMode === 'list') {
    return (
      <div className="person-card-list">
        <div className="card-content-list">
          <div className="avatar-section-list">
            <div className={`avatar-list bg-gradient-to-br ${getAvatarColor(person.name)}`}>
              <span className="avatar-text-list">{getInitials(person.name)}</span>
              <div className="avatar-ring-list"></div>
            </div>
          </div>

          <div className="info-section-list">
            {isEditing ? (
              <div className="edit-form-list">
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                  className="edit-input-list name-input"
                  placeholder="Nom complet"
                />
                <input
                  type="text"
                  value={editData.job}
                  onChange={(e) => setEditData(prev => ({ ...prev, job: e.target.value }))}
                  className="edit-input-list job-input"
                  placeholder="Métier"
                />
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                  className="edit-input-list email-input"
                  placeholder="Email"
                />
              </div>
            ) : (
              <div className="person-details-list">
                <h3 className="person-name-list">{person.name}</h3>
                <div className="person-meta-list">
                  <span className="person-job-list">
                    <Briefcase className="meta-icon" />
                    {person.job}
                  </span>
                  <span className="person-email-list">
                    <Mail className="meta-icon" />
                    {person.email}
                  </span>
                  <span className="person-date-list">
                    <Calendar className="meta-icon" />
                    {getTimeAgo(person.dateAdded)}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="actions-section-list">
            {isEditing ? (
              <div className="edit-actions-list">
                <button onClick={handleSave} className="save-btn-list">
                  <Save className="action-icon" />
                </button>
                <button onClick={handleCancel} className="cancel-btn-list">
                  <X className="action-icon" />
                </button>
              </div>
            ) : (
              <div className="card-actions-list">
                <button 
                  onClick={() => setIsEditing(true)}
                  className="edit-btn-list"
                  title="Modifier"
                >
                  <Edit3 className="action-icon" />
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="delete-btn-list"
                  title="Supprimer"
                >
                  <Trash2 className="action-icon" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Confirmation de suppression pour la vue liste */}
        {showDeleteConfirm && (
          <div className="delete-confirm-overlay">
            <div className="delete-confirm-modal">
              <div className="confirm-header">
                <Trash2 className="confirm-icon" />
                <h4>Confirmer la suppression</h4>
              </div>
              <p>Êtes-vous sûr de vouloir supprimer <strong>{person.name}</strong> ?</p>
              <div className="confirm-actions">
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="confirm-cancel"
                >
                  Annuler
                </button>
                <button 
                  onClick={handleDelete}
                  className="confirm-delete"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .person-card-list {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 16px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .person-card-list:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          }

          .card-content-list {
            display: flex;
            align-items: center;
            padding: 1.5rem;
            gap: 1.5rem;
          }

          .avatar-section-list {
            flex-shrink: 0;
          }

          .avatar-list {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }

          .avatar-text-list {
            color: white;
            font-weight: 600;
            font-size: 1.2rem;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
          }

          .avatar-ring-list {
            position: absolute;
            inset: -3px;
            border-radius: 50%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: avatarRotate 3s linear infinite;
          }

          .info-section-list {
            flex: 1;
            min-width: 0;
          }

          .person-details-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .person-name-list {
            font-size: 1.25rem;
            font-weight: 600;
            color: #2d3748;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .person-meta-list {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
          }

          .person-job-list,
          .person-email-list,
          .person-date-list {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #718096;
            font-size: 0.9rem;
          }

          .meta-icon {
            width: 14px;
            height: 14px;
            flex-shrink: 0;
          }

          .edit-form-list {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            align-items: center;
          }

          .edit-input-list {
            padding: 0.5rem 0.75rem;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            font-size: 0.9rem;
            flex: 1;
            min-width: 120px;
          }

          .edit-input-list:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
          }

          .actions-section-list {
            flex-shrink: 0;
          }

          .card-actions-list,
          .edit-actions-list {
            display: flex;
            gap: 0.5rem;
          }

          .edit-btn-list,
          .delete-btn-list,
          .save-btn-list,
          .cancel-btn-list {
            padding: 0.5rem;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .edit-btn-list {
            background: #f0f9ff;
            color: #0369a1;
          }

          .edit-btn-list:hover {
            background: #e0f2fe;
            transform: scale(1.05);
          }

          .delete-btn-list {
            background: #fef2f2;
            color: #dc2626;
          }

          .delete-btn-list:hover {
            background: #fee2e2;
            transform: scale(1.05);
          }

          .save-btn-list {
            background: #f0fdf4;
            color: #16a34a;
          }

          .save-btn-list:hover {
            background: #dcfce7;
            transform: scale(1.05);
          }

          .cancel-btn-list {
            background: #f8fafc;
            color: #64748b;
          }

          .cancel-btn-list:hover {
            background: #f1f5f9;
            transform: scale(1.05);
          }

          .action-icon {
            width: 16px;
            height: 16px;
          }

          @keyframes avatarRotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @media (max-width: 768px) {
            .card-content-list {
              flex-direction: column;
              text-align: center;
              gap: 1rem;
            }

            .person-meta-list {
              flex-direction: column;
              gap: 0.75rem;
              align-items: center;
            }

            .edit-form-list {
              flex-direction: column;
              width: 100%;
            }

            .edit-input-list {
              min-width: auto;
            }
          }
        `}</style>
      </div>
    );
  }

  // Vue grille (par défaut)
  return (
    <div className="person-card">
      <div className="card-header">
        <div className={`avatar bg-gradient-to-br ${getAvatarColor(person.name)}`}>
          <span className="avatar-text">{getInitials(person.name)}</span>
          <div className="avatar-glow"></div>
        </div>
        
        <div className="card-actions">
          {isEditing ? (
            <div className="edit-actions">
              <button onClick={handleSave} className="save-btn" title="Sauvegarder">
                <Save className="action-icon" />
              </button>
              <button onClick={handleCancel} className="cancel-btn" title="Annuler">
                <X className="action-icon" />
              </button>
            </div>
          ) : (
            <div className="action-buttons">
              <button 
                onClick={() => setIsEditing(true)}
                className="edit-btn"
                title="Modifier"
              >
                <Edit3 className="action-icon" />
              </button>
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="delete-btn"
                title="Supprimer"
              >
                <Trash2 className="action-icon" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="card-body">
        {isEditing ? (
          <div className="edit-form">
            <div className="form-group">
              <User className="input-icon" />
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                className="edit-input"
                placeholder="Nom complet"
              />
            </div>
            <div className="form-group">
              <Briefcase className="input-icon" />
              <input
                type="text"
                value={editData.job}
                onChange={(e) => setEditData(prev => ({ ...prev, job: e.target.value }))}
                className="edit-input"
                placeholder="Métier"
              />
            </div>
            <div className="form-group">
              <Mail className="input-icon" />
              <input
                type="email"
                value={editData.email}
                onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                className="edit-input"
                placeholder="Email"
              />
            </div>
          </div>
        ) : (
          <div className="person-info">
            <h3 className="person-name">{person.name}</h3>
            
            <div className="person-details">
              <div className="detail-item">
                <Briefcase className="detail-icon" />
                <span>{person.job}</span>
              </div>
              
              <div className="detail-item">
                <Mail className="detail-icon" />
                <span className="email-text">{person.email}</span>
              </div>
              
              <div className="detail-item">
                <Calendar className="detail-icon" />
                <span className="date-text">{getTimeAgo(person.dateAdded)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteConfirm && (
        <div className="delete-confirm-overlay">
          <div className="delete-confirm-modal">
            <div className="confirm-header">
              <Trash2 className="confirm-icon" />
              <h4>Confirmer la suppression</h4>
            </div>
            <p>Êtes-vous sûr de vouloir supprimer <strong>{person.name}</strong> de l'annuaire ?</p>
            <div className="confirm-actions">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="confirm-cancel"
              >
                Annuler
              </button>
              <button 
                onClick={handleDelete}
                className="confirm-delete"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .person-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          position: relative;
          overflow: hidden;
        }

        .person-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
        }

        .person-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c);
          background-size: 300% 100%;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1.5rem 1.5rem 0;
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .avatar-text {
          color: white;
          font-weight: 700;
          font-size: 1.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          z-index: 2;
        }

        .avatar-glow {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.4), transparent);
          animation: avatarGlow 2s ease-in-out infinite;
        }

        @keyframes avatarGlow {
          0%, 100% {
            opacity: 0;
            transform: rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: rotate(180deg);
          }
        }

        .card-actions {
          display: flex;
          gap: 0.5rem;
        }

        .action-buttons, .edit-actions {
          display: flex;
          gap: 0.5rem;
        }

        .edit-btn, .delete-btn, .save-btn, .cancel-btn {
          padding: 0.75rem;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .edit-btn {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .edit-btn:hover {
          background: rgba(59, 130, 246, 0.2);
          transform: scale(1.1);
        }

        .delete-btn {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .delete-btn:hover {
          background: rgba(239, 68, 68, 0.2);
          transform: scale(1.1);
        }

        .save-btn {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .save-btn:hover {
          background: rgba(34, 197, 94, 0.2);
          transform: scale(1.1);
        }

        .cancel-btn {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
          border: 1px solid rgba(107, 114, 128, 0.2);
        }

        .cancel-btn:hover {
          background: rgba(107, 114, 128, 0.2);
          transform: scale(1.1);
        }

        .action-icon {
          width: 18px;
          height: 18px;
        }

        .card-body {
          padding: 1.5rem;
        }

        .person-info {
          text-align: center;
        }

        .person-name {
          font-size: 1.5rem;
          font-weight: 700;
          color: #2d3748;
          margin: 0 0 1.5rem 0;
          line-height: 1.2;
        }

        .person-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: rgba(248, 250, 252, 0.8);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .detail-item:hover {
          background: rgba(241, 245, 249, 0.9);
          transform: translateX(4px);
        }

        .detail-icon {
          width: 18px;
          height: 18px;
          color: #64748b;
          flex-shrink: 0;
        }

        .detail-item span {
          color: #475569;
          font-weight: 500;
          flex: 1;
          text-align: left;
        }

        .email-text {
          font-size: 0.9rem;
          word-break: break-all;
        }

        .date-text {
          font-size: 0.9rem;
          color: #64748b !important;
        }

        .edit-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 0.75rem;
          width: 18px;
          height: 18px;
          color: #64748b;
          z-index: 2;
        }

        .edit-input {
          width: 100%;
          padding: 0.75rem 0.75rem 0.75rem 2.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.9);
        }

        .edit-input:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .delete-confirm-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: overlayFadeIn 0.3s ease-out;
        }

        .delete-confirm-modal {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          max-width: 400px;
          margin: 1rem;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          animation: modalBounceIn 0.3s ease-out;
        }

        .confirm-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .confirm-icon {
          width: 24px;
          height: 24px;
          color: #ef4444;
        }

        .confirm-header h4 {
          margin: 0;
          font-size: 1.25rem;
          color: #2d3748;
        }

        .delete-confirm-modal p {
          color: #4a5568;
          margin-bottom: 2rem;
          line-height: 1.5;
        }

        .confirm-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .confirm-cancel, .confirm-delete {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .confirm-cancel {
          background: #f8fafc;
          color: #64748b;
          border: 2px solid #e2e8f0;
        }

        .confirm-cancel:hover {
          background: #f1f5f9;
          transform: translateY(-1px);
        }

        .confirm-delete {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .confirm-delete:hover {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          transform: translateY(-1px);
          box-shadow: 0 10px 20px rgba(239, 68, 68, 0.3);
        }

        @keyframes overlayFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes modalBounceIn {
          from {
            opacity: 0;
            transform: scale(0.8) translateY(-50px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 480px) {
          .person-card {
            margin: 0.5rem 0;
          }

          .card-header {
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            text-align: center;
          }

          .person-name {
            font-size: 1.25rem;
          }

          .edit-input {
            font-size: 0.9rem;
          }

          .delete-confirm-modal {
            padding: 1.5rem;
            margin: 0.5rem;
          }

          .confirm-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default PersonCard;