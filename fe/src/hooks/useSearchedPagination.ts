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

  const onNextClick = () => {
    setPage((page) => (!!hasMore ? page + 1 : page));
  };
  const onPrevClick = () => {
    setPage((page) => Math.max(page - 1, 1));
  };

  useEffect(() => {
    getSearchResults(path, searchValue, page).then((responseData) => {
      queryClient.setQueryData([`${path}`, searchValue], responseData);
    });
  }, [path, searchValue, page, queryClient]);

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
