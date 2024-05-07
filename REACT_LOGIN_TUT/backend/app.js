// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const signupRoute = require('./src/routes/Signup');
const LoginRoute = require('./src/routes/Login');
const authenticatedRoute = require('./src/routes/Authenticated');
const createAdminAccount = require('./src/scripts/setup');
const cors = require('cors');




// Load environment variables
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());


// Create admin account
createAdminAccount();


// Routes
app.use("/user", signupRoute);
app.use("/auth",LoginRoute);
app.use("/api", authenticatedRoute);




// Connect to MongoDB start here
  mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.log('Error connecting to MongoDB', error.message);
});

// Connect to MongoDB end here

