import userModel from "../models/userModel.js";
import {hashPassword} from  "../helpers/authHelper.js"

export const registerController = async(req,res) => {
    try {
        const {name, email, password, address, phone} = req.body;
        // Validation
        if(!name){
            return res.send({error: "Name is required"})
        }
        if(!email){
            return res.send({error: "Email is required"})
        }
        if(!phone){
            return res.send({error: "Phone is required"})
        }
        if(!password){
            return res.send({error: "Password is required"})
        }
        if(!address){
            return res.send({error: "Address is required"})
        }

        // Check existing user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: true,
                message: "Already registered please login"
            })
        }
        // Register User
        const hashedPassword = await hashPassword(password);
        const user = new userModel({name, email, phone, address, password: hashedPassword});
        user.save();
        res.status(200).send({
            success: true,
            message: "Registered successfully",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}
