import core from './core';
import {injectStylePrefixed} from 'styletron-utils';

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
export default function styled(base, style) {
  return core(base, style, assignProps);
}

function assignProps(styletron, styleResult, ownProps) {
  const styletronClassName = injectStylePrefixed(styletron, styleResult);
  // Skipping cloning of `ownProps` since that's already done internally
  if (ownProps.styleProps) {
    delete ownProps.styleProps;
  }
  ownProps.className = ownProps.className
    ? `${ownProps.className} ${styletronClassName}`
    : styletronClassName;
  return ownProps;
}
