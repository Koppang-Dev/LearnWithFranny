// Contains the menu items
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/images/home.png",
        label: "Home",
        href: "/",
      },
      {
        icon: "/images/notes.png",
        label: "Notes",
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
        icon: "/images/upload.png",
        label: "Upload Notes",
        href: "/uploadNote",
      },
    ],
  },
  {
    title: "OTHER",
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
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-liight my-4">
            {i.title}
          </span>
          {i.items.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2"
            >
              <Image src={item.icon} alt=" " width={20} height={20} />
              <span className="hidden lg:block">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
