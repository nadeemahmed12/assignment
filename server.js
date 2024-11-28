const express=require('express');
const cors =require('cors');
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDb = require('./config/db');

//dot envcongiguration
dotenv.config();

//DB connection
connectDb();

//rest object
const app=express();



//middlewares
app.use(cors());
//client side sai jo data ata hai usko acces krne
app.use(express.json())
//jo bhi api hit hoti hai usko console mai dhikhane kai liye
app.use(morgan('dev'))

//route
//url= http://localhost:3000
app.use("/api/v1/auth",require("./routes/authRoutes"));
app.use("/api/v1/admin",require("./routes/adminRoutes"));
app.use("/api/v1/user",require("./routes/userRoutes"));
app.use("/api/v1/moderator",require("./routes/moderatorRoutes"));
app.get("/",(req,res)=>{
    return res.status(200).send("<h1>Assignment</h1>");
});

//port pehle env ko check kiya
const PORT=process.env.PORT || 3000;

//serverkochlane kai liye
app.listen(PORT,()=>{
    console.log(`Server Running on Port ${PORT}`);
});
