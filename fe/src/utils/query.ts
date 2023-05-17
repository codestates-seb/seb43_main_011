import axios, { AxiosResponse } from "axios";

export interface Recipes {
  [key: string]: RecipeCard[];
}
export interface RecipeCard {
  title: string;
  image: string;
  description: string;
  ingredient: string;
}
// export const getSearchResults = async (path: string, searchValue: string) => {
//   const response: AxiosResponse<RecipeData[]> = await axios.get(`/${path}`);
//   const data = response.data.filter(
//     (card: RecipeData) =>
//       card.stuff.includes(searchValue) || card.name.includes(searchValue),
//   );
//   return data;
// };

export interface RecipeCard {
  imageUrl: string;
  name: string;
  description: string;
  id: number;
}

export interface PageInfo {
  page: number;
  size: number;
  totalPage: number;
  totalSize: number;
}

export interface RegularResponseData {
  data: RecipeCard[];
  pageInfo: PageInfo;
}

export const getCards = async (path: string, size: number, page: number) => {
  const response: AxiosResponse<{ data: RegularResponseData }> =
    await axios.get(`/regular/findAll/${path}?page=${page}&size=${size}`);
  return response.data.data;
};

export interface CustomResponseData {
  customRecipeResponseDtoList: RecipeCard[];
}

export const getCustomCards = async (path: string) => {
  const response: AxiosResponse<{ data: CustomResponseData }> = await axios.get(
    `/${path}/findAll`,
  );
  return response.data.data;
};
