import styled from "styled-components";
import { BsBookmarkStar } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchRecipe } from "../hooks/useFetchRecipe";

export default function DetailPage() {
  const navigate = useNavigate();
  const { category, id } = useParams();

  const { data, isLoading, error } = useFetchRecipe(category || "", id || "");
  console.log("디테일의 데이터 ", data?.data.ingredient);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    navigate("/Error");
  }

  const separator = new RegExp(`${"\n|\\\\n"}`);

  return (
    <Container>
      <InfoWrapper>
        <PhotoArea src={data?.data.imageUrl} />
        <DetailArea>
          <TitleArea>
            <TitleTab>{data?.data.name}</TitleTab>
            <Bookmarker>
              <BsBookmarkStar size="30" color="#96A5FF" />
            </Bookmarker>
          </TitleArea>
          <TitleExplanation>{data?.data.description}</TitleExplanation>
          <IngredientTab>재료</IngredientTab>
          <Ingredient>
            {data?.data.ingredient.split(separator).map((el, i) => (
              <IngredientItems key={i}>{el}</IngredientItems>
            ))}
          </Ingredient>
          <RecipeTab>RECIPE</RecipeTab>
          <Recipe>
            {data?.data.recipe.split(separator).map((el, i) => (
              <RecipeItems key={i}>{el}</RecipeItems>
            ))}
          </Recipe>
        </DetailArea>
      </InfoWrapper>
    </Container>
  );
}

const IngredientTab = styled.div`
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
`;

const RecipeTab = styled.div`
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin-top: 7rem;
`;

const InfoWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 80%;
  padding: 4rem;
  border: 1px solid gray;
  border-radius: 20px;
`;

const PhotoArea = styled.img`
  max-width: 500px;
  min-height: 600px;
  border-radius: 3%;
`;

const DetailArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 7rem;
  width: 470px;
  min-height: 665px;
  padding: 20px;
  border-radius: 3%;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const TitleTab = styled.div`
  font-size: 25px;
  font-weight: bold;
`;

const Bookmarker = styled.div`
  margin-left: 1rem;
  cursor: pointer;
`;

const TitleExplanation = styled.div`
  font-size: 17px;
  margin-bottom: 40px;
  margin-left: 10px;
  line-height: 2;
`;

const Ingredient = styled.ul`
  width: 100%;
  margin-bottom: 20px;
`;

const IngredientItems = styled.li`
  margin-bottom: 20px;
  margin-left: 10px;
  font-size: 17px;
`;

const Recipe = styled.ol`
  width: 100%;
`;

const RecipeItems = styled.li`
  font-size: 17px;
  margin-bottom: 5px;
  margin-left: 10px;
  line-height: 2;
`;
