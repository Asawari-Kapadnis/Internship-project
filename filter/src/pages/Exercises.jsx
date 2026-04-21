import exerciseData from "../data/exercisedata";
import ExerciseCard from "./ExerciseCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Exercise() {
  const navigate = useNavigate();

  // ✅ Track which card is active
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="exercise-container">

      <div>
        <button style={{ height: "30px" }} onClick={() => navigate("/dashboard")}>
          Back to Dashboard
        </button>

        <h1 style={{ color: "#f1bd4b" }}>Exercise Library</h1>
      </div>

      <div className="exercise-grid">
        {exerciseData.map((exercise, index) => {

          // ✅ Hide other cards when one is active
          if (activeIndex !== null && activeIndex !== index) return null;

          return (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              isActive={activeIndex === index}
              onToggle={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
            />
          );
        })}
      </div>

    </div>
  );
}

export default Exercise;