import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

function NewGroupButton() 
{
    const navigate = useNavigate()
    return (
        <button onClick = {() => navigate('/studygroups/new')}>New Study Group</button>
    )
}

export default NewGroupButton