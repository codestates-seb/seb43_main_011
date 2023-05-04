import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaGlassWhiskey } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 35%;
  min-height: 100vh;
  height: 100%;
  box-shadow: -3px 0 10px 1px #bebebee8;
`;

const Header = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OutButton = styled.div`
  border: none;
  background-color: inherit;
  border-radius: 10px;
  margin-left: 20px;
`;

const RightButtons = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`;

const UserButton = styled(Link)`
  text-decoration-line: none;
  border: none;
  color: #5a5a5a;
  background-color: #ffff;
  width: max-content;
  font-weight: bold;
  padding: 0.6rem;
  border-radius: 5px;
  font-weight: bold;
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
  return (
    <Container>
      <Header>
        <OutButton>
          <IconContext.Provider
            value={{
              size: "4rem",
              color: "#657cff",
            }}
          >
            <IoIosClose />
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
            <BookMark to={"/dontknow"}>레시피 추천</BookMark>
          </Items>
          <Items>
            <FaGlassWhiskey />
            <BookMark to={"/upload"}>레시피 등록하기</BookMark>
          </Items>
        </IconContext.Provider>
      </Main>
    </Container>
  );
}
