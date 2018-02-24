// @flow

import test from "tape";

import {validateNoMixedHand} from "../validate-no-mixed-hand.js";

test("validateNoMixedHand", t => {
  t.deepEqual(
    validateNoMixedHand({
      border: "red",
      borderColor: "blue",
      borderTopColor: "green"
    }),
    [
      {
        shorthand: {property: "border", value: "red"},
        longhand: {property: "borderTopColor", value: "green"}
      },
      {
        shorthand: {property: "border", value: "red"},
        longhand: {property: "borderColor", value: "blue"}
      },
      {
        shorthand: {property: "borderColor", value: "blue"},
        longhand: {property: "borderTopColor", value: "green"}
      }
    ]
  );
  t.end();
});
