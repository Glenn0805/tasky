"use client";
import { Board } from "@/types/board.type";
import React, { useEffect, useState } from "react";
import { Input } from "@components/tailgrids/core/input";
import { TextField } from "@/components/tailgrids/core/text-field";
import { updateBoard } from "@/services/board.service";

interface Props {
  board: Board;
}

const BoardName = ({ board }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedName, setSavedName] = useState(board.board_name ?? "");
  const [draft, setDraft] = useState(savedName);

  useEffect(() => {
    setSavedName(board.board_name ?? "");
  }, [board.board_name]);

  const cancel = () => {
    setDraft(savedName);
    setIsEdit(false);
  };

  const onUpdate = async () => {
    const newName = draft.trim();
    if (!newName || newName === savedName) return cancel();

    setIsLoading(true);
    updateBoard({ ...board, board_name: newName });
    setSavedName(newName);
    setIsEdit(false);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      {isEdit ? (
        <form action={onUpdate}>
          <TextField
            aria-label="board-name"
            disabled={isLoading}
            className="flex flex-col gap-1.5"
          >
            <Input
              size={12}
              name="board_name"
              placeholder="Enter board name"
              className="w-full"
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onFocus={(e) => e.target.select()}
              onBlur={() => {
                if (!isLoading) cancel();
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") e.currentTarget.blur();
              }}
            />
          </TextField>
        </form>
      ) : (
        <span
          onClick={() => {
            setDraft(savedName);
            setIsEdit(true);
          }}
          className="text-md font-bold cursor-pointer p-1 rounded hover:bg-gray-200"
        >
          {savedName}
        </span>
      )}
    </div>
  );
};

export default BoardName;
