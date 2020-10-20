import { styled } from "../css";

export const Notification = styled.div({
  position: "fixed",
  bottom: "1rem",
  width: "300px",
  margin: "0 auto",
  border: "1px solid $black",
  padding: ["$2", "$4"],
  backgroundColor: "$main",
  borderRadius: "$2"
});
