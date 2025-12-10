import { useEffect } from 'react';

const Modal = ({ title, children, onClose }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button type="button" onClick={onClose} className="ghost-button" aria-label="Закрыть модальное окно">
            ✕
          </button>
        </header>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

