import React from "react";
import hash from "./childrenHash";

const useChildrenHash = children => {
  return React.useMemo(() => {
    return hash(children);
  }, [children]);
};

export default useChildrenHash;
