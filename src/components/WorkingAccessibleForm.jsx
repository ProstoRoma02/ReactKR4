import { useState } from 'react';

const WorkingAccessibleForm = () => {
  const [formState, setFormState] = useState({
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!formState.email.trim()) {
      nextErrors.email = 'Email обязателен';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/i.test(formState.email)) {
      nextErrors.email = 'Некорректный email';
    }

    if (formState.message.trim().length < 5) {
      nextErrors.message = 'Минимум 5 символов';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      setStatus('Исправьте ошибки');
      return;
    }
    
    setIsSubmitting(true);
    setStatus('Отправка...');
    
    try {
      // Имитируем отправку на сервер
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('✅ Сообщение успешно отправлено!');
      setFormState({ email: '', message: '' });
      setErrors({});
      
      // Убираем сообщение об успехе через 3 секунды
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setStatus('❌ Ошибка отправки. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="accessible-form" aria-labelledby="accessible-form-title" onSubmit={handleSubmit}>
      <h3 id="accessible-form-title">Обратная связь</h3>
      {status && (
        <div 
          role="status" 
          aria-live="polite" 
          aria-atomic="true" 
          className={`status-message ${status.includes('✅') ? 'success' : status.includes('❌') ? 'error' : 'info'}`}
        >
          {status}
        </div>
      )}
      <label>
        Email
        <input
          type="email"
          value={formState.email}
          aria-required="true"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'accessible-email-error' : undefined}
          onChange={(event) => setFormState((prev) => ({ ...prev, email: event.target.value }))}
        />
      </label>
      {errors.email && (
        <span id="accessible-email-error" className="field-error">
          {errors.email}
        </span>
      )}
      <label>
        Сообщение
        <textarea
          value={formState.message}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'accessible-message-error' : undefined}
          onChange={(event) => setFormState((prev) => ({ ...prev, message: event.target.value }))}
        />
      </label>
      {errors.message && (
        <span id="accessible-message-error" className="field-error">
          {errors.message}
        </span>
      )}
      <button type="submit" className="primary-button" disabled={isSubmitting}>
        {isSubmitting ? 'Отправка...' : 'Отправить'}
      </button>
    </form>
  );
};

export default WorkingAccessibleForm;

