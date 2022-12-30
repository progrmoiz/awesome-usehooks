import { useState, useEffect } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const hasWindow = typeof window !== 'undefined';

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (hasWindow) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
      return initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      if (hasWindow) {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (hasWindow) {
      const storageEventHandler = (e: StorageEvent) => {
        if (e.storageArea === window.localStorage && e.key === key) {
          setStoredValue(JSON.parse(e.newValue!));
        }
      };
      window.addEventListener('storage', storageEventHandler);
      return () => {
        window.removeEventListener('storage', storageEventHandler);
      };
    }
  }, [key]);

  return [storedValue, setValue];
};
