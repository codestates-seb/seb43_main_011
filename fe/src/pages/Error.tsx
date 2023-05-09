import styled from "styled-components";
import error from "../images/error.jpg";

const Error = () => {
  return (
    <Container>
      <Description>Page Not Found</Description>
    </Container>
  );
};

export default Error;

const Container = styled.div`
  width: 100%;
  background-image: url(${error});
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 4em;
  font-weight: bold;
  color: white;
`;

const Description = styled.div`
  margin-bottom: 20rem;
`;
