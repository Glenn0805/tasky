import BoardCard from "@/components/boards/BoardCard";
import BoardCardSkeleton from "@/components/boards/BoardCardSkeleton";
import { getBoardsByCurrentUser } from "@/services/board.service";
import React, { Suspense } from "react";

const YourBoards = async () => {
  const { data, error } = await getBoardsByCurrentUser();

  if (error) console.error(error);

  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {data?.map((board) => (
        <BoardCard key={board.id} board={board} />
      ))}
    </div>
  );
};

const BoardCardSkeletonContent = () => {
  return (
    <div className="flex flex-wrap gap-4 mt-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <BoardCardSkeleton key={index} />
      ))}
    </div>
  );
};

const Boards = () => {
  return (
    <div className="p-10">
      <div className="bg-white rounded-lg shadow-md p-6 min-h-96">
        <div>
          <span className="text-2xl font-bold mb-4">My Boards</span>
          <p className="text-gray-600">
            This is the boards page. You can manage your boards here.
          </p>
          <Suspense fallback={<BoardCardSkeletonContent />}>
            <YourBoards />
          </Suspense>
        </div>
        <div className="mt-8">
          <span className="text-2xl font-bold mb-4">Invited Boards</span>
          <p className="text-gray-600">
            This is the invited boards page. You can see the boards you have
            been invited to here.
          </p>
          {/* <div className="flex flex-wrap gap-4 mt-2">
          <BoardCard />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Boards;
