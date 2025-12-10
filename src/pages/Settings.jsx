import { useState } from 'react';
import FancySelect from '../components/FancySelect.jsx';
import { useTechnologiesContext } from '../context/TechnologiesContext.jsx';
import { useThemeMode } from '../context/ThemeContext.jsx';

const themeOptions = [
  { value: 'light', label: 'Светлая' },
  { value: 'dark', label: 'Темная' },
  { value: 'system', label: 'Системная' },
];

const Settings = () => {
  const { resetAllStatuses } = useTechnologiesContext();
  const { themeMode, setThemeMode, resolvedMode } = useThemeMode();
  const [confirm, setConfirm] = useState(false);

  return (
    <section className="page">
      <header className="page-header">
        <h1>Настройки</h1>
        <p>Управляйте параметрами приложения.</p>
      </header>

      <div className="panel">
        <label>
          Тема (активная: {resolvedMode === 'dark' ? 'тёмная' : 'светлая'})
          <FancySelect value={themeMode} options={themeOptions} onChange={setThemeMode} />
        </label>
      </div>

      <div className="panel">
        <label>
          <input type="checkbox" checked={confirm} onChange={(event) => setConfirm(event.target.checked)} />{' '}
          Подтверждать массовые действия
        </label>
        <button type="button" className="secondary-button" onClick={resetAllStatuses} disabled={!confirm}>
          Очистить прогресс
        </button>
      </div>
    </section>
  );
};

export default Settings;

