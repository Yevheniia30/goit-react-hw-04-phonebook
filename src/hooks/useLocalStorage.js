import { useEffect, useState } from 'react';

export const useLocalStorage = (
  key,
  defaultValue,
  serialize = JSON.stringify,
  deserialize = JSON.parse
) => {
  const [state, setState] = useState(() => {
    // console.log('get localstorage');
    return deserialize(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, serialize(state));
  }, [key, serialize, state]);

  return [state, setState];
};
