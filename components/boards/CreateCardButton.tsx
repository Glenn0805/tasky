'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../tailgrids/core/button'
import { IoAddOutline, IoCloseOutline } from 'react-icons/io5'
import { TextField } from "../tailgrids/core/text-field";
import { Input } from "../tailgrids/core/input";
import { createCard } from '@/services/card.service';
import { ListType } from '@/types/board.type';

interface Props {
    list: ListType
}
const CreateCardButton = ({ list }: Props) => {
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const onCreate = async (formData: FormData) => {
        const cardName = String(formData.get("card_name"));
        if (!cardName || !list.board_id) return;
        setIsLoading(true);
        await createCard({ card_name: cardName, list_id: list.id }, list.board_id);
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
        <div ref={containerRef} >
            {!isCreating ? (
                <Button appearance={"outline"} onClick={() => setIsCreating(true)} className={"w-full flex-1 "}>
                    <IoAddOutline />
                    Add Card
                </Button>
            ) : (
                <div className="bg-white w-full rounded-xl shadow p-3">
                    <div>
                        <form action={onCreate} className="flex flex-col gap-2">
                            <TextField
                                aria-label="board-name"
                                disabled={isLoading}
                                className="flex flex-col gap-1.5"
                            >
                                <Input
                                    name="card_name"
                                    placeholder="Enter Card Name"
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
                            <div className="flex flex-row gap-2">
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
    )
}

export default CreateCardButton