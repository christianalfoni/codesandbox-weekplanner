import { styled } from "../css";

export const Container = styled.div({
  width: "100vw",
  maxWidth: "700px",
  marginLeft: "auto",
  marginRight: "auto",
  padding: 5,
  boxSizing: "border-box",
  position: "relative",
  MOBILE: {
    padding: 0,
    maxWidth: "100%"
  }
});
