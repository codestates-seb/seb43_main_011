import styled from "styled-components";
import { BsBookmarkStar } from "react-icons/bs";
//BsBookmarkStarFill (색상 채운 버젼)

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
`;

const PhotoArea = styled.div`
  position: absolute;
  width: 433px;
  height: 580px;
  left: 135px;
  top: 150px;
  background-color: #96a5ff;
  border-radius: 10px;
`;

const DetailArea = styled.div`
  position: absolute;
  width: 535px;
  height: 665px;
  left: 705px;
  top: 165px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  font-size: 25px;
  font-weight: 800;
`;

const TitleExplanation = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 30px 12px;
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
  margin-bottom: 25px;
  margin-left: 15px;
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
  margin-bottom: 25px;
  margin-left: 15px;
  font-size: 17px;
`;

const Bookmarker = styled.div`
  position: absolute;
  width: 44px;
  height: 56px;
  left: 1276px;
  top: 163px;
`;

const WriterButtons = styled.div`
  position: absolute;
  justify-content: space-between;
  width: 338px;
  height: 40px;
  left: 993px;
  top: 780px;
`;

const DeleteButton = styled.button`
  width: 111px;
  height: 40px;
  background-color: #96a5ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #ffff;
  font-weight: 800;
  font-size: 24px;
`;

const EditButton = styled.button`
  width: 111px;
  height: 40px;
  margin-left: 100px;
  background-color: #96a5ff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  color: #ffff;
  font-weight: 800;
  font-size: 24px;
`;

export default function DetailPage() {
  return (
    <Container>
      <PhotoArea>사진</PhotoArea>
      <Bookmarker>
        <BsBookmarkStar size="50" color="#96A5FF" />
      </Bookmarker>
      <DetailArea>
        <Title>롱 아일랜드 아이스티</Title>
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
        <DeleteButton>Delete</DeleteButton>
        <EditButton>Edit</EditButton>
      </WriterButtons>
    </Container>
  );
}
