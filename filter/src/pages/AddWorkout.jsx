import { useState, useEffect } from "react";
import API from "../api/axios";
import WorkoutList from "./WorkoutList";

const AddWorkout = () => {

  const [workouts, setWorkouts] = useState([
    { category: "", workoutName: "", sets: "", reps: "", weight: "", duration: "" },
  ]);

  const [listWorkouts, setListWorkouts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // Load workouts
  useEffect(() => {
    const stored = localStorage.getItem(`workouts-${today}`);
    if (stored) {
      setListWorkouts(JSON.parse(stored));
    }
    setDataLoaded(true);
  }, [today]);

  // Save workouts
  useEffect(() => {
    if (!dataLoaded) return;

    localStorage.setItem(
      `workouts-${today}`,
      JSON.stringify(listWorkouts)
    );
  }, [listWorkouts, dataLoaded, today]);

  const handleChange = (index, field, value) => {
    const newWorkouts = [...workouts];
    newWorkouts[index][field] = value;
    setWorkouts(newWorkouts);
  };

  const addWorkoutRow = () => {
    setWorkouts([
      ...workouts,
      { category: "", workoutName: "", sets: "", reps: "", weight: "", duration: "" },
    ]);
  };

  const removeWorkoutRow = (index) => {
    setWorkouts(workouts.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formatted = workouts.map(w => ({
      ...w,
      sets: Number(w.sets) || 0,
      reps: Number(w.reps) || 0,
      weight: Number(w.weight) || 0,
      duration: Number(w.duration) || 0,
      selected: false
    }));

    setListWorkouts(prev => [...prev, ...formatted]);

    setWorkouts([
      { category: "", workoutName: "", sets: "", reps: "", weight: "", duration: "" }
    ]);
  };

  return (
    
    <div className="add-workout-page">

      <div className="twopages-workout">

        <div className="add-workout-container">

          <h2>Add Workouts - {today}</h2>

          <form onSubmit={handleSubmit} className="add-workout-form">

            {workouts.map((workout, index) => (
              <div key={index} className="workout-card">

                <input
                  type="text"
                  placeholder="Category"
                  value={workout.category}
                  onChange={(e) => handleChange(index, "category", e.target.value)}
                />

                <input
                  type="text"
                  placeholder="Workout Name"
                  value={workout.workoutName}
                  onChange={(e) => handleChange(index, "workoutName", e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Sets"
                  value={workout.sets}
                  onChange={(e) => handleChange(index, "sets", e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Reps"
                  value={workout.reps}
                  onChange={(e) => handleChange(index, "reps", e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Weight (kg)"
                  value={workout.weight}
                  onChange={(e) => handleChange(index, "weight", e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Duration (min)"
                  value={workout.duration}
                  onChange={(e) => handleChange(index, "duration", e.target.value)}
                />

                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeWorkoutRow(index)}
                >
                  Remove
                </button>

              </div>
            ))}

            <div className="form-actions">

              <button
                type="button"
                className="add-btn"
                onClick={addWorkoutRow}
              >
                 Add Workout
              </button>

              <button
                type="submit"
                className="submit-btn"
              >
                Submit
              </button>

            </div>

          </form>

        </div>

        <WorkoutList
          listWorkouts={listWorkouts}
          setListWorkouts={setListWorkouts}
        />

      </div>
    </div>
  );
};

export default AddWorkout;