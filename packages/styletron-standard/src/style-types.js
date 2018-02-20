// @flow

export type StandardLonghandProperties<TLength = string | number> = {
  alignContent?: AlignContentProperty,
  alignItems?: AlignItemsProperty,
  alignSelf?: AlignSelfProperty,
  animationDelay?: GlobalsString,
  animationDirection?: AnimationDirectionProperty,
  animationDuration?: GlobalsString,
  animationFillMode?: AnimationFillModeProperty,
  animationIterationCount?: AnimationIterationCountProperty,
  animationName?: AnimationNameProperty,
  animationPlayState?: AnimationPlayStateProperty,
  animationTimingFunction?: AnimationTimingFunctionProperty,
  appearance?: AppearanceProperty,
  azimuth?: AzimuthProperty,
  backdropFilter?: BackdropFilterProperty,
  backfaceVisibility?: BackfaceVisibilityProperty,
  backgroundAttachment?: BackgroundAttachmentProperty,
  backgroundBlendMode?: BackgroundBlendModeProperty,
  backgroundClip?: BackgroundClipProperty,
  backgroundColor?: BackgroundColorProperty,
  backgroundImage?: BackgroundImageProperty,
  backgroundOrigin?: BackgroundOriginProperty,
  backgroundPosition?: BackgroundPositionProperty<TLength>,
  backgroundPositionX?: BackgroundPositionXProperty<TLength>,
  backgroundPositionY?: BackgroundPositionYProperty<TLength>,
  backgroundRepeat?: BackgroundRepeatProperty,
  backgroundSize?: BackgroundSizeProperty<TLength>,
  blockSize?: GlobalsString,
  borderBlockEndColor?: GlobalsString,
  borderBlockEndStyle?: GlobalsString,
  borderBlockEndWidth?: GlobalsString,
  borderBlockStartColor?: GlobalsString,
  borderBlockStartStyle?: GlobalsString,
  borderBlockStartWidth?: GlobalsString,
  borderBottomColor?: BorderBottomColorProperty,
  borderBottomLeftRadius?: BorderBottomLeftRadiusProperty<TLength>,
  borderBottomRightRadius?: BorderBottomRightRadiusProperty<TLength>,
  borderBottomStyle?: BorderBottomStyleProperty,
  borderBottomWidth?: BorderBottomWidthProperty<TLength>,
  borderCollapse?: BorderCollapseProperty,
  borderImageOutset?: BorderImageOutsetProperty<TLength>,
  borderImageRepeat?: BorderImageRepeatProperty,
  borderImageSlice?: BorderImageSliceProperty,
  borderImageSource?: BorderImageSourceProperty,
  borderImageWidth?: BorderImageWidthProperty<TLength>,
  borderInlineEndColor?: GlobalsString,
  borderInlineEndStyle?: GlobalsString,
  borderInlineEndWidth?: GlobalsString,
  borderInlineStartColor?: GlobalsString,
  borderInlineStartStyle?: GlobalsString,
  borderInlineStartWidth?: GlobalsString,
  borderLeftColor?: BorderLeftColorProperty,
  borderLeftStyle?: BorderLeftStyleProperty,
  borderLeftWidth?: BorderLeftWidthProperty<TLength>,
  borderRightColor?: BorderRightColorProperty,
  borderRightStyle?: BorderRightStyleProperty,
  borderRightWidth?: BorderRightWidthProperty<TLength>,
  borderSpacing?: BorderSpacingProperty<TLength>,
  borderTopColor?: BorderTopColorProperty,
  borderTopLeftRadius?: BorderTopLeftRadiusProperty<TLength>,
  borderTopRightRadius?: BorderTopRightRadiusProperty<TLength>,
  borderTopStyle?: BorderTopStyleProperty,
  borderTopWidth?: BorderTopWidthProperty<TLength>,
  bottom?: BottomProperty<TLength>,
  boxAlign?: BoxAlignProperty,
  boxDecorationBreak?: BoxDecorationBreakProperty,
  boxDirection?: BoxDirectionProperty,
  boxFlex?: GlobalsNumber,
  boxFlexGroup?: GlobalsNumber,
  boxLines?: BoxLinesProperty,
  boxOrdinalGroup?: GlobalsNumber,
  boxOrient?: BoxOrientProperty,
  boxPack?: BoxPackProperty,
  boxShadow?: BoxShadowProperty<TLength>,
  boxSizing?: BoxSizingProperty,
  breakAfter?: BreakAfterProperty,
  breakBefore?: BreakBeforeProperty,
  breakInside?: BreakInsideProperty,
  captionSide?: CaptionSideProperty,
  caretColor?: CaretColorProperty,
  clear?: ClearProperty,
  clip?: ClipProperty,
  clipPath?: ClipPathProperty,
  color?: ColorProperty,
  columnCount?: ColumnCountProperty,
  columnFill?: ColumnFillProperty,
  columnGap?: ColumnGapProperty<TLength>,
  columnRuleColor?: ColumnRuleColorProperty,
  columnRuleStyle?: GlobalsString,
  columnRuleWidth?: GlobalsString,
  columnSpan?: ColumnSpanProperty,
  columnWidth?: ColumnWidthProperty<TLength>,
  contain?: ContainProperty,
  content?: ContentProperty,
  counterIncrement?: CounterIncrementProperty,
  counterReset?: CounterResetProperty,
  cursor?: CursorProperty,
  direction?: DirectionProperty,
  display?: DisplayProperty,
  displayInside?: DisplayInsideProperty,
  displayList?: DisplayListProperty,
  displayOutside?: DisplayOutsideProperty,
  emptyCells?: EmptyCellsProperty,
  filter?: FilterProperty,
  flexBasis?: FlexBasisProperty,
  flexDirection?: FlexDirectionProperty,
  flexGrow?: GlobalsNumber,
  flexShrink?: GlobalsNumber,
  flexWrap?: FlexWrapProperty,
  float?: FloatProperty,
  fontFamily?: FontFamilyProperty,
  fontFeatureSettings?: FontFeatureSettingsProperty,
  fontKerning?: FontKerningProperty,
  fontLanguageOverride?: FontLanguageOverrideProperty,
  fontVariationSettings?: FontVariationSettingsProperty,
  fontSize?: FontSizeProperty<TLength>,
  fontSizeAdjust?: FontSizeAdjustProperty,
  fontStretch?: FontStretchProperty,
  fontStyle?: FontStyleProperty,
  fontSynthesis?: FontSynthesisProperty,
  fontVariant?: FontVariantProperty,
  fontVariantAlternates?: FontVariantAlternatesProperty,
  fontVariantCaps?: FontVariantCapsProperty,
  fontVariantEastAsian?: FontVariantEastAsianProperty,
  fontVariantLigatures?: FontVariantLigaturesProperty,
  fontVariantNumeric?: FontVariantNumericProperty,
  fontVariantPosition?: FontVariantPositionProperty,
  fontWeight?: FontWeightProperty,
  gridAutoColumns?: GridAutoColumnsProperty<TLength>,
  gridAutoFlow?: GridAutoFlowProperty,
  gridAutoRows?: GridAutoRowsProperty<TLength>,
  gridColumnEnd?: GridColumnEndProperty,
  gridColumnGap?: GridColumnGapProperty<TLength>,
  gridColumnStart?: GridColumnStartProperty,
  gridRowEnd?: GridRowEndProperty,
  gridRowGap?: GridRowGapProperty<TLength>,
  gridRowStart?: GridRowStartProperty,
  gridTemplateAreas?: GridTemplateAreasProperty,
  gridTemplateColumns?: GridTemplateColumnsProperty<TLength>,
  gridTemplateRows?: GridTemplateRowsProperty<TLength>,
  hangingPunctuation?: HangingPunctuationProperty,
  height?: HeightProperty<TLength>,
  hyphens?: HyphensProperty,
  imageOrientation?: ImageOrientationProperty,
  imageRendering?: ImageRenderingProperty,
  imageResolution?: ImageResolutionProperty,
  imeMode?: ImeModeProperty,
  initialLetter?: InitialLetterProperty,
  initialLetterAlign?: InitialLetterAlignProperty,
  inlineSize?: GlobalsString,
  isolation?: IsolationProperty,
  justifyContent?: JustifyContentProperty,
  left?: LeftProperty<TLength>,
  letterSpacing?: LetterSpacingProperty<TLength>,
  lineBreak?: LineBreakProperty,
  lineHeight?: LineHeightProperty<TLength>,
  lineHeightStep?: LineHeightStepProperty<TLength>,
  listStyleImage?: ListStyleImageProperty,
  listStylePosition?: ListStylePositionProperty,
  listStyleType?: ListStyleTypeProperty,
  marginBlockEnd?: GlobalsString,
  marginBlockStart?: GlobalsString,
  marginBottom?: MarginBottomProperty<TLength>,
  marginInlineEnd?: GlobalsString,
  marginInlineStart?: GlobalsString,
  marginLeft?: MarginLeftProperty<TLength>,
  marginRight?: MarginRightProperty<TLength>,
  marginTop?: MarginTopProperty<TLength>,
  maskBorderMode?: MaskBorderModeProperty,
  maskBorderOutset?: MaskBorderOutsetProperty<TLength>,
  maskBorderRepeat?: MaskBorderRepeatProperty,
  maskBorderSlice?: MaskBorderSliceProperty,
  maskBorderSource?: MaskBorderSourceProperty,
  maskBorderWidth?: MaskBorderWidthProperty<TLength>,
  maskClip?: MaskClipProperty,
  maskComposite?: MaskCompositeProperty,
  maskImage?: MaskImageProperty,
  maskMode?: MaskModeProperty,
  maskOrigin?: MaskOriginProperty,
  maskPosition?: MaskPositionProperty<TLength>,
  maskRepeat?: MaskRepeatProperty,
  maskSize?: MaskSizeProperty<TLength>,
  maskType?: MaskTypeProperty,
  maxBlockSize?: GlobalsString,
  maxHeight?: MaxHeightProperty<TLength>,
  maxInlineSize?: GlobalsString,
  maxWidth?: MaxWidthProperty<TLength>,
  minBlockSize?: GlobalsString,
  minHeight?: MinHeightProperty<TLength>,
  minInlineSize?: GlobalsString,
  minWidth?: MinWidthProperty<TLength>,
  mixBlendMode?: MixBlendModeProperty,
  objectFit?: ObjectFitProperty,
  objectPosition?: ObjectPositionProperty<TLength>,
  offsetAnchor?: OffsetAnchorProperty<TLength>,
  offsetBlockEnd?: GlobalsString,
  offsetBlockStart?: GlobalsString,
  offsetInlineEnd?: GlobalsString,
  offsetInlineStart?: GlobalsString,
  offsetDistance?: OffsetDistanceProperty<TLength>,
  offsetPath?: OffsetPathProperty,
  offsetPosition?: OffsetPositionProperty<TLength>,
  offsetRotate?: OffsetRotateProperty,
  opacity?: GlobalsNumber,
  order?: GlobalsNumber,
  orphans?: GlobalsNumber,
  outlineColor?: OutlineColorProperty,
  outlineOffset?: OutlineOffsetProperty<TLength>,
  outlineStyle?: OutlineStyleProperty,
  outlineWidth?: OutlineWidthProperty<TLength>,
  overflow?: OverflowProperty,
  overflowClipBox?: OverflowClipBoxProperty,
  overflowWrap?: OverflowWrapProperty,
  overflowX?: OverflowXProperty,
  overflowY?: OverflowYProperty,
  paddingBlockEnd?: GlobalsString,
  paddingBlockStart?: GlobalsString,
  paddingBottom?: PaddingBottomProperty<TLength>,
  paddingInlineEnd?: GlobalsString,
  paddingInlineStart?: GlobalsString,
  paddingLeft?: PaddingLeftProperty<TLength>,
  paddingRight?: PaddingRightProperty<TLength>,
  paddingTop?: PaddingTopProperty<TLength>,
  pageBreakAfter?: PageBreakAfterProperty,
  pageBreakBefore?: PageBreakBeforeProperty,
  pageBreakInside?: PageBreakInsideProperty,
  perspective?: PerspectiveProperty<TLength>,
  perspectiveOrigin?: PerspectiveOriginProperty<TLength>,
  pointerEvents?: PointerEventsProperty,
  position?: PositionProperty,
  quotes?: QuotesProperty,
  resize?: ResizeProperty,
  right?: RightProperty<TLength>,
  rubyAlign?: RubyAlignProperty,
  rubyMerge?: RubyMergeProperty,
  rubyPosition?: RubyPositionProperty,
  scrollBehavior?: ScrollBehaviorProperty,
  scrollSnapCoordinate?: ScrollSnapCoordinateProperty<TLength>,
  scrollSnapDestination?: ScrollSnapDestinationProperty<TLength>,
  scrollSnapPointsX?: ScrollSnapPointsXProperty,
  scrollSnapPointsY?: ScrollSnapPointsYProperty,
  scrollSnapType?: ScrollSnapTypeProperty,
  scrollSnapTypeX?: ScrollSnapTypeXProperty,
  scrollSnapTypeY?: ScrollSnapTypeYProperty,
  shapeImageThreshold?: GlobalsNumber,
  shapeMargin?: ShapeMarginProperty<TLength>,
  shapeOutside?: ShapeOutsideProperty,
  tabSize?: TabSizeProperty<TLength>,
  tableLayout?: TableLayoutProperty,
  textAlign?: TextAlignProperty,
  textAlignLast?: TextAlignLastProperty,
  textCombineUpright?: TextCombineUprightProperty,
  textDecorationColor?: TextDecorationColorProperty,
  textDecorationLine?: TextDecorationLineProperty,
  textDecorationSkip?: TextDecorationSkipProperty,
  textDecorationSkipInk?: TextDecorationSkipInkProperty,
  textDecorationStyle?: TextDecorationStyleProperty,
  textEmphasisColor?: TextEmphasisColorProperty,
  textEmphasisPosition?: GlobalsString,
  textEmphasisStyle?: TextEmphasisStyleProperty,
  textIndent?: TextIndentProperty<TLength>,
  textJustify?: TextJustifyProperty,
  textOrientation?: TextOrientationProperty,
  textOverflow?: TextOverflowProperty,
  textRendering?: TextRenderingProperty,
  textShadow?: TextShadowProperty<TLength>,
  textSizeAdjust?: TextSizeAdjustProperty,
  textTransform?: TextTransformProperty,
  textUnderlinePosition?: TextUnderlinePositionProperty,
  top?: TopProperty<TLength>,
  touchAction?: TouchActionProperty,
  transform?: TransformProperty,
  transformBox?: TransformBoxProperty,
  transformOrigin?: TransformOriginProperty<TLength>,
  transformStyle?: TransformStyleProperty,
  transitionDelay?: GlobalsString,
  transitionDuration?: GlobalsString,
  transitionProperty?: TransitionPropertyProperty,
  transitionTimingFunction?: TransitionTimingFunctionProperty,
  unicodeBidi?: UnicodeBidiProperty,
  userSelect?: UserSelectProperty,
  verticalAlign?: VerticalAlignProperty<TLength>,
  visibility?: VisibilityProperty,
  whiteSpace?: WhiteSpaceProperty,
  widows?: GlobalsNumber,
  width?: WidthProperty<TLength>,
  willChange?: WillChangeProperty,
  wordBreak?: WordBreakProperty,
  wordSpacing?: WordSpacingProperty<TLength>,
  wordWrap?: WordWrapProperty,
  writingMode?: WritingModeProperty,
  zIndex?: ZIndexProperty
};

