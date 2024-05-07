const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('../utils/authUtils');


async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user);
        const userWithoutPassword = { ...user._doc, password: undefined };
        res.json({ token, user: userWithoutPassword });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}



module.exports = loginUser;





