// @flow strict

type TLength = string | 0;

export type StandardFlattenedProperties = {
  [string]: StandardFlattenedProperties,
  alignContent?: PropertyAlignContent,
  alignItems?: PropertyAlignItems,
  alignSelf?: PropertyAlignSelf,
  animationDelay?: GlobalsString,
  animationDirection?: PropertyAnimationDirection,
  animationDuration?: GlobalsString,
  animationFillMode?: PropertyAnimationFillMode,
  animationIterationCount?: PropertyAnimationIterationCount,
  animationName?: PropertyAnimationName,
  animationPlayState?: PropertyAnimationPlayState,
  animationTimingFunction?: PropertyAnimationTimingFunction,
  appearance?: PropertyAppearance,
  backdropFilter?: PropertyBackdropFilter,
  backfaceVisibility?: PropertyBackfaceVisibility,
  backgroundAttachment?: PropertyBackgroundAttachment,
  backgroundBlendMode?: PropertyBackgroundBlendMode,
  backgroundClip?: PropertyBackgroundClip,
  backgroundColor?: PropertyBackgroundColor,
  backgroundImage?: PropertyBackgroundImage,
  backgroundOrigin?: PropertyBackgroundOrigin,
  backgroundPosition?: PropertyBackgroundPosition,
  backgroundPositionX?: PropertyBackgroundPositionX,
  backgroundPositionY?: PropertyBackgroundPositionY,
  backgroundRepeat?: PropertyBackgroundRepeat,
  backgroundSize?: PropertyBackgroundSize,
  blockOverflow?: PropertyBlockOverflow,
  blockSize?: PropertyBlockSize,
  borderBlockColor?: PropertyBorderBlockColor,
  borderBlockEndColor?: PropertyBorderBlockEndColor,
  borderBlockEndStyle?: PropertyBorderBlockEndStyle,
  borderBlockEndWidth?: PropertyBorderBlockEndWidth,
  borderBlockStartColor?: PropertyBorderBlockStartColor,
  borderBlockStartStyle?: PropertyBorderBlockStartStyle,
  borderBlockStartWidth?: PropertyBorderBlockStartWidth,
  borderBlockStyle?: PropertyBorderBlockStyle,
  borderBlockWidth?: PropertyBorderBlockWidth,
  borderBottomColor?: PropertyBorderBottomColor,
  borderBottomLeftRadius?: PropertyBorderBottomLeftRadius,
  borderBottomRightRadius?: PropertyBorderBottomRightRadius,
  borderBottomStyle?: PropertyBorderBottomStyle,
  borderBottomWidth?: PropertyBorderBottomWidth,
  borderCollapse?: PropertyBorderCollapse,
  borderEndEndRadius?: PropertyBorderEndEndRadius,
  borderEndStartRadius?: PropertyBorderEndStartRadius,
  borderImageOutset?: PropertyBorderImageOutset,
  borderImageRepeat?: PropertyBorderImageRepeat,
  borderImageSlice?: PropertyBorderImageSlice,
  borderImageSource?: PropertyBorderImageSource,
  borderImageWidth?: PropertyBorderImageWidth,
  borderInlineColor?: PropertyBorderInlineColor,
  borderInlineEndColor?: PropertyBorderInlineEndColor,
  borderInlineEndStyle?: PropertyBorderInlineEndStyle,
  borderInlineEndWidth?: PropertyBorderInlineEndWidth,
  borderInlineStartColor?: PropertyBorderInlineStartColor,
  borderInlineStartStyle?: PropertyBorderInlineStartStyle,
  borderInlineStartWidth?: PropertyBorderInlineStartWidth,
  borderInlineStyle?: PropertyBorderInlineStyle,
  borderInlineWidth?: PropertyBorderInlineWidth,
  borderLeftColor?: PropertyBorderLeftColor,
  borderLeftStyle?: PropertyBorderLeftStyle,
  borderLeftWidth?: PropertyBorderLeftWidth,
  borderRightColor?: PropertyBorderRightColor,
  borderRightStyle?: PropertyBorderRightStyle,
  borderRightWidth?: PropertyBorderRightWidth,
  borderSpacing?: PropertyBorderSpacing,
  borderStartEndRadius?: PropertyBorderStartEndRadius,
  borderStartStartRadius?: PropertyBorderStartStartRadius,
  borderTopColor?: PropertyBorderTopColor,
  borderTopLeftRadius?: PropertyBorderTopLeftRadius,
  borderTopRightRadius?: PropertyBorderTopRightRadius,
  borderTopStyle?: PropertyBorderTopStyle,
  borderTopWidth?: PropertyBorderTopWidth,
  bottom?: PropertyBottom,
  boxDecorationBreak?: PropertyBoxDecorationBreak,
  boxShadow?: PropertyBoxShadow,
  boxSizing?: PropertyBoxSizing,
  breakAfter?: PropertyBreakAfter,
  breakBefore?: PropertyBreakBefore,
  breakInside?: PropertyBreakInside,
  captionSide?: PropertyCaptionSide,
  caretColor?: PropertyCaretColor,
  clear?: PropertyClear,
  clipPath?: PropertyClipPath,
  color?: PropertyColor,
  colorAdjust?: PropertyColorAdjust,
  columnCount?: PropertyColumnCount,
  columnFill?: PropertyColumnFill,
  columnGap?: PropertyColumnGap,
  columnRuleColor?: PropertyColumnRuleColor,
  columnRuleStyle?: PropertyColumnRuleStyle,
  columnRuleWidth?: PropertyColumnRuleWidth,
  columnSpan?: PropertyColumnSpan,
  columnWidth?: PropertyColumnWidth,
  contain?: PropertyContain,
  content?: PropertyContent,
  counterIncrement?: PropertyCounterIncrement,
  counterReset?: PropertyCounterReset,
  counterSet?: PropertyCounterSet,
  cursor?: PropertyCursor,
  direction?: PropertyDirection,
  display?: PropertyDisplay,
  emptyCells?: PropertyEmptyCells,
  filter?: PropertyFilter,
  flexBasis?: PropertyFlexBasis,
  flexDirection?: PropertyFlexDirection,
  flexGrow?: GlobalsNumber,
  flexShrink?: GlobalsNumber,
  flexWrap?: PropertyFlexWrap,
  float?: PropertyFloat,
  fontFamily?: PropertyFontFamily,
  fontFeatureSettings?: PropertyFontFeatureSettings,
  fontKerning?: PropertyFontKerning,
  fontLanguageOverride?: PropertyFontLanguageOverride,
  fontOpticalSizing?: PropertyFontOpticalSizing,
  fontSize?: PropertyFontSize,
  fontSizeAdjust?: PropertyFontSizeAdjust,
  fontStretch?: PropertyFontStretch,
  fontStyle?: PropertyFontStyle,
  fontSynthesis?: PropertyFontSynthesis,
  fontVariant?: PropertyFontVariant,
  fontVariantCaps?: PropertyFontVariantCaps,
  fontVariantEastAsian?: PropertyFontVariantEastAsian,
  fontVariantLigatures?: PropertyFontVariantLigatures,
  fontVariantNumeric?: PropertyFontVariantNumeric,
  fontVariantPosition?: PropertyFontVariantPosition,
  fontVariationSettings?: PropertyFontVariationSettings,
  fontWeight?: PropertyFontWeight,
  gridAutoColumns?: PropertyGridAutoColumns,
  gridAutoFlow?: PropertyGridAutoFlow,
  gridAutoRows?: PropertyGridAutoRows,
  gridColumnEnd?: PropertyGridColumnEnd,
  gridColumnStart?: PropertyGridColumnStart,
  gridRowEnd?: PropertyGridRowEnd,
  gridRowStart?: PropertyGridRowStart,
  gridTemplateAreas?: PropertyGridTemplateAreas,
  gridTemplateColumns?: PropertyGridTemplateColumns,
  gridTemplateRows?: PropertyGridTemplateRows,
  hangingPunctuation?: PropertyHangingPunctuation,
  height?: PropertyHeight,
  hyphens?: PropertyHyphens,
  imageOrientation?: PropertyImageOrientation,
  imageRendering?: PropertyImageRendering,
  imageResolution?: PropertyImageResolution,
  initialLetter?: PropertyInitialLetter,
  inlineSize?: PropertyInlineSize,
  inset?: PropertyInset,
  insetBlock?: PropertyInsetBlock,
  insetBlockEnd?: PropertyInsetBlockEnd,
  insetBlockStart?: PropertyInsetBlockStart,
  insetInline?: PropertyInsetInline,
  insetInlineEnd?: PropertyInsetInlineEnd,
  insetInlineStart?: PropertyInsetInlineStart,
  isolation?: PropertyIsolation,
  justifyContent?: PropertyJustifyContent,
  justifyItems?: PropertyJustifyItems,
  justifySelf?: PropertyJustifySelf,
  left?: PropertyLeft,
  letterSpacing?: PropertyLetterSpacing,
  lineBreak?: PropertyLineBreak,
  lineHeight?: PropertyLineHeight,
  lineHeightStep?: PropertyLineHeightStep,
  listStyleImage?: PropertyListStyleImage,
  listStylePosition?: PropertyListStylePosition,
  listStyleType?: PropertyListStyleType,
  marginBlock?: PropertyMarginBlock,
  marginBlockEnd?: PropertyMarginBlockEnd,
  marginBlockStart?: PropertyMarginBlockStart,
  marginBottom?: PropertyMarginBottom,
  marginInline?: PropertyMarginInline,
  marginInlineEnd?: PropertyMarginInlineEnd,
  marginInlineStart?: PropertyMarginInlineStart,
  marginLeft?: PropertyMarginLeft,
  marginRight?: PropertyMarginRight,
  marginTop?: PropertyMarginTop,
  maskBorderMode?: PropertyMaskBorderMode,
  maskBorderOutset?: PropertyMaskBorderOutset,
  maskBorderRepeat?: PropertyMaskBorderRepeat,
  maskBorderSlice?: PropertyMaskBorderSlice,
  maskBorderSource?: PropertyMaskBorderSource,
  maskBorderWidth?: PropertyMaskBorderWidth,
  maskClip?: PropertyMaskClip,
  maskComposite?: PropertyMaskComposite,
  maskImage?: PropertyMaskImage,
  maskMode?: PropertyMaskMode,
  maskOrigin?: PropertyMaskOrigin,
  maskPosition?: PropertyMaskPosition,
  maskRepeat?: PropertyMaskRepeat,
  maskSize?: PropertyMaskSize,
  maskType?: PropertyMaskType,
  maxBlockSize?: PropertyMaxBlockSize,
  maxHeight?: PropertyMaxHeight,
  maxInlineSize?: PropertyMaxInlineSize,
  maxLines?: PropertyMaxLines,
  maxWidth?: PropertyMaxWidth,
  minBlockSize?: PropertyMinBlockSize,
  minHeight?: PropertyMinHeight,
  minInlineSize?: PropertyMinInlineSize,
  minWidth?: PropertyMinWidth,
  mixBlendMode?: PropertyMixBlendMode,
  motionDistance?: PropertyOffsetDistance,
  motionPath?: PropertyOffsetPath,
  motionRotation?: PropertyOffsetRotate,
  objectFit?: PropertyObjectFit,
  objectPosition?: PropertyObjectPosition,
  offsetAnchor?: PropertyOffsetAnchor,
  offsetDistance?: PropertyOffsetDistance,
  offsetPath?: PropertyOffsetPath,
  offsetPosition?: PropertyOffsetPosition,
  offsetRotate?: PropertyOffsetRotate,
  offsetRotation?: PropertyOffsetRotate,
  opacity?: PropertyOpacity,
  order?: GlobalsNumber,
  orphans?: GlobalsNumber,
  outlineColor?: PropertyOutlineColor,
  outlineOffset?: PropertyOutlineOffset,
  outlineStyle?: PropertyOutlineStyle,
  outlineWidth?: PropertyOutlineWidth,
  overflow?: PropertyOverflow,
  overflowAnchor?: PropertyOverflowAnchor,
  overflowBlock?: PropertyOverflowBlock,
  overflowClipBox?: PropertyOverflowClipBox,
  overflowInline?: PropertyOverflowInline,
  overflowWrap?: PropertyOverflowWrap,
  overflowX?: PropertyOverflowX,
  overflowY?: PropertyOverflowY,
  overscrollBehavior?: PropertyOverscrollBehavior,
  overscrollBehaviorX?: PropertyOverscrollBehaviorX,
  overscrollBehaviorY?: PropertyOverscrollBehaviorY,
  paddingBlock?: PropertyPaddingBlock,
  paddingBlockEnd?: PropertyPaddingBlockEnd,
  paddingBlockStart?: PropertyPaddingBlockStart,
  paddingBottom?: PropertyPaddingBottom,
  paddingInline?: PropertyPaddingInline,
  paddingInlineEnd?: PropertyPaddingInlineEnd,
  paddingInlineStart?: PropertyPaddingInlineStart,
  paddingLeft?: PropertyPaddingLeft,
  paddingRight?: PropertyPaddingRight,
  paddingTop?: PropertyPaddingTop,
  pageBreakAfter?: PropertyPageBreakAfter,
  pageBreakBefore?: PropertyPageBreakBefore,
  pageBreakInside?: PropertyPageBreakInside,
  paintOrder?: PropertyPaintOrder,
  perspective?: PropertyPerspective,
  perspectiveOrigin?: PropertyPerspectiveOrigin,
  placeContent?: PropertyPlaceContent,
  pointerEvents?: PropertyPointerEvents,
  position?: PropertyPosition,
  quotes?: PropertyQuotes,
  resize?: PropertyResize,
  right?: PropertyRight,
  rotate?: PropertyRotate,
  rowGap?: PropertyRowGap,
  rubyAlign?: PropertyRubyAlign,
  rubyMerge?: PropertyRubyMerge,
  rubyPosition?: PropertyRubyPosition,
  scale?: PropertyScale,
  scrollBehavior?: PropertyScrollBehavior,
  scrollMargin?: PropertyScrollMargin,
  scrollMarginBlock?: PropertyScrollMarginBlock,
  scrollMarginBlockEnd?: PropertyScrollMarginBlockEnd,
  scrollMarginBlockStart?: PropertyScrollMarginBlockStart,
  scrollMarginBottom?: PropertyScrollMarginBottom,
  scrollMarginInline?: PropertyScrollMarginInline,
  scrollMarginInlineEnd?: PropertyScrollMarginInlineEnd,
  scrollMarginInlineStart?: PropertyScrollMarginInlineStart,
  scrollMarginLeft?: PropertyScrollMarginLeft,
  scrollMarginRight?: PropertyScrollMarginRight,
  scrollMarginTop?: PropertyScrollMarginTop,
  scrollPadding?: PropertyScrollPadding,
  scrollPaddingBlock?: PropertyScrollPaddingBlock,
  scrollPaddingBlockEnd?: PropertyScrollPaddingBlockEnd,
  scrollPaddingBlockStart?: PropertyScrollPaddingBlockStart,
  scrollPaddingBottom?: PropertyScrollPaddingBottom,
  scrollPaddingInline?: PropertyScrollPaddingInline,
  scrollPaddingInlineEnd?: PropertyScrollPaddingInlineEnd,
  scrollPaddingInlineStart?: PropertyScrollPaddingInlineStart,
  scrollPaddingLeft?: PropertyScrollPaddingLeft,
  scrollPaddingRight?: PropertyScrollPaddingRight,
  scrollPaddingTop?: PropertyScrollPaddingTop,
  scrollSnapAlign?: PropertyScrollSnapAlign,
  scrollSnapStop?: PropertyScrollSnapStop,
  scrollSnapType?: PropertyScrollSnapType,
  scrollbarColor?: PropertyScrollbarColor,
  scrollbarWidth?: PropertyScrollbarWidth,
  shapeImageThreshold?: PropertyShapeImageThreshold,
  shapeMargin?: PropertyShapeMargin,
  shapeOutside?: PropertyShapeOutside,
  tabSize?: PropertyTabSize,
  tableLayout?: PropertyTableLayout,
  textAlign?: PropertyTextAlign,
  textAlignLast?: PropertyTextAlignLast,
  textCombineUpright?: PropertyTextCombineUpright,
  textDecorationColor?: PropertyTextDecorationColor,
  textDecorationLine?: PropertyTextDecorationLine,
  textDecorationSkip?: PropertyTextDecorationSkip,
  textDecorationSkipInk?: PropertyTextDecorationSkipInk,
  textDecorationStyle?: PropertyTextDecorationStyle,
  textDecorationThickness?: PropertyTextDecorationThickness,
  textDecorationWidth?: PropertyTextDecorationThickness,
  textEmphasisColor?: PropertyTextEmphasisColor,
  textEmphasisPosition?: GlobalsString,
  textEmphasisStyle?: PropertyTextEmphasisStyle,
  textIndent?: PropertyTextIndent,
  textJustify?: PropertyTextJustify,
  textOrientation?: PropertyTextOrientation,
  textOverflow?: PropertyTextOverflow,
  textRendering?: PropertyTextRendering,
  textShadow?: PropertyTextShadow,
  textSizeAdjust?: PropertyTextSizeAdjust,
  textTransform?: PropertyTextTransform,
  textUnderlineOffset?: PropertyTextUnderlineOffset,
  textUnderlinePosition?: PropertyTextUnderlinePosition,
  top?: PropertyTop,
  touchAction?: PropertyTouchAction,
  transform?: PropertyTransform,
  transformBox?: PropertyTransformBox,
  transformOrigin?: PropertyTransformOrigin,
  transformStyle?: PropertyTransformStyle,
  transitionDelay?: GlobalsString,
  transitionDuration?: GlobalsString,
  transitionProperty?: PropertyTransitionProperty,
  transitionTimingFunction?: PropertyTransitionTimingFunction,
  translate?: PropertyTranslate,
  unicodeBidi?: PropertyUnicodeBidi,
  userSelect?: PropertyUserSelect,
  verticalAlign?: PropertyVerticalAlign,
  visibility?: PropertyVisibility,
  whiteSpace?: PropertyWhiteSpace,
  widows?: GlobalsNumber,
  width?: PropertyWidth,
  willChange?: PropertyWillChange,
  wordBreak?: PropertyWordBreak,
  wordSpacing?: PropertyWordSpacing,
  wordWrap?: PropertyWordWrap,
  writingMode?: PropertyWritingMode,
  zIndex?: PropertyZIndex,
  zoom?: PropertyZoom,
  all?: Globals,
  animation?: PropertyAnimation,
  background?: PropertyBackground,
  border?: PropertyBorder,
  borderBlock?: PropertyBorderBlock,
  borderBlockEnd?: PropertyBorderBlockEnd,
  borderBlockStart?: PropertyBorderBlockStart,
  borderBottom?: PropertyBorderBottom,
  borderColor?: PropertyBorderColor,
  borderImage?: PropertyBorderImage,
  borderInline?: PropertyBorderInline,
  borderInlineEnd?: PropertyBorderInlineEnd,
  borderInlineStart?: PropertyBorderInlineStart,
  borderLeft?: PropertyBorderLeft,
  borderRadius?: PropertyBorderRadius,
  borderRight?: PropertyBorderRight,
  borderStyle?: PropertyBorderStyle,
  borderTop?: PropertyBorderTop,
  borderWidth?: PropertyBorderWidth,
  columnRule?: PropertyColumnRule,
  columns?: PropertyColumns,
  flex?: PropertyFlex,
  flexFlow?: PropertyFlexFlow,
  font?: PropertyFont,
  gap?: PropertyGap,
  grid?: PropertyGrid,
  gridArea?: PropertyGridArea,
  gridColumn?: PropertyGridColumn,
  gridRow?: PropertyGridRow,
  gridTemplate?: PropertyGridTemplate,
  lineClamp?: PropertyLineClamp,
  listStyle?: PropertyListStyle,
  margin?: PropertyMargin,
  mask?: PropertyMask,
  maskBorder?: PropertyMaskBorder,
  motion?: PropertyOffset,
  offset?: PropertyOffset,
  outline?: PropertyOutline,
  padding?: PropertyPadding,
  placeItems?: PropertyPlaceItems,
  placeSelf?: PropertyPlaceSelf,
  textDecoration?: PropertyTextDecoration,
  textEmphasis?: PropertyTextEmphasis,
  transition?: PropertyTransition,
  MozAnimationDelay?: GlobalsString,
  MozAnimationDirection?: PropertyAnimationDirection,
  MozAnimationDuration?: GlobalsString,
  MozAnimationFillMode?: PropertyAnimationFillMode,
  MozAnimationIterationCount?: PropertyAnimationIterationCount,
  MozAnimationName?: PropertyAnimationName,
  MozAnimationPlayState?: PropertyAnimationPlayState,
  MozAnimationTimingFunction?: PropertyAnimationTimingFunction,
  MozAppearance?: PropertyMozAppearance,
  MozBackfaceVisibility?: PropertyBackfaceVisibility,
  MozBorderBottomColors?: PropertyMozBorderBottomColors,
  MozBorderEndColor?: PropertyBorderInlineEndColor,
  MozBorderEndStyle?: PropertyBorderInlineEndStyle,
  MozBorderEndWidth?: PropertyBorderInlineEndWidth,
  MozBorderLeftColors?: PropertyMozBorderLeftColors,
  MozBorderRightColors?: PropertyMozBorderRightColors,
  MozBorderStartColor?: PropertyBorderInlineStartColor,
  MozBorderStartStyle?: PropertyBorderInlineStartStyle,
  MozBorderTopColors?: PropertyMozBorderTopColors,
  MozBoxSizing?: PropertyBoxSizing,
  MozColumnCount?: PropertyColumnCount,
  MozColumnFill?: PropertyColumnFill,
  MozColumnGap?: PropertyColumnGap,
  MozColumnRuleColor?: PropertyColumnRuleColor,
  MozColumnRuleStyle?: PropertyColumnRuleStyle,
  MozColumnRuleWidth?: PropertyColumnRuleWidth,
  MozColumnWidth?: PropertyColumnWidth,
  MozContextProperties?: PropertyMozContextProperties,
  MozFloatEdge?: PropertyMozFloatEdge,
  MozFontFeatureSettings?: PropertyFontFeatureSettings,
  MozFontLanguageOverride?: PropertyFontLanguageOverride,
  MozForceBrokenImageIcon?: GlobalsNumber,
  MozHyphens?: PropertyHyphens,
  MozImageRegion?: PropertyMozImageRegion,
  MozMarginEnd?: PropertyMarginInlineEnd,
  MozMarginStart?: PropertyMarginInlineStart,
  MozOrient?: PropertyMozOrient,
  MozOutlineRadiusBottomleft?: PropertyMozOutlineRadiusBottomleft,
  MozOutlineRadiusBottomright?: PropertyMozOutlineRadiusBottomright,
  MozOutlineRadiusTopleft?: PropertyMozOutlineRadiusTopleft,
  MozOutlineRadiusTopright?: PropertyMozOutlineRadiusTopright,
  MozPaddingEnd?: PropertyPaddingInlineEnd,
  MozPaddingStart?: PropertyPaddingInlineStart,
  MozPerspective?: PropertyPerspective,
  MozPerspectiveOrigin?: PropertyPerspectiveOrigin,
  MozStackSizing?: PropertyMozStackSizing,
  MozTabSize?: PropertyTabSize,
  MozTextSizeAdjust?: PropertyTextSizeAdjust,
  MozTransformOrigin?: PropertyTransformOrigin,
  MozTransformStyle?: PropertyTransformStyle,
  MozTransitionDelay?: GlobalsString,
  MozTransitionDuration?: GlobalsString,
  MozTransitionProperty?: PropertyTransitionProperty,
  MozTransitionTimingFunction?: PropertyTransitionTimingFunction,
  MozUserFocus?: PropertyMozUserFocus,
  MozUserModify?: PropertyMozUserModify,
  MozUserSelect?: PropertyUserSelect,
  MozWindowDragging?: PropertyMozWindowDragging,
  msAccelerator?: PropertyMsAccelerator,
  msAlignSelf?: PropertyAlignSelf,
  msBlockProgression?: PropertyMsBlockProgression,
  msContentZoomChaining?: PropertyMsContentZoomChaining,
  msContentZoomLimitMax?: GlobalsString,
  msContentZoomLimitMin?: GlobalsString,
  msContentZoomSnapPoints?: GlobalsString,
  msContentZoomSnapType?: PropertyMsContentZoomSnapType,
  msContentZooming?: PropertyMsContentZooming,
  msFilter?: GlobalsString,
  msFlexDirection?: PropertyFlexDirection,
  msFlexPositive?: GlobalsNumber,
  msFlowFrom?: PropertyMsFlowFrom,
  msFlowInto?: PropertyMsFlowInto,
  msGridColumns?: PropertyGridAutoColumns,
  msGridRows?: PropertyGridAutoRows,
  msHighContrastAdjust?: PropertyMsHighContrastAdjust,
  msHyphenateLimitChars?: PropertyMsHyphenateLimitChars,
  msHyphenateLimitLines?: PropertyMsHyphenateLimitLines,
  msHyphenateLimitZone?: PropertyMsHyphenateLimitZone,
  msHyphens?: PropertyHyphens,
  msImeAlign?: PropertyMsImeAlign,
  msLineBreak?: PropertyLineBreak,
  msOrder?: GlobalsNumber,
  msOverflowStyle?: PropertyMsOverflowStyle,
  msOverflowX?: PropertyOverflowX,
  msOverflowY?: PropertyOverflowY,
  msScrollChaining?: PropertyMsScrollChaining,
  msScrollLimitXMax?: PropertyMsScrollLimitXMax,
  msScrollLimitXMin?: PropertyMsScrollLimitXMin,
  msScrollLimitYMax?: PropertyMsScrollLimitYMax,
  msScrollLimitYMin?: PropertyMsScrollLimitYMin,
  msScrollRails?: PropertyMsScrollRails,
  msScrollSnapPointsX?: GlobalsString,
  msScrollSnapPointsY?: GlobalsString,
  msScrollSnapType?: PropertyMsScrollSnapType,
  msScrollTranslation?: PropertyMsScrollTranslation,
  msScrollbar3dlightColor?: PropertyMsScrollbar3dlightColor,
  msScrollbarArrowColor?: PropertyMsScrollbarArrowColor,
  msScrollbarBaseColor?: PropertyMsScrollbarBaseColor,
  msScrollbarDarkshadowColor?: PropertyMsScrollbarDarkshadowColor,
  msScrollbarFaceColor?: PropertyMsScrollbarFaceColor,
  msScrollbarHighlightColor?: PropertyMsScrollbarHighlightColor,
  msScrollbarShadowColor?: PropertyMsScrollbarShadowColor,
  msScrollbarTrackColor?: PropertyMsScrollbarTrackColor,
  msTextAutospace?: PropertyMsTextAutospace,
  msTextCombineHorizontal?: PropertyTextCombineUpright,
  msTextOverflow?: PropertyTextOverflow,
  msTouchAction?: PropertyTouchAction,
  msTouchSelect?: PropertyMsTouchSelect,
  msTransform?: PropertyTransform,
  msTransformOrigin?: PropertyTransformOrigin,
  msTransitionDelay?: GlobalsString,
  msTransitionDuration?: GlobalsString,
  msTransitionProperty?: PropertyTransitionProperty,
  msTransitionTimingFunction?: PropertyTransitionTimingFunction,
  msUserSelect?: PropertyMsUserSelect,
  msWordBreak?: PropertyWordBreak,
  msWrapFlow?: PropertyMsWrapFlow,
  msWrapMargin?: PropertyMsWrapMargin,
  msWrapThrough?: PropertyMsWrapThrough,
  msWritingMode?: PropertyWritingMode,
  OObjectFit?: PropertyObjectFit,
  OObjectPosition?: PropertyObjectPosition,
  OTabSize?: PropertyTabSize,
  OTextOverflow?: PropertyTextOverflow,
  OTransformOrigin?: PropertyTransformOrigin,
  WebkitAlignContent?: PropertyAlignContent,
  WebkitAlignItems?: PropertyAlignItems,
  WebkitAlignSelf?: PropertyAlignSelf,
  WebkitAnimationDelay?: GlobalsString,
  WebkitAnimationDirection?: PropertyAnimationDirection,
  WebkitAnimationDuration?: GlobalsString,
  WebkitAnimationFillMode?: PropertyAnimationFillMode,
  WebkitAnimationIterationCount?: PropertyAnimationIterationCount,
  WebkitAnimationName?: PropertyAnimationName,
  WebkitAnimationPlayState?: PropertyAnimationPlayState,
  WebkitAnimationTimingFunction?: PropertyAnimationTimingFunction,
  WebkitAppearance?: PropertyWebkitAppearance,
  WebkitBackdropFilter?: PropertyBackdropFilter,
  WebkitBackfaceVisibility?: PropertyBackfaceVisibility,
  WebkitBackgroundClip?: PropertyBackgroundClip,
  WebkitBackgroundOrigin?: PropertyBackgroundOrigin,
  WebkitBackgroundSize?: PropertyBackgroundSize,
  WebkitBorderBeforeColor?: PropertyWebkitBorderBeforeColor,
  WebkitBorderBeforeStyle?: PropertyWebkitBorderBeforeStyle,
  WebkitBorderBeforeWidth?: PropertyWebkitBorderBeforeWidth,
  WebkitBorderBottomLeftRadius?: PropertyBorderBottomLeftRadius,
  WebkitBorderBottomRightRadius?: PropertyBorderBottomRightRadius,
  WebkitBorderImageSlice?: PropertyBorderImageSlice,
  WebkitBorderTopLeftRadius?: PropertyBorderTopLeftRadius,
  WebkitBorderTopRightRadius?: PropertyBorderTopRightRadius,
  WebkitBoxDecorationBreak?: PropertyBoxDecorationBreak,
  WebkitBoxReflect?: PropertyWebkitBoxReflect,
  WebkitBoxShadow?: PropertyBoxShadow,
  WebkitBoxSizing?: PropertyBoxSizing,
  WebkitClipPath?: PropertyClipPath,
  WebkitColorAdjust?: PropertyColorAdjust,
  WebkitColumnCount?: PropertyColumnCount,
  WebkitColumnFill?: PropertyColumnFill,
  WebkitColumnGap?: PropertyColumnGap,
  WebkitColumnRuleColor?: PropertyColumnRuleColor,
  WebkitColumnRuleStyle?: PropertyColumnRuleStyle,
  WebkitColumnRuleWidth?: PropertyColumnRuleWidth,
  WebkitColumnSpan?: PropertyColumnSpan,
  WebkitColumnWidth?: PropertyColumnWidth,
  WebkitFilter?: PropertyFilter,
  WebkitFlexBasis?: PropertyFlexBasis,
  WebkitFlexDirection?: PropertyFlexDirection,
  WebkitFlexGrow?: GlobalsNumber,
  WebkitFlexShrink?: GlobalsNumber,
  WebkitFlexWrap?: PropertyFlexWrap,
  WebkitFontFeatureSettings?: PropertyFontFeatureSettings,
  WebkitFontKerning?: PropertyFontKerning,
  WebkitFontVariantLigatures?: PropertyFontVariantLigatures,
  WebkitHyphens?: PropertyHyphens,
  WebkitJustifyContent?: PropertyJustifyContent,
  WebkitLineBreak?: PropertyLineBreak,
  WebkitLineClamp?: PropertyWebkitLineClamp,
  WebkitMarginEnd?: PropertyMarginInlineEnd,
  WebkitMarginStart?: PropertyMarginInlineStart,
  WebkitMaskAttachment?: PropertyWebkitMaskAttachment,
  WebkitMaskClip?: PropertyWebkitMaskClip,
  WebkitMaskComposite?: PropertyWebkitMaskComposite,
  WebkitMaskImage?: PropertyWebkitMaskImage,
  WebkitMaskOrigin?: PropertyWebkitMaskOrigin,
  WebkitMaskPosition?: PropertyWebkitMaskPosition,
  WebkitMaskPositionX?: PropertyWebkitMaskPositionX,
  WebkitMaskPositionY?: PropertyWebkitMaskPositionY,
  WebkitMaskRepeat?: PropertyWebkitMaskRepeat,
  WebkitMaskRepeatX?: PropertyWebkitMaskRepeatX,
  WebkitMaskRepeatY?: PropertyWebkitMaskRepeatY,
  WebkitMaskSize?: PropertyWebkitMaskSize,
  WebkitMaxInlineSize?: PropertyMaxInlineSize,
  WebkitOrder?: GlobalsNumber,
  WebkitOverflowScrolling?: PropertyWebkitOverflowScrolling,
  WebkitPaddingEnd?: PropertyPaddingInlineEnd,
  WebkitPaddingStart?: PropertyPaddingInlineStart,
  WebkitPerspective?: PropertyPerspective,
  WebkitPerspectiveOrigin?: PropertyPerspectiveOrigin,
  WebkitScrollSnapType?: PropertyScrollSnapType,
  WebkitShapeMargin?: PropertyShapeMargin,
  WebkitTapHighlightColor?: PropertyWebkitTapHighlightColor,
  WebkitTextCombine?: PropertyTextCombineUpright,
  WebkitTextDecorationColor?: PropertyTextDecorationColor,
  WebkitTextDecorationLine?: PropertyTextDecorationLine,
  WebkitTextDecorationSkip?: PropertyTextDecorationSkip,
  WebkitTextDecorationStyle?: PropertyTextDecorationStyle,
  WebkitTextEmphasisColor?: PropertyTextEmphasisColor,
  WebkitTextEmphasisPosition?: GlobalsString,
  WebkitTextEmphasisStyle?: PropertyTextEmphasisStyle,
  WebkitTextFillColor?: PropertyWebkitTextFillColor,
  WebkitTextOrientation?: PropertyTextOrientation,
  WebkitTextSizeAdjust?: PropertyTextSizeAdjust,
  WebkitTextStrokeColor?: PropertyWebkitTextStrokeColor,
  WebkitTextStrokeWidth?: PropertyWebkitTextStrokeWidth,
  WebkitTouchCallout?: PropertyWebkitTouchCallout,
  WebkitTransform?: PropertyTransform,
  WebkitTransformOrigin?: PropertyTransformOrigin,
  WebkitTransformStyle?: PropertyTransformStyle,
  WebkitTransitionDelay?: GlobalsString,
  WebkitTransitionDuration?: GlobalsString,
  WebkitTransitionProperty?: PropertyTransitionProperty,
  WebkitTransitionTimingFunction?: PropertyTransitionTimingFunction,
  WebkitUserModify?: PropertyWebkitUserModify,
  WebkitUserSelect?: PropertyUserSelect,
  WebkitWritingMode?: PropertyWritingMode,
  MozAnimation?: PropertyAnimation,
  MozBorderImage?: PropertyBorderImage,
  MozColumnRule?: PropertyColumnRule,
  MozColumns?: PropertyColumns,
  MozTransition?: PropertyTransition,
  msContentZoomLimit?: GlobalsString,
  msContentZoomSnap?: PropertyMsContentZoomSnap,
  msFlex?: PropertyFlex,
  msScrollLimit?: GlobalsString,
  msScrollSnapX?: GlobalsString,
  msScrollSnapY?: GlobalsString,
  msTransition?: PropertyTransition,
  WebkitAnimation?: PropertyAnimation,
  WebkitBorderBefore?: PropertyWebkitBorderBefore,
  WebkitBorderImage?: PropertyBorderImage,
  WebkitBorderRadius?: PropertyBorderRadius,
  WebkitColumnRule?: PropertyColumnRule,
  WebkitColumns?: PropertyColumns,
  WebkitFlex?: PropertyFlex,
  WebkitFlexFlow?: PropertyFlexFlow,
  WebkitMask?: PropertyWebkitMask,
  WebkitTextEmphasis?: PropertyTextEmphasis,
  WebkitTextStroke?: PropertyWebkitTextStroke,
  WebkitTransition?: PropertyTransition,
  boxAlign?: PropertyBoxAlign,
  boxDirection?: PropertyBoxDirection,
  boxFlex?: GlobalsNumber,
  boxFlexGroup?: GlobalsNumber,
  boxLines?: PropertyBoxLines,
  boxOrdinalGroup?: GlobalsNumber,
  boxOrient?: PropertyBoxOrient,
  boxPack?: PropertyBoxPack,
  clip?: PropertyClip,
  fontVariantAlternates?: PropertyFontVariantAlternates,
  gridColumnGap?: PropertyGridColumnGap,
  gridGap?: PropertyGridGap,
  gridRowGap?: PropertyGridRowGap,
  imeMode?: PropertyImeMode,
  offsetBlock?: PropertyInsetBlock,
  offsetBlockEnd?: PropertyInsetBlockEnd,
  offsetBlockStart?: PropertyInsetBlockStart,
  offsetInline?: PropertyInsetInline,
  offsetInlineEnd?: PropertyInsetInlineEnd,
  offsetInlineStart?: PropertyInsetInlineStart,
  scrollSnapCoordinate?: PropertyScrollSnapCoordinate,
  scrollSnapDestination?: PropertyScrollSnapDestination,
  scrollSnapPointsX?: PropertyScrollSnapPointsX,
  scrollSnapPointsY?: PropertyScrollSnapPointsY,
  scrollSnapTypeX?: PropertyScrollSnapTypeX,
  scrollSnapTypeY?: PropertyScrollSnapTypeY,
  textCombineHorizontal?: PropertyTextCombineUpright,
  KhtmlBoxAlign?: PropertyBoxAlign,
  KhtmlBoxDirection?: PropertyBoxDirection,
  KhtmlBoxFlex?: GlobalsNumber,
  KhtmlBoxFlexGroup?: GlobalsNumber,
  KhtmlBoxLines?: PropertyBoxLines,
  KhtmlBoxOrdinalGroup?: GlobalsNumber,
  KhtmlBoxOrient?: PropertyBoxOrient,
  KhtmlBoxPack?: PropertyBoxPack,
  KhtmlLineBreak?: PropertyLineBreak,
  KhtmlOpacity?: PropertyOpacity,
  KhtmlUserSelect?: PropertyUserSelect,
  MozBackgroundClip?: PropertyBackgroundClip,
  MozBackgroundInlinePolicy?: PropertyBoxDecorationBreak,
  MozBackgroundOrigin?: PropertyBackgroundOrigin,
  MozBackgroundSize?: PropertyBackgroundSize,
  MozBinding?: PropertyMozBinding,
  MozBorderRadius?: PropertyBorderRadius,
  MozBorderRadiusBottomleft?: PropertyBorderBottomLeftRadius,
  MozBorderRadiusBottomright?: PropertyBorderBottomRightRadius,
  MozBorderRadiusTopleft?: PropertyBorderTopLeftRadius,
  MozBorderRadiusTopright?: PropertyBorderTopRightRadius,
  MozBoxAlign?: PropertyBoxAlign,
  MozBoxDirection?: PropertyBoxDirection,
  MozBoxFlex?: GlobalsNumber,
  MozBoxOrdinalGroup?: GlobalsNumber,
  MozBoxOrient?: PropertyBoxOrient,
  MozBoxPack?: PropertyBoxPack,
  MozBoxShadow?: PropertyBoxShadow,
  MozOpacity?: PropertyOpacity,
  MozOutline?: PropertyOutline,
  MozOutlineColor?: PropertyOutlineColor,
  MozOutlineRadius?: PropertyMozOutlineRadius,
  MozOutlineStyle?: PropertyOutlineStyle,
  MozOutlineWidth?: PropertyOutlineWidth,
  MozTextAlignLast?: PropertyTextAlignLast,
  MozTextBlink?: PropertyMozTextBlink,
  MozTextDecorationColor?: PropertyTextDecorationColor,
  MozTextDecorationLine?: PropertyTextDecorationLine,
  MozTextDecorationStyle?: PropertyTextDecorationStyle,
  MozUserInput?: PropertyMozUserInput,
  MozWindowShadow?: PropertyMozWindowShadow,
  msImeMode?: PropertyImeMode,
  OAnimation?: PropertyAnimation,
  OAnimationDelay?: GlobalsString,
  OAnimationDirection?: PropertyAnimationDirection,
  OAnimationDuration?: GlobalsString,
  OAnimationFillMode?: PropertyAnimationFillMode,
  OAnimationIterationCount?: PropertyAnimationIterationCount,
  OAnimationName?: PropertyAnimationName,
  OAnimationPlayState?: PropertyAnimationPlayState,
  OAnimationTimingFunction?: PropertyAnimationTimingFunction,
  OBackgroundSize?: PropertyBackgroundSize,
  OBorderImage?: PropertyBorderImage,
  OTransform?: PropertyTransform,
  OTransition?: PropertyTransition,
  OTransitionDelay?: GlobalsString,
  OTransitionDuration?: GlobalsString,
  OTransitionProperty?: PropertyTransitionProperty,
  OTransitionTimingFunction?: PropertyTransitionTimingFunction,
  WebkitBoxAlign?: PropertyBoxAlign,
  WebkitBoxDirection?: PropertyBoxDirection,
  WebkitBoxFlex?: GlobalsNumber,
  WebkitBoxFlexGroup?: GlobalsNumber,
  WebkitBoxLines?: PropertyBoxLines,
  WebkitBoxOrdinalGroup?: GlobalsNumber,
  WebkitBoxOrient?: PropertyBoxOrient,
  WebkitBoxPack?: PropertyBoxPack,
  WebkitScrollSnapPointsX?: PropertyScrollSnapPointsX,
  WebkitScrollSnapPointsY?: PropertyScrollSnapPointsY,
  alignmentBaseline?: PropertyAlignmentBaseline,
  baselineShift?: PropertyBaselineShift,
  clip?: PropertyClip,
  clipPath?: PropertyClipPath,
  clipRule?: PropertyClipRule,
  color?: PropertyColor,
  colorInterpolation?: PropertyColorInterpolation,
  colorRendering?: PropertyColorRendering,
  cursor?: PropertyCursor,
  direction?: PropertyDirection,
  display?: PropertyDisplay,
  dominantBaseline?: PropertyDominantBaseline,
  fill?: PropertyFill,
  fillOpacity?: GlobalsNumber,
  fillRule?: PropertyFillRule,
  filter?: PropertyFilter,
  floodColor?: PropertyFloodColor,
  floodOpacity?: GlobalsNumber,
  font?: PropertyFont,
  fontFamily?: PropertyFontFamily,
  fontSize?: PropertyFontSize,
  fontSizeAdjust?: PropertyFontSizeAdjust,
  fontStretch?: PropertyFontStretch,
  fontStyle?: PropertyFontStyle,
  fontVariant?: PropertyFontVariant,
  fontWeight?: PropertyFontWeight,
  glyphOrientationVertical?: PropertyGlyphOrientationVertical,
  imageRendering?: PropertyImageRendering,
  letterSpacing?: PropertyLetterSpacing,
  lightingColor?: PropertyLightingColor,
  lineHeight?: PropertyLineHeight,
  marker?: PropertyMarker,
  markerEnd?: PropertyMarkerEnd,
  markerMid?: PropertyMarkerMid,
  markerStart?: PropertyMarkerStart,
  mask?: PropertyMask,
  opacity?: PropertyOpacity,
  overflow?: PropertyOverflow,
  paintOrder?: PropertyPaintOrder,
  pointerEvents?: PropertyPointerEvents,
  shapeRendering?: PropertyShapeRendering,
  stopColor?: PropertyStopColor,
  stopOpacity?: GlobalsNumber,
  stroke?: PropertyStroke,
  strokeDasharray?: PropertyStrokeDasharray,
  strokeDashoffset?: PropertyStrokeDashoffset,
  strokeLinecap?: PropertyStrokeLinecap,
  strokeLinejoin?: PropertyStrokeLinejoin,
  strokeMiterlimit?: GlobalsNumber,
  strokeOpacity?: GlobalsNumber,
  strokeWidth?: PropertyStrokeWidth,
  textAnchor?: PropertyTextAnchor,
  textDecoration?: PropertyTextDecoration,
  textRendering?: PropertyTextRendering,
  unicodeBidi?: PropertyUnicodeBidi,
  vectorEffect?: PropertyVectorEffect,
  visibility?: PropertyVisibility,
  whiteSpace?: PropertyWhiteSpace,
  wordSpacing?: PropertyWordSpacing,
  writingMode?: PropertyWritingMode,
};

