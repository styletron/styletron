import StyletronCore from "styletron-core";

declare class StyletronServer extends StyletronCore {
  getStylesheets(): {css: string}[];
  getStylesheetsHtml(): string;
  getCss(): string;
}

export default StyletronServer;
