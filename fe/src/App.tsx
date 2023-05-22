import { Routes, Route } from "react-router-dom";
import GlobalStyle from "./components/style/GlobalStyles";
import Main from "./pages/Main";
import Layout from "./pages/Layout";
import SignIn from "./pages/SignIn";
import DetailPage from "./pages/DetailPage";
import CocktailRegistration from "./pages/CocktailRegistration";
import Error from "./pages/Error";
import CustomRecipes from "./pages/CustomRecipes";
import SearchResults from "./pages/SearchResults";
import SignUp from "./pages/SignUp";
import Mypage from "./pages/Mypage";
import CocktailEdit from "./pages/CocktailEdit";

function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/custom" element={<CustomRecipes />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/detail/:category/:id" element={<DetailPage />} />
          <Route path="/registration" element={<CocktailRegistration />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/customedit" element={<CocktailEdit />} />
          {/* Route path='/detail/edit/:id */}
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
