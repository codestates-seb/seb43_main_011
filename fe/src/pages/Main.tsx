import styled from "styled-components";
import CardList from "../components/card/CardList";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import axios from "axios";
import { update } from "../redux/slices/RecipeSlice";

export const RecipesContainer = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 1360px;
  margin: 85px auto 0;
  position: relative;
  padding: 60px 0 20px;
`;

const GuideText = styled.div`
  width: max-content;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 1.2rem;
`;

export default function Main() {
  const dispatch = useAppDispatch();
  const recipeList = useAppSelector((state) => state.recipeList.recipes);

  useEffect(() => {
    axios.get(`http://localhost:4000/regular`).then((res) => {
      dispatch(update(res.data));
    });
  }, []);
  return (
    <>
      <RecipesContainer>
        <GuideText>정규 레시피</GuideText>
        {Object.keys(recipeList).map((key: string, i) => {
          return (
            <CardList list={recipeList[key]} category={key.slice(-1)} key={i} />
          );
        })}
      </RecipesContainer>
    </>
  );
}
