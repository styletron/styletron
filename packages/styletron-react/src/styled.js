const React = require('react');
const PropTypes = require('prop-types');
const utils = require('styletron-utils');

const isValidAttr = require('./is-valid-attr');

const STYLETRON_KEY = '__STYLETRON';

module.exports = styled;

/**
 * Helper function to create styled element components
 * @packagename styletron-react
 * @param  {String|function} base     Tag name or styled element component
 * @param  {function|object} styleFn  Style object or function that returns a style object
 * @return {function}                 Styled element component
 * @example
 * import {styled} from 'styletron-react';
 *
 * const Panel = styled('div', {
 *   backgroundColor: 'lightblue',
 *   fontSize: '12px'
 * });
 *
 * <Panel>Hello World</Panel>
 * @example
 * import {styled} from 'styletron-react';
 *
 * const Panel = styled('div', (props) => ({
 *   backgroundColor: props.alert ? 'orange' : 'lightblue',
 *   fontSize: '12px'
 * }));
 *
 * <Panel alert>Danger!</Panel>
 * @example
 * import {styled} from 'styletron-react';
 *
 * const DeluxePanel = styled(Panel, (props) => ({
 *   backgroundColor: props.alert ? 'firebrick' : 'rebeccapurple',
 *   color: 'white',
 *   boxShadow: '3px 3px 3px darkgray'
 * }));
 *
 * <DeluxePanel>Bonjour Monde</DeluxePanel>
 */
function styled(base, styleArg) {
  if (typeof base === 'function' && base[STYLETRON_KEY]) {
    const {tag, styles} = base[STYLETRON_KEY];
    // Styled component
    return createStyledElementComponent(tag, styles.concat(styleArg));
  }
  if (typeof base === 'string' || typeof base === 'function') {
    // Tag name or non-styled component
    return createStyledElementComponent(base, [styleArg]);
  }
  throw Error('Must pass in element or component');
}

function createStyledElementComponent(tagName, stylesArray) {
  const StyledElement = (props, context) => {
    const restProps = assign({}, props);
    delete restProps.innerRef;

    const resolvedStyle = {};
    StyledElement[STYLETRON_KEY].styles.forEach(style => {
      if (typeof style === 'function') {
        assign(resolvedStyle, style(restProps, context));
      } else if (typeof style === 'object') {
        assign(resolvedStyle, style);
      }
    });

    const styletronClassName = utils.injectStylePrefixed(
      context.styletron,
      resolvedStyle
    );

    const elementProps = typeof StyledElement[STYLETRON_KEY].tag === 'string'
      ? omitInvalidProps(restProps)
      : restProps;
    elementProps.className = restProps.className
      ? `${restProps.className} ${styletronClassName}`
      : styletronClassName;

    if (props.innerRef) {
      elementProps.ref = props.innerRef;
    }

    return React.createElement(
      StyledElement[STYLETRON_KEY].tag,
      elementProps
    );
  }
  StyledElement[STYLETRON_KEY] = {
    tag: tagName,
    styles: stylesArray
  };
  StyledElement.contextTypes = {styletron: PropTypes.object};

  return StyledElement;
}

function assign(target, source) {
  for (let key in source) {
    target[key] = source[key];
  }
  return target;
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
