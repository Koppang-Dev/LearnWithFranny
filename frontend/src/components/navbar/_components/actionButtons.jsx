"use client";

import React, { UseState } from "react";
import { Button } from "./ui/button";
import { X, AlignJustify } from "lucide-react";
import Link from "next/link";

const ActionButtons = () => {
  return (
    <div className="pr-2">
      <div className="items-center justify-center flex">
        <div className="flex xl:space-x-4">
          <Link href="/register" className="hidden lg:flex items-center">
            <div>Sign Up</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
