import styled from "styled-components";
import { MyRecipesContainer } from "./MyRecipes";

const WishListContainer = styled(MyRecipesContainer)`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
`;

export default function MyWishList() {
  return <WishListContainer></WishListContainer>;
}
