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

g.noop = function noop() {
    return null
}

    //+ trace :: b -> a -> a
g.trace = function trace(b,a) {
  console.log("TRACE",b,":", a)
  return a
}


g.rnd = function rnd(modul) {
  return Math.floor(((Math.random() * 1000000000) % modul))
}


g.doOnceAterNInvokes = function doOnceAterNInvokes(fn, n) {
 var cnt = 0
 var func = fn
 return function() {
     if( cnt < n ) cnt += 1
     if(cnt === n) { cnt += 1; return func() }
 }
}

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
g.tmpl = (function(){
  var cache = {};

  return function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();


// RETURN public object
return g;
}));
