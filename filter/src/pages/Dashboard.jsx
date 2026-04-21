import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ added
import API from "../api/axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import Sider from "./Sider";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate(); // ✅ added

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await API.get("/dashboard");
      setData(res.data);
    };
    fetchDashboard();
  }, []);

  if (!data) return <div className="loading">Loading dashboard...</div>;

  const chartData = data.totalweekCaloriesBurnt.week.map((day, i) => ({
    day,
    calories: data.totalweekCaloriesBurnt.caloriesBrunt[i]
  }));

  return (
    <div className="dashboard-page">
      <div className="sider-container">
        <Sider />
      </div>

      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">
          Here is a summary of your activity and progress
        </p>

        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Workouts</h3>
            <p>{data.totalWorkouts}</p>
          </div>

          <div className="card">
            <h3>Calories Burnt Today</h3>
            <p>{data.totalCaloriesBurnt}</p>
          </div>

          <div className="card">
            <h3>Avg Calories / Workout</h3>
            <p>{Math.round(data.avgCaloresBurntPerWorkout)}</p>
          </div>

          <div className="card actions">
            <h3>Quick Actions</h3>
            <button
              className="primary-btn"
              onClick={() => navigate("/AddWorkout")} // ✅ navigation added
            >
              Add Workout
            </button>
          </div>
        </div>

        <div className="chart-card">
          <h3>Workouts in Last 7 Days</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="calories" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;