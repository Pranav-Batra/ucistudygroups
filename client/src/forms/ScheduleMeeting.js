import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ScheduleMeeting.css";

function ScheduleMeeting() {
  const navigate = useNavigate();
  const [dateTime, setDateTime] = useState(null);
  const [meetingDescription, setMeetingDescription] = useState("");
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/meetings/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          meetingTime: dateTime,
          description: meetingDescription,
        }),
      });

      if (!res.ok) {
        console.log("Error sending emails.");
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="schedule-meeting-container">
      <form className="schedule-form" onSubmit={handleSubmit}>
        <h2>Schedule a Meeting</h2>

        <label htmlFor="meeting">Meeting Date/Time</label>
        <DatePicker
          id="meeting"
          selected={dateTime}
          onChange={(date) => setDateTime(date)}
          showTimeSelect
          timeIntervals={15}
          dateFormat="Pp"
          placeholderText="Select date & time"
          minDate={new Date()}
          className="date-picker"
        />

        <label htmlFor="description">Meeting Description</label>
        <input
          type="text"
          id="description"
          value={meetingDescription}
          onChange={(e) => setMeetingDescription(e.target.value)}
          placeholder="Enter meeting description"
        />

        <button type="submit" className="submit-button">
          Schedule
        </button>
      </form>
    </div>
  );
}

export default ScheduleMeeting;