export type StandardShorthandProperties<TLength = string | number> = {
  animation?: AnimationProperty,
  background?: BackgroundProperty<TLength>,
  border?: BorderProperty<TLength>,
  borderBlockEnd?: GlobalsString,
  borderBlockStart?: GlobalsString,
  borderBottom?: BorderBottomProperty<TLength>,
  borderColor?: BorderColorProperty,
  borderImage?: GlobalsString,
  borderInlineEnd?: GlobalsString,
  borderInlineStart?: GlobalsString,
  borderLeft?: BorderLeftProperty<TLength>,
  borderRadius?: BorderRadiusProperty<TLength>,
  borderRight?: BorderRightProperty<TLength>,
  borderStyle?: BorderStyleProperty,
  borderTop?: BorderTopProperty<TLength>,
  borderWidth?: BorderWidthProperty<TLength>,
  columnRule?: GlobalsString,
  columns?: GlobalsString,
  flex?: FlexProperty,
  flexFlow?: GlobalsString,
  font?: FontProperty,
  grid?: GlobalsString,
  gridArea?: GlobalsString,
  gridColumn?: GridColumnProperty,
  gridGap?: GlobalsString,
  gridRow?: GridRowProperty,
  gridTemplate?: GridTemplateProperty,
  listStyle?: GlobalsString,
  margin?: MarginProperty<TLength>,
  mask?: MaskProperty<TLength>,
  maskBorder?: GlobalsString,
  offset?: GlobalsString,
  outline?: GlobalsString,
  padding?: PaddingProperty<TLength>,
  textDecoration?: GlobalsString,
  textEmphasis?: GlobalsString,
  transition?: TransitionProperty
};

export type StandardProperties<
  TLength = string | number
> = StandardLonghandProperties<TLength> & StandardShorthandProperties<TLength>;

