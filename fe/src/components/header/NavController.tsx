import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toogle } from "../../redux/slices/NavSlice";

const ControllButton = styled.button<{ isNavOpen: boolean }>`
  width: 70px;
  height: 30px;
  border: none;
  color: #657cff;
  background-color: white;
  border-radius: 5px;
  padding: 5px 2px;
  position: relative;
  &:hover {
    cursor: pointer;
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
  transition: all 0.5s ease-out;
`;

export default function NavController() {
  const isNavOpen = useAppSelector((state) => state.NavOpen.value);
  const dispatch = useAppDispatch();
  return (
    <ControllButton isNavOpen={isNavOpen} onClick={() => dispatch(toogle())}>
      <MovementStick className="first"></MovementStick>
      <MovementStick className="second"></MovementStick>
      <MovementStick className="third"></MovementStick>
    </ControllButton>
  );
}
