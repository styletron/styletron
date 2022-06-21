import type {
  StandardProperties,
  VendorProperties,
  ObsoleteProperties,
  SvgProperties,
  Property,
  AtRule,
} from "csstype";

export interface KeyframesPercentageObject {
  [key: string]: Properties;
}

export type KeyframesObject = KeyframesPercentageObject & {
  from?: Properties;
  to?: Properties;
};

export type AnimationNameProperty = Property.AnimationName | KeyframesObject;

export type FontFace = AtRule.FontFace;

export type FontFamilyProperty = Property.FontFamily | FontFace;

type TLength = string | 0;
export type Properties = {
  animationName?: AnimationNameProperty;
  fontFamily?: FontFamilyProperty | FontFamilyProperty[];
  MozAnimationName?: AnimationNameProperty;
  WebkitAnimationName?: AnimationNameProperty;
  OAnimationName?: AnimationNameProperty;
} & Omit<
  StandardProperties<TLength> &
    VendorProperties<TLength> &
    ObsoleteProperties<TLength> &
    SvgProperties<TLength>,
  | "animationName"
  | "fontFamily"
  | "MozAnimationName"
  | "WebkitAnimationName"
  | "OAnimationName"
>;
