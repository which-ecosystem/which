import { useState, useCallback } from 'react';

type Value = string | null;
type Setter = (value: Value) => void;

export default (key: string): [Value, Setter] => {
  const [state, setState] = useState<Value>(() => localStorage.getItem(key) || null);

  const update: Setter = useCallback(value => {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
    setState(value);
  }, [key]);

  return [state, update];
};
