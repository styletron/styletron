declare class StyletronCore {
  injectDeclaration(decl: {prop: string; val: string; media?: string; pseudo?: string}): string | void;
}

export default StyletronCore;
