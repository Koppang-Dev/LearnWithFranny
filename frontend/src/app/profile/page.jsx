import Tabs from "./__components/tabs";

const Profile = () => {
  return (
    <div className="m-10 w-full h-full bg-white">
      {/* Displaying the users name and title */}
      <div className="flex flex-col gap-10">
        {/* users name */}
        <div className="">
          <div>
            <h1 className="text-2xl font-semibold text-black">Riley Koppang</h1>
          </div>
          {/* Simple title */}
          <div>
            <h2 className="text-lg text-gray-500">
              Manage your details and personal preferences here
            </h2>
          </div>
        </div>
        {/* Displaying tabs */}
        <Tabs />
      </div>
    </div>
  );
};

export default Profile;
