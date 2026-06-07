import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUnauthorizedCallback } from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [profil, setProfil] = useState(null); // 'etudiant' | 'commercant'
  const [loading, setLoading] = useState(true);

  // Enregistre le callback de logout pour l'intercepteur axios
  useEffect(() => {
    setUnauthorizedCallback(logout);
  }, []);

  // Vérifie le token stocké au démarrage
  useEffect(() => {
    const restore = async () => {
      try {
        const stored = await AsyncStorage.getItem('pointify_token');
        const storedProfil = await AsyncStorage.getItem('pointify_profil');
        const storedUser = await AsyncStorage.getItem('pointify_user');
        if (stored && storedProfil) {
          setToken(stored);
          setProfil(storedProfil);
          if (storedUser) setUser(JSON.parse(storedUser));
        }
      } catch (_) {
        // Ignore
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  const login = async ({ token: t, user: u, profil: p }) => {
    await AsyncStorage.setItem('pointify_token', t);
    await AsyncStorage.setItem('pointify_profil', p);
    await AsyncStorage.setItem('pointify_user', JSON.stringify(u));
    setToken(t);
    setUser(u);
    setProfil(p);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(['pointify_token', 'pointify_profil', 'pointify_user']);
    setToken(null);
    setUser(null);
    setProfil(null);
  };

  const updateUser = (u) => {
    setUser(u);
    AsyncStorage.setItem('pointify_user', JSON.stringify(u));
  };

  return (
    <AuthContext.Provider value={{ token, user, profil, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
