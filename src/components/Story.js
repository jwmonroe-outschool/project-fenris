import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowIcon from "@material-ui/icons/KeyboardArrowDown";
import Zoom from "@material-ui/core/Zoom";

import { makeStyles } from "@material-ui/core/styles";

import useScrollTrigger from "@material-ui/core/useScrollTrigger";

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

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

/**
 * Check if an element is in viewport
 *
 * @param {number} [offset]
 * @returns {boolean}
 */
function isInViewport(yourElement, offset = 0) {
  if (!yourElement) return false;
  const top = yourElement.getBoundingClientRect().top;
  return top + offset >= 0 && top - offset <= window.innerHeight;
}

function ScrollTop({ children, target }) {
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const isSticky = useScrollTrigger();
  const [isAtBottom, setIsAtBottom] = React.useState(
    target && isInViewport(target)
  );
  const [isScrolling, setIsScrolling] = React.useState(false);

  const doScroll = React.useCallback(() => {
    if (target && !isScrolling) {
      setIsScrolling(true);
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [target, setIsScrolling, isScrolling]);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIsAtBottom(isInViewport(target));
      if (isAtBottom) {
        if (isScrolling) {
          setIsScrolling(false);
        }
      } else {
        if (isSticky && !isScrolling) {
          doScroll();
        }
      }
    }, 250);
    return () => {
      clearInterval(id);
    };
  }, [
    target,
    setIsAtBottom,
    isScrolling,
    isAtBottom,
    setIsScrolling,
    isSticky,
    doScroll
  ]);

  console.log("ScrollTop", {
    children,
    target,
    isSticky
  });

  return (
    <Zoom in={!isSticky}>
      <div onClick={doScroll} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

const Story = ({ children, usePersistentState }) => {
  const [scrollToEndRef, setScrollToEndRef] = React.useState(null);
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
    elements,
    scrollToEndRef
  });
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <Grid container justify="center" alignItems="center">
          {elements}
        </Grid>
        <p ref={setScrollToEndRef} />
      </Container>
      {scrollToEndRef && (
        <ScrollTop target={scrollToEndRef}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowIcon />
          </Fab>
        </ScrollTop>
      )}
    </React.Fragment>
  );
};

export default withNamespace(Story, "Story");
