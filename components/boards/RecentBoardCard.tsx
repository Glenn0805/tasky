import React from "react";
import { MdDeleteOutline } from "react-icons/md";

const RecentBoardCard = () => {
  return (
    <div className="group border rounded bg-gray-300 p-5 text-md text-black font-medium cursor-pointer hover:bg-gray-400 flex justify-between items-center">
      <span>Recent Board Name</span>
      <div>
        <MdDeleteOutline className="text-xl cursor-pointer hover:text-red-500 hidden group-hover:block" />
      </div>
    </div>
  );
};

export default RecentBoardCard;
