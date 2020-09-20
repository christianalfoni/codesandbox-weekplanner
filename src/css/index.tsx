import * as React from "react";
import { createStyled } from "@stitches/styled";

/* CONSUMER */

const config = {
  tokens: {
    colors: {
      main: "tomato",
      white: "#EAEAEA",
      black: "#333",
      gray: "#EAEAEA"
    },
    space: {
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "1rem",
      4: "1.5rem",
      5: "2rem",
      6: "4rem",
      8: "6rem"
    },
    shadows: {
      float:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
    sizes: {
      0: "0",
      1: "2rem",
      2: "2.5rem",
      3: "3rem",
      4: "4rem",
      5: "5rem"
    },
    radii: {
      0: "0",
      1: "2px",
      2: "3px"
    },
    fontSizes: {
      0: "10px",
      1: "12px",
      2: "16px"
    }
  },
  screens: {
    MOBILE: (rule: string) => `@media (max-width: 700px) {${rule}}`
  }
};

const { styled } = createStyled(config);

export { styled };
