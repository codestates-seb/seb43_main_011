import styled from "styled-components";
import { BsBookmarkStar } from "react-icons/bs";
//BsBookmarkStarFill (색상 채운 버젼)

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
  position: relative;
`;

const PhotoArea = styled.div`
  display: flex;
  width: 433px;
  height: 580px;
  background-color: #96a5ff;
  border-radius: 10px;
`;

const DetailArea = styled.div`
  width: 535px;
  height: 665px;
  margin-left: 50px;
  padding: 50px;
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
  width: 375px;
  height: 145px;
  margin: 0 0 30px 12px;
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
`;

const RecipeItems = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 12px;
  font-size: 17px;
`;

const WriterButtons = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 338px;
  margin-left: 30%;
  bottom: 5%;
`;

const Button = styled.button`
  width: 111px;
  height: 40px;
  background-color: #96a5ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #ffff;
  font-weight: 800;
  font-size: 24px;
  border: none;
  cursor: pointer;
`;

export default function DetailPage() {
  return (
    <Container>
      <PhotoArea>사진</PhotoArea>
      <DetailArea>
        <TitleArea>
          <Title>롱 아일랜드 아이스티</Title>
          <Bookmarker>
            <BsBookmarkStar size="30" color="#96A5FF" />
          </Bookmarker>
        </TitleArea>
        <TitleExplanation>
          술기운이 오래가는 콜라, 레몬이 섞인 묘한 맛
        </TitleExplanation>
        <Title>재료</Title>
        <Ingredient>
          <IngredientItems>보드카 15ml</IngredientItems>
          <IngredientItems>데킬라 15ml</IngredientItems>
          <IngredientItems>레몬 주스 30ml</IngredientItems>
          <IngredientItems>콜라 Full up</IngredientItems>
        </Ingredient>
        <Title>RECIPE</Title>
        <Recipe>
          <RecipeItems>450ml 잔에 얼음을 가득 채워주세요.</RecipeItems>
          <RecipeItems>
            얼음이 들어있는 잔에 데킬라, 보드카를 15ml씩 넣어주세요.
          </RecipeItems>
          <RecipeItems>술이 부어진 잔에 레몬 주스 30ml 넣어주세요.</RecipeItems>
          <RecipeItems>마지막으로 잔에 콜라를 가득 부어주세요.</RecipeItems>
          <RecipeItems>살짝 섞어주면 완성입니다!</RecipeItems>
        </Recipe>
      </DetailArea>
      <WriterButtons>
        <Button>Delete</Button>
        <Button>Edit</Button>
      </WriterButtons>
    </Container>
  );
}