import { useRef, useState } from 'react';

const DataImportExport = ({ onImport, onExport }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFiles = async (fileList) => {
    const file = fileList?.[0];
    if (!file) return;

    // Очищаем предыдущие сообщения
    setError('');
    setSuccess('');

    // Проверяем тип файла
    if (!file.type.includes('json') && !file.name.endsWith('.json')) {
      setError('Пожалуйста, выберите JSON файл');
      return;
    }

    try {
      console.log('Начинаем импорт файла:', file.name);
      const text = await file.text();
      console.log('Содержимое файла:', text.substring(0, 200) + '...');
      
      const parsed = JSON.parse(text);
      console.log('Парсинг успешен, данные:', parsed);
      
      if (!Array.isArray(parsed)) {
        throw new Error('JSON файл должен содержать массив технологий');
      }
      
      await Promise.resolve(onImport(parsed));
      setError('');
      setSuccess(`Успешно импортировано ${parsed.length} технологий`);
      console.log('Импорт завершен успешно');
      
      // Убираем сообщение об успехе через 3 секунды
      setTimeout(() => setSuccess(''), 3000);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('Ошибка импорта:', err);
      setSuccess('');
      if (err instanceof SyntaxError) {
        setError('Неверный формат JSON файла');
      } else {
        setError(err.message || 'Не удалось импортировать файл');
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  return (
    <section className={`import-export ${dragActive ? 'drag-active' : ''}`}>
      <div
        className="dropzone"
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
      >
        <p>Перетащите JSON сюда или выберите файл</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={(event) => handleFiles(event.target.files)}
        />
      </div>
      {error && <p className="field-error">{error}</p>}
      {success && <p style={{ color: '#56d397', fontSize: '0.9rem' }}>{success}</p>}
      <button type="button" className="secondary-button" onClick={onExport}>
        Экспортировать JSON
      </button>
    </section>
  );
};

export default DataImportExport;

