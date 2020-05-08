declare var __DEV__: boolean;

import hyphenate from "./hyphenate-style-name";
import {validateNoMixedHand} from "./validate-no-mixed-hand";
import {prefix} from "inline-style-prefixer";

import type {StyleObject} from "styletron-standard";

export default function injectStylePrefixed(
  styles: StyleObject,
  className: string,
  globalPrefix: string,
  strict: boolean,
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
      const propValPair = `${hyphenate(originalKey)}:${
        (originalVal as any) as string
      }`;
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
          strict,
        ).join("")}}`,
      );
    } else if (originalKey[0] === "@") {
      outputRules.push(
        `${originalKey}{${injectStylePrefixed(
          originalVal,
          className,
          globalPrefix,
          strict,
        ).join("")}}`,
      );
    } else {
      outputRules.push(
        `${originalKey}{${injectStylePrefixed(
          originalVal,
          "",
          globalPrefix,
          strict,
        ).join("")}}`,
      );
    }
  }
  // strict mode checks for mixed long/shorthands to keep compatibility with atomic engine
  if (strict && __DEV__) {
    const conflicts = validateNoMixedHand(styles);
    if (conflicts.length) {
      conflicts.forEach(({shorthand, longhand}) => {
        const short = JSON.stringify({[shorthand.property]: shorthand.value});
        const long = JSON.stringify({[longhand.property]: longhand.value});
        // eslint-disable-next-line no-console
        console.warn(
          `Styles \`${short}\` and \`${long}\` in object yielding class "${className}" may result in unexpected behavior. Mixing shorthand and longhand properties within the same style object is unsupported with atomic rendering.`,
        );
      });
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