export type VendorLonghandProperties<TLength = string | number> = {
  msOverflowStyle?: MsOverflowStyleProperty,
  mozAppearance?: MozAppearanceProperty,
  mozBinding?: MozBindingProperty,
  mozBorderBottomColors?: MozBorderBottomColorsProperty,
  mozBorderLeftColors?: MozBorderLeftColorsProperty,
  mozBorderRightColors?: MozBorderRightColorsProperty,
  mozBorderTopColors?: MozBorderTopColorsProperty,
  mozContextProperties?: MozContextPropertiesProperty,
  mozFloatEdge?: MozFloatEdgeProperty,
  mozForceBrokenImageIcon?: GlobalsNumber,
  mozImageRegion?: MozImageRegionProperty,
  mozOrient?: MozOrientProperty,
  mozOutlineRadiusBottomleft?: GlobalsString,
  mozOutlineRadiusBottomright?: GlobalsString,
  mozOutlineRadiusTopleft?: GlobalsString,
  mozOutlineRadiusTopright?: GlobalsString,
  mozStackSizing?: MozStackSizingProperty,
  mozTextBlink?: MozTextBlinkProperty,
  mozUserFocus?: MozUserFocusProperty,
  mozUserInput?: MozUserInputProperty,
  mozUserModify?: MozUserModifyProperty,
  mozWindowDragging?: MozWindowDraggingProperty,
  mozWindowShadow?: MozWindowShadowProperty,
  webkitBorderBeforeColor?: GlobalsString,
  webkitBorderBeforeStyle?: GlobalsString,
  webkitBorderBeforeWidth?: GlobalsString,
  webkitBoxReflect?: WebkitBoxReflectProperty<TLength>,
  webkitMaskAttachment?: WebkitMaskAttachmentProperty,
  webkitMaskClip?: WebkitMaskClipProperty,
  webkitMaskComposite?: WebkitMaskCompositeProperty,
  webkitMaskImage?: GlobalsString,
  webkitMaskOrigin?: WebkitMaskOriginProperty,
  webkitMaskPosition?: WebkitMaskPositionProperty<TLength>,
  webkitMaskPositionX?: WebkitMaskPositionXProperty<TLength>,
  webkitMaskPositionY?: WebkitMaskPositionYProperty<TLength>,
  webkitMaskRepeat?: WebkitMaskRepeatProperty,
  webkitMaskRepeatX?: WebkitMaskRepeatXProperty,
  webkitMaskRepeatY?: WebkitMaskRepeatYProperty,
  webkitOverflowScrolling?: WebkitOverflowScrollingProperty,
  webkitTapHighlightColor?: WebkitTapHighlightColorProperty,
  webkitTextFillColor?: WebkitTextFillColorProperty,
  webkitTextStrokeColor?: WebkitTextStrokeColorProperty,
  webkitTextStrokeWidth?: WebkitTextStrokeWidthProperty<TLength>,
  webkitTouchCallout?: WebkitTouchCalloutProperty
};

export type VendorShorthandProperties<TLength = string | number> = {
  mozOutlineRadius?: GlobalsString,
  webkitBorderBefore?: GlobalsString,
  webkitMask?: GlobalsString,
  webkitTextStroke?: WebkitTextStrokeProperty<TLength>
};

export type VendorProperties<
  TLength = string | number
> = VendorLonghandProperties<TLength> & VendorShorthandProperties<TLength>;

export type Properties<TLength = string | number> = StandardProperties<
  TLength
> &
  VendorProperties<TLength>;

export type CounterStyle = {
  additiveSymbols?: string,
  fallback?: string,
  negative?: string,
  pad?: string,
  prefix?: string,
  range?: CounterStyleRangeProperty,
  speakAs?: CounterStyleSpeakAsProperty,
  suffix?: string,
  symbols?: string,
  system?: CounterStyleSystemProperty
};

export type FontFace = {
  fontDisplay?: FontFaceFontDisplayProperty,
  fontFamily?: string,
  fontFeatureSettings?: FontFaceFontFeatureSettingsProperty,
  fontVariationSettings?: FontFaceFontVariationSettingsProperty,
  fontStretch?: FontFaceFontStretchProperty,
  fontStyle?: FontFaceFontStyleProperty,
  fontWeight?: FontFaceFontWeightProperty,
  fontVariant?: FontFaceFontVariantProperty,
  src?: string,
  unicodeRange?: string
};

export type Page<TLength = string | number> = {
  bleed?: PageBleedProperty<TLength>,
  marks?: PageMarksProperty
};

export type Viewport<TLength = string | number> = {
  height?: ViewportHeightProperty<TLength>,
  maxHeight?: ViewportMaxHeightProperty<TLength>,
  maxWidth?: ViewportMaxWidthProperty<TLength>,
  maxZoom?: ViewportMaxZoomProperty,
  minHeight?: ViewportMinHeightProperty<TLength>,
  minWidth?: ViewportMinWidthProperty<TLength>,
  minZoom?: ViewportMinZoomProperty,
  orientation?: ViewportOrientationProperty,
  userZoom?: ViewportUserZoomProperty,
  width?: ViewportWidthProperty<TLength>,
  zoom?: ViewportZoomProperty
};

export type AtRules =
  | "@charset"
  | "@counter-style"
  | "@document"
  | "@font-face"
  | "@font-feature-values"
  | "@import"
  | "@keyframes"
  | "@media"
  | "@namespace"
  | "@page"
  | "@supports"
  | "@viewport";

export type AdvancedPseudos =
  | ":-moz-any"
  | ":-webkit-any"
  | "::cue"
  | ":dir"
  | ":lang"
  | ":not"
  | ":nth-child"
  | ":nth-last-child"
  | ":nth-last-of-type"
  | ":nth-of-type";

export type SimplePseudos =
  | "::-moz-progress-bar"
  | "::-moz-range-progress"
  | "::-moz-range-thumb"
  | "::-moz-range-track"
  | "::-ms-fill"
  | "::-ms-fill-lower"
  | "::-ms-fill-upper"
  | "::-ms-thumb"
  | "::-ms-track"
  | "::-webkit-progress-bar"
  | "::-webkit-progress-inner-value"
  | "::-webkit-progress-value"
  | "::-webkit-slider-runnable-track"
  | "::-webkit-slider-thumb"
  | "::after"
  | "::backdrop"
  | "::before"
  | "::cue"
  | "::first-letter"
  | "::first-line"
  | "::grammar-error"
  | "::placeholder"
  | "::selection"
  | "::spelling-error"
  | ":active"
  | ":after"
  | ":any-link"
  | ":before"
  | ":checked"
  | ":default"
  | ":defined"
  | ":disabled"
  | ":empty"
  | ":enabled"
  | ":first"
  | ":first-child"
  | ":first-letter"
  | ":first-line"
  | ":first-of-type"
  | ":focus"
  | ":focus-within"
  | ":fullscreen"
  | ":hover"
  | ":in-range"
  | ":indeterminate"
  | ":invalid"
  | ":last-child"
  | ":last-of-type"
  | ":left"
  | ":link"
  | ":only-child"
  | ":only-of-type"
  | ":optional"
  | ":out-of-range"
  | ":placeholder-shown"
  | ":read-only"
  | ":read-write"
  | ":required"
  | ":right"
  | ":root"
  | ":scope"
  | ":target"
  | ":valid"
  | ":visited";

export type Pseudos = AdvancedPseudos | SimplePseudos;

type Globals = "inherit" | "initial" | "unset";

type GlobalsString = Globals | string;

type GlobalsNumber = Globals | number;

type AlignContentProperty =
  | Globals
  | "center"
  | "flex-end"
  | "flex-start"
  | "space-around"
  | "space-between"
  | "space-evenly"
  | "stretch";

type AlignItemsProperty =
  | Globals
  | "baseline"
  | "center"
  | "flex-end"
  | "flex-start"
  | "stretch";

type AlignSelfProperty =
  | Globals
  | "auto"
  | "baseline"
  | "center"
  | "flex-end"
  | "flex-start"
  | "stretch";

type AnimationDirectionProperty = Globals | SingleAnimationDirection;

type AnimationFillModeProperty = Globals | SingleAnimationFillMode;

type AnimationIterationCountProperty = Globals | SingleAnimationIterationCount;

type AnimationNameProperty = Globals | "none" | string;

type AnimationPlayStateProperty = Globals | SingleAnimationPlayState;

type AnimationTimingFunctionProperty = Globals | SingleTimingFunction;

type AppearanceProperty = Globals | "auto" | "none";

type AzimuthProperty =
  | Globals
  | "behind"
  | "center"
  | "center-left"
  | "center-right"
  | "far-left"
  | "far-right"
  | "left"
  | "left-side"
  | "leftwards"
  | "right"
  | "right-side"
  | "rightwards"
  | string;

type BackdropFilterProperty = Globals | "none" | string;

type BackfaceVisibilityProperty = Globals | "hidden" | "visible";

type BackgroundAttachmentProperty = Globals | Attachment;

type BackgroundBlendModeProperty = Globals | BlendMode;

type BackgroundClipProperty = Globals | Box;

type BackgroundColorProperty = Globals | Color;

type BackgroundImageProperty = Globals | BgImage;

type BackgroundOriginProperty = Globals | Box;

type BackgroundPositionProperty<TLength> = Globals | BgPosition<TLength>;

