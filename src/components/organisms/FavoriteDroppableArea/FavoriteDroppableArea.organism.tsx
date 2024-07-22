import { useRef } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { Favorite } from "@prisma/client";
import { toast } from "react-toastify";
import { textsConfig } from "@/config/texts.config";
import { useGetFavorite } from "@/hooks/api/useGetFavorite.hook";
import { usePutFavoriteOrder } from "@/hooks/api/usePutFavoriteOrder.hook";

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
  const mutateTimeout = useRef<NodeJS.Timeout | null>(null);

  const { refetch } = useGetFavorite();

  const mutate = usePutFavoriteOrder();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 15,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 15,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setFavorites((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        let newItems = [...items];
        if (oldIndex !== -1 && newIndex !== -1) {
          newItems = arrayMove(newItems, oldIndex, newIndex);

          newItems = newItems.map((item, index) => ({
            ...item,
            order: index + 1,
          }));
        }

        if (mutateTimeout.current) {
          clearTimeout(mutateTimeout.current);
        }

        mutateTimeout.current = setTimeout(() => {
          mutate(
            { favorites: newItems },
            {
              onSuccess: () => {
                toast(textsConfig.TOAST.FAVORITE_ORDER_UPDATE.SUCCESS);
                refetch();
              },
              onError: () => {
                toast.error(textsConfig.TOAST.FAVORITE_ORDER_UPDATE.ERROR);
              },
            }
          );
        }, 2500);

        return newItems;
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
