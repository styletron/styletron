const IE9_RULE_LIMIT = 4095;

const StyletronClient = require('styletron-client');

/**
 * StyletronClientIE9
 * @extends StyletronClient
 * @packagename styletron-client-old-ie
 * @example
 * const styleElement = document.querySelector('style');
 * const styletron = new StyletronClientIE9(styleElement);
 */
class StyletronClientIE9 extends StyletronClient {
  /**
   * Create a new StyletronClient instance
   * @param {NodeList|HTMLCollection|HTMLStyleElement[]} serverStyles - List of server style elements
   */
  constructor(...args) {
    super(...args);
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
    const cached = this.getCachedDeclaration(decl);
    if (cached) {
      return cached;
    }
    if (decl.media) {
      if (
        this.mediaSheets[decl.media] &&
        this.mediaSheets[decl.media].sheet.cssRules.length >= IE9_RULE_LIMIT
      ) {
        const mediaRollover = document.createElement('style');
        mediaRollover.media = decl.media;
        this.mediaSheets[decl.media].parentNode.insertBefore(
          mediaRollover,
          this.mediaSheets[decl.media]
        );
        this.mediaSheets[decl.media] = mediaRollover.sheet;
      }
    } else if (
      this.mainSheet &&
      this.mainSheet.sheet.cssRules.length >= IE9_RULE_LIMIT
    ) {
      const rolloverSheet = document.createElement('style');
      this.mainSheet.parentNode.insertBefore(rolloverSheet, this.mainSheet);
      this.mainSheet = rolloverSheet.sheet;
    }
    return super.injectDeclaration(decl);
  }
}

module.exports = StyletronClientIE9;
