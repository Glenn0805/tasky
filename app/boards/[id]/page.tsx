import Lists from "@/components/boards/Lists";
import { getBoardById } from "@/services/board.service";
import { getListsWithCardsByBoardId } from "@/services/list.service";
import { Suspense } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

async function BoardContent({ params }: Props) {
  const { id } = await params;
  const { data: board } = await getBoardById(id);
  const { cards, lists } = await getListsWithCardsByBoardId(id);

  if (!board) {
    return <span>Board not found</span>;
  }
  return (
    <Lists board={board} lists={lists} cardItems={cards} />

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
