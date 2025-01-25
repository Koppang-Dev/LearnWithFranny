import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="flex justify-between items-center py-2 px-2">
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt=""
          width={100}
          height={100}
          className="w-13"
        />
      </Link>
      <h2 className="text-3xl last:font-bold ml-5">LearnWithFranny</h2>
    </div>
  );
};

export default Logo;
