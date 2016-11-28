const DECL_REGEX = /.([^:{]+)(:[^{]+)?{([^:]+):([^}]+)}/g;

const StyletronCore = require('styletron-core');

/**
 * StyletronClient
 * @extends StyletronCore
 * @packagename styletron-client
 * @example
 * const styleElement = document.querySelector('style');
 * const styletron = new StyletronClient(styleElement);
 */
class StyletronClient extends StyletronCore {
  /**
   * Create a new StyletronClient instance
   * @param {NodeList|HTMLCollection|HTMLStyleElement[]} serverStyles - List of server style elements
   */
  constructor(serverStyles, opts) {
    super(opts);
    if (!serverStyles) {
      throw Error('No stylesheet');
    }
    this.uniqueCount = 0;
    this.mediaSheets = {};
    for (let i = 0; i < serverStyles.length; i++) {
      const element = serverStyles[i];
      if (element.media) {
        this.mediaSheets[element.media] = element;
      } else {
        this.mainSheet = element;
      }
      this.hydrateCacheFromCssString(element.textContent, element.media);
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
    //  3: prop,
    //  4: val
    // }
    while (decl = DECL_REGEX.exec(css)) {
      super.incrementVirtualCount();
      StyletronCore.assignDecl(this.cache, {
        pseudo: decl[2],
        prop: decl[3],
        val: decl[4],
        media
      }, decl[1]);
    }
  }

  /**
   * Inject declaration into the stylesheet and return the unique class name
   * @return {string}      class name
   * @example
   * // <style id="styletron">.c0{color:red}</style>
   * const styletron = new StyletronClient(document.getElementsByClassName('_styletron_hydrate_'));
   * styletron.injectDeclaration({prop: 'color', val: 'blue'});
   * // → 'c1'
   * styletron.injectDeclaration({prop: 'color', val: 'red', media: '(min-width: 800px)'});
   * // → 'c2'
   * styletron.injectDeclaration({prop: 'color', val: 'red'});
   * // → 'c0'
   */
  injectDeclaration(decl) {
    const oldCount = this.uniqueCount;
    const className = super.injectDeclaration(decl);
    if (oldCount !== this.uniqueCount) {
      const rule = declarationToRule(className, decl);
      let sheet;
      if (decl.media) {
        if (!this.mediaSheets[decl.media]) {
          const mediaSheet = document.createElement('style');
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

module.exports = StyletronClient;

/*
 * Injection helpers
 */

function declarationToRule(className, {prop, val, pseudo}) {
  const decl = `${prop}:${val}`;
  let selector = `.${className}`;
  if (pseudo) {
    selector += pseudo;
  }
  return `${selector}{${decl}}`;
}
