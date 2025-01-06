// Contains the menu items
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "@/src/images/home.png",
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
        href: "/",
      },
    ],
    title: "OTHER",
    items: [
      {
        icon: "/images/profile.png",
        label: "Home",
        href: "/",
      },
      {
        icon: "/images/settings.png",
        label: "Notes",
        href: "/",
      },
      {
        icon: "/images/layout.png",
        label: "Quizzes",
        href: "/",
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="">
      {menuItems.map((i) => (
        <div className="" key={i.title}>
          <span>{i.title}</span>
          {i.items.map((item) => (
            <Link href={item.href} key={item.label}>
              <Image src={item.icon} alt=" " width={20} height={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
