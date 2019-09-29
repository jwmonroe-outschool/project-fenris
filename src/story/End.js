import React from "react";
import Chapter from "../components/Chapter";
import Section from "../components/Section";
import Text from "../components/Text";

const End = props => (
  <Chapter entry="end" {...props}>
    <Section uid="end">
      <Text>To Be Continued!</Text>
    </Section>
  </Chapter>
);

export default End;
