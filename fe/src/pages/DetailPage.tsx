import styled from "styled-components";
import { BsBookmarkStar } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeData } from "../utils/query";
import { useFetchRecipe } from "../hooks/useFetchRecipe";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
  position: relative;
  margin-top: 20px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PhotoArea = styled.img`
  width: 30rem;
  min-height: 615px;
  height: 100%;
  border-radius: 10px;
`;

const DetailArea = styled.div`
  width: 535px;
  min-height: 665px;
  margin-left: 50px;
  padding: 0 50px;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 22px;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: 800;
  margin-bottom: 20px;
`;

const Bookmarker = styled.div`
  padding-bottom: 15px;
  margin-left: 15px;
  cursor: pointer;
`;

const TitleExplanation = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 30px 20px;
  font-size: 17px;
`;

const Ingredient = styled.ul`
  width: 550px;
  height: 145px;
  margin: 0 0 30px 12px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const IngredientItems = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 12px;
  font-size: 17px;
`;

const Recipe = styled.ol`
  width: 550px;
  height: 207px;
  margin: 0 0 0 12px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #ffffff;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const RecipeItems = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 12px;
  font-size: 17px;
`;
interface DetailRecipe {
  name: string;
  imageUrl: string;
  description: string;
  stuff: string;
  recipeStep: string;
}
const fetchRecipe = async (params: string | undefined) => {
  const response: AxiosResponse<DetailRecipe> = await axios.get(
    `http://localhost:4000/custom/${params}`,
  );
  return response.data;
};

export default function DetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  // id가 undefined인 경우 빈 문자열로 설정
  const { data, isLoading, error } = useFetchRecipe(id || "");
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    // errorBoundary로 수정 예정
    console.error(error);
    navigate("/Error");
  }

  return (
    <Container>
      <InfoWrapper>
        <PhotoArea src={data?.imageUrl} alt="Recipe" />
        <DetailArea>
          <TitleArea>
            <Title>{data?.name}</Title>
            <Bookmarker>
              <BsBookmarkStar size="30" color="#96A5FF" />
            </Bookmarker>
          </TitleArea>
          <TitleExplanation>{data?.description}</TitleExplanation>
          <Title>재료</Title>
          <Ingredient>
            {data?.stuff?.split("\n").map((el, i) => (
              <IngredientItems key={i}>{el}</IngredientItems>
            ))}
          </Ingredient>
          <Title>RECIPE</Title>
          <Recipe>
            {data?.recipeStep?.split("\n").map((el, i) => (
              <RecipeItems key={i}>{el}</RecipeItems>
            ))}
          </Recipe>
        </DetailArea>
      </InfoWrapper>
    </Container>
  );
}
