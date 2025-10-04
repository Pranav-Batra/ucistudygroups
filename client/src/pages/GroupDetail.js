import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JoinGroupButton from "../components/JoinGroupButton";
import "../styles/GroupDetail.css";
import ScheduleMeetingButton from "../components/ScheduleMeetingButton";

function GroupDetailView() {
    const [group, setGroup] = useState(null);
    const [members, setMembers] = useState([]);
    const [joinStatus, setJoinStatus] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchGroup = async () => {
        try {
            const res = await fetch(`http://localhost:3000/studygroups/${id}/detail/`, {
                credentials: "include"
            });
            if (!res.ok) throw new Error("Failed to fetch.");
            const data = await res.json();

            setGroup(data.groupInfo);
            setMembers(data.groupMembers);
            setJoinStatus(data.userInGroup);
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    useEffect(() => {
        fetchGroup();
    }, [id]);

    if (!group) {
        return <div className="loading">Loading Group Details...</div>;
    }

    return (
        <div className="group-detail-container">
            <div className="group-info">
                <h1>{group.department} {group.class_code} Study Group</h1>
                <h2>Professor: {group.professor}</h2>
                <h3>Member Limit: {group.max_members}</h3>
                <p>{group.description}</p>

                {joinStatus !== null && (
                    <JoinGroupButton
                        id={group.id}
                        isJoined={joinStatus}
                        onStatusChange={fetchGroup}
                    />
                )}
                <ScheduleMeetingButton id={id} />
                {/* <button className="schedule-button">Schedule Meeting</button> */}
            </div>

            <div className="members-list">
                <h3>Members</h3>
                {members.length > 0 ? (
                    members.map((member) => (
                        <div key={member.id} className="member-item">
                            <span>{member.username} ({member.email})</span>
                            <button
                                onClick={() => navigate(`/profile/${member.member_id}`)}
                                className="view-profile-button"
                            >
                                View Profile
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No members found yet.</p>
                )}
            </div>
        </div>
    );
}

export default GroupDetailView;

