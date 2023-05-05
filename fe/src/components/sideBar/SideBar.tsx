import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaGlassWhiskey } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isClose } from "../../redux/slices/SideView";

const Top = styled.div<{ isExpand: boolean }>`
  position: fixed;
  background-color: white;
  transition: 0.5s ease-out;
  z-index: 2;
  right: ${(props) => (props.isExpand ? 0 : "-25%")};
  width: 25%;
  box-shadow: -3px 0 10px 1px #bebebee8;
  height: 100%;
`;

const Header = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OutButton = styled.div`
  border: none;
  background-color: inherit;
  border-radius: 10px;
`;

const RightButtons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const UserButton = styled(Link)`
  text-decoration-line: none;
  color: #5a5a5a;
  background-color: #ffff;
  width: max-content;
  font-weight: bold;
  padding: 0.6rem;
  border-radius: 5px;
  font-size: 1.2rem;

  &:hover {
    cursor: pointer;
    background-color: #96a5ff;
    color: #ffff;
  }
`;

const LogOutButton = styled.div`
  font-size: 1.2rem;
  border: none;
  color: #5a5a5a;
  background-color: #ffff;
  width: max-content;
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    background-color: #96a5ff;
    color: #ffff;
  }
`;

const Main = styled.ul`
  width: 100%;
  list-style: none;
  padding: 0;
  line-height: 5rem;
`;

const Items = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0 10px 50px;
  &:hover {
    background-color: #eef1ff;
    border-left: 8px solid #657bf8;
  }
`;

const BookMark = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 30px;
  text-decoration-line: none;
  color: black;
  &.active {
    color: #4d68ff;
  }
`;

export default function SideBar() {
  const isExpand = useAppSelector((state) => state.SideView.value);
  const dispatch = useAppDispatch();
  return (
    <Top isExpand={isExpand}>
      <Header>
        <OutButton>
          <IconContext.Provider
            value={{
              size: "4rem",
              color: "#657cff",
            }}
          >
            <IoIosClose onClick={() => dispatch(isClose())} />
          </IconContext.Provider>
        </OutButton>
        <RightButtons>
          <UserButton to={"/user"}>마이페이지</UserButton>
          <LogOutButton>로그아웃</LogOutButton>
        </RightButtons>
      </Header>
      <Main>
        <IconContext.Provider value={{ size: "2rem" }}>
          <Items>
            <FaGlassWhiskey />
            <BookMark to={"/"}>도수별 레시피</BookMark>
          </Items>
          <Items>
            <FaGlassWhiskey />
            <BookMark to={"/custom"}>커스텀 레시피</BookMark>
          </Items>
          <Items>
            <FaGlassWhiskey />
            <BookMark to={"/don'tknow"}>레시피 추천</BookMark>
          </Items>
          <Items>
            <FaGlassWhiskey />
            <BookMark to={"/upload"}>레시피 등록하기</BookMark>
          </Items>
        </IconContext.Provider>
      </Main>
    </Top>
  );
}
