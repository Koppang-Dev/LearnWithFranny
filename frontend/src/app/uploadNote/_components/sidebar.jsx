import { Button } from "@/components/navbar/_components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Layout, Shield } from "lucide-react";
import Image from "next/image";
import CreateFolderScren from "./CreateFolderScreen";
import UploadScreen from "./UploadScreen";
import Link from "next/link";
import { useFolder } from "@/app/context/FolderProvider";
const Sidebar = () => {
  const { setCurrentFolder } = useFolder();

  const handleFolderClick = (folderId) => {
    setCurrentFolder({ folderId });
  };

  return (
    <div className="shadow-md h-screen p-7">
      <Link href="/dashboard">
        <Image src="/images/logo.png" alt="Sidebar" width={120} height={120} />
      </Link>

      {/* Contains options and button */}
      <div className="mt-10">
        <UploadScreen>
          <Button className="w-full"> + Upload File </Button>
        </UploadScreen>

        <CreateFolderScren>
          <Button className="w-full mt-5"> + Create Folder </Button>
        </CreateFolderScren>
        <div
          className="flex gap-2 items-center p-3 mt-5 hover:bg-slate-100 rounded-lg cursor-pointer"
          onClick={() => handleFolderClick("workspace")}
        >
          <Layout />
          <h2>Workspace</h2>
        </div>
        <div className="flex gap-2 items-center p-3 hover:bg-slate-100 rounded-lg cursor-pointer">
          <Shield />
          <h2>Upgrade</h2>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="absolute bottom-24 w-[80%]">
        <Progress value={33} />
        <p className="text-sm mt-1">2 out of 5 documents uploaded</p>
        <p className="text-xs mt-2 text-gray-400">
          Upgrade to upload more document
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
