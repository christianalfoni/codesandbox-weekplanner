import * as React from "react";
import { Slider } from "../ui-components/Slider";
import { DEFAULT_WEEKDAY_MAPPING, WEEKDAY_NAMES } from "../overmind/constants";

export const CurrentWeek = () => {
  return (
    <Slider>
      <Slider.Slide>SLIDE 1</Slider.Slide>
      <Slider.Slide>SLIDE 2</Slider.Slide>
    </Slider>
  );
};
