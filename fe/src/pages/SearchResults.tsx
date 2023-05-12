import { RecipesContainer } from "./Main";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Recipes, getSearchResults } from "../utils/query";
import Card from "../components/card/Card";
import SearchResultTab from "../components/card/SearchResultsTab";
import styled from "styled-components";
import { useMemo, useState } from "react";

const CardListArea = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  place-items: center;
`;

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("value") ?? "";
  const category = useMemo(() => ["resultreg", "resultcus"], []);
  const [path, setPath] = useState(category[0]);

  return (
    <RecipesContainer>
      <SearchResultTab tabs={category} path={path} setPath={setPath} />
      <CardListArea>
        {/* {data &&
          Object.keys(data).map((key: string, i) => {
            return (
              data[key].length !== 0 &&
              data[key].map((card, i) => (
                <Card
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  key={i}
                />
              ))
            );
          })} */}
      </CardListArea>
    </RecipesContainer>
  );
}
