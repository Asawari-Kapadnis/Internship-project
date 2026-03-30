import mongoose from "mongoose";

const WorkoutSessionSchema = new mongoose.Schema({

  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  date:{
    type:Date,
    default:Date.now
  },

  workouts:[
    {
      category:{
        type:String,
        required:true
      },

      workoutName:{
        type:String,
        required:true
      },

      sets:Number,
      reps:Number,
      weight:Number,
      duration:Number,
      caloriesBurned:Number
    }
  ]

},{timestamps:true})

export default mongoose.model("WorkoutSession",WorkoutSessionSchema)