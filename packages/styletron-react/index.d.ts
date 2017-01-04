import {Component, ComponentClass, StatelessComponent, DOMElement, ComponentElement, SFCElement, ComponentState, CSSProperties, HTMLAttributes, Ref} from "react";
import StyletronServer from "styletron-server";
import StyletronClient from "styletron-client";

declare namespace StyletronReact {
  export class StyletronProvider extends Component<{styletron: StyletronServer | StyletronClient}, void> {}

  type InnerRef<TInstance> = {
    innerRef?: Ref<TInstance>;
  };

  interface StyledElement<TProps, TElement extends Element> extends ComponentClass<TProps & HTMLAttributes<TElement> & InnerRef<TElement>> {
    render(): DOMElement<HTMLAttributes<TElement>, TElement>
  }

  interface StyledStatelessComponent<TProps> extends ComponentClass<TProps> {
    render(): SFCElement<TProps>
  }

  interface StyledComponentClass<TProps> extends ComponentClass<TProps & InnerRef<Component<TProps, ComponentState>>> {
    render(): ComponentElement<TProps, Component<TProps, ComponentState>>
  }

  // This is not entierly true, but extending `CSSProperties` enables
  // autocompletion of CSS properties of plain objects and not only
  // for the return object of a function
  interface StyleFunction<TProps> extends CSSProperties {
    (props: TProps): CSSProperties;
  }

  type Style<TProps> = CSSProperties | StyleFunction<TProps>;

  export function styled<TElement extends Element, TProps>(base: string, style: Style<TProps>): StyledElement<TProps, TElement>;
  export function styled<TElement extends Element, TProps, TInnerProps>(base: StyledElement<TInnerProps, TElement>, style: Style<TProps>): StyledElement<TInnerProps & TProps, TElement>;
  export function styled<TProps, TInnerProps>(base: StatelessComponent<TInnerProps> | StyledStatelessComponent<TInnerProps>, style: Style<TProps>): StyledStatelessComponent<TInnerProps & TProps>;
  export function styled<TProps, TInnerProps>(base: ComponentClass<TInnerProps> | StyledComponentClass<TInnerProps>, style: Style<TProps>): StyledComponentClass<TInnerProps & TProps>;

