import styled from "styled-components";
import cocktail from "../../images/cocktail.png";
import { useNavigate } from "react-router-dom";
interface CardProps {
  title: string;
  image: string;
  description: string;
}
const Card = ({ title, image, description }: CardProps) => {
  const descriptions = description.split("\n").reverse();
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate("/detail")}>
      <Image>
        {descriptions.map((e, i) => (
          <HiddenText
            key={i}
            className="hidden-text"
            line={i}
            leng={descriptions.length}
          >
            {e}
          </HiddenText>
        ))}
      </Image>{" "}
      {/*url={image}*/}
      <Menuname>{title}</Menuname>
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

interface Url {
  url: string;
}

const Image = styled.div`
  flex: 5;
  width: 13rem;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  background-image: url(${cocktail});
  background-size: cover;
  background-position: center;
  border-radius: 15px 15px 0 0;
  position: relative;
  overflow: hidden;
  &:hover {
    > .hidden-text {
      right: 0;
      margin: 2px 10px;
    }
  }
`;

interface LineNumber {
  line: number;
  leng: number;
}

const HiddenText = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  margin: 2px 10px;
  position: absolute;
  bottom: ${(props: LineNumber) => props.line * 2.5 + 1}rem;
  right: -300%;
  text-align: end;
  transition: right 0.35s
    ${(props: LineNumber) => Math.abs(props.line - props.leng) * 0.2}s;
`;

const Menuname = styled.div`
  flex: 1;
  width: 10rem;
  display: flex;
  align-items: center;
`;

export default Card;
