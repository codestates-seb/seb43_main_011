import { RecipesContainer } from "./Main";
import CardList from "../components/card/CardList";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RecipeCard, update } from "../redux/slices/RecipeSlice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchResults() {
  const dispatch = useAppDispatch();
  const recipeCards = useAppSelector((state) => state.recipeList.recipes);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("value") ?? "";
  useEffect(() => {
    axios.get(`http://localhost:4000/searched`).then((res) => {
      const data = {
        regular: res.data.regular.filter(
          (e: RecipeCard) =>
            e.ingredient.includes(searchValue) || e.title.includes(searchValue),
        ),
        custom: res.data.custom.filter(
          (e: RecipeCard) =>
            e.ingredient.includes(searchValue) || e.title.includes(searchValue),
        ),
      };
      dispatch(update(data));
    });
  }, [searchValue]);
  return (
    <RecipesContainer>
      {Object.keys(recipeCards).map((key: string, i) => {
        return (
          recipeCards[key].length !== 0 && (
            <CardList
              list={recipeCards[key]}
              category={key}
              key={i}
              isSearch={true}
            />
          )
        );
      })}
    </RecipesContainer>
  );
}
