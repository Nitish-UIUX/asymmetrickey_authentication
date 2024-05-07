// const jwt = require('jsonwebtoken');
// const { secretKey } = require('../configuration/jwtConfig');

// function generateToken(user) {
//     const payload = {
//         id: user._id,
//         email: user.email,
//         role: user.role
//     };
//     return jwt.sign(payload, secretKey, { expiresIn: '1h' });
// };

// function generateRefreshToken(user) {
//     const payload = {
//         id: user._id,
//         email: user.email,
//         role: user.role
//     };
//     return jwt.sign(payload, secretKey, { expiresIn: '7h' });
// };

// function verifyToken(token) {
//     return jwt.verify(token, secretKey);
// };

// module.exports = { generateToken, generateRefreshToken, verifyToken };



const jwt = require('jsonwebtoken');
const fs = require('fs');

// Function to get private key dynamically
function getPrivateKey() {
    return fs.readFileSync('./certs/private.pem', 'utf8');
}

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    const privateKey = getPrivateKey();
    return jwt.sign(payload, privateKey, { expiresIn: '1h', algorithm: 'RS256' });
};

function generateRefreshToken(user) {
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    const privateKey = getPrivateKey();
    return jwt.sign(payload, privateKey, { expiresIn: '7h', algorithm: 'RS256' });
};

function verifyToken(token) {
    const privateKey = getPrivateKey();
    return jwt.verify(token, privateKey, { algorithms: ['RS256'] });
};

module.exports = { generateToken, generateRefreshToken, verifyToken };
