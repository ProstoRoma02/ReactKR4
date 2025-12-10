import { useCallback, useEffect, useState } from 'react';

const isBrowser = typeof window !== 'undefined';

export const useLocalStorage = (key, initialValue) => {
  const readValue = useCallback(() => {
    if (!isBrowser) {
      return initialValue;
    }

    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Ошибка чтения из localStorage', error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (isBrowser) {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error('Ошибка записи в localStorage', error);
      }
    },
    [key, storedValue],
  );

  return [storedValue, setValue];
};

