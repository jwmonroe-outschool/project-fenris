import React from "react";
import Grid from "@material-ui/core/Grid";
import withNamespace from "../lib/persistence";
import { useSection } from "./Section";
import { useChapter } from "./Chapter";

const ChoiceContext = React.createContext();

export const useChoice = () => React.useContext(ChoiceContext);

const Choice = ({ children, usePersistentState }) => {
  const { currentSection, setSection } = useChapter();
  const { isActive } = useSection();

  const [value, setValue] = usePersistentState("value", null);

  const _children = React.useMemo(
    () =>
      React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        return (
          <ChoiceContext.Provider
            value={{
              selectedElement: value,
              onFinished: section => {
                if (isActive && currentSection !== section) {
                  setSection(section);
                  setValue(section);
                }
              }
            }}
          >
            {child}
          </ChoiceContext.Provider>
        );
      }),
    [children, value, isActive, currentSection, setSection, setValue]
  );

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      justify="center"
      alignItems="center"
    >
      {_children || []}
    </Grid>
  );
};

export default withNamespace(Choice, "Choice");
