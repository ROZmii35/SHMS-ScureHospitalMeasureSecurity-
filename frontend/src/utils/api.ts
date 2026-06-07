// src/utils/api.ts

const BASE_URL = "http://localhost:8080";

function getToken(): string | null {
    return sessionStorage.getItem("authToken");
}

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...((options.headers as Record<string, string>) ?? {}),
    };
    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || `HTTP error ${res.status}`);
    }
    return res.json() as Promise<T>;
}