type BackgroundPositionXProperty<TLength> =
  | Globals
  | LengthPercentage<TLength>
  | "center"
  | "left"
  | "right"
  | "x-end"
  | "x-start"
  | string;

type BackgroundPositionYProperty<TLength> =
  | Globals
  | LengthPercentage<TLength>
  | "bottom"
  | "center"
  | "top"
  | "y-end"
  | "y-start"
  | string;

type BackgroundRepeatProperty = Globals | RepeatStyle;

type BackgroundSizeProperty<TLength> = Globals | BgSize<TLength>;

type BorderBottomColorProperty = Globals | Color;

type BorderBottomLeftRadiusProperty<TLength> =
  | Globals
  | LengthPercentage<TLength>;

type BorderBottomRightRadiusProperty<TLength> =
  | Globals
  | LengthPercentage<TLength>;

type BorderBottomStyleProperty = Globals | BrStyle;

type BorderBottomWidthProperty<TLength> = Globals | BrWidth<TLength>;

type BorderCollapseProperty = Globals | "collapse" | "separate";

type BorderImageOutsetProperty<TLength> = Globals | TLength | number;

type BorderImageRepeatProperty =
  | Globals
  | "repeat"
  | "round"
  | "space"
  | "stretch";

type BorderImageSliceProperty = Globals | NumberPercentage | "fill" | string;

type BorderImageSourceProperty = Globals | "none" | string;

type BorderImageWidthProperty<TLength> =
  | Globals
  | LengthPercentage<TLength>
  | "auto"
  | number;

type BorderLeftColorProperty = Globals | Color;

type BorderLeftStyleProperty = Globals | BrStyle;

type BorderLeftWidthProperty<TLength> = Globals | BrWidth<TLength>;

type BorderRightColorProperty = Globals | Color;

type BorderRightStyleProperty = Globals | BrStyle;

type BorderRightWidthProperty<TLength> = Globals | BrWidth<TLength>;

type BorderSpacingProperty<TLength> = Globals | TLength | string;

type BorderTopColorProperty = Globals | Color;

type BorderTopLeftRadiusProperty<TLength> = Globals | LengthPercentage<TLength>;

type BorderTopRightRadiusProperty<TLength> =
  | Globals
  | LengthPercentage<TLength>;

type BorderTopStyleProperty = Globals | BrStyle;

type BorderTopWidthProperty<TLength> = Globals | BrWidth<TLength>;

type BottomProperty<TLength> = Globals | TLength | "auto" | string;

type BoxAlignProperty =
  | Globals
  | "baseline"
  | "center"
  | "end"
  | "start"
  | "stretch";

type BoxDecorationBreakProperty = Globals | "clone" | "slice";

type BoxDirectionProperty = Globals | "inherit" | "normal" | "reverse";

type BoxLinesProperty = Globals | "multiple" | "single";

type BoxOrientProperty =
  | Globals
  | "block-axis"
  | "horizontal"
  | "inherit"
  | "inline-axis"
  | "vertical";

type BoxPackProperty = Globals | "center" | "end" | "justify" | "start";

type BoxShadowProperty<TLength> = Globals | Shadow<TLength> | "none";

type BoxSizingProperty = Globals | "border-box" | "content-box";

type BreakAfterProperty =
  | Globals
  | "auto"
  | "avoid"
  | "avoid-column"
  | "avoid-page"
  | "avoid-region"
  | "column"
  | "left"
  | "page"
  | "recto"
  | "region"
  | "right"
  | "verso";

type BreakBeforeProperty =
  | Globals
  | "auto"
  | "avoid"
  | "avoid-column"
  | "avoid-page"
  | "avoid-region"
  | "column"
  | "left"
  | "page"
  | "recto"
  | "region"
  | "right"
  | "verso";

type BreakInsideProperty =
  | Globals
  | "auto"
  | "avoid"
  | "avoid-column"
  | "avoid-page"
  | "avoid-region";

type CaptionSideProperty =
  | Globals
  | "block-end"
  | "block-start"
  | "bottom"
  | "inline-end"
  | "inline-start"
  | "top";

type CaretColorProperty = Globals | Color | "auto";

type ClearProperty =
  | Globals
  | "both"
  | "inline-end"
  | "inline-start"
  | "left"
  | "none"
  | "right";

type ClipProperty = Globals | "auto" | string;

type ClipPathProperty = Globals | GeometryBox | "none" | string;

type ColorProperty = Globals | Color;

type ColumnCountProperty = Globals | "auto" | number;

type ColumnFillProperty = Globals | "auto" | "balance" | "balance-all";

type ColumnGapProperty<TLength> =
  | Globals
  | LengthPercentage<TLength>
  | "normal";

type ColumnRuleColorProperty = Globals | Color;

type ColumnSpanProperty = Globals | "all" | "none";

type ColumnWidthProperty<TLength> = Globals | TLength | "auto";

type ContainProperty =
  | Globals
  | "content"
  | "layout"
  | "none"
  | "paint"
  | "size"
  | "strict"
  | "style"
  | string;

type ContentProperty = Globals | ContentList | "none" | "normal" | string;

type CounterIncrementProperty = Globals | "none" | string;

type CounterResetProperty = Globals | "none" | string;

type CursorProperty =
  | Globals
  | "alias"
  | "all-scroll"
  | "auto"
  | "cell"
  | "col-resize"
  | "context-menu"
  | "copy"
  | "crosshair"
  | "default"
  | "e-resize"
  | "ew-resize"
  | "grab"
  | "grabbing"
  | "help"
  | "move"
  | "n-resize"
  | "ne-resize"
  | "nesw-resize"
  | "no-drop"
  | "none"
  | "not-allowed"
  | "ns-resize"
  | "nw-resize"
  | "nwse-resize"
  | "pointer"
  | "progress"
  | "row-resize"
  | "s-resize"
  | "se-resize"
  | "sw-resize"
  | "text"
  | "vertical-text"
  | "w-resize"
  | "wait"
  | "zoom-in"
  | "zoom-out"
  | string;

type DirectionProperty = Globals | "ltr" | "rtl";

type DisplayProperty =
  | Globals
  | DisplayOutside
  | DisplayInside
  | DisplayListitem
  | DisplayInternal
  | DisplayBox
  | DisplayLegacy
  | string;

type DisplayInsideProperty =
  | Globals
  | "auto"
  | "block"
  | "flex"
  | "grid"
  | "ruby"
  | "table";

type DisplayListProperty = Globals | "list-item" | "none";

type DisplayOutsideProperty =
  | Globals
  | "block-level"
  | "contents"
  | "inline-level"
  | "none"
  | "ruby-base"
  | "ruby-base-container"
  | "ruby-text"
  | "ruby-text-container"
  | "run-in"
  | "table-caption"
  | "table-cell"
  | "table-column"
  | "table-column-group"
  | "table-footer-group"
  | "table-header-group"
  | "table-row"
  | "table-row-group";

type EmptyCellsProperty = Globals | "hide" | "show";

type FilterProperty = Globals | "none" | string;

type FlexBasisProperty = Globals | "content" | string;

type FlexDirectionProperty =
  | Globals
  | "column"
  | "column-reverse"
  | "row"
  | "row-reverse";

type FlexWrapProperty = Globals | "nowrap" | "wrap" | "wrap-reverse";

type FloatProperty =
  | Globals
  | "inline-end"
  | "inline-start"
  | "left"
  | "none"
  | "right";

type FontFamilyProperty = Globals | GenericFamily | string;

type FontFeatureSettingsProperty = Globals | "normal" | string;

type FontKerningProperty = Globals | "auto" | "none" | "normal";

type FontLanguageOverrideProperty = Globals | "normal" | string;

type FontVariationSettingsProperty = Globals | "normal" | string;

type FontSizeProperty<TLength> =
  | Globals
  | AbsoluteSize
  | RelativeSize
  | LengthPercentage<TLength>;

type FontSizeAdjustProperty = Globals | "none" | number;

type FontStretchProperty =
  | Globals
  | "condensed"
  | "expanded"
  | "extra-condensed"
  | "extra-expanded"
  | "normal"
  | "semi-condensed"
  | "semi-expanded"
  | "ultra-condensed"
  | "ultra-expanded";

type FontStyleProperty = Globals | "italic" | "normal" | "oblique";

type FontSynthesisProperty = Globals | "none" | "style" | "weight" | string;

type FontVariantProperty =
  | Globals
  | NumericFigureValues
  | EastAsianWidthValues
  | DiscretionaryLigValues
  | HistoricalLigValues
  | ContextualAltValues
  | CommonLigValues
  | EastAsianVariantValues
  | NumericSpacingValues
  | NumericFractionValues
  | "all-petite-caps"
  | "all-small-caps"
  | "historical-forms"
  | "none"
  | "normal"
  | "ordinal"
  | "petite-caps"
  | "ruby"
  | "slashed-zero"
  | "small-caps"
  | "titling-caps"
  | "unicase"
  | string;

