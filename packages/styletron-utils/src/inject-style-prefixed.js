import injectStyle from './inject-style';
import prefixAll from 'inline-style-prefixer/static';

export default function injectStylePrefixed(styletron, styles, media, pseudo) {
  return injectStyle(styletron, prefixAll(styles), media, pseudo);
}
