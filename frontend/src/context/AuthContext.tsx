import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { dummyUsers, loginCredentials } from '../data/dummy';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = () => {
      const storedUser = sessionStorage.getItem('user');
      const rememberedUser = localStorage.getItem('rememberedUser');

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else if (rememberedUser) {
        const parsed = JSON.parse(rememberedUser);
        setUser(parsed);
        sessionStorage.setItem('user', JSON.stringify(parsed));
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

  const login = async (email: string, password: string, rememberMe?: boolean) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const role = Object.entries(loginCredentials).find(
      ([, creds]) => creds.email === email && creds.password === password
    )?.[0] as UserRole | undefined;

    if (!role) {
      setIsLoading(false);
      return { success: false, error: 'Email atau password salah' };
    }

    const foundUser = dummyUsers.find((u) => u.role === role);
    if (!foundUser) {
      setIsLoading(false);
      return { success: false, error: 'User tidak ditemukan' };
    }

    const sessionUser = { ...foundUser, email };

    setUser(sessionUser);
    sessionStorage.setItem('user', JSON.stringify(sessionUser));
    sessionStorage.setItem('authToken', `token-${Date.now()}`);

    if (rememberMe) {
      localStorage.setItem('rememberedUser', JSON.stringify(sessionUser));
    }

    setIsLoading(false);
    return { success: true };
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (password.length < 8) {
      setIsLoading(false);
      return { success: false, error: 'Password minimal 8 karakter' };
    }

    const existingUser = dummyUsers.find((u) => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: 'Email sudah terdaftar' };
    }

    const newUser: User = {
      id: `u${Date.now()}`,
      email,
      name,
      role,
      phone: '',
    };

    setUser(newUser);
    sessionStorage.setItem('user', JSON.stringify(newUser));
    sessionStorage.setItem('authToken', `token-${Date.now()}`);

    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');
    localStorage.removeItem('rememberedUser');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      sessionStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
