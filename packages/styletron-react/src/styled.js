const React = require('react');
const utils = require('styletron-utils');

const isValidAttr = require('./is-valid-attr');

const STYLES_KEY = '__STYLETRON_STYLES';
const TAG_KEY = '__STYLETRON_TAG';

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

  class StyledElement extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        elementProps: {},
      };

      this.generateStyles = this.generateStyles.bind(this);
    }

    componentWillMount() {
      this.generateStyles();
    }

    componentWillReceiveProps() {
      this.generateStyles();
    }

    generateStyles() {
      const resolvedStyle = {};
      StyledElement[STYLES_KEY].forEach(style => {
        if (typeof style === 'function') {
          assign(resolvedStyle, style(this.props, this.context));
        } else if (typeof style === 'object') {
          assign(resolvedStyle, style);
        }
      });

      const styletronClassName = utils.injectStylePrefixed(this.context.styletron, resolvedStyle);

      const elementProps = omitInvalidProps(this.props);
      elementProps.className = this.props.className
        ? `${this.props.className} ${styletronClassName}`
        : styletronClassName;

      if (this.props.innerRef) {
        elementProps.ref = this.props.innerRef;
      }

      this.setState({
        elementProps,
      });
    }

    render() {
      const {elementProps} = this.state;

      return React.createElement(StyledElement[TAG_KEY], elementProps);
    }
  }

  StyledElement[TAG_KEY] = tagName;
  StyledElement[STYLES_KEY] = stylesArray;
  StyledElement.contextTypes = {styletron: React.PropTypes.object};

  return StyledElement;
}

function assign(target, source) {
  for (let key in source) {
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
