import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex justify-between items-center py-2 px-2">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={100}
          height={100}
          className="w-10"
        />
      </Link>
      <h2 className="text-md last:font-bold ml-2">LearnWithFranny</h2>
    </div>
  );
};

export default Logo;
