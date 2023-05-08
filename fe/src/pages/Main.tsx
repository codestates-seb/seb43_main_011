import styled from "styled-components";
import Card from "../components/card/Card";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import CardList from "../components/card/CardList";

const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 1360px;
  margin: 85px auto 0;
  position: relative;
  padding: 20px 0;
`;

const CustomGuide = styled.div`
  display: flex;
`;

const AddRecipeButton = styled(Link)`
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

// 합치기 전 임시 설정
// export type Data = { [key: string]: number[] } | number[];
export default function Main() {
  const pathName = useLocation().pathname;

  // 임시 레세피 리스트 데이터
  // 분활한 레시피 데이터 변수 pathName에 따라 값을 변화시킬 하나의 변수로 병합될 예정
  const customRecipesData = Array(20) // 커스텀 페이지에서 사용할 데이터
    .fill(0)
    .map((_, i) => i + 1);

  const mainRecipesData: { [key: string]: number[] } = {
    // 메인 || 정규 레시피에서 사용할 데이터
    lv0: Array(7)
      .fill(0)
      .map((_, i): number => i + 1),
    lv1: Array(12)
      .fill(0)
      .map((_, i): number => i + 1),
    lv2: Array(10)
      .fill(0)
      .map((_, i): number => i + 1),
    lv3: Array(25)
      .fill(0)
      .map((_, i): number => i + 1),
  };

  const searchResultsRecipe: { [key: string]: number[] } = {
    // 검색 결과 페이지에서 사용할 데이터
    regular: Array(34)
      .fill(0)
      .map((_, i): number => i + 1),
    custom: Array(17)
      .fill(0)
      .map((_, i): number => i + 1),
  };

  return (
    <>
      <Container>
        {pathName === "/custom" ? (
          <>
            <CustomGuide>
              <GuideText>커스텀 레시피</GuideText>
              <AddRecipeButton to={"/upload"}>레시피 등록하기</AddRecipeButton>
            </CustomGuide>
            <CardsRow>
              {customRecipesData.map((i) => {
                return <Card key={i} />;
              })}
            </CardsRow>
          </>
        ) : pathName === "/searched" ? (
          <>
            {Object.keys(searchResultsRecipe).map((key: string, i) => (
              <CardList
                list={searchResultsRecipe[key]}
                category={key}
                key={i}
              />
            ))}
          </>
        ) : (
          <>
            {Object.keys(mainRecipesData).map((key: string, i) => (
              <CardList
                list={mainRecipesData[key]}
                category={key.slice(-1)}
                key={i}
              />
            ))}
          </>
        )}
      </Container>
    </>
  );
}
