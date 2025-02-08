import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

// File Columns
export const fileColumns = [
  {
    accessorKey: "fileName",
    header: "File Name",
  },
  {
    accessorKey: "createdDate",
    header: "Date Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
          >
            <MoreVertical className="h-5 w-5 text-gray-700" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 bg-white border border-gray-300 rounded-md shadow-lg"
        >
          <DropdownMenuItem
            onClick={() => console.log("Edit", row.original)}
            className="p-2 hover:bg-blue-100 text-blue-500"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => console.log("Delete", row.original)}
            className="p-2 hover:bg-red-100 text-red-500"
          >
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => console.log("Delete", row.original)}
            className="p-2 hover:bg-yellow-100 text-yellow-500"
          >
            Favourite
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => console.log("Delete", row.original)}
            className="p-2 hover:bg-purple-100 text-purple-500"
          >
            Download
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

// Folder Columns
export const folderColumns = [
  {
    accessorKey: "folderName",
    header: "Folder Name",
  },
];
