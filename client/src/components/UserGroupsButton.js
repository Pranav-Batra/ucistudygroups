import { useNavigate } from "react-router-dom";
import "../styles/UserGroupsButton.css";

function UserGroupsButton() {
  const navigate = useNavigate();
  return (
    <button className="user-groups-button" onClick={() => navigate('/studygroups/usergroups')}>
      Your Groups
    </button>
  );
}

export default UserGroupsButton;
