import styled from "styled-components";
import logo from "../../images/logo.png";
import { FiMenu } from "react-icons/fi";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 73px;
  padding: 1.25rem 2.5rem 1.25rem 2.5rem;
  background-color: #ffff;
  box-shadow: 0px 5px 20px rgba(152, 152, 152, 0.24);
`;

const SerchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #d5d4d4;
  border-radius: 10px;
  padding: 5px 10px;
`;
const SerchInput = styled.input`
  border: none;
  width: 95%;
  outline: none;
  margin-right: 10px;
  font-size: 1.3rem;
`;
const SerchIcon = styled(HiMagnifyingGlass)`
  font-size: 1.5rem;
  margin-right: 1rem;
`;
const Menu = styled.nav`
  display: flex;
  gap: 20px;
  margin: 22px;
`;
const MenuItem = styled.a`
  color: #5a5a5a;
  background-color: #ffff;
  width: max-content;
  font-weight: bold;
  padding: 1rem;
  border-radius: 10px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
    background-color: #96a5ff;
    color: #ffff;
  }
`;

const Header = () => {
  return (
    <Container>
      <img src={logo} alt="Logo" />
      <SerchContainer>
        <p>
          <SerchIcon />
        </p>
        <SerchInput type="text" placeholder="오늘의 칵테일은?" />
      </SerchContainer>

      <Menu>
        <MenuItem>로그인</MenuItem>
        <MenuItem>회원가입</MenuItem>
      </Menu>
      <FiMenu size="45" color="#96A5FF" />
    </Container>
  );
};

export default Header;
