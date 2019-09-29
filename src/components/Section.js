import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import withNamespace from "../lib/persistence";
import { useChapter } from "./Chapter";

const useStyles = makeStyles(theme => ({
  sectionPaper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 0)
  }
}));

const SectionContext = React.createContext();

const Section = ({ children, uid, usePersistentState }) => {
  const classes = useStyles();
  const { isActive, currentSection, sectionHistory } = useChapter();
  const [renderingChildIdx, setRenderingChildIdx] = usePersistentState(
    "renderingChildIdx",
    0
  );

  console.log("Section.render", {
    children,
    uid,
    isActive,
    renderingChildIdx,
    currentSection,
    sectionHistory
  });

  const _children = React.useMemo(
    () =>
      React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;
        const isChildActive = isActive && idx === renderingChildIdx;
        const isChildFinished = !isActive || idx < renderingChildIdx;
        return (
          <SectionContext.Provider
            value={{
              sectionUid: uid,
              isActive: isChildActive,
              isFinished: isChildFinished,
              onFinished: () =>
                isChildActive && setRenderingChildIdx(renderingChildIdx + 1)
            }}
          >
            {child}
          </SectionContext.Provider>
        );
      }),
    [children, uid, isActive, renderingChildIdx, setRenderingChildIdx]
  );

  return (
    <Paper className={classes.sectionPaper}>
      {_children.slice(0, renderingChildIdx + 1) || []}
    </Paper>
  );
};

export const useSection = () => React.useContext(SectionContext);

export default withNamespace(Section, "Section");
