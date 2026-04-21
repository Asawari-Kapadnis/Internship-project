import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const Profile = () => {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.put("/user/update", formData);

      // update context
      setUser(res.data);

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Error updating profile");
    }
  };

 return (
  <div className="profile-page">
    <div className="profile-card">
      <h2>User Profile</h2>

      <form onSubmit={handleUpdate} className="profile-form">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

       
      </form>
    </div>
  </div>
);
};

export default Profile;