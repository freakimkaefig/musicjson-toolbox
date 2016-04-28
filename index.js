(function() {
  'use strict';

  var MusicJsonToolbox = {
    /**
     * Returns an array of all notes (transposed to C major)
     * [ {object}, {object}, ... ]
     * @param {object} obj - The musicjson object
     */
    notes: function(obj) {
      var tempNotes = [];
      var repeatStart = -1;

      for (var i = 0; i < obj.measures.length; i++) {
        if (obj.measures[i].attributes.repeat.left) {
          repeatStart = i;
        }
        tempNotes = tempNotes.concat(obj.measures[i].notes);
        if (obj.measures[i].attributes.repeat.right) {
          if (repeatStart !== -1) {
            while (repeatStart <= i) {
              tempNotes = tempNotes.concat(obj.measures[repeatStart].notes);
              repeatStart++;
            }
          }
          repeatStart = -1;
        }
      }

      return tempNotes;
    }
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
