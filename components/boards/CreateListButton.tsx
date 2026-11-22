"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../tailgrids/core/button";
import { IoAddOutline, IoCloseOutline } from "react-icons/io5";
import { TextField } from "../tailgrids/core/text-field";
import { Input } from "../tailgrids/core/input";
import { createList } from "@/services/list.service";

interface Props {
  boardId: string;
}
const CreateListButton = (props: Props) => {
  const { boardId } = props;
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onCreate = async (formData: FormData) => {
    const listName = String(formData.get("list_name"));
    if (!listName) return;
    setIsLoading(true);
    await createList({
      board_id: boardId,
      list_name: listName,
    });
    setIsLoading(false);
    setIsCreating(false);
  };

  useEffect(() => {
    if (!isCreating) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (isLoading) return; // don't close while saving
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsCreating(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isCreating, isLoading]);
  return (
    <div ref={containerRef} className="min-w-72">
      {!isCreating ? (
        <Button onClick={() => setIsCreating(true)} appearance={"outline"}>
          <IoAddOutline />
          Create New List
        </Button>
      ) : (
        <div className="bg-white w-72 rounded-xl shadow p-3">
          <div>
            <form action={onCreate} className="flex flex-col gap-2">
              <TextField
                aria-label="board-name"
                disabled={isLoading}
                className="flex flex-col gap-1.5"
              >
                <Input
                  name="list_name"
                  placeholder="Enter List Name"
                  className="w-full"
                  autoFocus
                  // value={draft}
                  // onChange={(e) => setDraft(e.target.value)}
                  onFocus={(e) => e.target.select()}
                  // onBlur={() => {
                  //   if (!isLoading) {
                  //     setIsCreating(false);
                  //   }
                  // }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      setIsCreating(false);
                      e.currentTarget.blur();
                    }
                  }}
                />
              </TextField>
              <div className="flex flex-row">
                <Button type="submit" pending={isLoading} size={"xs"}>
                  Add
                </Button>
                <Button
                  disabled={isLoading}
                  onPress={() => setIsCreating(false)}
                  size={"xs"}
                  variant={"ghost"}
                >
                  <IoCloseOutline />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateListButton;
