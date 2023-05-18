import { SearchResponse, getSearchResults } from "../utils/query";
import { useQuery, useQueryClient } from "react-query";
import { useState, useEffect } from "react";

export function useSearchedPagination(path: string, searchValue: string) {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { data, isFetching, isLoading, isPreviousData } =
    useQuery<SearchResponse>(
      [`${path}`, searchValue],
      () => getSearchResults(path, searchValue),
      {
        staleTime: 2000,
        keepPreviousData: true,
      },
    );

  const maxPage = data?.pageInfo.totalPage;
  const hasMore = maxPage && maxPage > page;

  useEffect(() => {
    if (!isPreviousData && !!hasMore) {
      queryClient.prefetchQuery([`${path}`, page + 1, searchValue], () =>
        getSearchResults(path, searchValue, page + 1),
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
}
