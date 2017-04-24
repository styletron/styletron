const hyphenate = require('./hyphenate-style-name');
const fallbackValueMiddleware = require('./fallback-value-middleware');
const mediaMiddleware = require('./media-middleware');
const pseudoMiddleware = require('./psuedo-middleware');

module.exports = createInjectStyle;

function createInjectStyle(plugins, ...customMiddlewares) {
  const middlewares = customMiddlewares.length > 0 ? customMiddlewares : [
    fallbackValueMiddleware,
    mediaMiddleware,
    pseudoMiddleware
  ];

  return (styletron, styles, media, pseudo) => {
    const resolve = (prop, val, media, pseudo) => {
      if (typeof val === 'string' || typeof val === 'number') {
        return ' ' + styletron.injectDeclaration({prop: hyphenate(prop), val, media, pseudo});
      }

      for (let i = 0; i < middlewares.length; i++) {
        const classNames = middlewares[i](prop, val, media, pseudo, resolve);
        if (classNames) {
          return classNames;
        }
      }

      return '';
    };

    const result = typeof plugins === 'function' ? plugins(styles) : styles;

    let classNames = '';
    for (let prop in result) {
      classNames += resolve(prop, result[prop], media, pseudo);
    }

    // Remove leading space on way out
    return classNames.slice(1);
  };
}
