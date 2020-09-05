import { useState, useEffect } from 'react';

function getvalue(key, initialValue) {
  const savedValue = JSON.parse(localStorage.getItem(key))
  if (savedValue) return savedValue;
  if (initialValue instanceof Function) return initialValue();
  return initialValue;
}

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    return getvalue(key, initialValue);
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])

  return [value, setValue]
}
