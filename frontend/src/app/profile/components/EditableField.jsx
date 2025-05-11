import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditableField = ({ label, value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value);

  // Handling the save call
  const handleSave = async () => {
    setEditing(false);
    try {
      await onSave(temp);
      toast.success(`${label} updated successfully`);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
      setTemp(value);
    }
  };

  // Handling cancel
  const handleCancel = () => {
    setTemp(value);
    setEditing(false);
  };

  // Loading the editing
  useEffect(() => {
    setTemp(value);
  }, [value]);

  // Returning the editable field
  return (
    <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
      <h2 className="text-lg font-semibold text-black">{label}</h2>
      {editing ? (
        <input
          type="text"
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          className="px-3 py-2 text-sm text-black border border-gray-300 rounded-lg"
        />
      ) : (
        <p className="text-black text-lg">{value || "N/A"}</p>
      )}
      <div className="flex justify-end items-center gap-2">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="text-green-600 hover:underline"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="text-red-500 hover:underline"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-purple-400 hover:text-black transition-colors w-20"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default EditableField;
