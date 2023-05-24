export type Color =
  | "main"
  | "editButton"
  | "plusMinus"
  | "fontColor"
  | "searchBar"
  | "defaultInput"
  | "uploadAreaBorder"
  | "loginSignupInput";

const color: { [key in Color]: string } = {
  main: "#96A5FF",
  editButton: "#807B79",
  plusMinus: "#7E7E7E",
  fontColor: "#2E2E2E",
  searchBar: "#A4A4A4",
  defaultInput: "#828282",
  uploadAreaBorder: "#9A9A9A",
  loginSignupInput: "#85B6FF",
};

const theme = {
  color,
};

export default theme;
