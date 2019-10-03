import React from "react";
import * as Storage from "./storage";

const NamespaceContext = React.createContext();

/* a container mapping fully resolved joinNamespace(namespace, field) to a POJO */
const namespaceTransientStore = {};

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
  // ensure default value is always flushed to local storage
  React.useEffect(() => {
    if (value === defaultValue) {
      Storage.set(namespace, key, defaultValue);
    }
  }, [value, defaultValue, namespace, key]);
  // wrap setValue from React.useState to sync with Storage
  const setValue = React.useCallback(
    newValue => {
      _setValue(newValue);
      Storage.set(namespace, key, newValue);
    },
    [namespace, key, _setValue]
  );
  React.useEffect(() => {
    namespaceTransientStore[joinNamespace(namespace, key)] = {
      namespace,
      key,
      setValue,
      defaultValue
    };
  }, [namespace, key, setValue, defaultValue]);
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
  for (const key of namespaceTransientStore) {
    if (key && key.startsWith(namespace)) {
      const { setValue, defaultValue } = namespaceTransientStore[key];
      setValue(defaultValue);
    }
  }
}
