import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { Favorite } from "@prisma/client";

type Props = {
  children: React.ReactNode;
  favorites: Favorite[];
  setFavorites: React.Dispatch<React.SetStateAction<Favorite[] | []>>;
};

export const FavoriteDroppableArea = ({
  children,
  favorites,
  setFavorites,
}: Props) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFavorites((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          return arrayMove(items, oldIndex, newIndex);
        } else {
          return items;
        }
      });
    }
  };
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <SortableContext
        items={favorites}
        strategy={horizontalListSortingStrategy}
      >
        <ul className="flex gap-2 s:overflow-x-scroll">{children}</ul>
      </SortableContext>
    </DndContext>
  );
};
