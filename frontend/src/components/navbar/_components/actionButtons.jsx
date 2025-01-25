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
          <Link href="/login" className="hidden lg:flex items-center">
            <div className="text-xl leading-relaxed">Login</div>
          </Link>
        </div>
        <div className="flex lg:space-x-4 items-center pr-4 pl-5">
          <div>
            <Link href="/register">
              <Button className="hidden lg:flex items-center border-none text-xl px-8 py-4 leading-relaxed">
                Sign Up For Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
