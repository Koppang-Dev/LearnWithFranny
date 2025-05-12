const UserCard = ({ type, value = "1234" }) => {
  return (
    <div
      className="rounded-2xl odd:bg-purple-100 even:bg-indigo-100
    p-4 flex-1 min-w-[160px] shadow-md transition-transform hover:scale-[1.02]"
    >
      {/* Value */}
      <h1 className="text-3xl font-bold my-4 text-gray-800">{value}</h1>

      {/* Metric Label */}
      <h2 className="capitalize text-sm font-medium text-gray-700 tracking-wide">
        {type}
      </h2>
    </div>
  );
};

export default UserCard;
