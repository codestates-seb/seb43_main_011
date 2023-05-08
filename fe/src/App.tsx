import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/style/GlobalStyles";
import Main from "./pages/Main";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/custom" element={<Main />} />
          <Route path="/searched" element={<Main />} />
          <Route path="/detail" element={<DetailPage />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
