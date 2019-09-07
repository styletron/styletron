import type {
  StandardProperties,
  VendorProperties,
  ObsoleteProperties,
  SvgProperties,
  AnimationNameProperty as CTAnimationNameProperty,
  FontFamilyProperty as CTFontFamilyProperty,
  FontFace as CTFontFace,
} from "@rtsao/csstype";

export interface KeyframesPercentageObject {
  [key: string]: Properties;
}

export type KeyframesObject = KeyframesPercentageObject & {
  from?: Properties;
  to?: Properties;
};

export type AnimationNameProperty = CTAnimationNameProperty | KeyframesObject;

export type FontFace = CTFontFace;

export type FontFamilyProperty = CTFontFamilyProperty | FontFace;

type TLength = string | 0;
export type Properties = {
  animationName?: AnimationNameProperty;
  fontFamily?: FontFamilyProperty | FontFamilyProperty[];
  MozAnimationName?: AnimationNameProperty;
  WebkitAnimationName?: AnimationNameProperty;
  OAnimationName?: AnimationNameProperty;
} & Omit<StandardProperties<TLength> &
  VendorProperties<TLength> &
  ObsoleteProperties<TLength> &
  SvgProperties<TLength>,
  'animationName' |
  'fontFamily' |
  'MozAnimationName' |
  'WebkitAnimationName' |
  'OAnimationName'
  >;
