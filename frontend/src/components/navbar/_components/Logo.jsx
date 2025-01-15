import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <>
      <Link href="/">
        <Image
          src="/images/logo.png"
          alt="logo"
          width={128}
          height={177}
          className="w-24"
        />
      </Link>
    </>
  );
};

export default Logo;
