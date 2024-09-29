import bcrypt from 'bcrypt';
import {userModel} from '../model/user.model.js';
import {sendCookie} from '../utils/feature.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        sendCookie(process.env.JWT_SECRET,user,res,'Registration Complete');
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    sendCookie(process.env.JWT_SECRET,user,res,`User ${user.name} logged in successfully`);
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