import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"

// config dotenv
dotenv.config();

// database connection
connectDB();

const app = express();
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

// routes

app.use("/api/v1/auth", authRoutes);

app.get("/",(req,res) => {
    res.send({
        message: "Welcome to ecommerce backend"
    })
})

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT -> ${PORT}`)
})