import Sidebar from "../dashboard/__components/Sidebar";
export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
