import { useChapter } from "./Chapter";

function scopeEval(scope, script) {
  if (typeof script === "function") {
    return script(scope);
  } else {
    return false;
  }
}

export default function If({ expr, children, ...props }) {
  const { isActive, sectionHistory } = useChapter();
  console.log("If.render", { isActive, sectionHistory });
  const scope = {
    entered: sectionUid =>
      sectionHistory && sectionHistory.some(uid => uid === sectionUid)
  };
  if (isActive) {
    return scopeEval(scope, expr) ? children : null;
  } else {
    return children;
  }
}
