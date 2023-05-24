import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RecipeContainer = styled.div`
  display: flex;
  width: 500px;
  height: 200px;
  border-radius: 7px;
  overflow: hidden;
  border: 1px solid #c3c3c3;
  box-shadow: 0 0 4px 1px #c3c3c3;
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
  margin: 10px 0 0 2px;
  font-weight: bold;
  color: #626262;
`;

interface SearchedRecipe {
  recipe: {
    name: string;
    ingredient: string;
    imageUrl: string;
    id: number;
  };
  category: string;
}

export default function SearchedRecipe({ recipe, category }: SearchedRecipe) {
  const navigate = useNavigate();
  const separator = new RegExp(`${"\n|\\\\n"}`);
  return (
    <RecipeContainer
      onClick={() => navigate(`/detail/${category}/${recipe.id}`)}
    >
      <RecipeImg src={recipe.imageUrl} />
      <TextBox>
        <h2>{recipe.name}</h2>
        <Ingredient>
          {recipe.ingredient?.split(separator).map((item, i) => {
            return <li key={i}>{item}</li>;
          })}
        </Ingredient>
      </TextBox>
    </RecipeContainer>
  );
}
