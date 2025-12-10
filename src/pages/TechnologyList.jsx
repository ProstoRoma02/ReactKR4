import TechnologyCard from '../components/TechnologyCard.jsx';
import FancySelect from '../components/FancySelect.jsx';
import { useTechnologiesContext } from '../context/TechnologiesContext.jsx';

const statusOptions = [
  { value: 'all', label: 'Все статусы' },
  { value: 'not-started', label: 'Не начатые' },
  { value: 'in-progress', label: 'В процессе' },
  { value: 'completed', label: 'Завершенные' },
];

const categoryOptions = [
  { value: 'all', label: 'Все категории' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'database', label: 'Database' },
  { value: 'devops', label: 'DevOps' },
  { value: 'other', label: 'Другое' },
];

const TechnologyList = () => {
  const {
    filteredTechnologies,
    cycleStatus,
    updateNotes,
    setCategoryFilter,
    categoryFilter,
    setFilterStatus,
    filterStatus,
    setSearchQuery,
    searchQuery,
    updateTechnology,
  } = useTechnologiesContext();

  return (
    <section className="page">
      <header className="page-header">
        <h1>Все технологии</h1>
        <p>Управляйте статусами, заметками и ресурсами напрямую из карточек.</p>
      </header>

      <div className="panel filters">
        <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
        <FancySelect
          value={filterStatus}
          options={statusOptions}
          onChange={(newValue) => setFilterStatus(newValue)}
        />
        <FancySelect
          value={categoryFilter}
          options={categoryOptions}
          onChange={(newValue) => setCategoryFilter(newValue)}
        />
      </div>

      <div className="grid">
        {filteredTechnologies.map((tech) => (
          <TechnologyCard
            key={tech.id}
            technology={tech}
            onStatusCycle={cycleStatus}
            onNotesChange={updateNotes}
            onUpdate={updateTechnology}
          />
        ))}
        {!filteredTechnologies.length && <p>Ничего не найдено.</p>}
      </div>
    </section>
  );
};

export default TechnologyList;

