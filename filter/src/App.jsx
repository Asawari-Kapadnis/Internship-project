import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import "./App.css";
import AddWorkout from "./pages/AddWorkout";
import Exercise from "./pages/Exercises";
import Achievements from "./pages/Achivements";
import Profile from "./pages/profile";



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
        
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
         <Route path="/AddWorkout" element={<AddWorkout/>} /> 
         <Route path="/exercises" element={<Exercise/>}/>
         <Route path="/achivements" element={<Achievements/>}/>
         <Route path="/profile" element={<Profile />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
