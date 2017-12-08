/* eslint-env browser */

const DECL_REGEX = /.([^:{]+)(:[^{]+)?{([^}]+)}/g;

import StyletronCore from 'styletron-core';

/**
 * A Styletron class for rendering styles in the browser
 * @extends StyletronCore
 * @packagename styletron-client
 * @example
 * const elements = document.getElementsByClassName('_styletron_hydrate_');
 * const styletron = new StyletronClient(elements);
 */
class StyletronClient extends StyletronCore {
  /**
   * Create a new StyletronClient instance
   * @param {NodeList|HTMLCollection|HTMLStyleElement[]} [serverStyles] - List of server style elements
   * @param {object} [opts] - StyletronCore options
   */
  constructor(serverStyles, opts) {
    super(opts);
    this.uniqueCount = 0;
    this.mediaSheets = {};
    if (serverStyles && serverStyles.length > 0) {
      for (let i = 0; i < serverStyles.length; i++) {
        const element = serverStyles[i];
        if (element.media) {
          this.mediaSheets[element.media] = element;
        } else {
          this.mainSheet = element;
        }
        this.hydrateCacheFromCssString(element.textContent, element.media);
      }
    } else {
      const styleSheet = document.createElement('style');
      document.head.appendChild(styleSheet);
      this.mainSheet = styleSheet;
    }
  }

  /*
   * Hydrate the cache from a css string and media string
   * @param {string} css   - The stylesheet css content
   * @param {string} media - The stylesheet media string
   */
  hydrateCacheFromCssString(css, media) {
    let decl;
    // {
    //  1: className,
    //  2: pseudo,
    //  3: block,
    // }
    while ((decl = DECL_REGEX.exec(css))) {
      super.incrementVirtualCount();
      StyletronCore.assignDecl(
        this.cache,
        {
          block: decl[3],
          pseudo: decl[2],
          media,
        },
        decl[1]
      );
    }
  }

  /**
   * Inject declaration into the stylesheet and return the unique class name
   * @return {string}      class name
   * @example
   * // <style id="styletron">.a{color:red}</style>
   * const styletron = new StyletronClient(document.getElementsByClassName('_styletron_hydrate_'));
   * styletron.injectDeclaration({prop: 'color', val: 'blue'});
   * // → 'b'
   * styletron.injectDeclaration({prop: 'color', val: 'red', media: '(min-width: 800px)'});
   * // → 'c'
   * styletron.injectDeclaration({prop: 'color', val: 'red'});
   * // → 'a'
   */
  injectDeclaration({prop, val, media, pseudo}) {
    return this.injectRawDeclaration({block: `${prop}:${val}`, media, pseudo});
  }

  /**
   * Inject raw declaration into the stylesheet and return the unique class name
   * @return {string}      class name
   * @example
   * // <style id="styletron">.a{color:red}</style>
   * const styletron = new StyletronClient(document.getElementsByClassName('_styletron_hydrate_'));
   * styletron.injectRawDeclaration({block: 'color:blue'});
   * // → 'b'
   * styletron.injectRawDeclaration({block: 'color:red', media: '(min-width: 800px)'});
   * // → 'c'
   * styletron.injectRawDeclaration({block: 'color:red'});
   * // → 'a'
   */
  injectRawDeclaration(decl) {
    const oldCount = this.uniqueCount;
    const className = super.injectRawDeclaration(decl);
    if (oldCount !== this.uniqueCount) {
      const rule = declarationToRule(className, decl);
      let sheet;
      if (decl.media) {
        if (!this.mediaSheets[decl.media]) {
          const mediaSheet = document.createElement('style');
          mediaSheet.media = decl.media;
          this.mediaSheets[decl.media] = mediaSheet;
          this.mainSheet.parentNode.appendChild(mediaSheet);
        }
        sheet = this.mediaSheets[decl.media].sheet;
      } else {
        sheet = this.mainSheet.sheet;
      }
      sheet.insertRule(rule, sheet.cssRules.length);
    }
    return className;
  }
}

export default StyletronClient;

/*
 * Injection helpers
 */

function declarationToRule(className, {block, pseudo}) {
  let selector = `.${className}`;
  if (pseudo) {
    selector += pseudo;
  }
  return `${selector}{${block}}`;
}
