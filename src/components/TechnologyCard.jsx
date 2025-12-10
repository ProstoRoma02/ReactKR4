import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal.jsx';
import TechnologyForm from './TechnologyForm.jsx';

const STATUS_LABELS = {
  'not-started': 'Не начата',
  'in-progress': 'В процессе',
  completed: 'Завершена',
};

const statusClassMap = {
  'not-started': 'card card-muted',
  'in-progress': 'card card-warning',
  completed: 'card card-success',
};

const TechnologyCard = ({ technology, onStatusCycle, onNotesChange, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <article className={statusClassMap[technology.status]}>
        <header className="card-header">
          <div>
            <h3>
              <Link to={`/technology/${technology.id}`}>{technology.title}</Link>
            </h3>
            <span className="badge">{STATUS_LABELS[technology.status]}</span>
          </div>
          <button
            type="button"
            className="ghost-button"
            onClick={() => setIsEditing(true)}
            aria-label="Редактировать технологию"
          >
            ⚙️
          </button>
        </header>
        <p className="card-description">{technology.description}</p>
        <ul className="card-meta">
          <li>Категория: {technology.category}</li>
          <li>Сложность: {technology.difficulty}</li>
          {technology.deadline && <li>Дедлайн: {technology.deadline}</li>}
        </ul>
        <div className="card-resources">
          {technology.resources?.map((resource, index) => (
            <a key={resource + index} href={resource} target="_blank" rel="noreferrer">
              Ресурс {index + 1}
            </a>
          ))}
        </div>
        <textarea
          className="card-notes"
          placeholder="Заметки..."
          value={technology.notes}
          onChange={(event) => onNotesChange(technology.id, event.target.value)}
          aria-label={`Заметки к технологии ${technology.title}`}
        />
        <button type="button" className="primary-button" onClick={() => onStatusCycle(technology.id)}>
          Сменить статус
        </button>
      </article>

      {isEditing && (
        <Modal title={`Редактирование ${technology.title}`} onClose={() => setIsEditing(false)}>
          <TechnologyForm
            initialData={technology}
            onSubmit={(updated) => {
              onUpdate(updated);
              setIsEditing(false);
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default TechnologyCard;

