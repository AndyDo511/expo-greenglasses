import { RemoteImage } from "@/shared/components/ui/RemoteImage";
import images from "@/shared/constants/images";
import { Heart } from "iconsax-react-nativejs";
import React from "react";
import { Pressable, Text, View } from "react-native";

const listImage = [
  images.categories1,
  images.categories2,
  images.categories3,
  images.categories4,
];

/** Chọn ảnh ổn định theo label/index khi số danh mục > số ảnh */
function getCategoryImage(index: number, label: string) {
  if (listImage.length === 0) return listImage[0];

  const seed = label.split("").reduce((sum, char) => sum + char.charCodeAt(0), index * 31);
  const imageIndex = seed % listImage.length;
  return listImage[imageIndex];
}

type CategoryTabProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export function CategoryTab({
  label,
  active,
  onPress,
}: CategoryTabProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      className={[
        "mr-2 rounded-full border px-5 py-3",
        "items-center justify-center",
        active
          ? "bg-[#176B4D] border-[#176B4D]"
          : "bg-[#F5F7F6] border-[#E5EAE7]",
      ].join(" ")}
      style={({ pressed }) => ({
        opacity: pressed ? 0.75 : 1,
      })}
    >
      <Text
        numberOfLines={1}
        className={[
          "text-sm font-semibold",
          active ? "text-white" : "text-[#52635A]",
        ].join(" ")}
      >
        {label}
      </Text>
    </Pressable>
  );
}


export const SectionHeader = ({
  title,
  onSeeAll,
}: {
  title: string;
  onSeeAll?: () => void;
}) => (
  <View className="flex-row items-center justify-between mb-4">
    <Text className="text-xl font-bold text-grey-900">{title}</Text>
    <Pressable onPress={onSeeAll} className="flex-row items-center">
      <Text className="text-sm font-medium text-grey-500 mr-1">Xem thêm</Text>
    </Pressable>
  </View>
);

export const WasteCard = ({
  item,
  onPress,
  onFavoritePress,
  favoriteDisabled = false,
}: {
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
  onFavoritePress?: () => void;
  favoriteDisabled?: boolean;
}) => (
  <Pressable
    onPress={onPress}
    className="w-full mb-4 bg-[#F2F4F7] rounded-[32px] h-[290px] relative overflow-hidden"
  >
    {/* Product Image (Background) */}
    <RemoteImage
      uri={item.image}
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      contentFit="cover"
    />
    {/* Light Overlay for text readability */}
    <View className="absolute inset-0 bg-[#F2F4F7]/70" />

    {/* Content Container (Left Side) */}
    <View className="z-10 p-5 h-full justify-between pr-4">
      <View>
        <Text className="text-[12px] text-grey-900 font-semibold mb-1">
          {item.category || "Thực phẩm"}
        </Text>
        <Text
          className="text-[18px] font-bold text-grey-900 leading-tight"
          numberOfLines={2}
        >
          {item.title}
        </Text>
      </View>


      <View>
        <View className="flex-row items-center gap-2 mb-4">
          <View className="w-[6px] h-10 bg-grey-800 rounded-full overflow-hidden">
            <View className="bg-[#6BFF7C] w-full h-[60%] rounded-full" />
          </View>
          <View>
            <Text className="text-[22px] font-bold text-grey-900 leading-none">
              {item.score || "4/10"}
            </Text>
            <Text className="text-[12px] text-grey-900 font-medium">Điểm</Text>
          </View>
        </View>
        <Text className="text-[16px] font-bold text-grey-900">
          {item.status || "Trung bình"}
        </Text>
        <Text className="text-[13px] text-grey-900 font-medium">
          {item.type || "Tái chế"}
        </Text>
      </View>
    </View>

    {/* Favorite Button (Bottom Right) */}
    <Pressable
      onPress={onFavoritePress}
      disabled={!onFavoritePress || favoriteDisabled}
      className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-white/70 items-center justify-center"
    >
      <Heart
        size={22}
        color={item.isFavorite ? "#FF4B4B" : "#1C2B36"}
        variant={item.isFavorite ? "Bold" : "Linear"}
      />
    </Pressable>
  </Pressable>
);

export const ArticleCard = ({
  item,
  onPress,
  width = "w-64",
}: {
  item: {
    id: string;
    title: string;
    image: string;
  };
  onPress?: () => void;
  width?: string;
}) => (
  <Pressable
    onPress={onPress}
    className={`${width} mb-4 bg-grey-200 rounded-[28px] overflow-hidden border border-grey-100 shadow-sm`}
  >
    <RemoteImage
      uri={item.image}
      style={{ width: "100%", height: 176 }}
      contentFit="cover"
    />
    <View className="p-4">
      <Text
        className="text-sm font-bold text-grey-900 leading-5"
        numberOfLines={2}
      >
        {item.title}
      </Text>
    </View>
  </Pressable>
);
