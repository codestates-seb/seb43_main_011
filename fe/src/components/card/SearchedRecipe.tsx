import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RecipeContainer = styled.div`
  display: flex;
  width: 500px;
  height: 200px;
  border-radius: 7px;
  overflow: hidden;
  border: 1px solid #c3c3c3;
  box-shadow: 0 0 6px 1px #c3c3c3;
`;

const RecipeImg = styled.img`
  width: 36%;
`;

const TextBox = styled.div`
  width: 64%;
  padding: 15px;
  overflow-y: scroll;
`;

const Ingredient = styled.ul`
  list-style: none;
  font-size: 1.1rem;
  line-height: 1.8rem;
  margin: 10px 0 0 10px;
`;

interface SearchedRecipe {
  name: string;
  stuff: string;
  image: string;
  id: number;
}

export default function SearchedRecipe({
  name,
  stuff,
  image,
  id,
}: SearchedRecipe) {
  const ingredientList = stuff?.split("\n");
  const navigate = useNavigate();

  return (
    <RecipeContainer onClick={() => navigate(`/detail/${id}`)}>
      <RecipeImg src={image} />
      <TextBox>
        <h2>{name}</h2>
        <Ingredient>
          {ingredientList?.map((item, i) => {
            return <li key={i}>{item}</li>;
          })}
        </Ingredient>
      </TextBox>
    </RecipeContainer>
  );
}
