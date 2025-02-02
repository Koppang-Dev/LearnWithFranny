"use client";
import { Button } from "@/components/navbar/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import uuid4 from "uuid4";
import { useUser } from "@/app/context/UserContext";
import { useRef } from "react";
import { useFolder } from "@/app/context/FolderProvider";
import { createFolder } from "@/app/utils/FileApi";

const CreateFolderScreen = ({ children }) => {
  const { currentFolder } = useFolder();
  const [loading, setLoading] = useState(false);
  const [folderName, setFolderName] = useState("");
  const { user } = useUser();
  const userId = user?.id ?? 10;
  const dialogCloseRef = useRef(null);

  // Upload the PDF to convex
  const OnCreate = async () => {
    // Ensure the fileName is not blank or empty
    if (!folderName || folderName.trim() === "") {
      alert("Folder name cannnot be empty or blank");
      return;
    }

    setLoading(true);
    console.log("currentFolder", currentFolder);
    createFolder(folderName, userId, currentFolder.folderId);

    if (dialogCloseRef.current) {
      dialogCloseRef.current.click();
    } else {
      console.error("Folder creation failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Folder</DialogTitle>
            <DialogDescription asChild>
              <div className="mt-5">
                <label>Folder Name</label>
                <Input
                  placeholder="Folder Name"
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  className="mt-5"
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose ref={dialogCloseRef} asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button onClick={OnCreate}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateFolderScreen;
