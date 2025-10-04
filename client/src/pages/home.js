import React, {useState, useEffect} from "react";
import JoinGroupButton from "../components/JoinGroupButton";
import {Navigate, useNavigate} from 'react-router-dom'

function StudyGroup({group}) 
{
    const navigate = useNavigate()
    const handleOnClick = () => {
        navigate(`/studygroups/${group.id}/detail`)
    }
    return (
        <div>
            <h1>{group.department} {group.class_code} Study Group</h1>
            <h2>Professor: {group.professor}</h2>
            <h3>Member Limit: {group.max_members}</h3>
            <p>Description: {group.description}</p>
            <JoinGroupButton id={group.id} />
            <button onClick={handleOnClick}>View Details</button>
        </div>
    )
}

function Home() 
{
    const [studyGroups, setStudyGroups] = useState([])
    useEffect(() => 
    {
        const fetchGroups = async () => 
        {
            try
            {
                const res = await fetch('http://localhost:3000/studygroups')
                if (!res.ok)
                {
                    console.log("Error in fetching.")
                    return
                }
                const data = await res.json()
                setStudyGroups(data)
            }
            catch (err)
            {
                console.error('Error: ', err)
            }
    
        }
        fetchGroups()
    }, [])

    return (
        <div>
            {studyGroups.map((group) => <StudyGroup key={group.id} group={group} />)}
        </div>
    )
}

export default Home