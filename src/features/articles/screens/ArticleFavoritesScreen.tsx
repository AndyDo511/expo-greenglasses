import { CategoryTab } from "@/features/home/components/HomeScreenComponents";
import { useCategories } from "@/features/waste-library/lib/category-hooks";
import { getImageUrl } from "@/shared/utils/image-utils";
import { useRouter } from "expo-router";
import { ArrowLeft } from "iconsax-react-nativejs";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArticleCardWithFavorite } from "../components/ArticleCardWithFavorite";
import { useLikedArticles } from "../lib/article-hooks";

export function ArticleFavoritesScreen() {
  const router = useRouter();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const { data: categoriesData, isLoading: isLoadingCategories } = useCategories({
    status: "active",
    perPage: 50,
  });

  const { data: favoritesData, isLoading: isLoadingFavorites } = useLikedArticles({
    status: "active",
    type: "post",
    categoryId: selectedCategoryId || undefined,
    perPage: 100,
  });

  const postCategories = useMemo(
    () =>
      (categoriesData?.data || []).filter(
        (category) => category.type === "post" || !category.type
      ),
    [categoriesData]
  );

  const favoriteArticles = useMemo(
    () =>
      (favoritesData?.data || []).map((item) => ({
        id: item.id,
        title: item.title,
        image: getImageUrl(item.image) || item.image,
        category: item.category,
        createdAt: item.createdAt,
        isLiked: item.isLiked,
      })),
    [favoritesData]
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row items-center px-6 py-4 h-20 relative">
        <Pressable
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-2xl bg-grey-100 z-10"
        >
          <ArrowLeft size={24} color="#161C24" variant="Linear" />
        </Pressable>
        <View className="absolute inset-x-0 items-center justify-center h-20">
          <Text className="text-xl font-bold text-grey-900">Bài viết yêu thích</Text>
        </View>
      </View>

      <View className="px-6 py-2">
        {isLoadingCategories ? (
          <ActivityIndicator className="mb-6" />
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            <CategoryTab
              index={0}
              label="Tất cả"
              active={selectedCategoryId === null}
              onPress={() => setSelectedCategoryId(null)}
            />
            {postCategories.map((cat, index) => (
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
        <ActivityIndicator className="flex-1" />
      ) : (
        <FlatList
          data={favoriteArticles}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 24 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ArticleCardWithFavorite
              item={item}
              width="w-[48%]"
              onPress={() =>
                router.push({
                  pathname: "/(protected)/article-details/[id]",
                  params: { id: item.id },
                })
              }
            />
          )}
          ListEmptyComponent={
            <View className="items-center justify-center py-20 px-6">
              <Text className="text-grey-400 italic text-center">
                {selectedCategoryId
                  ? "Chưa có bài viết yêu thích trong danh mục này"
                  : "Chưa có bài viết yêu thích nào"}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
