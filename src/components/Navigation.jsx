import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav className="navigation">
    <NavLink to="/" end>
      Главная
    </NavLink>
    <NavLink to="/technologies">Технологии</NavLink>
    <NavLink to="/add-technology">Добавить</NavLink>
    <NavLink to="/stats">Статистика</NavLink>
    <NavLink to="/settings">Настройки</NavLink>
    <NavLink to="/mui">MUI</NavLink>
    <NavLink to="/login">Вход</NavLink>
  </nav>
);

export default Navigation;

