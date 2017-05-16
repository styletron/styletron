// Type definitions for styletron-react
// TypeScript Version: 2.1

import * as React from "react";
import StyletronServer from "styletron-server";
import StyletronClient from "styletron-client";

declare namespace StyletronReact {
  export class StyletronProvider extends React.Component<{styletron: StyletronServer | StyletronClient}, void> {}

  export function styled<TProps extends ClassNameProp>(
    base: React.StatelessComponent<TProps>,
    style: Style<TProps>): Component<TProps>;

  export function styled<TInnerProps extends ClassNameProp, TOuterProps>(
    base: React.StatelessComponent<TInnerProps>,
    style: Style<TOuterProps>): Component<TInnerProps & TOuterProps>;

  export function styled<TProps extends ClassNameProp, TComponent extends React.Component<TProps, React.ComponentState>>(
    base: React.ClassType<TProps, TComponent, React.ComponentClass<TProps>>,
    style: Style<TProps>): Component<ClassProps<TProps, TComponent>>;

  export function styled<TProps extends ClassNameProp, TBase extends keyof BasePropsMap<TProps>>(
    base: TBase,
    style: Style<TProps>): Component<BasePropsMap<TProps>[TBase]>;

  export function styled<TElement extends HTMLElement, TProps>(
    base: string,
    style: Style<TProps>): Component<HTMLProps<TProps, TElement>>;

  export function styled<TElement extends SVGElement, TProps>(
    base: string,
    style: Style<TProps>): Component<SVGProps<TProps, TElement>>;

  export function core<TProps>(
    base: React.StatelessComponent<TProps>,
    style: Style<TProps>,
    mapStyleToProps: MapStyleToPartialProps<TProps>): Component<TProps>;

  export function core<TInnerProps, TOuterProps, TStyleProps>(
    base: React.StatelessComponent<TInnerProps>,
    style: Style<TOuterProps>,
    mapStyleToProps: MapStyleToProps<TInnerProps, TStyleProps>,
    mergeProps: MergeProps<TInnerProps, TOuterProps, TStyleProps>): Component<TOuterProps>;

  export function core<TProps, TComponent extends React.Component<TProps, React.ComponentState>>(
    base: React.ClassType<TProps, TComponent, React.ComponentClass<TProps>>,
    style: Style<TProps>,
    mapStyleToProps: MapStyleToPartialProps<TProps>): Component<ClassProps<TProps, TComponent>>;

  export function core<TInnerProps, TOuterProps, TStyleProps, TComponent extends React.Component<TInnerProps, React.ComponentState>>(
    base: React.ClassType<TInnerProps, TComponent, React.ComponentClass<TInnerProps>>,
    style: Style<TOuterProps>,
    mapStyleToProps: MapStyleToProps<TInnerProps, TStyleProps>,
    mergeProps: MergeProps<TInnerProps, TOuterProps, TStyleProps>): Component<ClassProps<TOuterProps, TComponent>>;

  export function core<TProps, TBase extends keyof BasePropsMap<TProps>>(
    base: TBase,
    style: Style<TProps>,
    mapStyleToProps: MapStyleToPartialProps<ClassNameProp>): Component<BasePropsMap<TProps>[TBase]>;

  export function core<TInnerProps, TOuterProps, TBase extends keyof BasePropsMap<TInnerProps>>(
    base: TBase,
    style: Style<TOuterProps>,
    mapStyleToProps: MapStyleToPartialProps<ClassNameProp>,
    mergeProps: MergeProps<TInnerProps, TOuterProps, ClassNameProp>): Component<BasePropsMap<TOuterProps>[TBase]>;

  export function core<TElement extends HTMLElement, TProps>(
    base: string,
    style: Style<TProps>,
    mapStyleToProps: MapStyleToPartialProps<ClassNameProp>): Component<HTMLProps<TProps, TElement>>;

  export function core<TElement extends HTMLElement, TInnerProps, TOuterProps>(
    base: string,
    style: Style<TOuterProps>,
    mapStyleToProps: MapStyleToPartialProps<ClassNameProp>,
    mergeProps: MergeProps<TInnerProps, TOuterProps, ClassNameProp>): Component<HTMLProps<TOuterProps, TElement>>;

  export function core<TElement extends SVGElement, TProps>(
    base: string,
    style: Style<TProps>,
    mapStyleToProps: MapStyleToPartialProps<ClassNameProp>): Component<SVGProps<TProps, TElement>>;

