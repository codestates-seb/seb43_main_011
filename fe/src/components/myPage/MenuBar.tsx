import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 30px;
  background-color: #ffffff;
  height: 43px;
  width: 500px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const MenuItem = styled.button`
  font-size: 16px;
  font-weight: bold;
  color: black;
  border: none;
  background-color: #ffffff;
  &:hover {
    cursor: pointer;
    text-decoration: underline solid;
    text-underline-offset: 5px; /* 밑줄과 글자 사이의 간격 조절 */
  }
`;

export default function MenuBar() {
  return (
    <Menu>
      <MenuItem>내 정보</MenuItem>
      <MenuItem>찜 목록</MenuItem>
      <MenuItem>나의 레시피</MenuItem>
    </Menu>
  );
}
