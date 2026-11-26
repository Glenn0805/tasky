"use client";
import { CardType } from "@/types/board.type";
import React, { useEffect, useState } from "react";
import { Input } from "@components/tailgrids/core/input";
import { TextField } from "@/components/tailgrids/core/text-field";
import { updateCard } from "@/services/card.service";

interface Props {
    card: CardType;
    boardId: string
}

const CardName = ({ card, boardId }: Props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [savedName, setSavedName] = useState(card.card_name ?? "");
    const [draft, setDraft] = useState(savedName);

    useEffect(() => {
        setSavedName(card.card_name ?? "");
    }, [card.card_name]);

    const cancel = () => {
        setDraft(savedName);
        setIsEdit(false);
    };

    const onUpdate = async () => {
        const newName = draft.trim();
        if (!newName || newName === savedName) return cancel();

        setIsLoading(true);
        updateCard({ ...card, card_name: newName }, boardId);
        setSavedName(newName);
        setIsEdit(false);
        setIsLoading(false);
    };

    return (
        <div className="flex flex-row gap-2 items-center w-full ">
            {isEdit ? (
                <form action={onUpdate}>
                    <TextField
                        aria-label="card-name"
                        disabled={isLoading}
                    >
                        <Input
                            name="card_name"
                            placeholder="Enter card name"
                            className={"flex-1 w-60"}
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
                    className="text-md font-normal cursor-pointer p-1 rounded hover:bg-gray-200"
                >
                    {savedName}
                </span>
            )}
        </div>
    );
};

export default CardName;
