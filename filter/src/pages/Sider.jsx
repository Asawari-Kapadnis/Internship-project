import { NavLink } from "react-router-dom";

function Sider() {
  return (
    <div className="sider-container">
      <div className="sider">

        <h2 className="sider-title">FitTrack</h2>

        <NavLink to="/AddWorkout" className="sider-link">
           Add Workout
        </NavLink>

        <NavLink to="/exercises" className="sider-link">
           Exercises
        </NavLink>

        <NavLink to="/achivements" className="sider-link">
           Achievements
        </NavLink>

      </div>
    </div>
  );
}

export default Sider;