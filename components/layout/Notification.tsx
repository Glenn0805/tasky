import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerClose,
  DrawerDescription,
} from "@components/tailgrids/core/drawer";
import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { GoSidebarExpand } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import BoardCard from "../boards/RecentBoardCard";
import { DrawerHeader, DrawerBody } from "../tailgrids/core/drawer";

const Notification = () => {
  return (
    <Drawer key="recent-boards">
      <DrawerTrigger>
        <IoMdNotificationsOutline
          size={24}
          className="text-white cursor-pointer hover:text-gray-300 hover:scale-110 transition-transform duration-200"
        />
      </DrawerTrigger>
      <DrawerContent side={"right"}>
        <DrawerHeader>
          <div className="flex justify-between items-center">
            <DrawerTitle>Notifications</DrawerTitle>
          </div>
        </DrawerHeader>
        <DrawerBody>NOTIFS HERE</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Notification;
