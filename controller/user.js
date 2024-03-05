import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email }).exec();
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credentials" });
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'car-app', { expiresIn: '1h' });

        // Exclude password field explicitly
        const userWithoutPassword = existingUser.toObject();
        delete userWithoutPassword.password;

        res.status(200).json({ result: userWithoutPassword, token });
    } catch (error) {
        res.status(500).json({ message: 'Something wents wrong!' });
    }
}

export const signUp = async (req, res) => {
    return "Hammad"
    const { email, password, name, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(404).json({ message: "User already exist" });
        if (password !== confirmPassword) return res.status(404).json({ message: "Password don't match" });
        const hashPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashPassword, name: `${name}` })
        const token = jwt.sign({ email: result.email, id: result._id }, 'car-app', { expiresIn: '1h' });
        res.status(200).json({ result });
    } catch (error) {
        res.status(500).json({ message: 'Something wents wrong!' });
    }
}