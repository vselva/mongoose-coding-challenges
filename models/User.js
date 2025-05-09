// import mongoose
const mongoose = require('mongoose');

// import bcryptjs
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true, 
        trim: true
    },
    password: {
        type: String,
        required: true, 
        trim: true
    }
});

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        console.log('Error in encrypting password. Error: ' + Error);
        next(err);
    }
});
const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
