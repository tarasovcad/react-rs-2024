import { useEffect, useState } from 'react';

export default function useLocalStorage(key: string, defaultValue: string) {
  const [value, setValue] = useState<string>(defaultValue);

  useEffect(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        setValue(JSON.parse(storedValue));
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key, defaultValue]);

  const setItem = (newValue: string) => {
    setValue(newValue);
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [value, setValue, setItem] as const;
}
