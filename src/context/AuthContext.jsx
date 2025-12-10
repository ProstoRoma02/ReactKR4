import { createContext, useContext, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useLocalStorage('auth-state', {
    isAuthenticated: false,
    user: null,
  });

  const login = (credentials) => {
    const user = { name: credentials.username || 'Пользователь' };
    setAuthState({ isAuthenticated: true, user });
  };

  const logout = () => setAuthState({ isAuthenticated: false, user: null });

  const value = useMemo(
    () => ({
      ...authState,
      login,
      logout,
    }),
    [authState],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};

