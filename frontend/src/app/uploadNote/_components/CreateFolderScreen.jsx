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

    // Starting loading indicator
    // FormData Object to hold the file
    const payload = {
      folderName: folderName,
      userId: userId,
      parentFolderId: currentFolder.id,
    };

    setLoading(true);

    // Tell the backend a folder was created
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/file/create-folder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        if (dialogCloseRef.current) {
          dialogCloseRef.current.click(); // Triggering the DialogClose button programmatically
        }
        window.location.reload();
      } else {
        console.error("Folder creation failed", await response.text());
      }
    } catch (error) {
      console.error("Error creating folder", error);
    } finally {
      setLoading(false); // Stop loading
    }
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
