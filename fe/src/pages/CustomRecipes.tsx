import styled from "styled-components";
import { RecipesContainer } from "./Main";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { update } from "../redux/slices/RecipeSlice";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Card from "../components/card/Card";
import axios from "axios";
const CustomGuide = styled.div`
  display: flex;
`;

const RegistrationLink = styled(Link)`
  text-decoration-line: none;
  color: white;
  background-color: #96a5ff;
  font-weight: bold;
  font-size: 1.2rem;
  padding: 5px 3px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: #5469de;
  }
`;

const GuideText = styled.div`
  width: max-content;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 1.2rem;
`;

const CardsRow = styled.div`
  margin: 20px 0;
  padding-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  place-items: center;
`;

export default function CustomRecipes() {
  const recipeCards = useAppSelector((state) => state.recipeList.recipes);
  const dispatch = useAppDispatch();
  useEffect(() => {
    axios.get(`http://localhost:4000/custom`).then((res) => {
      dispatch(update(res.data));
    });
  }, []);
  return (
    <RecipesContainer>
      <CustomGuide>
        <GuideText>커스텀 레시피</GuideText>
        <RegistrationLink to={"/upload"}>레시피 등록하기</RegistrationLink>
      </CustomGuide>
      <CardsRow>
        {recipeCards.list &&
          recipeCards.list.map((recipe, i) => {
            return (
              <Card
                key={i}
                title={recipe.title}
                image={recipe.image}
                description={recipe.description}
              />
            );
          })}
      </CardsRow>
    </RecipesContainer>
  );
}
