import styled from "styled-components";
import logo from "../../images/logo.png";
import { FiMenu } from "react-icons/fi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useAppDispatch } from "../../redux/hooks";
import { isOpen } from "../../redux/slices/SideView";

const Container = styled.header`
  height: 85px;
  background-color: #ffff;
  box-shadow: 0px 5px 20px rgba(152, 152, 152, 0.24);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
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

const SerchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin-left: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #d5d4d4;
  border-radius: 10px;
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
  margin: 0 1rem 0 0.2rem;
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
  const dispatch = useAppDispatch();
  return (
    <Container>
      <ItemArea>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
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
        <FiMenu size="45" color="#96A5FF" onClick={() => dispatch(isOpen())} />
      </ItemArea>
    </Container>
  );
};

export default Header;
