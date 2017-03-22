/* eslint-env browser */

const DECL_REGEX = /\.([^:{]+)(:[^{]+)?{([^:]+):([^}]+)}/g;
const KEYFRAMES_REGEX = '{([^{]+{[^}]+})+?}';

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
    if (serverStyles) {
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
    //  3: prop,
    //  4: val
    // }
    while ((decl = DECL_REGEX.exec(css))) {
      super.incrementVirtualCount();

      const keyRegex = `@keyframes ${decl[4]}${KEYFRAMES_REGEX}`;
      const reg = new RegExp(keyRegex);
      const keyMatches = reg.exec(css);
      if (keyMatches) {
        decl[4] = keyframeStringToJSObject(keyMatches[0]);
      }

      StyletronCore.assignDecl(
        this.cache,
        {
          pseudo: decl[2],
          prop: decl[3],
          val: decl[4],
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
  injectDeclaration(decl) {
    const oldCount = this.uniqueCount;
    const className = super.injectDeclaration(decl);
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

function declarationToRule(className, {prop, val, pseudo}) {
  if (['animationName', 'animation-name'].indexOf(prop) >= 0) {
    const keyframes = [];
    for (const kf in val) {
      if (val.hasOwnProperty(kf)) {
        const properties = [];
        for (const pr in val[kf]) {
          if (val[kf].hasOwnProperty(pr)) {
            properties.push(`${pr}:${val[kf[pr]]}`);
          }
        }
        keyframes.push(`${kf}{${properties.join(';')}}`);
      }
<<<<<<< HEAD:packages/styletron-client/src/index.js
=======
      keyframes.push(`${kf}{${properties.join(';')}}`);
>>>>>>> brushed the code to silence the linter:packages/styletron-client/src/styletron-client.js
    }
    return `@keyframes ${className}{${keyframes.join('')}}.${className}{animation-name:${className}}`;
  }

  const decl = `${prop}:${val}`;
  let selector = `.${className}`;
  if (pseudo) {
    selector += pseudo;
  }
  return `${selector}{${decl}}`;
}

/**
 * This will turn a @keyframe animation-name{...} into an object
 * @param keyframeString
 * @returns {*}
 */
function keyframeStringToJSObject(keyframeString) {
  return (
    keyframeString
      .replace(/^[^{]+{/g, '') // remove '@keyframe animation-name{' from the beginning
      .slice(0, -2) // remove last 2 occurrences of '}'
      .split('}') // split by keyframes
      .map(keyframe => {
        const key = keyframe.split('{'); // separate keyframe value from rules

<<<<<<< HEAD:packages/styletron-client/src/index.js
        // handle multiple rules
        const rules = key[1]
          .split(';')
          .map(rule => {
            // return {prop: value} object
            const prop = rule.split(':');
            return {[prop[0]]: prop[1]};
          })
          .reduce((ruleSet, rule) => Object.assign(ruleSet, rule), {}); // combine array of rules into a single object

        // return rules for current keyframe
        return {[key[0]]: rules};
      })
      // combine array of keyframes into a single object
      .reduce((keySet, keyframe) => Object.assign(keySet, keyframe), {})
  );
=======
      // handle multiple rules
      const rules = key[1].split(';').map(rule => {
        // return {prop: value} object
        const prop = rule.split(':');
        return {[prop[0]]: prop[1]};
      })
      .reduce((ruleSet, rule) => Object.assign(ruleSet, rule), {}); // combine array of rules into a single object

      // return rules for current keyframe
      return {[key[0]]: rules};
    })
    // combine array of keyframes into a single object
    .reduce((keySet, keyframe) => Object.assign(keySet, keyframe), {});
>>>>>>> brushed the code to silence the linter:packages/styletron-client/src/styletron-client.js
}
