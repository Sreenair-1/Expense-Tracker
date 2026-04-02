const { encrypt, decrypt, isEncrypted } = require('../utils/encryption');

describe('Security Utilities', () => {
    describe('Encryption Utils', () => {
        test('should encrypt and decrypt data correctly', () => {
            const testData = 'test@example.com';
            const encrypted = encrypt(testData);
            const decrypted = decrypt(encrypted);
            
            expect(encrypted).not.toBe(testData);
            expect(decrypted).toBe(testData);
        });

        test('should handle empty/null values', () => {
            expect(encrypt('')).toBe('');
            expect(encrypt(null)).toBe(null);
            expect(decrypt('')).toBe('');
            expect(decrypt(null)).toBe(null);
        });

        test('should identify encrypted vs plain text', () => {
            const plainEmail = 'test@example.com';
            const encryptedEmail = encrypt(plainEmail);
            
            expect(isEncrypted(plainEmail)).toBe(false);
            expect(isEncrypted(encryptedEmail)).toBe(true);
        });

        test('should handle encryption errors gracefully', () => {
            // Test with invalid data types - our function handles this gracefully
            expect(encrypt(123)).toBe(123);
            expect(encrypt(undefined)).toBe(undefined);
        });
    });

    describe('Input Validation', () => {
        test('email validation patterns', () => {
            const validEmails = [
                'test@example.com',
                'user.name@domain.co.uk',
                'test123@test-domain.org'
            ];
            
            const invalidEmails = [
                'invalid-email',
                '@domain.com',
                'test@'
            ];
            
            const emailRegex = /.+\@.+\..+/;
            
            validEmails.forEach(email => {
                expect(emailRegex.test(email)).toBe(true);
            });
            
            invalidEmails.forEach(email => {
                expect(emailRegex.test(email)).toBe(false);
            });
        });

        test('password strength validation', () => {
            const strongPasswords = [
                'Test123!@#',
                'MyPassword1!',
                'Secure123$'
            ];
            
            const weakPasswords = [
                'password',
                'test123',
                'Test123',
                '123456789'
            ];
            
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
            
            strongPasswords.forEach(password => {
                expect(passwordRegex.test(password)).toBe(true);
            });
            
            weakPasswords.forEach(password => {
                expect(passwordRegex.test(password)).toBe(false);
            });
        });
    });
});