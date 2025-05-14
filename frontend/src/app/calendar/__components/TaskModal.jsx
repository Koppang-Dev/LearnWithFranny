// app/calendar/__components/TaskModal.jsx
"use client";

import { useState, useEffect } from "react";

export default function TaskModal({ isOpen, onClose, onSave, task }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDate(task.date || "");
    } else {
      setTitle("");
      setDate("");
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    await onSave({ title, date, id: task?.id });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-semibold mb-4">
          {task ? "Edit" : "Add"} Task
        </h2>
        <input
          type="text"
          className="w-full border rounded p-2 mb-3"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          className="w-full border rounded p-2 mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-600">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
