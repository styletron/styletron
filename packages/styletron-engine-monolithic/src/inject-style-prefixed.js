// @flow

declare var __DEV__: boolean;

import hyphenate from "./hyphenate-style-name.js";
import {prefix} from "inline-style-prefixer";

import type {StyleObject} from "styletron-standard";

export default function injectStylePrefixed(
  styles: StyleObject,
  className: string,
  globalPrefix: string,
) {
  const outputRules = [];
  let plainBlock = "";
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
      outputRules.push(
        `.${globalPrefix}css-${className}${originalKey}{${injectStylePrefixed(
          originalVal,
          "",
          globalPrefix,
        ).join("")}}`,
      );
    } else if (originalKey[0] === "@") {
      outputRules.push(
        `${originalKey}{${injectStylePrefixed(
          originalVal,
          className,
          globalPrefix,
        ).join("")}}`,
      );
    } else {
      outputRules.push(
        `${originalKey}{${injectStylePrefixed(
          originalVal,
          "",
          globalPrefix,
        ).join("")}}`,
      );
    }
  }
  // we are inside of a pseudo-selector
  if (!className) {
    return [plainBlock];
  }
  if (!plainBlock) {
    return outputRules;
  }
  return [`.${globalPrefix}css-${className}{${plainBlock}}`, ...outputRules];
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
