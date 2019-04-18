// @flow

declare var __DEV__: boolean;

import hyphenate from "./hyphenate-style-name.js";
import {validateNoMixedHand} from "./validate-no-mixed-hand.js";
import prefixAll from "inline-style-prefixer/static";

import type {StyleObject} from "styletron-standard";

import {MultiCache} from "./cache.js";

const createPair = (key, value) =>
  `${hyphenate(key)}:${((value: any): string)}`;

export default function injectStylePrefixed(
  styleCache: MultiCache<{pseudo: string, block: string}>,
  styles: StyleObject,
  media: string,
  pseudo: string,
) {
  const cache = styleCache.getCache(media);
  let classString = "";
  for (const originalKey in styles) {
    const originalVal = styles[originalKey];
    const hasFallbacks = Array.isArray(originalVal);
    if (typeof originalVal !== "object" || hasFallbacks) {
      // Primitive value
      if (__DEV__) {
        if (hasFallbacks && originalKey.includes(":"))
          // eslint-disable-next-line no-console
          console.warn(
            "Providing fallback values to pseudo selectors may result in unexpected behavior.",
          );
        if (!hasFallbacks) validateValueType(originalVal);
        else {
          const fallbacks: any = originalVal;
          for (const fallback of fallbacks) validateValueType(fallback);
        }
      }
      const propValPair = createPair(originalKey, originalVal);
      const key = `${pseudo}${propValPair}`;
      const cachedId = cache.cache[key];
      if (cachedId !== void 0) {
        // cache hit
        classString += " " + cachedId;
        continue;
      } else {
        // cache miss
        let block = "";
        const addPrefixToBlock = value => {
          const originalPair = createPair(originalKey, value);
          const prefixed = prefixAll({[originalKey]: value});
          for (const prefixedKey in prefixed) {
            const prefixedVal = prefixed[prefixedKey];
            const prefixedValType = typeof prefixedVal;
            if (prefixedValType === "string" || prefixedValType === "number") {
              const prefixedPair = `${hyphenate(prefixedKey)}:${prefixedVal}`;
              if (prefixedPair !== originalPair) {
                block += `${prefixedPair};`;
              }
            } else if (Array.isArray(prefixedVal)) {
              const hyphenated = hyphenate(prefixedKey);
              for (let i = 0; i < prefixedVal.length; i++) {
                const prefixedPair = `${hyphenated}:${prefixedVal[i]}`;
                if (prefixedPair !== originalPair) {
                  block += `${prefixedPair};`;
                }
              }
            }
          }
        };
        if (hasFallbacks) {
          const fallbacks: any = originalVal;
          for (const fallback of fallbacks) {
            addPrefixToBlock(fallback);
            // ensure original prop/val is last for hydration
            block += `${createPair(originalKey, fallback)};`;
          }
        } else {
          addPrefixToBlock(originalVal);
          // ensure original prop/val is last for hydration
          block += propValPair;
        }
        const id = cache.addValue(key, {pseudo, block});
        classString += " " + id;
      }
    } else {
      // Object value
      if (originalKey[0] === ":") {
        classString +=
          " " +
          injectStylePrefixed(
            styleCache,
            originalVal,
            media,
            pseudo + originalKey,
          );
      } else if (originalKey.substring(0, 6) === "@media") {
        classString +=
          " " +
          injectStylePrefixed(
            styleCache,
            originalVal,
            originalKey.substr(7),
            pseudo,
          );
      }
    }
  }

  if (__DEV__) {
    const conflicts = validateNoMixedHand(styles);
    if (conflicts.length) {
      conflicts.forEach(({shorthand, longhand}) => {
        const short = JSON.stringify({[shorthand.property]: shorthand.value});
        const long = JSON.stringify({[longhand.property]: longhand.value});
        // eslint-disable-next-line no-console
        console.warn(
          `Styles \`${short}\` and \`${long}\` in object yielding class "${classString.slice(
            1,
          )}" may result in unexpected behavior. Mixing shorthand and longhand properties within the same style object is unsupported with atomic rendering.`,
        );
      });
    }
  }

  // remove leading space
  return classString.slice(1);
}

function validateValueType(value) {
  if (
    value === null ||
    Array.isArray(value) ||
    (typeof value !== "number" && typeof value !== "string")
  ) {
    throw new Error(`Unsupported style value: ${JSON.stringify(value)}`);
  }
}
