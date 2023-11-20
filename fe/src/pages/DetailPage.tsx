import styled from "styled-components";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import {
  useFetchRecipe,
  useAddWish,
  useDeleteWish,
} from "../hooks/useFetchRecipe";
import { useQueryClient } from "react-query";
import LoadingComponent from "../components/loading/LoadingComponent";
import { useEffect } from "react";

export default function DetailPage() {
  const { category, id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useFetchRecipe(category || "", id || "");
  const separator = new RegExp(`${"\n|\\\\n"}`);
  const rcpType = category === "regular" ? "REGULAR_RECIPE" : "CUSTOM_RECIPE";
  const propsData = { type: rcpType, recipeId: id };
  const isNotLogin = sessionStorage.getItem("UTK") === null;
  const deleteWishMutation = useDeleteWish(propsData);
  const addWishMutation = useAddWish(propsData);
  const widhClickHandle = async () => {
    if (isNotLogin) {
      window.alert("찜하기는 로그인 후 이용하실 수 있습니다.");
    } else {
      if (data?.data.wishList) {
        await deleteWishMutation.mutateAsync();
        queryClient.invalidateQueries("recipe");
      } else {
        await addWishMutation.mutateAsync();
        queryClient.invalidateQueries("recipe");
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <Container>
      <InfoWrapper>
        {isLoading && <LoadingComponent />}
        {data && (
          <>
            <PhotoArea src={data?.data.imageUrl} />
            <DetailArea>
              <TitleArea>
                <TitleTab>{data?.data.name}</TitleTab>
                <Bookmarker onClick={widhClickHandle}>
                  {data?.data.wishList && (
                    <BsBookmarkStarFill size="30" color="#96A5FF" />
                  )}
                  {!data?.data.wishList && (
                    <BsBookmarkStar size="30" color="#96A5FF" />
                  )}
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
          </>
        )}
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
  min-height: 83vh;
  margin-top: 7rem;
  width: 100%;
  @media screen and (max-width: 980px) {
    margin-top: 3rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  margin-bottom: 2rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  max-width: 1360px;
  width: 100%;
  padding: 4rem;
  border: 1px solid gray;
  border-radius: 20px;
  @media screen and (max-width: 980px) {
    flex-direction: column;
    border: none;
    padding: 4rem 1rem 1rem;
  }
`;

const PhotoArea = styled.img`
  max-width: 500px;
  width: 100%;
  min-height: 600px;
  height: 100%;
  border-radius: 3%;
  @media screen and (max-width: 980px) {
    margin: 0 auto 50px;
  }
`;

const DetailArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 7rem;
  max-width: 470px;
  width: 100%;
  min-height: 665px;
  padding: 0 20px 20px;
  border-radius: 3%;
  @media screen and (max-width: 980px) {
    margin: 0 auto;
  }
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
