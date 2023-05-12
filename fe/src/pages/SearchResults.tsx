import { RecipesContainer } from "./Main";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Recipes, getSearchResults } from "../utils/query";
import Card from "../components/card/Card";
import SearchResultTab from "../components/card/SearchResultsTab";
import styled from "styled-components";
import { useMemo, useState } from "react";
import SearchedRecipe from "../components/card/SearchedRecipe";
import exImage from "./../images/error.jpg";

const CardListArea = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 30px;
  place-items: center;
`;

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("value") ?? ""; // ?value=얼음

  const category = useMemo(() => ["resultreg", "resultcus"], []);
  const [path, setPath] = useState(category[0]);
  const { data } = useQuery([path], () => getSearchResults(path, searchValue));
  console.log(data);
  return (
    <RecipesContainer>
      <SearchResultTab tabs={category} path={path} setPath={setPath} />
      <CardListArea>
        {data?.map((card, i) => {
          return (
            <SearchedRecipe
              key={i}
              name={card.title}
              image={card.image}
              ingredient={card.ingredient}
            />
          );
        })}
        <SearchedRecipe
          name={"어쩌구 칵테일"}
          image={exImage}
          ingredient={"재료1\n재료2\n재료3"}
        />
      </CardListArea>
    </RecipesContainer>
  );
}
