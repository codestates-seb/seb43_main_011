import styled from "styled-components";
import Card from "../components/card/Card";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CardList from "../components/main/CardList";

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
export type Data = { [key: string]: number[] };
export default function Main() {
  const pathName = useLocation().pathname;
  const customData: number[] = Array(20)
    .fill(0)
    .map((_, i) => i + 1);
  const mainData: Data = {
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
              {customData.map((i) => {
                return <Card key={i} />;
              })}
            </CardsRow>
          </>
        ) : (
          <>
            <GuideText>정규 레시피</GuideText>
            {Object.keys(mainData).map((key: string, i) => (
              <CardList list={mainData[key]} level={key.slice(-1)} key={i} />
            ))}
          </>
        )}
      </Container>
    </>
  );
}
