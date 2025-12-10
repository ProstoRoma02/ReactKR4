import { useNavigate, useParams } from 'react-router-dom';
import TechnologyForm from '../components/TechnologyForm.jsx';
import { useTechnologiesContext } from '../context/TechnologiesContext.jsx';

const TechnologyDetail = () => {
  const { techId } = useParams();
  const navigate = useNavigate();
  const { technologies, updateTechnology } = useTechnologiesContext();

  const technology = technologies.find((tech) => String(tech.id) === techId);

  if (!technology) {
    return (
      <section className="page">
        <h1>Технология не найдена</h1>
        <button type="button" className="secondary-button" onClick={() => navigate('/technologies')}>
          Вернуться к списку
        </button>
      </section>
    );
  }

  return (
    <section className="page">
      <header className="page-header">
        <div>
          <h1>{technology.title}</h1>
          <p>{technology.description}</p>
        </div>
      </header>

      <TechnologyForm
        initialData={technology}
        onSubmit={(payload) => {
          updateTechnology(payload);
          navigate('/technologies');
        }}
        onCancel={() => navigate(-1)}
      />
    </section>
  );
};

export default TechnologyDetail;

