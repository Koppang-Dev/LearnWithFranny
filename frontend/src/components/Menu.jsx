// Contains the menu items
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
        label: "My Notes",
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

const Menu = () => {
  return (
    <div className="mt-4 text-lg bg-black">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-6" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4 cursor-pointer ">
            {i.title}
          </span>
          {i.items.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-center justify-center lg:justify-start gap-4 text-white py-2 border border-black rounded-lg"
            >
              <Image
                src={item.icon}
                alt=" "
                width={35}
                height={35}
                className="bg-none filter invert brightness-100 grayscale"
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
