import { styled } from "../css";

export const Container = styled.div({
  position: "relative",
  width: "100vw",
  maxWidth: "700px",
  marginLeft: "auto",
  marginRight: "auto",
  boxSizing: "border-box",
  padding: 5,
  MOBILE: {
    maxWidth: "100%",
    padding: 0
  }
});
