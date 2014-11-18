(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require, exports, module);
  } else {
    root.g = factory();
  }
}(this, function(require, exports, module) {
'use strict';


var g = { };


g.rnd = function rnd(modul) {
  return Math.floor(((Math.random() * 1000000000) % modul))
}

// RETURN public object
return g;
}));
