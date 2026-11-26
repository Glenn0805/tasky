"use client";
import { List } from "@/types/board.type";
import React, { useEffect, useState } from "react";
import { Input } from "@components/tailgrids/core/input";
import { TextField } from "@/components/tailgrids/core/text-field";
import { updateList } from "@/services/list.service";

interface Props {
  list: List;
}

const ListName = ({ list }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [savedName, setSavedName] = useState(list.list_name ?? "");
  const [draft, setDraft] = useState(savedName);

  useEffect(() => {
    setSavedName(list.list_name ?? "");
  }, [list.list_name]);

  const cancel = () => {
    setDraft(savedName);
    setIsEdit(false);
  };

  const onUpdate = async () => {
    const newName = draft.trim();
    if (!newName || newName === savedName) return cancel();

    setIsLoading(true);
    updateList({ ...list, list_name: newName });
    setSavedName(newName);
    setIsEdit(false);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      {isEdit ? (
        <form action={onUpdate}>
          <TextField
            aria-label="list-name"
            disabled={isLoading}
            className="flex flex-col gap-1.5"
          >
            <Input
              size={12}
              name="list_name"
              placeholder="Enter list name"
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
          className="text-md font-bold cursor-pointer p-1 rounded hover:bg-gray-200 hover:text-black"
        >
          {savedName}
        </span>
      )}
    </div>
  );
};

export default ListName;
