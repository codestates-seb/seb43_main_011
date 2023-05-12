import { RecipesContainer } from "./Main";
import CardList from "../components/card/CardList";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Recipes, getSearchResults } from "../utils/query";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("value") ?? "";
  // const { data } = useQuery<Recipes>(["cards"], () =>
  //   getSearchResults(searchValue),
  // );
  return (
    <RecipesContainer>
      {/* {data &&
        Object.keys(data).map((key: string, i) => {
          return (
            data[key].length !== 0 && (
              <CardList
                list={data[key]}
                category={key}
                key={i}
                isSearch={true}
              />
            )
          );
        })} */}
    </RecipesContainer>
  );
}
