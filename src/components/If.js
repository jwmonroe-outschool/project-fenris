import React from "react";

import { useChapter } from "./Chapter";
import withNamespace from "../lib/persistence";

function scopeEval(scope, script) {
  if (typeof script === "function") {
    return script(scope);
  } else {
    return false;
  }
}

const If = ({ expr, children, usePersistentState, ...props }) => {
  const { isActive, sectionHistory } = useChapter();
  const [_value, _setValue] = usePersistentState("value", false);
  React.useEffect(() => {
    if (!isActive) return;
    const scope = {
      entered: sectionUid =>
        sectionHistory && sectionHistory.some(uid => uid === sectionUid)
    };
    _setValue(scopeEval(scope, expr));
  }, [expr, isActive, sectionHistory, _setValue]);

  console.log("If.render", { _value, isActive, sectionHistory });
  return _value ? children : null;
};

export default withNamespace(If, "If");
