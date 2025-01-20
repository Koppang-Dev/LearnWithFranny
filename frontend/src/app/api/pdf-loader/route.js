import { NextRequest } from "next/server";

export async function GET(req) {
  // Load the PDF file

  return NextRequest.json({ result: "Hello" });
}
