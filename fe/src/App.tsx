import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/style/GlobalStyles";
import Main from "./pages/Main";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/Signup";
import DetailPage from "./pages/DetailPage";
import CocktailRegistration from "./pages/CocktailRegistration";
import Error from "./pages/Error";
import CustomRecipes from "./pages/CustomRecipes";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/custom" element={<CustomRecipes />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/registration" element={<CocktailRegistration />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
