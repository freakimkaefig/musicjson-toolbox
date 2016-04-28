(function() {
  'use strict';

  var MusicJsonToolbox = {
  };


  // amd
  if (typeof define !== "undefined" && define !== null && define.amd) {
    define(function() {
      return MusicJsonToolbox;
    });
  }
  // commonjs
  else if (typeof module !== "undefined" && module !== null) {
    module.exports = MusicJsonToolbox;
  }
  // web worker
  else if (typeof self !== "undefined" && typeof self.postMessage === 'function' && typeof self.importScripts === 'function') {
    self.MusicJsonToolbox = MusicJsonToolbox;
  }
  // browser main thread
  else if (typeof window !== "undefined" && window !== null) {
    window.MusicJsonToolbox = MusicJsonToolbox;
  }
}());
