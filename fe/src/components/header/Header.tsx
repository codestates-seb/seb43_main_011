import styled from "styled-components";
import logo from "../../images/logo.png";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import NavController from "./NavController";
import { useState } from "react";

const Container = styled.header<{ isNavOpen: boolean }>`
  height: 85px;
  background-color: #ffff;
  transition: all 0.45s ease-out;
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
  width: 1360px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  > .logo {
    margin-left: -60px;
    margin-top: 5px;
    overflow: hidden;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #d5d4d4;
  border-radius: 10px;
`;
const SearchInput = styled.input`
  border: none;
  width: 95%;
  outline: none;
  margin-right: 10px;
  font-size: 1.3rem;
  &:focus {
    outline: none;
    border: 1px solid #96a5ff;
    box-shadow: 0 0 5px 1px #abb7fc;
  }
`;
const SearchIcon = styled(HiMagnifyingGlass)`
  font-size: 1.5rem;
  margin: 0 1rem 0 0.2rem;
`;
const Menu = styled.nav`
  display: flex;
  gap: 20px;
  margin: 22px;
`;
const MenuItem = styled(Link)`
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
    background-color: #96a5ff;
    color: #ffff;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const isNavOpen = useAppSelector((state) => state.NavOpen.value);
  const [searchText, setSearchText] = useState("");
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

  return (
    <Container isNavOpen={isNavOpen}>
      <ItemArea>
        <Link to={"/"}>
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </Link>
        <SearchContainer>
          <p>
            <SearchIcon />
          </p>
          <SearchInput
            type="text"
            placeholder="오늘의 칵테일은?"
            onChange={searchOnChangeHandle}
            onKeyUp={searchOnSumbitHandle}
            value={searchText}
          />
        </SearchContainer>

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
        <NavController />
      </ItemArea>
    </Container>
  );
};

export default Header;
