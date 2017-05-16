import core from './core';
import {injectStylePrefixed} from 'styletron-utils';

export default function withStyle(styles) {
  return Component => core(Component, styles, assignProps);
}

function assignProps(styletron, styleResult, ownProps) {
  // Skipping cloning of `ownProps` since that's already done internally
  const classes = (ownProps.classes = {});
  for (const name in styleResult) {
    classes[name] = injectStylePrefixed(styletron, styleResult[name]);
  }
  return ownProps;
}
