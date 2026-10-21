import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getArticlesApi } from "../api/get-articles";
import { getArticleByDetailApi } from "../api/get-article-detail";
import { getLikedArticlesApi } from "../api/get-liked-articles";
import { toggleLikeApi } from "../api/toggle-like";
import {
  Article,
  GetArticlesParams,
  GetArticlesResponse,
} from "../types/articles.types";

function toggleArticleInList(article: Article): Article {
  const liked = !article.isLiked;
  return {
    ...article,
    isLiked: liked,
    _count: {
      ...article._count,
      likes: article._count.likes + (liked ? 1 : -1),
    },
  };
}

export function useArticles(params: GetArticlesParams) {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => getArticlesApi(params),
  });
}

export function useArticleDetail(id: string) {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleByDetailApi(id),
    enabled: !!id,
  });
}

export function useLikedArticles(params: GetArticlesParams) {
  return useQuery({
    queryKey: ["articles", "liked", params],
    queryFn: () => getLikedArticlesApi(params),
  });
}

export function useToggleLike(articleId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => toggleLikeApi(articleId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["article", articleId] });
      await queryClient.cancelQueries({ queryKey: ["articles"] });

      const previousDetail = queryClient.getQueryData<Article>([
        "article",
        articleId,
      ]);
      const previousLists = queryClient.getQueriesData<GetArticlesResponse>({
        queryKey: ["articles"],
      });

      queryClient.setQueryData<Article>(["article", articleId], (old) =>
        old ? toggleArticleInList(old) : old
      );

      queryClient.setQueriesData<GetArticlesResponse>(
        { queryKey: ["articles"] },
        (old) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((article) =>
              article.id === articleId
                ? toggleArticleInList(article)
                : article
            ),
          };
        }
      );

      return { previousDetail, previousLists };
    },
    onError: (_err, _vars, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(
          ["article", articleId],
          context.previousDetail
        );
      }
      context?.previousLists?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      // Refresh detail and all list caches globally
      queryClient.invalidateQueries({ queryKey: ["article"] });
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });
}
