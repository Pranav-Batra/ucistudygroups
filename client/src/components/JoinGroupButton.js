import React from "react";
import "../styles/JoinGroupButton.css";

function JoinGroupButton({ id, isJoined, onStatusChange }) {
    const onClickHandler = async () => {
        try {
            const res = await fetch(`http://localhost:3000/studygroups/${id}/join`, {
                method: isJoined ? "DELETE" : "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            if (!res.ok) return console.log("Failed to join/leave group.");

            await res.json();
            onStatusChange(); // parent refetches fresh data
        } catch (err) {
            console.error("Error: ", err);
        }
    };

    return (
        <button
            className={`join-group-button ${isJoined ? "leave" : "join"}`}
            onClick={onClickHandler}
        >
            {isJoined ? "Leave Group" : "Join Group"}
        </button>
    );
}

export default JoinGroupButton;
