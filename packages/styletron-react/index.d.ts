import * as React from "react";
import StyletronServer from "styletron-server";
import StyletronClient from "styletron-client";

declare namespace StyletronReact {
  export class StyletronProvider extends React.Component<{styletron: StyletronServer | StyletronClient}, void> {}

  type InnerRef<TInstance> = {
    innerRef?: (instance: TInstance) => any;
  };

  // Intersecting `CSSProperties` enables autocompletion for CSS properties as
  // plain objects and not only for function return objects
  type StyleFunction<TProps> = React.CSSProperties & ((props: TProps) => React.CSSProperties);

  type Style<TProps> = React.CSSProperties | StyleFunction<TProps>;

  interface StyledHTMLElement<TProps, TElement extends HTMLElement> extends React.StatelessComponent<TProps & React.HTMLAttributes<TElement> & InnerRef<TElement>> {}

  export function styled<TElement extends HTMLElement, TProps>(base: string, style: Style<TProps>): StyledHTMLElement<TProps, TElement>;
  export function styled<TElement extends HTMLElement, TProps, TBaseProps>(base: StyledHTMLElement<TBaseProps, TElement>, style: Style<TProps>): StyledHTMLElement<TBaseProps & TProps, TElement>;

  export function styled<TProps>(base: "a", style: Style<TProps>): StyledHTMLElement<TProps, HTMLAnchorElement>;
  export function styled<TProps>(base: "abbr", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "address", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "area", style: Style<TProps>): StyledHTMLElement<TProps, HTMLAreaElement>;
  export function styled<TProps>(base: "article", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "aside", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "audio", style: Style<TProps>): StyledHTMLElement<TProps, HTMLAudioElement>;
  export function styled<TProps>(base: "b", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "base", style: Style<TProps>): StyledHTMLElement<TProps, HTMLBaseElement>;
  export function styled<TProps>(base: "bdi", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "bdo", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "big", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "blockquote", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "body", style: Style<TProps>): StyledHTMLElement<TProps, HTMLBodyElement>;
  export function styled<TProps>(base: "br", style: Style<TProps>): StyledHTMLElement<TProps, HTMLBRElement>;
  export function styled<TProps>(base: "button", style: Style<TProps>): StyledHTMLElement<TProps, HTMLButtonElement>;
  export function styled<TProps>(base: "canvas", style: Style<TProps>): StyledHTMLElement<TProps, HTMLCanvasElement>;
  export function styled<TProps>(base: "caption", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "cite", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "code", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "col", style: Style<TProps>): StyledHTMLElement<TProps, HTMLTableColElement>;
  export function styled<TProps>(base: "colgroup", style: Style<TProps>): StyledHTMLElement<TProps, HTMLTableColElement>;
  export function styled<TProps>(base: "data", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "datalist", style: Style<TProps>): StyledHTMLElement<TProps, HTMLDataListElement>;
  export function styled<TProps>(base: "dd", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "del", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "details", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "dfn", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "dialog", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "div", style: Style<TProps>): StyledHTMLElement<TProps, HTMLDivElement>;
  export function styled<TProps>(base: "dl", style: Style<TProps>): StyledHTMLElement<TProps, HTMLDListElement>;
  export function styled<TProps>(base: "dt", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "em", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "embed", style: Style<TProps>): StyledHTMLElement<TProps, HTMLEmbedElement>;
  export function styled<TProps>(base: "fieldset", style: Style<TProps>): StyledHTMLElement<TProps, HTMLFieldSetElement>;
  export function styled<TProps>(base: "figcaption", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "figure", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "footer", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "form", style: Style<TProps>): StyledHTMLElement<TProps, HTMLFormElement>;
  export function styled<TProps>(base: "h1", style: Style<TProps>): StyledHTMLElement<TProps, HTMLHeadingElement>;
  export function styled<TProps>(base: "h2", style: Style<TProps>): StyledHTMLElement<TProps, HTMLHeadingElement>;
  export function styled<TProps>(base: "h3", style: Style<TProps>): StyledHTMLElement<TProps, HTMLHeadingElement>;
  export function styled<TProps>(base: "h4", style: Style<TProps>): StyledHTMLElement<TProps, HTMLHeadingElement>;
  export function styled<TProps>(base: "h5", style: Style<TProps>): StyledHTMLElement<TProps, HTMLHeadingElement>;
  export function styled<TProps>(base: "h6", style: Style<TProps>): StyledHTMLElement<TProps, HTMLHeadingElement>;
  export function styled<TProps>(base: "head", style: Style<TProps>): StyledHTMLElement<TProps, HTMLHeadElement>;
  export function styled<TProps>(base: "header", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "hgroup", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "hr", style: Style<TProps>): StyledHTMLElement<TProps, HTMLHRElement>;
  export function styled<TProps>(base: "html", style: Style<TProps>): StyledHTMLElement<TProps, HTMLHtmlElement>;
  export function styled<TProps>(base: "i", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "iframe", style: Style<TProps>): StyledHTMLElement<TProps, HTMLIFrameElement>;
  export function styled<TProps>(base: "img", style: Style<TProps>): StyledHTMLElement<TProps, HTMLImageElement>;
  export function styled<TProps>(base: "input", style: Style<TProps>): StyledHTMLElement<TProps, HTMLInputElement>;
  export function styled<TProps>(base: "ins", style: Style<TProps>): StyledHTMLElement<TProps, HTMLModElement>;
  export function styled<TProps>(base: "kbd", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "keygen", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "label", style: Style<TProps>): StyledHTMLElement<TProps, HTMLLabelElement>;
  export function styled<TProps>(base: "legend", style: Style<TProps>): StyledHTMLElement<TProps, HTMLLegendElement>;
  export function styled<TProps>(base: "li", style: Style<TProps>): StyledHTMLElement<TProps, HTMLLIElement>;
  export function styled<TProps>(base: "link", style: Style<TProps>): StyledHTMLElement<TProps, HTMLLinkElement>;
  export function styled<TProps>(base: "main", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "map", style: Style<TProps>): StyledHTMLElement<TProps, HTMLMapElement>;
  export function styled<TProps>(base: "mark", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "menu", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "menuitem", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "meta", style: Style<TProps>): StyledHTMLElement<TProps, HTMLMetaElement>;
  export function styled<TProps>(base: "meter", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "nav", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "noindex", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "noscript", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "object", style: Style<TProps>): StyledHTMLElement<TProps, HTMLObjectElement>;
  export function styled<TProps>(base: "ol", style: Style<TProps>): StyledHTMLElement<TProps, HTMLOListElement>;
  export function styled<TProps>(base: "optgroup", style: Style<TProps>): StyledHTMLElement<TProps, HTMLOptGroupElement>;
  export function styled<TProps>(base: "option", style: Style<TProps>): StyledHTMLElement<TProps, HTMLOptionElement>;
  export function styled<TProps>(base: "output", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "p", style: Style<TProps>): StyledHTMLElement<TProps, HTMLParagraphElement>;
  export function styled<TProps>(base: "param", style: Style<TProps>): StyledHTMLElement<TProps, HTMLParamElement>;
  export function styled<TProps>(base: "picture", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "pre", style: Style<TProps>): StyledHTMLElement<TProps, HTMLPreElement>;
  export function styled<TProps>(base: "progress", style: Style<TProps>): StyledHTMLElement<TProps, HTMLProgressElement>;
  export function styled<TProps>(base: "q", style: Style<TProps>): StyledHTMLElement<TProps, HTMLQuoteElement>;
  export function styled<TProps>(base: "rp", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "rt", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "ruby", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "s", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "samp", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "script", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "section", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "select", style: Style<TProps>): StyledHTMLElement<TProps, HTMLSelectElement>;
  export function styled<TProps>(base: "small", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "source", style: Style<TProps>): StyledHTMLElement<TProps, HTMLSourceElement>;
  export function styled<TProps>(base: "span", style: Style<TProps>): StyledHTMLElement<TProps, HTMLSpanElement>;
  export function styled<TProps>(base: "strong", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "style", style: Style<TProps>): StyledHTMLElement<TProps, HTMLStyleElement>;
  export function styled<TProps>(base: "sub", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "summary", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "sup", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "table", style: Style<TProps>): StyledHTMLElement<TProps, HTMLTableElement>;
  export function styled<TProps>(base: "tbody", style: Style<TProps>): StyledHTMLElement<TProps, HTMLTableSectionElement>;
  export function styled<TProps>(base: "td", style: Style<TProps>): StyledHTMLElement<TProps, HTMLTableDataCellElement>;
  export function styled<TProps>(base: "textarea", style: Style<TProps>): StyledHTMLElement<TProps, HTMLTextAreaElement>;
  export function styled<TProps>(base: "tfoot", style: Style<TProps>): StyledHTMLElement<TProps, HTMLTableSectionElement>;
  export function styled<TProps>(base: "th", style: Style<TProps>): StyledHTMLElement<TProps, HTMLTableHeaderCellElement>;
  export function styled<TProps>(base: "thead", style: Style<TProps>): StyledHTMLElement<TProps, HTMLTableSectionElement>;
  export function styled<TProps>(base: "time", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "title", style: Style<TProps>): StyledHTMLElement<TProps, HTMLTitleElement>;
  export function styled<TProps>(base: "tr", style: Style<TProps>): StyledHTMLElement<TProps, HTMLTableRowElement>;
  export function styled<TProps>(base: "track", style: Style<TProps>): StyledHTMLElement<TProps, HTMLTrackElement>;
  export function styled<TProps>(base: "u", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "ul", style: Style<TProps>): StyledHTMLElement<TProps, HTMLUListElement>;
  export function styled<TProps>(base: "var", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "video", style: Style<TProps>): StyledHTMLElement<TProps, HTMLVideoElement>;
  export function styled<TProps>(base: "wbr", style: Style<TProps>): StyledHTMLElement<TProps, HTMLElement>;

