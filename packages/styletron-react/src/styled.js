import core from './core';
import {injectStylePrefixed} from 'styletron-utils';
import assign from './assign';

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

const toCamelCase = str => str.replace(/-([a-z])/g, ([, x]) => x.toUpperCase());

function assignProps(styletron, styleResult, ownProps) {
  let className = ownProps.className;
  const styleFromClassName = {};
  if (className && styletron.getDeclarationFromClassName) {
    const classNames = [];
    className.split(' ').forEach(cn => {
      const dec = styletron.getDeclarationFromClassName(cn);
      if (dec) {
        const {block, media, pseudo} = dec;
        const propName = media ? `@media ${media}` : pseudo;
        const [prop, val] = block.split(':');
        const node = {[toCamelCase(prop)]: val};
        assign(styleFromClassName, propName ? {[propName]: node} : node);
      } else {
        classNames.push(cn);
      }
    });
    className = classNames.join(' ');
  }
  const styletronClassName = injectStylePrefixed(
    styletron,
    assign(styleResult, styleFromClassName)
  );

  // Skipping cloning of `ownProps` since that's already done internally
  if (ownProps.styleProps) {
    delete ownProps.styleProps;
  }
  ownProps.className = className
    ? `${className} ${styletronClassName}`
    : styletronClassName;
  return ownProps;
}
