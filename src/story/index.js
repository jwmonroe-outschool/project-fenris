import React from "react";

import Story from "../components/Story";

import ChapterOne from "./ChapterOne";
import Intro from "./Intro";
import End from "./End";

export default () => (
  <Story>
    <Intro />
    <ChapterOne />
    <End />
  </Story>
);
