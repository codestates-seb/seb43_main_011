import { RegularResponseData } from "../utils/query";
import { useQuery, useQueryClient } from "react-query";
import { useState, useMemo, useEffect } from "react";

export const useMainPagination = (
  path: string,
  getFunction: (
    path: string,
    size: number,
    page?: number,
  ) => Promise<RegularResponseData>,
) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const listSize = useMemo(() => {
    switch (path) {
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
      [`${path}`, listSize],
      () => getFunction(path, listSize),
      {
        useErrorBoundary: true,
        retry: 0,
        staleTime: 2000,
        keepPreviousData: true,
      },
    );

  const maxPage = data?.pageInfo.totalPage;
  const hasMore = maxPage && maxPage > page;
  useEffect(() => {
    if (!isPreviousData && !!hasMore) {
      queryClient.prefetchQuery([`${path}`, page + 1, listSize], () =>
        getFunction(path, listSize, page + 1),
      );
    }
  }, [page, isPreviousData, queryClient, data]);

  const onNextClick = () => {
    setPage((page) => Math.max(page - 1, 1));
  };
  const onPrevClick = () => {
    setPage((page) => (!!hasMore ? page + 1 : page));
  };

  return {
    data,
    isLoading,
    isFetching,
    isPreviousData,
    hasMore,
    showCardLength: data?.pageInfo?.size,
    onNextClick,
    onPrevClick,
  };
};
