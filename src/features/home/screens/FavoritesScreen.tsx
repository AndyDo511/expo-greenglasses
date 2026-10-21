import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";
import { useLikedArticles } from "@/features/articles/lib/article-hooks";
import { useCategories } from "@/features/waste-library/lib/category-hooks";
import { Category } from "@/features/waste-library/types/categories.types";
import { WasteCardWithFavorite } from "@/features/articles/components/WasteCardWithFavorite";
import { getImageUrl } from "@/shared/utils/image-utils";
import { CategoryTab } from "@/features/home/components/HomeScreenComponents";


export function FavoritesScreen() {
  const router = useRouter();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories({
    status: "active",
  });

  const { data: favoritesData, isLoading: isLoadingFavorites } = useLikedArticles({
    status: "active",
    type: "library",
    categoryId: selectedCategoryId || undefined,
  });

  const categories = categoriesData?.data || [];
  const wasteItems = (favoritesData?.data || []).map((item) => {
    const matchedCategory = categories.find((cat) => cat.id === item.categoryId);
    return {
      id: item.id,
      title: item.title,
      image: getImageUrl(item.image) || item.image,
      isFavorite: item.isLiked,
      status: item.category?.title || matchedCategory?.title || "-",
      category: item.category?.title || matchedCategory?.title,
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center px-6 py-4 h-20">
        <Pressable
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-2xl bg-grey-100 z-10"
        >
          <ArrowLeft size={24} color="#161C24" variant="Linear" />
        </Pressable>
        <View className="absolute left-0 right-0 items-center justify-center h-20 -z-0">
           <Text className="text-xl font-bold text-grey-900">
             Sản phẩm yêu thích
           </Text>
        </View>
      </View>

      <View className="flex-1">
        <View className="px-6 py-2">
          {isLoadingCategories ? (
            <ActivityIndicator />
          ) : (
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="mb-6"
            >
              <CategoryTab
                index={0}
                label="Tất cả" 
                active={selectedCategoryId === null} 
                onPress={() => setSelectedCategoryId(null)}
              />
              {categories.map((cat: Category, index) => (
                <CategoryTab
                  index={index}
                  key={cat.id} 
                  label={cat.title} 
                  active={selectedCategoryId === cat.id} 
                  onPress={() => setSelectedCategoryId(cat.id)}
                />
              ))}
            </ScrollView>
          )}
        </View>

        {isLoadingFavorites ? (
          <ActivityIndicator className="mt-10" />
        ) : (
          <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
            <View className="pb-20">
              {wasteItems.length > 0 ? (
                wasteItems.map((item) => (
                  <WasteCardWithFavorite
                    key={item.id}
                    item={item}
                    onPress={() =>
                      router.push({
                        pathname: "/(protected)/waste-details/[id]",
                        params: { id: item.id },
                      })
                    }
                  />
                ))
              ) : (
                <View className="w-full items-center py-20">
                  <Text className="text-grey-400 italic">Chưa có mục yêu thích nào</Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
