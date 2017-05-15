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

    svg: SVGProps<TProps, SVGElement>;
    circle: SVGProps<TProps, SVGElement>;
    clipPath: SVGProps<TProps, SVGElement>;
    defs: SVGProps<TProps, SVGElement>;
    desc: SVGProps<TProps, SVGElement>;
    ellipse: SVGProps<TProps, SVGElement>;
    feBlend: SVGProps<TProps, SVGElement>;
    feColorMatrix: SVGProps<TProps, SVGElement>;
    feComponentTransfer: SVGProps<TProps, SVGElement>;
    feComposite: SVGProps<TProps, SVGElement>;
    feConvolveMatrix: SVGProps<TProps, SVGElement>;
    feDiffuseLighting: SVGProps<TProps, SVGElement>;
    feDisplacementMap: SVGProps<TProps, SVGElement>;
    feDistantLight: SVGProps<TProps, SVGElement>;
    feFlood: SVGProps<TProps, SVGElement>;
    feFuncA: SVGProps<TProps, SVGElement>;
    feFuncB: SVGProps<TProps, SVGElement>;
    feFuncG: SVGProps<TProps, SVGElement>;
    feFuncR: SVGProps<TProps, SVGElement>;
    feGaussianBlur: SVGProps<TProps, SVGElement>;
    feImage: SVGProps<TProps, SVGElement>;
    feMerge: SVGProps<TProps, SVGElement>;
    feMergeNode: SVGProps<TProps, SVGElement>;
    feMorphology: SVGProps<TProps, SVGElement>;
    feOffset: SVGProps<TProps, SVGElement>;
    fePointLight: SVGProps<TProps, SVGElement>;
    feSpecularLighting: SVGProps<TProps, SVGElement>;
    feSpotLight: SVGProps<TProps, SVGElement>;
    feTile: SVGProps<TProps, SVGElement>;
    feTurbulence: SVGProps<TProps, SVGElement>;
    filter: SVGProps<TProps, SVGElement>;
    foreignObject: SVGProps<TProps, SVGElement>;
    g: SVGProps<TProps, SVGElement>;
    image: SVGProps<TProps, SVGElement>;
    line: SVGProps<TProps, SVGElement>;
    linearGradient: SVGProps<TProps, SVGElement>;
    marker: SVGProps<TProps, SVGElement>;
    mask: SVGProps<TProps, SVGElement>;
    metadata: SVGProps<TProps, SVGElement>;
    path: SVGProps<TProps, SVGElement>;
    pattern: SVGProps<TProps, SVGElement>;
    polygon: SVGProps<TProps, SVGElement>;
    polyline: SVGProps<TProps, SVGElement>;
    radialGradient: SVGProps<TProps, SVGElement>;
    rect: SVGProps<TProps, SVGElement>;
    stop: SVGProps<TProps, SVGElement>;
    switch: SVGProps<TProps, SVGElement>;
    symbol: SVGProps<TProps, SVGElement>;
    text: SVGProps<TProps, SVGElement>;
    textPath: SVGProps<TProps, SVGElement>;
    tspan: SVGProps<TProps, SVGElement>;
    use: SVGProps<TProps, SVGElement>;
    view: SVGProps<TProps, SVGElement>;
  }
}

export = StyletronReact;
