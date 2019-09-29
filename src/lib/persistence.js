import React from "react";
import * as Storage from "./storage";

const NamespaceContext = React.createContext();

export function useNamespace() {
  return React.useContext(NamespaceContext) || "root";
}

export function joinNamespace(parentNamespace, namespace) {
  return parentNamespace + "$" + namespace;
}

export function Namespace({ namespace, children }) {
  const parentNamespace = useNamespace();
  return (
    <NamespaceContext.Provider
      value={joinNamespace(parentNamespace, namespace)}
    >
      {children}
    </NamespaceContext.Provider>
  );
}

function usePersistentState(key, defaultValue) {
  const namespace = useNamespace();
  const persistedValue = React.useMemo(() => Storage.get(namespace, key), [
    namespace,
    key
  ]);
  const [value, _setValue] = React.useState(
    persistedValue ? persistedValue : defaultValue
  );
  const setValue = React.useCallback(
    newValue => {
      _setValue(newValue);
      Storage.set(namespace, key, newValue);
    },
    [namespace, key, _setValue]
  );
  return [value, setValue];
}

export default function withNamespace(Component, namespace) {
  const mockChild = (child, idx) => (
    <Namespace namespace={idx} {...child.props}>
      {child}
    </Namespace>
  );

  return ({ children, ...props }) => (
    <Namespace namespace={namespace}>
      <Component usePersistentState={usePersistentState} {...props}>
        {children && React.Children.map(children, mockChild)}
      </Component>
    </Namespace>
  );
}

export function clearNamespace(namespace) {
  Storage.clear(namespace);
}
