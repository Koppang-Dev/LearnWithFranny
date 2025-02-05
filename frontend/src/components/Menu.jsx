import Link from "next/link";
import Image from "next/image";

const menuItems = [
  {
    items: [
      {
        icon: "/images/home.png",
        label: "Dashboard",
        href: "/dashboard",
      },
      {
        icon: "/images/notes.png",
        label: "Events",
        href: "/",
      },
      {
        icon: "/images/quiz.png",
        label: "Quizzes",
        href: "/",
      },
      {
        icon: "/images/learn.png",
        label: "Learn",
        href: "/",
      },
      {
        icon: "/images/notes.png",
        label: "My Documents",
        href: "/uploadNote",
      },
    ],
  },
  {
    items: [
      {
        icon: "/images/home.png",
        label: "Home",
        href: "/",
      },
      {
        icon: "/images/settings.png",
        label: "Settings",
        href: "/",
      },
      {
        icon: "/images/layout.png",
        label: "Layout",
        href: "/",
      },
    ],
  },
];

const Menu = ({ width = "w-64" }) => {
  return (
    <div className={`mt-4 text-lg bg-white ${width}`}>
      {/* Logo and Name Section */}
      <div className="p-4">
        <Link href="/" className="flex items-center justify-start gap-2">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={50}
            height={50}
            className=""
          />
          <span className="hidden lg:block text-3xl text-black font-bold">
            LearnWithFranny
          </span>
        </Link>
      </div>

      {/* Menu Items */}
      {menuItems.map((i, index) => (
        <div className="flex flex-col gap-6" key={index}>
          <span className="hidden lg:block text-gray-400 font-light my-4 cursor-pointer">
            {i.title}
          </span>
          {i.items.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-center justify-center lg:justify-start gap-4 text-black py-2 border border-gray rounded-lg"
            >
              <Image
                src={item.icon}
                alt="icon"
                width={35}
                height={35}
                className="bg-none"
              />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
