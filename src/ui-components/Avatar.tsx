import * as React from "react";
import { styled } from "../css";
import { getInitials } from "../overmind/utils";

const AvatarCircle = styled.div({
  borderRadius: "50%",
  borderSize: "thin",
  borderStyle: "solid",
  padding: 1,
  fontSize: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
});

export const Avatar: React.FC<{ color: string; name: string }> = ({
  color,
  name
}) => {
  return (
    <AvatarCircle style={{ borderColor: color }}>
      {getInitials(name)}
    </AvatarCircle>
  );
};
