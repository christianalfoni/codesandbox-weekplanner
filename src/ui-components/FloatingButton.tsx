import { styled } from "../css";

export const FloatingButton = styled.button({
  position: "absolute",
  borderRadius: "50%",
  boxShadow: "float",
  display: "flex",
  padding: 1,
  justifyContent: "center",
  alignItems: "center",
  width: "$2",
  height: "$2",
  boxSizing: "border-box",

  variants: {
    variant: {
      muted: {
        opacity: 0.5,
        backgroundColor: "gray"
      }
    }
  }
});
