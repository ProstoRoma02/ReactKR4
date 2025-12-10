import { useState } from 'react';
import { useTechnologiesApi } from '../hooks/useTechnologiesApi.js';

const RoadmapImporter = ({ onImport }) => {
  const { loading, error, fetchTechnologies } = useTechnologiesApi();
  const [status, setStatus] = useState('');

  const handleImport = async () => {
    setStatus('Загрузка...');
    try {
      const technologies = await fetchTechnologies();
      if (technologies.length) {
        onImport(technologies);
        setStatus(`Импортировано: ${technologies.length}`);
      } else {
        setStatus('Нет данных для импорта');
      }
    } catch (err) {
      setStatus(err.message || 'Ошибка импорта');
    }
  };

  return (
    <section className="roadmap-importer">
      <h3>Импорт дорожной карты</h3>
      <p>Загрузите новые технологии из внешнего API и добавьте их в список.</p>
      <button type="button" className="secondary-button" onClick={handleImport} disabled={loading}>
        {loading ? 'Импорт...' : 'Импортировать'}
      </button>
      <p role="status" aria-live="polite">
        {error?.message || status}
      </p>
    </section>
  );
};

export default RoadmapImporter;

