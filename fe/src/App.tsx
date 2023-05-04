import { ThemeProvider } from "styled-components";
import theme from "./components/style/theme";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/style/GlobalStyles";
import Header from "./components/header/Header";
import SideBar from "./components/sideBar/SideBar";
import Footer from "./components/footer/Footer";
import MainComponent from "./components/main/MainComponent";

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TempMain = styled.div`
  height: 100vh;
  width: 100vw;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <TopContainer>
          <Header />
          <MainComponent />
          <Footer />
        </TopContainer>
      </ThemeProvider>
    </>
  );
}

export default App;
