import React from "react";
import IntersectionVisible from "react-intersection-visible";
import { useChapter } from "./Chapter";

export default ({ section, ...props }) => {
  const { isActive, setSection } = useChapter();
  const [hasTriggered, setHasTriggered] = React.useState(!isActive);
  return (
    <IntersectionVisible
      onShow={e => {
        if (setSection && !hasTriggered) {
          console.log("Goto.onShow", {
            e,
            hasTriggered,
            section,
            setSection,
            props
          });
          setSection(section);
          setHasTriggered(true);
        }
      }}
    />
  );
};
