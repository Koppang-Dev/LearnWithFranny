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
import uuid4 from "uuid4";
import { useUser } from "@/app/context/UserContext";
import { useFolder } from "@/app/context/FolderProvider";
import { saveFile } from "@/app/utils/FileApi";
import toast from "react-hot-toast";

const UploadScreen = ({ dialogOpen, setDialogOpen }) => {
  const { currentFolder } = useFolder();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const { user } = useUser();
  const userId = user?.id ?? 10;
  const dialogCloseRef = useRef(null);

  const OnFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const nameWithoutExtension = selectedFile.name.replace(/\.[^/.]+$/, "");
      setFileName(nameWithoutExtension);
    }
  };

  const OnUpload = async () => {
    if (!fileName || fileName.trim() === "") {
      alert("File name cannot be empty or blank");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("folderId", currentFolder.folderId);

    try {
      saveFile(formData);
      setDialogOpen(false);
      toast.success("File uploaded!");
    } catch (error) {
      console.error("Error uploading file", error);
      toast.error("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
          <DialogDescription asChild>
            <div>
              <h2 className="mt-5">Select a file to upload</h2>
              <div className="gap-2 p-3 rounded-md border">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={OnFileSelect}
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
          <DialogClose asChild>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Close
            </Button>
          </DialogClose>
          <Button onClick={OnUpload}>
            {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadScreen;
