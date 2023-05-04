import { ThemeProvider } from "styled-components";
import theme from "./components/style/theme";
import styled from "styled-components";
import GlobalStyle from "./components/style/GlobalStyles";
const Main = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Main></Main>
      </ThemeProvider>
    </>
  );
}

export default App;