type FontVariantAlternatesProperty =
  | Globals
  | "historical-forms"
  | "normal"
  | string;

type FontVariantCapsProperty =
  | Globals
  | "all-petite-caps"
  | "all-small-caps"
  | "normal"
  | "petite-caps"
  | "small-caps"
  | "titling-caps"
  | "unicase";

type FontVariantEastAsianProperty =
  | Globals
  | EastAsianVariantValues
  | EastAsianWidthValues
  | "normal"
  | "ruby"
  | string;

type FontVariantLigaturesProperty =
  | Globals
  | CommonLigValues
  | DiscretionaryLigValues
  | HistoricalLigValues
  | ContextualAltValues
  | "none"
  | "normal"
  | string;

type FontVariantNumericProperty =
  | Globals
  | NumericFigureValues
  | NumericSpacingValues
  | NumericFractionValues
  | "normal"
  | "ordinal"
  | "slashed-zero"
  | string;

type FontVariantPositionProperty = Globals | "normal" | "sub" | "super";

type FontWeightProperty =
  | Globals
  | "bold"
  | "bolder"
  | "lighter"
  | "normal"
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

type GridAutoColumnsProperty<TLength> = Globals | TrackSize<TLength>;

type GridAutoFlowProperty = Globals | "column" | "dense" | "row" | string;

type GridAutoRowsProperty<TLength> = Globals | TrackSize<TLength>;

type GridColumnEndProperty = Globals | GridLine;

type GridColumnGapProperty<TLength> = Globals | LengthPercentage<TLength>;

type GridColumnStartProperty = Globals | GridLine;

type GridRowEndProperty = Globals | GridLine;

type GridRowGapProperty<TLength> = Globals | LengthPercentage<TLength>;

type GridRowStartProperty = Globals | GridLine;

type GridTemplateAreasProperty = Globals | "none" | string;

type GridTemplateColumnsProperty<TLength> =
  | Globals
  | TrackList<TLength>
  | "none"
  | string;

type GridTemplateRowsProperty<TLength> =
  | Globals
  | TrackList<TLength>
  | "none"
  | string;

type HangingPunctuationProperty =
  | Globals
  | "allow-end"
  | "first"
  | "force-end"
  | "last"
  | "none"
  | string;

type HeightProperty<TLength> =
  | Globals
  | TLength
  | "auto"
  | "available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | string;

type HyphensProperty = Globals | "auto" | "manual" | "none";

type ImageOrientationProperty = Globals | "flip" | "from-image" | string;

type ImageRenderingProperty = Globals | "auto" | "crisp-edges" | "pixelated";

type ImageResolutionProperty = Globals | "from-image" | string;

type ImeModeProperty =
  | Globals
  | "active"
  | "auto"
  | "disabled"
  | "inactive"
  | "normal";

type InitialLetterProperty = Globals | "normal" | string | number;

type InitialLetterAlignProperty =
  | Globals
  | "alphabetic"
  | "auto"
  | "hanging"
  | "ideographic";

type IsolationProperty = Globals | "auto" | "isolate";

type JustifyContentProperty =
  | Globals
  | "center"
  | "flex-end"
  | "flex-start"
  | "space-around"
  | "space-between"
  | "space-evenly";

type LeftProperty<TLength> = Globals | TLength | "auto" | string;

type LetterSpacingProperty<TLength> = Globals | TLength | "normal";

type LineBreakProperty = Globals | "auto" | "loose" | "normal" | "strict";

type LineHeightProperty<TLength> =
  | Globals
  | TLength
  | "normal"
  | string
  | number;

type LineHeightStepProperty<TLength> = Globals | TLength | "none";

type ListStyleImageProperty = Globals | "none" | string;

type ListStylePositionProperty = Globals | "inside" | "outside";

type ListStyleTypeProperty = Globals | "none" | string;

type MarginBottomProperty<TLength> = Globals | TLength | "auto" | string;

type MarginLeftProperty<TLength> = Globals | TLength | "auto" | string;

type MarginRightProperty<TLength> = Globals | TLength | "auto" | string;

type MarginTopProperty<TLength> = Globals | TLength | "auto" | string;

type MaskBorderModeProperty = Globals | "alpha" | "luminance";

type MaskBorderOutsetProperty<TLength> = Globals | TLength | number;

type MaskBorderRepeatProperty =
  | Globals
  | "repeat"
  | "round"
  | "space"
  | "stretch";

type MaskBorderSliceProperty = Globals | NumberPercentage | "fill" | string;

type MaskBorderSourceProperty = Globals | "none" | string;

type MaskBorderWidthProperty<TLength> =
  | Globals
  | LengthPercentage<TLength>
  | "auto"
  | number;

type MaskClipProperty = Globals | GeometryBox | "no-clip" | string;

type MaskCompositeProperty = Globals | CompositingOperator;

type MaskImageProperty = Globals | MaskReference;

type MaskModeProperty = Globals | MaskingMode;

type MaskOriginProperty = Globals | GeometryBox;

type MaskPositionProperty<TLength> = Globals | Position<TLength>;

type MaskRepeatProperty = Globals | RepeatStyle;

type MaskSizeProperty<TLength> = Globals | BgSize<TLength>;

type MaskTypeProperty = Globals | "alpha" | "luminance";

type MaxHeightProperty<TLength> =
  | Globals
  | TLength
  | "fill-available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | "none"
  | string;

type MaxWidthProperty<TLength> =
  | Globals
  | TLength
  | "fill-available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | "none"
  | string;

type MinHeightProperty<TLength> =
  | Globals
  | TLength
  | "auto"
  | "fill-available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | string;

type MinWidthProperty<TLength> =
  | Globals
  | TLength
  | "auto"
  | "fill-available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | string;

type MixBlendModeProperty = Globals | BlendMode;

type ObjectFitProperty =
  | Globals
  | "contain"
  | "cover"
  | "fill"
  | "none"
  | "scale-down";

type ObjectPositionProperty<TLength> = Globals | Position<TLength>;

type OffsetAnchorProperty<TLength> = Globals | Position<TLength> | "auto";

type OffsetDistanceProperty<TLength> = Globals | LengthPercentage<TLength>;

type OffsetPathProperty = Globals | GeometryBox | "none" | string;

type OffsetPositionProperty<TLength> = Globals | Position<TLength> | "auto";

type OffsetRotateProperty = Globals | "auto" | "reverse" | string;

type OutlineColorProperty = Globals | Color | "invert";

type OutlineOffsetProperty<TLength> = Globals | TLength;

type OutlineStyleProperty = Globals | BrStyle | "auto";

type OutlineWidthProperty<TLength> = Globals | BrWidth<TLength>;

type OverflowProperty = Globals | "auto" | "hidden" | "scroll" | "visible";

type OverflowClipBoxProperty = Globals | "content-box" | "padding-box";

type OverflowWrapProperty = Globals | "break-word" | "normal";

type OverflowXProperty = Globals | "auto" | "hidden" | "scroll" | "visible";

type OverflowYProperty = Globals | "auto" | "hidden" | "scroll" | "visible";

type PaddingBottomProperty<TLength> = Globals | TLength | string;

type PaddingLeftProperty<TLength> = Globals | TLength | string;

type PaddingRightProperty<TLength> = Globals | TLength | string;

type PaddingTopProperty<TLength> = Globals | TLength | string;

type PageBreakAfterProperty =
  | Globals
  | "always"
  | "auto"
  | "avoid"
  | "left"
  | "right";

type PageBreakBeforeProperty =
  | Globals
  | "always"
  | "auto"
  | "avoid"
  | "left"
  | "right";

type PageBreakInsideProperty = Globals | "auto" | "avoid";

type PerspectiveProperty<TLength> = Globals | TLength | "none";

type PerspectiveOriginProperty<TLength> = Globals | Position<TLength>;

type PointerEventsProperty =
  | Globals
  | "all"
  | "auto"
  | "fill"
  | "inherit"
  | "none"
  | "painted"
  | "stroke"
  | "visible"
  | "visibleFill"
  | "visiblePainted"
  | "visibleStroke";

type PositionProperty =
  | Globals
  | "absolute"
  | "fixed"
  | "relative"
  | "static"
  | "sticky";

type QuotesProperty = Globals | "none" | string;

type ResizeProperty = Globals | "both" | "horizontal" | "none" | "vertical";

type RightProperty<TLength> = Globals | TLength | "auto" | string;

type RubyAlignProperty =
  | Globals
  | "center"
  | "space-around"
  | "space-between"
  | "start";

type RubyMergeProperty = Globals | "auto" | "collapse" | "separate";

type RubyPositionProperty = Globals | "inter-character" | "over" | "under";

type ScrollBehaviorProperty = Globals | "auto" | "smooth";

type ScrollSnapCoordinateProperty<TLength> =
  | Globals
  | Position<TLength>
  | "none";

type ScrollSnapDestinationProperty<TLength> = Globals | Position<TLength>;

type ScrollSnapPointsXProperty = Globals | "none" | string;

