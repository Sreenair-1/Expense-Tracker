/**
 * Secure storage utilities for managing JWT tokens and user data
 */

// Simple XOR encryption for localStorage (better than plain text)
const STORAGE_KEY = 'expense_app_data';
const XOR_KEY = 'expense-tracker-2024-secure';

const xorEncrypt = (text, key) => {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(result); // Base64 encode
};

const xorDecrypt = (encryptedText, key) => {
    try {
        const text = atob(encryptedText); // Base64 decode
        let result = '';
        for (let i = 0; i < text.length; i++) {
            result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return result;
    } catch (error) {
        console.error('Decryption failed:', error);
        return null;
    }
};

export const tokenStorage = {
    // Store token securely
    setToken: (token) => {
        if (!token) return;
        const encrypted = xorEncrypt(token, XOR_KEY);
        localStorage.setItem(`${STORAGE_KEY}_token`, encrypted);
    },

    // Retrieve token
    getToken: () => {
        const encrypted = localStorage.getItem(`${STORAGE_KEY}_token`);
        if (!encrypted) return null;
        return xorDecrypt(encrypted, XOR_KEY);
    },

    // Store minimal user data
    setUserData: (userData) => {
        if (!userData) return;
        // Only store non-sensitive data
        const safeData = {
            id: userData._id || userData.id,
            username: userData.username,
            // Don't store email or other sensitive data
        };
        const encrypted = xorEncrypt(JSON.stringify(safeData), XOR_KEY);
        localStorage.setItem(`${STORAGE_KEY}_user`, encrypted);
    },

    // Get user data
    getUserData: () => {
        const encrypted = localStorage.getItem(`${STORAGE_KEY}_user`);
        if (!encrypted) return null;
        const decrypted = xorDecrypt(encrypted, XOR_KEY);
        try {
            return JSON.parse(decrypted);
        } catch (error) {
            console.error('Failed to parse user data:', error);
            return null;
        }
    },

    // Clear all stored data
    clearAll: () => {
        localStorage.removeItem(`${STORAGE_KEY}_token`);
        localStorage.removeItem(`${STORAGE_KEY}_user`);
        localStorage.removeItem('user'); // Remove old insecure storage
    },

    // Check if user is logged in
    isLoggedIn: () => {
        const token = tokenStorage.getToken();
        return token !== null;
    },

    // Get authorization header
    getAuthHeader: () => {
        const token = tokenStorage.getToken();
        return token ? `Bearer ${token}` : null;
    }
};

// Migrate from old insecure storage
export const migrateOldStorage = () => {
    const oldUser = localStorage.getItem('user');
    if (oldUser) {
        try {
            // Clear old insecure data immediately
            localStorage.removeItem('user');
            console.log('Cleared insecure user data from localStorage');
        } catch (error) {
            console.error('Failed to migrate old storage:', error);
        }
    }
};

// Initialize migration on module load
migrateOldStorage();