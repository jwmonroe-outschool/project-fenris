import React from "react";
import Chapter, { ChapterEnd } from "../components/Chapter";
import Section from "../components/Section";
import Text from "../components/Text";
import WaitForInput from "../components/WaitForInput";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import NL from "../components/Newline";

const Intro = props => (
  <Chapter entry="intro" {...props}>
    <Section uid="intro">
      <Text>
        <Title>Fenris</Title>
        <NL />
        <Subtitle>By Jon Monroe</Subtitle>
      </Text>
      <WaitForInput>Start</WaitForInput>
      <ChapterEnd />
    </Section>
  </Chapter>
);

export default Intro;
