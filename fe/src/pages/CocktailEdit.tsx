import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { tokenInstance } from "../utils/tokeninstance";
import { Container } from "./CocktailRegistration";
import { ImageDto, RecipeDto } from "../components/recipeForm/RecipeFormConfig";
import IsNotLogin from "../components/errorFallback/IsNotLogin";
import RecipeForm from "../components/recipeForm/RecipeForm";

const CocktailEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isLogin = sessionStorage.getItem("UTK") !== null;
  const fetchData = async () => {
    const response = await tokenInstance.get(`/custom/find/${id}`);
    return response.data;
  };

  const { data, error } = useQuery("myData", fetchData);
  if (error) {
    navigate("/error");
  }

  const postCustomRecipe = async (data: RecipeDto) => {
    const content = JSON.stringify(data);
    const response = await tokenInstance.patch(
      `/custom/update/content/${id}`,
      content,
    );
    return response.data;
  };

  const postCustomImage = async (data: ImageDto) => {
    const response = await tokenInstance.post(
      `/custom/submit/image/${id}`,
      data.formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return response.data;
  };
  return (
    <Container>
      {!isLogin && <IsNotLogin />}
      {isLogin && data && (
        <RecipeForm
          postRecipe={postCustomRecipe}
          postImage={postCustomImage}
          initData={data.data}
        />
      )}
    </Container>
  );
};

export default CocktailEdit;
