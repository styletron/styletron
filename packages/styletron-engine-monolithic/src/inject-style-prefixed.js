// @flow

declare var __DEV__: boolean;

import hyphenate from "./hyphenate-style-name.js";
import {prefix} from "inline-style-prefixer";

import type {StyleObject} from "styletron-standard";

function injectStylePrefixedNested(
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
      nestedBlock += `.${globalPrefix}css-${className}${originalKey}{${injectStylePrefixedNested(
        originalVal,
        "",
        globalPrefix,
      )}}`;
    } else if (originalKey[0] === "@") {
      nestedBlock += `${originalKey}{${injectStylePrefixedNested(
        originalVal,
        className,
        globalPrefix,
      )}}`;
    } else {
      nestedBlock += `${originalKey}{${injectStylePrefixedNested(
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
        `.${globalPrefix}css-${className}${originalKey}{${injectStylePrefixedNested(
          originalVal,
          "",
          globalPrefix,
        )}}`,
      );
    } else if (originalKey[0] === "@") {
      outputRules.push(
        `${originalKey}{${injectStylePrefixedNested(
          originalVal,
          className,
          globalPrefix,
        )}}`,
      );
    } else {
      outputRules.push(
        `${originalKey}{${injectStylePrefixedNested(
          originalVal,
          "",
          globalPrefix,
        )}}`,
      );
    }
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