export type KeyframesObject = {
  [string]: StandardFlattenedProperties,
  from?: StandardFlattenedProperties,
  to?: StandardFlattenedProperties,
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
  | ":-moz-any()"
  | ":-moz-dir"
  | ":-webkit-any()"
  | "::cue"
  | "::part"
  | "::slotted"
  | ":dir"
  | ":has"
  | ":host"
  | ":host-context"
  | ":is"
  | ":lang"
  | ":matches()"
  | ":not"
  | ":nth-child"
  | ":nth-last-child"
  | ":nth-last-of-type"
  | ":nth-of-type"
  | ":where";

export type SimplePseudos =
  | ":-khtml-any-link"
  | ":-moz-any-link"
  | ":-moz-focusring"
  | ":-moz-full-screen"
  | ":-moz-placeholder"
  | ":-moz-read-only"
  | ":-moz-read-write"
  | ":-ms-fullscreen"
  | ":-ms-input-placeholder"
  | ":-webkit-any-link"
  | ":-webkit-full-screen"
  | "::-moz-placeholder"
  | "::-moz-progress-bar"
  | "::-moz-range-progress"
  | "::-moz-range-thumb"
  | "::-moz-range-track"
  | "::-moz-selection"
  | "::-ms-backdrop"
  | "::-ms-browse"
  | "::-ms-check"
  | "::-ms-clear"
  | "::-ms-fill"
  | "::-ms-fill-lower"
  | "::-ms-fill-upper"
  | "::-ms-input-placeholder"
  | "::-ms-reveal"
  | "::-ms-thumb"
  | "::-ms-ticks-after"
  | "::-ms-ticks-before"
  | "::-ms-tooltip"
  | "::-ms-track"
  | "::-ms-value"
  | "::-webkit-backdrop"
  | "::-webkit-input-placeholder"
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
  | "::marker"
  | "::placeholder"
  | "::selection"
  | "::spelling-error"
  | ":active"
  | ":after"
  | ":any-link"
  | ":before"
  | ":blank"
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
  | ":focus-visible"
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

export type HtmlAttributes =
  | "[-webkit-dropzone]"
  | "[-webkit-slot]"
  | "[abbr]"
  | "[accept-charset]"
  | "[accept]"
  | "[accesskey]"
  | "[action]"
  | "[align]"
  | "[alink]"
  | "[allow]"
  | "[allowfullscreen]"
  | "[allowpaymentrequest]"
  | "[alt]"
  | "[archive]"
  | "[async]"
  | "[autobuffer]"
  | "[autocapitalize]"
  | "[autocomplete]"
  | "[autofocus]"
  | "[autoplay]"
  | "[axis]"
  | "[background]"
  | "[behavior]"
  | "[bgcolor]"
  | "[border]"
  | "[bottommargin]"
  | "[buffered]"
  | "[cellpadding]"
  | "[cellspacing]"
  | "[char]"
  | "[charoff]"
  | "[charset]"
  | "[checked]"
  | "[cite]"
  | "[class]"
  | "[classid]"
  | "[clear]"
  | "[code]"
  | "[codebase]"
  | "[codetype]"
  | "[color]"
  | "[cols]"
  | "[colspan]"
  | "[command]"
  | "[compact]"
  | "[content]"
  | "[contenteditable]"
  | "[contextmenu]"
  | "[controls]"
  | "[coords]"
  | "[crossorigin]"
  | "[data]"
  | "[datafld]"
  | "[datasrc]"
  | "[datetime]"
  | "[declare]"
  | "[decoding]"
  | "[default]"
  | "[defer]"
  | "[dir]"
  | "[direction]"
  | "[disabled]"
  | "[download]"
  | "[draggable]"
  | "[dropzone]"
  | "[enctype]"
  | "[exportparts]"
  | "[face]"
  | "[for]"
  | "[form]"
  | "[formaction]"
  | "[formenctype]"
  | "[formmethod]"
  | "[formnovalidate]"
  | "[formtarget]"
  | "[frame]"
  | "[frameborder]"
  | "[headers]"
  | "[height]"
  | "[hidden]"
  | "[high]"
  | "[href]"
  | "[hreflang]"
  | "[hspace]"
  | "[http-equiv]"
  | "[icon]"
  | "[id]"
  | "[inputmode]"
  | "[integrity]"
  | "[intrinsicsize]"
  | "[is]"
  | "[ismap]"
  | "[itemid]"
  | "[itemprop]"
  | "[itemref]"
  | "[itemscope]"
  | "[itemtype]"
  | "[kind]"
  | "[label]"
  | "[lang]"
  | "[language]"
  | "[leftmargin]"
  | "[link]"
  | "[longdesc]"
  | "[loop]"
  | "[low]"
  | "[manifest]"
  | "[marginheight]"
  | "[marginwidth]"
  | "[max]"
  | "[maxlength]"
  | "[mayscript]"
  | "[media]"
  | "[method]"
  | "[methods]"
  | "[min]"
  | "[minlength]"
  | "[moz-opaque]"
  | "[mozallowfullscreen]"
  | "[mozbrowser]"
  | "[mozcurrentsampleoffset]"
  | "[msallowfullscreen]"
  | "[multiple]"
  | "[muted]"
  | "[name]"
  | "[nohref]"
  | "[nomodule]"
  | "[noresize]"
  | "[noshade]"
  | "[novalidate]"
  | "[nowrap]"
  | "[object]"
  | "[onafterprint]"
  | "[onbeforeprint]"
  | "[onbeforeunload]"
  | "[onblur]"
  | "[onerror]"
  | "[onfocus]"
  | "[onhashchange]"
  | "[onlanguagechange]"
  | "[onload]"
  | "[onmessage]"
  | "[onoffline]"
  | "[ononline]"
  | "[onpopstate]"
  | "[onredo]"
  | "[onresize]"
  | "[onstorage]"
  | "[onundo]"
  | "[onunload]"
  | "[open]"
  | "[optimum]"
  | "[part]"
  | "[ping]"
  | "[placeholder]"
  | "[played]"
  | "[poster]"
  | "[prefetch]"
  | "[preload]"
  | "[profile]"
  | "[prompt]"
  | "[radiogroup]"
  | "[readonly]"
  | "[referrerPolicy]"
  | "[referrerpolicy]"
  | "[rel]"
  | "[required]"
  | "[rev]"
  | "[reversed]"
  | "[rightmargin]"
  | "[rows]"
  | "[rowspan]"
  | "[rules]"
  | "[sandbox-allow-modals]"
  | "[sandbox-allow-popups-to-escape-sandbox]"
  | "[sandbox-allow-popups]"
  | "[sandbox-allow-presentation]"
  | "[sandbox-allow-storage-access-by-user-activation]"
  | "[sandbox-allow-top-navigation-by-user-activation]"
  | "[sandbox]"
  | "[scope]"
  | "[scoped]"
  | "[scrollamount]"
  | "[scrolldelay]"
  | "[scrolling]"
  | "[selected]"
  | "[shape]"
  | "[size]"
  | "[sizes]"
  | "[slot]"
  | "[span]"
  | "[spellcheck]"
  | "[src]"
  | "[srcdoc]"
  | "[srclang]"
  | "[srcset]"
  | "[standby]"
  | "[start]"
  | "[style]"
  | "[summary]"
  | "[tabindex]"
  | "[target]"
  | "[text]"
  | "[title]"
  | "[topmargin]"
  | "[translate]"
  | "[truespeed]"
  | "[type]"
  | "[typemustmatch]"
  | "[usemap]"
  | "[valign]"
  | "[value]"
  | "[valuetype]"
  | "[version]"
  | "[vlink]"
  | "[volume]"
  | "[vspace]"
  | "[webkitallowfullscreen]"
  | "[width]"
  | "[wrap]"
  | "[xmlns]";

export type SvgAttributes =
  | "[accent-height]"
  | "[alignment-baseline]"
  | "[allowReorder]"
  | "[alphabetic]"
  | "[animation]"
  | "[arabic-form]"
  | "[ascent]"
  | "[attributeName]"
  | "[attributeType]"
  | "[azimuth]"
  | "[baseFrequency]"
  | "[baseProfile]"
  | "[baseline-shift]"
  | "[bbox]"
  | "[begin]"
  | "[bias]"
  | "[by]"
  | "[calcMode]"
  | "[cap-height]"
  | "[class]"
  | "[clip-path]"
  | "[clip-rule]"
  | "[clipPathUnits]"
  | "[clip]"
  | "[color-interpolation-filters]"
  | "[color-interpolation]"
  | "[color-profile]"
  | "[color-rendering]"
  | "[color]"
  | "[contentScriptType]"
  | "[contentStyleType]"
  | "[cursor]"
  | "[cx]"
  | "[cy]"
  | "[d]"
  | "[descent]"
  | "[diffuseConstant]"
  | "[direction]"
  | "[display]"
  | "[divisor]"
  | "[document]"
  | "[dominant-baseline]"
  | "[download]"
  | "[dur]"
  | "[dx]"
  | "[dy]"
  | "[edgeMode]"
  | "[elevation]"
  | "[enable-background]"
  | "[externalResourcesRequired]"
  | "[fill-opacity]"
  | "[fill-rule]"
  | "[fill]"
  | "[filterRes]"
  | "[filterUnits]"
  | "[filter]"
  | "[flood-color]"
  | "[flood-opacity]"
  | "[font-family]"
  | "[font-size-adjust]"
  | "[font-size]"
  | "[font-stretch]"
  | "[font-style]"
  | "[font-variant]"
  | "[font-weight]"
  | "[format]"
  | "[fr]"
  | "[from]"
  | "[fx]"
  | "[fy]"
  | "[g1]"
  | "[g2]"
  | "[global]"
  | "[glyph-name]"
  | "[glyph-orientation-horizontal]"
  | "[glyph-orientation-vertical]"
  | "[glyphRef]"
  | "[gradientTransform]"
  | "[gradientUnits]"
  | "[graphical]"
  | "[hanging]"
  | "[hatchContentUnits]"
  | "[hatchUnits]"
  | "[height]"
  | "[horiz-adv-x]"
  | "[horiz-origin-x]"
  | "[horiz-origin-y]"
  | "[href]"
  | "[hreflang]"
  | "[id]"
  | "[ideographic]"
  | "[image-rendering]"
  | "[in2]"
  | "[in]"
  | "[k1]"
  | "[k2]"
  | "[k3]"
  | "[k4]"
  | "[k]"
  | "[kernelMatrix]"
  | "[kernelUnitLength]"
  | "[kerning]"
  | "[keyPoints]"
  | "[lang]"
  | "[lengthAdjust]"
  | "[letter-spacing]"
  | "[lighterForError]"
  | "[lighting-color]"
  | "[limitingConeAngle]"
  | "[local]"
  | "[marker-end]"
  | "[marker-mid]"
  | "[marker-start]"
  | "[markerHeight]"
  | "[markerUnits]"
  | "[markerWidth]"
  | "[maskContentUnits]"
  | "[maskUnits]"
  | "[mask]"
  | "[mathematical]"
  | "[media]"
  | "[method]"
  | "[mode]"
  | "[name]"
  | "[numOctaves]"
  | "[offset]"
  | "[opacity]"
  | "[operator]"
  | "[order]"
  | "[orient]"
  | "[orientation]"
  | "[origin]"
  | "[overflow]"
  | "[overline-position]"
  | "[overline-thickness]"
  | "[paint-order]"
  | "[panose-1]"
  | "[path]"
  | "[patternContentUnits]"
  | "[patternTransform]"
  | "[patternUnits]"
  | "[ping]"
  | "[pitch]"
  | "[pointer-events]"
  | "[pointsAtX]"
  | "[pointsAtY]"
  | "[pointsAtZ]"
  | "[points]"
  | "[preserveAlpha]"
  | "[preserveAspectRatio]"
  | "[primitiveUnits]"
  | "[r]"
  | "[radius]"
  | "[refX]"
  | "[refY]"
  | "[referrerPolicy]"
  | "[rel]"
  | "[rendering-intent]"
  | "[repeatCount]"
  | "[requiredExtensions]"
  | "[requiredFeatures]"
  | "[rotate]"
  | "[rx]"
  | "[ry]"
  | "[scale]"
  | "[seed]"
  | "[shape-rendering]"
  | "[side]"
  | "[slope]"
  | "[solid-color]"
  | "[solid-opacity]"
  | "[spacing]"
  | "[specularConstant]"
  | "[specularExponent]"
  | "[spreadMethod]"
  | "[startOffset]"
  | "[stdDeviation]"
  | "[stemh]"
  | "[stemv]"
  | "[stitchTiles]"
  | "[stop-color]"
  | "[stop-opacity]"
  | "[strikethrough-position]"
  | "[strikethrough-thickness]"
  | "[string]"
  | "[stroke-dasharray]"
  | "[stroke-dashoffset]"
  | "[stroke-linecap]"
  | "[stroke-linejoin]"
  | "[stroke-miterlimit]"
  | "[stroke-opacity]"
  | "[stroke-width]"
  | "[stroke]"
  | "[style]"
  | "[surfaceScale]"
  | "[systemLanguage]"
  | "[tabindex]"
  | "[targetX]"
  | "[targetY]"
  | "[target]"
  | "[text-anchor]"
  | "[text-decoration]"
  | "[text-overflow]"
  | "[text-rendering]"
  | "[textLength]"
  | "[title]"
  | "[to]"
  | "[transform]"
  | "[type]"
  | "[u1]"
  | "[u2]"
  | "[underline-position]"
  | "[underline-thickness]"
  | "[unicode-bidi]"
  | "[unicode-range]"
  | "[unicode]"
  | "[units-per-em]"
  | "[v-alphabetic]"
  | "[v-hanging]"
  | "[v-ideographic]"
  | "[v-mathematical]"
  | "[values]"
  | "[vector-effect]"
  | "[version]"
  | "[vert-adv-y]"
  | "[vert-origin-x]"
  | "[vert-origin-y]"
  | "[viewBox]"
  | "[viewTarget]"
  | "[visibility]"
  | "[white-space]"
  | "[width]"
  | "[widths]"
  | "[word-spacing]"
  | "[writing-mode]"
  | "[x-height]"
  | "[x1]"
  | "[x2]"
  | "[xChannelSelector]"
  | "[x]"
  | "[y1]"
  | "[y2]"
  | "[yChannelSelector]"
  | "[y]"
  | "[z]"
  | "[zoomAndPan]";

export type Globals =
  | "-moz-initial"
  | "inherit"
  | "initial"
  | "revert"
  | "unset"
  | null;

type GlobalsString = Globals | string;

type GlobalsNumber = Globals | number;

export type PropertyAlignContent =
  | Globals
  | DataTypeContentDistribution
  | DataTypeContentPosition
  | "baseline"
  | "normal"
  | string;

export type PropertyAlignItems =
  | Globals
  | DataTypeSelfPosition
  | "baseline"
  | "normal"
  | "stretch"
  | string;

export type PropertyAlignSelf =
  | Globals
  | DataTypeSelfPosition
  | "auto"
  | "baseline"
  | "normal"
  | "stretch"
  | string;

export type PropertyAnimation = Globals | DataTypeSingleAnimation | string;

export type PropertyAnimationDirection =
  | Globals
  | DataTypeSingleAnimationDirection
  | string;

export type PropertyAnimationFillMode =
  | Globals
  | DataTypeSingleAnimationFillMode
  | string;

export type PropertyAnimationIterationCount =
  | Globals
  | "infinite"
  | string
  | number;

export type PropertyAnimationName = Globals | "none" | string | KeyframesObject;

export type PropertyAnimationPlayState =
  | Globals
  | "paused"
  | "running"
  | string;

export type PropertyAnimationTimingFunction =
  | Globals
  | DataTypeTimingFunction
  | string;

export type PropertyAppearance =
  | Globals
  | DataTypeCompat
  | "button"
  | "none"
  | "textfield";

export type PropertyBackdropFilter = Globals | "none" | string;

export type PropertyBackfaceVisibility = Globals | "hidden" | "visible";

export type PropertyBackground = Globals | DataTypeFinalBgLayer | string;

export type PropertyBackgroundAttachment =
  | Globals
  | DataTypeAttachment
  | string;

export type PropertyBackgroundBlendMode = Globals | DataTypeBlendMode | string;

export type PropertyBackgroundClip = Globals | DataTypeBox | string;

export type PropertyBackgroundColor = Globals | DataTypeColor;

export type PropertyBackgroundImage = Globals | "none" | string;

export type PropertyBackgroundOrigin = Globals | DataTypeBox | string;

export type PropertyBackgroundPosition = Globals | DataTypeBgPosition | string;

export type PropertyBackgroundPositionX =
  | Globals
  | TLength
  | "center"
  | "left"
  | "right"
  | "x-end"
  | "x-start"
  | string;

export type PropertyBackgroundPositionY =
  | Globals
  | TLength
  | "bottom"
  | "center"
  | "top"
  | "y-end"
  | "y-start"
  | string;

export type PropertyBackgroundRepeat = Globals | DataTypeRepeatStyle | string;

export type PropertyBackgroundSize = Globals | DataTypeBgSize | string;

export type PropertyBlockOverflow = Globals | "clip" | "ellipsis" | string;

export type PropertyBlockSize =
  | Globals
  | TLength
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "auto"
  | "available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | string;

export type PropertyBorder =
  | Globals
  | DataTypeLineWidth
  | DataTypeLineStyle
  | DataTypeColor
  | string;

export type PropertyBorderBlock =
  | Globals
  | DataTypeLineWidth
  | DataTypeLineStyle
  | DataTypeColor
  | string;

export type PropertyBorderBlockColor = Globals | DataTypeColor | string;

export type PropertyBorderBlockEnd =
  | Globals
  | DataTypeLineWidth
  | DataTypeLineStyle
  | DataTypeColor
  | string;

export type PropertyBorderBlockEndColor = Globals | DataTypeColor;

export type PropertyBorderBlockEndStyle = Globals | DataTypeLineStyle;

export type PropertyBorderBlockEndWidth = Globals | DataTypeLineWidth;

export type PropertyBorderBlockStart =
  | Globals
  | DataTypeLineWidth
  | DataTypeLineStyle
  | DataTypeColor
  | string;

export type PropertyBorderBlockStartColor = Globals | DataTypeColor;

export type PropertyBorderBlockStartStyle = Globals | DataTypeLineStyle;

export type PropertyBorderBlockStartWidth = Globals | DataTypeLineWidth;

export type PropertyBorderBlockStyle = Globals | DataTypeLineStyle;

export type PropertyBorderBlockWidth = Globals | DataTypeLineWidth;

export type PropertyBorderBottom =
  | Globals
  | DataTypeLineWidth
  | DataTypeLineStyle
  | DataTypeColor
  | string;

export type PropertyBorderBottomColor = Globals | DataTypeColor;

export type PropertyBorderBottomLeftRadius = Globals | TLength | string;

export type PropertyBorderBottomRightRadius = Globals | TLength | string;

export type PropertyBorderBottomStyle = Globals | DataTypeLineStyle;

export type PropertyBorderBottomWidth = Globals | DataTypeLineWidth;

export type PropertyBorderCollapse = Globals | "collapse" | "separate";

export type PropertyBorderColor = Globals | DataTypeColor | string;

export type PropertyBorderEndEndRadius = Globals | TLength | string;

export type PropertyBorderEndStartRadius = Globals | TLength | string;

export type PropertyBorderImage =
  | Globals
  | "none"
  | "repeat"
  | "round"
  | "space"
  | "stretch"
  | string
  | number;

export type PropertyBorderImageOutset = Globals | TLength | string | number;

export type PropertyBorderImageRepeat =
  | Globals
  | "repeat"
  | "round"
  | "space"
  | "stretch"
  | string;

export type PropertyBorderImageSlice = Globals | string | number;

export type PropertyBorderImageSource = Globals | "none" | string;

export type PropertyBorderImageWidth =
  | Globals
  | TLength
  | "auto"
  | string
  | number;

export type PropertyBorderInline =
  | Globals
  | DataTypeLineWidth
  | DataTypeLineStyle
  | DataTypeColor
  | string;

export type PropertyBorderInlineColor = Globals | DataTypeColor | string;

export type PropertyBorderInlineEnd =
  | Globals
  | DataTypeLineWidth
  | DataTypeLineStyle
  | DataTypeColor
  | string;

export type PropertyBorderInlineEndColor = Globals | DataTypeColor;

export type PropertyBorderInlineEndStyle = Globals | DataTypeLineStyle;

export type PropertyBorderInlineEndWidth = Globals | DataTypeLineWidth;

export type PropertyBorderInlineStart =
  | Globals
  | DataTypeLineWidth
  | DataTypeLineStyle
  | DataTypeColor
  | string;

export type PropertyBorderInlineStartColor = Globals | DataTypeColor;

export type PropertyBorderInlineStartStyle = Globals | DataTypeLineStyle;

export type PropertyBorderInlineStartWidth = Globals | DataTypeLineWidth;

export type PropertyBorderInlineStyle = Globals | DataTypeLineStyle;

export type PropertyBorderInlineWidth = Globals | DataTypeLineWidth;

export type PropertyBorderLeft =
  | Globals
  | DataTypeLineWidth
  | DataTypeLineStyle
  | DataTypeColor
  | string;

export type PropertyBorderLeftColor = Globals | DataTypeColor;

export type PropertyBorderLeftStyle = Globals | DataTypeLineStyle;

export type PropertyBorderLeftWidth = Globals | DataTypeLineWidth;

export type PropertyBorderRadius = Globals | TLength | string;

export type PropertyBorderRight =
  | Globals
  | DataTypeLineWidth
  | DataTypeLineStyle
  | DataTypeColor
  | string;

export type PropertyBorderRightColor = Globals | DataTypeColor;

export type PropertyBorderRightStyle = Globals | DataTypeLineStyle;

export type PropertyBorderRightWidth = Globals | DataTypeLineWidth;

export type PropertyBorderSpacing = Globals | TLength | string;

export type PropertyBorderStartEndRadius = Globals | TLength | string;

export type PropertyBorderStartStartRadius = Globals | TLength | string;

export type PropertyBorderStyle = Globals | DataTypeLineStyle | string;

export type PropertyBorderTop =
  | Globals
  | DataTypeLineWidth
  | DataTypeLineStyle
  | DataTypeColor
  | string;

export type PropertyBorderTopColor = Globals | DataTypeColor;

export type PropertyBorderTopLeftRadius = Globals | TLength | string;

export type PropertyBorderTopRightRadius = Globals | TLength | string;

export type PropertyBorderTopStyle = Globals | DataTypeLineStyle;

export type PropertyBorderTopWidth = Globals | DataTypeLineWidth;

export type PropertyBorderWidth = Globals | DataTypeLineWidth | string;

export type PropertyBottom = Globals | TLength | "auto" | string;

export type PropertyBoxAlign =
  | Globals
  | "baseline"
  | "center"
  | "end"
  | "start"
  | "stretch";

export type PropertyBoxDecorationBreak = Globals | "clone" | "slice";

export type PropertyBoxDirection = Globals | "inherit" | "normal" | "reverse";

export type PropertyBoxLines = Globals | "multiple" | "single";

export type PropertyBoxOrient =
  | Globals
  | "block-axis"
  | "horizontal"
  | "inherit"
  | "inline-axis"
  | "vertical";

export type PropertyBoxPack = Globals | "center" | "end" | "justify" | "start";

export type PropertyBoxShadow = Globals | "none" | string;

export type PropertyBoxSizing = Globals | "border-box" | "content-box";

export type PropertyBreakAfter =
  | Globals
  | "all"
  | "always"
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

export type PropertyBreakBefore =
  | Globals
  | "all"
  | "always"
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

export type PropertyBreakInside =
  | Globals
  | "auto"
  | "avoid"
  | "avoid-column"
  | "avoid-page"
  | "avoid-region";

export type PropertyCaptionSide =
  | Globals
  | "block-end"
  | "block-start"
  | "bottom"
  | "inline-end"
  | "inline-start"
  | "top";

export type PropertyCaretColor = Globals | DataTypeColor | "auto";

export type PropertyClear =
  | Globals
  | "both"
  | "inline-end"
  | "inline-start"
  | "left"
  | "none"
  | "right";

export type PropertyClip = Globals | "auto" | string;

export type PropertyClipPath = Globals | DataTypeGeometryBox | "none" | string;

export type PropertyColor = Globals | DataTypeColor;

export type PropertyColorAdjust = Globals | "economy" | "exact";

export type PropertyColumnCount = Globals | "auto" | number;

export type PropertyColumnFill = Globals | "auto" | "balance" | "balance-all";

export type PropertyColumnGap = Globals | TLength | "normal" | string;

export type PropertyColumnRule =
  | Globals
  | DataTypeLineWidth
  | DataTypeLineStyle
  | DataTypeColor
  | string;

export type PropertyColumnRuleColor = Globals | DataTypeColor;

export type PropertyColumnRuleStyle = Globals | DataTypeLineStyle | string;

export type PropertyColumnRuleWidth = Globals | DataTypeLineWidth | string;

export type PropertyColumnSpan = Globals | "all" | "none";

export type PropertyColumnWidth = Globals | TLength | "auto";

export type PropertyColumns = Globals | TLength | "auto" | string | number;

export type PropertyContain =
  | Globals
  | "content"
  | "layout"
  | "none"
  | "paint"
  | "size"
  | "strict"
  | "style"
  | string;

export type PropertyContent =
  | Globals
  | DataTypeContentList
  | "none"
  | "normal"
  | string;

export type PropertyCounterIncrement = Globals | "none" | string;

export type PropertyCounterReset = Globals | "none" | string;

export type PropertyCounterSet = Globals | "none" | string;

export type PropertyCursor =
  | Globals
  | "-moz-grab"
  | "-webkit-grab"
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

export type PropertyDirection = Globals | "ltr" | "rtl";

export type PropertyDisplay =
  | Globals
  | DataTypeDisplayOutside
  | DataTypeDisplayInside
  | DataTypeDisplayInternal
  | DataTypeDisplayLegacy
  | "contents"
  | "list-item"
  | "none"
  | string;

export type PropertyEmptyCells = Globals | "hide" | "show";

export type PropertyFilter = Globals | "none" | string;

export type PropertyFlex =
  | Globals
  | TLength
  | "auto"
  | "available"
  | "content"
  | "fit-content"
  | "max-content"
  | "min-content"
  | "none"
  | string
  | number;

export type PropertyFlexBasis =
  | Globals
  | TLength
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-auto"
  | "auto"
  | "available"
  | "content"
  | "fit-content"
  | "max-content"
  | "min-content"
  | string;

export type PropertyFlexDirection =
  | Globals
  | "column"
  | "column-reverse"
  | "row"
  | "row-reverse";

export type PropertyFlexFlow =
  | Globals
  | "column"
  | "column-reverse"
  | "nowrap"
  | "row"
  | "row-reverse"
  | "wrap"
  | "wrap-reverse"
  | string;

export type PropertyFlexWrap = Globals | "nowrap" | "wrap" | "wrap-reverse";

export type PropertyFloat =
  | Globals
  | "inline-end"
  | "inline-start"
  | "left"
  | "none"
  | "right";

export type PropertyFont =
  | Globals
  | "caption"
  | "icon"
  | "menu"
  | "message-box"
  | "small-caption"
  | "status-bar"
  | string;

export type PropertyFontFamily =
  | InitialPropertyFontFamily
  | InitialPropertyFontFamily[];

export type InitialPropertyFontFamily =
  | Globals
  | AtRuleFontFace
  | DataTypeGenericFamily
  | string;

export type PropertyFontFeatureSettings = Globals | "normal" | string;

export type PropertyFontKerning = Globals | "auto" | "none" | "normal";

export type PropertyFontLanguageOverride = Globals | "normal" | string;

export type PropertyFontOpticalSizing = Globals | "auto" | "none";

export type PropertyFontSize =
  | Globals
  | DataTypeAbsoluteSize
  | TLength
  | "larger"
  | "smaller"
  | string;

export type PropertyFontSizeAdjust = Globals | "none" | number;

export type PropertyFontStretch = Globals | DataTypeFontStretchAbsolute;

export type PropertyFontStyle =
  | Globals
  | "italic"
  | "normal"
  | "oblique"
  | string;

export type PropertyFontSynthesis =
  | Globals
  | "none"
  | "style"
  | "weight"
  | string;

export type PropertyFontVariant =
  | Globals
  | DataTypeEastAsianVariantValues
  | "all-petite-caps"
  | "all-small-caps"
  | "common-ligatures"
  | "contextual"
  | "diagonal-fractions"
  | "discretionary-ligatures"
  | "full-width"
  | "historical-forms"
  | "historical-ligatures"
  | "lining-nums"
  | "no-common-ligatures"
  | "no-contextual"
  | "no-discretionary-ligatures"
  | "no-historical-ligatures"
  | "none"
  | "normal"
  | "oldstyle-nums"
  | "ordinal"
  | "petite-caps"
  | "proportional-nums"
  | "proportional-width"
  | "ruby"
  | "slashed-zero"
  | "small-caps"
  | "stacked-fractions"
  | "tabular-nums"
  | "titling-caps"
  | "unicase"
  | string;

export type PropertyFontVariantAlternates =
  | Globals
  | "historical-forms"
  | "normal"
  | string;

export type PropertyFontVariantCaps =
  | Globals
  | "all-petite-caps"
  | "all-small-caps"
  | "normal"
  | "petite-caps"
  | "small-caps"
  | "titling-caps"
  | "unicase";

export type PropertyFontVariantEastAsian =
  | Globals
  | DataTypeEastAsianVariantValues
  | "full-width"
  | "normal"
  | "proportional-width"
  | "ruby"
  | string;

export type PropertyFontVariantLigatures =
  | Globals
  | "common-ligatures"
  | "contextual"
  | "discretionary-ligatures"
  | "historical-ligatures"
  | "no-common-ligatures"
  | "no-contextual"
  | "no-discretionary-ligatures"
  | "no-historical-ligatures"
  | "none"
  | "normal"
  | string;

export type PropertyFontVariantNumeric =
  | Globals
  | "diagonal-fractions"
  | "lining-nums"
  | "normal"
  | "oldstyle-nums"
  | "ordinal"
  | "proportional-nums"
  | "slashed-zero"
  | "stacked-fractions"
  | "tabular-nums"
  | string;

export type PropertyFontVariantPosition = Globals | "normal" | "sub" | "super";

export type PropertyFontVariationSettings = Globals | "normal" | string;

export type PropertyFontWeight =
  | Globals
  | DataTypeFontWeightAbsolute
  | "bolder"
  | "lighter";

export type PropertyGap = Globals | TLength | "normal" | string;

export type PropertyGrid = Globals | "none" | string;

export type PropertyGridArea = Globals | DataTypeGridLine | string;

export type PropertyGridAutoColumns = Globals | DataTypeTrackBreadth | string;

export type PropertyGridAutoFlow =
  | Globals
  | "column"
  | "dense"
  | "row"
  | string;

export type PropertyGridAutoRows = Globals | DataTypeTrackBreadth | string;

export type PropertyGridColumn = Globals | DataTypeGridLine | string;

export type PropertyGridColumnEnd = Globals | DataTypeGridLine;

export type PropertyGridColumnGap = Globals | TLength | string;

export type PropertyGridColumnStart = Globals | DataTypeGridLine;

export type PropertyGridGap = Globals | TLength | string;

export type PropertyGridRow = Globals | DataTypeGridLine | string;

export type PropertyGridRowEnd = Globals | DataTypeGridLine;

export type PropertyGridRowGap = Globals | TLength | string;

export type PropertyGridRowStart = Globals | DataTypeGridLine;

export type PropertyGridTemplate = Globals | "none" | string;

export type PropertyGridTemplateAreas = Globals | "none" | string;

export type PropertyGridTemplateColumns =
  | Globals
  | DataTypeTrackBreadth
  | "none"
  | "subgrid"
  | string;

export type PropertyGridTemplateRows =
  | Globals
  | DataTypeTrackBreadth
  | "none"
  | "subgrid"
  | string;

export type PropertyHangingPunctuation =
  | Globals
  | "allow-end"
  | "first"
  | "force-end"
  | "last"
  | "none"
  | string;

export type PropertyHeight =
  | Globals
  | TLength
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fit-content"
  | "auto"
  | "available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | string;

export type PropertyHyphens = Globals | "auto" | "manual" | "none";

export type PropertyImageOrientation = Globals | "flip" | "from-image" | string;

export type PropertyImageRendering =
  | Globals
  | "-moz-crisp-edges"
  | "-o-crisp-edges"
  | "-webkit-optimize-contrast"
  | "auto"
  | "crisp-edges"
  | "pixelated";

export type PropertyImageResolution = Globals | "from-image" | string;

export type PropertyImeMode =
  | Globals
  | "active"
  | "auto"
  | "disabled"
  | "inactive"
  | "normal";

export type PropertyInitialLetter = Globals | "normal" | string | number;

export type PropertyInlineSize =
  | Globals
  | TLength
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "auto"
  | "available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | string;

export type PropertyInset = Globals | TLength | "auto" | string;

export type PropertyInsetBlock = Globals | TLength | "auto" | string;

export type PropertyInsetBlockEnd = Globals | TLength | "auto" | string;

export type PropertyInsetBlockStart = Globals | TLength | "auto" | string;

export type PropertyInsetInline = Globals | TLength | "auto" | string;

export type PropertyInsetInlineEnd = Globals | TLength | "auto" | string;

export type PropertyInsetInlineStart = Globals | TLength | "auto" | string;

export type PropertyIsolation = Globals | "auto" | "isolate";

export type PropertyJustifyContent =
  | Globals
  | DataTypeContentDistribution
  | DataTypeContentPosition
  | "left"
  | "normal"
  | "right"
  | string;

export type PropertyJustifyItems =
  | Globals
  | DataTypeSelfPosition
  | "baseline"
  | "left"
  | "legacy"
  | "normal"
  | "right"
  | "stretch"
  | string;

export type PropertyJustifySelf =
  | Globals
  | DataTypeSelfPosition
  | "auto"
  | "baseline"
  | "left"
  | "normal"
  | "right"
  | "stretch"
  | string;

export type PropertyLeft = Globals | TLength | "auto" | string;

export type PropertyLetterSpacing = Globals | TLength | "normal";

export type PropertyLineBreak =
  | Globals
  | "anywhere"
  | "auto"
  | "loose"
  | "normal"
  | "strict";

export type PropertyLineClamp = Globals | "none" | number;

export type PropertyLineHeight = Globals | TLength | "normal" | string | number;

export type PropertyLineHeightStep = Globals | TLength;

export type PropertyListStyle =
  | Globals
  | "inside"
  | "none"
  | "outside"
  | string;

export type PropertyListStyleImage = Globals | "none" | string;

export type PropertyListStylePosition = Globals | "inside" | "outside";

export type PropertyListStyleType = Globals | "none" | string;

export type PropertyMargin = Globals | TLength | "auto" | string;

export type PropertyMarginBlock = Globals | TLength | "auto" | string;

export type PropertyMarginBlockEnd = Globals | TLength | "auto" | string;

export type PropertyMarginBlockStart = Globals | TLength | "auto" | string;

export type PropertyMarginBottom = Globals | TLength | "auto" | string;

export type PropertyMarginInline = Globals | TLength | "auto" | string;

export type PropertyMarginInlineEnd = Globals | TLength | "auto" | string;

export type PropertyMarginInlineStart = Globals | TLength | "auto" | string;

export type PropertyMarginLeft = Globals | TLength | "auto" | string;

export type PropertyMarginRight = Globals | TLength | "auto" | string;

export type PropertyMarginTop = Globals | TLength | "auto" | string;

export type PropertyMask = Globals | DataTypeMaskLayer | string;

export type PropertyMaskBorder =
  | Globals
  | "alpha"
  | "luminance"
  | "none"
  | "repeat"
  | "round"
  | "space"
  | "stretch"
  | string
  | number;

export type PropertyMaskBorderMode = Globals | "alpha" | "luminance";

export type PropertyMaskBorderOutset = Globals | TLength | string | number;

export type PropertyMaskBorderRepeat =
  | Globals
  | "repeat"
  | "round"
  | "space"
  | "stretch"
  | string;

export type PropertyMaskBorderSlice = Globals | string | number;

export type PropertyMaskBorderSource = Globals | "none" | string;

export type PropertyMaskBorderWidth =
  | Globals
  | TLength
  | "auto"
  | string
  | number;

export type PropertyMaskClip =
  | Globals
  | DataTypeGeometryBox
  | "no-clip"
  | string;

export type PropertyMaskComposite =
  | Globals
  | DataTypeCompositingOperator
  | string;

export type PropertyMaskImage = Globals | "none" | string;

export type PropertyMaskMode = Globals | DataTypeMaskingMode | string;

export type PropertyMaskOrigin = Globals | DataTypeBox | "margin-box" | string;

export type PropertyMaskPosition = Globals | DataTypePosition | string;

export type PropertyMaskRepeat = Globals | DataTypeRepeatStyle | string;

export type PropertyMaskSize = Globals | DataTypeBgSize | string;

export type PropertyMaskType = Globals | "alpha" | "luminance";

export type PropertyMaxBlockSize =
  | Globals
  | TLength
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "fill-available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | "none"
  | string;

export type PropertyMaxHeight =
  | Globals
  | TLength
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fit-content"
  | "-webkit-max-content"
  | "-webkit-min-content"
  | "fill-available"
  | "fit-content"
  | "intrinsic"
  | "max-content"
  | "min-content"
  | "none"
  | string;

export type PropertyMaxInlineSize =
  | Globals
  | TLength
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "fill-available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | "none"
  | string;

export type PropertyMaxLines = Globals | "none" | number;

export type PropertyMaxWidth =
  | Globals
  | TLength
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fit-content"
  | "-webkit-max-content"
  | "-webkit-min-content"
  | "fill-available"
  | "fit-content"
  | "intrinsic"
  | "max-content"
  | "min-content"
  | "none"
  | string;

export type PropertyMinBlockSize =
  | Globals
  | TLength
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "auto"
  | "fill-available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | string;

export type PropertyMinHeight =
  | Globals
  | TLength
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fit-content"
  | "-webkit-max-content"
  | "-webkit-min-content"
  | "auto"
  | "fill-available"
  | "fit-content"
  | "intrinsic"
  | "max-content"
  | "min-content"
  | string;

export type PropertyMinInlineSize =
  | Globals
  | TLength
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "auto"
  | "fill-available"
  | "fit-content"
  | "max-content"
  | "min-content"
  | string;

export type PropertyMinWidth =
  | Globals
  | TLength
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "-webkit-fit-content"
  | "-webkit-max-content"
  | "-webkit-min-content"
  | "auto"
  | "fill-available"
  | "fit-content"
  | "intrinsic"
  | "max-content"
  | "min-content"
  | "min-intrinsic"
  | string;

export type PropertyMixBlendMode = Globals | DataTypeBlendMode;

export type PropertyOffset =
  | Globals
  | DataTypePosition
  | DataTypeGeometryBox
  | "auto"
  | "none"
  | string;

export type PropertyOffsetDistance = Globals | TLength | string;

export type PropertyOffsetPath =
  | Globals
  | DataTypeGeometryBox
  | "none"
  | string;

export type PropertyOffsetRotate = Globals | "auto" | "reverse" | string;

export type PropertyObjectFit =
  | Globals
  | "contain"
  | "cover"
  | "fill"
  | "none"
  | "scale-down";

export type PropertyObjectPosition = Globals | DataTypePosition;

export type PropertyOffsetAnchor = Globals | DataTypePosition | "auto";

export type PropertyOffsetPosition = Globals | DataTypePosition | "auto";

export type PropertyOpacity = Globals | string | number;

export type PropertyOutline =
  | Globals
  | DataTypeColor
  | DataTypeLineStyle
  | DataTypeLineWidth
  | "auto"
  | "invert"
  | string;

export type PropertyOutlineColor = Globals | DataTypeColor | "invert";

export type PropertyOutlineOffset = Globals | TLength;

export type PropertyOutlineStyle =
  | Globals
  | DataTypeLineStyle
  | "auto"
  | string;

export type PropertyOutlineWidth = Globals | DataTypeLineWidth;

export type PropertyOverflow =
  | Globals
  | "auto"
  | "clip"
  | "hidden"
  | "scroll"
  | "visible"
  | string;

export type PropertyOverflowAnchor = Globals | "auto" | "none";

export type PropertyOverflowBlock =
  | Globals
  | "auto"
  | "clip"
  | "hidden"
  | "scroll"
  | "visible";

export type PropertyOverflowClipBox = Globals | "content-box" | "padding-box";

export type PropertyOverflowInline =
  | Globals
  | "auto"
  | "clip"
  | "hidden"
  | "scroll"
  | "visible";

export type PropertyOverflowWrap =
  | Globals
  | "anywhere"
  | "break-word"
  | "normal";

export type PropertyOverflowX =
  | Globals
  | "auto"
  | "clip"
  | "hidden"
  | "scroll"
  | "visible";

export type PropertyOverflowY =
  | Globals
  | "auto"
  | "clip"
  | "hidden"
  | "scroll"
  | "visible";

export type PropertyOverscrollBehavior =
  | Globals
  | "auto"
  | "contain"
  | "none"
  | string;

export type PropertyOverscrollBehaviorX = Globals | "auto" | "contain" | "none";

export type PropertyOverscrollBehaviorY = Globals | "auto" | "contain" | "none";

export type PropertyPadding = Globals | TLength | string;

export type PropertyPaddingBlock = Globals | TLength | string;

export type PropertyPaddingBlockEnd = Globals | TLength | string;

export type PropertyPaddingBlockStart = Globals | TLength | string;

export type PropertyPaddingBottom = Globals | TLength | string;

export type PropertyPaddingInline = Globals | TLength | string;

export type PropertyPaddingInlineEnd = Globals | TLength | string;

export type PropertyPaddingInlineStart = Globals | TLength | string;

export type PropertyPaddingLeft = Globals | TLength | string;

export type PropertyPaddingRight = Globals | TLength | string;

export type PropertyPaddingTop = Globals | TLength | string;

export type PropertyPageBreakAfter =
  | Globals
  | "always"
  | "auto"
  | "avoid"
  | "left"
  | "recto"
  | "right"
  | "verso";

export type PropertyPageBreakBefore =
  | Globals
  | "always"
  | "auto"
  | "avoid"
  | "left"
  | "recto"
  | "right"
  | "verso";

export type PropertyPageBreakInside = Globals | "auto" | "avoid";

export type PropertyPaintOrder =
  | Globals
  | "fill"
  | "markers"
  | "normal"
  | "stroke"
  | string;

export type PropertyPerspective = Globals | TLength | "none";

export type PropertyPerspectiveOrigin = Globals | DataTypePosition;

export type PropertyPlaceContent =
  | Globals
  | DataTypeContentDistribution
  | DataTypeContentPosition
  | "baseline"
  | "normal"
  | string;

export type PropertyPlaceItems =
  | Globals
  | DataTypeSelfPosition
  | "baseline"
  | "normal"
  | "stretch"
  | string;

export type PropertyPlaceSelf =
  | Globals
  | DataTypeSelfPosition
  | "auto"
  | "baseline"
  | "normal"
  | "stretch"
  | string;

export type PropertyPointerEvents =
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

export type PropertyPosition =
  | Globals
  | "-webkit-sticky"
  | "absolute"
  | "fixed"
  | "relative"
  | "static"
  | "sticky";

export type PropertyQuotes = Globals | "auto" | "none" | string;

export type PropertyResize =
  | Globals
  | "block"
  | "both"
  | "horizontal"
  | "inline"
  | "none"
  | "vertical";

export type PropertyRight = Globals | TLength | "auto" | string;

export type PropertyRotate = Globals | "none" | string;

export type PropertyRowGap = Globals | TLength | "normal" | string;

export type PropertyRubyAlign =
  | Globals
  | "center"
  | "space-around"
  | "space-between"
  | "start";

export type PropertyRubyMerge = Globals | "auto" | "collapse" | "separate";

export type PropertyRubyPosition = Globals | "over" | "under";

export type PropertyScale = Globals | "none" | string | number;

export type PropertyScrollBehavior = Globals | "auto" | "smooth";

export type PropertyScrollMargin = Globals | TLength | string;

export type PropertyScrollMarginBlock = Globals | TLength | string;

export type PropertyScrollMarginBlockEnd = Globals | TLength;

export type PropertyScrollMarginBlockStart = Globals | TLength;

export type PropertyScrollMarginBottom = Globals | TLength;

export type PropertyScrollMarginInline = Globals | TLength | string;

export type PropertyScrollMarginInlineEnd = Globals | TLength;

export type PropertyScrollMarginInlineStart = Globals | TLength;

export type PropertyScrollMarginLeft = Globals | TLength;

export type PropertyScrollMarginRight = Globals | TLength;

export type PropertyScrollMarginTop = Globals | TLength;

export type PropertyScrollPadding = Globals | TLength | "auto" | string;

export type PropertyScrollPaddingBlock = Globals | TLength | "auto" | string;

export type PropertyScrollPaddingBlockEnd = Globals | TLength | "auto" | string;

export type PropertyScrollPaddingBlockStart =
  | Globals
  | TLength
  | "auto"
  | string;

export type PropertyScrollPaddingBottom = Globals | TLength | "auto" | string;

export type PropertyScrollPaddingInline = Globals | TLength | "auto" | string;

export type PropertyScrollPaddingInlineEnd =
  | Globals
  | TLength
  | "auto"
  | string;

export type PropertyScrollPaddingInlineStart =
  | Globals
  | TLength
  | "auto"
  | string;

export type PropertyScrollPaddingLeft = Globals | TLength | "auto" | string;

export type PropertyScrollPaddingRight = Globals | TLength | "auto" | string;

export type PropertyScrollPaddingTop = Globals | TLength | "auto" | string;

export type PropertyScrollSnapAlign =
  | Globals
  | "center"
  | "end"
  | "none"
  | "start"
  | string;

export type PropertyScrollSnapCoordinate =
  | Globals
  | DataTypePosition
  | "none"
  | string;

export type PropertyScrollSnapDestination = Globals | DataTypePosition;

export type PropertyScrollSnapPointsX = Globals | "none" | string;

export type PropertyScrollSnapPointsY = Globals | "none" | string;

export type PropertyScrollSnapStop = Globals | "always" | "normal";

export type PropertyScrollSnapType =
  | Globals
  | "block"
  | "both"
  | "inline"
  | "none"
  | "x"
  | "y"
  | string;

export type PropertyScrollSnapTypeX =
  | Globals
  | "mandatory"
  | "none"
  | "proximity";

export type PropertyScrollSnapTypeY =
  | Globals
  | "mandatory"
  | "none"
  | "proximity";

export type PropertyScrollbarColor =
  | Globals
  | DataTypeColor
  | "auto"
  | "dark"
  | "light";

export type PropertyScrollbarWidth = Globals | "auto" | "none" | "thin";

export type PropertyShapeImageThreshold = Globals | string | number;

export type PropertyShapeMargin = Globals | TLength | string;

export type PropertyShapeOutside =
  | Globals
  | DataTypeBox
  | "margin-box"
  | "none"
  | string;

export type PropertyTabSize = Globals | TLength | number;

export type PropertyTableLayout = Globals | "auto" | "fixed";

export type PropertyTextAlign =
  | Globals
  | "center"
  | "end"
  | "justify"
  | "left"
  | "match-parent"
  | "right"
  | "start";

export type PropertyTextAlignLast =
  | Globals
  | "auto"
  | "center"
  | "end"
  | "justify"
  | "left"
  | "right"
  | "start";

export type PropertyTextCombineUpright =
  | Globals
  | "all"
  | "digits"
  | "none"
  | string;

export type PropertyTextDecoration =
  | Globals
  | DataTypeColor
  | TLength
  | "auto"
  | "blink"
  | "dashed"
  | "dotted"
  | "double"
  | "from-font"
  | "grammar-error"
  | "line-through"
  | "none"
  | "overline"
  | "solid"
  | "spelling-error"
  | "underline"
  | "wavy"
  | string;

export type PropertyTextDecorationColor = Globals | DataTypeColor;

export type PropertyTextDecorationLine =
  | Globals
  | "blink"
  | "grammar-error"
  | "line-through"
  | "none"
  | "overline"
  | "spelling-error"
  | "underline"
  | string;

export type PropertyTextDecorationSkip =
  | Globals
  | "box-decoration"
  | "edges"
  | "leading-spaces"
  | "none"
  | "objects"
  | "spaces"
  | "trailing-spaces"
  | string;

export type PropertyTextDecorationSkipInk = Globals | "auto" | "none";

export type PropertyTextDecorationStyle =
  | Globals
  | "dashed"
  | "dotted"
  | "double"
  | "solid"
  | "wavy";

export type PropertyTextDecorationThickness =
  | Globals
  | TLength
  | "auto"
  | "from-font";

export type PropertyTextEmphasis =
  | Globals
  | DataTypeColor
  | "circle"
  | "dot"
  | "double-circle"
  | "filled"
  | "none"
  | "open"
  | "sesame"
  | "triangle"
  | string;

export type PropertyTextEmphasisColor = Globals | DataTypeColor;

export type PropertyTextEmphasisStyle =
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

export type PropertyTextIndent = Globals | TLength | string;

export type PropertyTextJustify =
  | Globals
  | "auto"
  | "inter-character"
  | "inter-word"
  | "none";

export type PropertyTextOrientation =
  | Globals
  | "mixed"
  | "sideways"
  | "upright";

export type PropertyTextOverflow = Globals | "clip" | "ellipsis" | string;

export type PropertyTextRendering =
  | Globals
  | "auto"
  | "geometricPrecision"
  | "optimizeLegibility"
  | "optimizeSpeed";

export type PropertyTextShadow = Globals | "none" | string;

export type PropertyTextSizeAdjust = Globals | "auto" | "none" | string;

export type PropertyTextTransform =
  | Globals
  | "capitalize"
  | "full-size-kana"
  | "full-width"
  | "lowercase"
  | "none"
  | "uppercase";

export type PropertyTextUnderlineOffset =
  | Globals
  | TLength
  | "auto"
  | "from-font";

export type PropertyTextUnderlinePosition =
  | Globals
  | "auto"
  | "left"
  | "right"
  | "under"
  | string;

export type PropertyTop = Globals | TLength | "auto" | string;

export type PropertyTouchAction =
  | Globals
  | "-ms-manipulation"
  | "-ms-none"
  | "-ms-pinch-zoom"
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

export type PropertyTransform = Globals | "none" | string;

export type PropertyTransformBox =
  | Globals
  | "border-box"
  | "fill-box"
  | "view-box";

export type PropertyTransformOrigin =
  | Globals
  | TLength
  | "bottom"
  | "center"
  | "left"
  | "right"
  | "top"
  | string;

export type PropertyTransformStyle = Globals | "flat" | "preserve-3d";

export type PropertyTransition = Globals | DataTypeSingleTransition | string;

export type PropertyTransitionProperty = Globals | "all" | "none" | string;

export type PropertyTransitionTimingFunction =
  | Globals
  | DataTypeTimingFunction
  | string;

export type PropertyTranslate = Globals | TLength | "none" | string;

export type PropertyUnicodeBidi =
  | Globals
  | "-moz-isolate"
  | "-moz-isolate-override"
  | "-moz-plaintext"
  | "-webkit-isolate"
  | "bidi-override"
  | "embed"
  | "isolate"
  | "isolate-override"
  | "normal"
  | "plaintext";

export type PropertyUserSelect =
  | Globals
  | "-moz-none"
  | "all"
  | "auto"
  | "contain"
  | "element"
  | "none"
  | "text";

export type PropertyVerticalAlign =
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

export type PropertyVisibility = Globals | "collapse" | "hidden" | "visible";

export type PropertyWhiteSpace =
  | Globals
  | "-moz-pre-wrap"
  | "break-spaces"
  | "normal"
  | "nowrap"
  | "pre"
  | "pre-line"
  | "pre-wrap";

export type PropertyWidth =
  | Globals
  | TLength
  | "-moz-fit-content"
  | "-moz-max-content"
  | "-moz-min-content"
  | "-webkit-fill-available"
  | "-webkit-fit-content"
  | "-webkit-max-content"
  | "auto"
  | "available"
  | "fit-content"
  | "intrinsic"
  | "max-content"
  | "min-content"
  | "min-intrinsic"
  | string;

export type PropertyWillChange =
  | Globals
  | DataTypeAnimateableFeature
  | "auto"
  | string;

export type PropertyWordBreak =
  | Globals
  | "break-all"
  | "break-word"
  | "keep-all"
  | "normal";

export type PropertyWordSpacing = Globals | TLength | "normal" | string;

export type PropertyWordWrap = Globals | "break-word" | "normal";

export type PropertyWritingMode =
  | Globals
  | "horizontal-tb"
  | "sideways-lr"
  | "sideways-rl"
  | "vertical-lr"
  | "vertical-rl";

export type PropertyZIndex = Globals | "auto" | number;

export type PropertyZoom = Globals | "normal" | "reset" | string | number;

export type PropertyMozAppearance =
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

export type PropertyMozBinding = Globals | "none" | string;

export type PropertyMozBorderBottomColors =
  | Globals
  | DataTypeColor
  | "none"
  | string;

export type PropertyMozBorderLeftColors =
  | Globals
  | DataTypeColor
  | "none"
  | string;

export type PropertyMozBorderRightColors =
  | Globals
  | DataTypeColor
  | "none"
  | string;

export type PropertyMozBorderTopColors =
  | Globals
  | DataTypeColor
  | "none"
  | string;

export type PropertyMozContextProperties =
  | Globals
  | "fill"
  | "fill-opacity"
  | "none"
  | "stroke"
  | "stroke-opacity"
  | string;

export type PropertyMozFloatEdge =
  | Globals
  | "border-box"
  | "content-box"
  | "margin-box"
  | "padding-box";

export type PropertyMozImageRegion = Globals | "auto" | string;

export type PropertyMozOrient =
  | Globals
  | "block"
  | "horizontal"
  | "inline"
  | "vertical";

export type PropertyMozOutlineRadius = Globals | TLength | string;

export type PropertyMozOutlineRadiusBottomleft = Globals | TLength | string;

export type PropertyMozOutlineRadiusBottomright = Globals | TLength | string;

export type PropertyMozOutlineRadiusTopleft = Globals | TLength | string;

export type PropertyMozOutlineRadiusTopright = Globals | TLength | string;

export type PropertyMozStackSizing = Globals | "ignore" | "stretch-to-fit";

export type PropertyMozTextBlink = Globals | "blink" | "none";

export type PropertyMozUserFocus =
  | Globals
  | "ignore"
  | "none"
  | "normal"
  | "select-after"
  | "select-all"
  | "select-before"
  | "select-menu"
  | "select-same";

export type PropertyMozUserInput =
  | Globals
  | "auto"
  | "disabled"
  | "enabled"
  | "none";

export type PropertyMozUserModify =
  | Globals
  | "read-only"
  | "read-write"
  | "write-only";

export type PropertyMozWindowDragging = Globals | "drag" | "no-drag";

export type PropertyMozWindowShadow =
  | Globals
  | "default"
  | "menu"
  | "none"
  | "sheet"
  | "tooltip";

export type PropertyMsAccelerator = Globals | "false" | "true";

export type PropertyMsBlockProgression = Globals | "bt" | "lr" | "rl" | "tb";

export type PropertyMsContentZoomChaining = Globals | "chained" | "none";

export type PropertyMsContentZoomSnap =
  | Globals
  | "mandatory"
  | "none"
  | "proximity"
  | string;

export type PropertyMsContentZoomSnapType =
  | Globals
  | "mandatory"
  | "none"
  | "proximity";

export type PropertyMsContentZooming = Globals | "none" | "zoom";

export type PropertyMsFlowFrom = Globals | "none" | string;

export type PropertyMsFlowInto = Globals | "none" | string;

export type PropertyMsHighContrastAdjust = Globals | "auto" | "none";

export type PropertyMsHyphenateLimitChars = Globals | "auto" | string | number;

export type PropertyMsHyphenateLimitLines = Globals | "no-limit" | number;

export type PropertyMsHyphenateLimitZone = Globals | TLength | string;

export type PropertyMsImeAlign = Globals | "after" | "auto";

export type PropertyMsOverflowStyle =
  | Globals
  | "-ms-autohiding-scrollbar"
  | "auto"
  | "none"
  | "scrollbar";

export type PropertyMsScrollChaining = Globals | "chained" | "none";

export type PropertyMsScrollLimitXMax = Globals | TLength | "auto";

export type PropertyMsScrollLimitXMin = Globals | TLength;

export type PropertyMsScrollLimitYMax = Globals | TLength | "auto";

export type PropertyMsScrollLimitYMin = Globals | TLength;

export type PropertyMsScrollRails = Globals | "none" | "railed";

export type PropertyMsScrollSnapType =
  | Globals
  | "mandatory"
  | "none"
  | "proximity";

export type PropertyMsScrollTranslation =
  | Globals
  | "none"
  | "vertical-to-horizontal";

export type PropertyMsScrollbar3dlightColor = Globals | DataTypeColor;

export type PropertyMsScrollbarArrowColor = Globals | DataTypeColor;

export type PropertyMsScrollbarBaseColor = Globals | DataTypeColor;

export type PropertyMsScrollbarDarkshadowColor = Globals | DataTypeColor;

export type PropertyMsScrollbarFaceColor = Globals | DataTypeColor;

export type PropertyMsScrollbarHighlightColor = Globals | DataTypeColor;

export type PropertyMsScrollbarShadowColor = Globals | DataTypeColor;

export type PropertyMsScrollbarTrackColor = Globals | DataTypeColor;

export type PropertyMsTextAutospace =
  | Globals
  | "ideograph-alpha"
  | "ideograph-numeric"
  | "ideograph-parenthesis"
  | "ideograph-space"
  | "none";

export type PropertyMsTouchSelect = Globals | "grippers" | "none";

export type PropertyMsUserSelect = Globals | "element" | "none" | "text";

export type PropertyMsWrapFlow =
  | Globals
  | "auto"
  | "both"
  | "clear"
  | "end"
  | "maximum"
  | "start";

export type PropertyMsWrapMargin = Globals | TLength;

export type PropertyMsWrapThrough = Globals | "none" | "wrap";

export type PropertyWebkitAppearance =
  | Globals
  | "button"
  | "button-bevel"
  | "caret"
  | "checkbox"
  | "default-button"
  | "inner-spin-button"
  | "listbox"
  | "listitem"
  | "media-controls-background"
  | "media-controls-fullscreen-background"
  | "media-current-time-display"
  | "media-enter-fullscreen-button"
  | "media-exit-fullscreen-button"
  | "media-fullscreen-button"
  | "media-mute-button"
  | "media-overlay-play-button"
  | "media-play-button"
  | "media-seek-back-button"
  | "media-seek-forward-button"
  | "media-slider"
  | "media-sliderthumb"
  | "media-time-remaining-display"
  | "media-toggle-closed-captions-button"
  | "media-volume-slider"
  | "media-volume-slider-container"
  | "media-volume-sliderthumb"
  | "menulist"
  | "menulist-button"
  | "menulist-text"
  | "menulist-textfield"
  | "meter"
  | "none"
  | "progress-bar"
  | "progress-bar-value"
  | "push-button"
  | "radio"
  | "searchfield"
  | "searchfield-cancel-button"
  | "searchfield-decoration"
  | "searchfield-results-button"
  | "searchfield-results-decoration"
  | "slider-horizontal"
  | "slider-vertical"
  | "sliderthumb-horizontal"
  | "sliderthumb-vertical"
  | "square-button"
  | "textarea"
  | "textfield";

export type PropertyWebkitBorderBefore =
  | Globals
  | DataTypeLineWidth
  | DataTypeLineStyle
  | DataTypeColor
  | string;

export type PropertyWebkitBorderBeforeColor = Globals | DataTypeColor;

export type PropertyWebkitBorderBeforeStyle =
  | Globals
  | DataTypeLineStyle
  | string;

export type PropertyWebkitBorderBeforeWidth =
  | Globals
  | DataTypeLineWidth
  | string;

export type PropertyWebkitBoxReflect =
  | Globals
  | TLength
  | "above"
  | "below"
  | "left"
  | "right"
  | string;

export type PropertyWebkitLineClamp = Globals | "none" | number;

export type PropertyWebkitMask =
  | Globals
  | DataTypePosition
  | DataTypeRepeatStyle
  | DataTypeBox
  | "border"
  | "content"
  | "none"
  | "padding"
  | "text"
  | string;

export type PropertyWebkitMaskAttachment =
  | Globals
  | DataTypeAttachment
  | string;

export type PropertyWebkitMaskClip =
  | Globals
  | DataTypeBox
  | "border"
  | "content"
  | "padding"
  | "text"
  | string;

export type PropertyWebkitMaskComposite =
  | Globals
  | DataTypeCompositeStyle
  | string;

export type PropertyWebkitMaskImage = Globals | "none" | string;

export type PropertyWebkitMaskOrigin =
  | Globals
  | DataTypeBox
  | "border"
  | "content"
  | "padding"
  | string;

export type PropertyWebkitMaskPosition = Globals | DataTypePosition | string;

export type PropertyWebkitMaskPositionX =
  | Globals
  | TLength
  | "center"
  | "left"
  | "right"
  | string;

export type PropertyWebkitMaskPositionY =
  | Globals
  | TLength
  | "bottom"
  | "center"
  | "top"
  | string;

export type PropertyWebkitMaskRepeat = Globals | DataTypeRepeatStyle | string;

export type PropertyWebkitMaskRepeatX =
  | Globals
  | "no-repeat"
  | "repeat"
  | "round"
  | "space";

export type PropertyWebkitMaskRepeatY =
  | Globals
  | "no-repeat"
  | "repeat"
  | "round"
  | "space";

export type PropertyWebkitMaskSize = Globals | DataTypeBgSize | string;

export type PropertyWebkitOverflowScrolling = Globals | "auto" | "touch";

export type PropertyWebkitTapHighlightColor = Globals | DataTypeColor;

export type PropertyWebkitTextFillColor = Globals | DataTypeColor;

export type PropertyWebkitTextStroke =
  | Globals
  | DataTypeColor
  | TLength
  | string;

export type PropertyWebkitTextStrokeColor = Globals | DataTypeColor;

export type PropertyWebkitTextStrokeWidth = Globals | TLength;

export type PropertyWebkitTouchCallout = Globals | "default" | "none";

export type PropertyWebkitUserModify =
  | Globals
  | "read-only"
  | "read-write"
  | "read-write-plaintext-only";

export type PropertyAlignmentBaseline =
  | Globals
  | "after-edge"
  | "alphabetic"
  | "auto"
  | "baseline"
  | "before-edge"
  | "central"
  | "hanging"
  | "ideographic"
  | "mathematical"
  | "middle"
  | "text-after-edge"
  | "text-before-edge";

export type PropertyBaselineShift =
  | Globals
  | TLength
  | "baseline"
  | "sub"
  | "super"
  | string;

export type PropertyClipRule = Globals | "evenodd" | "nonzero";

export type PropertyColorInterpolation =
  | Globals
  | "auto"
  | "linearRGB"
  | "sRGB";

export type PropertyColorRendering =
  | Globals
  | "auto"
  | "optimizeQuality"
  | "optimizeSpeed";

export type PropertyDominantBaseline =
  | Globals
  | "alphabetic"
  | "auto"
  | "central"
  | "hanging"
  | "ideographic"
  | "mathematical"
  | "middle"
  | "no-change"
  | "reset-size"
  | "text-after-edge"
  | "text-before-edge"
  | "use-script";

export type PropertyFill = Globals | DataTypePaint;

export type PropertyFillRule = Globals | "evenodd" | "nonzero";

export type PropertyFloodColor = Globals | DataTypeColor | "currentColor";

export type PropertyGlyphOrientationVertical =
  | Globals
  | "auto"
  | string
  | number;

export type PropertyLightingColor = Globals | DataTypeColor | "currentColor";

export type PropertyMarker = Globals | "none" | string;

export type PropertyMarkerEnd = Globals | "none" | string;

export type PropertyMarkerMid = Globals | "none" | string;

export type PropertyMarkerStart = Globals | "none" | string;

export type PropertyShapeRendering =
  | Globals
  | "auto"
  | "crispEdges"
  | "geometricPrecision"
  | "optimizeSpeed";

export type PropertyStopColor = Globals | DataTypeColor | "currentColor";

export type PropertyStroke = Globals | DataTypePaint;

export type PropertyStrokeDasharray = Globals | DataTypeDasharray | "none";

export type PropertyStrokeDashoffset = Globals | TLength | string;

export type PropertyStrokeLinecap = Globals | "butt" | "round" | "square";

export type PropertyStrokeLinejoin = Globals | "bevel" | "miter" | "round";

export type PropertyStrokeWidth = Globals | TLength | string;

export type PropertyTextAnchor = Globals | "end" | "middle" | "start";

export type PropertyVectorEffect = Globals | "non-scaling-stroke" | "none";

export type AtRuleCounterStyle = {|
  additiveSymbols?: string,
  fallback?: string,
  negative?: string,
  pad?: string,
  prefix?: string,
  range?: AtRuleRange,
  speakAs?: AtRuleSpeakAs,
  suffix?: string,
  symbols?: string,
  system?: AtRuleSystem,
|};

export type AtRuleCounterStyleHyphen = {|
  "additive-symbols"?: string,
  fallback?: string,
  negative?: string,
  pad?: string,
  prefix?: string,
  range?: AtRuleRange,
  "speak-as"?: AtRuleSpeakAs,
  suffix?: string,
  symbols?: string,
  system?: AtRuleSystem,
|};

export type AtRuleFontFace = {|
  MozFontFeatureSettings?: AtRuleFontFeatureSettings,
  fontDisplay?: AtRuleFontDisplay,
  fontFamily?: string,
  fontFeatureSettings?: AtRuleFontFeatureSettings,
  fontStretch?: AtRuleFontStretch,
  fontStyle?: AtRuleFontStyle,
  fontVariant?: AtRuleFontVariant,
  fontVariationSettings?: AtRuleFontVariationSettings,
  fontWeight?: AtRuleFontWeight,
  src?: string,
  unicodeRange?: string,
|};

export type AtRuleFontFaceHyphen = {|
  "-moz-font-feature-settings"?: AtRuleFontFeatureSettings,
  "font-display"?: AtRuleFontDisplay,
  "font-family"?: string,
  "font-feature-settings"?: AtRuleFontFeatureSettings,
  "font-stretch"?: AtRuleFontStretch,
  "font-style"?: AtRuleFontStyle,
  "font-variant"?: AtRuleFontVariant,
  "font-variation-settings"?: AtRuleFontVariationSettings,
  "font-weight"?: AtRuleFontWeight,
  src?: string,
  "unicode-range"?: string,
|};

export type AtRuleViewport<TLength = string | 0> = {|
  msHeight?: AtRuleHeight,
  msMaxHeight?: AtRuleMaxHeight,
  msMaxWidth?: AtRuleMaxWidth,
  msMaxZoom?: AtRuleMaxZoom,
  msMinHeight?: AtRuleMinHeight,
  msMinWidth?: AtRuleMinWidth,
  msMinZoom?: AtRuleMinZoom,
  msOrientation?: AtRuleOrientation,
  msUserZoom?: AtRuleUserZoom,
  msWidth?: AtRuleWidth,
  msZoom?: AtRuleZoom,
  OOrientation?: AtRuleOrientation,
  height?: AtRuleHeight,
  maxHeight?: AtRuleMaxHeight,
  maxWidth?: AtRuleMaxWidth,
  maxZoom?: AtRuleMaxZoom,
  minHeight?: AtRuleMinHeight,
  minWidth?: AtRuleMinWidth,
  minZoom?: AtRuleMinZoom,
  orientation?: AtRuleOrientation,
  userZoom?: AtRuleUserZoom,
  width?: AtRuleWidth,
  zoom?: AtRuleZoom,
|};

export type AtRuleViewportHyphen<TLength = string | 0> = {|
  "-ms-height"?: AtRuleHeight,
  "-ms-max-height"?: AtRuleMaxHeight,
  "-ms-max-width"?: AtRuleMaxWidth,
  "-ms-max-zoom"?: AtRuleMaxZoom,
  "-ms-min-height"?: AtRuleMinHeight,
  "-ms-min-width"?: AtRuleMinWidth,
  "-ms-min-zoom"?: AtRuleMinZoom,
  "-ms-orientation"?: AtRuleOrientation,
  "-ms-user-zoom"?: AtRuleUserZoom,
  "-ms-width"?: AtRuleWidth,
  "-ms-zoom"?: AtRuleZoom,
  "-o-orientation"?: AtRuleOrientation,
  height?: AtRuleHeight,
  "max-height"?: AtRuleMaxHeight,
  "max-width"?: AtRuleMaxWidth,
  "max-zoom"?: AtRuleMaxZoom,
  "min-height"?: AtRuleMinHeight,
  "min-width"?: AtRuleMinWidth,
  "min-zoom"?: AtRuleMinZoom,
  orientation?: AtRuleOrientation,
  "user-zoom"?: AtRuleUserZoom,
  width?: AtRuleWidth,
  zoom?: AtRuleZoom,
|};

type AtRuleRange = "auto" | "infinite" | string | number;

type AtRuleSpeakAs =
  | "auto"
  | "bullets"
  | "numbers"
  | "spell-out"
  | "words"
  | string;

type AtRuleSystem =
  | "additive"
  | "alphabetic"
  | "cyclic"
  | "fixed"
  | "numeric"
  | "symbolic"
  | string;

type AtRuleFontFeatureSettings = "normal" | string;

type AtRuleFontDisplay = "auto" | "block" | "fallback" | "optional" | "swap";

type AtRuleFontStretch = DataTypeFontStretchAbsolute | string;

type AtRuleFontStyle = "italic" | "normal" | "oblique" | string;

type AtRuleFontVariant =
  | DataTypeEastAsianVariantValues
  | "all-petite-caps"
  | "all-small-caps"
  | "common-ligatures"
  | "contextual"
  | "diagonal-fractions"
  | "discretionary-ligatures"
  | "full-width"
  | "historical-forms"
  | "historical-ligatures"
  | "lining-nums"
  | "no-common-ligatures"
  | "no-contextual"
  | "no-discretionary-ligatures"
  | "no-historical-ligatures"
  | "none"
  | "normal"
  | "oldstyle-nums"
  | "ordinal"
  | "petite-caps"
  | "proportional-nums"
  | "proportional-width"
  | "ruby"
  | "slashed-zero"
  | "small-caps"
  | "stacked-fractions"
  | "tabular-nums"
  | "titling-caps"
  | "unicase"
  | string;

type AtRuleFontVariationSettings = "normal" | string;

type AtRuleFontWeight = DataTypeFontWeightAbsolute | string;

type AtRuleHeight = DataTypeViewportLength | string;

type AtRuleMaxHeight = DataTypeViewportLength;

type AtRuleMaxWidth = DataTypeViewportLength;

type AtRuleMaxZoom = "auto" | string | number;

type AtRuleMinHeight = DataTypeViewportLength;

type AtRuleMinWidth = DataTypeViewportLength;

type AtRuleMinZoom = "auto" | string | number;

type AtRuleOrientation = "auto" | "landscape" | "portrait";

type AtRuleUserZoom = "-ms-zoom" | "fixed" | "zoom";

type AtRuleWidth = DataTypeViewportLength | string;

type AtRuleZoom = "auto" | string | number;

type DataTypeAbsoluteSize =
  | "large"
  | "medium"
  | "small"
  | "x-large"
  | "x-small"
  | "xx-large"
  | "xx-small";

type DataTypeAnimateableFeature = "contents" | "scroll-position" | string;

type DataTypeAttachment = "fixed" | "local" | "scroll";

type DataTypeBgPosition =
  | TLength
  | "bottom"
  | "center"
  | "left"
  | "right"
  | "top"
  | string;

type DataTypeBgSize = TLength | "auto" | "contain" | "cover" | string;

type DataTypeBlendMode =
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

type DataTypeBox = "border-box" | "content-box" | "padding-box";

type DataTypeColor =
  | DataTypeNamedColor
  | DataTypeDeprecatedSystemColor
  | "currentcolor"
  | string;

type DataTypeCompat =
  | "button-bevel"
  | "checkbox"
  | "listbox"
  | "menulist"
  | "menulist-button"
  | "meter"
  | "progress-bar"
  | "push-button"
  | "radio"
  | "searchfield"
  | "slider-horizontal"
  | "square-button"
  | "textarea";

type DataTypeCompositeStyle =
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

type DataTypeCompositingOperator = "add" | "exclude" | "intersect" | "subtract";

type DataTypeContentDistribution =
  | "space-around"
  | "space-between"
  | "space-evenly"
  | "stretch";

type DataTypeContentList = DataTypeQuote | "contents" | string;

type DataTypeContentPosition =
  | "center"
  | "end"
  | "flex-end"
  | "flex-start"
  | "start";

type DataTypeCubicBezierTimingFunction =
  | "ease"
  | "ease-in"
  | "ease-in-out"
  | "ease-out"
  | string;

type DataTypeDasharray = TLength | string | number;

type DataTypeDeprecatedSystemColor =
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

type DataTypeDisplayInside =
  | "-ms-flexbox"
  | "-ms-grid"
  | "-webkit-flex"
  | "flex"
  | "flow"
  | "flow-root"
  | "grid"
  | "ruby"
  | "table";

type DataTypeDisplayInternal =
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

type DataTypeDisplayLegacy =
  | "-ms-inline-flexbox"
  | "-ms-inline-grid"
  | "-webkit-inline-flex"
  | "inline-block"
  | "inline-flex"
  | "inline-grid"
  | "inline-list-item"
  | "inline-table";

type DataTypeDisplayOutside = "block" | "inline" | "run-in";

type DataTypeEastAsianVariantValues =
  | "jis04"
  | "jis78"
  | "jis83"
  | "jis90"
  | "simplified"
  | "traditional";

type DataTypeFinalBgLayer =
  | DataTypeColor
  | DataTypeBgPosition
  | DataTypeRepeatStyle
  | DataTypeAttachment
  | DataTypeBox
  | "none"
  | string;

type DataTypeFontStretchAbsolute =
  | "condensed"
  | "expanded"
  | "extra-condensed"
  | "extra-expanded"
  | "normal"
  | "semi-condensed"
  | "semi-expanded"
  | "ultra-condensed"
  | "ultra-expanded"
  | string;

type DataTypeFontWeightAbsolute = "bold" | "normal" | number;

type DataTypeGenericFamily =
  | "cursive"
  | "fantasy"
  | "monospace"
  | "sans-serif"
  | "serif";

type DataTypeGeometryBox =
  | DataTypeBox
  | "fill-box"
  | "margin-box"
  | "stroke-box"
  | "view-box";

type DataTypeGridLine = "auto" | string | number;

type DataTypeLineStyle =
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

type DataTypeLineWidth = TLength | "medium" | "thick" | "thin";

type DataTypeMaskLayer =
  | DataTypePosition
  | DataTypeRepeatStyle
  | DataTypeGeometryBox
  | DataTypeCompositingOperator
  | DataTypeMaskingMode
  | "no-clip"
  | "none"
  | string;

type DataTypeMaskingMode = "alpha" | "luminance" | "match-source";

type DataTypeNamedColor =
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

type DataTypePaint =
  | DataTypeColor
  | "child"
  | "context-fill"
  | "context-stroke"
  | "none"
  | string;

type DataTypePosition =
  | TLength
  | "bottom"
  | "center"
  | "left"
  | "right"
  | "top"
  | string;

type DataTypeQuote =
  | "close-quote"
  | "no-close-quote"
  | "no-open-quote"
  | "open-quote";

type DataTypeRepeatStyle =
  | "no-repeat"
  | "repeat"
  | "repeat-x"
  | "repeat-y"
  | "round"
  | "space"
  | string;

type DataTypeSelfPosition =
  | "center"
  | "end"
  | "flex-end"
  | "flex-start"
  | "self-end"
  | "self-start"
  | "start";

type DataTypeSingleAnimation =
  | DataTypeTimingFunction
  | DataTypeSingleAnimationDirection
  | DataTypeSingleAnimationFillMode
  | "infinite"
  | "none"
  | "paused"
  | "running"
  | string
  | number;

type DataTypeSingleAnimationDirection =
  | "alternate"
  | "alternate-reverse"
  | "normal"
  | "reverse";

type DataTypeSingleAnimationFillMode =
  | "backwards"
  | "both"
  | "forwards"
  | "none";

type DataTypeSingleTransition =
  | DataTypeTimingFunction
  | "all"
  | "none"
  | string;

type DataTypeStepTimingFunction = "step-end" | "step-start" | string;

type DataTypeTimingFunction =
  | DataTypeCubicBezierTimingFunction
  | DataTypeStepTimingFunction
  | "linear";

type DataTypeTrackBreadth =
  | TLength
  | "auto"
  | "max-content"
  | "min-content"
  | string;

type DataTypeViewportLength = TLength | "auto" | string;
