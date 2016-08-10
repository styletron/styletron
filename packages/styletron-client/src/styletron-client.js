const fenwick = require('fenwick-tree');

const StyletronCore = require('styletron-core');

/**
 * StyletronClient
 * @extends StyletronCore
 * @example
 * const styleElement = document.querySelector('style');
 * const styletron = new StyletronClient(styleElement);
 */
class StyletronClient extends StyletronCore {
  /**
   * Create a new StyletronClient instance
   * @param {HTMLStyleElement} styleElement - Style element
   */
  constructor(styleElement) {
    super();
    if (!styleElement) {
      throw Error('no stylesheet');
    }
    this.counts = fenwick([0, 0]);
    this.styleElement = styleElement;
    this.hydrateCacheFromCssRules(styleElement.sheet.rules);
  }

  /*
   * Hydrate the cache from a CSSRuleList
   * @param {CSSRuleList} ruleList The rule list
   */
  hydrateCacheFromCssRules(ruleList) {
    let mediaCount = 0;
    let count = 0;
    for (let i = 0; i < ruleList.length; i++) {
      const rule = ruleList[i];
      if (rule instanceof CSSStyleRule) {
        count++;
        assignRule(this.cache, cacheInfoFromCSSStyleRule(rule));
      } else if (rule instanceof CSSMediaRule) {
        const media = rule.media.mediaText;
        mediaCount += rule.cssRules.length;
        for (let i = 0; i < rule.cssRules.length; i++) {
          const info = cacheInfoFromCSSStyleRule(rule.cssRules[i]);
          info.media = media;
          assignRule(this.cache, info);
        }
      }
    }
    this.counts = fenwick([count, mediaCount]);
  }

  /**
   * Inject declaration into the stylesheet and return the unique class name
   * @return {string}      class name
   * @example
   * // <style id="styletron">.c0{color:red}</style>
   * const styletron = new StyletronClient(document.getElementById('styletron'));
   * styletron.injectDeclaration({prop: 'color', val: 'blue'});
   * // ➜ 'c1'
   * styletron.injectDeclaration({prop: 'color', val: 'red', media: '(min-width: 800px)'});
   * // ➜ 'c2'
   * styletron.injectDeclaration({prop: 'color', val: 'red'});
   * // ➜ 'c0'
   */
  injectDeclaration(decl) {
    const oldCount = this.counter;
    const className = super.injectDeclaration(decl);
    if (oldCount !== this.counter) {
      let index;
      if (!decl.media) {
        fenwick.update(this.counts, 0, 1);
        index = fenwick.query(this.counts, 0);
      } else {
        fenwick.update(this.counts, 1, 1);
        index = fenwick.query(this.counts, 1);
      }
      const rule = declarationToRule(className, decl);
      this.styleElement.sheet.insertRule(rule, index - 1);
    }
    return className;
  }

}

module.exports = StyletronClient;

/*
 * Hydration helpers
 */

function assignRule(target, ruleInfo) {
  let pseudo;
  let className;
  const index = ruleInfo.selector.indexOf(':');
  if (index !== -1) {
    pseudo = ruleInfo.selector.slice(index);
    className = getClassName(ruleInfo.selector.slice(0, index));
  } else {
    className = getClassName(ruleInfo.selector);
  }
  const decl = {
    prop: ruleInfo.prop,
    val: ruleInfo.val,
    media: ruleInfo.media,
    pseudo: pseudo
  };
  StyletronCore.assignDecl(target, decl, className);
}

function cacheInfoFromCSSStyleRule(rule) {
  const prop = rule.style[0];
  return {
    prop,
    val: rule.style[prop],
    selector: rule.selectorText
  };
}

function getClassName(classSelector) {
  return classSelector.substr(1);
}

/*
 * Injection helpers
 */

function declarationToRule(className, {prop, val, media, pseudo}) {
  const decl = `${prop}:${val}`;
  let selector = `.${className}`;
  if (pseudo) {
    selector += pseudo;
  }
  const rule = `${selector}{${decl}}`;
  return media ? `@media ${media}{${rule}}` : rule;
}
