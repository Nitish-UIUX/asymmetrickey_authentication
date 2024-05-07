const User = require('../models/User');

async function getUserById(req, res) {
    try {
        // const { userId } = req.params;
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        };
        res.json(user);
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = getUserById;