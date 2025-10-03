import React, {useState} from 'react'
function StepTwo({professors, courseInfo}) {

    console.log(`Step two logging professors: ${professors}`)
    const department = courseInfo.department
    const classCode = courseInfo.courseCode
    console.log(`Step 2 department: ${department}\nStep 2 class code: ${classCode}`)
    const [professor, setProfessor] = useState('')
    const [maxMembers, setMaxMembers] = useState(10000000)
    const [description, setDescription] = useState('')
    console.log(`Step 2 professor: ${professor}`)
    const handleSubmit = async () => 
    {
        try
        {
            const res = await fetch('http://localhost:3000/studygroups/new', {
                method: "POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    department: department,
                    classCode: classCode,
                    professor: professor,
                    maxMembers: maxMembers,
                    description: description})
            })
            if (!res.ok)
            {
                throw new Error("Failed to create new study group.")
            }
            const data = await res.json()
            console.log(data)
        }
        catch (err)
        {
            console.error("Error: ", err)

        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="Professor">
                    Select Instructor
                </label>
                <select 
                name="Prof"
                value={professor}
                onChange={(e) => setProfessor(e.target.value)}>
                    <option>--Select Professor--</option>
                    {professors.map((prof, idx) => (
                    <option key={idx} value={Array.isArray(prof) ? prof.join(" / ") : prof}>
                        {Array.isArray(prof) ? prof.join(" / ") : prof}
                    </option>
                    ))}
                </select>
                <label htmlFor="group_size">
                    Max Numbers
                </label>
                <input type="text" 
                value={maxMembers}
                onChange = {(e) => setMaxMembers(e.target.value)}
                />
                <label htmlFor="description">
                    Group Description
                </label>
                <input type="text" 
                value={description}
                onChange = {(e) => setDescription(e.target.value)}
                />
                <button type="submit">Create Study Group</button>
            </form>
        </div>
    )
}
export default StepTwo