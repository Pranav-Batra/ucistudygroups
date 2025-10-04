import { useNavigate } from "react-router-dom"

function UserGroupsButton() 
{
    const navigate = useNavigate()
    return <button onClick={() => navigate('/studygroups/usergroups')}>Your Groups</button>
}

export default UserGroupsButton