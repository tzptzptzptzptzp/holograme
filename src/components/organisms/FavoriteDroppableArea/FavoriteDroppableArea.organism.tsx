import { DndContext, useDroppable } from "@dnd-kit/core";
import { GenerateRandomID } from "@/utils/GenerateRandomID.util";

type Props = {
  children: React.ReactNode;
};

const id = GenerateRandomID();

export const FavoriteDroppableArea = ({ children }: Props) => {
  const { setNodeRef } = useDroppable({
    id: `id-favorite-droppable-${id}`,
  });
  return (
    <ul className="flex gap-2 s:overflow-x-scroll" ref={setNodeRef}>
      <DndContext>{children}</DndContext>
    </ul>
  );
};
