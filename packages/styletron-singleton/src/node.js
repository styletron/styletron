import { INSTANCE_KEY } from './constants';
import StyletronServer from 'styletron-server';

const topLevel = typeof global !== 'undefined' ? global : {};

let instance = topLevel[INSTANCE_KEY];

if (!instance) {
  const styletron = new StyletronServer();
  instance = topLevel[INSTANCE_KEY] = styletron;
}

export default instance;
