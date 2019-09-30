import React from "react";
import Chapter, { ChapterEnd } from "../components/Chapter";
import Section from "../components/Section";
import Text from "../components/Text";
import Goto from "../components/Goto";
import WaitForInput from "../components/WaitForInput";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import NL from "../components/Newline";

const Intro = props => (
  <Chapter entry="title-page" {...props}>
    <Section uid="title-page">
      <Text>
        <Title>Fenris</Title>
        <NL />
        <Subtitle>By Jon Monroe</Subtitle>
      </Text>
      <WaitForInput>Start</WaitForInput>
      <Goto section="help-text" />
    </Section>
    <Section uid="help-text">
      <Text>
        The following is an interactive narrative experience.
        <NL />
        The application automatically saves your progress.
        <NL />
        Blue buttons indicate choices you can make.
        <NL />
        Red buttons indicate checkpoints you can restart from.
        <NL />
      </Text>
      <WaitForInput>I understand</WaitForInput>
      <ChapterEnd />
    </Section>
  </Chapter>
);

export default Intro;
