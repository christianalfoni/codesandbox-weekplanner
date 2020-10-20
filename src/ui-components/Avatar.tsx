import * as React from "react";
import { getInitials } from "../overmind/utils";
import { styled } from "../css";

const AvatarElement = styled.div({
  borderRadius: "50%",
  borderSize: "thin",
  borderStyle: "solid",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "$0",
  padding: "$1"
});

export const Avatar: React.FC<{ color: string; name: string }> = ({
  color,
  name
}) => {
  return (
    <AvatarElement
      style={{
        borderColor: color
      }}
    >
      {getInitials(name)}
    </AvatarElement>
  );
};