  export function core<TElement extends SVGElement, TInnerProps, TOuterProps>(
    base: string,
    style: Style<TOuterProps>,
    mapStyleToProps: MapStyleToPartialProps<ClassNameProp>,
    mergeProps: MergeProps<TInnerProps, TOuterProps, ClassNameProp>): Component<SVGProps<TOuterProps, TElement>>;

  type Component<TProps> = React.StatelessComponent<TProps>;

  type ClassProps<TProps, TComponent extends React.Component<{}, React.ComponentState>> = TProps & InnerRef<TComponent>;

  type HTMLProps<TProps, TElement extends HTMLElement> = TProps & InnerRef<TElement> & React.HTMLAttributes<TElement>;

  type SVGProps<TProps, TElement extends SVGElement> = TProps & InnerRef<TElement> & React.SVGAttributes<TElement>;

  type InnerRef<TInstance> = {
    innerRef?: React.Ref<TInstance>;
  };

  // Intersecting `CSSProperties` enables autocompletion for CSS properties as
  // plain objects and not only for function return objects
  type StyleFunction<TProps> = React.CSSProperties & ((props: TProps, context?: any) => React.CSSProperties);

  type Style<TProps> = React.CSSProperties | StyleFunction<TProps>;

  type MapStyleToPartialProps<TProps> = (styletron: StyletronServer | StyletronClient, style: React.CSSProperties, props?: TProps) => Partial<TProps>;

  type MapStyleToProps<TProps, TStyleProps> = (styletron: StyletronServer | StyletronClient, style: React.CSSProperties, props?: TProps) => TStyleProps;

  type MergeProps<TInnerProps, TOuterProps, TStyleProps> = (styleProps: TStyleProps, ownProps: TOuterProps) => TInnerProps;

  type ClassNameProp = {className?: string};

