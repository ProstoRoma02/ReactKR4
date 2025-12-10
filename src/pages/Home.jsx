import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar.jsx';
import QuickActions from '../components/QuickActions.jsx';
import DataImportExport from '../components/DataImportExport.jsx';
import RoadmapImporter from '../components/RoadmapImporter.jsx';
import WorkingAccessibleForm from '../components/WorkingAccessibleForm.jsx';
import { useTechnologiesContext } from '../context/TechnologiesContext.jsx';

const statusFilters = [
  { value: 'all', label: 'Все' },
  { value: 'not-started', label: 'Не начатые' },
  { value: 'in-progress', label: 'В процессе' },
  { value: 'completed', label: 'Завершенные' },
];

const Home = () => {
  const {
    calculateProgress,
    setSearchQuery,
    searchQuery,
    filterStatus,
    setFilterStatus,
    filteredCount,
    totalCount,
    markAllCompleted,
    resetAllStatuses,
    exportTechnologies,
    importTechnologies,
  } = useTechnologiesContext();

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>Трекер изучения технологий</h1>
          <p>Отслеживайте прогресс, фиксируйте заметки и управляйте дорожными картами.</p>
        </div>
        <Link to="/add-technology" className="primary-button">
          Добавить технологию
        </Link>
      </header>

      <section className="panel">
        <h2>Общий прогресс</h2>
        <ProgressBar progress={calculateProgress()} />
        <p>
          {filteredCount} из {totalCount} технологий удовлетворяют фильтру
        </p>
      </section>

      <section className="panel filters">
        <input
          type="search"
          placeholder="Поиск по названию или описанию..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          aria-label="Поиск технологий"
        />
        <div className="status-filters">
          {statusFilters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              className={filterStatus === filter.value ? 'secondary-button active' : 'secondary-button'}
              onClick={() => setFilterStatus(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      <QuickActions
        onCompleteAll={markAllCompleted}
        onResetAll={resetAllStatuses}
        onExport={exportTechnologies}
      />

      <DataImportExport
        onImport={(data) => importTechnologies(data, { replace: false })}
        onExport={exportTechnologies}
      />

      <RoadmapImporter onImport={(data) => importTechnologies(data, { replace: false })} />

      <WorkingAccessibleForm />
    </section>
  );
};

export default Home;

