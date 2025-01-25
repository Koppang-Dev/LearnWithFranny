import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex justify-between items-center py-2 px-2">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={150}
          height={150}
          className="w-24"
        />
      </Link>
      <h2 className="text-lg last:font-bold ml-2">LearnWithFranny</h2>
    </div>
  );
};

export default Logo;
