import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";

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

  const processAchievements = (workouts) => {
    const total = workouts.length;

    const ach = [
      {
        title: "First Workout",
        unlocked: total >= 1,
        target: 1,
        icon: <EmojiEventsIcon />,
        shareText: "First workout completed"
      },
      {
        title: "5 Workouts",
        unlocked: total >= 5,
        target: 5,
        icon: <StarIcon />,
        shareText: "Completed 5 workouts"
      },
      {
        title: "10 Workouts",
        unlocked: total >= 10,
        target: 10,
        icon: <EmojiEventsIcon />,
        shareText: "10 workouts milestone"
      },
      {
        title: "20 Workouts",
        unlocked: total >= 20,
        target: 20,
        icon: <RocketLaunchIcon />,
        shareText: "20 workouts completed"
      },
      {
        title: "30 Workouts",
        unlocked: total >= 30,
        target: 30,
        icon: <LocalFireDepartmentIcon />,
        shareText: "30 workouts achieved"
      },
      {
        title: "50 Workouts",
        unlocked: total >= 50,
        target: 50,
        icon: <LocalFireDepartmentIcon />,
        shareText: "50 workouts milestone"
      },
      {
        title: "100 Workouts",
        unlocked: total >= 100,
        target: 100,
        icon: <EmojiEventsIcon />,
        shareText: "100 workouts completed"
      }
    ];

    setAchievements(ach);
  };

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
            <div className="icon">{a.icon}</div>

            <h3>{a.title}</h3>

            <p>
              {a.unlocked
                ? "Unlocked"
                : `${workouts.length}/${a.target}`}
            </p>

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