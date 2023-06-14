import styled from "styled-components";

const Container = styled.div`
  height: 16rem;
  width: 13rem;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 0 10px 2px rgba(94, 94, 94, 0.24);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Image = styled.div`
  flex: 5;
  width: 13rem;
  display: flex;
  align-items: end;
  justify-content: center;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;

  @keyframes skeleton-gradient {
    0% {
      background-color: rgba(165, 165, 165, 0.1);
    }
    50% {
      background-color: rgba(165, 165, 165, 0.3);
    }
    100% {
      background-color: rgba(165, 165, 165, 0.1);
    }
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: skeleton-gradient 1.5s infinite ease-in-out;
  }
`;

const Menuname = styled.div`
  flex: 1;
  width: 100%;
  background-color: #f2f2f2;
  overflow: hidden;
  padding: 15px 10px 0;
  border-radius: 4px;

  > p {
    width: 50%;
    height: 50%;
    background-color: #f2f2f2;
    overflow: hidden;
    position: relative;
    border-radius: 4px;
    @keyframes skeleton-gradient {
      0% {
        background-color: rgba(165, 165, 165, 0.3);
      }
      50% {
        background-color: rgba(165, 165, 165, 0.1);
      }
      100% {
        background-color: rgba(165, 165, 165, 0.3);
      }
    }
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      animation: skeleton-gradient 1.5s infinite ease-in-out;
    }
  }
`;

export default function CocktailLiustLoading() {
  return (
    <Container>
      <Image />
      <Menuname>
        <p></p>
      </Menuname>
    </Container>
  );
}
