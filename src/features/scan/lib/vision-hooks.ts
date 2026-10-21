import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getVisionHistoryApi, getVisionDetailApi } from "../api/vision-history";

const VISION_HISTORY_PER_PAGE = 20;

export function useVisionHistory(params?: { page?: number; perPage?: number }) {
  return useQuery({
    queryKey: ["vision", "history", params],
    queryFn: () => getVisionHistoryApi(params),
  });
}

export function useInfiniteVisionHistory(
  perPage = VISION_HISTORY_PER_PAGE
) {
  return useInfiniteQuery({
    queryKey: ["vision", "history", "infinite", { perPage }],
    queryFn: ({ pageParam }) =>
      getVisionHistoryApi({ page: pageParam, perPage }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce(
        (count, page) => count + page.data.length,
        0
      );

      if (loadedCount < lastPage.total) {
        return allPages.length + 1;
      }

      return undefined;
    },
  });
}

export function useVisionDetail(id: string) {
  return useQuery({
    queryKey: ["vision", id],
    queryFn: () => getVisionDetailApi(id),
    enabled: !!id,
  });
}
