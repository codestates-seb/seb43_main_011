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
import { useSearchedPagination } from "../hooks/useSearchedPagination";
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
  width: 35%;
  height: 50%;
  margin: auto;
`;

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("value") ?? "";
  const category = useMemo(() => ["regular", "custom"], []);
  const [path, setPath] = useState(category[0]);
  const { data, isLoading, isPreviousData, hasMore, onNextClick, onPrevClick } =
    useSearchedPagination(path, searchValue);

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
          return <SearchedRecipe key={i} recipe={card} category={path} />;
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
