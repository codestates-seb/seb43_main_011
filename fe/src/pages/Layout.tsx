import styled from "styled-components";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export default function Layout() {
  return (
    <TopContainer>
      <Header />
      <NavBar />
      <Outlet />
      <Footer />
    </TopContainer>
  );
}
