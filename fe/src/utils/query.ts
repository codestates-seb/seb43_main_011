import axios, { AxiosResponse } from "axios";

export interface Recipes {
  [key: string]: RecipeCard[];
}

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

export const getCards = async (path: string, size: number, page = 1) => {
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

interface SearchResultsCard {
  name: string;
  imageUrl: string;
  ingredient: string;
}

export interface SearchResponse {
  data: SearchResultsCard[];
  pageInfo: PageInfo;
}

export interface RecipeData {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  stuff: string;
  recipeStep: string;
}

export const getSearchResults = async (
  path: string,
  searchValue: string,
  page = 1,
) => {
  const response: AxiosResponse<{ data: SearchResponse }> = await axios.get(
    `/${path}/search/${searchValue}?page=${page}&size=8`,
  );
  return response.data.data;
};
