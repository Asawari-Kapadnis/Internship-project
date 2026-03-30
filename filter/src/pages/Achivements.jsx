import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";


function Achievements() {
  const [achievements, setAchievements] = useState([]);
const [workouts, setWorkouts] = useState([]);

const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/dashboard");
      const allworkouts = res.data.workouts || [];
      setWorkouts(allworkouts);

      processAchievements(allworkouts);
    } catch (err) {
      console.error(err);
    }
  };

  //  MAIN LOGIC
  const processAchievements = (workouts) => {
    const total = workouts.length;

    const dates = workouts
      .map((w) => new Date(w.date))
      .sort((a, b) => b - a);

    //  STREAK
    let streak = 1;
    for (let i = 0; i < dates.length - 1; i++) {
      const diff = (dates[i] - dates[i + 1]) / (1000 * 60 * 60 * 24);
      if (diff <= 1) streak++;
      else break;
    }

    //  WEEKLY
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekly = workouts.filter(
      (w) => new Date(w.date) >= weekAgo
    );

    //  COMEBACK
    let comeback = false;
    for (let i = 0; i < dates.length - 1; i++) {
      const diff = (dates[i] - dates[i + 1]) / (1000 * 60 * 60 * 24);
      if (diff > 3) comeback = true;
    }

    //  ACHIEVEMENTS LIST
   const ach = [
  { title: " First Workout", unlocked: total >= 1, target: 1, shareText: "First workout done 💪" },
  { title: " 5 Workouts", unlocked: total >= 5, target: 5, shareText: "Completed 5 workouts 🔥" },
  { title: " 10 Workouts", unlocked: total >= 10, target: 10, shareText: "10 workouts milestone 🏆" },
  { title: " 20 Workouts", unlocked: total >= 20, target: 20, shareText: "20 workouts done 🚀" },
  { title: " 30 Workouts", unlocked: total >= 30, target: 30, shareText: "30 workouts strong 💪" },
  { title: " 50 Workouts", unlocked: total >= 50, target: 50, shareText: "50 workouts beast mode 🔥" },
  { title: " 100 Workouts", unlocked: total >= 100, target: 100, shareText: "100 workouts legend 🏆" }
];
    setAchievements(ach);
  };

  // SHARE FUNCTION
  const handleShare = (text) => {
    if (navigator.share) {
      navigator.share({ text });
    } else {
      alert(text);
    }
  };

  return (
    <div className="achievements-page">
      <h1>My Fitness Achievements</h1>

      <div className="achievements-grid">
        {achievements.map((a, i) => (
          <div
            key={i}
            className={`card ${a.unlocked ? "unlocked" : "locked"}`}
          >
            <h3>{a.title}</h3>

<p>
  {a.unlocked
    ? "Unlocked "
    : `${workouts.length}/${a.target} `}
</p>
            {/* Show share only if unlocked */}
            {a.unlocked && (
              <button
                className="share-card-btn"
                onClick={() => handleShare(a.shareText)}
              >
                Share
              </button>
            )}
          </div>
        ))}
      </div>
      <button
  className="back-btn"
  onClick={() => navigate("/dashboard")}
>
   Back to Dashboard
</button>
    </div>
  );
}

export default Achievements;