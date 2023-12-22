import styled from "styled-components";
import logo from "../../images/headerlogo1.png";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import NavController from "./NavController";
import { useContext, useState } from "react";
import { MobileViewContext } from "../../pages/Layout";

const Container = styled.header<{ isNavOpen: boolean }>`
  height: 85px;
  background-color: #ffff;
  transition: all 0.3s ease;
  ${(props) =>
    props.isNavOpen
      ? ""
      : "box-shadow: 0px 5px 20px rgba(152, 152, 152, 0.24);"}
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
`;

const ItemArea = styled.div`
  max-width: 1360px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;

const LogoWrapper = styled.div`
  margin-right: 20px;
  > img {
    height: 80px;
  }
`;

interface SearchInputFocus {
  $isFocus: boolean;
}

const SearchContainer = styled.div<SearchInputFocus>`
  display: flex;
  align-items: center;
  flex: 2 2;
  max-width: 900px;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #d5d4d4;
  border-radius: 10px;
  ${({ $isFocus }) =>
    $isFocus &&
    `outline: none;
    border: 1px solid #96a5ff;
    box-shadow: 0 0 5px 1px #abb7fc;`}
`;
const SearchInput = styled.input`
  border: none;
  width: 90%;
  outline: none;
  margin-right: 10px;
  font-size: 1.3rem;
`;
const SearchIcon = styled(HiMagnifyingGlass)<SearchInputFocus>`
  font-size: 1.5rem;
  margin: 0 1rem 0 0.2rem;
  ${({ $isFocus }) => $isFocus && `color: #96a5ff;`}
`;
export const Menu = styled.nav`
  display: flex;
  gap: 20px;
  margin: 22px;
  @media screen and (max-width: 640px) {
    margin: 0 auto;
    gap: 5px;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;
export const MenuItem = styled(Link)`
  color: #5a5a5a;
  background-color: #ffff;
  width: max-content;
  font-weight: bold;
  padding: 1rem;
  border-radius: 10px;
  margin-right: 10px;
  text-decoration: none;
  &:hover {
    cursor: pointer;
    background-color: #8092f6;
    color: #ffff;
  }
  @media screen and (max-width: 640px) {
    background-color: #8092f6;
    color: #ffff;
    padding: 0.5rem;
    margin: 0 5px;
    width: 80%;
    text-align: center;
    &:hover {
      background-color: #6379f4;
      color: #ffff;
    }
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const isNavOpen = useAppSelector((state) => state.NavOpen.value);
  const [searchText, setSearchText] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  const isLogin = sessionStorage.getItem("UTK") !== null;
  const searchOnChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value);

  const searchOnSumbitHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchText !== "") {
      navigate(`/search?value=${searchText}`);
      setSearchText("");
    }
  };

  const endPoind = isLogin ? "/myPage" : "/signin";

  const isMobile = useContext(MobileViewContext);
  return (
    <Container isNavOpen={isNavOpen}>
      <ItemArea>
        <Link to={"/"}>
          <LogoWrapper>
            <img src={logo} alt="Logo" />
          </LogoWrapper>
        </Link>
        <SearchContainer $isFocus={isFocus}>
          <p>
            <SearchIcon $isFocus={isFocus} />
          </p>
          <SearchInput
            type="text"
            placeholder={isMobile ? "" : "오늘의 칵테일은?"}
            onChange={searchOnChangeHandle}
            onKeyUp={searchOnSumbitHandle}
            value={searchText}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </SearchContainer>

        {!isMobile && (
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
        <NavController />
      </ItemArea>
    </Container>
  );
};

export default Header;
