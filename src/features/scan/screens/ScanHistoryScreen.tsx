import { useQueryClient } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import { ArrowLeft } from "iconsax-react-nativejs";
import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInfiniteVisionHistory } from "../lib/vision-hooks";

export function ScanHistoryScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteVisionHistory();

  useFocusEffect(
    useCallback(() => {
      void queryClient.resetQueries({
        queryKey: ["vision", "history", "infinite"],
      });
    }, [queryClient])
  );

  const history = useMemo(
    () =>
      (data?.pages.flatMap((page) => page.data) ?? []).map((item) => {
        console.log(item);
        return {
          id: item.id,
          title: item?.title || "Kết quả phân tích",
        };
      }),
    [data]
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 relative">
        <Pressable
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-2xl bg-grey-100 z-10"
        >
          <ArrowLeft size={24} color="#161C24" variant="Linear" />
        </Pressable>
        <View className="absolute inset-x-0 bottom-0 top-0 items-center justify-center -z-0">
          <Text className="text-xl font-bold text-grey-900">
            Lịch sử tra cứu
          </Text>
        </View>
        <View className="w-12" />
      </View>

      {isLoading ? (
        <ActivityIndicator className="flex-1" />
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push(`/(protected)/scan-result/${item.id}`)}
              className="mx-6 mb-4 h-16 px-6 justify-center rounded-2xl bg-grey-50 border border-grey-100"
            >
              <Text className="text-base font-medium text-grey-600">
                {item.title}
              </Text>
            </Pressable>
          )}
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 24 }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator className="py-4" /> : null
          }
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center py-20">
              <Text className="text-grey-400 italic">
                Chưa có lịch sử tra cứu
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
