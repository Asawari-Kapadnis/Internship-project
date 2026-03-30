import API from "../api/axios";

const WorkoutList = ({ listWorkouts, setListWorkouts }) => {

const toggleWorkout = (index) => {
  const updated = [...listWorkouts];
  updated[index].selected = !updated[index].selected;
  setListWorkouts(updated);
};

const removeWorkout = (index) => {
  const updated = listWorkouts.filter((_, i) => i !== index);
  setListWorkouts(updated);
};

const submitSelected = async () => {

  const selected = listWorkouts.filter(w => w.selected);

  if(selected.length === 0){
    alert("Select workouts first");
    return;
  }

  try{

    await API.post("/addWorkout", { workouts: selected });

    const remaining = listWorkouts.filter(w => !w.selected);

    setListWorkouts(remaining);

  }catch(err){
    console.log(err);
  }

};
return (
  <div className="add-workoutlist">

    <h3>Workout List</h3>

    {listWorkouts.map((w,index)=>(
      <div key={index} className="workout-card">

        <input
          type="checkbox"
          checked={w.selected}
          onChange={()=>toggleWorkout(index)}
        />
        <ul>
          <li>{w.workoutName}</li>
           <li>{w.sets} sets</li>
            <li>{w.reps} reps</li>
        </ul>

        {/* <span>{w.workoutName}</span>
        <span>{w.sets} sets</span>
        <span>{w.reps} reps</span> */}

        <button
          className="remove-btn"
          onClick={()=>removeWorkout(index)}
        >
          Remove
        </button>

      </div>
    ))}

    {listWorkouts.length > 0 && (
      <button className="submit-btn" onClick={submitSelected}>
        Submit to Dashboard
      </button>
    )}

  </div>
);

};

export default WorkoutList;