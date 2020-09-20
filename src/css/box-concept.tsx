/*
import {
  createCss,
  IConfig,
  TDefaultCss,
  ITokensDefinition,
  IScreens
} from "@stitches/css";


export type TCssProp<T extends IConfig> = TDefaultCss<T> | (string & {});

export type BreakPointsKeys<Config extends IConfig> = keyof Config["screens"];

export type TCssWithBreakpoints<Config extends IConfig> = TCssProp<Config> &
  { [key in BreakPointsKeys<Config>]?: TCssProp<Config> };

export type BoxElement = keyof JSX.IntrinsicElements | React.ComponentType<any>;

export type TTokens<
  T extends keyof ITokensDefinition,
  C extends IConfig
> = C["tokens"] extends ITokensDefinition
  ? C["screens"] extends IScreens
    ?
        | keyof C["tokens"][T]
        | (string & {})
        | ({
            [K in keyof C["screens"]]: keyof C["tokens"][T] | (string & {});
          } & {
            "": keyof C["tokens"][T] | (string & {});
          })
    : T | (string & {})
  : string;

export type BaseProps<T extends IConfig> = {
  p?: TTokens<"space", T>;
  px?: TTokens<"space", T>;
  py?: TTokens<"space", T>;
  pt?: TTokens<"space", T>;
  pr?: TTokens<"space", T>;
  pb?: TTokens<"space", T>;
  pl?: TTokens<"space", T>;
  m?: TTokens<"space", T>;
  mx?: TTokens<"space", T>;
  my?: TTokens<"space", T>;
  mt?: TTokens<"space", T>;
  mr?: TTokens<"space", T>;
  mb?: TTokens<"space", T>;
  ml?: TTokens<"space", T>;
  color?: TTokens<"colors", T>;
  bg?: TTokens<"colors", T>;
  width?: TTokens<"sizes", T>;
  maxWidth?: TTokens<"sizes", T>;
  height?: TTokens<"sizes", T>;
  size?: TTokens<"fontSizes", T>;
  font?: TTokens<"fonts", T>;
};

export interface BaseBox<
  Config extends IConfig,
  ComponentOrTag extends BoxElement,
  Props = {}
> {
  (
    props: React.ComponentPropsWithRef<ComponentOrTag> & {
      as?: never;
      css?: TCssWithBreakpoints<Config>;
      className?: string;
      children?: any;
    } & Props &
      BaseProps<Config>
  ): any;
  <AS extends keyof JSX.IntrinsicElements | React.ComponentType>(
    props: {
      as: AS;
      css?: TCssWithBreakpoints<Config>;
      className?: string;
      children?: any;
    } & React.ComponentPropsWithRef<AS> &
      Props &
      BaseProps<Config>
  ): any;

  defaultProps?: Props & { [k: string]: any };
  displayName?: string;
  config?: Config;
}

export const createBox = <T extends IConfig>(config: T): BaseBox<T, "div"> => {
  const compose = createCss(config);
  const insertCss = (
    keys: string[],
    value: string | number | { [screen: string]: string | number }
  ) => {
    if (value === undefined) {
      return value;
    }

    if (typeof value === "object") {
      return Object.keys(value).reduce<any>((aggr, screen) => {
        aggr[screen] = keys.reduce<any>((subaggr, key) => {
          subaggr[key] = value[screen];

          return subaggr;
        }, {});

        return aggr;
      }, {});
    }

    return keys.reduce<any>((aggr, key) => {
      aggr[key] = value;

      return aggr;
    }, {});
  };

  const properties = {
    p: ["padding"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    pt: ["paddingTop"],
    pr: ["paddingRight"],
    pb: ["paddingBottom"],
    pl: ["paddingLeft"],
    m: ["margin"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    mt: ["marginTop"],
    mr: ["marginRight"],
    mb: ["marginBottom"],
    ml: ["marginLeft"],
    color: ["color"],
    bg: ["backgroundColor"],
    width: ["width"],
    maxWidth: ["width"],
    height: ["height"],
    size: ["fontSize"],
    font: ["fontFamily"]
  };

  return React.forwardRef(
    ({
      as,
      className,
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      color,
      bg,
      width,
      maxWidth,
      height,
      size,
      font,
      css,
      ...props
    }: any) => {
      const Element = as || "div";

      const compositions = [
        insertCss(properties.p, p),
        insertCss(properties.px, px),
        insertCss(properties.py, py),
        insertCss(properties.pt, pt),
        insertCss(properties.pr, pr),
        insertCss(properties.pb, pb),
        insertCss(properties.pl, pl),
        insertCss(properties.m, m),
        insertCss(properties.mx, mx),
        insertCss(properties.my, my),
        insertCss(properties.mt, mt),
        insertCss(properties.mr, mr),
        insertCss(properties.mb, mb),
        insertCss(properties.ml, ml),
        insertCss(properties.color, color),
        insertCss(properties.bg, bg),
        insertCss(properties.width, width),
        insertCss(properties.maxWidth, maxWidth),
        insertCss(properties.height, height),
        insertCss(properties.size, size),
        insertCss(properties.font, font),
        css,
        className
      ];

      return React.createElement(Element, {
        ...props,
        className: compose(...compositions)
      });
    }
  ) as any;
};
*/

/*

export type Box<E extends BoxElement, Props = {}> = BaseBox<
  typeof config,
  E,
  Props
>;

export const Flex: Box<
  "div",
  {
    alignX?: "flex-start" | "flex-end" | "center";
    alignY?: "flex-start" | "flex-end" | "center";
  }
> = ({ alignX = "flex-start", alignY = "flex-start", ...props }) => {
  return (
    <Box
      {...props}
      css={{
        display: "flex",
        flexDirection: "row",
        alignItems: alignX,
        justifyContent: alignY
      }}
    />
  );
};

export const FlexCol: Box<
  "div",
  {
    alignX?: "flex-start" | "flex-end" | "center";
    alignY?: "flex-start" | "flex-end" | "center";
  }
> = ({ alignX = "flex-start", alignY = "flex-start", ...props }) => {
  return (
    <Box
      {...props}
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: alignY,
        justifyContent: alignX
      }}
    />
  );
};

*/
