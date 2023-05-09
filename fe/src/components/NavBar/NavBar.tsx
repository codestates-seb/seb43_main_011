import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaGlassWhiskey } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isClose } from "../../redux/slices/SideView";

const NavContainer = styled.nav<{ isNavOpen: boolean }>`
  position: fixed;
  background-color: white;

  transition: 0.8s ease;
  z-index: 1;
  top: ${(props) => (props.isNavOpen ? "85px" : "-100%")};
  width: 100%;
  box-shadow: 0px 5px 20px rgba(152, 152, 152, 0.24);
`;

const NavLinkList = styled.div`
  width: 1360px;
  height: 85px;
  margin: 0 auto;
  display: flex;
  align-items: end;
  list-style: none;
`;

const NavbarHeader = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseNavBar = styled(MdClose)`
  font-size: 2.5rem;
  color: #657cff;
  height: max-content;
  border-radius: 6px;
  &:hover {
    color: white;
    background-color: #96a5ff;
  }
`;

const RightButtons = styled.div`
  display: flex;
  align-items: center;
`;

const UserLink = styled(Link)`
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
  display: flex;
  padding: 0;
  list-style: none;
  line-height: 5rem;
`;

const NavListItems = styled.li`
  flex-grow: 1;
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px 0 10px 50px;
  &:hover {
    background-color: #eef1ff;
    border-bottom: 5px solid #657bf8;
  }
`;

const StyledNavLink = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 30px;
  text-decoration-line: none;
  color: black;
  &.active {
    color: #4d68ff;
  }
`;

export default function NavBar() {
  const isNavOpen = useAppSelector((state) => state.sideView.value);
  return (
    <NavContainer isNavOpen={isNavOpen}>
      <NavLinkList>
        <IconContext.Provider value={{ size: "2rem" }}>
          <NavListItems>
            <FaGlassWhiskey />
            <StyledNavLink to={"/"}>정규 레시피</StyledNavLink>
          </NavListItems>
          <NavListItems>
            <FaGlassWhiskey />
            <StyledNavLink to={"/custom"}>커스텀 레시피</StyledNavLink>
          </NavListItems>
          <NavListItems>
            <FaGlassWhiskey />
            <StyledNavLink to={"/"}>레시피 추천</StyledNavLink>
          </NavListItems>
          <NavListItems>
            <FaGlassWhiskey />
            <StyledNavLink to={"/registration"}>레시피 등록하기</StyledNavLink>
          </NavListItems>
        </IconContext.Provider>
      </NavLinkList>
    </NavContainer>
  );
}
