import express from "express"
import {loginController, registerController }from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router =  express.Router()

// REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController)

// test route
router.get("/test",requireSignIn,isAdmin,(req,res,next) => {
    res.send({
        message: "this is secure route"
    })
})

export default router;