import React, {useState} from "react"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ScheduleMeeting() {
    const [dateTime, setDateTime] = useState(null)
    const [meetingDescription, setMeetingDescription] = useState('')

    return (
        <div>
            <form>
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