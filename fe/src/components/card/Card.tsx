import styled from "styled-components";
import { useNavigate } from "react-router-dom";
interface CardProps {
  name: string;
  image: string;
  description: string;
  id: number;
}
const Card = ({ name, image, description, id }: CardProps) => {
  const navigate = useNavigate();
  // console.log(name, image);
  return (
    <Container onClick={() => navigate(`/detail/${id}`)}>
      <Image url={image}>
        <HiddenText className="hidden-text">{description}</HiddenText>
      </Image>
      <Menuname>{name}</Menuname>
    </Container>
  );
};

const Container = styled.div`
  height: 16rem;
  width: 13rem;

  border: 1px solid lightgray;
  border-radius: 15px;

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
  border-radius: 15px 15px 0 0;
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
  font-size: 1.1rem;
  font-weight: bold;
  opacity: 0;
  color: white;
  margin: 5px;
  text-align: end;
  transition: all 0.35s;
`;

const Menuname = styled.div`
  flex: 1;
  width: 10rem;
  display: flex;
  align-items: center;
`;

export default Card;
