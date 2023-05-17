import { RecipesContainer } from "./Main";
import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { getSearchResults, SearchResponse } from "../utils/query";
import SearchResultTab from "../components/card/SearchResultsTab";
import styled from "styled-components";
import { useMemo, useState, useEffect } from "react";
import SearchedRecipe from "../components/card/SearchedRecipe";
import RecipePagination from "../components/card/RecipePagination";
import loadingImg from "./../images/loading.gif";
const CardListArea = styled.div`
  margin: 30px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 30px;
  place-items: center;
`;
const LoadingContainer = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoadingImage = styled.img`
  width: 30%;
  height: 50%;
  margin: auto;
`;

export default function SearchResults() {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("value") ?? "";

  const category = useMemo(() => ["regular", "custom"], []);
  const [path, setPath] = useState(category[0]);
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isPreviousData } = useQuery<SearchResponse>(
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

  if (error) {
    return <h2>error boundary 쓰고 싶은데.. query reset도 해보고 싶은디..</h2>;
  }

  return (
    <RecipesContainer>
      <SearchResultTab tabs={category} path={path} setPath={setPath} />
      {isLoading && (
        <LoadingContainer>
          <LoadingImage src={loadingImg} />
        </LoadingContainer>
      )}
      <CardListArea>
        {data?.data.map((card, i) => {
          return (
            <SearchedRecipe
              key={i}
              name={card.name}
              image={card.imageUrl}
              ingredient={card.ingredient.split("\n")}
              id={i}
            />
          );
        })}
      </CardListArea>
      {data?.pageInfo && data.pageInfo.totalPage > 1 && (
        <RecipePagination
          pageInfo={data?.pageInfo}
          hasMore={!!hasMore}
          isPreviousData={isPreviousData}
          onNextClick={onNextClick}
          onPrevClick={onPrevClick}
        />
      )}
    </RecipesContainer>
  );
}
