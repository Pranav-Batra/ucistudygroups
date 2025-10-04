import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/StepTwo.css";

function StepTwo({ professors, courseInfo }) {
    const navigate = useNavigate()
    const department = courseInfo.department;
    const classCode = courseInfo.courseCode;

    const [professor, setProfessor] = useState("");
    const [maxMembers, setMaxMembers] = useState(10);
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:3000/studygroups/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    department: department,
                    classCode: classCode,
                    professor: professor,
                    maxMembers: maxMembers,
                    description: description
                })
            });
            if (!res.ok) {
                throw new Error("Failed to create new study group.");
            }
            const data = await res.json();
            console.log(data);
        } catch (err) {
            console.error("Error: ", err);
        }
        navigate('/')
    };

    return (
        <div className="step-two-container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="Professor">Select Instructor</label>
                <select
                    name="Prof"
                    value={professor}
                    onChange={(e) => setProfessor(e.target.value)}
                    required
                >
                    <option value="">--Select Professor--</option>
                    {professors.map((prof, idx) => (
                        <option
                            key={idx}
                            value={Array.isArray(prof) ? prof.join(" / ") : prof}
                        >
                            {Array.isArray(prof) ? prof.join(" / ") : prof}
                        </option>
                    ))}
                </select>

                <label htmlFor="group_size">Max Members</label>
                <input
                    type="number"
                    min="1"
                    value={maxMembers}
                    onChange={(e) => setMaxMembers(e.target.value)}
                    required
                />

                <label htmlFor="description">Group Description</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <button type="submit" >Create Study Group</button>
            </form>
        </div>
    );
}

export default StepTwo;
