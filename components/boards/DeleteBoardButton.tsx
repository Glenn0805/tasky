"use client";
import React, { useState } from "react";
import { Button } from "../tailgrids/core/button";
import { deleteBoardById } from "@/services/board.service";
import { MdDeleteOutline } from "react-icons/md";
import { AlertDialog } from "@components/tailgrids/core/alert-dialog";
import {
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@components/tailgrids/core/dialog";
import { DialogHeader, DialogFooter } from "../tailgrids/core/dialog";
import { OverlayWrapper } from "../tailgrids/core/overlay";

interface Props {
  id: string;
}
const DeleteBoardButton = (props: Props) => {
  const { id } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deleteHandler = async () => {
    setIsLoading(true);
    await deleteBoardById(id);
    setIsLoading(false);
  };
  return (
    <div>
      <OverlayWrapper>
        <Button variant={"danger"} appearance={"outline"} size={"sm"}>
          <MdDeleteOutline />
          Delete Board
        </Button>

        <AlertDialog isKeyboardDismissDisabled={isLoading}>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              board.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose disabled={isLoading} appearance="outline">
              Cancel
            </DialogClose>
            <Button
              disabled={isLoading}
              pending={isLoading}
              onPress={deleteHandler}
            >
              Continue
            </Button>
          </DialogFooter>
        </AlertDialog>
      </OverlayWrapper>
    </div>
  );
};

export default DeleteBoardButton;
