import { userModel } from '../model/user.model.js';
import jwt from 'jsonwebtoken'
export const authentication=async(req,res,next)=>{
try{
    const {token}=req.cookies;
    if(!token)
    res.status(401).json({
        message:'User not logged in'
    })
	else{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await userModel.findById(decoded._id);
    next();
	}

    }catch(error){
        res.status(500).json({message:'Server error',error:error.message})
    }
    
}