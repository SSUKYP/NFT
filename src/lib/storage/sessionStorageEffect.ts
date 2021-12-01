import { AtomEffect, DefaultValue } from 'recoil';

const sessionStorageEffect =
  <T>(key: string): AtomEffect<T> =>
  ({ setSelf, onSet, trigger }) => {
    if (trigger === 'get') {
      const data = sessionStorage.getItem(key);
      try {
        if (!data) {
          setSelf(new DefaultValue());
        } else {
          const parsed = JSON.parse(data) as T;
          setSelf(parsed);
        }
      } catch (e) {
        sessionStorage.removeItem(key);
        setSelf(new DefaultValue());
      }
    }

    onSet(newValue => {
      if (newValue instanceof DefaultValue) {
        sessionStorage.removeItem(key);
      } else {
        sessionStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export default sessionStorageEffect;
