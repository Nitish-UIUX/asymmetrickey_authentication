const crypto = require('crypto');

// Generate a secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Export the secret key as an object with a key named 'secretKey'
module.exports = {
    secretKey: secretKey
};


