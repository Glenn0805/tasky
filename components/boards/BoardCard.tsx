"use client";
import { Database } from "@/types/database.types";
import { redirect } from "next/navigation";
import React from "react";

const BoardCard = ({
  board,
}: {
  board: Database["public"]["Tables"]["boards"]["Row"];
}) => {
  const onclickHandler = () => {
    console.log("Board clicked:", board);
    redirect(`/boards/${board.id}`);
  };
  return (
    <div className="border rounded-lg  w-90 min-h-40" onClick={onclickHandler}>
      <div className="p-3 border-b font-semibold text-sm">
        {board.board_name}
      </div>
    </div>
  );
};

export default BoardCard;
