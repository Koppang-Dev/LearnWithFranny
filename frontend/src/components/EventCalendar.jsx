"use client";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";

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
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold my-4 ">Events</h1>
        <Image src="/images/more.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
