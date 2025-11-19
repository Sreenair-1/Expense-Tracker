const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { encrypt, decrypt, isEncrypted } = require('../utils/encryption');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        validate: {
            validator: function(v) {
                return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(v);
            },
            message: props => 'Password must contain at least one letter, one number, and one special character.'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Encrypt sensitive data before saving
UserSchema.pre('save', async function (next) {
    try {
        // Hash password if modified
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }

        // Encrypt email and username if not already encrypted
        if (this.isModified('email') && this.email && !isEncrypted(this.email)) {
            this.email = encrypt(this.email);
        }
        
        if (this.isModified('username') && this.username && !isEncrypted(this.username)) {
            this.username = encrypt(this.username);
        }

        next();
    } catch (error) {
        next(error);
    }
});

// Method to get decrypted user data for responses
UserSchema.methods.getDecryptedData = function() {
    return {
        _id: this._id,
        username: decrypt(this.username),
        email: decrypt(this.email),
        createdAt: this.createdAt
    };
};

UserSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
