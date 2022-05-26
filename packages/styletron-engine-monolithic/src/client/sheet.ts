/* eslint-env browser */
/*
pretty much vendored @emotion/sheet
Based off glamor's StyleSheet, thanks Sunil ❤️
high performance StyleSheet for css-in-js systems
- uses multiple style tags behind the scenes for millions of rules
- uses `insertRule` for appending in production for *much* faster performance
// usage
import { StyleSheet } from '@emotion/sheet'
let styleSheet = new StyleSheet({ container: document.head })
styleSheet.insert('#box { border: 1px solid red; }')
- appends a css rule into the stylesheet
styleSheet.flush()
- empties the stylesheet of all its contents
*/

declare var __DEV__: boolean;

// $FlowFixMe
function sheetForTag(tag: HTMLStyleElement): CSSStyleSheet {
  if (tag.sheet) {
    return tag.sheet;
  }

  // this weirdness brought to you by firefox
  /* istanbul ignore next */
  for (let i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].ownerNode === tag) {
      // $FlowFixMe
      return document.styleSheets[i];
    }
  }
}

export type Options = {
  nonce?: string;
  container: Element;
  speedy?: boolean;
};

function createStyleElement(options: {nonce: string | void}): HTMLStyleElement {
  const tag = document.createElement("style");
  if (typeof options.nonce !== "undefined") {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  return tag;
}

export class StyleSheet {
  isSpeedy: boolean;
  ctr: number;
  tags: HTMLStyleElement[];
  container: Element;
  nonce: string | void;
  before: Element | null;
  constructor(options: Options) {
    this.isSpeedy =
      typeof options.speedy === "undefined" ? !__DEV__ : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.container = options.container;
    this.before = null;
  }
  insert(rules: string[]) {
    // the max length is how many rules we have per style tag, it's 65000 in speedy mode
    // it's 1 in dev because we insert source maps that map a single rule to a location
    // and you can only have one source map per style tag
    if (this.ctr % (this.isSpeedy ? 65000 : 1) === 0) {
      const tag = createStyleElement(this);
      let before;
      if (this.tags.length === 0) {
        before = this.before;
      } else {
        before = this.tags[this.tags.length - 1].nextSibling;
      }
      this.container.insertBefore(tag, before);
      this.tags.push(tag);
    }
    const tag = this.tags[this.tags.length - 1];

    if (this.isSpeedy) {
      const sheet = sheetForTag(tag);
      rules.forEach(rule => {
        try {
          // this is the ultrafast version, works across browsers
          // the big drawback is that the css won't be editable in devtools
          sheet.insertRule(rule, sheet.cssRules.length);
        } catch (e) {
          if (__DEV__) {
            // eslint-disable-next-line no-console
            console.warn(
              `There was a problem inserting the following rule: "${rule}"`,
              e,
            );
          }
        }
      });
    } else {
      tag.appendChild(document.createTextNode(rules.join("")));
    }
    this.ctr++;
  }
  flush() {
    // $FlowFixMe
    this.tags.forEach(tag => tag.parentNode.removeChild(tag));
    this.tags = [];
    this.ctr = 0;
  }
}
