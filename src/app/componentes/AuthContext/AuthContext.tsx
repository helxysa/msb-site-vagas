import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
  setSelectedVagaId: (id: string | null) => void;
}

const defaultContextValue: AuthContextType = {
  userId: null,
  setUserId: () => {},
  setSelectedVagaId: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedVagaId, setSelectedVagaId] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{ userId, setUserId, setSelectedVagaId  }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}