import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/JoinGroupButton.css";
import { fetchCurrentUser } from "../utils/auth";

function ScheduleMeetingButton({id}) {
    const handleOnClick = async () => {
        const user = await fetchCurrentUser()
        if (!user.loggedIn)
        {
            alert("Must be logged in to schedule meetings.")
            navigate('/')
        }
        else
        {
            try
            {
                const res = await fetch(`http://localhost:3000/studygroups/${id}/detail`, {
                    credentials: "include"
                })
                if (!res.ok)
                {
                    throw new Error("Failed to check group details.")
                }
                const data = await res.json()
                console.log(data)
                if (!data.userInGroup)
                {
                    alert("Must be part of group to schedule meetings.")
                }
                else
                {
                    navigate(`/schedulemeeting/${id}`)
                }
            }
            catch (err)
            {
                console.error("Error: ", err)
            }
        }

    }

    const navigate = useNavigate();
    return (
        <button className="join-group-button join" onClick={handleOnClick}>
            Schedule Meeting
        </button>
    );
}

export default ScheduleMeetingButton;
