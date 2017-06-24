declare class StyletronCore {
  injectDeclaration(decl: {prop: string; val: string; media?: string; pseudo?: string}): string | void;
  injectRawDeclaration(decl: {block: string; media?: string; pseudo?: string}): string | void;
}

export default StyletronCore;
