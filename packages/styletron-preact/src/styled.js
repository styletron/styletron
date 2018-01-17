import Preact from 'preact';
import {injectStylePrefixed} from 'styletron-utils';

const STYLETRON_KEY = '__STYLETRON';

export default styled;

/**
 * Helper function to create styled element components
 * @name styledPreact
 * @exportName styled
 * @param  {String|function} base     Tag name or styled element component
 * @param  {function|object} styleFn  Style object or function that returns a style object
 * @return {function}                 Styled element component
 * @example
 * import {styled} from 'styletron-preact';
 *
 * const Panel = styled('div', {
 *   backgroundColor: 'lightblue',
 *   fontSize: '12px'
 * });
 *
 * <Panel>Hello World</Panel>
 * @example
 * import {styled} from 'styletron-preact';
 *
 * const Panel = styled('div', (props) => ({
 *   backgroundColor: props.alert ? 'orange' : 'lightblue',
 *   fontSize: '12px'
 * }));
 *
 * <Panel alert>Danger!</Panel>
 * @example
 * import {styled} from 'styletron-preact';
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
  throw new Error('`styled` takes either a DOM element name or a component');
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

    const styletronClassName = injectStylePrefixed(
      context.styletron,
      resolvedStyle
    );

    restProps.className = restProps.className
      ? `${restProps.className} ${styletronClassName}`
      : styletronClassName;

    if (props.innerRef) {
      restProps.ref = props.innerRef;
    }

    return Preact.h(StyledElement[STYLETRON_KEY].tag, restProps);
  };
  StyledElement[STYLETRON_KEY] = {
    tag: tagName,
    styles: stylesArray,
  };

  return StyledElement;
}

function assign(target, source) {
  for (const key in source) {
    target[key] = source[key];
  }
  return target;
}
