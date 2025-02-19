import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* User Profile Image and Name */}

      {/* Notifications Symbol */}

      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image
            src="/images/announcement.png"
            alt=""
            width={20}
            height={20}
            className="bg-none"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">John Doe</span>
          <span className="text-[10px] text-gray-500 text-right">Student</span>
        </div>
        <Image
          src="/images/avatar.png"
          alt=""
          width={36}
          height={36}
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
