import exerciseData from "../data/exercisedata";
import ExerciseCard from "./ExerciseCard";
import { useNavigate } from "react-router-dom";

function Exercise() {

   const navigate = useNavigate();
  return (
    <div className="exercise-container">
       <div >
 <button  style={{"height":"30px"}} onClick={() => navigate("/dashboard")}>
       
       Back to Dashboard
    </button>
      <h1 style={{"color":"#f1bd4b"}}>Exercise Library</h1>
      
</div>
      <div className="exercise-grid">
        {exerciseData.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
          />
        ))}
      </div>

    </div>
    
  );
}

export default Exercise;