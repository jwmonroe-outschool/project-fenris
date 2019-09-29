import React from "react";
import IntersectionVisible from "react-intersection-visible";

export default ({ time, onFinished, ...props }) => {
  const [hasTriggered, setHasTriggered] = React.useState(false);
  return (
    <IntersectionVisible
      onShow={e => {
        if (!hasTriggered)
          setTimeout(() => {
            console.log("Delay.onShow", { e, time, onFinished, props });
            onFinished();
            setHasTriggered(true);
          }, time);
      }}
    />
  );
};
