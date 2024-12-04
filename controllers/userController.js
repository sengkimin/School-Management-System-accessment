import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const secretKey = process.env.JWT_SECRET || "yoursecretKey";

export const register = async (req, res) => {
    const { fullname, email, password, role = 'user' } = req.body; 
  
    try {
      if (await User.findOne({ email })) {
        return res.status(400).json({ message: 'User already exists.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ fullname, email, password: hashedPassword, role });
  
      await newUser.save();
      res.status(201).json({ message: 'Registration successful.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password.' });

    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', access_token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
