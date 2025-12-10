import { useMemo } from 'react';
import ProgressBar from '../components/ProgressBar.jsx';
import { useTechnologiesContext } from '../context/TechnologiesContext.jsx';

const Stats = () => {
  const { technologies, calculateProgress } = useTechnologiesContext();

  const stats = useMemo(() => {
    const byStatus = technologies.reduce(
      (acc, tech) => {
        acc[tech.status] += 1;
        acc.categories[tech.category] = (acc.categories[tech.category] || 0) + 1;
        return acc;
      },
      { 'not-started': 0, 'in-progress': 0, completed: 0, categories: {} },
    );

    return byStatus;
  }, [technologies]);

  return (
    <section className="page">
      <header className="page-header">
        <h1>Статистика</h1>
        <p>Отслеживайте прогресс по статусам и категориям.</p>
      </header>

      <div className="panel">
        <h2>Общий прогресс</h2>
        <ProgressBar progress={calculateProgress()} height={18} animated />
      </div>

      <div className="panel grid stats-grid">
        <article className="stat-card">
          <h3>Не начатые</h3>
          <p>{stats['not-started']}</p>
        </article>
        <article className="stat-card">
          <h3>В процессе</h3>
          <p>{stats['in-progress']}</p>
        </article>
        <article className="stat-card">
          <h3>Завершенные</h3>
          <p>{stats.completed}</p>
        </article>
      </div>

      <section className="panel">
        <h2>По категориям</h2>
        <ul>
          {Object.entries(stats.categories).map(([category, count]) => (
            <li key={category}>
              {category}: {count}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Stats;

