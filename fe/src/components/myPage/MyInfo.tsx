import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1052px;
  height: 420px;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 30px;
`;

const MyPhoto = styled.div`
  flex: 0.5;
  margin: 30px;
  width: 230px;
  height: 230px;
  background-color: #7b8ade;
`;

const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
`;

export default function MyInfo() {
  return (
    <Container>
      <MyPhoto />
      <InfoWrapper />
    </Container>
  );
}