  interface StyledSVGElement<TProps, TElement extends SVGElement> extends React.StatelessComponent<TProps & React.SVGAttributes<TElement> & InnerRef<TElement>> {}

  export function styled<TElement extends SVGElement, TProps>(base: string, style: Style<TProps>): StyledSVGElement<TProps, TElement>;
  export function styled<TElement extends SVGElement, TProps, TBaseProps>(base: StyledSVGElement<TBaseProps, TElement>, style: Style<TProps>): StyledSVGElement<TBaseProps & TProps, TElement>;

  export function styled<TProps>(base: "svg", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "circle", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "clipPath", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "defs", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "desc", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "ellipse", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feBlend", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feColorMatrix", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feComponentTransfer", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feComposite", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feConvolveMatrix", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feDiffuseLighting", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feDisplacementMap", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feDistantLight", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feFlood", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feFuncA", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feFuncB", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feFuncG", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feFuncR", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feGaussianBlur", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feImage", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feMerge", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feMergeNode", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feMorphology", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feOffset", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "fePointLight", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feSpecularLighting", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feSpotLight", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feTile", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feTurbulence", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "filter", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "foreignObject", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "g", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "image", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "line", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "linearGradient", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "marker", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "mask", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "metadata", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "path", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "pattern", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "polygon", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "polyline", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "radialGradient", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "rect", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "stop", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "switch", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "symbol", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "text", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "textPath", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "tspan", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "use", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;
  export function styled<TProps>(base: "view", style: Style<TProps>): StyledSVGElement<TProps, SVGElement>;

  interface StyledStatelessComponent<TProps> extends React.StatelessComponent<TProps> {}

  export function styled<TProps>(
    base: React.StatelessComponent<TProps> | StyledStatelessComponent<TProps>,
    style: Style<TProps>
  ): StyledStatelessComponent<TProps>;

  interface StyledComponentClass<TProps, TComponent extends React.Component<TProps, React.ComponentState>> extends React.StatelessComponent<TProps & InnerRef<TComponent>> {}

  export function styled<TProps, TComponent extends React.Component<TProps, React.ComponentState>>(
    base: StyledComponentClass<TProps, TComponent>,
    style: Style<TProps>
  ): StyledComponentClass<TProps, TComponent>;
  export function styled<TProps extends {}, TComponent extends React.Component<TProps, React.ComponentState>>(
    base: React.ClassType<TProps, TComponent, React.ComponentClass<TProps>>,
    style: Style<TProps>
  ): StyledComponentClass<TProps, TComponent>;
}

export = StyletronReact;
