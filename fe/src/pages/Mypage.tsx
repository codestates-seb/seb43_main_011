import styled from "styled-components";
import MenuBar from "../components/myPage/MenuBar";
import MyInfo from "../components/myPage/EditMyInfo";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

export default function Mypage() {
  return (
    <Container>
      <MenuBar />
      <MyInfo />
    </Container>
  );
}
