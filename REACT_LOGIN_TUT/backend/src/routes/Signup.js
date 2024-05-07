const express = require('express');
const router = express.Router();
const signupUser = require('../controller/Signup');


router.post('/register', signupUser);

module.exports = router;