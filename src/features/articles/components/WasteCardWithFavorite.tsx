import { WasteCard } from "@/features/home/components/HomeScreenComponents";
import { useToggleLike } from "../lib/article-hooks";

interface WasteCardWithFavoriteProps {
  item: {
    id: string;
    title: string;
    image: string;
    isFavorite?: boolean;
    status?: string | null;
    category?: string;
    score?: string;
    type?: string;
  };
  onPress?: () => void;
}

export function WasteCardWithFavorite({ item, onPress }: WasteCardWithFavoriteProps) {
  const { mutate: toggleLike, isPending } = useToggleLike(item.id);

  return (
    <WasteCard
      item={item}
      onPress={onPress}
      onFavoritePress={() => toggleLike()}
      favoriteDisabled={isPending}
    />
  );
}
