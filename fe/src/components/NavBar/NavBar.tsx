import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { IoIosWine, IoMdHeart, IoMdCreate } from "react-icons/io";
import { IconContext } from "react-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { navClose } from "./../../redux/slices/NavSlice";
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MobileViewContext } from "../../pages/Layout";
import { Menu, MenuItem } from "../header/Header";

const NavContainer = styled.nav<{ isNavOpen: boolean }>`
  position: fixed;
  background-color: white;
  transition: 0.3s ease;
  z-index: 2;
  top: ${(props) => (props.isNavOpen ? "85px" : "-85px")};
  width: 100%;
  box-shadow: 0px 5px 20px rgba(152, 152, 152, 0.24);
  @media screen and (max-width: 640px) {
    top: 0;
    bottom: 0;
    width: 40%;
    right: ${(props) => (props.isNavOpen ? "0" : "-300px")};
  }
`;

const NavLinkList = styled.div`
  max-width: 1360px;
  width: 100%;
  height: 85px;
  margin: 0 auto;
  display: flex;
  align-items: end;
  list-style: none;
  @media screen and (max-width: 640px) {
    flex-direction: column;
    padding-top: 85px;
    width: 100%;
    height: 100%;
    margin: 0;
  }
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
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 10px 0 10px;
  text-decoration-line: none;
  color: black;
  > p {
    margin-left: 15px;
  }
  &:hover {
    background-color: #eef1ff;
    border-bottom: 5px solid #657bf8;
  }
  &.active {
    color: #4d68ff;
  }
  @media screen and (max-width: 640px) {
    flex: none;
    font-size: 1rem;
    justify-content: start;
    padding: 10px 0 10px 20px;
    width: 100%;
    height: 15%;
  }
`;

export default function NavBar() {
  const isNavOpen = useAppSelector((state) => state.NavOpen.value);
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(navClose());
  }, [location.pathname]);
  const isMobile = useContext(MobileViewContext);
  const isLogin = sessionStorage.getItem("UTK") !== null;
  const endPoind = isLogin ? "/myPage" : "/signin";
  return (
    <NavContainer isNavOpen={isNavOpen}>
      <NavLinkList>
        {isMobile && (
          <Menu>
            {!isLogin && (
              <>
                <MenuItem to={endPoind}>로그인</MenuItem>
                <MenuItem to={"/signup"}>회원가입</MenuItem>
              </>
            )}
            {isLogin && (
              <>
                <MenuItem to={endPoind}>마이페이지</MenuItem>
              </>
            )}
          </Menu>
        )}
        <IconContext.Provider value={{ size: "2rem" }}>
          <StyledNavLink to={"/"}>
            <IoIosWine />
            <p>정규 레시피</p>
          </StyledNavLink>
          <StyledNavLink to={"/custom"}>
            <IoMdHeart />
            <p>커스텀 레시피</p>
          </StyledNavLink>
          {/* <StyledNavLink to={"/recommendation"}>
            <IoMdPeople />
            <p>레시피 추천</p>
          </StyledNavLink> */}
          <StyledNavLink to={"/registration"}>
            <IoMdCreate />
            <p>레시피 등록하기</p>
          </StyledNavLink>
        </IconContext.Provider>
      </NavLinkList>
    </NavContainer>
  );
}
