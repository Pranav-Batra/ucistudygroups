import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../styles/Profile.css'

function Profile() {
  const { id } = useParams(); // profile being viewed
  const [profile, setProfile] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    discord: "",
    instagram: "",
    phone_number: "",
    reddit: ""
  });

  // Fetch profile info
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:3000/profiles/${id}`, {
          credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to fetch profile.");
        const data = await res.json();
        setProfile(data);
        setFormData({
          email: data.email || "",
          username: data.username || "",
          discord: data.discord || "",
          instagram: data.instagram || "",
          phone_number: data.phone_number || "",
          reddit: data.reddit || ""
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/auth/user`, {
          credentials: "include"
        });
        if (!res.ok) throw new Error("Failed to fetch current user.");
        const user = await res.json();
        setLoggedInUser(user);
        console.log(user)
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };

    fetchProfile();
    fetchCurrentUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:3000/profiles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error("Failed to update profile.");
      const updated = await res.json();
      setProfile(updated);
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  if (!profile) {
    return <div className="p-8 text-center text-xl font-semibold">Loading Profile...</div>;
  }

  const canEdit = loggedInUser && loggedInUser.user.id === profile.id;
  console.log(`Logged in:`)
  console.log(loggedInUser)
  console.log(profile)

  return (
    <div className="profile-container">
  <h1 className="profile-header">
    {canEdit ? "Your Profile" : `${profile.username}'s Profile`}
  </h1>

  {["email", "username", "discord", "instagram", "phone_number", "reddit"].map((field) => (
    <div key={field} className="profile-field">
      <label className="profile-label">{field.replace("_", " ")}</label>
      {canEdit && isEditing ? (
        <input
          type="text"
          name={field}
          value={formData[field] || ""}
          onChange={handleChange}
          className="profile-input"
        />
      ) : (
        <p className="profile-value">{profile[field] || "—"}</p>
      )}
    </div>
  ))}

  {canEdit && (
    <div className="profile-buttons">
      {isEditing ? (
        <>
          <button onClick={handleSave} className="profile-button edit">
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="profile-button cancel">
            Cancel
          </button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)} className="profile-button edit">
          Edit Profile
        </button>
      )}
    </div>
  )}
</div>
  );
}

export default Profile;
