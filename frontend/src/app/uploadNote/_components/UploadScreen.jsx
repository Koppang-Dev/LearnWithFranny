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

const UploadScreen = ({ children }) => {
  const { currentFolder } = useFolder();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const { user } = useUser();
  const userId = user?.id ?? 10;
  const dialogCloseRef = useRef(null);

  // File is selected
  const OnFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Initialize the file name with the selected file's name
    if (selectedFile) {
      const nameWithoutExtension = selectedFile.name.replace(/\.[^/.]+$/, ""); // Remove file extension
      setFileName(nameWithoutExtension);
    }
  };

  // Upload the PDF to convex
  const OnUpload = async () => {
    // Ensure the fileName is not blank or empty
    if (!fileName || fileName.trim() === "") {
      alert("File name cannnot be empty or blank");
      return;
    }

    // Starting loading indicator
    setLoading(true);

    // FormData Object to hold the file
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("folderId", currentFolder.folderId);

    // Send the file to the backend
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/file/${userId}/upload`, // Endpoint for uploading the file
        {
          method: "POST",
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
          },
          body: formData, // Sending file and other form data
        }
      );
      if (response.ok) {
        if (dialogCloseRef.current) {
          dialogCloseRef.current.click(); // Triggering the DialogClose button programmatically
        }
        window.location.reload();
      } else {
        console.error("File upload failed", await response.text());
      }
    } catch (error) {
      console.error("Error uploading file", error);
    } finally {
      setLoading(false);
    }

    // Set loading icon back to false
    setLoading(false);
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription asChild>
              <div className="">
                {/* File Selection */}
                <h2 className="mt-5">Select a file to upload</h2>
                <div className="gap-2 p-3 rounded-md border">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(event) => OnFileSelect(event)}
                  />
                </div>
                <div className="mt-2">
                  <label>File Name *</label>
                  <Input
                    placeholder="File Name"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose ref={dialogCloseRef} asChild>
              <Button type="Button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button onClick={OnUpload}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadScreen;
