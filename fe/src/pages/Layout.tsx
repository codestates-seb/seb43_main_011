import styled from "styled-components";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import SideBar from "../components/sideBar/SideBar";
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
      <SideBar />
      <Header />
      <Outlet />
      <Footer />
    </TopContainer>
  );
}
