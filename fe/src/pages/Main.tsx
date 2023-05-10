import styled from "styled-components";
import Card from "../components/card/Card";
import { useLocation, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import CardList from "../components/card/CardList";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import axios from "axios";
import { upDate } from "../redux/slices/RecipeSlice";
import type { recipeCard } from "../redux/slices/RecipeSlice";

const RecipesContainer = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 1360px;
  margin: 85px auto 0;
  position: relative;
  padding: 60px 0 20px;
`;

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

export default function Main() {
  const pathName = useLocation().pathname;
  console.log(pathName);

  const dispatch = useAppDispatch();
  const recipeList = useAppSelector((state) => state.recipeList.recipes);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("value") ?? "";
  useEffect(() => {
    let path: string;
    switch (pathName) {
      case "/custom":
        path = "custom";
        break;
      case "/search":
        path = "searched";
        break;
      default:
        path = "regular";
        break;
    }
    axios.get(`http://localhost:4000/${path}`).then((res) => {
      const data =
        path === "searched"
          ? {
              regular: res.data.regular.filter(
                (e: recipeCard) =>
                  e.ingredient.includes(searchValue) ||
                  e.title.includes(searchValue),
              ),
              custom: res.data.custom.filter(
                (e: recipeCard) =>
                  e.ingredient.includes(searchValue) ||
                  e.title.includes(searchValue),
              ),
            }
          : res.data;
      dispatch(upDate(data));
    });
  }, [pathName, searchValue]);
  return (
    <>
      <RecipesContainer>
        {pathName === "/custom" ? (
          <>
            <CustomGuide>
              <GuideText>커스텀 레시피</GuideText>
              <RegistrationLink to={"/upload"}>
                레시피 등록하기
              </RegistrationLink>
            </CustomGuide>
            <CardsRow>
              {recipeList.list &&
                recipeList.list.map((recipe, i) => {
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
          </>
        ) : pathName === "/search" ? (
          <>
            {Object.keys(recipeList).map((key: string, i) => {
              return <CardList list={recipeList[key]} category={key} key={i} />;
            })}
          </>
        ) : (
          <>
            <GuideText>정규 레시피</GuideText>
            {Object.keys(recipeList).map((key: string, i) => {
              return (
                <CardList
                  list={recipeList[key]}
                  category={key.slice(-1)}
                  key={i}
                />
              );
            })}
          </>
        )}
      </RecipesContainer>
    </>
  );
}
