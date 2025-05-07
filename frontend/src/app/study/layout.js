import Sidebar from "../dashboard/__components/Sidebar";
import { Toaster } from "react-hot-toast";
export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1">
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
