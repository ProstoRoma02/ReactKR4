import { useEffect, useMemo, useState } from 'react';
import FancySelect from './FancySelect.jsx';

const difficultyOptions = [
  { value: 'beginner', label: 'Начальный' },
  { value: 'intermediate', label: 'Средний' },
  { value: 'advanced', label: 'Продвинутый' },
];

const categoryOptions = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'database', label: 'Database' },
  { value: 'devops', label: 'DevOps' },
  { value: 'other', label: 'Другое' },
];

const defaultState = {
  id: undefined,
  title: '',
  description: '',
  category: 'frontend',
  difficulty: 'beginner',
  deadline: '',
  resources: [''],
  notes: '',
  status: 'not-started',
};

const normalizeDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().split('T')[0];
};

const today = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
};

const TechnologyForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(() => ({
    ...defaultState,
    ...initialData,
    deadline: normalizeDate(initialData?.deadline),
    resources: initialData?.resources?.length ? initialData.resources : [''],
  }));
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...defaultState,
        ...initialData,
        deadline: normalizeDate(initialData.deadline),
        resources: initialData.resources?.length ? initialData.resources : [''],
      });
    }
  }, [initialData]);

  const resourceErrors = useMemo(
    () => errors.resources || formData.resources.map(() => ''),
    [errors.resources, formData.resources],
  );

  const validate = () => {
    const validationErrors = {};
    const trimmedTitle = formData.title.trim();
    const trimmedDescription = formData.description.trim();

    if (!trimmedTitle) {
      validationErrors.title = 'Название обязательно';
    } else if (trimmedTitle.length < 2 || trimmedTitle.length > 50) {
      validationErrors.title = 'Название 2-50 символов';
    }

    if (!trimmedDescription) {
      validationErrors.description = 'Описание обязательно';
    } else if (trimmedDescription.length < 10) {
      validationErrors.description = 'Минимум 10 символов';
    }

    if (formData.deadline) {
      const normalizedDeadline = new Date(formData.deadline);
      normalizedDeadline.setHours(0, 0, 0, 0);
      if (normalizedDeadline < today()) {
        validationErrors.deadline = 'Дедлайн не может быть в прошлом';
      }
    }

    const resourceValidation = formData.resources.map((resource) => {
      if (!resource.trim()) {
        return 'URL обязателен';
      }
      try {
        // eslint-disable-next-line no-new
        new URL(resource);
        return '';
      } catch {
        return 'Некорректный URL';
      }
    });

    if (resourceValidation.some(Boolean)) {
      validationErrors.resources = resourceValidation;
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResourceChange = (index, value) => {
    setFormData((prev) => {
      const updated = [...prev.resources];
      updated[index] = value;
      return { ...prev, resources: updated };
    });
  };

  const handleAddResource = () => {
    setFormData((prev) => ({ ...prev, resources: [...prev.resources, ''] }));
  };

  const handleRemoveResource = (index) => {
    setFormData((prev) => ({
      ...prev,
      resources: prev.resources.filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      setStatusMessage('Исправьте ошибки формы');
      return;
    }

    const cleanedResources = formData.resources.filter((resource) => resource.trim());

    onSubmit({
      ...formData,
      id: initialData?.id,
      title: formData.title.trim(),
      description: formData.description.trim(),
      resources: cleanedResources,
    });

    setStatusMessage('Сохранено');
    if (!initialData) {
      setFormData(defaultState);
    }
  };

  return (
    <form className="technology-form" onSubmit={handleSubmit} noValidate>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {statusMessage}
      </div>
      <label>
        Название *
        <input
          type="text"
          value={formData.title}
          onChange={(event) => handleChange('title', event.target.value)}
          aria-required="true"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <span id="title-error" className="field-error">
            {errors.title}
          </span>
        )}
      </label>
      <label>
        Описание *
        <textarea
          value={formData.description}
          onChange={(event) => handleChange('description', event.target.value)}
          aria-required="true"
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? 'description-error' : undefined}
        />
        {errors.description && (
          <span id="description-error" className="field-error">
            {errors.description}
          </span>
        )}
      </label>
      <label>
        Категория
        <FancySelect
          value={formData.category}
          options={categoryOptions}
          onChange={(newValue) => handleChange('category', newValue)}
        />
      </label>
      <label>
        Сложность
        <FancySelect
          value={formData.difficulty}
          options={difficultyOptions}
          onChange={(newValue) => handleChange('difficulty', newValue)}
        />
      </label>
      <label>
        Дедлайн
        <input
          type="date"
          value={formData.deadline}
          onChange={(event) => handleChange('deadline', event.target.value)}
          min={new Date().toISOString().split('T')[0]}
          aria-invalid={Boolean(errors.deadline)}
          aria-describedby={errors.deadline ? 'deadline-error' : undefined}
        />
        {errors.deadline && (
          <span id="deadline-error" className="field-error">
            {errors.deadline}
          </span>
        )}
      </label>

      <fieldset>
        <legend>Ресурсы *</legend>
        {formData.resources.map((resource, index) => (
          <div key={`resource-${index}`} className="resource-row">
            <input
              type="url"
              value={resource}
              onChange={(event) => handleResourceChange(index, event.target.value)}
              aria-required="true"
              aria-invalid={Boolean(resourceErrors[index])}
              aria-describedby={resourceErrors[index] ? `resource-${index}-error` : undefined}
            />
            {formData.resources.length > 1 && (
              <button type="button" className="ghost-button" onClick={() => handleRemoveResource(index)}>
                Удалить
              </button>
            )}
            {resourceErrors[index] && (
              <span id={`resource-${index}-error`} className="field-error">
                {resourceErrors[index]}
              </span>
            )}
          </div>
        ))}
        <button type="button" className="secondary-button" onClick={handleAddResource}>
          Добавить ресурс
        </button>
      </fieldset>

      <label>
        Заметки
        <textarea value={formData.notes} onChange={(event) => handleChange('notes', event.target.value)} />
      </label>

      <div className="form-actions">
        <button type="submit" className="primary-button">
          Сохранить
        </button>
        {onCancel && (
          <button type="button" className="ghost-button" onClick={onCancel}>
            Отмена
          </button>
        )}
      </div>
    </form>
  );
};

export default TechnologyForm;

