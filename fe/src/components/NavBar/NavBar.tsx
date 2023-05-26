import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaGlassWhiskey } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { navClose } from "./../../redux/slices/NavSlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NavContainer = styled.nav<{ isNavOpen: boolean }>`
  position: fixed;
  background-color: white;
  transition: 0.3s ease;
  z-index: 2;
  top: ${(props) => (props.isNavOpen ? "85px" : "-85px")};
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
  const isNavOpen = useAppSelector((state) => state.NavOpen.value);
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(navClose());
  }, [location.pathname]);

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
            <StyledNavLink to={"/recommendation"}>레시피 추천</StyledNavLink>
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
