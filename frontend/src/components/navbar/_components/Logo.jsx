import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex justify-between items-center py-2 px-2">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={75}
          height={75}
          className="w-10"
        />
      </Link>
      <h2 className="text-sm font-bold ml-2">Franny</h2>
    </div>
  );
};

export default Logo;
