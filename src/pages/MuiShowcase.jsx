import SimpleTechCard from '../components/SimpleTechCard.jsx';
import MuiDashboard from '../components/MuiDashboard.jsx';
import NotificationCenter from '../components/NotificationCenter.jsx';
import { useTechnologiesContext } from '../context/TechnologiesContext.jsx';

const MuiShowcase = () => {
  const { technologies, updateStatus } = useTechnologiesContext();
  const featured = technologies.slice(0, 3);

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Material UI Showcase</h1>
          <p>Компоненты из практики 26: карточки, дашборд и уведомления.</p>
        </div>
      </header>

      <section className="panel">
        <h2>Карточки технологий</h2>
        <p>Готовые компоненты MUI с типографикой, чипами и кнопками.</p>
        <div className="mui-card-grid">
          {featured.map((technology) => (
            <SimpleTechCard key={technology.id} technology={technology} onStatusChange={updateStatus} />
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Dashboard</h2>
        <MuiDashboard technologies={technologies} />
      </section>

      <section className="panel">
        <NotificationCenter />
      </section>
    </section>
  );
};

export default MuiShowcase;

