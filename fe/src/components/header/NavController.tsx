import styled from "styled-components";

const ControllButton = styled.button<{ isNavOpen: boolean }>`
  width: 60px;
  height: 40px;
  border: none;
  color: #657cff;
  background-color: white;
  border-radius: 5px;
  position: relative;
  &:hover {
    background-color: #96a5ff;
    > span {
      background-color: white;
    }
  }
  > .first {
    ${(props) =>
      props.isNavOpen
        ? "top: 50%; transform: translateY(-50%); transform: rotate(45deg);"
        : "top: 0;"}
  }
  > .second {
    ${(props) =>
      props.isNavOpen
        ? "transform: rotate(135deg); opacsity: 0"
        : "top: 50%; transform: translateY(-50%);"}
  }
  > .third {
    ${(props) =>
      props.isNavOpen
        ? "bottom: calc(50%+2.5px); transform: rotate(-45deg);"
        : "bottom: 0;"}
  }
`;

const MovementStick = styled.span`
  display: block;
  border-radius: 5px;
  position: absolute;
  width: 90%;
  height: 5px;
  background-color: #657cff;
  transition: all 0.35s ease;
`;
interface ControllerProps {
  isNavOpen: boolean;
}
export default function NavController({ isNavOpen }: ControllerProps) {
  return (
    <ControllButton isNavOpen={isNavOpen}>
      <MovementStick className="first"></MovementStick>
      <MovementStick className="second"></MovementStick>
      <MovementStick className="third"></MovementStick>
    </ControllButton>
  );
}