type ScrollSnapPointsYProperty = Globals | "none" | string;

type ScrollSnapTypeProperty = Globals | "mandatory" | "none" | "proximity";

type ScrollSnapTypeXProperty = Globals | "mandatory" | "none" | "proximity";

type ScrollSnapTypeYProperty = Globals | "mandatory" | "none" | "proximity";

type ShapeMarginProperty<TLength> = Globals | LengthPercentage<TLength>;

type ShapeOutsideProperty = Globals | ShapeBox | "none" | string;

type TabSizeProperty<TLength> = Globals | TLength | number;

type TableLayoutProperty = Globals | "auto" | "fixed";

type TextAlignProperty =
  | Globals
  | "center"
  | "end"
  | "justify"
  | "left"
  | "match-parent"
  | "right"
  | "start";

type TextAlignLastProperty =
  | Globals
  | "auto"
  | "center"
  | "end"
  | "justify"
  | "left"
  | "right"
  | "start";

type TextCombineUprightProperty = Globals | "all" | "digits" | "none" | string;

type TextDecorationColorProperty = Globals | Color;

type TextDecorationLineProperty =
  | Globals
  | "blink"
  | "line-through"
  | "none"
  | "overline"
  | "underline"
  | string;

type TextDecorationSkipProperty =
  | Globals
  | "box-decoration"
  | "edges"
  | "leading-spaces"
  | "none"
  | "objects"
  | "spaces"
  | "trailing-spaces"
  | string;

type TextDecorationSkipInkProperty = Globals | "auto" | "none";

type TextDecorationStyleProperty =
  | Globals
  | "dashed"
  | "dotted"
  | "double"
  | "solid"
  | "wavy";

type TextEmphasisColorProperty = Globals | Color;

type TextEmphasisStyleProperty =
  | Globals
  | "circle"
  | "dot"
  | "double-circle"
  | "filled"
  | "none"
  | "open"
  | "sesame"
  | "triangle"
  | string;

type TextIndentProperty<TLength> = Globals | LengthPercentage<TLength> | string;

type TextJustifyProperty =
  | Globals
  | "auto"
  | "inter-character"
  | "inter-word"
  | "none";

type TextOrientationProperty = Globals | "mixed" | "sideways" | "upright";

type TextOverflowProperty = Globals | "clip" | "ellipsis" | string;

type TextRenderingProperty =
  | Globals
  | "auto"
  | "geometricPrecision"
  | "optimizeLegibility"
  | "optimizeSpeed";

type TextShadowProperty<TLength> = Globals | ShadowT<TLength> | "none";

type TextSizeAdjustProperty = Globals | "auto" | "none" | string;

type TextTransformProperty =
  | Globals
  | "capitalize"
  | "full-width"
  | "lowercase"
  | "none"
  | "uppercase";

type TextUnderlinePositionProperty =
  | Globals
  | "auto"
  | "left"
  | "right"
  | "under"
  | string;

type TopProperty<TLength> = Globals | TLength | "auto" | string;

type TouchActionProperty =
  | Globals
  | "auto"
  | "manipulation"
  | "none"
  | "pan-down"
  | "pan-left"
  | "pan-right"
  | "pan-up"
  | "pan-x"
  | "pan-y"
  | "pinch-zoom"
  | string;

type TransformProperty = Globals | "none" | string;

type TransformBoxProperty = Globals | "border-box" | "fill-box" | "view-box";

type TransformOriginProperty<TLength> =
  | Globals
  | LengthPercentage<TLength>
  | "bottom"
  | "center"
  | "left"
  | "right"
  | "top"
  | string;

type TransformStyleProperty = Globals | "flat" | "preserve-3d";

type TransitionPropertyProperty = Globals | SingleTransitionProperty | "none";

type TransitionTimingFunctionProperty =
  | Globals
  | SingleTransitionTimingFunction;

type UnicodeBidiProperty =
  | Globals
  | "bidi-override"
  | "embed"
  | "isolate"
  | "isolate-override"
  | "normal"
  | "plaintext";

type UserSelectProperty =
  | Globals
  | "all"
  | "auto"
  | "contain"
  | "none"
  | "text";

type VerticalAlignProperty<TLength> =
  | Globals
  | TLength
  | "baseline"
  | "bottom"
  | "middle"
  | "sub"
  | "super"
  | "text-bottom"
  | "text-top"
  | "top"
  | string;

type VisibilityProperty = Globals | "collapse" | "hidden" | "visible";

type WhiteSpaceProperty =
  | Globals
  | "normal"
  | "nowrap"
  | "pre"
  | "pre-line"
  | "pre-wrap";

type WidthProperty<TLength> =
  | Globals
  | TLength
  | "auto"
  | "available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | string;

type WillChangeProperty = Globals | AnimateableFeature | "auto";

type WordBreakProperty = Globals | "break-all" | "keep-all" | "normal";

type WordSpacingProperty<TLength> =
  | Globals
  | LengthPercentage<TLength>
  | "normal";

type WordWrapProperty = Globals | "break-word" | "normal";

type WritingModeProperty =
  | Globals
  | "horizontal-tb"
  | "sideways-lr"
  | "sideways-rl"
  | "vertical-lr"
  | "vertical-rl";

type ZIndexProperty = Globals | "auto" | number;

type AnimationProperty = Globals | SingleAnimation;

type BackgroundProperty<TLength> = Globals | FinalBgLayer<TLength> | string;

type BorderProperty<TLength> =
  | Globals
  | BrWidth<TLength>
  | BrStyle
  | Color
  | string;

type BorderBottomProperty<TLength> =
  | Globals
  | BrWidth<TLength>
  | BrStyle
  | Color
  | string;

type BorderColorProperty = Globals | Color;

type BorderLeftProperty<TLength> =
  | Globals
  | BrWidth<TLength>
  | BrStyle
  | Color
  | string;

type BorderRadiusProperty<TLength> =
  | Globals
  | LengthPercentage<TLength>
  | string;

type BorderRightProperty<TLength> =
  | Globals
  | BrWidth<TLength>
  | BrStyle
  | Color
  | string;

type BorderStyleProperty = Globals | BrStyle;

type BorderTopProperty<TLength> =
  | Globals
  | BrWidth<TLength>
  | BrStyle
  | Color
  | string;

type BorderWidthProperty<TLength> = Globals | BrWidth<TLength>;

type FlexProperty = Globals | "none" | string;

type FontProperty =
  | Globals
  | "caption"
  | "icon"
  | "menu"
  | "message-box"
  | "small-caption"
  | "status-bar"
  | string;

type GridColumnProperty = Globals | GridLine | string;

type GridRowProperty = Globals | GridLine | string;

type GridTemplateProperty = Globals | "none" | string;

type MarginProperty<TLength> = Globals | TLength | "auto" | string;

type MaskProperty<TLength> = Globals | MaskLayer<TLength>;

type PaddingProperty<TLength> = Globals | TLength | string;

type TransitionProperty = Globals | SingleTransition;

type MsOverflowStyleProperty =
  | Globals
  | "-ms-autohiding-scrollbar"
  | "auto"
  | "none"
  | "scrollbar";

type MozAppearanceProperty =
  | Globals
  | "-moz-mac-unified-toolbar"
  | "-moz-win-borderless-glass"
  | "-moz-win-browsertabbar-toolbox"
  | "-moz-win-communications-toolbox"
  | "-moz-win-communicationstext"
  | "-moz-win-exclude-glass"
  | "-moz-win-glass"
  | "-moz-win-media-toolbox"
  | "-moz-win-mediatext"
  | "-moz-window-button-box"
  | "-moz-window-button-box-maximized"
  | "-moz-window-button-close"
  | "-moz-window-button-maximize"
  | "-moz-window-button-minimize"
  | "-moz-window-button-restore"
  | "-moz-window-frame-bottom"
  | "-moz-window-frame-left"
  | "-moz-window-frame-right"
  | "-moz-window-titlebar"
  | "-moz-window-titlebar-maximized"
  | "button"
  | "button-arrow-down"
  | "button-arrow-next"
  | "button-arrow-previous"
  | "button-arrow-up"
  | "button-bevel"
  | "button-focus"
  | "caret"
  | "checkbox"
  | "checkbox-container"
  | "checkbox-label"
  | "checkmenuitem"
  | "dualbutton"
  | "groupbox"
  | "listbox"
  | "listitem"
  | "menuarrow"
  | "menubar"
  | "menucheckbox"
  | "menuimage"
  | "menuitem"
  | "menuitemtext"
  | "menulist"
  | "menulist-button"
  | "menulist-text"
  | "menulist-textfield"
  | "menupopup"
  | "menuradio"
  | "menuseparator"
  | "meterbar"
  | "meterchunk"
  | "none"
  | "progressbar"
  | "progressbar-vertical"
  | "progresschunk"
  | "progresschunk-vertical"
  | "radio"
  | "radio-container"
  | "radio-label"
  | "radiomenuitem"
  | "range"
  | "range-thumb"
  | "resizer"
  | "resizerpanel"
  | "scale-horizontal"
  | "scale-vertical"
  | "scalethumb-horizontal"
  | "scalethumb-vertical"
  | "scalethumbend"
  | "scalethumbstart"
  | "scalethumbtick"
  | "scrollbarbutton-down"
  | "scrollbarbutton-left"
  | "scrollbarbutton-right"
  | "scrollbarbutton-up"
  | "scrollbarthumb-horizontal"
  | "scrollbarthumb-vertical"
  | "scrollbartrack-horizontal"
  | "scrollbartrack-vertical"
  | "searchfield"
  | "separator"
  | "sheet"
  | "spinner"
  | "spinner-downbutton"
  | "spinner-textfield"
  | "spinner-upbutton"
  | "splitter"
  | "statusbar"
  | "statusbarpanel"
  | "tab"
  | "tab-scroll-arrow-back"
  | "tab-scroll-arrow-forward"
  | "tabpanel"
  | "tabpanels"
  | "textfield"
  | "textfield-multiline"
  | "toolbar"
  | "toolbarbutton"
  | "toolbarbutton-dropdown"
  | "toolbargripper"
  | "toolbox"
  | "tooltip"
  | "treeheader"
  | "treeheadercell"
  | "treeheadersortarrow"
  | "treeitem"
  | "treeline"
  | "treetwisty"
  | "treetwistyopen"
  | "treeview";

