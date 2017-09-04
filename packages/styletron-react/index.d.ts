// Type definitions for styletron-react
// TypeScript Version: 2.1

import * as React from "react";
import StyletronServer from "styletron-server";
import StyletronClient from "styletron-client";

declare namespace StyletronReact {
  export class StyletronProvider extends React.Component<{styletron: StyletronServer | StyletronClient}, React.ComponentState> {}

  export function styled<TProps>(
    base: React.StatelessComponent<TProps & ClassNameProp>,
    style: Style<TProps>): Component<TProps>;

  export function styled<TInnerProps, TOuterProps>(
    base: React.StatelessComponent<TInnerProps & ClassNameProp>,
    style: Style<TOuterProps>): Component<TOuterProps & TInnerProps>;

  export function styled<TProps, TComponent extends React.Component<TProps, React.ComponentState>>(
    base: React.ClassType<TProps, TComponent, React.ComponentClass<TProps & ClassNameProp>>,
    style: Style<TProps>): Component<ClassProps<TProps, TComponent>>;

  export function styled<TProps, TBase extends keyof BasePropsMap<TProps>>(
    base: TBase,
    style: Style<TProps>): Component<BasePropsMap<TProps>[TBase]>;

  export function styled<TElement extends HTMLElement, TProps>(
    base: string,
    style: Style<TProps>): Component<HTMLProps<TProps, React.AllHTMLAttributes<TElement>, TElement>>;

  export function styled<TElement extends SVGElement, TProps>(
    base: string,
    style: Style<TProps>): Component<SVGProps<TProps, TElement>>;

  type ClassNameProp = {className?: string};

  export function core<TOuterProps, TInnerProps>(
    base: React.StatelessComponent<TInnerProps>,
    style: Style<TOuterProps>,
    assignProps: AssignProps<TOuterProps, TInnerProps>): Component<TOuterProps>;

  export function core<TOuterProps, TInnerProps, TComponent extends React.Component<TInnerProps, React.ComponentState>>(
    base: React.ClassType<TInnerProps, TComponent, React.ComponentClass<TInnerProps>>,
    style: Style<TOuterProps>,
    assignProps: AssignProps<TOuterProps, TInnerProps>): Component<ClassProps<TOuterProps, TComponent>>;

  export function core<TOuterProps, TInnerProps, TBase extends keyof BasePropsMap<TInnerProps>>(
    base: TBase,
    style: Style<TOuterProps>,
    assignProps: AssignProps<TOuterProps, TInnerProps>): Component<BasePropsMap<TOuterProps>[TBase]>;

  export function core<TElement extends HTMLElement, TOuterProps, TInnerProps>(
    base: string,
    style: Style<TOuterProps>,
    assignProps: AssignProps<TOuterProps, TInnerProps>): Component<HTMLProps<TOuterProps, React.AllHTMLAttributes<TElement>, TElement>>;

  export function core<TElement extends SVGElement, TOuterProps, TInnerProps>(
    base: string,
    style: Style<TOuterProps>,
    assignProps: AssignProps<TOuterProps, TInnerProps>): Component<SVGProps<TOuterProps, TElement>>;

  type Component<TProps> = React.StatelessComponent<TProps>;

  type ClassProps<TProps, TComponent extends React.Component<{}, React.ComponentState>> = TProps & InnerRef<TComponent>;

  type HTMLProps<TOuterProps, THTMLProps, TElement extends HTMLElement> = TOuterProps & InnerRef<TElement> & THTMLProps;

  type SVGProps<TProps, TElement extends SVGElement> = TProps & InnerRef<TElement> & React.SVGAttributes<TElement>;

  type InnerRef<TInstance> = {
    innerRef?: React.Ref<TInstance>;
  };

  type AssignProps<TOuterProps, TInnerProps> = (styletron: StyletronServer | StyletronClient, style: React.CSSProperties, props?: TOuterProps) => TInnerProps;

  type Style<TProps> = React.CSSProperties | StyleFunction<TProps>;

