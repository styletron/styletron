import StyletronServer from "styletron-server";
import StyletronClient from "styletron-client";

declare namespace StyletronUtils {
  type InjectStyle = (styletron: StyletronServer | StyletronClient, styles: Object, media?: string, pseudo?: string) => string;
  type CreateInjectStyle = (plugins?: (styles: Object) => Object, ...middlewares: Function[]) => InjectStyle;

  export var createInjectStyle: CreateInjectStyle;
  export var injectStyle: InjectStyle;
  export var injectStylePrefixed: InjectStyle;
}

export = StyletronUtils;
