import StyletronCore from "styletron-core";

declare class StyletronClient extends StyletronCore {
  constructor(els: HTMLCollection | HTMLElement[]);
}

export default StyletronClient;
