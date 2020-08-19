import { styled } from "../css";
import { Container } from "./Container";

export const ScreenContainer = styled(Container, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  maxWidth: "600px",
  marginLeft: "auto",
  marginRight: "auto",
  MOBILE: {
    maxWidth: "100%"
  }
});
