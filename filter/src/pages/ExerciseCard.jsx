function ExerciseCard({ exercise, isActive, onToggle }) {
  return (
    <div className={`exercise-card ${isActive ? "active" : ""}`}>

      <img src={exercise.image} alt={exercise.name} />
      <h3>{exercise.name}</h3>

      <button className="detail-btn" onClick={onToggle}>
        {isActive ? "Back To Library" : "View Details"}
      </button>

      {isActive && (
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
        </div>
      )}
    </div>
  );
}

export default ExerciseCard;