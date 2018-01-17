/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';

export type styleT = Object | ((props: Object, context?: Object) => Object);

export type nonStyletronComponentT = string | React.ComponentType<*>;

export type styletronComponentT = styletronStatics &
  React.StatelessFunctionalComponent<*>;

export type styletronStatics = {
  __STYLETRON: styletronPropertiesT,
};

export type styletronPropertiesT = {|
  tag: styletronComponentT | nonStyletronComponentT,
  styles: Array<styleT>,
|};

export default function core(
  base: styletronComponentT | nonStyletronComponentT,
  style: styleT,
  assignProps: any
) {
  if (typeof base === 'function' && base.__STYLETRON) {
    const {tag, styles} = ((base: any): styletronComponentT).__STYLETRON;
    // Styled component
    return createStyledElementComponent(tag, styles.concat(style), assignProps);
  }
  if (typeof base === 'string' || typeof base === 'function') {
    // Tag name or non-styled component
    return createStyledElementComponent(base, [style], assignProps);
  }
  throw new Error('`styled` takes either a DOM element name or a component');
}

function createStyledElementComponent(
  base: styletronComponentT | nonStyletronComponentT,
  stylesArray: Array<styleT>,
  assignProps
): styletronComponentT {
  function StyledElement(props: Object, context) {
    const ownProps = assign({}, props);
    delete ownProps.innerRef;

    const styleResult = {};
    StyledElement.__STYLETRON.styles.forEach(style => {
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

    return React.createElement(StyledElement.__STYLETRON.tag, elementProps);
  }

  StyledElement.__STYLETRON = {
    tag: base,
    styles: stylesArray,
  };

  StyledElement.contextTypes = {styletron: PropTypes.object};

  if (__DEV__) {
    let name;
    if (base.displayName) {
      name = ((base.displayName: any): string);
    } else if (base.name) {
      name = ((base.name: any): string);
    } else if (typeof base === 'string') {
      name = base;
    }
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

function omit$Props(source) {
  const result = {};
  for (const key in source) {
    if (key[0] !== '$') {
      result[key] = source[key];
    }
  }
  return result;
}
