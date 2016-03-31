'use strict';

var injector = require('./injector');

function renderStatic(renderFn) {
  injector.reset();
  injector.startBuffering();
  var html = renderFn();
  var css = injector.flushBuffer();
  return {
    html: html,
    css: css
  };
}

module.exports = renderStatic;
