const Storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  clear() {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  }
};

export const KEYS = {
  USERS: 'quizapp_users',
  CURRENT_USER: 'quizapp_current_user',
  QUIZZES: 'quizapp_quizzes',
  ATTEMPTS: 'quizapp_attempts',
  THEME: 'quizapp_theme',
};

export default Storage;
