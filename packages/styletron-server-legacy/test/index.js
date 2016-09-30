var test = require('tape');
var styletron = require('styletron-legacy');

var styletronServer = require('../');

test('server rendering', function(t) {
  var result = styletronServer.renderStatic(function mockRender() {
    styletron.injectOnce('.bar {}', 'bar');
    return 'html contents';
  });

  t.equal(result.html, 'html contents');
  t.equal(result.css, '.bar {}');
  t.deepLooseEqual(result.injectedKeys, ['bar']);
  t.equal(result.hydrationSrc,
    ';try{(function(){window["__GLOBAL_STYLETRON_HYDRATE@1__"]=["bar"];var style=document.createElement("style");style.setAttribute("data-styletron","");style.appendChild(document.createTextNode(".bar {}"));(document.head||document.getElementsByTagName("head")[0]).appendChild(style);})();}catch(e){};');
  t.end();
});

test('reset before render', function(t) {
  // inject something before (should not be in post-render buffer)
  styletron.startBuffering();
  styletron.injectOnce('.foo {}', 'foo');

  var result = styletronServer.renderStatic(function mockRender() {
    styletron.injectOnce('.bar > .foo {}', 'bar');
    return 'html contents';
  });

  t.equal(result.html, 'html contents');
  t.equal(result.css, '.bar > .foo {}');
  t.deepLooseEqual(result.injectedKeys, ['bar']);
  t.equal(result.hydrationSrc,
    ';try{(function(){window["__GLOBAL_STYLETRON_HYDRATE@1__"]=["bar"];var style=document.createElement("style");style.setAttribute("data-styletron","");style.appendChild(document.createTextNode(".bar \\u003E .foo {}"));(document.head||document.getElementsByTagName("head")[0]).appendChild(style);})();}catch(e){};');
  t.end();
});
