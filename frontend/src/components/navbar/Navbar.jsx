import ActionButtons from "./_components/actionButtons";
import Logo from "./_components/Logo";
import Menu from "./_components/Menu";

const Navbar = () => {
  const navbarClasses = `
  flex items-center justify-between space-x-10 bg-white h-26
  sticky top-0 z-50 border-b border-gray-200
`;
  return (
    <div className={navbarClasses}>
      <div className="flex items-center justify-center space-x-10">
        {/* Increase Logo size */}
        <Logo className="w-24 h-24" /> {/* Adjust size here */}
        <Menu className="text-xl" /> {/* Adjust Menu size */}
      </div>
      {/* Increase ActionButtons size */}
      <ActionButtons className="text-xl" /> {/* Adjust ActionButtons size */}
    </div>
  );
};

export default Navbar;
