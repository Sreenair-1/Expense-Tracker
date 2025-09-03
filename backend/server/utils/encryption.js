const CryptoJS = require('crypto-js');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
    throw new Error('ENCRYPTION_KEY environment variable is required');
}

/**
 * Encrypt sensitive data
 * @param {string} text - The text to encrypt
 * @returns {string} - Encrypted text
 */
const encrypt = (text) => {
    if (!text || typeof text !== 'string') {
        return text;
    }
    try {
        return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY).toString();
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Failed to encrypt data');
    }
};

/**
 * Decrypt sensitive data
 * @param {string} encryptedText - The encrypted text to decrypt
 * @returns {string} - Decrypted text
 */
const decrypt = (encryptedText) => {
    if (!encryptedText || typeof encryptedText !== 'string') {
        return encryptedText;
    }
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, ENCRYPTION_KEY);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        return decryptedText || encryptedText; // Return original if decryption fails (for backwards compatibility)
    } catch (error) {
        console.error('Decryption error:', error);
        return encryptedText; // Return original if decryption fails
    }
};

/**
 * Check if a string is encrypted (basic check)
 * @param {string} text - Text to check
 * @returns {boolean} - True if likely encrypted
 */
const isEncrypted = (text) => {
    if (!text || typeof text !== 'string') {
        return false;
    }
    // Basic check: encrypted text usually doesn't contain common email/username patterns
    return !text.includes('@') && !text.includes('.') && text.length > 20;
};

module.exports = {
    encrypt,
    decrypt,
    isEncrypted
};