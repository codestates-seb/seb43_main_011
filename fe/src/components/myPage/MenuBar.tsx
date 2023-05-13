import styled from "styled-components";

export default function MenuBar() {
  return (
    <Container>
      <MenuItem>내 정보</MenuItem>
      <MenuItem>찜 목록</MenuItem>
      <MenuItem>나의 레시피</MenuItem>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 5px;

  height: 35px;
  width: 356px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const MenuItem = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #333333;
`;
