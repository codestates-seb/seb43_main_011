import styled from "styled-components";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useAppSelector } from "../../redux/hooks";
import Link from "next/link";
import NavController from "./NavController";
import { useState } from "react";
import { useRouter } from "next/router";

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
  width: 1360px;
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
  isfocus: boolean;
}

const SearchContainer = styled.div<SearchInputFocus>`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #d5d4d4;
  border-radius: 10px;
  ${({ isfocus }) =>
    isfocus &&
    `outline: none;
    border: 1px solid #96a5ff;
    box-shadow: 0 0 5px 1px #abb7fc;`}
`;
const SearchInput = styled.input`
  border: none;
  width: 95%;
  outline: none;
  margin-right: 10px;
  font-size: 1.3rem;
`;
const SearchIcon = styled(HiMagnifyingGlass)<SearchInputFocus>`
  font-size: 1.5rem;
  margin: 0 1rem 0 0.2rem;
  ${({ isfocus }) => isfocus && `color: #96a5ff;`}
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
    background-color: #8092f6;
    color: #ffff;
  }
`;

const Header = () => {
  const router = useRouter();
  const isNavOpen = useAppSelector((state) => state.NavOpen.value);
  const [searchText, setSearchText] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  let isLogin = false;
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("accessToken")
      : null;
  if (token) {
    isLogin = true;
  }

  const searchOnChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchText(e.target.value);

  const searchOnSumbitHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchText !== "") {
      router.push(`/search?value=${searchText}`);
      setSearchText("");
    }
  };

  const endPoind = isLogin ? "/myPage" : "/signin";

  return (
    <Container isNavOpen={isNavOpen}>
      <ItemArea>
        <Link href={"/"}>
          <LogoWrapper>
            <img src="../../images/headerlogo1.png" alt="Logo" />
          </LogoWrapper>
        </Link>
        <SearchContainer isfocus={isFocus}>
          <p>
            <SearchIcon isfocus={isFocus} />
          </p>
          <SearchInput
            type="text"
            placeholder="오늘의 칵테일은?"
            onChange={searchOnChangeHandle}
            onKeyUp={searchOnSumbitHandle}
            value={searchText}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </SearchContainer>

        <Menu>
          {!isLogin && (
            <>
              <MenuItem href={endPoind}>로그인</MenuItem>
              <MenuItem href={"/signup"}>회원가입</MenuItem>
            </>
          )}
          {isLogin && (
            <>
              <MenuItem href={endPoind}>마이페이지</MenuItem>
            </>
          )}
        </Menu>
        <NavController />
      </ItemArea>
    </Container>
  );
};

export default Header;
