import React, {useState} from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ScheduleMeeting() {
    const navigate = useNavigate()
    const [dateTime, setDateTime] = useState(null)
    const [meetingDescription, setMeetingDescription] = useState('')
    const {id} = useParams()

    const handleSubmit = async (e) => {
        try 
        {
            const res = await fetch(`http://localhost:3000/meetings/${id}`, {
                method: "POST",
                credentials: "include",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    meetingTime: dateTime,
                    description: meetingDescription,
                })
            })
            if (!res.ok)
            {
                console.log("Error sending emails.")
            }
            const data = await res.json()
            console.log(data)
        } 
        catch (error) 
        {
            console.error("Error: ", error)
        }
        finally
        {
            navigate('/')
        }

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label value="Meeting Time">Meeting Date/Time</label>
                <DatePicker
                id="meeting"
                selected={dateTime}
                onChange={(date) => setDateTime(date)}
                showTimeSelect
                timeIntervals={15}
                dateFormat="Pp"              // localized format like "10/4/2025 2:30 PM"
                placeholderText="Select date & time"
                minDate={new Date()}         // example validation
                />
                <label value="Meeting Description">Meeting Description</label>
                <input type="text" 
                value={meetingDescription} 
                onChange={(e) => setMeetingDescription(e.target.value)}
                />
                <button type="submit">Schedule</button>
            </form>
        </div>
    )
}


export default ScheduleMeeting