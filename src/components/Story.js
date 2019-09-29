import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import withNamespace, {
  Namespace,
  useNamespace,
  joinNamespace,
  clearNamespace
} from "../lib/persistence";

const StoryContext = React.createContext();

export const useStory = () => {
  return React.useContext(StoryContext);
};

const Story = ({ children, usePersistentState }) => {
  const [currentChapter, setCurrentChapter] = usePersistentState(
    "CurrentChapter",
    0
  );
  const namespace = useNamespace();
  const elements = React.useMemo(
    () =>
      children &&
      children.slice(0, currentChapter + 1).map((child, chapterNum) => (
        <React.Fragment key={chapterNum}>
          <Namespace namespace={"Chapter" + chapterNum}>
            <StoryContext.Provider
              value={{
                isActive: chapterNum === currentChapter,
                onEnd: () =>
                  chapterNum === currentChapter &&
                  setCurrentChapter(currentChapter + 1)
              }}
            >
              {child}
            </StoryContext.Provider>
          </Namespace>
          {chapterNum < currentChapter && (
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  for (let i = chapterNum + 1; i <= currentChapter; i++) {
                    console.log("clearNamespace", {
                      namespace: joinNamespace(namespace, "Chapter" + i),
                      chapterNum,
                      currentChapter
                    });
                    clearNamespace(joinNamespace(namespace, "Chapter" + i));
                  }
                  setCurrentChapter(chapterNum);
                }}
              >
                Restart from Here
              </Button>
            </Grid>
          )}
        </React.Fragment>
      )),
    [currentChapter, setCurrentChapter, children, namespace]
  );

  console.log("Story.render", {
    currentChapter,
    setCurrentChapter,
    namespace,
    elements
  });
  return <React.Fragment>{elements}</React.Fragment>;
};

export default withNamespace(Story, "Story");
