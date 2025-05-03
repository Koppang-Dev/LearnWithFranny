import Sidebar from "../dashboard/__components/Sidebar";
import { Toaster } from "react-hot-toast";
export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 w-64 min-h-screen text-white">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
        />
        {children}
      </div>
    </div>
  );
}
