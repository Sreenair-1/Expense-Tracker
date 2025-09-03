const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../testServer'); // We'll create this
const User = require('../models/User');
const { encrypt, decrypt } = require('../utils/encryption');

describe('Security Features', () => {
    beforeAll(async () => {
        // Connect to test database
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/expense-tracker-test');
    });

    beforeEach(async () => {
        // Clean up before each test
        await User.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('User Data Encryption', () => {
        test('should encrypt user email and username', async () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'Test123!@#'
            };

            const response = await request(app)
                .post('/api/users/register')
                .send(userData);

            expect(response.status).toBe(201);
            
            // Check that the response contains decrypted data
            expect(response.body.user.email).toBe(userData.email);
            expect(response.body.user.username).toBe(userData.username);
            
            // Check that data is encrypted in database
            const userInDb = await User.findById(response.body.user._id);
            expect(userInDb.email).not.toBe(userData.email);
            expect(userInDb.username).not.toBe(userData.username);
            
            // Verify decryption works
            expect(decrypt(userInDb.email)).toBe(userData.email);
            expect(decrypt(userInDb.username)).toBe(userData.username);
        });

        test('should encrypt/decrypt utility functions work correctly', () => {
            const testData = 'sensitive@example.com';
            const encrypted = encrypt(testData);
            const decrypted = decrypt(encrypted);
            
            expect(encrypted).not.toBe(testData);
            expect(decrypted).toBe(testData);
        });
    });

    describe('JWT Authentication', () => {
        let user, token;

        beforeEach(async () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'Test123!@#'
            };

            const response = await request(app)
                .post('/api/users/register')
                .send(userData);

            user = response.body.user;
            token = response.body.token;
        });

        test('should return JWT token on successful registration', () => {
            expect(token).toBeDefined();
            expect(typeof token).toBe('string');
        });

        test('should return JWT token on successful login', async () => {
            const response = await request(app)
                .post('/api/users/login')
                .send({
                    email: 'test@example.com',
                    password: 'Test123!@#'
                });

            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
        });

        test('should reject requests without valid token', async () => {
            const response = await request(app)
                .get('/api/expenses')
                .expect(401);

            expect(response.body.message).toBe('Access token required');
        });

        test('should accept requests with valid token', async () => {
            const response = await request(app)
                .get('/api/expenses')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        });
    });

    describe('Input Validation', () => {
        test('should reject invalid email format', async () => {
            const response = await request(app)
                .post('/api/users/register')
                .send({
                    username: 'testuser',
                    email: 'invalid-email',
                    password: 'Test123!@#'
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
        });

        test('should reject weak password', async () => {
            const response = await request(app)
                .post('/api/users/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'weak'
                });

            expect(response.status).toBe(400);
            expect(response.body.errors).toBeDefined();
        });

        test('should sanitize XSS attempts', async () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'Test123!@#'
            };

            const registerResponse = await request(app)
                .post('/api/users/register')
                .send(userData);

            const token = registerResponse.body.token;

            const response = await request(app)
                .post('/api/expenses')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    title: '<script>alert("xss")</script>',
                    amount: 100,
                    date: new Date().toISOString(),
                    category: 'test'
                });

            expect(response.status).toBe(201);
            // The title should be sanitized (HTML escaped)
            expect(response.body.title).not.toContain('<script>');
        });
    });

    describe('Rate Limiting', () => {
        test('should enforce rate limiting on auth routes', async () => {
            const userData = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'WrongPassword123!@#'
            };

            // Make multiple failed login attempts
            for (let i = 0; i < 6; i++) {
                const response = await request(app)
                    .post('/api/users/login')
                    .send(userData);
                
                if (i < 5) {
                    expect(response.status).toBe(401); // Unauthorized
                } else {
                    expect(response.status).toBe(429); // Too Many Requests
                }
            }
        });
    });
});