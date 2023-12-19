import { RegularResponseData } from "../utils/query";
import { useQuery, useQueryClient } from "react-query";
import { useState, useMemo } from "react";
import { queryKeys } from "../utils/queryKeys";
import { useDeleteRecipe } from "./useDeleteRecipe";

export const useMainPagination = (
  path: string,
  getFunction: (
    path: string,
    size: number,
    page: number,
  ) => Promise<RegularResponseData>,
) => {
  const [page, setPage] = useState(1);
  const listSize = useMemo(() => {
    switch (path) {
      case "bookmark":
        return 16;
      case "custom":
        return 20;
      case "30":
        return 10;
      case "40":
        return 10;
      default:
        return 5;
    }
  }, [path]);

  const { data, isLoading, isFetching, isPreviousData } =
    useQuery<RegularResponseData>(
      queryKeys.recipeCategory(path, listSize, page),
      () => getFunction(path, listSize, page),
      {
        useErrorBoundary: true,
        retry: 0,
        staleTime: 2000,
        keepPreviousData: true,
      },
    );

  const maxPage = data?.pageInfo.totalPage;
  const hasMore = maxPage && maxPage > page;

  const onNextClick = () => {
    setPage(!!hasMore ? page + 1 : page);
  };
  const onPrevClick = () => {
    setPage((page) => Math.max(page - 1, 1));
  };

  const deleteMyRecipe = (id: number) => {
    const queryClient = useQueryClient();
    useDeleteRecipe().mutateAsync(id, {
      onSettled: () => {
        queryClient.invalidateQueries(
          queryKeys.recipeCategory(path, listSize, page),
        );
      },
    });
  };

  return {
    data: data?.data,
    pageInfo: data?.pageInfo,
    isLoading,
    isFetching,
    isPreviousData,
    hasMore: !!hasMore,
    showCardLength: data?.pageInfo?.size,
    onNextClick,
    onPrevClick,
    deleteMyRecipe: path !== "myRecipe" ? undefined : deleteMyRecipe,
  };
};
