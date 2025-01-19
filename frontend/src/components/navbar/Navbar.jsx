import ActionButtons from "./_components/actionButtons";
import Logo from "./_components/Logo";
import Menu from "./_components/Menu";

const Navbar = () => {
  const navbarClasses = `flex items-center justify-between space-x-10 bg-white h-14 sticky top-0 z-50 border-b border-gray-200`;

  return (
    <div className={navbarClasses}>
      <Logo />
      <Menu />
      <ActionButtons />
    </div>
  );
};

export default Navbar;
