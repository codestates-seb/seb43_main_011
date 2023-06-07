import styled from "styled-components";

const LoadingContainer = styled.div`
  width: 1360px;
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingImg = styled.img`
  width: 30%;
  height: 100%;
  margin: auto;
`;

export default function LoadingComponent() {
  return (
    <LoadingContainer>
      <LoadingImg src="./../../images/loading.gif" />
    </LoadingContainer>
  );
}
