import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function StudyGroup({ group }) {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(`/studygroups/${group.id}/detail`);
    };

    return (
        <div className="card">
            <h1 className="card-title">{group.department} {group.class_code} Study Group</h1>
            <h2 className="card-subtitle">Professor: {group.professor}</h2>
            <h3 className="card-subtitle">Member Limit: {group.max_members}</h3>
            <p className="card-description">{group.description}</p>
            <button className="card-button" onClick={handleOnClick}>View Details</button>
        </div>
    );
}

function Home() {
    const [studyGroups, setStudyGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const res = await fetch("http://localhost:3000/studygroups");
                if (!res.ok) {
                    console.log("Error in fetching.");
                    return;
                }
                const data = await res.json();
                setStudyGroups(data);
            } catch (err) {
                console.error("Error: ", err);
            }
        };
        fetchGroups();
    }, []);

    return (
        <div className="home-container">
            {studyGroups.map((group) => (
                <StudyGroup key={group.id} group={group} />
            ))}
        </div>
    );
}

export default Home;
