import React from "react";

const hashStr = str => {
  var hash = 0,
    i,
    chr;
  if (str.length === 0) return str;
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = joinHashes(hash, chr);
  }
  return hash;
};

const hashReactElement = ele => {
  return joinHashes(hash(ele["$$typeof"]), hash(ele.props));
};

const joinHashes = (hashA, hashB) => {
  // force to 32 bit number
  hashA |= 0;
  hashB |= 0;
  return ((hashA << 5) - hashA + hashB) | 0;
};

const hash = child => {
  if (child === undefined) {
    return 0;
  } else if (child === null) {
    return 1;
  } else if (typeof child === "boolean") {
    return 2 + child;
  } else if (typeof child === "number") {
    return child | 0;
  } else if (typeof child === "string") {
    return hashStr(child);
  } else if (typeof child === "function") {
    return hashStr(child.toString());
  } else if (Array.isArray(child)) {
    return child.map(hash).reduce(joinHashes, 0);
  } else if (React.isValidElement(child)) {
    return hashReactElement(child);
  } else if (typeof child === "object") {
    return Object.keys(child)
      .map(key => joinHashes(hash(key), hash(child[key])))
      .reduce(joinHashes, 0);
  } else if (typeof child === "symbol") {
    return hashStr(child.toString());
  } else {
    console.warn("hashing unknown type: ", child);
    return hashStr(child.toString());
  }
};

const useChildrenHash = children => {
  return React.useMemo(() => {
    return hash(children);
  }, [children]);
};

export default useChildrenHash;
