"use client";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

// TEMPORARY
// Events below the calendar
const events = [
  {
    id: 1,
    title: "Finish Quiz",
    time: "12:00pm",
    description: "Finish studying the newly created quiz",
  },
  {
    id: 2,
    title: "Finish Studying",
    time: "8:00pm",
    description: "Finish studying",
  },
  {
    id: 3,
    title: "Finish Test",
    time: "4:00pm",
    description: "Finish studying the newly created Test",
  },
];

const EventCalendar = () => {
  // Use state for the event calendar
  const [value, onChange] = useState(new Date());

  return (
    <div className="bg-white p-4 rounded-md ">
      <Calendar onChange={onChange} value={value} />
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div className="" key={event.id}>
            <div className="flex items-center justify-between">
              <h1>{event.title}</h1>
              <span>{event.time}</span>
            </div>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
