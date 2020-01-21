// @flow

declare var __DEV__: boolean;

import hyphenate from "./hyphenate-style-name.js";
import {prefix} from "inline-style-prefixer";
import hash from "@emotion/hash";

import type {StyleObject} from "styletron-standard";
import type {cacheT} from "./server/server";

function buildCacheInput(
  styles: StyleObject,
  className: string,
  globalPrefix: string,
) {
  let plainBlock = "";
  let nestedBlock = "";
  for (const originalKey in styles) {
    const originalVal = styles[originalKey];
    if (originalVal === void 0 || originalVal === null) {
      continue;
    }
    if (typeof originalVal !== "object") {
      // Non-null and non-undefined primitive value
      if (__DEV__) {
        validateValueType(originalVal, originalKey);
      }
      const propValPair = `${hyphenate(
        originalKey,
      )}:${((originalVal: any): string)}`;
      const prefixed = prefix({[originalKey]: originalVal});
      for (const prefixedKey in prefixed) {
        const prefixedVal = prefixed[prefixedKey];
        const prefixedValType = typeof prefixedVal;
        if (prefixedValType === "string" || prefixedValType === "number") {
          const prefixedPair = `${hyphenate(prefixedKey)}:${prefixedVal}`;
          if (prefixedPair !== propValPair) {
            plainBlock += `${prefixedPair};`;
          }
        } else if (Array.isArray(prefixedVal)) {
          const hyphenated = hyphenate(prefixedKey);
          for (let i = 0; i < prefixedVal.length; i++) {
            const prefixedPair = `${hyphenated}:${prefixedVal[i]}`;
            if (prefixedPair !== propValPair) {
              plainBlock += `${prefixedPair};`;
            }
          }
        }
      }
      plainBlock += `${propValPair};`;
    } else if (originalKey[0] === ":") {
      nestedBlock += `.${globalPrefix}css-${className}${originalKey}{${buildCacheInput(
        originalVal,
        "",
        globalPrefix,
      )}}`;
    } else if (originalKey[0] === "@") {
      nestedBlock += `${originalKey}{${buildCacheInput(
        originalVal,
        className,
        globalPrefix,
      )}}`;
    } else {
      nestedBlock += `${originalKey}{${buildCacheInput(
        originalVal,
        "",
        globalPrefix,
      )}}`;
    }
  }
  // we are inside of a pseudo-selector
  if (!className) {
    return plainBlock;
  }
  if (!plainBlock) {
    return nestedBlock;
  }
  return `.${globalPrefix}css-${className}{${plainBlock}}${nestedBlock}`;
}

export default function injectStylePrefixed(
  styleCache: cacheT,
  styles: StyleObject,
  globalPrefix: string,
) {
  // is it already cached?
  const className = hash(JSON.stringify(styles));
  if (!styleCache[className]) {
    styleCache[className] = buildCacheInput(styles, className, globalPrefix);
  }
  return `${globalPrefix}css-${className}`;
}

function validateValueType(value, key) {
  if (
    value === null ||
    Array.isArray(value) ||
    (typeof value !== "number" && typeof value !== "string")
  ) {
    throw new Error(
      `Unsupported style value: ${JSON.stringify(
        value,
      )} used in property ${JSON.stringify(key)}`,
    );
  }
}
