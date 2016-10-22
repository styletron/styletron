const React = require('react');
const utils = require('styletron-utils');

const isValidAttr = require('./is-valid-attr');

const STYLES_KEY = '__STYLETRON_STYLES';
const TAG_KEY = '__STYLETRON_TAG';

module.exports = styled;

function styled(base, styleArg) {
  if (typeof base === 'string') {
    // Element
    return createStyledElementComponent(
      base,
      [styleArg]
    );
  }
  if (typeof base === 'function' && base[TAG_KEY] && base[STYLES_KEY]) {
    // Component
    return createStyledElementComponent(
      base[TAG_KEY],
      base[STYLES_KEY].concat(styleArg)
    );
  }
  throw Error('Must pass in element or component');
}

function createStyledElementComponent(tagName, stylesArray) {

  const StyledElement = (props, context) => {
    
    const resolvedStyle = {};
    StyledElement[STYLES_KEY].forEach(style => {
      if (typeof style === 'function') {
        assign(resolvedStyle, style(props, context));
      } else if (typeof style === 'object') {
        assign(resolvedStyle, style);
      }
    });

    const styletronClassName = utils.injectStylePrefixed(context.styletron, resolvedStyle);

    const elementProps = omitInvalidProps(props);
    elementProps.className = props.className
      ? `${props.className} ${styletronClassName}`
      : styletronClassName;

    return React.createElement(StyledElement[TAG_KEY], elementProps);
  };

  StyledElement[TAG_KEY] = tagName;
  StyledElement[STYLES_KEY] = stylesArray;
  StyledElement.contextTypes = {styletron: React.PropTypes.object};

  return StyledElement;
}

function assign(target, source) {
  for (key in source) {
    target[key] = source[key];
  }
}

function omitInvalidProps(props) {
  let target = {};
  for (let attr in props) {
    if (isValidAttr(attr)) {
      target[attr] = props[attr];
    }
  }
  return target;
}