  export function styled<TProps>(base: "a", style: Style<TProps>): StyledElement<TProps, HTMLAnchorElement>;
  export function styled<TProps>(base: "abbr", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "address", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "area", style: Style<TProps>): StyledElement<TProps, HTMLAreaElement>;
  export function styled<TProps>(base: "article", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "aside", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "audio", style: Style<TProps>): StyledElement<TProps, HTMLAudioElement>;
  export function styled<TProps>(base: "b", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "base", style: Style<TProps>): StyledElement<TProps, HTMLBaseElement>;
  export function styled<TProps>(base: "bdi", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "bdo", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "big", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "blockquote", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "body", style: Style<TProps>): StyledElement<TProps, HTMLBodyElement>;
  export function styled<TProps>(base: "br", style: Style<TProps>): StyledElement<TProps, HTMLBRElement>;
  export function styled<TProps>(base: "button", style: Style<TProps>): StyledElement<TProps, HTMLButtonElement>;
  export function styled<TProps>(base: "canvas", style: Style<TProps>): StyledElement<TProps, HTMLCanvasElement>;
  export function styled<TProps>(base: "caption", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "cite", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "code", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "col", style: Style<TProps>): StyledElement<TProps, HTMLTableColElement>;
  export function styled<TProps>(base: "colgroup", style: Style<TProps>): StyledElement<TProps, HTMLTableColElement>;
  export function styled<TProps>(base: "data", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "datalist", style: Style<TProps>): StyledElement<TProps, HTMLDataListElement>;
  export function styled<TProps>(base: "dd", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "del", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "details", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "dfn", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "dialog", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "div", style: Style<TProps>): StyledElement<TProps, HTMLDivElement>;
  export function styled<TProps>(base: "dl", style: Style<TProps>): StyledElement<TProps, HTMLDListElement>;
  export function styled<TProps>(base: "dt", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "em", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "embed", style: Style<TProps>): StyledElement<TProps, HTMLEmbedElement>;
  export function styled<TProps>(base: "fieldset", style: Style<TProps>): StyledElement<TProps, HTMLFieldSetElement>;
  export function styled<TProps>(base: "figcaption", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "figure", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "footer", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "form", style: Style<TProps>): StyledElement<TProps, HTMLFormElement>;
  export function styled<TProps>(base: "h1", style: Style<TProps>): StyledElement<TProps, HTMLHeadingElement>;
  export function styled<TProps>(base: "h2", style: Style<TProps>): StyledElement<TProps, HTMLHeadingElement>;
  export function styled<TProps>(base: "h3", style: Style<TProps>): StyledElement<TProps, HTMLHeadingElement>;
  export function styled<TProps>(base: "h4", style: Style<TProps>): StyledElement<TProps, HTMLHeadingElement>;
  export function styled<TProps>(base: "h5", style: Style<TProps>): StyledElement<TProps, HTMLHeadingElement>;
  export function styled<TProps>(base: "h6", style: Style<TProps>): StyledElement<TProps, HTMLHeadingElement>;
  export function styled<TProps>(base: "head", style: Style<TProps>): StyledElement<TProps, HTMLHeadElement>;
  export function styled<TProps>(base: "header", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "hgroup", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "hr", style: Style<TProps>): StyledElement<TProps, HTMLHRElement>;
  export function styled<TProps>(base: "html", style: Style<TProps>): StyledElement<TProps, HTMLHtmlElement>;
  export function styled<TProps>(base: "i", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "iframe", style: Style<TProps>): StyledElement<TProps, HTMLIFrameElement>;
  export function styled<TProps>(base: "img", style: Style<TProps>): StyledElement<TProps, HTMLImageElement>;
  export function styled<TProps>(base: "input", style: Style<TProps>): StyledElement<TProps, HTMLInputElement>;
  export function styled<TProps>(base: "ins", style: Style<TProps>): StyledElement<TProps, HTMLModElement>;
  export function styled<TProps>(base: "kbd", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "keygen", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "label", style: Style<TProps>): StyledElement<TProps, HTMLLabelElement>;
  export function styled<TProps>(base: "legend", style: Style<TProps>): StyledElement<TProps, HTMLLegendElement>;
  export function styled<TProps>(base: "li", style: Style<TProps>): StyledElement<TProps, HTMLLIElement>;
  export function styled<TProps>(base: "link", style: Style<TProps>): StyledElement<TProps, HTMLLinkElement>;
  export function styled<TProps>(base: "main", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "map", style: Style<TProps>): StyledElement<TProps, HTMLMapElement>;
  export function styled<TProps>(base: "mark", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "menu", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "menuitem", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "meta", style: Style<TProps>): StyledElement<TProps, HTMLMetaElement>;
  export function styled<TProps>(base: "meter", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "nav", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "noindex", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "noscript", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "object", style: Style<TProps>): StyledElement<TProps, HTMLObjectElement>;
  export function styled<TProps>(base: "ol", style: Style<TProps>): StyledElement<TProps, HTMLOListElement>;
  export function styled<TProps>(base: "optgroup", style: Style<TProps>): StyledElement<TProps, HTMLOptGroupElement>;
  export function styled<TProps>(base: "option", style: Style<TProps>): StyledElement<TProps, HTMLOptionElement>;
  export function styled<TProps>(base: "output", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "p", style: Style<TProps>): StyledElement<TProps, HTMLParagraphElement>;
  export function styled<TProps>(base: "param", style: Style<TProps>): StyledElement<TProps, HTMLParamElement>;
  export function styled<TProps>(base: "picture", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "pre", style: Style<TProps>): StyledElement<TProps, HTMLPreElement>;
  export function styled<TProps>(base: "progress", style: Style<TProps>): StyledElement<TProps, HTMLProgressElement>;
  export function styled<TProps>(base: "q", style: Style<TProps>): StyledElement<TProps, HTMLQuoteElement>;
  export function styled<TProps>(base: "rp", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "rt", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "ruby", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "s", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "samp", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "script", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "section", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "select", style: Style<TProps>): StyledElement<TProps, HTMLSelectElement>;
  export function styled<TProps>(base: "small", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "source", style: Style<TProps>): StyledElement<TProps, HTMLSourceElement>;
  export function styled<TProps>(base: "span", style: Style<TProps>): StyledElement<TProps, HTMLSpanElement>;
  export function styled<TProps>(base: "strong", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "style", style: Style<TProps>): StyledElement<TProps, HTMLStyleElement>;
  export function styled<TProps>(base: "sub", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "summary", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "sup", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "table", style: Style<TProps>): StyledElement<TProps, HTMLTableElement>;
  export function styled<TProps>(base: "tbody", style: Style<TProps>): StyledElement<TProps, HTMLTableSectionElement>;
  export function styled<TProps>(base: "td", style: Style<TProps>): StyledElement<TProps, HTMLTableDataCellElement>;
  export function styled<TProps>(base: "textarea", style: Style<TProps>): StyledElement<TProps, HTMLTextAreaElement>;
  export function styled<TProps>(base: "tfoot", style: Style<TProps>): StyledElement<TProps, HTMLTableSectionElement>;
  export function styled<TProps>(base: "th", style: Style<TProps>): StyledElement<TProps, HTMLTableHeaderCellElement>;
  export function styled<TProps>(base: "thead", style: Style<TProps>): StyledElement<TProps, HTMLTableSectionElement>;
  export function styled<TProps>(base: "time", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "title", style: Style<TProps>): StyledElement<TProps, HTMLTitleElement>;
  export function styled<TProps>(base: "tr", style: Style<TProps>): StyledElement<TProps, HTMLTableRowElement>;
  export function styled<TProps>(base: "track", style: Style<TProps>): StyledElement<TProps, HTMLTrackElement>;
  export function styled<TProps>(base: "u", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "ul", style: Style<TProps>): StyledElement<TProps, HTMLUListElement>;
  export function styled<TProps>(base: "var", style: Style<TProps>): StyledElement<TProps, HTMLElement>;
  export function styled<TProps>(base: "video", style: Style<TProps>): StyledElement<TProps, HTMLVideoElement>;
  export function styled<TProps>(base: "wbr", style: Style<TProps>): StyledElement<TProps, HTMLElement>;

  // SVG
  export function styled<TProps>(base: "svg", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "circle", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "clipPath", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "defs", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "desc", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "ellipse", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feBlend", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feColorMatrix", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feComponentTransfer", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feComposite", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feConvolveMatrix", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feDiffuseLighting", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feDisplacementMap", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feDistantLight", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feFlood", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feFuncA", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feFuncB", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feFuncG", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feFuncR", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feGaussianBlur", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feImage", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feMerge", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feMergeNode", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feMorphology", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feOffset", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "fePointLight", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feSpecularLighting", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feSpotLight", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feTile", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "feTurbulence", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "filter", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "foreignObject", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "g", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "image", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "line", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "linearGradient", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "marker", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "mask", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "metadata", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "path", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "pattern", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "polygon", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "polyline", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "radialGradient", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "rect", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "stop", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "switch", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "symbol", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "text", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "textPath", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "tspan", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "use", style: Style<TProps>): StyledElement<TProps, SVGElement>;
  export function styled<TProps>(base: "view", style: Style<TProps>): StyledElement<TProps, SVGElement>;
}

export = StyletronReact;
