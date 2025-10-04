import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoinGroupButton from "../components/JoinGroupButton";
function GroupDetailView() 
{
    const [group, setGroup] = useState(null)
    const [members, setMembers] = useState([])
    const {id} = useParams()
    useEffect(() => {
        const fetchGroup = async () => {
            try
            {
                const res = await fetch(`http://localhost:3000/studygroups/${id}/detail/`)
                if (!res.ok)
                {
                    console.log("Error, fetch failed.")
                    throw new Error("Failed to fetch.")
                }
                const data = await res.json()
                console.dir(data)
                const group = data.groupInfo
                console.dir(group)
                const members = data.groupMembers
                console.dir(members)
                setGroup(group)
                setMembers(members)
            }
            catch (err)
            {
                console.error("Error: ", err)
            }
        }
        fetchGroup()
    }, [id])

    if (!group) {
        return <div className="p-8 text-center text-xl font-semibold">Loading Group Details...</div>;
    }
    return (
        <div>
            <h1>{group.department} {group.class_code} Study Group</h1>
            <h2>Professor: {group.professor}</h2>
            <h3>Member Limit: {group.max_members}</h3>
            <p>Description: {group.description}</p>
            <JoinGroupButton id={group.id} />
            <button>Schedule Meeting</button>
            
            {members.length > 0 ? (
                members.map((member) => (
                    <div key={member.id}>
                        {member.username} ({member.email})
                    </div>
                ))
            ) : (
                <p>No members found yet.</p>
            )}
        </div>
    )
}

export default GroupDetailView