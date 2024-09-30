import React from "react";
import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SignOut } from "../auth/signout-button";
import UserAvatar from "../UserAvatar";
import { Button } from "../ui/button";

const SideNavbar = () => {
  return (
    <nav className=" flex flex-col justify-between items-center w-20 bg-gray-100 h-screen p-4">
      <Link href="/">
        <h2>Chatbot</h2>
      </Link>
      <section>
        <Popover>
          <PopoverTrigger>
            <UserAvatar />
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex flex-col gap-2">
              <Link href="/sub">
                <Button variant="ghost" className="w-full">
                  Billing
                </Button>
              </Link>
              <Button variant="ghost" className="w-full" disabled>
                Pricing
              </Button>
              <Button variant="ghost" className="w-full">
                <SignOut />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </section>
    </nav>
  );
};

export default SideNavbar;
