import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";

// protected ROUTE
export const requireSignIn = async(req,res,next) => {
    try {
        const token = req.headers.authorization.slice(7, req.headers.authorization.length);
        const tokenVerified = jwt.verify(token,process.env.JWT_SECRET);
        req.user = tokenVerified;
        next()
    } catch (error) {
        console.log(error);
    }
}

// admin protected ROUTE
export const isAdmin = async(req,res,next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if(!user.role){
            return res.status(401).send({
                success: false,
                message: "Unauthorized Access"
            })
        }
        next();
    } catch (error) {
        console.log(error);
    }
}