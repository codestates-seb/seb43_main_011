import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
interface CardProps {
  recipe: { name: string; imageUrl: string; description: string; id: number };
  category?: string;
}
const Card = ({ recipe, category }: CardProps) => {
  const router = useRouter();
  const [hiddenText, setHiddenText] = useState(recipe.description);

  useEffect(() => {
    if (recipe.description.length > 40) {
      setHiddenText(`${recipe.description.slice(0, 37)}..`);
    }
  }, [recipe.description]);
  return (
    <Container onClick={() => router.push(`/detail/${category}/${recipe.id}`)}>
      <Image url={recipe.imageUrl}>
        <HiddenText className="hidden-text">{hiddenText}</HiddenText>
      </Image>
      <Menuname>{recipe.name}</Menuname>
    </Container>
  );
};

const Container = styled.div`
  height: 16rem;
  width: 13rem;
  overflow: hidden;
  border: 1px solid lightgray;
  border-radius: 15px;
  box-shadow: 0 0 10px 2px rgba(94, 94, 94, 0.24);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
`;
interface ImageProps {
  url: string;
}
const Image = styled.div<ImageProps>`
  flex: 5;
  width: 13rem;
  display: flex;
  align-items: end;
  justify-content: center;
  background: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  border-radius: 0 0 7px 7px;
  position: relative;
  overflow: hidden;
  &:hover {
    background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      url(${(props) => props.url});
    > .hidden-text {
      opacity: 1;
    }
  }
`;

const HiddenText = styled.p`
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  opacity: 0;
  color: white;
  margin: 5px;
  text-align: start;
  transition: all 0.35s;
  line-height: 1.8rem;
  letter-spacing: 2px;
`;

const Menuname = styled.div`
  flex: 1;
  width: 10rem;
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #5e5e5e;
`;

export default Card;
