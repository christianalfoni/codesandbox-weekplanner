import * as React from "react";
import { getInitials, stringToColor } from "../overmind/utils";
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

export const Avatar = ({ children }: { children: string }) => {
  return (
    <AvatarElement
      style={{
        borderColor: stringToColor(children)
      }}
    >
      {getInitials(children)}
    </AvatarElement>
  );
};
