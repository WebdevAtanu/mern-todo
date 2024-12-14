import bcrypt from 'bcrypt';
import {user} from '../model/user.model.js';
import {sendCookie} from '../utils/feature.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user_data = await user.create({
            name,
            email,
            password: hashedPassword,
        });

        sendCookie(process.env.JWT_SECRET,user_data,res,'Registration Complete');
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user_data = await user.findOne({ email });
    if (!user_data) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user_data.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    sendCookie(process.env.JWT_SECRET,user_data,res,`User ${user_data.name} logged in successfully`);
  	} catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const userDetails=(req,res)=>{
     res.status(201).json({
        success:true,
        details:{
            name:req.user.name,
            email:req.user.email
        }
    })
}

export const logout=(req,res)=>{
    res.status(200)
    .cookie("token","",{expires:new Date(Date.now())})
    .json({
        message:'User log out'
    })
}