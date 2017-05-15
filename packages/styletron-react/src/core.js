import React from 'react';
import PropTypes from 'prop-types';
import isValidAttr from './is-valid-attr';

const STYLETRON_KEY = '__STYLETRON';

/**
 * Helper function to create styled element components
 * @packagename styletron-react
 * @param  {String|function} base            Tag name or styled element component
 * @param  {function|object} styleFn         Style object or function that returns a style object
 * @param  {function}        mapStyleToProps Function that consumes the style object result and returns an object with class names
 * @param  {function}        mergeProps      Optional function where you can override the merging of props and the returned object from `mapStyleToProps`
 * @return {function}                        Styled element component
 * @example
 */
export default function core(base, style, mapStyleToProps, mergeProps) {
  if (typeof base === 'function' && base[STYLETRON_KEY]) {
    const {tag, styles} = base[STYLETRON_KEY];
    // Styled component
    return createStyledElementComponent(
      tag,
      styles.concat(style),
      mapStyleToProps,
      mergeProps
    );
  }
  if (typeof base === 'string' || typeof base === 'function') {
    // Tag name or non-styled component
    return createStyledElementComponent(
      base,
      [style],
      mapStyleToProps,
      mergeProps
    );
  }
  throw new Error('`styled` takes either a DOM element name or a component');
}

function createStyledElementComponent(
  tagName,
  stylesArray,
  mapStyleToProps,
  mergeProps
) {
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

    const styleProps = mapStyleToProps(
      context.styletron,
      styleResult,
      ownProps
    );

    let elementProps = typeof mergeProps === 'function'
      ? mergeProps(styleProps, ownProps)
      : assign(ownProps, styleProps);

    if (props.innerRef) {
      elementProps.ref = props.innerRef;
    }

    elementProps = typeof StyledElement[STYLETRON_KEY].tag === 'string'
      ? omitInvalidProps(elementProps)
      : elementProps;

    return React.createElement(StyledElement[STYLETRON_KEY].tag, elementProps);
  }

  StyledElement[STYLETRON_KEY] = {
    tag: tagName,
    styles: stylesArray,
  };

  StyledElement.contextTypes = {styletron: PropTypes.object};

  return StyledElement;
}

function assign(target, source) {
  for (const key in source) {
    target[key] = source[key];
  }
  return target;
}

function omitInvalidProps(props) {
  const target = {};
  for (const attr in props) {
    if (isValidAttr(attr)) {
      target[attr] = props[attr];
    }
  }
  return target;
}
