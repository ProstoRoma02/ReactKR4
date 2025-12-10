import { createContext, useContext } from 'react';
import { useTechnologies } from '../hooks/useTechnologies.js';

const TechnologiesContext = createContext(null);

export const TechnologiesProvider = ({ children }) => {
  const value = useTechnologies();
  return <TechnologiesContext.Provider value={value}>{children}</TechnologiesContext.Provider>;
};

export const useTechnologiesContext = () => {
  const context = useContext(TechnologiesContext);
  if (!context) {
    throw new Error('useTechnologiesContext должен использоваться внутри TechnologiesProvider');
  }
  return context;
};

