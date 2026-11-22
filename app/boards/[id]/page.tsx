import BoardName from "@/components/boards/BoardName";
import CreateListButton from "@/components/boards/CreateListButton";
import DeleteBoardButton from "@/components/boards/DeleteBoardButton";
import ListCard from "@/components/boards/ListCard";
import { Breadcrumbs } from "@/components/tailgrids/core/breadcrumbs";
import { getBoardById } from "@/services/board.service";
import { getListsByBoardId } from "@/services/list.service";
import React, { Suspense } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

async function BoardContent({ params }: Props) {
  const { id } = await params;
  const { data } = await getBoardById(id);
  const { data: lists } = await getListsByBoardId(id);

  if (!data) {
    return <span>Board not found</span>;
  }
  return (
    <div className="flex flex-col h-dvh ">
      <div className="flex justify-between bg-white p-3 items-center shrink-0">
        <div>
          <Breadcrumbs
            dividerType="chevron"
            items={[
              { href: "/boards", label: "Boards" },
              {
                href: `boards/${id}`,
                label: data.board_name!,
              },
            ]}
          />
          <BoardName board={data} />
        </div>

        <DeleteBoardButton id={id} />
      </div>

      <div className="flex min-h-0 flex-1 flex-row items-start gap-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overflow-y-hidden p-10 w-full">
        {lists?.map((list) => (
          <ListCard key={list.id} list={list} />
        ))}
        <CreateListButton boardId={id} />
      </div>
    </div>
  );
}

export const Board = async ({ params }: Props) => {
  return (
    <Suspense fallback={<div>Loading board...</div>}>
      <BoardContent params={params} />
    </Suspense>
  );
};
export default Board;
