// src/components/Statistics.js
import React, { useMemo } from 'react';
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  Mail,
  BarChart3,
  PieChart
} from 'lucide-react';

const Statistics = ({ people }) => {
  const stats = useMemo(() => {
    if (!people || people.length === 0) {
      return {
        totalPeople: 0,
        uniqueJobs: 0,
        recentAdditions: 0,
        jobDistribution: [],
        averageAdditionsPerDay: 0,
        mostCommonDomain: 'N/A'
      };
    }

    // Calcul des statistiques
    const totalPeople = people.length;
    
    // Jobs uniques
    const jobs = people.map(p => p.job.toLowerCase().trim());
    const uniqueJobs = new Set(jobs).size;
    
    // Ajouts récents (7 derniers jours)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentAdditions = people.filter(p => 
      p.dateAdded && new Date(p.dateAdded) >= sevenDaysAgo
    ).length;

    // Distribution des métiers
    const jobCounts = {};
    jobs.forEach(job => {
      jobCounts[job] = (jobCounts[job] || 0) + 1;
    });
    
    const jobDistribution = Object.entries(jobCounts)
      .map(([job, count]) => ({
        job: job.charAt(0).toUpperCase() + job.slice(1),
        count,
        percentage: Math.round((count / totalPeople) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Moyenne d'ajouts par jour (sur les 30 derniers jours)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentPeople = people.filter(p => 
      p.dateAdded && new Date(p.dateAdded) >= thirtyDaysAgo
    );
    const averageAdditionsPerDay = (recentPeople.length / 30).toFixed(1);

    // Domaine email le plus commun
    const domains = people.map(p => p.email.split('@')[1]).filter(Boolean);
    const domainCounts = {};
    domains.forEach(domain => {
      domainCounts[domain] = (domainCounts[domain] || 0) + 1;
    });
    const mostCommonDomain = Object.entries(domainCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

    return {
      totalPeople,
      uniqueJobs,
      recentAdditions,
      jobDistribution,
      averageAdditionsPerDay,
      mostCommonDomain
    };
  }, [people]);

  const StatCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
    <div className={`stat-card stat-card-${color}`}>
      <div className="stat-icon-wrapper">
        <Icon className="stat-icon" />
        <div className="stat-icon-bg"></div>
      </div>
      <div className="stat-content">
        <div className="stat-value">{value}</div>
        <div className="stat-title">{title}</div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
      </div>
      <div className="stat-decoration"></div>
    </div>
  );

  return (
    <div className="statistics-container">
      <div className="stats-header">
        <div className="stats-title">
          <BarChart3 className="stats-title-icon" />
          <h2>Tableau de Bord</h2>
        </div>
        <div className="stats-subtitle">
          Aperçu des données de votre annuaire
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="stats-grid">
        <StatCard
          icon={Users}
          title="Total Collaborateurs"
          value={stats.totalPeople}
          subtitle="Dans l'annuaire"
          color="blue"
        />
        
        <StatCard
          icon={Briefcase}
          title="Métiers Différents"
          value={stats.uniqueJobs}
          subtitle="Diversité des postes"
          color="green"
        />
        
        <StatCard
          icon={Clock}
          title="Ajouts Récents"
          value={stats.recentAdditions}
          subtitle="7 derniers jours"
          color="purple"
        />
        
        <StatCard
          icon={TrendingUp}
          title="Moyenne/Jour"
          value={stats.averageAdditionsPerDay}
          subtitle="30 derniers jours"
          color="orange"
        />
      </div>

      {/* Distribution des métiers */}
      {stats.jobDistribution.length > 0 && (
        <div className="job-distribution">
          <div className="distribution-header">
            <PieChart className="distribution-icon" />
            <h3>Répartition des Métiers</h3>
          </div>
          
          <div className="distribution-list">
            {stats.jobDistribution.map((item, index) => (
              <div key={item.job} className="distribution-item">
                <div className="distribution-info">
                  <span className="job-name">{item.job}</span>
                  <span className="job-count">{item.count} personne{item.count > 1 ? 's' : ''}</span>
                </div>
                <div className="distribution-bar">
                  <div 
                    className="distribution-fill"
                    style={{ 
                      width: `${item.percentage}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  ></div>
                  <span className="distribution-percentage">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Informations supplémentaires */}
      <div className="additional-stats">
        <div className="additional-stat">
          <Mail className="additional-icon" />
          <div className="additional-content">
            <span className="additional-label">Domaine principal</span>
            <span className="additional-value">{stats.mostCommonDomain}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .statistics-container {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          padding: 2rem;
          margin-bottom: 2rem;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .statistics-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #4ade80, #22c55e, #16a34a, #15803d);
          background-size: 300% 100%;
          animation: gradientMove 3s ease infinite;
        }

        @keyframes gradientMove {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .stats-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .stats-title {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .stats-title-icon {
          width: 28px;
          height: 28px;
          color: #059669;
        }

        .stats-title h2 {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #059669 0%, #16a34a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stats-subtitle {
          color: #6b7280;
          font-size: 1rem;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 18px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .stat-card-blue {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.05) 100%);
        }

        .stat-card-green {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(21, 128, 61, 0.05) 100%);
        }

        .stat-card-purple {
          background: linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(109, 40, 217, 0.05) 100%);
        }

        .stat-card-orange {
          background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%);
        }

        .stat-icon-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          border-radius: 16px;
          margin-bottom: 1rem;
        }

        .stat-card-blue .stat-icon-wrapper {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        }

        .stat-card-green .stat-icon-wrapper {
          background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
        }

        .stat-card-purple .stat-icon-wrapper {
          background: linear-gradient(135deg, #9333ea 0%, #6d28d9 100%);
        }

        .stat-card-orange .stat-icon-wrapper {
          background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        }

        .stat-icon {
          width: 28px;
          height: 28px;
          color: white;
          z-index: 2;
        }

        .stat-icon-bg {
          position: absolute;
          inset: -2px;
          border-radius: 18px;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: iconRotate 3s linear infinite;
        }

        @keyframes iconRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .stat-content {
          position: relative;
          z-index: 2;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1f2937;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .stat-title {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.25rem;
        }

        .stat-subtitle {
          font-size: 0.85rem;
          color: #6b7280;
        }

        .stat-decoration {
          position: absolute;
          top: -20px;
          right: -20px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          animation: decorationFloat 4s ease-in-out infinite;
        }

        @keyframes decorationFloat {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(-10px, -10px) rotate(120deg);
          }
          66% {
            transform: translate(10px, -5px) rotate(240deg);
          }
        }

        .job-distribution {
          background: rgba(248, 250, 252, 0.8);
          border-radius: 18px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(226, 232, 240, 0.3);
        }

        .distribution-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .distribution-icon {
          width: 24px;
          height: 24px;
          color: #059669;
        }

        .distribution-header h3 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
        }

        .distribution-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .distribution-item {
          background: white;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .distribution-item:hover {
          transform: translateX(4px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .distribution-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .job-name {
          font-weight: 600;
          color: #1f2937;
          font-size: 1rem;
        }

        .job-count {
          font-size: 0.9rem;
          color: #6b7280;
          font-weight: 500;
        }

        .distribution-bar {
          position: relative;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
        }

        .distribution-fill {
          height: 100%;
          background: linear-gradient(90deg, #059669, #16a34a);
          border-radius: 4px;
          animation: barGrow 1s ease-out forwards;
          transform-origin: left;
          transform: scaleX(0);
        }

        @keyframes barGrow {
          to {
            transform: scaleX(1);
          }
        }

        .distribution-percentage {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .additional-stats {
          display: flex;
          justify-content: center;
        }

        .additional-stat {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(67, 56, 202, 0.05) 100%);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          border: 1px solid rgba(99, 102, 241, 0.2);
        }

        .additional-icon {
          width: 24px;
          height: 24px;
          color: #6366f1;
        }

        .additional-content {
          display: flex;
          flex-direction: column;
        }

        .additional-label {
          font-size: 0.85rem;
          color: #6b7280;
          font-weight: 500;
        }

        .additional-value {
          font-size: 1rem;
          color: #1f2937;
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .statistics-container {
            padding: 1.5rem;
            margin-bottom: 1.5rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .stats-title h2 {
            font-size: 1.5rem;
          }

          .stat-value {
            font-size: 2rem;
          }

          .distribution-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }

          .additional-stat {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .stat-card {
            padding: 1rem;
          }

          .stat-icon-wrapper {
            width: 50px;
            height: 50px;
            margin-bottom: 0.75rem;
          }

          .stat-icon {
            width: 24px;
            height: 24px;
          }

          .stat-value {
            font-size: 1.75rem;
          }

          .distribution-item {
            padding: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Statistics;