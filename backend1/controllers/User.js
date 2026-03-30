 import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import{createError} from "../error.js";
import User from "../models/User.js";
import Workout from "../models/Workout.js";
import WorkoutSession from "../models/WorkoutSession.js";
import MET_VALUES from "../config/metValues.js";

dotenv.config();
export const UserRegister =async(req, res, next)=>{
    try {
        const{email,password,name,}=req.body;

        const existingUser = await User.findOne({email}).exec();
        if(existingUser){
            return next(createError(409,"email is already in  use"))
        }

        const salt = bcrypt.genSaltSync(10);
        const Hashedpassword = bcrypt.hashSync(password,salt);

        const user =new User({
            name,
            email,
            password: Hashedpassword,
        });

        const  createdUser = await user.save();
        const token = jwt.sign(
        { id: createdUser._id },
         process.env.JWT_SECRET,
        { expiresIn: "9999y" }
        );
    
        return  res.status(200).json({token,user})
    } catch (error) {
        next(error)
    }
}

export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN BODY:", req.body);   
    const user = await User.findOne({ email }).exec();

    console.log("USER FOUND:", user);      

    if (!user) {
      return next(createError(404, "User NOT found"));
    }

    console.log("ENTERED PASSWORD:", password);   
    console.log("HASH IN DB:", user.password);    

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    console.log("PASSWORD MATCH:", isPasswordCorrect); 

    if (!isPasswordCorrect) {
      return next(createError(403, "Incorrect Passward"));
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "9999y" }
    );

    return res.status(200).json({ token, user });

  } catch (error) {
    next(error);
  }
};

export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const currentDate = new Date();

    const startToday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );

    const endToday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );

  
    const allWorkouts = await Workout.find({ user: user._id }).sort({ date: -1 });

    //  Total Calories Burnt Today
    const totalCaloriesData = await Workout.aggregate([
      {
        $match: {
          user: user._id,
          date: { $gte: startToday, $lt: endToday },
        },
      },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    const totalCaloriesBurnt =
      totalCaloriesData.length > 0
        ? totalCaloriesData[0].totalCaloriesBurnt
        : 0;

    //  Total Workouts Today
    const totalWorkouts = await Workout.countDocuments({
      user: user._id,
      date: { $gte: startToday, $lt: endToday },
    });

    //  Average Calories Per Workout
    const avgCaloresBurntPerWorkout =
      totalWorkouts > 0
        ? totalCaloriesBurnt / totalWorkouts
        : 0;

    //  Category wise Calories (Pie Chart)
    const categoryCalories = await Workout.aggregate([
      {
        $match: {
          user: user._id,
          date: { $gte: startToday, $lt: endToday },
        },
      },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    const pieChartDataa = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    // Weekly Calories (Last 7 Days)
    const week = [];
    const caloriesBrunt = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentDate.getTime() - i * 24 * 60 * 60 * 1000
      );

      week.push(`${date.getDate()}`);

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );

      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      const weekData = await Workout.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        {
          $group: {
            _id: null,
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
      ]);

      caloriesBrunt.push(
        weekData.length > 0
          ? weekData[0].totalCaloriesBurnt
          : 0
      );
    }

   
    return res.status(200).json({
      totalCaloriesBurnt,
      totalWorkouts,
      avgCaloresBurntPerWorkout,
      totalweekCaloriesBurnt: {
        week,
        caloriesBrunt,
      },
      pieChartDataa,

    
      workouts: allWorkouts
    });

  } catch (error) {
    next(error);
  }
};


export const addWorkoutSession = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const workouts = req.body.workouts;

    if (!workouts || workouts.length === 0) {
      return next(createError(400, "No workouts provided"));
    }

   
    const user = await User.findById(userId);
    const userWeight = user?.weight || 60;

    
    const formattedWorkouts = workouts.map((w) => {
     const met = MET_VALUES[w.category?.toLowerCase()] || 4;


const durationMinutes = Number(w.duration) || 0;
const durationHours = durationMinutes / 60;

//  calculate
let caloriesBurned = met * userWeight * durationHours;


if (caloriesBurned > 800) caloriesBurned = 800;


caloriesBurned = Math.round(caloriesBurned || 0);

      return {
        category: w.category,
        workoutName: w.workoutName,
        sets: Number(w.sets),
        reps: Number(w.reps),
        weight: Number(w.weight),
        duration: Number(w.duration),
        caloriesBurned,
      };
    });

    const session = await WorkoutSession.create({
      user: userId,
      workouts: formattedWorkouts,
    });

    res.status(201).json({
      message: "Workout session saved",
      session,
    });

  } catch (error) {
    next(error);
  }
};

// workouts by date
export const getWorkoutsByDate = async (req, res, next) => {
  try {

    const userId = req.user?.id;
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    let date = req.query.date ? new Date(req.query.date) : new Date();

    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const todaysWorkout = await Workout.find({
      user: userId,
      date: { $gte: startOfDay, $lt: endOfDay }
    });

    const totalCaloriesBurnt = todaysWorkout.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );

    return res.status(200).json({
      todaysWorkout,
      totalCaloriesBurnt
    });

  } catch (error) {
    next(error);
  }
};


export const AddWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const workouts = req.body.workouts;

    if (!workouts || workouts.length === 0) {
      return next(createError(400, "No workouts provided"));
    }

   
    const user = await User.findById(userId);
    const userWeight = user?.weight || 60;

    const savedWorkouts = [];

    for (let i = 0; i < workouts.length; i++) {
      const w = workouts[i];

      const met = MET_VALUES[w.category?.toLowerCase()] || 4;


const durationMinutes = Number(w.duration) || 0;
const durationHours = durationMinutes / 60;


let caloriesBurned = met * userWeight * durationHours;


if (caloriesBurned > 800) caloriesBurned = 800;


caloriesBurned = Math.round(caloriesBurned || 0);
      const newWorkout = await Workout.create({
        user: userId,
        category: w.category,
        workoutName: w.workoutName,
        sets: Number(w.sets),
        reps: Number(w.reps),
        weight: Number(w.weight),
        duration: Number(w.duration),
        caloriesBurned,
        date: new Date(),
      });

      savedWorkouts.push(newWorkout);
    }

    res.status(201).json({
      message: "Workout added successfully",
      workouts: savedWorkouts,
    });

  } catch (error) {
    next(error);
  }
};


// Helper functions
const parseWorkoutLine = (parts) => {
  const details = {};
  if (parts.length >= 5) {
    details.workoutName = parts[1].substring(1).trim();
    details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
    details.reps = parseInt(
      parts[2].split("sets")[1].split("reps")[0].substring(1).trim()
    );
    details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim());
    details.duration = parseFloat(parts[4].split("min")[0].substring(1).trim());
    return details;
  }
  return null;
};

const calculateCaloriesBurnt = (workoutDetails) => {
  const durationInMinutes = parseFloat(workoutDetails.duration);
  const weightInKg = parseFloat(workoutDetails.weight);
  const caloriesBurntPerMinute = 5;
  return durationInMinutes * caloriesBurntPerMinute * weightInKg;
};  