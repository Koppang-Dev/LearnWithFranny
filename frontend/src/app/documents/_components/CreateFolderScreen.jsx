"use client";
import { Button } from "@/components/navbar/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader2Icon } from "lucide-react";
import { useState, useRef } from "react";
import { useFolder } from "@/app/context/FolderProvider";
import { createFolder } from "@/app/utils/FileApi";
import { toast } from "react-hot-toast";

const CreateFolderScreen = ({ dialogOpen, setCreateFolderDialogOpen }) => {
  const { currentFolder } = useFolder();
  const [loading, setLoading] = useState(false);
  const [folderName, setFolderName] = useState("");
  const dialogCloseRef = useRef(null);

  const OnCreate = async () => {
    // Validation
    if (!folderName || folderName.trim() === "") {
      alert("Folder name cannot be empty or blank");
      return;
    }

    setLoading(true);
    await createFolder(folderName, currentFolder.folderId);
    toast.success("Created Folder!");

    if (dialogCloseRef.current) {
      dialogCloseRef.current.click();
    } else {
      toast.error("Failed creating folder");
      console.error("Folder creation failed");
    }
    setLoading(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setCreateFolderDialogOpen}>
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
  );
};

export default CreateFolderScreen;
