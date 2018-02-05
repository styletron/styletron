import hyphenate from "./hyphenate-style-name";
import prefixAll from "inline-style-prefixer/static";

const prefixedBlockCache = {};

export default function injectStylePrefixed(
  styleCache,
  styles,
  media,
  pseudo,
  cache = prefixedBlockCache
) {
  let classString = "";
  for (const originalKey in styles) {
    const originalVal = styles[originalKey];
    const originalValType = typeof originalVal;
    const isPrimitiveVal =
      originalValType === "string" || originalValType === "number";
    if (isPrimitiveVal || Array.isArray(originalVal)) {
      let block = "";
      if (
        isPrimitiveVal &&
        cache.hasOwnProperty(originalKey) &&
        cache[originalKey].hasOwnProperty(originalVal)
      ) {
        block = cache[originalKey][originalVal];
      } else {
        const prefixed = prefixAll({[originalKey]: originalVal});
        for (const prefixedKey in prefixed) {
          const prefixedVal = prefixed[prefixedKey];
          const prefixedValType = typeof prefixedVal;
          if (prefixedValType === "string" || prefixedValType === "number") {
            block += `${hyphenate(prefixedKey)}:${prefixedVal};`;
            continue;
          }
          if (Array.isArray(prefixedVal)) {
            const hyphenated = hyphenate(prefixedKey);
            for (let i = 0; i < prefixedVal.length; i++) {
              block += `${hyphenated}:${prefixedVal[i]};`;
            }
            continue;
          }
        }
        block = block.slice(0, -1); // Remove trailing semicolon
        if (isPrimitiveVal) {
          if (!cache.hasOwnProperty(originalKey)) {
            cache[originalKey] = {};
          }
          cache[originalKey][originalVal] = block;
        }
      }
      classString +=
        " " +
        styleCache.addBlock({
          block,
          media,
          pseudo
        });
    }
    if (originalValType === "object") {
      if (originalKey[0] === ":") {
        classString +=
          " " +
          injectStylePrefixed(
            styleCache,
            originalVal,
            media,
            originalKey,
            cache
          );
        continue;
      }
      if (originalKey.substring(0, 6) === "@media") {
        classString +=
          " " +
          injectStylePrefixed(
            styleCache,
            originalVal,
            originalKey.substr(7),
            pseudo,
            cache
          );
        continue;
      }
    }
  }
  // remove leading space on way out
  return classString.slice(1);
}
