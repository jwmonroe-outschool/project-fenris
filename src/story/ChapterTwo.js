import React from "react";
import Chapter from "../components/Chapter";
import Section from "../components/Section";
import Text from "../components/Text";

const ChapterTwo = props => (
  <Chapter entry="chapter-two" {...props}>
    <Section uid="chapter-two">
      <Text>Chapter Two</Text>
    </Section>
  </Chapter>
);

export default ChapterTwo;
