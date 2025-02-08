"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

export function DataTable({ columns, data }) {
  const [pageIndex, setPageIndex] = useState(0); // Track the current page
  const pageSize = 8; // Rows per page

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Enable pagination
    state: {
      pagination: {
        pageIndex, // Current page
        pageSize, // Number of rows per page
      },
    },
    onPaginationChange: (updater) => {
      setPageIndex(updater.pageIndex); // Update page index
    },
  });

  return (
    <div className="rounded-md border">
      <Table className="text-xl">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPageIndex((old) => Math.max(old - 1, 0))}
          disabled={pageIndex === 0}
          className="ml-5 font-semibold"
        >
          Previous
        </button>
        <div>
          <span>
            Page {pageIndex + 1} of {table.getPageCount()}
          </span>
        </div>
        <button
          onClick={() =>
            setPageIndex((old) => Math.min(old + 1, table.getPageCount() - 1))
          }
          disabled={pageIndex === table.getPageCount() - 1}
          className="mr-5 font-semibold"
        >
          Next
        </button>
      </div>
    </div>
  );
}
