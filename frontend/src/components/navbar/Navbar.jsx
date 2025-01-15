import ActionButtons from "./_components/actionButtons";
import Logo from "./_components/Logo";
import Menu from "./_components/Menu";

const Navbar = () => {
  return (
    <div className="flex items-center">
      <Logo />
      <Menu />
      <ActionButtons />
    </div>
  );
};

export default Navbar;
