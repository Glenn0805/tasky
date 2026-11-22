import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@components/tailgrids/core/drawer";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import RecentBoardCard from "./RecentBoardCard";
import { AiOutlineStar } from "react-icons/ai";

const RecentBoards = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Drawer key="recent-boards">
        <DrawerTrigger>
          <GoSidebarCollapse className="text-2xl cursor-pointer" />
        </DrawerTrigger>
        <DrawerContent side={"left"} showCloseButton={false}>
          <DrawerHeader>
            <div className="flex justify-between items-center">
              <DrawerTitle>My Boards</DrawerTitle>
              <DrawerClose>
                <GoSidebarExpand className="text-2xl cursor-pointer" />
              </DrawerClose>
            </div>

            <DrawerDescription>
              Recently accessed boards will be displayed here. You can pin your
              favorite boards for quick access.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerBody>
            <div className="flex gap-2 flex-col">
              <div className="flex  items-center gap-1">
                <AiOutlineStar className="text-yellow-500" size={20} />
                <span>Favorites</span>
              </div>
              <RecentBoardCard />
              <RecentBoardCard />
              <RecentBoardCard />
              <RecentBoardCard />
              <RecentBoardCard />
              <RecentBoardCard />
              <span>Recents</span>
              <RecentBoardCard />
              <RecentBoardCard />
              <RecentBoardCard />
              <RecentBoardCard />
              <RecentBoardCard />
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RecentBoards;
