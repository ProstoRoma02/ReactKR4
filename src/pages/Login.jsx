import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError('Введите логин и пароль');
      return;
    }
    login(credentials);
    navigate('/');
  };

  return (
    <section className="page">
      <header className="page-header">
        <h1>Вход</h1>
      </header>

      <form className="technology-form" onSubmit={handleSubmit}>
        <label>
          Логин
          <input
            type="text"
            value={credentials.username}
            onChange={(event) => setCredentials((prev) => ({ ...prev, username: event.target.value }))}
          />
        </label>
        <label>
          Пароль
          <input
            type="password"
            value={credentials.password}
            onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))}
          />
        </label>
        {error && <p className="field-error">{error}</p>}
        <button type="submit" className="primary-button">
          Войти
        </button>
      </form>
    </section>
  );
};

export default Login;

