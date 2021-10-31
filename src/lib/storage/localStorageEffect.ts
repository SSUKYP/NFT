import { AtomEffect, DefaultValue } from 'recoil';

const localStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet }) => {
    const data = localStorage.getItem(key);
    try {
      if (!data) {
        setSelf(new DefaultValue());
      } else {
        const parsed = JSON.parse(data) as T;
        setSelf(parsed);
      }
    } catch (e) {
      localStorage.removeItem(key);
      setSelf(new DefaultValue());
    }

    onSet(newValue => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export default localStorageEffect;
