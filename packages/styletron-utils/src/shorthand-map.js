const BEFORE_AFTER = ['-before', '-after'];
const DIR_SUFFIX = ['-top', '-right', '-bottom', '-left'];
const BORDER_DIR_VAL = ['-width', '-style', '-color'];
const WIDTH_STYLE_COLOR = ['-width', '-style', '-color'];

const SHORTHANDS = {
  // CSS 2.1: http://www.w3.org/TR/CSS2/propidx.html
  'list-style':      ['-type', '-position', '-image'],
  'margin':          DIR_SUFFIX,
  'outline':         WIDTH_STYLE_COLOR,
  'padding':         DIR_SUFFIX,

  // CSS Backgrounds and Borders Module Level 3: http://www.w3.org/TR/css3-background/
  'background':      ['-image', '-position', '-size', '-repeat', '-origin', '-clip', '-attachment', '-color'],
  'border':          WIDTH_STYLE_COLOR,
  'border-color':    ['border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color'],
  'border-style':    ['border-top-style', 'border-right-style', 'border-bottom-style', 'border-left-style'],
  'border-width':    ['border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'],
  'border-top':      BORDER_DIR_VAL,
  'border-right':    BORDER_DIR_VAL,
  'border-bottom':   BORDER_DIR_VAL,
  'border-left':     BORDER_DIR_VAL,
  'border-radius':   ['border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'],
  'border-image':    ['-source', '-slice', '-width', '-outset', '-repeat'],

  // CSS Fonts Module Level 3: http://www.w3.org/TR/css3-fonts/
  'font':            ['-style', '-variant', '-weight', '-stretch', '-size', 'line-height', '-family'],
  'font-variant':    ['-ligatures', '-alternates', '-caps', '-numeric', '-east-asian'],

  // CSS Masking Module Level 1: http://www.w3.org/TR/css-masking/
  'mask':            ['-image', '-mode', '-position', '-size', '-repeat', '-origin', '-clip'],
  'mask-border':     ['-source', '-slice', '-width', '-outset', '-repeat', '-mode'],

  // CSS Multi-column Layout Module: http://www.w3.org/TR/css3-multicol/
  'columns':         ['column-width', 'column-count'],
  'column-rule':     WIDTH_STYLE_COLOR,

  // CSS Speech Module: http://www.w3.org/TR/css3-speech/
  'cue':             BEFORE_AFTER,
  'pause':           BEFORE_AFTER,
  'rest':            BEFORE_AFTER,

  // CSS Text Decoration Module Level 3: http://www.w3.org/TR/css-text-decor-3/
  'text-decoration': ['-line', '-style', '-color'],
  'text-emphasis':   ['-style', '-color'],

  // CSS Animations (WD): http://www.w3.org/TR/css3-animations
  'animation':       ['-name', '-duration', '-timing-function', '-delay', '-iteration-count', '-direction', '-fill-mode', '-play-state'],

  // CSS Transitions (WD): http://www.w3.org/TR/css3-transitions/
  'transition':      ['-property', '-duration', '-timing-function', '-delay'],

  // CSS Flexible Box Layout Module Level 1 (WD): http://www.w3.org/TR/css3-flexbox/
  'flex':            ['-grow', '-shrink', '-basis']
};

const dict = {};

function assign(shorthand) {
  const result = {};
  SHORTHANDS[shorthand].forEach(prop => {
    const longhand = prop[0] === '-' ? `${shorthand}${prop}` : prop;
    result[longhand] = true;
    if (SHORTHANDS[longhand]) {
      const nested = assign(longhand);
      for (nestedProp in nested) {
        result[nestedProp] = true;
      }
    }
  });
  dict[shorthand] = result;
  return result;
}

for (shorthand in SHORTHANDS) {
  assign(shorthand);
}

module.exports = dict;
