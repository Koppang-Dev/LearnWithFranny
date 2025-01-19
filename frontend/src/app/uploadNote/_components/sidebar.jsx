import { Button } from "@/components/navbar/_components/ui/button";
import { Layout, Shield } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="shadow-md h-screen p-7">
      <Image src="/images/logo.png" alt="Sidebar" width={120} height={120} />

      {/* Contains options and button */}
      <div className="mt-10">
        <Button className="w-full"> + Upload PDF</Button>

        <div className="flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 items-center p-3 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
