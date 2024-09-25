import React from "react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SignOut } from "./auth/signout-button";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full bg-gray-100 p-4">
      <Link href="/">
        <h1 className="text-xl font-bold">Chatbot</h1>
      </Link>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/chatbot">聊天</Link>
          </li>
          <li>
            <Popover>
              <PopoverTrigger>
                <UserAvatar />
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col gap-2">
                  <Link href="/subscription">
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
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
