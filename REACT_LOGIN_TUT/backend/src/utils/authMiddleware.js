// const jwt = require('jsonwebtoken');
// const { secretKey } = require('../configuration/jwtConfig');

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) {
//         return res.status(401).json({ message: "No token provided, Unauthorized" });
//     }
//     try {
//         const user = jwt.verify(token, secretKey);
//         req.user = user;
//         next();
//     } catch (error) {
//         res.status(403).json({ message: error.message });
//     }
// }

// module.exports = authenticateToken;

const jwt = require('jsonwebtoken');
const fs = require('fs');

// Load the public key asynchronously
function getPublicKey(callback) {
    fs.readFile('./certs/public.pem', 'utf8', (err, publicKey) => {
        if (err) {
            callback(err);
        } else {
            callback(null, publicKey);
        }
    });
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided, Unauthorized" });
    }
    try {
        getPublicKey((err, publicKey) => {
            if (err) {
                throw err;
            }
            jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (verifyError, user) => {
                if (verifyError) {
                    throw verifyError;
                }
                req.user = user;
                next();
            });
        });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
}

module.exports = authenticateToken;

