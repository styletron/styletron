// // @flow
//
// // import type {
// //   StandardProperties,
// //   VendorProperties,
// //   ObsoleteProperties,
// //   SvgProperties,
// //   AnimationNameProperty as CTAnimationNameProperty,
// //   FontFamilyProperty as CTFontFamilyProperty,
// //   FontFace as CTFontFace,
// // } from "@rtsao/csstype";
//
//
// export
//
// export type KeyframesObject = {|
//   from?: Properties,
//   to?: Properties,
//   [string]: Properties,
// |};
//
// export type AnimationNameProperty = CTAnimationNameProperty | KeyframesObject;
//
// export type FontFace = CTFontFace;
//
// export type FontFamilyProperty = CTFontFamilyProperty | FontFace;
//
// export type Properties = {|
//   ...StandardProperties<TLength>,
//   ...VendorProperties<TLength>,
//   ...ObsoleteProperties<TLength>,
//   ...SvgProperties<TLength>,
//   animationName?: AnimationNameProperty,
//   fontFamily?: FontFamilyProperty | FontFamilyProperty[],
//   MozAnimationName?: AnimationNameProperty,
//   WebkitAnimationName?: AnimationNameProperty,
//   OAnimationName?: AnimationNameProperty,
// |};
