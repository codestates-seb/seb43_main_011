import styled from "styled-components";
import MenuBar from "../components/myPage/MenuBar";
// import EditMyInfo from "../components/myPage/EditMyInfo";
import MyInfo from "../components/myPage/MyInfo";
import MyRecipes from "../components/myPage/MyRecipes";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 70px;
  min-height: 100vh;
  width: 100%;
`;

export default function Mypage() {
  const [page, setPage] = useState("myInfo");
  return (
    <Container>
      <MenuBar page={page} setPage={setPage} />
      {page === "myInfo" && <MyInfo />}
      {page === "bookMark" && <MyInfo />}
      {page === "myRecipe" && <MyRecipes />}
    </Container>
  );
}
