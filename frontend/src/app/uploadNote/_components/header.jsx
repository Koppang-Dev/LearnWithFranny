import Logo from "@/components/navbar/_components/Logo";
import Image from "next/image";
const Header = () => {
  return (
    <div className="flex justify-end p-5 shadow-sm">
      <Image src="/images/avatar.png" alt="navbar" width={35} height={35} />
    </div>
  );
};

export default Header;
