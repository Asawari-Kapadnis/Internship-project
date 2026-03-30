import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/User.js"


dotenv.config();

const app =express();
app.use(cors());
app.use(express.json( {limit:"50mb"}));
app.use(express.urlencoded({extended:true}))

app.use("/api/user",userRoutes)
app.get("/test-route", (req, res) => {
  res.send("TEST ROUTE WORKS");
});




// app.get("/" , async(req,res)=>{
//     res.status(200).json({
//         message:"hello developers"
//     })
// })
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};





app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message =err.message||"something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    })

})

const startServer =async()=>{
    try{
       await connectDB();
     app.listen(process.env.PORT ,()=>{
    console.log("server is runnig..")

});
}catch(error){
    console.log(error)

}
}
startServer();
