import { RemoteImage } from "@/shared/components/ui/RemoteImage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Heart } from "iconsax-react-nativejs";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import RenderHtml, { defaultSystemFonts } from "react-native-render-html";
import { SafeAreaView } from "react-native-safe-area-context";
import { useArticleDetail, useToggleLike } from "../lib/article-hooks";

const htmlTagStyles = {
  body: {
    color: "#454F5B",
    fontSize: 15,
    lineHeight: 26,
    fontFamily: "System",
  },
  h2: {
    color: "#161C24",
    fontSize: 20,
    fontWeight: "700" as const,
    marginTop: 20,
    marginBottom: 8,
  },
  h3: {
    color: "#212B36",
    fontSize: 16,
    fontWeight: "700" as const,
    marginTop: 16,
    marginBottom: 6,
  },
  p: {
    marginBottom: 8,
    marginTop: 0,
  },
  ul: {
    marginBottom: 16,
    marginTop: 8,
    paddingLeft: 20,
  },
  li: {
    marginBottom: 8,
    color: "#454F5B",
    fontSize: 15,
    lineHeight: 24,
    paddingLeft: 0,
    marginLeft: 5,
  },
  strong: {
    color: "#212B36",
    fontWeight: "700" as const,
  },
};

export function ArticleDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();

  const { data: article, isLoading, error } = useArticleDetail(id || "");
  const { mutate: toggleLike, isPending: isTogglingLike } = useToggleLike(id || "");

  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#159947" />
        <Text className="mt-4 text-grey-600">Đang tải bài viết...</Text>
      </View>
    );
  }

  if (error || !article) {
    return (
      <View className="flex-1 bg-white items-center justify-center px-10">
        <Text className="text-lg text-grey-800 text-center mb-6">
          {error?.message || "Không tìm thấy nội dung bài viết."}
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="bg-primary-main px-8 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 relative">
        <Pressable
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-full bg-grey-100 z-10"
        >
          <ArrowLeft size={24} color="#161C24" variant="Linear" />
        </Pressable>
        <View className="absolute inset-x-0 bottom-0 top-0 items-center justify-center -z-0">
          <Text className="text-xl font-bold text-grey-900">Bài viết</Text>
        </View>
        <Pressable
          onPress={() => toggleLike()}
          disabled={isTogglingLike}
          className="h-12 w-12 items-center justify-center rounded-full bg-grey-100 z-10"
        >
          <Heart
            size={22}
            color={article.isLiked ? "#EB5757" : "#161C24"}
            variant={article.isLiked ? "Bold" : "Linear"}
          />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-20">
          {/* Thumbnail */}
          <View className="px-6 mb-6">
            <RemoteImage
              uri={article.image}
              style={{
                width: width - 48,
                height: 288,
                borderRadius: 12,
              }}
              contentFit="cover"
            />
          </View>

          <View className="px-6">

            {/* Title */}
            <Text className="text-2xl font-bold text-warning-500 mb-6 leading-8">
              {article.title}
            </Text>

            {/* HTML Content */}
            <RenderHtml
              contentWidth={width - 48}
              source={{ html: article.content }}
              tagsStyles={htmlTagStyles}
              systemFonts={defaultSystemFonts}
            />

            {/* Divider & Date */}
            <View className="h-px bg-grey-100 w-full mt-8 mb-4" />
        
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
