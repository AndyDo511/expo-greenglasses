import { ArticleCardWithFavorite } from "@/features/articles/components/ArticleCardWithFavorite";
import { WasteCardWithFavorite } from "@/features/articles/components/WasteCardWithFavorite";
import { useArticles } from "@/features/articles/lib/article-hooks";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCategories } from "@/features/waste-library/lib/category-hooks";
import { getImageUrl } from "@/shared/utils/image-utils";
import { useRouter } from "expo-router";
import { Heart, SearchNormal1 } from "iconsax-react-nativejs";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CategoryTab,
  SectionHeader,
} from "../components/HomeScreenComponents";

export function HomeScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useCategories({
      status: "active",
      perPage: 10,
    });

  const { data: articlesData, isLoading: isLoadingArticles } = useArticles({
    status: "active",
    type: "post",
    perPage: 5,
  });

  const { data: wasteData } = useArticles({
    status: "active",
    type: "library",
    categoryId: selectedCategoryId || undefined,
    perPage: 4,
  });

  const categories = categoriesData?.data || [];
  const wasteItems = (wasteData?.data || []).map((item) => {
    const matchedCategory = categories.find(
      (cat) => cat.id === item.categoryId,
    );

    return {
      id: item.id,
      title: item.title,
      status: matchedCategory?.title || "-",
      image: getImageUrl(item.image) || "",
      isFavorite: item.isLiked,
    };
  });

  const articles = (articlesData?.data || []).map((item) => ({
    id: item.id,
    title: item.title,
    image: getImageUrl(item.image) || "",
    category: item.category,
    createdAt: item.createdAt,
    isLiked: item.isLiked,
  }));

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 py-4">
          <View className="flex-row items-center gap-3">
            <View className="h-12 w-12 rounded-full bg-grey-200 overflow-hidden">
              {user?.avatar ? (
                <Image
                  source={{ uri: getImageUrl(user.avatar) || "" }}
                  className="w-full h-full"
                />
              ) : (
                <View className="w-full h-full items-center justify-center bg-grey-300" />
              )}
            </View>
            <View>
              <Text className="text-xs text-grey-600">Xin chào!</Text>
              <Text className="text-lg font-bold text-grey-900">
                {user?.fullName || "Người dùng"} 👋
              </Text>
            </View>
          </View>
          <Pressable
            onPress={() => router.push("/favorites")}
            className="h-12 w-12 items-center justify-center rounded-full bg-grey-200 border border-grey-100"
          >
            <Heart size={24} color="#161C24" variant="Linear" />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View className="bg-white px-6 pb-4">
          <Text className="text-secondary-contrastText text-3xl mb-5">Trợ lý thông minh</Text>

          <Pressable
            onPress={() => router.push("/search")}
            className="flex-row justify-between items-center h-14 bg-grey-50 rounded-full px-4 border border-secondary-contrastText"
          >
            <Text className="ml-3 text-grey-600 font-medium">Tìm kiếm sản phẩm</Text>
            <View className="bg-grey-5008 p-2 rounded-full">
              <SearchNormal1 size={20} color="#637381" variant="Linear" />
            </View>
          </Pressable>
        </View>

        {/* Content */}
        <View className="px-6 py-4">
          {/* Categories */}

          {/* Categories */}
          <View className="mb-8">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-grey-900">
                Khám phá danh mục
              </Text>

              <Text className="text-xs text-grey-500">
                Vuốt để xem thêm →
              </Text>
            </View>

            {isLoadingCategories ? (
              <ActivityIndicator
                size="small"
                color="#176B4D"
                className="py-4"
              />
            ) : (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingRight: 24,
                  alignItems: "center",
                }}
              >
                <CategoryTab
                  label="Tất cả"
                  active={selectedCategoryId === null}
                  onPress={() => setSelectedCategoryId(null)}
                />

                {categories.map((cat) => (
                  <CategoryTab
                    key={cat.id}
                    label={cat.title}
                    active={selectedCategoryId === cat.id}
                    onPress={() => setSelectedCategoryId(cat.id)}
                  />
                ))}
              </ScrollView>
            )}
          </View>


          {/* Waste Library */}
          <SectionHeader
            title="Sản phẩm"
            onSeeAll={() => router.push("/library")}
          />
          <View className="pb-10">
            {wasteItems.length > 0 ? (
              wasteItems?.slice(0, 3)?.map((item) => (
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
              <Text className="text-grey-400 italic py-4">
                Không có rác nào trong danh mục này
              </Text>
            )}
          </View>

          {/* Articles */}
          <View className="mt-8 mb-20">
            <SectionHeader
              title="Bài viết"
              onSeeAll={() => router.push("/articles")}
            />
            {isLoadingArticles ? (
              <ActivityIndicator />
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {articles.map((item) => (
                  <View key={item.id} className="mr-4">
                    <ArticleCardWithFavorite
                      key={item.id}
                      item={item}
                      onPress={() =>
                        router.push({
                          pathname: "/(protected)/article-details/[id]",
                          params: { id: item.id },
                        })
                      }
                    />
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
