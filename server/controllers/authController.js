const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// SIGNUP COMPONENT
exports.signup = async (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ msg: "Please provide all required fields" });
    }

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            console.log("User already exists with this email:", email);
            return res.status(400).json({ msg: "Email already exists" });
        }

        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        user = new User({ username, email, password: hashedPassword });
        await user.save();

        console.log("User saved successfully:", user);

        // Generate a JSON Web Token
        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" },
            (err, token) => {
                if (err) {
                    console.error("Error generating token:", err.message);
                    return res.status(500).send("Server Error");
                }
                res.json({ token });
            }
        );
    } catch (error) {
        console.error("Error during signup:", error.message);
        res.status(500).send("Server Error");
    }
};




// LOGIN COMPONENT

// Example login function
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Please provide both email and password" });
    }

    try {
        let user = await User.findOne({ email });
        if (!user) {
            console.log("User not found with this email:", email);
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password does not match for user:", email);
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" },
            (err, token) => {
                if (err) {
                    console.error("Error generating token:", err.message);
                    return res.status(500).send("Server Error");
                }
                res.json({ token });
            }
        );
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).send("Server error");
    }
};


// GETTING USER INFO
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};
