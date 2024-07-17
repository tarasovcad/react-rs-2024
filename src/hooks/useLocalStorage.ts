import {useState} from "react";

export default function useLocalStorage<T extends {}>(
  key: string,
  defaultValue: T,
) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue) {
        return JSON.parse(storedValue);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setItem = (value: unknown) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, setValue, setItem];
}
