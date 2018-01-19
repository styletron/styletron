import React from 'react';
import PropTypes from 'prop-types';
import assign from './assign';

const STYLETRON_KEY = '__STYLETRON';

/**
 * Helper function to create styled element components
 * @packagename styletron-react
 * @param  {String|function} base        Tag name or component
 * @param  {function|object} styleFn     Style object or function that returns a style object
 * @param  {function}        assignProps Function that consumes the style result and props and returns an object with new props
 * @return {function}                    Component
 * @example
 */
export default function core(base, style, assignProps) {
  if (typeof base === 'function' && base[STYLETRON_KEY]) {
    const {tag, styles} = base[STYLETRON_KEY];
    // Styled component
    return createStyledElementComponent(tag, styles.concat(style), assignProps);
  }
  if (typeof base === 'string' || typeof base === 'function') {
    // Tag name or non-styled component
    return createStyledElementComponent(base, [style], assignProps);
  }
  throw new Error('`styled` takes either a DOM element name or a component');
}

function createStyledElementComponent(base, stylesArray, assignProps) {
  function StyledElement(props, context) {
    const ownProps = Object.assign({}, props);
    delete ownProps.innerRef;

    const styleResult = {};
    StyledElement[STYLETRON_KEY].styles.forEach(style => {
      if (typeof style === 'function') {
        assign(styleResult, style(ownProps, context));
      } else if (typeof style === 'object') {
        assign(styleResult, style);
      }
    });

    let elementProps = assignProps(context.styletron, styleResult, ownProps);

    elementProps = omit$Props(elementProps);

    if (props.innerRef) {
      elementProps.ref = props.innerRef;
    }

    return React.createElement(StyledElement[STYLETRON_KEY].tag, elementProps);
  }

  StyledElement[STYLETRON_KEY] = {
    tag: base,
    styles: stylesArray,
  };

  StyledElement.contextTypes = {styletron: PropTypes.object};

  if (__DEV__) {
    const name = base.displayName
      ? base.displayName
      : typeof base === 'function' ? base.name : base;
    StyledElement.displayName = `Styled${name ? `(${name})` : ''}`;
  }

  return StyledElement;
}

function omit$Props(source) {
  const result = {};
  for (const key in source) {
    if (key[0] !== '$') {
      result[key] = source[key];
    }
  }
  return result;
}
