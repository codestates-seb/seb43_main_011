import { SearchResponse, getSearchResults } from "../utils/query";
import { useQuery, useQueryClient } from "react-query";
import { useState, useEffect } from "react";

export function useSearchedPagination(
  path: string,
  searchValue: string,
  initPage: number,
) {
  const [page, setPage] = useState(initPage);
  const [searchState, setSearchState] = useState(searchValue);
  const queryClient = useQueryClient();
  if (searchState !== searchValue) {
    setPage(1);
    setSearchState(searchValue);
  }
  const { data, isFetching, isLoading, isPreviousData } =
    useQuery<SearchResponse>(
      [path],
      () => getSearchResults(path, searchState),
      {
        retry: 0,
        staleTime: 2000,
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
    getSearchResults(path, searchState, page).then((responseData) => {
      queryClient.setQueryData([path], responseData);
    });
  }, [searchState, page, queryClient]);

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
