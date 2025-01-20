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
import { useMutation } from "convex/react";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import { generateUploadUrl } from "../../../../convex/fileStorage";
import { api } from "../../../../convex/_generated/api";

const UploadScreen = ({ children }) => {
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);

  // File is selected
  const OnFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload the PDF to convex
  const OnUpload = async () => {
    setLoading(true);

    // Get a short-lived URL
    const postUrl = await generateUploadUrl();

    // Post the file
    const result = await fetch(postUrl, {
      method: "POST",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    // Retrieving the storage ID
    const { storageId } = await result.json();
    console.log("Storage ID", storageId);

    // Saving the storage ID into the database

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
                  <label>FIle Name *</label>
                  <Input placeholder="File Name" />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
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
