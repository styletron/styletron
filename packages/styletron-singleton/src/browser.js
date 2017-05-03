import { INSTANCE_KEY, ELEMENT_CLASS_NAME } from './constants';
import StyletronClient from 'styletron-client';

const topLevel = typeof window !== 'undefined' ? window : {};

let instance = topLevel[INSTANCE_KEY];

if (!instance) {
  const existingStyles = document.getElementsByClassName(ELEMENT_CLASS_NAME);
  const styles = existingStyles.length > 0
    ? existingStyles
    : [createStyleElement()];
  const styletron = new StyletronClient(styles);
  instance = topLevel[INSTANCE_KEY] = styletron;
}

export default instance;

function createStyleElement() {
  const styleElement = document.createElement('style');
  styleElement.className = ELEMENT_CLASS_NAME;
  document.head.appendChild(styleElement);
  return styleElement;
}