  // Intersecting `CSSProperties` enables autocompletion for CSS properties as
  // plain objects and not only for function return objects
  type StyleFunction<TProps> = React.CSSProperties & ((props: TProps, context?: any) => React.CSSProperties);

  interface BasePropsMap<TProps> {
    a: HTMLProps<TProps, React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
    abbr: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    address: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    area: HTMLProps<TProps, React.AreaHTMLAttributes<HTMLAreaElement>, HTMLAreaElement>;
    article: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    aside: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    audio: HTMLProps<TProps, React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>;
    b: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    base: HTMLProps<TProps, React.BaseHTMLAttributes<HTMLBaseElement>, HTMLBaseElement>;
    bdi: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    bdo: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    big: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    blockquote: HTMLProps<TProps, React.BlockquoteHTMLAttributes<HTMLElement>, HTMLElement>;
    body: HTMLProps<TProps, React.HTMLAttributes<HTMLBodyElement>, HTMLBodyElement>;
    br: HTMLProps<TProps, React.HTMLAttributes<HTMLBRElement>, HTMLBRElement>;
    button: HTMLProps<TProps, React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
    canvas: HTMLProps<TProps, React.CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>;
    caption: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    cite: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    code: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    col: HTMLProps<TProps, React.ColHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
    colgroup: HTMLProps<TProps, React.ColgroupHTMLAttributes<HTMLTableColElement>, HTMLTableColElement>;
    data: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    datalist: HTMLProps<TProps, React.HTMLAttributes<HTMLDataListElement>, HTMLDataListElement>;
    dd: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    del: HTMLProps<TProps, React.DelHTMLAttributes<HTMLElement>, HTMLElement>;
    details: HTMLProps<TProps, React.DetailsHTMLAttributes<HTMLElement>, HTMLElement>;
    dfn: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    dialog: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    div: HTMLProps<TProps, React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    dl: HTMLProps<TProps, React.HTMLAttributes<HTMLDListElement>, HTMLDListElement>;
    dt: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    em: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    embed: HTMLProps<TProps, React.EmbedHTMLAttributes<HTMLEmbedElement>, HTMLEmbedElement>;
    fieldset: HTMLProps<TProps, React.FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>;
    figcaption: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    figure: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    footer: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    form: HTMLProps<TProps, React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
    h1: HTMLProps<TProps, React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h2: HTMLProps<TProps, React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h3: HTMLProps<TProps, React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h4: HTMLProps<TProps, React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h5: HTMLProps<TProps, React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    h6: HTMLProps<TProps, React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
    head: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLHeadElement>;
    header: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    hgroup: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    hr: HTMLProps<TProps, React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
    html: HTMLProps<TProps, React.HtmlHTMLAttributes<HTMLHtmlElement>, HTMLHtmlElement>;
    i: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    iframe: HTMLProps<TProps, React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement>;
    img: HTMLProps<TProps, React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;
    input: HTMLProps<TProps, React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    ins: HTMLProps<TProps, React.InsHTMLAttributes<HTMLModElement>, HTMLModElement>;
    kbd: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    keygen: HTMLProps<TProps, React.KeygenHTMLAttributes<HTMLElement>, HTMLElement>;
    label: HTMLProps<TProps, React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
    legend: HTMLProps<TProps, React.HTMLAttributes<HTMLLegendElement>, HTMLLegendElement>;
    li: HTMLProps<TProps, React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
    link: HTMLProps<TProps, React.LinkHTMLAttributes<HTMLLinkElement>, HTMLLinkElement>;
    main: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    map: HTMLProps<TProps, React.MapHTMLAttributes<HTMLMapElement>, HTMLMapElement>;
    mark: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    menu: HTMLProps<TProps, React.MenuHTMLAttributes<HTMLElement>, HTMLElement>;
    menuitem: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    meta: HTMLProps<TProps, React.MetaHTMLAttributes<HTMLMetaElement>, HTMLMetaElement>;
    meter: HTMLProps<TProps, React.MeterHTMLAttributes<HTMLElement>, HTMLElement>;
    nav: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    noscript: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    object: HTMLProps<TProps, React.ObjectHTMLAttributes<HTMLObjectElement>, HTMLObjectElement>;
    ol: HTMLProps<TProps, React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>;
    optgroup: HTMLProps<TProps, React.OptgroupHTMLAttributes<HTMLOptGroupElement>, HTMLOptGroupElement>;
    option: HTMLProps<TProps, React.OptionHTMLAttributes<HTMLOptionElement>, HTMLOptionElement>;
    output: HTMLProps<TProps, React.OutputHTMLAttributes<HTMLElement>, HTMLElement>;
    p: HTMLProps<TProps, React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
    param: HTMLProps<TProps, React.ParamHTMLAttributes<HTMLParamElement>, HTMLParamElement>;
    picture: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    pre: HTMLProps<TProps, React.HTMLAttributes<HTMLPreElement>, HTMLPreElement>;
    progress: HTMLProps<TProps, React.ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>;
    q: HTMLProps<TProps, React.QuoteHTMLAttributes<HTMLQuoteElement>, HTMLQuoteElement>;
    rp: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    rt: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    ruby: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    s: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    samp: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    script: HTMLProps<TProps, React.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>;
    section: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    select: HTMLProps<TProps, React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
    small: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    source: HTMLProps<TProps, React.SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>;
    span: HTMLProps<TProps, React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
    strong: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    style: HTMLProps<TProps, React.StyleHTMLAttributes<HTMLStyleElement>, HTMLStyleElement>;
    sub: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    summary: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    sup: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    table: HTMLProps<TProps, React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
    tbody: HTMLProps<TProps, React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
    td: HTMLProps<TProps, React.TdHTMLAttributes<HTMLTableDataCellElement>, HTMLTableDataCellElement>;
    textarea: HTMLProps<TProps, React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
    tfoot: HTMLProps<TProps, React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
    th: HTMLProps<TProps, React.ThHTMLAttributes<HTMLTableHeaderCellElement>, HTMLTableHeaderCellElement>;
    thead: HTMLProps<TProps, React.HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>;
    time: HTMLProps<TProps, React.TimeHTMLAttributes<HTMLElement>, HTMLElement>;
    title: HTMLProps<TProps, React.HTMLAttributes<HTMLTitleElement>, HTMLTitleElement>;
    tr: HTMLProps<TProps, React.HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
    track: HTMLProps<TProps, React.TrackHTMLAttributes<HTMLTrackElement>, HTMLTrackElement>;
    u: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    ul: HTMLProps<TProps, React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;
    "var": HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    video: HTMLProps<TProps, React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>;
    wbr: HTMLProps<TProps, React.HTMLAttributes<HTMLElement>, HTMLElement>;
    svg: SVGProps<TProps, SVGSVGElement>;
    animate: SVGProps<TProps, SVGElement>; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now
    circle: SVGProps<TProps, SVGCircleElement>;
    defs: SVGProps<TProps, SVGDefsElement>;
    ellipse: SVGProps<TProps, SVGEllipseElement>;
    g: SVGProps<TProps, SVGGElement>;
    image: SVGProps<TProps, SVGImageElement>;
    line: SVGProps<TProps, SVGLineElement>;
    linearGradient: SVGProps<TProps, SVGLinearGradientElement>;
    mask: SVGProps<TProps, SVGMaskElement>;
    path: SVGProps<TProps, SVGPathElement>;
    pattern: SVGProps<TProps, SVGPatternElement>;
    polygon: SVGProps<TProps, SVGPolygonElement>;
    polyline: SVGProps<TProps, SVGPolylineElement>;
    radialGradient: SVGProps<TProps, SVGRadialGradientElement>;
    rect: SVGProps<TProps, SVGRectElement>;
    stop: SVGProps<TProps, SVGStopElement>;
    symbol: SVGProps<TProps, SVGSymbolElement>;
    text: SVGProps<TProps, SVGTextElement>;
    tspan: SVGProps<TProps, SVGTSpanElement>;
    use: SVGProps<TProps, SVGUseElement>;
  }
}

export = StyletronReact;
