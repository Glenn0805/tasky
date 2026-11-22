"use client";
import React, { useState } from "react";
import { Button } from "@/components/tailgrids/core/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tailgrids/core/dialog";
import { Input } from "@/components/tailgrids/core/input";
import { Backdrop, OverlayWrapper } from "@/components/tailgrids/core/overlay";
import { TextField } from "@/components/tailgrids/core/text-field";
import { IoAddOutline } from "react-icons/io5";
import { createBoard } from "@/services/board.service";
const CreateBoard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onCreateHandler = async (formData: FormData) => {
    await createBoard(formData);
    setIsOpen(false);
  };

  return (
    <OverlayWrapper>
      <Button onClick={() => setIsOpen(true)} size={"sm"} variant={"success"}>
        <IoAddOutline />
        Create Board
      </Button>

      <Backdrop isDismissable={false} isKeyboardDismissDisabled isOpen={isOpen}>
        <Dialog>
          <form action={onCreateHandler}>
            <DialogHeader>
              <DialogTitle>Create Board</DialogTitle>
              <DialogDescription>
                Create a new board to organize your tasks and projects. Fill in
                the required information below and click "Save Changes" to
                create your board.
              </DialogDescription>
            </DialogHeader>

            <DialogBody>
              <div className="flex flex-col gap-4">
                <TextField
                  id="board_name"
                  aria-label="board-name"
                  className="flex flex-col gap-1.5"
                >
                  <Input
                    id="board_name"
                    name="board_name"
                    aria-label="board-name"
                    placeholder="Enter board name"
                    className="w-full"
                    autoFocus
                  />
                </TextField>
                <div>
                  <span>
                    Invite team members to collaborate on this board. You can
                    add their email addresses below. They will receive an
                    invitation to join the board.
                  </span>
                </div>
              </div>
            </DialogBody>

            <DialogFooter>
              <DialogClose
                onClick={() => setIsOpen(false)}
                appearance="outline"
              >
                Cancel
              </DialogClose>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Dialog>
      </Backdrop>
    </OverlayWrapper>
  );
};

export default CreateBoard;
