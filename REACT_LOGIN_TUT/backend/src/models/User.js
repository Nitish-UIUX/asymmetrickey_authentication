const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
       
    },
    lastName: {
        type: String,
  
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'customer'],
        default: 'customer'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
