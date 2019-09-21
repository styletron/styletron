import { StandardProperties, VendorProperties, ObsoleteProperties, SvgProperties, AnimationNameProperty as CTAnimationNameProperty, FontFamilyProperty as CTFontFamilyProperty, FontFace as CTFontFace } from "csstype";
export interface KeyframesPercentageObject {
    [key: string]: Properties;
}
export declare type KeyframesObject = KeyframesPercentageObject & {
    from?: Properties;
    to?: Properties;
};
export declare type AnimationNameProperty = CTAnimationNameProperty | KeyframesObject;
export declare type FontFace = CTFontFace;
export declare type FontFamilyProperty = CTFontFamilyProperty | FontFace;
declare type TLength = string | 0;
export declare type Properties = {
    animationName?: AnimationNameProperty;
    fontFamily?: FontFamilyProperty | FontFamilyProperty[];
    MozAnimationName?: AnimationNameProperty;
    WebkitAnimationName?: AnimationNameProperty;
    OAnimationName?: AnimationNameProperty;
} & Omit<StandardProperties<TLength> & VendorProperties<TLength> & ObsoleteProperties<TLength> & SvgProperties<TLength>, 'animationName' | 'fontFamily' | 'MozAnimationName' | 'WebkitAnimationName' | 'OAnimationName'>;
export {};
