import {validateNoMixedHand} from "../validate-no-mixed-hand";

import sortMq from "../sort-css-media-queries";

test("validateNoMixedHand", () => {
  expect(
    validateNoMixedHand({
      border: "red",
      borderColor: "blue",
      borderTopColor: "green",
    }),
  ).toEqual([
    {
      shorthand: {property: "border", value: "red"},
      longhand: {property: "borderTopColor", value: "green"},
    },
    {
      shorthand: {property: "border", value: "red"},
      longhand: {property: "borderColor", value: "blue"},
    },
    {
      shorthand: {property: "borderColor", value: "blue"},
      longhand: {property: "borderTopColor", value: "green"},
    },
  ]);
});

test("sortMq simple", () => {
  const receivedOrder = [
    "screen and (max-width: 640px)",
    "screen and (min-width: 980px)",
    "screen and (max-width: 980px)",
    "screen and (max-width: 768px)",
    "screen and (min-width: 640px)",
    "screen and (min-width: 1280px)",
    "screen and (min-width: 768px)",
    "screen and (max-width: 1280px)",
  ];

  const expectedOrder = [
    "screen and (min-width: 640px)",
    "screen and (min-width: 768px)",
    "screen and (min-width: 980px)",
    "screen and (min-width: 1280px)",
    "screen and (max-width: 1280px)",
    "screen and (max-width: 980px)",
    "screen and (max-width: 768px)",
    "screen and (max-width: 640px)",
  ];
  expect(receivedOrder.sort(sortMq)).toEqual(expectedOrder);
});

test("sortMq simple 2", () => {
  const receivedOrder = [
    "screen and (max-width: 640px)",
    "screen and (max-width: 640px)",
    "screen and (min-width: 1280px)",
    "screen and (max-width: 640px)",
  ];

  const expectedOrder = [
    "screen and (min-width: 1280px)",
    "screen and (max-width: 640px)",
    "screen and (max-width: 640px)",
    "screen and (max-width: 640px)",
  ];
  expect(receivedOrder.sort(sortMq)).toEqual(expectedOrder);
});

test("sortMq no media type", () => {
  const receivedOrder = [
    "(min-width: 980px)",
    "(min-width: 640px)",
    "(min-width: 768px)",
  ];

  const expectedOrder = [
    "(min-width: 640px)",
    "(min-width: 768px)",
    "(min-width: 980px)",
  ];
  expect(receivedOrder.sort(sortMq)).toEqual(expectedOrder);
});

test("sortMq without dimension", () => {
  const receivedOrder = [
    "tv",
    "print and (orientation: landscape)",
    "print and (orientation: portrait)",
    "print and (orientation: portrait)",
    "screen and (orientation: landscape)",
    "print",
    "screen and (orientation: portrait)",
    "print and (orientation: landscape)",
    "print and (orientation: portrait)",
  ];
  const expectedOrder = [
    "screen and (orientation: landscape)",
    "screen and (orientation: portrait)",
    "tv",
    "print",
    "print and (orientation: landscape)",
    "print and (orientation: landscape)",
    "print and (orientation: portrait)",
    "print and (orientation: portrait)",
    "print and (orientation: portrait)",
  ];
  expect(receivedOrder.sort(sortMq)).toEqual(expectedOrder);
});

test("mixed", () => {
  const receivedOrder = [
    "tv",
    "print and (orientation: landscape)",
    "screen and (min-width: 1280px)",
    "screen and (max-width: 640px)",
    "screen and (orientation: landscape)",
    "print",
    "screen and (orientation: portrait)",
    "screen and (min-width: 768px)",
    "screen and (max-width: 1280px)",
    "print and (orientation: portrait)",
  ];
  const expectedOrder = [
    "screen and (min-width: 768px)",
    "screen and (min-width: 1280px)",
    "screen and (max-width: 1280px)",
    "screen and (max-width: 640px)",
    "screen and (orientation: landscape)",
    "screen and (orientation: portrait)",
    "tv",
    "print",
    "print and (orientation: landscape)",
    "print and (orientation: portrait)",
  ];
  expect(receivedOrder.sort(sortMq)).toEqual(expectedOrder);
});
