import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import withNamespace, {
  Namespace,
  useNamespace,
  clearNamespace
} from "../lib/persistence";
import useChildrenHash from "../lib/useChildrenHash";
import { useStory } from "./Story";

const ChapterContext = React.createContext();

export const useChapter = () => {
  return React.useContext(ChapterContext);
};

const useStyles = makeStyles(() => ({
  root: {
    width: "100%"
  }
}));

const Chapter = ({ entry, children, usePersistentState }) => {
  const childrenHash = useChildrenHash(children);
  const { isActive, onEnd } = useStory();
  const classes = useStyles();
  const [lastChildrenHash, setLastChildrenHash] = usePersistentState(
    "lastChildrenHash",
    childrenHash
  );
  const namespace = useNamespace();
  React.useEffect(() => {
    if (isActive && lastChildrenHash !== childrenHash) {
      // TODO what do we do here?
      console.warn("Detect changed lastChildrenHash", {
        lastChildrenHash,
        childrenHash
      });
      setLastChildrenHash(childrenHash);
      clearNamespace(namespace);
    } else {
      console.log("Chapter lastChildrenHash === childrenHash");
    }
  }, [
    childrenHash,
    lastChildrenHash,
    setLastChildrenHash,
    isActive,
    namespace
  ]);

  const [sectionHistory, setSectionHistory] = usePersistentState(
    "sectionHistory",
    [entry]
  );

  const currentSection = sectionHistory[sectionHistory.length - 1];

  const storyContexts = React.useMemo(
    () =>
      sectionHistory.map((_, idx) => {
        return {
          sectionHistory,
          currentSection,
          isActive: isActive && idx === sectionHistory.length - 1,
          endChapter: () => onEnd(),
          setSection: section => setSectionHistory([...sectionHistory, section])
        };
      }),
    [sectionHistory, currentSection, setSectionHistory, onEnd, isActive]
  );

  const _childrenByUids = React.useMemo(() => {
    const _childrenByUids = {};
    React.Children.forEach(children, element => {
      if (!React.isValidElement(element)) return;
      const { uid } = element.props;
      if (!uid)
        return console.warn("Chapter is ignoring section without valid uid: ", {
          element
        });
      _childrenByUids[uid] = element;
    });
    return _childrenByUids;
  }, [children]);

  console.log("Chapter.render", {
    isActive,
    entry,
    children,
    sectionHistory,
    currentSection,
    storyContexts,
    _childrenByUids
  });

  return (
    <Grid item className={classes.root}>
      {sectionHistory &&
        sectionHistory.map(
          (section, idx) =>
            (section && _childrenByUids[section] && (
              <ChapterContext.Provider
                key={section + "-" + idx}
                value={storyContexts[idx]}
              >
                <Namespace namespace={idx}>
                  {_childrenByUids[section]}
                </Namespace>
              </ChapterContext.Provider>
            )) ||
            null
        )}
    </Grid>
  );
};

export const ChapterEnd = () => {
  const { endChapter } = useChapter();
  endChapter();
  return null;
};

export default withNamespace(Chapter, "Chapter");
