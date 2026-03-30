import mongoose from "mongoose";

const Userschema =new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
     email:{
        type: String,
        required: true,
        unique:true,

    },
     password:{
        type: String,
      default: null,
    },
     age:{
        type: Number,
       
    },
},{timestamps:true})

export default mongoose.model("User",Userschema)