type MozBindingProperty = Globals | "none" | string;

type MozBorderBottomColorsProperty = Globals | Color | "none" | string;

type MozBorderLeftColorsProperty = Globals | Color | "none" | string;

type MozBorderRightColorsProperty = Globals | Color | "none" | string;

type MozBorderTopColorsProperty = Globals | Color | "none" | string;

type MozContextPropertiesProperty =
  | Globals
  | "fill"
  | "fill-opacity"
  | "none"
  | "stroke"
  | "stroke-opacity"
  | string;

type MozFloatEdgeProperty =
  | Globals
  | "border-box"
  | "content-box"
  | "margin-box"
  | "padding-box";

type MozImageRegionProperty = Globals | "auto" | string;

type MozOrientProperty =
  | Globals
  | "block"
  | "horizontal"
  | "inline"
  | "vertical";

type MozStackSizingProperty = Globals | "ignore" | "stretch-to-fit";

type MozTextBlinkProperty = Globals | "blink" | "none";

type MozUserFocusProperty =
  | Globals
  | "ignore"
  | "none"
  | "normal"
  | "select-after"
  | "select-all"
  | "select-before"
  | "select-menu"
  | "select-same";

type MozUserInputProperty = Globals | "auto" | "disabled" | "enabled" | "none";

type MozUserModifyProperty =
  | Globals
  | "read-only"
  | "read-write"
  | "write-only";

type MozWindowDraggingProperty = Globals | "drag" | "no-drag";

type MozWindowShadowProperty =
  | Globals
  | "default"
  | "menu"
  | "none"
  | "sheet"
  | "tooltip";

type WebkitBoxReflectProperty<TLength> =
  | Globals
  | TLength
  | "above"
  | "below"
  | "left"
  | "right"
  | string;

type WebkitMaskAttachmentProperty = Globals | Attachment | string;

type WebkitMaskClipProperty =
  | Globals
  | "border"
  | "border-box"
  | "content"
  | "content-box"
  | "padding"
  | "padding-box"
  | "text"
  | string;

type WebkitMaskCompositeProperty = Globals | CompositeStyle | string;

type WebkitMaskOriginProperty =
  | Globals
  | "border"
  | "content"
  | "padding"
  | string;

type WebkitMaskPositionProperty<TLength> = Globals | MaskPosition<TLength>;

type WebkitMaskPositionXProperty<TLength> =
  | Globals
  | LengthPercentage<TLength>
  | "center"
  | "left"
  | "right"
  | string;

type WebkitMaskPositionYProperty<TLength> =
  | Globals
  | LengthPercentage<TLength>
  | "bottom"
  | "center"
  | "top"
  | string;

type WebkitMaskRepeatProperty = Globals | RepeatStyle | string;

type WebkitMaskRepeatXProperty =
  | Globals
  | "no-repeat"
  | "repeat"
  | "round"
  | "space";

type WebkitMaskRepeatYProperty =
  | Globals
  | "no-repeat"
  | "repeat"
  | "round"
  | "space";

type WebkitOverflowScrollingProperty = Globals | "auto" | "touch";

type WebkitTapHighlightColorProperty = Globals | Color;

type WebkitTextFillColorProperty = Globals | Color;

type WebkitTextStrokeColorProperty = Globals | Color;

type WebkitTextStrokeWidthProperty<TLength> = Globals | TLength;

type WebkitTouchCalloutProperty = Globals | "default" | "none";

type WebkitTextStrokeProperty<TLength> = Globals | Color | TLength | string;

type CounterStyleRangeProperty = "auto" | "infinite" | string | number;

type CounterStyleSpeakAsProperty =
  | "auto"
  | "bullets"
  | "numbers"
  | "spell-out"
  | "words"
  | string;

type CounterStyleSystemProperty =
  | "additive"
  | "alphabetic"
  | "cyclic"
  | "fixed"
  | "numeric"
  | "symbolic"
  | string;

type FontFaceFontDisplayProperty =
  | "auto"
  | "block"
  | "fallback"
  | "optional"
  | "swap";

type FontFaceFontFeatureSettingsProperty = "normal" | string;

type FontFaceFontVariationSettingsProperty = "normal";

type FontFaceFontStretchProperty =
  | "condensed"
  | "expanded"
  | "extra-condensed"
  | "extra-expanded"
  | "normal"
  | "semi-condensed"
  | "semi-expanded"
  | "ultra-condensed"
  | "ultra-expanded";

type FontFaceFontStyleProperty = "italic" | "normal" | "oblique";

type FontFaceFontWeightProperty =
  | "bold"
  | "normal"
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;

type FontFaceFontVariantProperty =
  | NumericFigureValues
  | EastAsianWidthValues
  | DiscretionaryLigValues
  | HistoricalLigValues
  | ContextualAltValues
  | CommonLigValues
  | EastAsianVariantValues
  | NumericSpacingValues
  | NumericFractionValues
  | "all-petite-caps"
  | "all-small-caps"
  | "historical-forms"
  | "none"
  | "normal"
  | "ordinal"
  | "petite-caps"
  | "ruby"
  | "slashed-zero"
  | "small-caps"
  | "titling-caps"
  | "unicase"
  | string;

type PageBleedProperty<TLength> = TLength | "auto";

type PageMarksProperty = "crop" | "cross" | "none" | string;

type ViewportHeightProperty<TLength> = ViewportLength<TLength>;

type ViewportMaxHeightProperty<TLength> = ViewportLength<TLength>;

type ViewportMaxWidthProperty<TLength> = ViewportLength<TLength>;

type ViewportMaxZoomProperty = "auto" | string | number;

type ViewportMinHeightProperty<TLength> = ViewportLength<TLength>;

type ViewportMinWidthProperty<TLength> = ViewportLength<TLength>;

type ViewportMinZoomProperty = "auto" | string | number;

type ViewportOrientationProperty = "auto" | "landscape" | "portrait";

type ViewportUserZoomProperty = "fixed" | "zoom";

type ViewportWidthProperty<TLength> = ViewportLength<TLength>;

type ViewportZoomProperty = "auto" | string | number;

type SingleAnimationDirection =
  | "alternate"
  | "alternate-reverse"
  | "normal"
  | "reverse";

type SingleAnimationFillMode = "backwards" | "both" | "forwards" | "none";

type SingleAnimationIterationCount = "infinite" | number;

type SingleAnimationPlayState = "paused" | "running";

type SingleTimingFunction =
  | CubicBezierTimingFunction
  | StepTimingFunction
  | "linear"
  | string;

type CubicBezierTimingFunction =
  | "ease"
  | "ease-in"
  | "ease-in-out"
  | "ease-out"
  | string;

type StepTimingFunction = "step-end" | "step-start" | string;

type Attachment = "fixed" | "local" | "scroll";

type BlendMode =
  | "color"
  | "color-burn"
  | "color-dodge"
  | "darken"
  | "difference"
  | "exclusion"
  | "hard-light"
  | "hue"
  | "lighten"
  | "luminosity"
  | "multiply"
  | "normal"
  | "overlay"
  | "saturation"
  | "screen"
  | "soft-light";

type Box = "border-box" | "content-box" | "padding-box";

type Color = NamedColor | DeprecatedSystemColor | "currentcolor" | string;

