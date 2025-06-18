// src/components/PresentationPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  Volume2, 
  VolumeX,
  Code,
  Users,
  Zap,
  Rocket,
  Award,
  Target,
  Layers,
  Sparkles
} from 'lucide-react';

const PresentationPage = ({ onComplete }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Configuration de la timeline (3 minutes = 180 secondes)
  const sections = [
    {
      id: 'intro',
      title: 'Introduction',
      duration: 20000, // 20 secondes
      content: 'introduction'
    },
    {
      id: 'project',
      title: 'Présentation du Projet',
      duration: 30000, // 30 secondes
      content: 'project'
    },
    {
      id: 'objectives',
      title: 'Objectifs Pédagogiques',
      duration: 30000, // 30 secondes
      content: 'objectives'
    },
    {
      id: 'team',
      title: 'Équipe du Projet',
      duration: 40000, // 40 secondes
      content: 'team'
    },
    {
      id: 'architecture',
      title: 'Architecture Technique',
      duration: 30000, // 30 secondes
      content: 'architecture'
    },
    {
      id: 'features',
      title: 'Fonctionnalités',
      duration: 20000, // 20 secondes
      content: 'features'
    },
    {
      id: 'finale',
      title: 'Lancement',
      duration: 10000, // 10 secondes
      content: 'finale'
    }
  ];

  const totalDuration = sections.reduce((acc, section) => acc + section.duration, 0);

  // Timer principal
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedTime(prev => {
          const newTime = prev + 100;
          if (newTime >= totalDuration) {
            onComplete();
            return totalDuration;
          }
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration, onComplete]);

  // Calcul de la section actuelle
  useEffect(() => {
    let accumulated = 0;
    for (let i = 0; i < sections.length; i++) {
      accumulated += sections[i].duration;
      if (elapsedTime < accumulated) {
        setCurrentSection(i);
        break;
      }
    }
  }, [elapsedTime, sections]);

  // Fonction pour passer à la section suivante
  const skipToNext = useCallback(() => {
    let accumulated = 0;
    for (let i = 0; i <= currentSection; i++) {
      accumulated += sections[i].duration;
    }
    setElapsedTime(accumulated);
  }, [currentSection, sections]);

  // Fonction pour passer directement à l'application
  const skipToApp = useCallback(() => {
    onComplete();
  }, [onComplete]);

  // Son d'ambiance (simulation)
  useEffect(() => {
    if (soundEnabled) {
      // Ici vous pourriez ajouter une vraie piste audio
      console.log('🎵 /Musique/Iframe Chargé [JPrCzEsg1YI]');
    }
  }, [soundEnabled]);

  // Composant d'introduction
  const IntroSection = () => (
    <div className="section intro-section">
      <div className="cosmic-bg">
        <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div>
      </div>
      
      <div className="intro-content">
        <div className="logo-container">
          <div className="logo-ring">
            <Code className="logo-icon" />
          </div>
          <div className="logo-pulse"></div>
        </div>
        
        <h1 className="main-title">
          <span className="typing-text">Mini Projet 1</span>
        </h1>
        <h2 className="subtitle">
          <span className="gradient-text">Annuaire Professionnel ReactJS</span>
        </h2>
        <p className="intro-description">
          Une application web moderne pour la gestion collaborative
        </p>
        
        <div className="intro-badges">
          <span className="badge badge-react">⚛️ React 18</span>
          <span className="badge badge-modern">✨ Interface Moderne</span>
          <span className="badge badge-responsive">📱 Responsive</span>
        </div>
      </div>
    </div>
  );

  // Composant présentation du projet
  const ProjectSection = () => (
    <div className="section project-section">
      <div className="section-header">
        <Target className="section-icon" />
        <h2>Présentation du Projet</h2>
      </div>
      
      <div className="project-grid">
        <div className="project-description">
          <h3>🎯 Objectif Principal</h3>
          <p>
            Développement d'un annuaire professionnel moderne permettant 
            la gestion efficace des collaborateurs avec une interface 
            utilisateur intuitive et des fonctionnalités avancées.
          </p>
          
          <div className="features-preview">
            <div className="feature-item">
              <Zap className="feature-icon" />
              <span>Interface Dynamique</span>
            </div>
            <div className="feature-item">
              <Users className="feature-icon" />
              <span>Gestion CRUD</span>
            </div>
            <div className="feature-item">
              <Sparkles className="feature-icon" />
              <span>Animations Fluides</span>
            </div>
          </div>
        </div>
        
        <div className="project-visual">
          <div className="mockup-phone">
            <div className="mockup-screen">
              <div className="mockup-content">
                <div className="mockup-header"></div>
                <div className="mockup-list">
                  <div className="mockup-item"></div>
                  <div className="mockup-item"></div>
                  <div className="mockup-item"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Composant objectifs
  const ObjectivesSection = () => (
    <div className="section objectives-section">
      <div className="section-header">
        <Award className="section-icon" />
        <h2>Objectifs Pédagogiques</h2>
      </div>
      
      <div className="objectives-grid">
        {[
          { icon: "⚛️", text: "Maîtrise des composants React", progress: 95 },
          { icon: "🔄", text: "Gestion d'état avec hooks", progress: 90 },
          { icon: "📝", text: "Formulaires contrôlés", progress: 85 },
          { icon: "🔍", text: "Filtrage dynamique", progress: 88 },
          { icon: "💾", text: "Persistance localStorage", progress: 92 },
          { icon: "📱", text: "Design responsive", progress: 90 }
        ].map((objective, index) => (
          <div key={index} className="objective-card">
            <div className="objective-icon">{objective.icon}</div>
            <div className="objective-content">
              <p>{objective.text}</p>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${objective.progress}%`,
                    animationDelay: `${index * 0.2}s`
                  }}
                ></div>
              </div>
              <span className="progress-text">{objective.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Composant équipe (À MODIFIER AVEC VOS VRAIS NOMS)
  const TeamSection = () => (
    <div className="section team-section">
      <div className="section-header">
        <Users className="section-icon" />
        <h2>Équipe du Projet</h2>
      </div>
      
      <div className="team-info">
        <div className="class-badge">
          <span className="class-label">Classe B2-3</span>
        </div>
        
        <div className="team-members">
          {/* ⚠️ SECTION À MODIFIER - Remplacez par vos vrais noms */}
          <div className="member-card">
            <div className="member-avatar">
              <span className="avatar-initials">E1</span>
            </div>
            <div className="member-info">
              <h3>[ÉTUDIANT 1 - POATY JEAN CLAUDE]</h3>
              <p>Développeur Frontend</p>
            </div>
          </div>
          
          <div className="member-card">
            <div className="member-avatar">
              <span className="avatar-initials">E2</span>
            </div>
            <div className="member-info">
              <h3>[ÉTUDIANT 2 - PRINCE HENRI ]</h3>
              <p>UI/UX Designer</p>
            </div>
          </div>
          
          <div className="member-card">
            <div className="member-avatar">
              <span className="avatar-initials">E3</span>
            </div>
            <div className="member-info">
              <h3>[ÉTUDIANT 3 - TAIWO MOHAMED]</h3>
              <p>SPECIALISTE DATA ET Innovation</p>
            </div>
          </div>

          <div className="member-card">
            <div className="member-avatar">
              <span className="avatar-initials">E3</span>
            </div>
            <div className="member-info">
              <h3>[ÉTUDIANT 3 - Antoine Bouchniba]</h3>
              <p>ARCHITECTE TECHNIQUE & DEVOPS</p>
            </div>
          </div>
          {/* FIN DE LA SECTION À MODIFIER */}
        </div>
        
        <div className="project-timeline">
          <div className="timeline-item">
            <div className="timeline-icon">📅</div>
            <div className="timeline-content">
              <h4>Période de Réalisation</h4>
              <p>Année académique 2024-2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Composant architecture
  const ArchitectureSection = () => (
    <div className="section architecture-section">
      <div className="section-header">
        <Layers className="section-icon" />
        <h2>Architecture Technique</h2>
      </div>
      
      <div className="tech-stack">
        <div className="tech-category">
          <h3>Frontend Stack</h3>
          <div className="tech-items">
            <div className="tech-item">
              <div className="tech-logo react-logo">⚛️</div>
              <span>React 18.2.0</span>
            </div>
            <div className="tech-item">
              <div className="tech-logo css-logo">🎨</div>
              <span>CSS3 + Animations</span>
            </div>
            <div className="tech-item">
              <div className="tech-logo icons-logo">🔍</div>
              <span>Lucide React</span>
            </div>
          </div>
        </div>
        
        <div className="tech-category">
          <h3>Fonctionnalités</h3>
          <div className="tech-items">
            <div className="tech-item">
              <div className="tech-logo storage-logo">💾</div>
              <span>LocalStorage</span>
            </div>
            <div className="tech-item">
              <div className="tech-logo responsive-logo">📱</div>
              <span>Responsive Design</span>
            </div>
            <div className="tech-item">
              <div className="tech-logo animation-logo">✨</div>
              <span>Glassmorphism</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Composant fonctionnalités
  const FeaturesSection = () => (
    <div className="section features-section">
      <div className="section-header">
        <Rocket className="section-icon" />
        <h2>Fonctionnalités Principales</h2>
      </div>
      
      <div className="features-showcase">
        <div className="feature-highlight">
          <h3>🚀 Innovation: Tableau de Bord</h3>
          <p>Statistiques en temps réel et analyses des données</p>
        </div>
        
        <div className="features-list">
          {[
            "➕ Ajout de collaborateurs",
            "📝 Modification en ligne", 
            "🔍 Recherche multi-critères",
            "🎨 Thèmes personnalisables",
            "📊 Statistiques dynamiques",
            "💾 Sauvegarde automatique"
          ].map((feature, index) => (
            <div 
              key={index} 
              className="feature-item-animated"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Composant finale
  const FinaleSection = () => (
    <div className="section finale-section">
      <div className="finale-content">
        <div className="rocket-animation">
          <Rocket className="rocket-icon" />
        </div>
        <h2>🎉 Merci pour votre attention !</h2>
        <p>Lancement de l'application...</p>
        <div className="countdown">
          <div className="countdown-circle">
            <span>{Math.ceil((totalDuration - elapsedTime) / 1000)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Rendu des sections
  const renderCurrentSection = () => {
    switch (sections[currentSection]?.content) {
      case 'introduction': return <IntroSection />;
      case 'project': return <ProjectSection />;
      case 'objectives': return <ObjectivesSection />;
      case 'team': return <TeamSection />;
      case 'architecture': return <ArchitectureSection />;
      case 'features': return <FeaturesSection />;
      case 'finale': return <FinaleSection />;
      default: return <IntroSection />;
    }
  };

  return (
    <div className="presentation-container">
      {/* Arrière-plan animé */}
      <div className="presentation-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i}`}></div>
          ))}
        </div>
      </div>

      {/* Contrôles */}
      <div className="presentation-controls">
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="control-btn"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        
        <button 
          onClick={skipToNext}
          className="control-btn"
          title="Section suivante"
        >
          <SkipForward size={20} />
        </button>
        
        <button 
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="control-btn"
          title={soundEnabled ? "Couper le son" : "Activer le son"}
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
        
        <button 
          onClick={skipToApp}
          className="skip-btn"
        >
          Passer la présentation
        </button>
      </div>

      {/* Indicateur de section */}
      <div className="section-indicator">
        <span className="section-title">
          {sections[currentSection]?.title}
        </span>
        <div className="section-dots">
          {sections.map((_, index) => (
            <div 
              key={index}
              className={`dot ${index === currentSection ? 'active' : ''} ${index < currentSection ? 'completed' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Contenu principal */}
      <main className="presentation-main">
        {renderCurrentSection()}
      </main>

      {/* Styles intégrés */}
      <style jsx>{`
        .presentation-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #2d1b69 100%);
          color: white;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .presentation-background {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          animation: orbFloat 10s ease-in-out infinite;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
          top: -200px;
          left: -200px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%);
          bottom: -150px;
          right: -150px;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: 4s;
        }

        @keyframes orbFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .floating-particles {
          position: absolute;
          inset: 0;
        }

        .particle {
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          animation: particleFloat 8s linear infinite;
        }

        .particle:nth-child(odd) {
          animation-duration: 12s;
        }

        .particle:nth-child(even) {
          animation-duration: 15s;
        }

        ${[...Array(20)].map((_, i) => `
          .particle-${i} {
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 8}s;
          }
        `).join('')}

        @keyframes particleFloat {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
          }
        }

        .presentation-controls {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 100;
          display: flex;
          gap: 12px;
        }

        .control-btn, .skip-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .control-btn {
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .skip-btn {
          padding: 12px 20px;
          font-size: 14px;
          font-weight: 500;
        }

        .control-btn:hover, .skip-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .section-indicator {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          text-align: center;
        }

        .section-title {
          display: block;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 12px;
          opacity: 0.8;
        }

        .section-dots {
          display: flex;
          gap: 8px;
          justify-content: center;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #6366f1;
          transform: scale(1.5);
        }

        .dot.completed {
          background: #10b981;
        }

        .presentation-main {
          position: relative;
          z-index: 10;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        .section {
          width: 100%;
          max-width: 1200px;
          animation: sectionFadeIn 1s ease-out;
        }

        @keyframes sectionFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Section Introduction */
        .intro-section {
          text-align: center;
          position: relative;
        }

        .cosmic-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .star {
          position: absolute;
          width: 4px;
          height: 4px;
          background: white;
          border-radius: 50%;
          animation: twinkle 3s ease-in-out infinite;
        }

        .star-1 { top: 20%; left: 20%; animation-delay: 0s; }
        .star-2 { top: 30%; right: 25%; animation-delay: 1s; }
        .star-3 { bottom: 40%; left: 70%; animation-delay: 2s; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }

        .intro-content {
          position: relative;
          z-index: 2;
        }

        .logo-container {
          position: relative;
          display: inline-block;
          margin-bottom: 40px;
        }

        .logo-ring {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .logo-icon {
          width: 60px;
          height: 60px;
          color: white;
        }

        .logo-pulse {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          animation: logoPulse 2s ease-in-out infinite;
        }

        @keyframes logoPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.3;
          }
        }

        .main-title {
          font-size: 4rem;
          font-weight: 800;
          margin: 20px 0;
          background: linear-gradient(135deg, #ffffff, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .typing-text {
          display: inline-block;
          animation: typing 2s steps(15) 0.5s both;
          white-space: nowrap;
          overflow: hidden;
          border-right: 3px solid #6366f1;
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        .subtitle {
          font-size: 2rem;
          margin: 20px 0;
          font-weight: 600;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ec4899, #6366f1, #10b981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease-in-out infinite;
        }

        .intro-description {
          font-size: 1.2rem;
          opacity: 0.9;
          margin: 30px 0;
          animation: slideUp 1s ease-out 1s both;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 0.9;
            transform: translateY(0);
          }
        }

        .intro-badges {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 40px;
        }

        .badge {
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 25px;
          font-size: 14px;
          font-weight: 500;
          backdrop-filter: blur(10px);
          animation: badgeFloat 3s ease-in-out infinite;
        }

        .badge-react { animation-delay: 0s; }
        .badge-modern { animation-delay: 0.5s; }
        .badge-responsive { animation-delay: 1s; }

        @keyframes badgeFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Section Header commune */
        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-icon {
          width: 60px;
          height: 60px;
          color: #6366f1;
          margin-bottom: 20px;
        }

        .section-header h2 {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(135deg, #ffffff, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Section Projet */
        .project-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .project-description h3 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: #a5b4fc;
        }

        .project-description p {
          font-size: 1.1rem;
          line-height: 1.6;
          opacity: 0.9;
          margin-bottom: 30px;
        }

        .features-preview {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(10px);
        }

        .feature-icon {
          width: 24px;
          height: 24px;
          color: #10b981;
        }

        .mockup-phone {
          background: linear-gradient(135deg, #374151, #1f2937);
          border-radius: 30px;
          padding: 20px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          animation: mockupFloat 4s ease-in-out infinite;
        }

        @keyframes mockupFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        .mockup-screen {
          background: #1f2937;
          border-radius: 20px;
          padding: 20px;
          height: 300px;
        }

        .mockup-content {
          height: 100%;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .mockup-header {
          height: 40px;
          background: linear-gradient(90deg, #6366f1, #ec4899);
          border-radius: 8px;
          animation: mockupPulse 2s ease-in-out infinite;
        }

        .mockup-list {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .mockup-item {
          height: 60px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          border-radius: 8px;
          animation: mockupItemSlide 1s ease-out;
        }

        .mockup-item:nth-child(1) { animation-delay: 0.2s; }
        .mockup-item:nth-child(2) { animation-delay: 0.4s; }
        .mockup-item:nth-child(3) { animation-delay: 0.6s; }

        @keyframes mockupPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes mockupItemSlide {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Section Objectifs */
        .objectives-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 25px;
        }

        .objective-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 25px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          animation: cardSlideIn 0.8s ease-out;
        }

        .objective-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        @keyframes cardSlideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .objective-icon {
          font-size: 2rem;
          margin-bottom: 15px;
          display: block;
        }

        .objective-content p {
          font-size: 1.1rem;
          margin-bottom: 15px;
          font-weight: 500;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981, #6366f1);
          border-radius: 4px;
          animation: progressFill 2s ease-out;
          transform-origin: left;
        }

        @keyframes progressFill {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .progress-text {
          font-size: 0.9rem;
          color: #10b981;
          font-weight: 600;
        }

        /* Section Équipe */
        .team-info {
          text-align: center;
        }

        .class-badge {
          margin-bottom: 40px;
        }

        .class-label {
          display: inline-block;
          padding: 15px 30px;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          border-radius: 25px;
          font-size: 1.2rem;
          font-weight: 600;
          animation: badgePulse 2s ease-in-out infinite;
        }

        @keyframes badgePulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 20px rgba(99, 102, 241, 0);
          }
        }

        .team-members {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .member-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          animation: memberSlideIn 1s ease-out;
        }

        .member-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .member-card:nth-child(1) { animation-delay: 0.2s; }
        .member-card:nth-child(2) { animation-delay: 0.4s; }
        .member-card:nth-child(3) { animation-delay: 0.6s; }

        @keyframes memberSlideIn {
          from {
            opacity: 0;
            transform: translateX(-50px) rotateY(20deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
          }
        }

        .member-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #f59e0b, #ec4899);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          position: relative;
          overflow: hidden;
        }

        .member-avatar::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #ec4899, #10b981);
          animation: avatarRotate 3s linear infinite;
          z-index: -1;
        }

        @keyframes avatarRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .avatar-initials {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .member-info h3 {
          font-size: 1.3rem;
          margin-bottom: 8px;
          color: #f8fafc;
        }

        .member-info p {
          color: #c4b5fd;
          font-size: 1rem;
        }

        .project-timeline {
          display: flex;
          justify-content: center;
        }

        .timeline-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px 40px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          backdrop-filter: blur(10px);
        }

        .timeline-icon {
          font-size: 2rem;
        }

        .timeline-content h4 {
          font-size: 1.1rem;
          margin-bottom: 5px;
          color: #f8fafc;
        }

        .timeline-content p {
          color: #c4b5fd;
          margin: 0;
        }

        /* Section Architecture */
        .tech-stack {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 40px;
        }

        .tech-category {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 30px;
          backdrop-filter: blur(10px);
        }

        .tech-category h3 {
          font-size: 1.5rem;
          margin-bottom: 25px;
          color: #f8fafc;
          text-align: center;
          position: relative;
        }

        .tech-category h3::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 3px;
          background: linear-gradient(90deg, #6366f1, #ec4899);
          border-radius: 2px;
        }

        .tech-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .tech-item {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 15px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          transition: all 0.3s ease;
          animation: techItemFloat 1s ease-out;
        }

        .tech-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(10px);
        }

        @keyframes techItemFloat {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tech-logo {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          animation: logoSpin 4s ease-in-out infinite;
        }

        .react-logo { background: linear-gradient(135deg, #61dafb, #21a1c4); }
        .css-logo { background: linear-gradient(135deg, #1572b6, #33a9dc); }
        .icons-logo { background: linear-gradient(135deg, #f59e0b, #d97706); }
        .storage-logo { background: linear-gradient(135deg, #10b981, #059669); }
        .responsive-logo { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }
        .animation-logo { background: linear-gradient(135deg, #ec4899, #be185d); }

        @keyframes logoSpin {
          0%, 100% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) scale(1.1);
          }
          50% {
            transform: rotate(180deg) scale(1);
          }
          75% {
            transform: rotate(270deg) scale(1.1);
          }
        }

        .tech-item span {
          font-size: 1.1rem;
          font-weight: 500;
          color: #f8fafc;
        }

        /* Section Fonctionnalités */
        .features-showcase {
          text-align: center;
        }

        .feature-highlight {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(236, 72, 153, 0.2));
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 40px;
          backdrop-filter: blur(10px);
          animation: highlightPulse 3s ease-in-out infinite;
        }

        @keyframes highlightPulse {
          0%, 100% {
            box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(99, 102, 241, 0.6);
          }
        }

        .feature-highlight h3 {
          font-size: 1.8rem;
          margin-bottom: 15px;
          color: #f8fafc;
        }

        .feature-highlight p {
          font-size: 1.2rem;
          color: #c4b5fd;
          margin: 0;
        }

        .features-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .feature-item-animated {
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
          animation: featurePopIn 0.8s ease-out both;
          transition: all 0.3s ease;
        }

        .feature-item-animated:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        @keyframes featurePopIn {
          from {
            opacity: 0;
            transform: scale(0.8) rotateX(90deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotateX(0deg);
          }
        }

        /* Section Finale */
        .finale-section {
          text-align: center;
        }

        .finale-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .rocket-animation {
          margin-bottom: 30px;
          position: relative;
        }

        .rocket-icon {
          width: 100px;
          height: 100px;
          color: #f59e0b;
          animation: rocketLaunch 2s ease-in-out infinite;
        }

        @keyframes rocketLaunch {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(-5deg);
          }
          50% {
            transform: translateY(-30px) rotate(0deg);
          }
          75% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        .finale-content h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #f59e0b, #ec4899, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .finale-content p {
          font-size: 1.3rem;
          margin-bottom: 30px;
          color: #c4b5fd;
        }

        .countdown {
          display: flex;
          justify-content: center;
        }

        .countdown-circle {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: 700;
          color: white;
          animation: countdownPulse 1s ease-in-out infinite;
          position: relative;
        }

        .countdown-circle::before {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #ec4899);
          animation: countdownRing 1s ease-in-out infinite;
          z-index: -1;
        }

        @keyframes countdownPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes countdownRing {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .project-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .mockup-phone {
            max-width: 300px;
            margin: 0 auto;
          }

          .objectives-grid {
            grid-template-columns: 1fr;
          }

          .tech-stack {
            grid-template-columns: 1fr;
          }

          .main-title {
            font-size: 3rem;
          }

          .subtitle {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .presentation-main {
            padding: 20px;
          }

          .intro-badges {
            flex-direction: column;
            align-items: center;
            gap: 15px;
          }

          .team-members {
            grid-template-columns: 1fr;
          }

          .features-list {
            grid-template-columns: 1fr;
          }

          .main-title {
            font-size: 2.5rem;
          }

          .section-header h2 {
            font-size: 2rem;
          }

          .presentation-controls {
            top: 10px;
            right: 10px;
            flex-wrap: wrap;
          }

          .control-btn, .skip-btn {
            padding: 10px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .main-title {
            font-size: 2rem;
          }

          .subtitle {
            font-size: 1.2rem;
          }

          .section-header h2 {
            font-size: 1.5rem;
          }

          .objectives-grid,
          .features-list {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .objective-card,
          .member-card,
          .tech-category {
            padding: 20px;
          }

          .presentation-controls {
            position: relative;
            top: auto;
            right: auto;
            margin-bottom: 20px;
            justify-content: center;
          }
        }

        /* Accessibilité et préférences utilisateur */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @media (prefers-color-scheme: light) {
          .presentation-container {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e0 100%);
            color: #1a202c;
          }
        }
      `}</style>
    </div>
  );
};

export default PresentationPage;