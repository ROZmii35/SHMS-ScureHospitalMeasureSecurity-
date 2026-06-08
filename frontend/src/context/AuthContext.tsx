// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

const BASE_URL = "http://localhost";  // port 80

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

async function fetchProfile(token: string): Promise<User | null> {
    try {
        const res = await fetch(`${BASE_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return null;
        return await res.json();
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function restore() {
            const token = sessionStorage.getItem("authToken")
                ?? localStorage.getItem("authToken");
            if (!token) { setIsLoading(false); return; }

            const cached = sessionStorage.getItem("user") ?? localStorage.getItem("user");
            if (cached) setUser(JSON.parse(cached));

            const profile = await fetchProfile(token);
            if (profile) {
                setUser(profile);
                sessionStorage.setItem("user", JSON.stringify(profile));
            } else {
                sessionStorage.clear();
                localStorage.removeItem("authToken");
                localStorage.removeItem("user");
                setUser(null);
            }
            setIsLoading(false);
        }
        restore();
    }, []);

    const login = async (email: string, password: string, rememberMe?: boolean) => {
        setIsLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                return { success: false, error: data.error || "Email atau password salah" };
            }

            // Response sekarang JSON: { token: "..." }
            const token: string = data.token;
            sessionStorage.setItem("authToken", token);
            if (rememberMe) localStorage.setItem("authToken", token);

            const profile = await fetchProfile(token);
            if (profile) {
                setUser(profile);
                sessionStorage.setItem("user", JSON.stringify(profile));
                if (rememberMe) localStorage.setItem("user", JSON.stringify(profile));
            }

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
            const data = await res.json();
            if (!res.ok) {
                return { success: false, error: data.error || "Register gagal" };
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
        sessionStorage.clear();
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
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
