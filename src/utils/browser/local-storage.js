/**
 * @type {Storage}
 */
const localStorage = {
  setItem: (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    const value = window.localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  },
  removeItem: (key) => {
    window.localStorage.removeItem(key);
  },
  clear: () => window.localStorage.clear(),
  key: (index) => window.localStorage.key(index),
  get length() {
    return window.localStorage.length;
  },
};

export default localStorage;
