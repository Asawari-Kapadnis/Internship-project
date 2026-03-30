import { NavLink } from "react-router-dom";
import homeimg from "../assets/homeimg.png"; // your image

function Home() {
  return (
    <div className="home-wrapper">
      <div className="home-container">

        
        <div className="home-left">
          <h1>
            Track your fitness progress <br />
            & reach your goals
          </h1>

          <p>
            Log workouts, monitor performance, and stay motivated
            on your fitness journey.
          </p>

          <NavLink to="/register">
            <button className="primary-btn">Get Started</button>
          </NavLink>
        </div>

        
        <div className="home-right">
          <img src={homeimg} alt="fitness" />
        </div>

      </div>
    </div>
  );
}

export default Home;
