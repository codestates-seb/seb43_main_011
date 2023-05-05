import styled from "styled-components";
import Card from "../components/card/Card";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

// const Container = styled.div`
//   width: 100%;
//   min-height: 100vh;
// `;

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
  /* border-bottom: 2px solid black; */
  width: max-content;
  padding: 5px 10px;
  font-weight: bold;
  font-size: 1.2rem;
`;

const AlcoholLevelBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 1.1rem;
  margin: 10px 20px;
  > .level {
    flex-basis: 6%;
    border-top: 2px solid #6f8892e8;
    border-radius: 0 4px 0 0;
    padding: 3px 0 0 8px;
    margin: 8px 0 5px;
  }
  > .center {
    transform: rotate(0.39turn);
    translate: -5px 9px;
    height: 33.3px;
    border-left: 2px solid #6f8892e8;
    border-radius: 0 0 0 1px;
    flex-basis: 1%;
  }
  > .line {
    border-bottom: 2px solid #6f8892e8;
    border-radius: 0 0 0 0;
    flex-basis: 92.6%;
  }
`;

const CardsRow = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 25px;
  place-items: center;
`;

export default function Main() {
  const data = {
    lv0: [1, 2, 3, 4, 5],
    lv1: [1, 2, 3, 4, 5],
    lv2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    lv3: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  };
  const pathName = useLocation().pathname;

  return (
    <>
      <Container>
        {pathName === "/custom" ? (
          <>
            <CustomGuide>
              <GuideText>커스텀 레시피</GuideText>
              <AddRecipeButton to={"/upload"}>레시피 등록하기</AddRecipeButton>
            </CustomGuide>
          </>
        ) : (
          <>
            <GuideText>정규 레시피</GuideText>
            <AlcoholLevelBox>
              <div className="level">Level 0</div>
              <div className="center"></div>
              <div className="line"></div>
            </AlcoholLevelBox>
            <CardsRow>
              {data.lv0.map((i) => {
                return <Card key={i} />;
              })}
            </CardsRow>
            <AlcoholLevelBox>
              <div className="level">Level 1</div>
              <div className="center"></div>
              <div className="line"></div>
            </AlcoholLevelBox>
            <CardsRow>
              {data.lv1.map((i) => {
                return <Card key={i} />;
              })}
            </CardsRow>
            <AlcoholLevelBox>
              <div className="level">Level 2</div>
              <div className="center"></div>
              <div className="line"></div>
            </AlcoholLevelBox>
            <CardsRow>
              {data.lv2.map((i) => {
                return <Card key={i} />;
              })}
            </CardsRow>
            <AlcoholLevelBox>
              <div className="level">Level 3</div>
              <div className="center"></div>
              <div className="line"></div>
            </AlcoholLevelBox>
            <CardsRow>
              {data.lv3.map((i) => {
                return <Card key={i} />;
              })}
            </CardsRow>
          </>
        )}
      </Container>
    </>
  );
}
