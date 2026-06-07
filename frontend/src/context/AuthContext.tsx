// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

const BASE_URL = "http://localhost:8080";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string, rememberMe?: boolean)
        => Promise<{ success: boolean; error?: string }>;
    register: (name: string, email: string, password: string, role: UserRole)
        => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = sessionStorage.getItem("user");
        const remembered = localStorage.getItem("rememberedUser");
        if (stored) setUser(JSON.parse(stored));
        else if (remembered) {
            const parsed = JSON.parse(remembered);
            setUser(parsed);
            sessionStorage.setItem("user", JSON.stringify(parsed));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string, rememberMe?: boolean) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const msg = await res.text();
                return { success: false, error: msg || "Login gagal" };
            }
            const token: string = await res.text();  // backend returns plain JWT string
            sessionStorage.setItem("authToken", token);
            const sessionUser: User = { id: "", email, name: email, role: "patient" };
            setUser(sessionUser);
            sessionStorage.setItem("user", JSON.stringify(sessionUser));
            if (rememberMe) localStorage.setItem("rememberedUser", JSON.stringify(sessionUser));
            return { success: true };
        } catch (e: unknown) {
            return { success: false, error: (e as Error).message };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string, role: UserRole) => {
        setIsLoading(true);
        try {
            const roleMap: Record<UserRole, string> = {
                admin: "ADMIN", doctor: "DOKTER",
                patient: "PASIEN", pharmacist: "APOTEKER",
            };
            const res = await fetch(`${BASE_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullname: name, email, password, role: roleMap[role],
                }),
            });
            if (!res.ok) {
                const msg = await res.text();
                return { success: false, error: msg || "Register gagal" };
            }
            return { success: true };
        } catch (e: unknown) {
            return { success: false, error: (e as Error).message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("authToken");
        localStorage.removeItem("rememberedUser");
    };

    const updateProfile = (updates: Partial<User>) => {
        if (user) {
            const updated = { ...user, ...updates };
            setUser(updated);
            sessionStorage.setItem("user", JSON.stringify(updated));
        }
    };

    return (
        <AuthContext.Provider value={{
            user, isAuthenticated: !!user, isLoading,
            login, register, logout, updateProfile,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
