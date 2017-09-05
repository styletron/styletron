import React from 'react';
import PropTypes from 'prop-types';

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
    const ownProps = assign({}, props);
    delete ownProps.innerRef;

    const styleResult = {};
    StyledElement[STYLETRON_KEY].styles.forEach(style => {
      if (typeof style === 'function') {
        assign(styleResult, style(ownProps, context));
      } else if (typeof style === 'object') {
        assign(styleResult, style);
      }
    });

    const elementProps = assignProps(context.styletron, styleResult, ownProps);

    if (props.innerRef) {
      elementProps.ref = props.innerRef;
    }

    if (typeof StyledElement[STYLETRON_KEY].tag === 'string') {
      // Use custom element workaround to avoid warnings for "invalid" attributes
      elementProps.is = true;
      // Because of this, we need to use true `class` and `for` attributes
      elementProps.class = elementProps.className;
      elementProps.className = void 0;
      elementProps.for = elementProps.htmlFor;
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

function assign(target, source) {
  for (const key in source) {
    target[key] = source[key];
  }
  return target;
}
