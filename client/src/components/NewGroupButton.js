import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/NewGroupButton.css";

function NewGroupButton() {
    const navigate = useNavigate();
    return (
        <button className="new-group-button" onClick={() => navigate('/studygroups/new')}>
            New Study Group
        </button>
    );
}

export default NewGroupButton;