  interface BasePropsMap<TProps> {
    a: HTMLProps<TProps, HTMLAnchorElement>;
    abbr: HTMLProps<TProps, HTMLElement>;
    address: HTMLProps<TProps, HTMLElement>;
    area: HTMLProps<TProps, HTMLAreaElement>;
    article: HTMLProps<TProps, HTMLElement>;
    aside: HTMLProps<TProps, HTMLElement>;
    audio: HTMLProps<TProps, HTMLAudioElement>;
    b: HTMLProps<TProps, HTMLElement>;
    base: HTMLProps<TProps, HTMLBaseElement>;
    bdi: HTMLProps<TProps, HTMLElement>;
    bdo: HTMLProps<TProps, HTMLElement>;
    big: HTMLProps<TProps, HTMLElement>;
    blockquote: HTMLProps<TProps, HTMLElement>;
    body: HTMLProps<TProps, HTMLBodyElement>;
    br: HTMLProps<TProps, HTMLBRElement>;
    button: HTMLProps<TProps, HTMLButtonElement>;
    canvas: HTMLProps<TProps, HTMLCanvasElement>;
    caption: HTMLProps<TProps, HTMLElement>;
    cite: HTMLProps<TProps, HTMLElement>;
    code: HTMLProps<TProps, HTMLElement>;
    col: HTMLProps<TProps, HTMLTableColElement>;
    colgroup: HTMLProps<TProps, HTMLTableColElement>;
    data: HTMLProps<TProps, HTMLElement>;
    datalist: HTMLProps<TProps, HTMLDataListElement>;
    dd: HTMLProps<TProps, HTMLElement>;
    del: HTMLProps<TProps, HTMLElement>;
    details: HTMLProps<TProps, HTMLElement>;
    dfn: HTMLProps<TProps, HTMLElement>;
    dialog: HTMLProps<TProps, HTMLElement>;
    div: HTMLProps<TProps, HTMLDivElement>;
    dl: HTMLProps<TProps, HTMLDListElement>;
    dt: HTMLProps<TProps, HTMLElement>;
    em: HTMLProps<TProps, HTMLElement>;
    embed: HTMLProps<TProps, HTMLEmbedElement>;
    fieldset: HTMLProps<TProps, HTMLFieldSetElement>;
    figcaption: HTMLProps<TProps, HTMLElement>;
    figure: HTMLProps<TProps, HTMLElement>;
    footer: HTMLProps<TProps, HTMLElement>;
    form: HTMLProps<TProps, HTMLFormElement>;
    h1: HTMLProps<TProps, HTMLHeadingElement>;
    h2: HTMLProps<TProps, HTMLHeadingElement>;
    h3: HTMLProps<TProps, HTMLHeadingElement>;
    h4: HTMLProps<TProps, HTMLHeadingElement>;
    h5: HTMLProps<TProps, HTMLHeadingElement>;
    h6: HTMLProps<TProps, HTMLHeadingElement>;
    head: HTMLProps<TProps, HTMLHeadElement>;
    header: HTMLProps<TProps, HTMLElement>;
    hgroup: HTMLProps<TProps, HTMLElement>;
    hr: HTMLProps<TProps, HTMLHRElement>;
    html: HTMLProps<TProps, HTMLHtmlElement>;
    i: HTMLProps<TProps, HTMLElement>;
    iframe: HTMLProps<TProps, HTMLIFrameElement>;
    img: HTMLProps<TProps, HTMLImageElement>;
    input: HTMLProps<TProps, HTMLInputElement>;
    ins: HTMLProps<TProps, HTMLModElement>;
    kbd: HTMLProps<TProps, HTMLElement>;
    keygen: HTMLProps<TProps, HTMLElement>;
    label: HTMLProps<TProps, HTMLLabelElement>;
    legend: HTMLProps<TProps, HTMLLegendElement>;
    li: HTMLProps<TProps, HTMLLIElement>;
    link: HTMLProps<TProps, HTMLLinkElement>;
    main: HTMLProps<TProps, HTMLElement>;
    map: HTMLProps<TProps, HTMLMapElement>;
    mark: HTMLProps<TProps, HTMLElement>;
    menu: HTMLProps<TProps, HTMLElement>;
    menuitem: HTMLProps<TProps, HTMLElement>;
    meta: HTMLProps<TProps, HTMLMetaElement>;
    meter: HTMLProps<TProps, HTMLElement>;
    nav: HTMLProps<TProps, HTMLElement>;
    noindex: HTMLProps<TProps, HTMLElement>;
    noscript: HTMLProps<TProps, HTMLElement>;
    object: HTMLProps<TProps, HTMLObjectElement>;
    ol: HTMLProps<TProps, HTMLOListElement>;
    optgroup: HTMLProps<TProps, HTMLOptGroupElement>;
    option: HTMLProps<TProps, HTMLOptionElement>;
    output: HTMLProps<TProps, HTMLElement>;
    p: HTMLProps<TProps, HTMLParagraphElement>;
    param: HTMLProps<TProps, HTMLParamElement>;
    picture: HTMLProps<TProps, HTMLElement>;
    pre: HTMLProps<TProps, HTMLPreElement>;
    progress: HTMLProps<TProps, HTMLProgressElement>;
    q: HTMLProps<TProps, HTMLQuoteElement>;
    rp: HTMLProps<TProps, HTMLElement>;
    rt: HTMLProps<TProps, HTMLElement>;
    ruby: HTMLProps<TProps, HTMLElement>;
    s: HTMLProps<TProps, HTMLElement>;
    samp: HTMLProps<TProps, HTMLElement>;
    script: HTMLProps<TProps, HTMLElement>;
    section: HTMLProps<TProps, HTMLElement>;
    select: HTMLProps<TProps, HTMLSelectElement>;
    small: HTMLProps<TProps, HTMLElement>;
    source: HTMLProps<TProps, HTMLSourceElement>;
    span: HTMLProps<TProps, HTMLSpanElement>;
    strong: HTMLProps<TProps, HTMLElement>;
    style: HTMLProps<TProps, HTMLStyleElement>;
    sub: HTMLProps<TProps, HTMLElement>;
    summary: HTMLProps<TProps, HTMLElement>;
    sup: HTMLProps<TProps, HTMLElement>;
    table: HTMLProps<TProps, HTMLTableElement>;
    tbody: HTMLProps<TProps, HTMLTableSectionElement>;
    td: HTMLProps<TProps, HTMLTableDataCellElement>;
    textarea: HTMLProps<TProps, HTMLTextAreaElement>;
    tfoot: HTMLProps<TProps, HTMLTableSectionElement>;
    th: HTMLProps<TProps, HTMLTableHeaderCellElement>;
    thead: HTMLProps<TProps, HTMLTableSectionElement>;
    time: HTMLProps<TProps, HTMLElement>;
    title: HTMLProps<TProps, HTMLTitleElement>;
    tr: HTMLProps<TProps, HTMLTableRowElement>;
    track: HTMLProps<TProps, HTMLTrackElement>;
    u: HTMLProps<TProps, HTMLElement>;
    ul: HTMLProps<TProps, HTMLUListElement>;
    var: HTMLProps<TProps, HTMLElement>;
    video: HTMLProps<TProps, HTMLVideoElement>;
    wbr: HTMLProps<TProps, HTMLElement>;
    svg: SVGProps<TProps, SVGSVGElement>;
    animate: SVGProps<TProps, SVGElement>; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
    circle: SVGProps<TProps, SVGCircleElement>;
    clipPath: SVGProps<TProps, SVGClipPathElement>;
    defs: SVGProps<TProps, SVGDefsElement>;
    desc: SVGProps<TProps, SVGDescElement>;
    ellipse: SVGProps<TProps, SVGEllipseElement>;
    feBlend: SVGProps<TProps, SVGFEBlendElement>;
    feColorMatrix: SVGProps<TProps, SVGFEColorMatrixElement>;
    feComponentTransfer: SVGProps<TProps, SVGFEComponentTransferElement>;
    feComposite: SVGProps<TProps, SVGFECompositeElement>;
    feConvolveMatrix: SVGProps<TProps, SVGFEConvolveMatrixElement>;
    feDiffuseLighting: SVGProps<TProps, SVGFEDiffuseLightingElement>;
    feDisplacementMap: SVGProps<TProps, SVGFEDisplacementMapElement>;
    feDistantLight: SVGProps<TProps, SVGFEDistantLightElement>;
    feFlood: SVGProps<TProps, SVGFEFloodElement>;
    feFuncA: SVGProps<TProps, SVGFEFuncAElement>;
    feFuncB: SVGProps<TProps, SVGFEFuncBElement>;
    feFuncG: SVGProps<TProps, SVGFEFuncGElement>;
    feFuncR: SVGProps<TProps, SVGFEFuncRElement>;
    feGaussianBlur: SVGProps<TProps, SVGFEGaussianBlurElement>;
    feImage: SVGProps<TProps, SVGFEImageElement>;
    feMerge: SVGProps<TProps, SVGFEMergeElement>;
    feMergeNode: SVGProps<TProps, SVGFEMergeNodeElement>;
    feMorphology: SVGProps<TProps, SVGFEMorphologyElement>;
    feOffset: SVGProps<TProps, SVGFEOffsetElement>;
    fePointLight: SVGProps<TProps, SVGFEPointLightElement>;
    feSpecularLighting: SVGProps<TProps, SVGFESpecularLightingElement>;
    feSpotLight: SVGProps<TProps, SVGFESpotLightElement>;
    feTile: SVGProps<TProps, SVGFETileElement>;
    feTurbulence: SVGProps<TProps, SVGFETurbulenceElement>;
    filter: SVGProps<TProps, SVGFilterElement>;
    foreignObject: SVGProps<TProps, SVGForeignObjectElement>;
    g: SVGProps<TProps, SVGGElement>;
    image: SVGProps<TProps, SVGImageElement>;
    line: SVGProps<TProps, SVGLineElement>;
    linearGradient: SVGProps<TProps, SVGLinearGradientElement>;
    marker: SVGProps<TProps, SVGMarkerElement>;
    mask: SVGProps<TProps, SVGMaskElement>;
    metadata: SVGProps<TProps, SVGMetadataElement>;
    path: SVGProps<TProps, SVGPathElement>;
    pattern: SVGProps<TProps, SVGPatternElement>;
    polygon: SVGProps<TProps, SVGPolygonElement>;
    polyline: SVGProps<TProps, SVGPolylineElement>;
    radialGradient: SVGProps<TProps, SVGRadialGradientElement>;
    rect: SVGProps<TProps, SVGRectElement>;
    stop: SVGProps<TProps, SVGStopElement>;
    switch: SVGProps<TProps, SVGSwitchElement>;
    symbol: SVGProps<TProps, SVGSymbolElement>;
    text: SVGProps<TProps, SVGTextElement>;
    textPath: SVGProps<TProps, SVGTextPathElement>;
    tspan: SVGProps<TProps, SVGTSpanElement>;
    use: SVGProps<TProps, SVGUseElement>;
    view: SVGProps<TProps, SVGViewElement>;
  }
}

export = StyletronReact;
