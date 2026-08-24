import { createContext, useContext, useState, useCallback } from 'react';
import Storage, { KEYS } from '../utils/localStorage';
import { generateId } from '../utils/quizUtils';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => Storage.get(KEYS.CURRENT_USER));

  const login = useCallback((email, password) => {
    const users = Storage.get(KEYS.USERS, []);
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      return { success: false, message: 'Invalid email or password' };
    }
    setUser(found);
    Storage.set(KEYS.CURRENT_USER, found);
    return { success: true, user: found };
  }, []);

  const register = useCallback((name, email, password, role = 'student') => {
    const users = Storage.get(KEYS.USERS, []);
    if (users.find((u) => u.email === email)) {
      return { success: false, message: 'Email already registered' };
    }
    const newUser = {
      id: generateId(),
      name,
      email,
      password,
      role,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    Storage.set(KEYS.USERS, users);
    setUser(newUser);
    Storage.set(KEYS.CURRENT_USER, newUser);
    return { success: true, user: newUser };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    Storage.remove(KEYS.CURRENT_USER);
  }, []);

  const updateProfile = useCallback((updates) => {
    const users = Storage.get(KEYS.USERS, []);
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx === -1) return { success: false, message: 'User not found' };
    users[idx] = { ...users[idx], ...updates };
    Storage.set(KEYS.USERS, users);
    setUser(users[idx]);
    Storage.set(KEYS.CURRENT_USER, users[idx]);
    return { success: true };
  }, [user]);

  // NEW: Change password
  const changePassword = useCallback((currentPassword, newPassword) => {
    if (!user) return { success: false, message: 'Not logged in' };
    if (user.password !== currentPassword) {
      return { success: false, message: 'Current password is incorrect' };
    }
    const users = Storage.get(KEYS.USERS, []);
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx === -1) return { success: false, message: 'User not found' };
    users[idx] = { ...users[idx], password: newPassword };
    Storage.set(KEYS.USERS, users);
    const updatedUser = { ...users[idx] };
    setUser(updatedUser);
    Storage.set(KEYS.CURRENT_USER, updatedUser);
    return { success: true };
  }, [user]);

  const getAllStudents = useCallback(() => {
    const users = Storage.get(KEYS.USERS, []);
    return users.filter((u) => u.role === 'student');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        changePassword,   // <-- exposed
        getAllStudents,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Named export for the hook – this is what the error was missing
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}