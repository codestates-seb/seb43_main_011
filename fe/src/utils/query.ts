import axios, { AxiosResponse } from "axios";
import { tokenInstance } from "./tokeninstance";

export interface Recipes {
  [key: string]: RecipeCard[];
}

export interface RecipeCard {
  imageUrl: string;
  name: string;
  description: string;
  id: number;
  category?: string;
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

export const getCards = async (alcohol: string, size: number, page: number) => {
  const response: AxiosResponse<{ data: RegularResponseData }> =
    await axios.get(`/regular/findAll/${alcohol}?page=${page}&size=${size}`);
  return response.data.data;
};

export interface CustomResponseData {
  customRecipeResponseDtoList: RecipeCard[];
}

export const getCustomCards = async (
  path: string,
  size: number,
  page: number,
) => {
  if (path === "bookmark") {
    const response: AxiosResponse<{ data: RegularResponseData }> =
      await tokenInstance.get(`/${path}/findAll?page=${page}&size=${size}`);
    return response.data.data;
  } else {
    const response: AxiosResponse<{ data: RegularResponseData }> =
      await axios.get(`/${path}/findAll?page=${page}&size=${size}`);
    return response.data.data;
  }
};

interface SearchResultsCard {
  name: string;
  imageUrl: string;
  ingredient: string;
  id: number;
}

export interface SearchResponse {
  data: SearchResultsCard[];
  pageInfo: PageInfo;
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

export const getMyRecipe = async (path: string, size: number, page: number) => {
  const response: AxiosResponse<{ data: RegularResponseData }> =
    await tokenInstance.get(`/custom/find/${path}?page=${page}&size=${size}`);
  return response.data.data;
};

export interface Line {
  id: number;
  stuff: string;
  amount: string;
  selectOption: string;
}
