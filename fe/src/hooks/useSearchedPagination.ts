import { SearchResponse, getSearchResults } from "../utils/query";
import { useQuery } from "react-query";
import { useState } from "react";
import { queryKeys } from "../utils/queryKeys";

export function useSearchedPagination(path: string, searchValue: string) {
  const [page, setPage] = useState(1);
  const [searchState, setSearchState] = useState(searchValue);
  if (searchState !== searchValue) {
    setPage(1);
    setSearchState(searchValue);
  }
  const { data, isFetching, isLoading, isPreviousData } =
    useQuery<SearchResponse>(
      queryKeys.searched(path, searchState, page),
      () => getSearchResults(path, searchState, page),
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
