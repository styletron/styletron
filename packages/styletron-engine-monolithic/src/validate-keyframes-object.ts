// @flow

/* eslint-disable no-console */

const validAnimationState = /^(from|to|\+?(\d*\.)?\d+%)(\s*,\s*(from|to|\+?(\d*\.)?\d+%))*$/;

export default function validateKeyframesObject(keyframes: Object) {
  let valid = true;
  for (const animationState in keyframes) {
    const value = keyframes[animationState];
    if (!validAnimationState.test(animationState)) {
      valid = false;
      console.warn(
        `Warning: property "${animationState}" in keyframes object ${JSON.stringify(
          keyframes,
        )} is not a valid. Must be "from", "to", or a percentage.`,
      );
    }
    if (typeof value !== "object") {
      valid = false;
      console.warn(
        `Warning: value for "${animationState}" property in keyframes object ${JSON.stringify(
          keyframes,
        )} must be an object. Instead it was a ${typeof value}.`,
      );
    }
    if (!valid) {
      console.warn(
        `Warning: object used as value for "animationName" style is invalid:`,
        keyframes,
      );
    }
  }
}
