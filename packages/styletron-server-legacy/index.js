'use strict';

var styletron = require('styletron-legacy');
var constants = styletron.constants;
var safeString = require('safe-string');

function renderStatic(renderFn) {
  styletron.reset();
  styletron.startBuffering();
  var html = renderFn();
  var css = styletron.flushBuffer();
  var keys = styletron.getInjectedKeys();

  return {
    html: html,
    css: css,
    injectedKeys: keys,
    hydrationSrc: generateHydrationScriptSrc(keys, css)
  };
}

module.exports = {
  renderStatic: renderStatic
};

function generateHydrationScriptSrc(keys, css) {
  var sanitizedKeys = safeString(JSON.stringify(keys));
  var safeCssString = safeString(JSON.stringify(css));
  return [
    ';try{',
      '(function(){',
        'window["', constants.HYDRATE_KEY, '"]=', sanitizedKeys, ';',
        'var style=document.createElement("style");',
        'style.setAttribute("data-styletron","");',
        'style.appendChild(document.createTextNode(' + safeCssString + '));',
        '(document.head||document.getElementsByTagName("head")[0]).appendChild(style);',
      '})();',
    '}catch(e){};',
  ].join('');
}
