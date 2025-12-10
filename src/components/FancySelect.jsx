import { useEffect, useId, useRef, useState } from 'react';

const FancySelect = ({
  value,
  options,
  onChange,
  placeholder = 'Выберите',
  disabled = false,
  name,
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const listboxId = useId();
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!containerRef.current || containerRef.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleToggle = () => {
    if (!disabled) {
      setOpen((prev) => !prev);
    }
  };

  const handleSelect = (option) => {
    if (disabled) return;
    onChange(option.value);
    setOpen(false);
  };

  return (
    <div
      className={`fancy-select ${open ? 'open' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      ref={containerRef}
    >
      <button
        type="button"
        className="fancy-select__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={handleToggle}
        disabled={disabled}
      >
        <span>{selected?.label || placeholder}</span>
        <span className="fancy-select__indicator" aria-hidden="true">
          ▾
        </span>
      </button>

      <ul
        id={listboxId}
        className="fancy-select__dropdown"
        role="listbox"
        aria-activedescendant={selected ? `${listboxId}-${selected.value}` : undefined}
      >
        {options.map((option) => (
          <li
            key={option.value}
            id={`${listboxId}-${option.value}`}
            role="option"
            aria-selected={option.value === value}
            tabIndex={-1}
            onClick={() => handleSelect(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>

      {name ? <input type="hidden" name={name} value={value} /> : null}
    </div>
  );
};

export default FancySelect;

