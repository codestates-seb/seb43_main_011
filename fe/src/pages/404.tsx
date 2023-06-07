import styled from "styled-components";
import Link from "next/link";

const Error = () => {
  return (
    <Container>
      <HomeLink href="/">back to the home</HomeLink>
      <Description>Page Not Found</Description>
      <Dummy></Dummy>
    </Container>
  );
};

export default Error;

const Container = styled.div`
  width: 100%;
  background-image: url("../images/error.jpg");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 4em;
  font-weight: bold;
  color: white;
`;

const Description = styled.div`
  margin-bottom: 20rem;
  margin-top: 20px;
`;

const HomeLink = styled(Link)`
  font-size: 1.1rem;
  text-decoration: none;
  padding: 5px;
  border-radius: 5px;
  background-color: #ffa600;
  color: white;
`;

const Dummy = styled.div`
  height: 160px;
`;
