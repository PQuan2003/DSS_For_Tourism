import {jwtDecode} from "jwt-decode";

export function isLoggedIn() {
    return !!localStorage.getItem("token");
}

export function logout() {
    localStorage.removeItem("token");
}

export function getCurrentUser() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        return jwtDecode(token); 
    } catch {
        return null;
    }
}