import styled from "styled-components";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import NavBar from "./NavBar/NavBar";

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <TopContainer>
      <Header />
      <NavBar />
      <main>{children}</main>
      <Footer />
    </TopContainer>
  );
}
