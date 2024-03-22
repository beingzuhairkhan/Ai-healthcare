import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const genrateToken = user => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d',
    })

}
export const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    try {
        let user = null;
        // let userModel = null;

        // Determine which model to use based on the role
        if (role === 'patient') {
            user = await User.findOne({ email })
        } else if (role === 'doctor') {
            user = await Doctor.findOne({ email })
        } else {
            return res.status(400).json({ success: false, message: 'Invalid role' });
        }

        // Check if user already exists
        // user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user instance
        // user = new userModel({
        if (role === 'patient') {
            user = new User({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role
            });
        }
        if (role === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashedPassword,
                photo,
                gender,
                role
            });
        }
        // Save user to the database
        await user.save();

        res.status(200).json({ success: true, message: 'User successfully created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error. Please try again' });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = null;
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });

        if (patient) {
            user = patient;
        } else if (doctor) {
            user = doctor;
        }

        // Check if user exists
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Invalid username or password" });
        }

        // Generate token
        const token = genrateToken(user);

        // Send response
        const { password: userPassword, role, appointment, ...rest } = user._doc;
        res.status(200).json({ success: true, message: "User successfully logged in", token, data: { ...rest }, role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to login" });
    }
};
