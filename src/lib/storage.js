const APP_PREFIX_KEY = "__FENRIS__";

function storageKey(namespace, key) {
  return APP_PREFIX_KEY + namespace + "$" + key;
}

export function keys(namespace) {
  return [...Array(window.localStorage.length).keys()]
    .map(i => window.localStorage.key(i))
    .filter(key => key && key.startsWith(storageKey(namespace, "")))
    .map(key => key.replace(storageKey(namespace, ""), ""));
}

export function get(namespace, key) {
  const localStorageKey = storageKey(namespace, key);
  const rawValue = window.localStorage.getItem(localStorageKey);
  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.warn("Supressing invalid persisted state", {
      error,
      namespace,
      key,
      localStorageKey,
      rawValue
    });
  }
}

export function set(namespace, key, value) {
  return window.localStorage.setItem(
    storageKey(namespace, key),
    JSON.stringify(value)
  );
}

export function del(namespace, key) {
  return window.localStorage.removeItem(storageKey(namespace, key));
}

export function clear(namespace) {
  keys(namespace).forEach(key => del(namespace, key));
}
