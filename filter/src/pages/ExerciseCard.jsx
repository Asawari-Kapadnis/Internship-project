import { useState } from "react";

function ExerciseCard({ exercise, onAdd }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="exercise-card">

    
      <img src={exercise.image} alt={exercise.name} />
      <h3>{exercise.name}</h3>

      <button className="detail-btn"onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "View Details"}
      </button>

     
      {showDetails && (
        <div className="exercise-details">

          <p><strong>Category:</strong> {exercise.category}</p>
          <p><strong>Difficulty:</strong> {exercise.difficulty}</p>

          <h4>Steps:</h4>
          <ul>
            {exercise.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>

          <h4>Benefits:</h4>
          <ul>
            {exercise.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

        
          {/* <button onClick={() => onAdd(exercise)}>
            Add to Workout
          </button> */}

        </div>
      )}
    </div>
  );
}

export default ExerciseCard;