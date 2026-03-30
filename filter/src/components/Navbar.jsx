import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">FITNESS TRACKER</div>

      <div className="nav-links">
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register" className="nav-btn">Register</Link>}

        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && (
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
