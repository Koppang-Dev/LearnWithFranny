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

const UploadScreen = ({ children }) => {
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
                  <input type="file" />
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
            <Button>Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadScreen;
