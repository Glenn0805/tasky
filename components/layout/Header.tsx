import React from "react";
import UserAvatar from "./UserAvatar";
import RecentBoards from "@components/boards/RecentBoards";
import Notification from "./Notification";
import CreateBoard from "../boards/CreateBoard";
import Link from "next/link";
const Header = () => {
  return (
    <>
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 w-full shrink-0">
        <div className="flex items-center gap-4">
          <RecentBoards />
          <Link href={"/boards"}>
            <h1 className="text-xl font-bold">Tasky</h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <CreateBoard />
          <Notification />
          <UserAvatar />
        </div>
      </div>
    </>
  );
};

export default Header;
