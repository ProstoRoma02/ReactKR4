import { useNavigate } from 'react-router-dom';
import TechnologyForm from '../components/TechnologyForm.jsx';
import { useTechnologiesContext } from '../context/TechnologiesContext.jsx';

const AddTechnology = () => {
  const { addTechnology } = useTechnologiesContext();
  const navigate = useNavigate();

  return (
    <section className="page">
      <header className="page-header">
        <h1>Новая технология</h1>
        <p>Заполните форму с обязательными полями и ресурсами.</p>
      </header>

      <TechnologyForm
        onSubmit={(payload) => {
          addTechnology(payload);
          navigate('/technologies');
        }}
        onCancel={() => navigate('/technologies')}
      />
    </section>
  );
};

export default AddTechnology;