type NamedColor =
  | "aliceblue"
  | "antiquewhite"
  | "aqua"
  | "aquamarine"
  | "azure"
  | "beige"
  | "bisque"
  | "black"
  | "blanchedalmond"
  | "blue"
  | "blueviolet"
  | "brown"
  | "burlywood"
  | "cadetblue"
  | "chartreuse"
  | "chocolate"
  | "coral"
  | "cornflowerblue"
  | "cornsilk"
  | "crimson"
  | "cyan"
  | "darkblue"
  | "darkcyan"
  | "darkgoldenrod"
  | "darkgray"
  | "darkgreen"
  | "darkgrey"
  | "darkkhaki"
  | "darkmagenta"
  | "darkolivegreen"
  | "darkorange"
  | "darkorchid"
  | "darkred"
  | "darksalmon"
  | "darkseagreen"
  | "darkslateblue"
  | "darkslategray"
  | "darkslategrey"
  | "darkturquoise"
  | "darkviolet"
  | "deeppink"
  | "deepskyblue"
  | "dimgray"
  | "dimgrey"
  | "dodgerblue"
  | "firebrick"
  | "floralwhite"
  | "forestgreen"
  | "fuchsia"
  | "gainsboro"
  | "ghostwhite"
  | "gold"
  | "goldenrod"
  | "gray"
  | "green"
  | "greenyellow"
  | "grey"
  | "honeydew"
  | "hotpink"
  | "indianred"
  | "indigo"
  | "ivory"
  | "khaki"
  | "lavender"
  | "lavenderblush"
  | "lawngreen"
  | "lemonchiffon"
  | "lightblue"
  | "lightcoral"
  | "lightcyan"
  | "lightgoldenrodyellow"
  | "lightgray"
  | "lightgreen"
  | "lightgrey"
  | "lightpink"
  | "lightsalmon"
  | "lightseagreen"
  | "lightskyblue"
  | "lightslategray"
  | "lightslategrey"
  | "lightsteelblue"
  | "lightyellow"
  | "lime"
  | "limegreen"
  | "linen"
  | "magenta"
  | "maroon"
  | "mediumaquamarine"
  | "mediumblue"
  | "mediumorchid"
  | "mediumpurple"
  | "mediumseagreen"
  | "mediumslateblue"
  | "mediumspringgreen"
  | "mediumturquoise"
  | "mediumvioletred"
  | "midnightblue"
  | "mintcream"
  | "mistyrose"
  | "moccasin"
  | "navajowhite"
  | "navy"
  | "oldlace"
  | "olive"
  | "olivedrab"
  | "orange"
  | "orangered"
  | "orchid"
  | "palegoldenrod"
  | "palegreen"
  | "paleturquoise"
  | "palevioletred"
  | "papayawhip"
  | "peachpuff"
  | "peru"
  | "pink"
  | "plum"
  | "powderblue"
  | "purple"
  | "rebeccapurple"
  | "red"
  | "rosybrown"
  | "royalblue"
  | "saddlebrown"
  | "salmon"
  | "sandybrown"
  | "seagreen"
  | "seashell"
  | "sienna"
  | "silver"
  | "skyblue"
  | "slateblue"
  | "slategray"
  | "slategrey"
  | "snow"
  | "springgreen"
  | "steelblue"
  | "tan"
  | "teal"
  | "thistle"
  | "tomato"
  | "transparent"
  | "turquoise"
  | "violet"
  | "wheat"
  | "white"
  | "whitesmoke"
  | "yellow"
  | "yellowgreen";

type DeprecatedSystemColor =
  | "ActiveBorder"
  | "ActiveCaption"
  | "AppWorkspace"
  | "Background"
  | "ButtonFace"
  | "ButtonHighlight"
  | "ButtonShadow"
  | "ButtonText"
  | "CaptionText"
  | "GrayText"
  | "Highlight"
  | "HighlightText"
  | "InactiveBorder"
  | "InactiveCaption"
  | "InactiveCaptionText"
  | "InfoBackground"
  | "InfoText"
  | "Menu"
  | "MenuText"
  | "Scrollbar"
  | "ThreeDDarkShadow"
  | "ThreeDFace"
  | "ThreeDHighlight"
  | "ThreeDLightShadow"
  | "ThreeDShadow"
  | "Window"
  | "WindowFrame"
  | "WindowText";

type BgImage = "none" | string;

type BgPosition<TLength> =
  | LengthPercentage<TLength>
  | "bottom"
  | "center"
  | "left"
  | "right"
  | "top"
  | string;

type LengthPercentage<TLength> = TLength | string;

type RepeatStyle =
  | "no-repeat"
  | "repeat"
  | "repeat-x"
  | "repeat-y"
  | "round"
  | "space";

type BgSize<TLength> = LengthPercentage<TLength> | "auto" | "contain" | "cover";

type BrStyle =
  | "dashed"
  | "dotted"
  | "double"
  | "groove"
  | "hidden"
  | "inset"
  | "none"
  | "outset"
  | "ridge"
  | "solid";

type BrWidth<TLength> = TLength | "medium" | "thick" | "thin";

type NumberPercentage = string | number;

type Shadow<TLength> = Color | TLength | "inset" | string;

type GeometryBox = ShapeBox | "fill-box" | "stroke-box" | "view-box";

type ShapeBox = Box | "margin-box";

type ContentList = Quote | "contents" | string;

type Quote = "close-quote" | "no-close-quote" | "no-open-quote" | "open-quote";

type DisplayOutside = "block" | "inline" | "run-in";

type DisplayInside =
  | "flex"
  | "flow"
  | "flow-root"
  | "grid"
  | "ruby"
  | "subgrid"
  | "table";

type DisplayListitem = "list-item" | string;

type DisplayInternal =
  | "ruby-base"
  | "ruby-base-container"
  | "ruby-text"
  | "ruby-text-container"
  | "table-caption"
  | "table-cell"
  | "table-column"
  | "table-column-group"
  | "table-footer-group"
  | "table-header-group"
  | "table-row"
  | "table-row-group";

type DisplayBox = "contents" | "none";

type DisplayLegacy =
  | "inline-block"
  | "inline-flex"
  | "inline-grid"
  | "inline-list-item"
  | "inline-table";

type GenericFamily =
  | "cursive"
  | "fantasy"
  | "monospace"
  | "sans-serif"
  | "serif";

type AbsoluteSize =
  | "large"
  | "medium"
  | "small"
  | "x-large"
  | "x-small"
  | "xx-large"
  | "xx-small";

type RelativeSize = "larger" | "smaller";

type CommonLigValues = "common-ligatures" | "no-common-ligatures";

type DiscretionaryLigValues =
  | "discretionary-ligatures"
  | "no-discretionary-ligatures";

type HistoricalLigValues = "historical-ligatures" | "no-historical-ligatures";

type ContextualAltValues = "contextual" | "no-contextual";

type NumericFigureValues = "lining-nums" | "oldstyle-nums";

type NumericSpacingValues = "proportional-nums" | "tabular-nums";

type NumericFractionValues = "diagonal-fractions" | "stacked-fractions";

type EastAsianVariantValues =
  | "jis04"
  | "jis78"
  | "jis83"
  | "jis90"
  | "simplified"
  | "traditional";

type EastAsianWidthValues = "full-width" | "proportional-width";

type TrackSize<TLength> = TrackBreadth<TLength> | string;

type TrackBreadth<TLength> =
  | LengthPercentage<TLength>
  | "auto"
  | "max-content"
  | "min-content"
  | string;

type GridLine = "auto" | string | number;

type TrackList<TLength> = TrackSize<TLength> | string;

type CompositingOperator = "add" | "exclude" | "intersect" | "subtract";

type MaskReference = "none" | string;

type MaskingMode = "alpha" | "luminance" | "match-source";

type Position<TLength> =
  | LengthPercentage<TLength>
  | "bottom"
  | "center"
  | "left"
  | "right"
  | "top"
  | string;

type ShadowT<TLength> = Color | TLength | string;

type SingleTransitionProperty = "all" | string;

type SingleTransitionTimingFunction = SingleTimingFunction;

type AnimateableFeature = "contents" | "scroll-position" | string;

type SingleAnimation =
  | SingleTimingFunction
  | SingleAnimationIterationCount
  | SingleAnimationDirection
  | SingleAnimationFillMode
  | SingleAnimationPlayState
  | "none"
  | string;

type FinalBgLayer<TLength> =
  | BgImage
  | BgPosition<TLength>
  | RepeatStyle
  | Attachment
  | Box
  | string;

type MaskLayer<TLength> =
  | MaskReference
  | Position<TLength>
  | RepeatStyle
  | GeometryBox
  | CompositingOperator
  | MaskingMode
  | "no-clip"
  | string;

type SingleTransition =
  | SingleTransitionProperty
  | SingleTransitionTimingFunction
  | "none"
  | string;

type CompositeStyle =
  | "clear"
  | "copy"
  | "destination-atop"
  | "destination-in"
  | "destination-out"
  | "destination-over"
  | "source-atop"
  | "source-in"
  | "source-out"
  | "source-over"
  | "xor";

type MaskPosition<TLength> =
  | LengthPercentage<TLength>
  | "center"
  | "left"
  | "right"
  | string;

type ViewportLength<TLength> = LengthPercentage<TLength> | "auto";
