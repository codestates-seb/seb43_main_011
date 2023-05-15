import styled from "styled-components";
import { RxDividerVertical } from "react-icons/rx";

const Menu = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  border-radius: 5px;
  margin: 40px;
  background-color: #ffffff;
  height: 45px;
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

const VerticalBar = styled(RxDividerVertical)`
  font-size: 25px;
  color: #909090;
`;

export default function MenuBar() {
  return (
    <Menu>
      <MenuItem>내 정보</MenuItem>
      <VerticalBar />
      <MenuItem>찜 목록</MenuItem>
      <VerticalBar />
      <MenuItem>나의 레시피</MenuItem>
    </Menu>
  );
}
