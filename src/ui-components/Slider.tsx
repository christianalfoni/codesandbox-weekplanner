import * as React from "react";
import { styled } from "../css";
import Hammer from "hammerjs";

const Wrapper = styled.div({
  position: "relative",
  width: "100%",
  height: "100%"
});

const InnerWrapper = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  overflow: "hidden",
  height: "100%"
});

const LeftBoundary = styled.div({
  position: "absolute",
  width: 40,
  left: 0,
  height: "100%",
  background:
    "linear-gradient(270deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
  top: 0,
  zIndex: 1
});

const RightBoundary = styled.div({
  position: "absolute",
  width: 40,
  right: 0,
  height: "100%",
  background:
    "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
  top: 0,
  zIndex: 1
});

const Slides = styled.div({
  position: "relative",
  whiteSpace: "nowrap",
  height: "100%",
  transition: "left 0.25s ease-in"
});

export const Slider = ({
  initialSlideIndex,
  children
}: {
  children: any;
  initialSlideIndex: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [slideIndex, setSlideIndex] = React.useState(initialSlideIndex);

  React.useEffect(() => {
    if (ref.current) {
      var mc = new Hammer(ref.current);
      mc.on("swipe", function (ev) {
        if (ev.direction === 4) {
          setSlideIndex((current) => (current > 0 ? current - 1 : current));
        } else if (ev.direction === 2) {
          setSlideIndex((current) =>
            current < children.length - 1 ? current + 1 : current
          );
        }
      });

      return () => {
        mc.destroy();
      };
    }
  }, [ref, children]);

  console.log("slideIndex", slideIndex);
  return (
    <Wrapper ref={ref}>
      <LeftBoundary />
      <InnerWrapper>
        <Slides
          style={{
            left: `-${slideIndex * 100}%`
          }}
        >
          {children}
        </Slides>
      </InnerWrapper>
      <RightBoundary />
    </Wrapper>
  );
};

const SlideWrapper = styled.div({
  display: "inline-block",
  width: "100%",
  height: "100%",
  padding: "0 40px",
  boxSizing: "border-box",
  verticalAlign: "top"
});

Slider.Slide = ({ children }: { children: any }) => {
  return <SlideWrapper>{children}</SlideWrapper>;
};
