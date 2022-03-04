// @flow

declare var __DEV__: boolean;

import hyphenate from "./hyphenate-style-name.js";
import {validateNoMixedHand} from "./validate-no-mixed-hand.js";
import {prefix as prefixCssDeclaration} from "stylis";

import type {StyleObject} from "styletron-standard";

export default function injectStylePrefixed(
  styles: StyleObject,
  selector: string,
  prefix: string,
  strict: boolean,
) {
  let rules = "";
  let classes = [];

  for (const key in styles) {
    const value = styles[key];

    if (value === void 0 || value === null) {
      continue;
    }

    if (typeof value !== "object") {
      if (__DEV__) {
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

      const hyphenatedProperty = hyphenate(key);
      const cssDeclaration = hyphenatedProperty + ":" + value + ";";
      const prefixed = prefixCssDeclaration(
        cssDeclaration,
        hyphenatedProperty.length,
      );
      rules += prefixed;
      if (prefixed[prefixed.length - 1] !== ";") {
        rules += ";";
      }
      continue;
    }

    if (key[0] === ":") {
      classes = [
        ...classes,
        ...injectStylePrefixed(value, selector + key, prefix, strict),
      ];
      continue;
    }

    if (key[0] === "@") {
      const nestedRules = injectStylePrefixed(value, selector, prefix, strict);
      classes = [...classes, key + "{" + nestedRules.join("") + "}"];
      continue;
    }

    classes = [
      ...classes,
      key + "{" + injectStylePrefixed(value, "", prefix, strict).join("") + "}",
    ];
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
          `Styles \`${short}\` and \`${long}\` in object yielding class "${selector}" may result in unexpected behavior. Mixing shorthand and longhand properties within the same style object is unsupported with atomic rendering.`,
        );
      });
    }
  }

  // used to handle 'exact' selectors like 'div' or referencing another class name like '.css-abc123:hover'
  // selector is applied in the parent recursive function call.
  if (!selector) {
    return [rules];
  }

  const result = [];
  if (rules) {
    result.push(`.${prefix}css-${selector}{${rules}}`);
  }
  return [...result, ...classes];
}
