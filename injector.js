'use strict';

var asap = require('asap');

/**
 * Private singleton state variables
 */

// Placeholder for stored reference to style element.
var styleDOMElement;

// Set of unique keys corresponding already injected styles.
var alreadyInjected = {};

// Buffer of styles that have not yet been flushed.
var injectionBuffer = '';

// A flag to tell if we are already buffering styles. This could happen either
// because we scheduled a flush call already, so newly added styles will
// already be flushed, or because we are statically buffering on the server.
var isBuffering = false;

module.exports = {
  injectStylesIntoHead: injectStylesIntoHead,
  injectOnce: injectOnce,
  startBuffering: startBuffering,
  flushBuffer: flushBuffer,
  reset: reset,
  markAsInjected: markAsInjected,
  getInjectedKeys: getInjectedKeys
};

/**
 * Module methods
 */

/**
 * Injects css into a <style> element in the document head.
 * If a styletron <style> element exists in the document head
 * it will be used, otherwise one will be created.
 * @param  {string} css - string of css
 * @return {void}
 */
function injectStylesIntoHead(css) {
  if (styleDOMElement === undefined) {
    var found = existingStyleElement();
    styleDOMElement = found ? found : appendToHead(createStyleElement());
  }
  styleDOMElement.appendChild(document.createTextNode(css));
}

/**
 * Sasdfasdfasdfasdfasfd
 * @param  {string} key - unique key for the css
 * @param  {string} css - the css to inject
 * @return {boolean}    - if the css will be injected
 */
function injectOnce(key, css) {
  if (alreadyInjected[key]) {
    return false;
  }

  if (!isBuffering) {
    if (typeof document === 'undefined') {
      throw Error('Cannot automatically buffer without a document');
    }

    isBuffering = true;
    asap(flushToStyleElement);
  }

  injectionBuffer += css;
  alreadyInjected[key] = true;
  return true;
}

/**
 * Resets the buffer
 * @return {void}
 */
function reset() {
  injectionBuffer = '';
  alreadyInjected = {};
  isBuffering = false;
  styleDOMElement = undefined;
};

/**
 * Returns an array of keys for already injected styles
 * @return {array} - array of keys
 */
function getInjectedKeys() {
  return Object.keys(alreadyInjected);
}

/**
 * Marks a key as already injected
 * @param  {string} key - unique key to mark as injected
 * @return {void}
 */
function markAsInjected(key) {
  alreadyInjected[key] = true;
}

/**
 * Sets isBuffering flag to true
 * @return {void}
 */
function startBuffering() {
  if (isBuffering) {
    throw Error('Cannot buffer while already buffering');
  }
  isBuffering = true;
};

/**
 * Flushes the buffer and returns its contents
 * @return {string} - contents of CSS buffer
 */
function flushBuffer() {
  isBuffering = false;
  var contents = injectionBuffer;
  injectionBuffer = '';
  return contents;
};

/**
 * Flushes the buffer and injects the styles into the document
 * @return {void}
 */
function flushToStyleElement() {
  var css = flushBuffer();
  if (css.length > 0) {
    injectStylesIntoHead(css);
  }
};

/**
 * Helpers
 */

function appendToHead(element) {
  var head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(element);
  return element;
}

function existingStyleElement() {
  return document.querySelector('style[data-styletron]');
}

function createStyleElement() {
  var element = document.createElement('style');
  element.type = 'text/css';
  element.setAttribute('data-styletron', '');
  return element;
}
