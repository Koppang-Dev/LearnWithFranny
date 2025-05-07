const NotificationToggle = ({ label, checked, onChange }) => {
  return (
    <div className="grid grid-cols-3 items-center gap-4 pt-3 border-t border-gray-200">
      <h2 className="text-lg font-semibold text-black">{label}</h2>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors ${
            checked ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <div
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </div>
      </label>
    </div>
  );
};

export default NotificationToggle;
